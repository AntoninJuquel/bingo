import { Bingo } from "@/models/Bingo";

export function bingoExport(bingo: Bingo) {
    return JSON.stringify(bingo)
}

export async function bingoFileDownload(
    bingoString: string,
    filename: string = "bingo"
) {
    const linkElement = document.createElement("a");
    linkElement.setAttribute(
        "href",
        `data:application/json;charset=utf-8,${encodeURIComponent(bingoString)}`
    );
    linkElement.setAttribute("download", `${filename}.json`);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    return Promise.resolve();
}

export async function readBingoFiles(files: File[]) {
    const bingo: Bingo = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileText = await file.text();
        const items = JSON.parse(fileText) as Bingo
        if (Array.isArray(items) && items.length && items.every(item => typeof item === "string")) {
            bingo.push(...items);
        }
    }
    return bingo;
}