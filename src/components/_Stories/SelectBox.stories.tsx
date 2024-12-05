import type { Meta, StoryObj } from '@storybook/react';

import SelectBox from '../SelectBox';
import { useState } from 'react';

const meta: Meta<typeof SelectBox> = {
    component: SelectBox,
};

export default meta;
type Story = StoryObj<typeof SelectBox>;


export const Default: Story = {
    args: {
        label: "Title",
        options: [
            { value: 'mr', key: 'Mr' },
            { value: 'mrs', key: 'Mrs' },
            { value: 'ms', key: 'Ms' },
            { value: 'miss', key: 'Miss' },
        ],
        value: '',
        onChange: (value: string) => {
            console.log(value);
        },
        placeholder: "Select title",
        isError: false,
        errorMessage: "This field is required",
        variant: "ghost"
    },
};