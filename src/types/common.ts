export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
  errorDetail?: string | null;
};
