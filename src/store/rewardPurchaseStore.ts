import {create} from "zustand";

interface RewardPurchaseState {
    selectedShippingAddressId: number | null;
    setSelectedShippingAddressId: (id: number | null) => void;
}

export const useRewardPurchaseStore = create<RewardPurchaseState>((set) => ({
    selectedShippingAddressId: null,
    setSelectedShippingAddressId: (id) => set({selectedShippingAddressId: id}),
}));