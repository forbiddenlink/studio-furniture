import type { Meta, StoryObj } from '@storybook/react';
import { AISearch } from './AISearch';

const meta: Meta<typeof AISearch> = {
    title: 'AI/AISearch',
    component: AISearch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        onResults: (results) => console.log('Search Results:', results),
    },
};

export default meta;
type Story = StoryObj<typeof AISearch>;

export const Default: Story = {};
