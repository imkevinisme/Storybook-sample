import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cva, type VariantProps } from "class-variance-authority";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";


const inputVariants = cva(
    "h-10 rounded-md font-medium",
    {
        variants: {
            variant: {
                default: "border border-input bg-white shadow-sm dark:bg-background",
                ghost: "border-0 shadow-none bg-slate-100 hover:bg-accent hover:text-accent-foreground dark:bg-slate-800 dark:hover:bg-slate-700",
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



interface Props {
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    placeholder: string;
    value: string;
    options: {
        key: string;
        value: string;
    }[];
    onChange: (value: string) => void;
    width?: string;
    variant?: VariantProps<typeof inputVariants>['variant'];
    className?: string;
}

const SelectBox: FC<Props> = ({
    label,
    required,
    isError,
    errorMessage,
    placeholder,
    value,
    options,
    variant,
    className,
    onChange,
    width = '100%'
}) => {
    return (
        <div style={{ width: width }}>
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <Select
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger className={cn(inputVariants({ variant, isError, className }))} style={{ width: width }}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {/* <ScrollArea className="h-[20vh]"> */}
                        <SelectGroup>
                            {options.map((option) => (
                                <SelectItem key={option.key} value={option.key}>{option.value}</SelectItem>
                            ))}
                        </SelectGroup>
                    {/* </ScrollArea> */}
                </SelectContent>
            </Select>
            {isError && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>

    );
};

export default SelectBox;
