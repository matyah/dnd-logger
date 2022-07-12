import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

export default {
  title: 'atoms/ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args}>
    <Button>Click 1</Button>
    <Button>Click 2</Button>
    <Button>Click 3</Button>
  </ButtonGroup>
);

export const Base = Template.bind({});
