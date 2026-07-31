const BASE_URL = "http://localhost:3000";

const request = async (endpoint, options: RequestInit = {}) => {

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });
        if (!response.ok) {
            throw new Error("Api.ts hatası")
        }

        return await response.json();
    } catch (err) {
        console.error("Api.ts hatası: ", err);
        throw err;
    }
};

export const getRoutes = () => request("/routes");
export const getProjects = () => request("/projects");

export const createProject = (projectData) => {
    const { id, ...newProjectData } = projectData;
    return request("/projects", {
        method: "POST",
        body: JSON.stringify(newProjectData),
    });
};

export const updateProject = (project) => {
    return request(`/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(project),
    });
};

export const deleteProject = (id) => {
    return request(`/projects/${id}`, {
        method: "DELETE",
    });
};