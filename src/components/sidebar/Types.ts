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

export interface SideItemProps {
    item: SideItem;
    isCollapsed: boolean;
}

export interface MainLayoutProps {
    children: React.ReactNode;
}