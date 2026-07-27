export default interface Project {
    id: string;
    title: string;
    description: string;
    manager: string;
    budget: string;
    startDate: string;
    finishDate: string;
    status: "Planlama" | "Devam Ediyor" | "Tamamlandı";
}
