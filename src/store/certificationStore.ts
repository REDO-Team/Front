import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CertificationStore {
  lastCertifiedAt: number | null;
  setCertified: () => void;
  canCertify: () => boolean;
  remainTime: () => number;
}

export const useCertificationStore = create(
  persist<CertificationStore>(
    (set, get) => ({
      lastCertifiedAt: null,

      setCertified: () =>
        set({
          lastCertifiedAt: Date.now(),
        }),

      canCertify: () => {
        const last = get().lastCertifiedAt;

        if (!last) return true;

        return Date.now() - last >= 5 * 60 * 1000; // 5분 대기
      },

      remainTime: () => {
        const last = get().lastCertifiedAt;

        if (!last) return 0;

        return Math.max(0, 5 * 60 * 1000 - (Date.now() - last));
      },
    }),
    {
      name: 'certification-storage',
    },
  ),
);
