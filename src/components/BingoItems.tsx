import { useBingoStore } from '@/stores/bingoStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import BingoItemComponent from './BingoItem'

interface ItemsList {
    filter: string;
}

export default function ItemsList({ filter }: ItemsList) {
    const { bingoItems } = useBingoStore()
    return (
        <ScrollArea id="bingo-items" className="h-full rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Bingo Items</h4>
                {bingoItems.filter(item => item.toLowerCase().includes(filter.toLowerCase())).map((bingoItem, index) => (
                    <BingoItemComponent key={index} index={index} bingoItem={bingoItem} />
                ))}
            </div>
        </ScrollArea>
    )
}
