import type { Meta, StoryObj } from '@storybook/react';
import TaskCard from '../components/ui/cards/TaskCard'
import { EnumTaskPriority } from '../types/task.types';

const meta = {
  component: TaskCard,
  title: "cards/TaskCard"

} satisfies Meta<typeof TaskCard>

export default meta

type Story = StoryObj<typeof meta>

export const Ordinary: Story = {
  args: {
    name: "task name",
    description: "task description",
    priority: EnumTaskPriority.medium,
  }
}

