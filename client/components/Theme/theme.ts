import {
  ButtonColors,
  ButtonOutlineColors,
  ButtonSizes,
} from '../Button/Button';
import { PositionInButtonGroup } from '../Button/ButtonGroup';
import { HelperColors } from '../FormControls/HelperText/HelperText';
import { TextAreaColors } from '../FormControls/TextArea/TextArea';
import {
  TextInputColors,
  TextInputSizes,
} from '../FormControls/TextInput/TextInput';

export interface DungeonLoggerTheme {
  button: {
    base: string;
    color: ButtonColors;
    disabled: string;
    inner: {
      base: string;
      position: PositionInButtonGroup;
    };
    label: string;
    outline: DungeonLoggerBoolean & {
      color: ButtonOutlineColors;
      pill: DungeonLoggerBoolean;
    };
    pill: DungeonLoggerBoolean;
    size: ButtonSizes;
  };
  buttonGroup: {
    base: string;
    position: PositionInButtonGroup;
  };
  navbar: {
    base: string;
    rounded: DungeonLoggerBoolean;
    bordered: DungeonLoggerBoolean;
    inner: {
      base: string;
      fluid: DungeonLoggerBoolean;
    };
    brand: string;
    collapse: {
      base: string;
      list: string;
      hidden: DungeonLoggerBoolean;
    };
    link: {
      base: string;
      active: DungeonLoggerBoolean;
      disabled: DungeonLoggerBoolean;
    };
    toggle: {
      base: string;
      icon: string;
    };
  };
  formControls: {
    helperText: {
      base: string;
      colors: HelperColors;
    };
    textarea: {
      base: string;
      colors: TextAreaColors;
      withShadow: DungeonLoggerBoolean;
    };
    label: {
      base: string;
      colors: any;
      disabled: string;
    };
    checkbox: {
      base: string;
    };
    radio: {
      base: string;
    };
    textInput: {
      base: string;
      addon: string;
      field: {
        base: string;
        icon: {
          base: string;
          svg: string;
        };
        input: {
          base: string;
          sizes: TextInputSizes;
          colors: TextInputColors;
          withIcon: DungeonLoggerBoolean;
          withAddon: DungeonLoggerBoolean;
          withShadow: DungeonLoggerBoolean;
        };
      };
    };
  };
}

export interface DungeonLoggerStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface DungeonLoggerColors extends DungeonLoggerStateColors {
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface DungeonLoggerBoolean {
  off: string;
  on: string;
}

export type DungeonLoggerHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface DungeonLoggerPositions {
  'bottom-left': string;
  'bottom-right': string;
  'bottom-center': string;
  'top-left': string;
  'top-center': string;
  'top-right': string;
  'center-left': string;
  center: string;
  'center-right': string;
}

export interface DungeonLoggerSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
}
