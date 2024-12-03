import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../ui/button';

import AssetViewer from '../Modals/AssetViewer';

const meta: Meta<typeof AssetViewer> = {
    component: AssetViewer,
};

export default meta;
type Story = StoryObj<typeof AssetViewer>;

export const Default: Story = {
    args: {
        trigger: <Button variant="ghost" className="w-full justify-start px-2 py-1.5 font-medium">View</Button>,
        title: "File Details",
        file: {
            url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            type: 'png',
            name: "googlelogo_color_272x92dp.png",
            size: "12.5 KB",
            uploadDate: "2021-09-01T00:00:00.000Z",
            uploadedBy: "John Doe",
        }
    },
};