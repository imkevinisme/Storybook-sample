import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from "../ui/button";

const inputVariants = cva(
    "h-10 w-full flex justify-between rounded-md font-normal",
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


export interface InputBoxProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    date: DateRange | undefined;
    onChangeDate: (...event: any[]) => void
    isBackDate?: boolean;
    triggerClassName?: string;
}

const DateRangePicker = React.forwardRef<HTMLInputElement, InputBoxProps>(
    ({
        className,
        label,
        required,
        isError,
        errorMessage,
        variant,
        date,
        onChangeDate,
        isBackDate = true,
        triggerClassName,
    }, ref) => {

        const [dateRange, setDateRange] = React.useState<DateRange | undefined>( date || {
            from: new Date(2022, 0, 20),
            to: addDays(new Date(2022, 0, 20), 20),
        });

        const handleDateChange = (dateRange: DateRange) => {
            setDateRange(dateRange);
            onChangeDate(dateRange);
        }

        React.useEffect(() => {
            setDateRange(date);
        }, [date]);


        return (
            <div className="w-full">
                {label && (
                    <label className="block mb-1 text-sm font-medium">
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                <div className={cn("grid gap-2", className)}>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                triggerClassName,
                                !dateRange && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(dateRange.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={dateRange ?? undefined}
                                onSelect={(range: DateRange | undefined) => {
                                    if (range) handleDateChange(range)
                                }}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* <Popover>
                    <PopoverTrigger asChild className={cn(inputVariants({ variant, isError, className }))} >
                        <Button variant={"outline"}>
                            {date ? format(date, "PPP") : (<p>Pick a date</p>)}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={onChangeDate}
                            disabled={(date) =>
                            isBackDate ?
                                date < new Date("1900-01-01")
                                :
                                date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover> */}

                {isError && errorMessage && (
                    <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}

            </div>
        );
    }
);

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
