import type { Meta, StoryObj } from '@storybook/react';

import DataCalendar from '../DataCalendar';

const meta: Meta<typeof DataCalendar> = {
    component: DataCalendar,
};

export default meta;
type Story = StoryObj<typeof DataCalendar>;

export const Default: Story = {
    args: {
        data : [
            {
                "id": 5,
                "title": "Sample Event 5",
                "start": new Date (new Date(new Date().setDate(new Date().getDate() + 1)).setHours(12, 0, 0, 0)),
                "end": new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(13, 0, 0, 0)),
                "classNames": "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-50"
            },
         ] ,
        onEventClick : (event) => {
            console.log(event);
        },
        onCellClick : (date) => {
            console.log(date);
        }
    },
};