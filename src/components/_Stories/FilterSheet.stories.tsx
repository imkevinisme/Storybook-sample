import type { Meta, StoryObj } from '@storybook/react';

import FilterSheet from '../FilterSheet';

const meta: Meta<typeof FilterSheet> = {
    component: FilterSheet,
};

export default meta;
type Story = StoryObj<typeof FilterSheet>;

export const Default: Story = {
    args: {
        title: "Custom Filters",
        filterGroups: [
            {
                name: "Users",
                type: "select",
                options: [
                    {key: '9cf0b945-b8c4-4022-865a-19a35b25689b', label: 'Rajesh'},
                    {key: '53ed58e3-58a8-49c8-8bd8-7b7e4994c8a9', label: 'Kevin'},
                    {key: '91f47b7a-963b-410a-bbb4-2920a9126b93', label: 'Kumar'}
                ],
            },
            {
                name: "Resource",
                type: "select",
                options: [
                    { key: "Supplier", label: "Supplier" },
                    { key: "Purchase Order", label: "Purchase Order" },
                    { key: "Folder", label: "Folder" },
                    { key: "Document", label: "Document" },
                    { key: "Remark", label: "Remark" },
                ],
            },
            {
                name: "Action",
                type: "select",
                options: [
                    { key: "CREATE", label: "Create" },
                    { key: "UPDATE", label: "Update" },
                    { key: "DELETE", label: "Delete" },

                ],
            }
        ],
        onSubmitFilters: (filters: Record<string, string[]>) => {
            const customFilters = Object.entries(filters).reduce<Record<string, any>>(
                (acc, [key, values]) => {
                    if (values.length > 0) {
                        acc[key] = values;
                    }
                    return acc;
                },
                {}
            );

            // setState({ customFilters });
        },
    },
};