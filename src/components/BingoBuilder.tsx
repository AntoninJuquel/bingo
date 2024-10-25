import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBingoStore } from "@/stores/bingoStore";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import ItemsList from "./BingoItems";
import ExportButton from "./ExportButton";
import { loadBingoUrl, readBingoFiles } from '@/lib/bingo';

const formSchema = z.object({
    item: z.string().min(2),
})


export default function Builder() {
    const { addBingoItems } = useBingoStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item: "",
        },
    })

    async function onSubmit({ item }: z.infer<typeof formSchema>) {
        try {
            const url = new URL(item)
            const bingo = await loadBingoUrl(url.href)
            addBingoItems(bingo)
        } catch (error) {
            addBingoItems([item])
        }
        form.reset()
    }

    const filter = form.watch("item")

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const bingo = await readBingoFiles(acceptedFiles)
        addBingoItems(bingo)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "application/json": [".json"] }, noClick: true })

    return (
        <div id="bingo-builder" className="flex flex-col p-2 space-y-2 h-full" {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="item"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex w-full items-center space-x-2">
                                            <Input placeholder="Search or Create item | Paste a bingo list url" {...field} />
                                            <Button type="submit" size="icon">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className="flex-auto">
                <ItemsList filter={filter} />
            </div>
            <div>
                <ExportButton />
            </div>
        </div>
    )
}
