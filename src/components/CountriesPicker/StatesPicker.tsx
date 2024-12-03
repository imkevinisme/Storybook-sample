"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from "class-variance-authority";


import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import statesData from './states.json';


interface State {
    name: string;
    code: string;
}


interface StatesPickerProps {
    selectedCountry: string;
    onChange: (value: string) => void;
    value?: string;
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    variant?: VariantProps<typeof inputVariants>['variant'];
    className?: string;
}

const inputVariants = cva(
    "h-10 rounded-md font-medium w-full",
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


const StatesPicker: React.FC<StatesPickerProps> = ({ selectedCountry, onChange, value, label, required, isError, errorMessage, variant, className }) => {
    const [states, setStates] = useState<State[]>([]);
    const [useInput, setUseInput] = useState(false);
    const [selectedState, setSelectedState] = useState<string>(value || '');

    const handleChange = useCallback((selectedValue: string) => {
        setSelectedState(selectedValue);
        onChange(selectedValue);
    }, [onChange]);

    useEffect(() => {
        const countryStates = statesData.filter((state) => state.country === selectedCountry);

        setStates(countryStates as State[]);

        if (countryStates.length === 0) {
            setUseInput(true);
            handleChange('');
        } else {
            setUseInput(false);
        }
    }, [selectedCountry, handleChange]);

    useEffect(() => {
        setSelectedState(value || '');
    }, [value]);


    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {useInput ? (
                <Input
                    placeholder="Enter state/province"
                    value={selectedState}
                    onChange={(e) => handleChange(e.target.value)}
                    className={cn(inputVariants({ variant, isError, className }))}
                />
            ) : (
                <Select onValueChange={handleChange} value={selectedState}>
                    <SelectTrigger className={cn(inputVariants({ variant, isError, className }))}>
                        <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>

                        <SelectGroup>
                            {states.map((state) => (
                                <SelectItem key={state.code} value={state.code}>
                                    {state.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>

                    </SelectContent>
                </Select>
            )
            }

            {isError && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};

export default StatesPicker;