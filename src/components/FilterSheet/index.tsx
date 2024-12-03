"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronRight, Circle } from "lucide-react";
import { CapitalizeName } from "@ounch/utils";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";


interface FilterOption {
    key: string;
    label: string;
}

interface FilterGroup {
    name: string;
    type: 'checkbox' | 'radio' | 'select';
    options: FilterOption[];
}

interface FilterSheetProps {
    filterGroups: FilterGroup[];
    onSubmitFilters: (filters: Record<string, string[]>) => void;
    title?: string;
    buttonText?: string;
    triggerText?: string;
}

const FilterSheet: React.FC<FilterSheetProps> = ({
    filterGroups,
    onSubmitFilters,
    title = "Filters",
    buttonText = "Apply Filters",
    triggerText = "Filters"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [confirmedFilters, setConfirmedFilters] = useState<Record<string, string[]>>({});

    const handleFilterToggle = (groupName: string, key: string) => {
        setAppliedFilters(prev => {
            const group = prev[groupName] || [];
            const updatedGroup = group.includes(key)
                ? group.filter(k => k !== key)
                : [...group, key];
            return { ...prev, [groupName]: updatedGroup };
        });
    };

    const handleRadioChange = (groupName: string, key: string) => {
        setAppliedFilters(prev => ({ ...prev, [groupName]: [key] }));
    };

    const handleSelectChange = (groupName: string, key: string) => {
        setAppliedFilters(prev => ({ ...prev, [groupName]: [key] }));
    };

    const toggleGroup = (group: string) => {
        setExpandedGroups(prev =>
            prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
        );
    };

    const totalConfirmedFilters = Object.values(confirmedFilters).flat().length;

    const handleApplyFilters = () => {
        onSubmitFilters(appliedFilters);
        setConfirmedFilters(appliedFilters);
        setIsOpen(false);
    };

    const isGroupFiltered = (groupName: string) => {
        return appliedFilters[groupName] && appliedFilters[groupName].length > 0;
    };

    const handleClearAllFilters = () => {
        setAppliedFilters({});
        setConfirmedFilters({});
        onSubmitFilters({});
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-10">
                    <SlidersHorizontal size={16} />
                    {triggerText}
                    {totalConfirmedFilters > 0 && (
                        <Badge variant="secondary">{totalConfirmedFilters}</Badge>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px] p-0"
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={handleClearAllFilters}
                            disabled={totalConfirmedFilters === 0}
                            className="text-primary p-0 h-auto"
                        >
                            Clear All
                        </Button>
                    </div>
                    <ScrollArea className="flex-grow">
                        <div className="px-6">
                            {filterGroups.map((group, index) => (
                                <React.Fragment key={group.name}>
                                    {index > 0 && <Separator className="my-4" />}
                                    <div className="mb-4">
                                        <button
                                            onClick={() => toggleGroup(group.name)}
                                            className="flex items-center justify-between text-md font-medium mb-2 w-full p-2 rounded hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                {CapitalizeName(group.name)}
                                                {isGroupFiltered(group.name) && (
                                                    <Circle className="ml-2 h-2 w-2 fill-current text-blue-500" />
                                                )}
                                            </div>
                                            {expandedGroups.includes(group.name) ? (
                                                <ChevronDown size={20} />
                                            ) : (
                                                <ChevronRight size={20} />
                                            )}
                                        </button>

                                        {expandedGroups.includes(group.name) && (
                                            <div className="ml-2">
                                                {group.type === 'checkbox' && (
                                                    group.options.map(option => (
                                                        <div key={option.key} className="flex items-center mb-2">
                                                            <Checkbox
                                                                id={option.key}
                                                                checked={(appliedFilters[group.name] || []).includes(option.key)}
                                                                onCheckedChange={() => handleFilterToggle(group.name, option.key)}
                                                                className="mr-2"
                                                            />
                                                            <label
                                                                htmlFor={option.key}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))
                                                )}

                                                {group.type === 'radio' && (
                                                    <RadioGroup
                                                        onValueChange={(value) => handleRadioChange(group.name, value)}
                                                        value={(appliedFilters[group.name] || [])[0]}
                                                    >
                                                        {group.options.map(option => (
                                                            <div key={option.key} className="flex items-center space-x-2 mb-2">
                                                                <RadioGroupItem value={option.key} id={option.key} />
                                                                <label
                                                                    htmlFor={option.key}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                )}

                                                {group.type === 'select' && (
                                                    <Select
                                                        onValueChange={(value) => handleSelectChange(group.name, value)}
                                                        value={(appliedFilters[group.name] || [])[0]}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select an option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {group.options.map(option => (
                                                                <SelectItem key={option.key} value={option.key}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="p-6 mt-auto border-t">
                        <Button onClick={handleApplyFilters} className="w-full">
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FilterSheet;
