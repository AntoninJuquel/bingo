import { cn } from "@/lib/utils"
import React from "react"

interface TypographyHeadinProps extends React.AllHTMLAttributes<HTMLHeadingElement> {

}

export function TypographyH2({ children, className, ...props }: TypographyHeadinProps) {
    return (
        <h2 className={cn(className, "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0")} {...props}>
            {children}
        </h2>
    )
}
