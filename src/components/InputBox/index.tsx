import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export const inputVariants = cva(
    "flex h-10 w-full rounded-md px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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

export interface InputBoxProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
}

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
    ({
        className,
        type,
        label,
        required,
        isError,
        errorMessage,
        variant,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const togglePasswordVisibility = () => setShowPassword(!showPassword);

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium mb-1">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type === 'password' && showPassword ? 'text' : type}
                        className={cn(inputVariants({ variant, isError, className }),
                            type === 'password' ? 'pr-10' : '')}
                        ref={ref}
                        {...props}
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>
                {isError && errorMessage && (
                    <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        );
    }
);

InputBox.displayName = "InputBox";

export default InputBox;

