export interface SideItem {
    id: string;
    title: string;
    path?: string;
    iconName?: string;
    icon?: React.ReactNode;
    showInSidebar?: boolean
    badge?: string | number;
    children?: SideItem[];
}

export default interface SideItemProps {
    item: SideItem;
    isCollapsed: boolean;
}
