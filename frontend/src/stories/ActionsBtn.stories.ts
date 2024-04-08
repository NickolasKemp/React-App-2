import type { Meta, StoryObj } from '@storybook/react';
import ActionsBtn from '../components/ui/buttons/ActionsBtn'

const meta = {
  component: ActionsBtn,
  title: "buttons/ActionsBtn"

} satisfies Meta<typeof ActionsBtn>

export default meta

type Story = StoryObj<typeof meta>

export const Edit: Story = {
  args: {
    btnType: 'edit',
    children: 'Edit'
  }
}

export const Create: Story = {
  args: {
    btnType: 'delete',
    children: 'Delete'
  }
}

export const Delete: Story = {
  args: {
    btnType: 'create',
    children: 'Create'
  }
}


