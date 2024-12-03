import type { Meta, StoryObj } from '@storybook/react';

import CountriesPicker from '@/components/CountriesPicker';

const meta: Meta<typeof CountriesPicker> = {
    component: CountriesPicker,
};

export default meta;
type Story = StoryObj<typeof CountriesPicker>;

export const Default: Story = {
    args: {
        label: "Country",
        required: false,
        isError: false,
        errorMessage: "This field is required",
        value: "US",
        variant: "ghost",
        onChange: (value: string) => {
            console.log(value);
        }
    },
};