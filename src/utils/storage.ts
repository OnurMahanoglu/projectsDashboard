import Project from "../types/projectInterface";

export const getFavoriteIds = (): string[] => {
    const saved = localStorage.getItem("favoriteProjectIds");
    return saved ? JSON.parse(saved) : [];
};

export const setFavoriteIds = (ids: string[]) => {
    localStorage.setItem("favoriteProjectIds", JSON.stringify(ids));
};

export const setAutoEditProject = (project: Project) => {
    sessionStorage.setItem("autoEditProject", JSON.stringify(project));
};
export const getAutoEditProject = (): Project | null => {
    const saved = sessionStorage.getItem("autoEditProject");
    return saved ? JSON.parse(saved) : null;
};
export const clearAutoEditProject = () => {
    sessionStorage.removeItem("autoEditProject");
};