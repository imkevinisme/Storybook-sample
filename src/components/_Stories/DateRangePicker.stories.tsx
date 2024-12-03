import type { Meta, StoryObj } from '@storybook/react';

import DateRangePicker from '../DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
    component: DateRangePicker,
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
    args: {
        date: {
            from: new Date('Mon Nov 25 2024 15:42:09 GMT+0800 (Malaysia Time)'), 
            to: new Date('Mon Dec 02 2024 15:42:09 GMT+0800 (Malaysia Time)')
        },
        onChangeDate: (dateRange) => {{}},
        triggerClassName: "h-10"
    },
};