import { ProjectStatus } from "../enum/ProjectEnum";

export default interface Project {
    id: string;
    title: string;
    description: string;
    manager: string;
    budget: string;
    startDate: string;
    finishDate: string;
    status: ProjectStatus;
}
