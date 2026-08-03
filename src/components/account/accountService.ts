import {
    KEYCLOAK_URL,
    KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID,
} from "../../config/keycloakConfig";

import { getValidAccessToken } from "./keycloakAuth";

export interface KeycloakAccountInfo {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    attributes?: Record<string, string[]>;
}

const ACCOUNT_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/account`;

async function authHeader() {
    const token = await getValidAccessToken();

    if (!token) {
        throw new Error("Oturum bulunamadı, lütfen tekrar giriş yapın.");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchAccountInfo(): Promise<KeycloakAccountInfo> {
    const headers = await authHeader();

    const res = await fetch(ACCOUNT_URL, {
        method: "GET",
        headers: {
            ...headers,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Hesap bilgileri alınamadı.");
    }

    return res.json();
}

export async function updateAccountInfo(
    currentInfo: KeycloakAccountInfo,
    data: {
        firstName: string;
        lastName: string;
        email: string;
    }
): Promise<void> {
    const headers = await authHeader();

    const res = await fetch(ACCOUNT_URL, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...currentInfo,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        }),
    });

    if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.errorMessage || "Bilgiler güncellenemedi.");
    }
}

async function getCurrentUserPayload(): Promise<{ sub: string; preferred_username: string }> {
    const token = await getValidAccessToken();
    if (!token) throw new Error("Oturum bulunamadı.");
    return JSON.parse(atob(token.split(".")[1]));
}

async function getAdminToken(): Promise<string> {
    const res = await fetch(
        `${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "password",
                client_id: "admin-cli",
                username: "admin",
                password: "admin",
            }),
        }
    );

    if (!res.ok) {
        throw new Error("Admin token alınamadı. Keycloak çalışıyor mu kontrol et.");
    }

    const data = await res.json();
    return data.access_token as string;
}

export async function changePassword(
    currentPassword: string,
    newPassword: string,
    confirmation: string
): Promise<void> {
    if (newPassword !== confirmation) {
        throw new Error("Yeni şifreler eşleşmiyor.");
    }

    const { sub: userId, preferred_username: username } = await getCurrentUserPayload();

    const verifyRes = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "password",
                client_id: KEYCLOAK_CLIENT_ID,
                username,
                password: currentPassword,
            }),
        }
    );

    if (!verifyRes.ok) {
        throw new Error("Mevcut şifre yanlış.");
    }

    const adminToken = await getAdminToken();

    const res = await fetch(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/reset-password`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                type: "password",
                value: newPassword,
                temporary: false,
            }),
        }
    );

    if (!res.ok) {
        throw new Error("Şifre değiştirilemedi.");
    }
}