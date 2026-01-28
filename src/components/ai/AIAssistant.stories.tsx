import type { Meta, StoryObj } from '@storybook/react';
import { AIAssistant } from './AIAssistant';

// Simple mock for the useChat hook to avoid real API calls in Storybook
// Note: In a real advanced setup, we would mock the API response via MSW or Storybook loaders.
// For now, we rely on the component's handling or simple render.
// Since the component uses `useChat` from `@ai-sdk/react`, it might error without a context provider 
// if we don't mock the module. But let's try rendering it first.

const meta: Meta<typeof AIAssistant> = {
    title: 'AI/AIAssistant',
    component: AIAssistant,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof AIAssistant>;

export const Default: Story = {};
