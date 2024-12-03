import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textAreaVariants = cva(
    "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
    {
        variants: {
            variant: {
                default: "border border-input bg-transparent shadow-sm",
                ghost: "bg-slate-100 hover:bg-accent hover:text-accent-foreground dark:bg-slate-800 dark:hover:bg-slate-700",
                bordered: "border-2 border-input bg-transparent",
            },
            isError: {
                true: "border-red-500 focus-visible:ring-red-500",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            isError: false,
        },
    }
);

export interface TextBoxProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
}

const TextBox = React.forwardRef<HTMLTextAreaElement, TextBoxProps>(
    ({
        className,
        label,
        required,
        isError,
        errorMessage,
        variant,
        ...props
    }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium mb-1">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <textarea
                    className={cn(textAreaVariants({ variant, isError, className }))}
                    ref={ref}
                    {...props}
                />
                {isError && errorMessage && (
                    <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        );
    }
);

TextBox.displayName = "TextBox";

export default TextBox;
