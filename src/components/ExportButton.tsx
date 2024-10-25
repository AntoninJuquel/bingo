import { bingoExport, bingoFileDownload } from "@/lib/bingo";
import { Button, buttonVariants } from './ui/button'
import { useBingoStore } from "@/stores/bingoStore";

export default function ExportButton() {
    const { bingoItems, removeBingoItems } = useBingoStore()

    return (
        <div className="flex justify-between">
            <Button onClick={() => bingoFileDownload(bingoExport(bingoItems))}>
                Export
            </Button>
            <a className={buttonVariants({ variant: "link" })} href="https://github.com/AntoninJuquel/bingo/tree/master/data" target="_blank">
                View Bingo Lists
            </a>
            <Button variant="destructive" onClick={() => removeBingoItems(bingoItems)}>
                Reset
            </Button>
        </div>
    )
}
