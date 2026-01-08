import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chatRoute.js";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db.js";
import cors from "cors";
import { inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import { functions } from "./config/inngest.js";
import { clerkMiddleware } from '@clerk/express';
import sessionRoutes from "./routes/sessionRoutes.js";
import authRoute  from "./routes/authRoute.js";
import questionsRoute from "./routes/questionRoute.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render / other reverse proxies terminate TLS; Clerk needs correct proto/host for auth.
app.set("trust proxy", 1);

app.use(express.json());

const allowedOrigins = [
  // local dev
  "http://localhost:5173",
  // production frontend (Render)
  "https://hiremeet-mern-interview-platform.onrender.com",
  // optional custom client url
  ENV.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (no Origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

if (ENV.NODE_ENV === "production") {
  if (!ENV.CLERK_SECRET_KEY || !ENV.CLERK_PUBLISHABLE_KEY) {
    console.error(
      "Clerk: CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY must be set in production or API auth will return 401.",
    );
  }
}

app.use(
  clerkMiddleware({
    secretKey: ENV.CLERK_SECRET_KEY,
    publishableKey: ENV.CLERK_PUBLISHABLE_KEY,
  }),
);
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions", questionsRoute);

import fs from "fs/promises";
import os from "os";
import crypto from "crypto";
import { exec } from "child_process";

app.post("/api/execute", async (req, res) => {
  try {
    const { language, code } = req.body;

    const extensions = {
      javascript: "js",
      python: "py",
      java: "java",
      c: "c",
      cpp: "cpp",
    };

    const ext = extensions[language];
    if (!ext) {
      return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    const tempDir = os.tmpdir();
    const id = crypto.randomUUID();
    const workDir = path.join(tempDir, id);
    await fs.mkdir(workDir, { recursive: true });

    // Java classes are often named Main
    const fileName = language === "java" ? "Main.java" : `script.${ext}`;
    const filePath = path.join(workDir, fileName);
    
    await fs.writeFile(filePath, code);

    let command = "";
    if (language === "javascript") {
      command = `node ${fileName}`;
    } else if (language === "python") {
      command = `python ${fileName}`;
    } else if (language === "c") {
      command = os.platform() === "win32" ? `gcc ${fileName} -o out.exe && out.exe` : `gcc ${fileName} -o out && ./out`;
    } else if (language === "cpp") {
      command = os.platform() === "win32" ? `g++ ${fileName} -o out.exe && out.exe` : `g++ ${fileName} -o out && ./out`;
    } else if (language === "java") {
      command = `javac ${fileName} && java Main`;
    }

    exec(command, { cwd: workDir, timeout: 5000 }, async (error, stdout, stderr) => {
      // Cleanup temp files
      try {
        await fs.rm(workDir, { recursive: true, force: true });
      } catch (e) {
        console.error("Failed to clean up temp dir:", e);
      }

      if (error && error.killed) {
        return res.json({ error: "Execution timed out (5 seconds limit)." });
      }

      if (stderr) {
        return res.json({ error: stderr });
      }

      if (error) {
        return res.json({ error: error.message });
      }

      res.json({ stdout: stdout || "" });
    });

  } catch (error) {
    console.error("Execution error:", error);
    res.status(500).json({ error: "Execution failed" });
  }
});

if (ENV.NODE_ENV === "production") {
  // `server.js` lives in `backend/src`, so go up to repo root then into `frontend/dist`.
  const frontendPath = path.join(__dirname, "..", "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`App is running at PORT : ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("💥 Error starting the server !!! : ", error);
  }
};

startServer();
