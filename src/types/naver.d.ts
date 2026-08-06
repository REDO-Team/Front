export {};

interface NaverLoginOptions {
  clientId: string;
  callbackUrl: string;
  isPopup?: boolean;
  callbackHandle?: boolean;
  loginButton?: {
    color?: 'green' | 'white';
    type?: number;
    height?: number;
  };
}

interface NaverLoginInstance {
  init: () => void;

  getLoginStatus: (
    callback: (status: boolean) => void,
  ) => void;

  accessToken?: {
    accessToken?: string;
    expires?: string;
    refreshToken?: string;
    tokenType?: string;
  };
}

declare global {
  interface Window {
    naver?: {
      LoginWithNaverId: new (
        options: NaverLoginOptions,
      ) => NaverLoginInstance;
    };
  }
}