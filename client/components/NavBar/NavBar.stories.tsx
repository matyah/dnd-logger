import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavBar } from './NavBar';

export default {
  title: 'molecule/NavBar',
  component: NavBar,
  argTypes: {},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => (
  <NavBar {...args}>
    <NavBar.Brand>Brand !</NavBar.Brand>
    <NavBar.Toggle />
    <NavBar.Collapse>
      <NavBar.Link href="#">Home</NavBar.Link>
      <NavBar.Link href="#">About</NavBar.Link>
      <NavBar.Link href="#">Blog</NavBar.Link>
      <NavBar.Link href="#">Contact</NavBar.Link>
    </NavBar.Collapse>
  </NavBar>
);

export const Base = Template.bind({});
