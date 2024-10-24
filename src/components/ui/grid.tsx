import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export type BingoGridProps = {
  height: number;
  width: number;
  items: string[];
  name: string;
};

export default function BingoGrid({
  height,
  width,
  items,
  name,
}: BingoGridProps) {
  const [selected, setSelected] = useState<number[]>([]);

  function handleClick(e: React.MouseEvent<HTMLTableCellElement>) {
    const i = Number(e.currentTarget.dataset.index);
    setSelected((prev) => {
      if (prev.includes(i)) {
        return prev.filter((j) => j !== i);
      } else {
        return [...prev, i];
      }
    });
  }

  return (
    <Table className="w-fit m-auto min-w-fit">
      <TableCaption>
        <p>{name}</p>
      </TableCaption>
      <TableBody>
        {Array.from({ length: height }).map((_, i) => (
          <TableRow key={i} className="min-h-32 h-32 hover:bg-background">
            {Array.from({ length: width }).map((_, j) => (
              <TableCell
                key={j}
                className="min-w-32 w-32 max-w-32 border hover:bg-muted/50 data-[selected=true]:bg-muted text-center"
                onClick={handleClick}
                data-selected={selected.includes(i * width + j)}
                data-index={i * width + j}
              >
                <p className="text-ellipsis overflow-hidden">{items[i * width + j]}</p>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}