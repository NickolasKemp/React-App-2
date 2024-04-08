import type { Meta, StoryObj } from '@storybook/react';
import BoardCard from '../components/ui/cards/BoardCard'

const meta = {
  component: BoardCard,
  title: "cards/BoardCard"

} satisfies Meta<typeof BoardCard>

export default meta

type Story = StoryObj<typeof meta>

export const Ordinary: Story = {
  args: {
    title: "board title",
  }
}

