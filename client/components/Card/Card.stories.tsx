import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';

export default {
  title: 'molecules/Card',
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <div className="max-w-sm">
    <Card {...args}>this is my card</Card>
  </div>
);

export const Base = Template.bind({});
Base.args = {
  imgHeight: 380,
  imgWidth: 250,
  imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
};
