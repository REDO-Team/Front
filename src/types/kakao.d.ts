export {};

interface KakaoAuthResponse {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  refresh_token_expires_in?: number;
}

interface KakaoAuthError {
  error?: string;
  error_description?: string;
}

declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;

      Auth: {
        login: (options: {
          success: (
            response: KakaoAuthResponse,
          ) => void;
          fail?: (
            error: KakaoAuthError,
          ) => void;
          scope?: string;
          throughTalk?: boolean;
        }) => void;

        getAccessToken: () =>
          | string
          | null;
      };
    };
  }
}