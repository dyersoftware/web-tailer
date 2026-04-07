import axios from "../../../resources/axios/axios";
import { tokenService } from "../../../resources/axios/token";
import { AUTH_PATHS } from "../../../resources/endpoints/api_endpoints.constants";

export const login = async (payload: { email: string; password: string }) => {
  const res = await axios.post(AUTH_PATHS.LOGIN, payload);

  const { access_token, refresh_token } = res.data;

  tokenService.setTokens(access_token, refresh_token);

  return res.data;
};

export const logout = async () => {
  const refreshToken = tokenService.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const res = await axios.post(AUTH_PATHS.LOGOUT, {
    refresh_token: refreshToken,
  });

  // Clear tokens from localStorage regardless of API response
  tokenService.clear();

  return res.data;
};
