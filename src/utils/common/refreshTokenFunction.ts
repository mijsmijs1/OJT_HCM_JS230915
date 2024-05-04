import apis from "@/services/apis";

export const refreshToken = async () => {
    let refreshTokenRes = await apis.authenApi.refreshToken(String(localStorage.getItem('refreshToken')));
    localStorage.setItem('token', refreshTokenRes.data.accessToken)
}

