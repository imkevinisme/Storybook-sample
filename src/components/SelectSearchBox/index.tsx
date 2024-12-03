"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";


interface Option {
    key: string;
    value: string;
    selected?: boolean;
}


interface SelectSearchBoxProps {
    placeholder: string;
    options: Option[];
    onChange: (selectedKeys: string[]) => void;
    width?: string;
}


const SelectSearchBox: React.FC<SelectSearchBoxProps> = ({
    placeholder,
    options,
    onChange,
    width = "180px",
}) => {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(
        options.filter(option => option.selected).map(option => option.key)
    );
    const [showEllipsis, setShowEllipsis] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (currentKey: string) => {
        const updatedKeys = selectedKeys.includes(currentKey)
            ? selectedKeys.filter((key) => key !== currentKey)
            : [...selectedKeys, currentKey];
        setSelectedKeys(updatedKeys);
        onChange(updatedKeys);
    };

    const handleRemove = (e: React.MouseEvent, key: string) => {
        e.stopPropagation();
        const updatedKeys = selectedKeys.filter((k) => k !== key);
        setSelectedKeys(updatedKeys);
        onChange(updatedKeys);
    };

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                setShowEllipsis(
                    containerRef.current.scrollWidth > containerRef.current.clientWidth
                );
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [selectedKeys]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`justify-between bg-white dark:bg-slate-900 px-3 relative`}
                    style={{ width }}
                >
                    <div
                        ref={containerRef}
                        className="flex items-center space-x-1 overflow-x-hidden"
                        style={{ maxWidth: `calc(${width} - 3.5rem)` }}
                    >
                        {selectedKeys.length > 0 ? (
                            selectedKeys.map((key) => {
                                const option = options.find((o) => o.key === key);
                                return (
                                    <div key={key} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center flex-shrink-0">
                                        {option?.value}
                                        <X
                                            className="ml-1 h-3 w-3 cursor-pointer"
                                            onClick={(e) => handleRemove(e, key)}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>

                    {showEllipsis && (
                        <div className="absolute right-8 w-8 h-full flex items-center justify-end bg-gradient-to-r from-transparent to-white dark:to-slate-900">
                            <span className="ps-2">&hellip;</span>
                        </div>
                    )}

                    <ChevronsUpDown className="ml-2 h-3 w-3 opacity-50 absolute right-3" />

                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0" style={{ width }}>
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandList>
                        <ScrollArea className="max-h-[25vh]">
                            <CommandGroup>
                                {options && options.length > 0 ? (
                                    options.map((option) => (
                                        <CommandItem
                                            key={option.key}
                                            onSelect={() => handleSelect(option.key)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedKeys.includes(option.key) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.value}
                                        </CommandItem>
                                    ))
                                ) : (
                                    <CommandItem>No options available</CommandItem>
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectSearchBox;

