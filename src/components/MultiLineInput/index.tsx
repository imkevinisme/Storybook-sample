"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,} from '@dnd-kit/sortable';

import { Button, buttonVariants } from "@/components/ui/button";
import InputBox, { inputVariants } from "@/components/InputBox";
import { cn } from "@/lib/utils";
import SortableItem from "./SortableItem";
import { MultiLineInputItem } from "./types";

interface MultiLineInputProps {
    initialValues?: MultiLineInputItem[];
    onChange?: (values: MultiLineInputItem[]) => void;
    className?: string;
    addButtonText?: string;
    addButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
    inputVariant?: VariantProps<typeof inputVariants>["variant"];
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    sanitizeInput?: (value: string) => string;
    validateInput?: (value: string) => {
        isValid: boolean;
        errorMessage?: string;
    };
}

function generateValue() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function MultiLineInput({
    initialValues = [],
    onChange,
    className,
    addButtonText = "Add Row",
    addButtonVariant = "outline",
    inputVariant = "default",
    label,
    required,
    isError,
    errorMessage,
    sanitizeInput,
    validateInput,
}: MultiLineInputProps) {
    const [items, setItems] = useState<MultiLineInputItem[]>(
        initialValues.map(item => ({ ...item, isDirty: false, error: false, errorMessage: '' }))
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setItems(initialValues);
    }, [initialValues]);

    useEffect(() => {
        onChange?.(items);
    }, [items, onChange]);

    const addNewRow = () => {
        setItems([...items, {
            value: generateValue(),
            text: "",
            isDirty: false,
            error: false,
            errorMessage: ''
        }]);
    };

    const removeRow = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const updateItem = (
        index: number,
        field: keyof MultiLineInputItem | Partial<MultiLineInputItem>,
        value?: any
    ) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            if (typeof field === 'string') {
                newItems[index] = {
                    ...newItems[index],
                    [field]: value
                };
            } else {
                newItems[index] = {
                    ...newItems[index],
                    ...field
                };
            }
            return newItems;
        });
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.value === active.id);
                const newIndex = items.findIndex((item) => item.value === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className={cn(
            "w-full rounded",
            className,
            isError && "bg-red-50 dark:bg-red-950"
        )}>
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(item => item.value)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((item, index) => (
                        <SortableItem
                            key={item.value}
                            item={item}
                            index={index}
                            onRemove={removeRow}
                            onUpdate={updateItem}
                            inputVariant={inputVariant}
                            showRemove={items.length > 1}
                            sanitizeInput={sanitizeInput}
                            validateInput={validateInput}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button
                variant={addButtonVariant}
                size="sm"
                onClick={addNewRow}
                className="mt-2"
            >
                <Plus className="h-4 w-4 mr-2" />
                {addButtonText}
            </Button>
            {isError && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
}

export default MultiLineInput;
