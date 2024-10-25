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

export async function loadBingoUrl(url: string) {
    const response = await fetch(url);
    const text = await response.text();
    const bingo: Bingo = [];
    if(text) {
        const items = JSON.parse(text) as Bingo
        if (Array.isArray(items) && items.length && items.every(item => typeof item === "string")) {
            bingo.push(...items);
        }
    }
    return bingo;
}