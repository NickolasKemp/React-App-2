import type { Meta, StoryObj } from '@storybook/react';
import HeaderBtn from '../components/ui/buttons/HeaderBtn'

const meta = {
  component: HeaderBtn,
  title: "buttons/HeaderBtn"

} satisfies Meta<typeof HeaderBtn>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
  }
}

export const Secondary: Story = {
  args: {
    children: 'Edit',
    primary: false
  }
}



