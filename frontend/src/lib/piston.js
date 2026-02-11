const trimmed = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ?? "";
const API_URL = trimmed.length > 0 ? trimmed : "/api";

export async function executeCode(language, code) {
  try {
    const res = await fetch(`${API_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language,
        code: code,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP error! status ${res.status}`,
      };
    }

    const data = await res.json();
    
    if (data.error) {
       return { success: false, error: data.error };
    }

    const output = data.stdout || data.message || "";
    const stderr = data.stderr || data.compile_output || "";

    if (stderr) {
      return {
        success: false,
        output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No Output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute the code: ${error.message}`,
    };
  }
}
