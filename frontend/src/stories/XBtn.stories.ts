import type { Meta, StoryObj } from '@storybook/react';
import XBtn from '../components/ui/buttons/XBtn'

const meta = {
  component: XBtn,
  title: "buttons/XBtn"

} satisfies Meta<typeof XBtn>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    color: "white"
  }
}

export const Dark: Story = {
  args: {
    color: "black"
  }
}

