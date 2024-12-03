import React from "react";
import { GripVertical, X } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { useSortable } from '@dnd-kit/sortable';

import { Button } from "@/components/ui/button";
import InputBox, { inputVariants } from "@/components/InputBox";
import { MultiLineInputItem } from "./types";

interface SortableItemProps {
    item: MultiLineInputItem;
    index: number;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: keyof MultiLineInputItem | Partial<MultiLineInputItem>, value?: any) => void;
    inputVariant?: VariantProps<typeof inputVariants>["variant"];
    showRemove: boolean;
    sanitizeInput?: (value: string) => string;
    validateInput?: (value: string) => {
        isValid: boolean;
        errorMessage?: string;
    };
}

export function SortableItem({
    item,
    index,
    onRemove,
    onUpdate,
    inputVariant,
    showRemove,
    sanitizeInput,
    validateInput
}: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.value });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    } as React.CSSProperties;

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-2 mb-2">
            <div className="cursor-move" {...attributes} {...listeners}>
                <GripVertical className="h-4 w-4 text-gray-500" />
            </div>
            <div className="flex-1">
                <InputBox
                    placeholder="Text"
                    value={item.text}
                    onChange={(e) => {
                        const newValue = sanitizeInput
                            ? sanitizeInput(e.target.value)
                            : e.target.value;
                        onUpdate(index, 'text', newValue);
                    }}
                    onBlur={() => {
                        if (validateInput) {
                            const { isValid, errorMessage } = validateInput(item.text);
                            onUpdate(index, {
                                error: !isValid,
                                errorMessage,
                                isDirty: true
                            });
                        } else {
                            onUpdate(index, 'isDirty', true);
                        }
                    }}
                    variant={inputVariant}
                    isError={item.isDirty && item.error}
                    errorMessage={item.isDirty ? item.errorMessage : ''}
                />
            </div>
            {showRemove && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(index)}
                    className="h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

export default SortableItem;
