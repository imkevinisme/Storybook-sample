"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";


type ButtonVariant = Exclude<ButtonProps["variant"], "default">;

interface TabOption {
    value: string;
    label: string;
}

interface TabGroupSelectProps {
    value: string;
    options: TabOption[];
    onChange: (value: string) => void;
    buttonVariant?: ButtonVariant;
    size?: ButtonProps["size"];
    className?: string;
}

export function TabGroupSelect({
    value,
    options,
    onChange,
    buttonVariant = "ghost",
    size = "default",
    className,
}: TabGroupSelectProps) {

    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div className={cn("inline-flex items-center gap-1 h-10 bg-slate-100 rounded p-1 dark:bg-slate-800", className)}>
            {options.map((option) => (
                <Button
                    key={option.value}
                    variant={selectedValue === option.value ? "default" : buttonVariant}
                    size={size}
                    onClick={() => handleChange(option.value)}
                    className={cn(
                        "transition-colors h-8 text-xs",
                        selectedValue === option.value && "bg-primary text-primary-foreground"
                    )}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    );
}

export default TabGroupSelect;


