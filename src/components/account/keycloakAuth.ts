import { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } from "../../config/keycloakConfig";

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now + 10;
    } catch {
        return true;
    }
}

async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    const res = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: KEYCLOAK_CLIENT_ID,
                refresh_token: refreshToken,
            }),
        }
    );

    if (!res.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("roles");
        return null;
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data.access_token as string;
}

export async function getValidAccessToken(): Promise<string | null> {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    if (isTokenExpired(token)) {
        return await refreshAccessToken();
    }

    return token;
}