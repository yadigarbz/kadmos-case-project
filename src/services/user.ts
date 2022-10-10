import { service } from "@services/config";
import { GetUserDetailResponse, GetUserListResponse } from "@services/types";

export const getUsers = async (page: number): Promise<GetUserListResponse> => {
  const res = await service.get("users", { params: { page } });
  return res.data;
};

export const getUser = async (
  userId: number
): Promise<GetUserDetailResponse> => {
  const res = await service.get(`users/${userId}`);
  return res.data;
};
