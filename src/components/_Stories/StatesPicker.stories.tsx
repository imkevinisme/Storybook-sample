import type { Meta, StoryObj } from '@storybook/react';

import StatesPicker from '@/components/CountriesPicker/StatesPicker';


const meta: Meta<typeof StatesPicker> = {
    component: StatesPicker,
};

export default meta;
type Story = StoryObj<typeof StatesPicker>;

export const Default: Story = {
    args: {
        label: "States",
        required: false,
        isError: false,
        errorMessage: "This field is required",
        value: '',
        variant: "ghost",
        selectedCountry: 'US',
        onChange: (value: string) => {
            console.log(value);
        }
    },
};