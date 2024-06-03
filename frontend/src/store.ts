import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TokenStore {
    token: string;
    userId: string;
    setToken: (data: string) => void;
    setUserId: (id: string) => void;
}

const useTokenStore = create<TokenStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                userId: '',
                setToken: (data: string) => set({ token: data }),
                setUserId: (id: string) => set({ userId: id }),
            }),
            { name: 'token-store' }
        )
    )
);

export default useTokenStore;
