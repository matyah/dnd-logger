import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextArea } from './TextArea';

export default {
  title: 'atoms/formControls/TextArea',
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Base = Template.bind({});

Base.args = {};
