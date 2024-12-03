"use client"

import React, { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"

import countriesData from "./countries.json";

type CountryCode = typeof countriesData[number]["code"]; // Extracting the country codes

interface CountriesPickerProps {
    value: CountryCode; // Changed type to CountryCode
    onChange: (value: CountryCode) => void; // Updated parameter type
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    variant?: VariantProps<typeof inputVariants>['variant'];
    className?: string;
}

const inputVariants = cva(
    "h-10 rounded-md font-medium w-full justify-between",
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


const CountriesPicker = ({ value, onChange, label, required, isError, errorMessage, variant, className }: CountriesPickerProps) => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState<CountryCode>(value); // Updated to use CountryCode

    const handleChange = (newCode: string) => {
        setCode(newCode);
        onChange(newCode);
    }

    useEffect(() => {
        setCode(value);
    }, [value]);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(inputVariants({ variant, isError, className }))}
                    >
                        {code
                            ? countriesData.find((country) => country.code === code)?.country
                            : "Select Country..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>


                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[500px] p-0" align="start" side="bottom">
                    <Command>
                        <CommandInput placeholder="Search Country..." />
                        <CommandList>
                            <CommandEmpty>No countries found.</CommandEmpty>
                            <CommandGroup>
                                {countriesData.map((country) => (
                                    <CommandItem
                                        key={country.code}
                                        value={country.country}
                                        onSelect={(currentValue) => {
                                            // Find the country code from the country name
                                            const countryCode = countriesData.find((country) => country.country === currentValue)?.code;
                                            if (countryCode) {
                                                handleChange(countryCode === code ? "" : countryCode)
                                                setOpen(false)
                                            }
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                code === country.code ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {country.country}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {isError && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    )
}

export default CountriesPicker;
