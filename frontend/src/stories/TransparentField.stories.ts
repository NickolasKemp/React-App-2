import type { Meta, StoryObj } from '@storybook/react';
import { TransparentField } from '../components/ui/fields/TransparentField'

const meta = {
  component: TransparentField,
  title: "fields/TransparentField"

} satisfies Meta<typeof TransparentField>

export default meta

type Story = StoryObj<typeof meta>

export const Ordinary: Story = {
  args: {
  }
}


