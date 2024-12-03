import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function TooltipItem({
    children,
    content,
} : {
    children: React.ReactNode,
    content: React.ReactNode,
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-lg rounded-md p-2 uppercase font-semibold shadow-slate-200 dark:shadow-slate-800">
                    { content }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
