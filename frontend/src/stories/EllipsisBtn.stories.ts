import type { Meta, StoryObj } from '@storybook/react';
import EllipsisBtn from '../components/ui/buttons/EllipsisBtn'

const meta = {
  component: EllipsisBtn,
  title: "buttons/EllipsisBtn"

} satisfies Meta<typeof EllipsisBtn>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    color: 'white'
  }
}

export const Dark: Story = {
  args: {
    color: 'black'
  }
}


