import React from "react";
import { Button as ShadcnButton, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


interface CustomButtonProps extends ButtonProps {
    loading?: boolean
    loadingText?: string
}



const BaseButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({ children, loading, loadingText, ...props }, ref) => {
    return <ShadcnButton ref={ref} {...props} disabled={loading}>
        {loading ? <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="ml-2">{loadingText || "Loading..."}</span>
        </> : children}
    </ShadcnButton>
})

BaseButton.displayName = "BaseButton"


const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>((props, ref) => (
    <BaseButton ref={ref} {...props} />
))
Button.displayName = "Button"



export { Button }
