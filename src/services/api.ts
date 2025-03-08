import axios, { AxiosError } from 'axios';
import { User } from '@/types/user';
import { UsersResponse, UserDetailsResponse, ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
interface ErrorResponse {
  message?: string;
}

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new ApiError(
      axiosError.response?.data?.message || 'An error occurred',
      axiosError.response?.status,
      axiosError.code
    );
  }
  throw new ApiError('An unexpected error occurred');
};

export const fetchUsers = async (page: number): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(`${API_BASE_URL}/users`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<UserDetailsResponse>(
      `${API_BASE_URL}/users/${id}`
    );
    if (response.status === 404) {
      throw new ApiError('User not found', 404, 'NOT_FOUND');
    }
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
