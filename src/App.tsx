import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import BingoBuilder from "./components/BingoBuilder";
import BingoGrid from "./components/BingoGrid";

export default function App() {
    return (
        <div id="app" className="flex flex-row h-screen w-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={66}>
                    <BingoGrid />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <BingoBuilder />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
