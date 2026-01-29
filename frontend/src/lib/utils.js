export const getDifficulyBadgeClass= (difficulty)=>{
    if (!difficulty) return "badge-soft badge-ghost";
    switch(difficulty.toLowerCase()){
        case "easy":
            return "badge-soft badge-success";
        case "medium":
            return "badge-soft badge-warning";
        case "hard":
            return "badge-soft badge-error";
        default:
            return "badge-soft badge-ghost";
    } 
}

export const getDifficultyBadgeClass = getDifficulyBadgeClass;