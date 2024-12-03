import type { Meta, StoryObj } from '@storybook/react';

import MultiLineInput from '../MultiLineInput';

const meta: Meta<typeof MultiLineInput> = {
    component: MultiLineInput,
};

export default meta;
type Story = StoryObj<typeof MultiLineInput>;

export const Default: Story = {
    args: {
        label: "Serial Numbers",
        required: true,
        isError: false,
        errorMessage: "This is an error message",
        initialValues: [
            { value: "1", text: "Serial Number 1" },
            { value: "2", text: "Serial Number 2" },
            { value: "3", text: "Serial Number 3" },
            { value: "4", text: "Serial Number 4" },
        ],
        onChange: (values) => {
            console.log(values);
        },
        inputVariant: "ghost",
        addButtonVariant: "default",
        addButtonText: "Add Serial Number",
        sanitizeInput: (value) => {
            // Example sanitization functions:
            // return value.trim().toLowerCase(); // Remove whitespace and convert to lowercase
            // or
            return value.replace(/[^a-zA-Z0-9]/g, ''); // Remove all non-alphanumeric characters
            // or
            // return value.slice(0, 10); // Limit to 10 characters
        },
        validateInput: (value) => {
            if (!value) return {
                isValid: false,
                errorMessage: "Value is required"
            };
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                isValid: emailRegex.test(value),
                errorMessage: emailRegex.test(value) ? undefined : "Please enter a valid email address"
            };
        }

    },
};