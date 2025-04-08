import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    _colors: {
      primary: string;
      secondary: string;
      [key: string]: string; // Optional: Allow additional colors
    };
    _breakpoints: {
      sm: string;
      md: string;
      lg: string;
      [key: string]: string; // Optional: Allow additional breakpoints
    };
  }
}