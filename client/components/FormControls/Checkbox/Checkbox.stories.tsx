import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from '../Label';
import { Checkbox } from './Checkbox';

export default {
  title: 'atoms/FormControls/Checkbox',
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <div className="flex items-center gap-2">
    <Checkbox id="accept" {...args} />
    <Label htmlFor="accept">
      I agree to the{' '}
      <a
        href="/forms"
        className="text-blue-600 hover:underline dark:text-blue-500"
      >
        terms and conditions
      </a>
    </Label>
  </div>
);

export const Base = Template.bind({});
