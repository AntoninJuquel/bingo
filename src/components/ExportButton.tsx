import { bingoExport, bingoFileDownload } from "@/lib/bingoFile";
import { Button } from './ui/button'
import { useBingoStore } from "@/stores/bingoStore";

export default function ExportButton() {
    const { bingoItems } = useBingoStore()

    return (
        <Button onClick={() => bingoFileDownload(bingoExport(bingoItems))}>
            Export
        </Button>
    )
}
