import type { SideItem } from "./types.ts";

export const sidebarData: SideItem[] = [
    {
        id: "home",
        title: 'Anasayfa',
        path: '/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide-house"
            >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
        ),
    },
    {
        id: "projects",
        title: 'Projeler',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide-folder-dot"
            >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <circle cx="12" cy="13" r="1" />
            </svg>
        ),
        children: [
            {
                id: "project-list",
                title: 'Proje Liste',
                path: '/projeler/liste',
            },
            {
                id: "project-manage",
                title: 'Proje Yönetimi',
                path: '/projeler/yonetim',
            },
        ],
    },
    {
        id: "account",
        title: 'Hesap',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide-user"
            >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        children: [
            {
                id: "account-settings",
                title: 'Hesap Ayarları',
                path: '/hesap/ayarlar',
            },
            {
                id: "logout",
                title: 'Çıkış',
                path: '/cikis',
            },
        ],
    },
];