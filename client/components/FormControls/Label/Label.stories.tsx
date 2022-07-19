import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from './Label';

export default {
  title: 'atoms/formControls/Label',
  component: Label,
  argTypes: {},
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Base = Template.bind({});
Base.args = {
  value: 'This is a label',
};
