
import React from "react";
import { format as formatDate } from "date-fns";
import { cn } from "@/lib/utils";

interface TimestampFormatterProps {
    timestamp: number | null;
    format?: string;
    className?: string;
}

const TimestampFormatter: React.FC<TimestampFormatterProps> = ({
    timestamp,
    format = 'MMM dd, yyyy',
    className = ''
}) => {
    if (!timestamp) return <span>N/A</span>;

    const date = new Date(
        timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
    );

    return <span className={cn('', className)}>{formatDate(date, format)}</span>;
};

export default TimestampFormatter;
