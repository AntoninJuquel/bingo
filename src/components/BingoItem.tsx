import { Fragment, useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { BingoItem } from "@/models/Bingo"
import { useBingoStore } from '@/stores/bingoStore'
import { Input } from './ui/input'

interface BingoItemProps {
    index: number,
    bingoItem: BingoItem
}


export default function BingoItemComponent({ index, bingoItem }: BingoItemProps) {
    const [edit, setEdit] = useState(false)
    const { removeBingoItems, setBingoItem } = useBingoStore()
    return (
        <Fragment>
            <div className="flex w-full text-sm items-center justify-between space-x-2">
                <div className='flex-1 overflow-hidden'>
                    {edit ? <Input onSubmit={() => setEdit(false)} value={bingoItem} onChange={e => setBingoItem(index, e.target.value)} /> : <p className='text-ellipsis overflow-hidden'>{bingoItem}</p>}
                </div>
                <div className='w-fit space-x-2'>
                    <Button variant={edit ? "secondary" : "default"} size="icon" onClick={() => setEdit(!edit)}>
                        {edit ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => removeBingoItems([bingoItem])}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Separator className="my-2" />
        </Fragment>
    )
}
