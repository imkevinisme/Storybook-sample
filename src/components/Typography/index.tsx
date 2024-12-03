import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface Props {
    text: string;
    className?: string;
    classNames?: {
        spanClass?: string;
    };
}

export const HeadingOne: FC<Props> = ({ text, className }) => {
    return (
        <h1 className={cn(`text-3xl font-medium text-dark`, className)}>{text}</h1>
    );
};


export const TextLead: FC<Props> = ({
    text,
    className,
    classNames: {
        spanClass = 'text-primary-800',
    } = {},
}) => {
    return (
        <p
            className={`text-xl text-secondary dark:text-slate-200  font-light ${className}`}
            dangerouslySetInnerHTML={{ __html: ConvertToSpan(text, spanClass) }}
        >
        </p>
    );
}




export const ConvertToSpan = (text: string, className?: string) => {
    const regex = /\[\[(.*?)\]\]/g;
    const newText = text.replace(regex, (match, p1) => {
        return `<span class="${className ? className : ''}">${p1}</span>`;
    });
    return newText;
};

