import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Bingo, BingoItem } from '@/models/Bingo'

type BingoState = {
    bingoItems: Bingo
    height: number
    width: number
}

type BingoActions = {
    addBingoItems: (bingoItems: BingoState["bingoItems"]) => void
    removeBingoItems: (bingoItems: BingoState["bingoItems"]) => void
    setBingoItem: (index: number, bingoItem: BingoItem) => void
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
}

type BingoStore = BingoState & BingoActions

export const useBingoStore = create<BingoStore>()(
    persist(
        (set) => ({
            bingoItems: [],
            height: 5,
            width: 5,
            addBingoItems: (bingoItems) => set((state) => ({ bingoItems: [...new Set([...state.bingoItems, ...bingoItems])] })),
            removeBingoItems: (bingoItems) => set((state) => ({ bingoItems: state.bingoItems.filter(item => !bingoItems.includes(item)) })),
            setBingoItem: (index, bingoItem) => set((state) => {
                const bingoItems = [...state.bingoItems];
                bingoItems[index] = bingoItem;
                return {
                    bingoItems
                }
            }),
            setWidth: (width) => set({ width }),
            setHeight: (height) => set({ height })
        }),
        { name: 'bingo-store' },
    ),
)