import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextInput } from './TextInput';

export default {
  title: 'atoms/formControls/TextInput',
  component: TextInput,
  argTypes: {},
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Base = Template.bind({});
Base.args = {
  helperText: 'help me here',
};
