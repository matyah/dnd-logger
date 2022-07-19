import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from '../Label';
import { Radio } from './Radio';

export default {
  title: 'atoms/FormControls/Radio',
  component: Radio,
  argTypes: {},
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => (
  <div className="flex items-center gap-2">
    <Radio id="accept" {...args} />
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
