export interface SideItem {
    title: string;
    path?: string;
    children?: SideItem[];
}

export interface SideItemProps {
    item: SideItem;
    isCollapsed: boolean;
}