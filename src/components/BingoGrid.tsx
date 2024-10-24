import { useEffect, useState } from "react";
import { useBingoStore } from "@/stores/bingoStore";
import Grid from "./ui/grid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function shuffleItems(items: string[]) {
    const newItems = [...items]

    for (let i = newItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }

    return newItems;
}

const minSize = 1
const maxSize = 1

export default function Bingo() {
    const { bingoItems, width, height, setWidth, setHeight } = useBingoStore()

    const [bingoGridItems, setBingoGridItems] = useState(bingoItems)


    useEffect(() => {
        setBingoGridItems(prev => [...new Set([...prev.filter(el => bingoItems.includes(el)), ...bingoItems])])
    }, [bingoItems])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);
        if (e.target.name === "width") {
            setWidth(value);
        } else {
            setHeight(value);
        }
    }

    return (
        <div id="bingo-grid" className="flex flex-col items-center justify-center h-full space-y-2">
            <div className="flex items-center justify-center space-x-2">
                <Input
                    name="width"
                    type="number"
                    value={width}
                    onChange={handleChange}
                    className="w-10 text-center"
                    min={minSize}
                    max={maxSize}
                />
                <span>x</span>
                <Input
                    name="height"
                    type="number"
                    value={height}
                    onChange={handleChange}
                    className="w-10 text-center"
                    min={minSize}
                    max={maxSize}
                />
            </div>
            <Button onClick={() => setBingoGridItems(shuffleItems(bingoItems))}>
                Generate
            </Button>
            <Grid height={height} width={width} items={bingoGridItems} name="Bingo Grid" />
        </div>
    )
}
