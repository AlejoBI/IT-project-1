import { AxiosError } from "axios";

interface ApiErrorBody {
  error?: string;
  code?: string;
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    return body?.error || fallback;
  }

  return error instanceof Error ? error.message : fallback;
};
