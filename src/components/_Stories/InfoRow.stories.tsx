import type { Meta, StoryObj } from '@storybook/react';

import InfoRow from '../InfoRow';
import Snippet from '../Snippet';

const meta: Meta<typeof InfoRow> = {
    component: InfoRow,
};

export default meta;
type Story = StoryObj<typeof InfoRow>;

export const Default: Story = {
    args: {
        label: "Purchase Order ID",
        value: <Snippet>11312432412</Snippet>
    },
};