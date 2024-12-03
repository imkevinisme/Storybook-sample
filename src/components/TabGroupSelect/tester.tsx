"use client";

// TODO: Remove this tester

import MultiLineInput from "../MultiLineInput";
import { TabGroupSelect } from "./index";

export default function Tester() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <TabGroupSelect value="1" options={[
                    {
                        value: "1",
                        label: "Option 1",
                    },
                    {
                        value: "2",
                        label: "Option 2",
                    },
                    {
                        value: "3",
                        label: "Option 3",
                    },
                    {
                        value: "4",
                        label: "Option 4",
                    }
                ]} onChange={(value) => {
                    console.log(value);
                }} />
            </div>

            <div>
                <MultiLineInput
                    label="Serial Numbers"
                    required
                    isError={false}
                    errorMessage="This is an error message"
                    initialValues={[
                        { value: "1", text: "Serial Number 1" },
                        { value: "2", text: "Serial Number 2" },
                        { value: "3", text: "Serial Number 3" },
                        { value: "4", text: "Serial Number 4" },
                    ]}
                    onChange={(values) => {
                        console.log(values);
                    }}
                    inputVariant="ghost"
                    addButtonVariant="default"
                    addButtonText="Add Serial Number"
                    sanitizeInput={(value) => {
                        // Example sanitization functions:
                        // return value.trim().toLowerCase(); // Remove whitespace and convert to lowercase
                        // or
                        return value.replace(/[^a-zA-Z0-9]/g, ''); // Remove all non-alphanumeric characters
                        // or
                        // return value.slice(0, 10); // Limit to 10 characters
                    }}
                    validateInput={(value) => {
                        if (!value) return {
                            isValid: false,
                            errorMessage: "Value is required"
                        };
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return {
                            isValid: emailRegex.test(value),
                            errorMessage: emailRegex.test(value) ? undefined : "Please enter a valid email address"
                        };
                    }}
                />
            </div>
        </div>
    );
}
