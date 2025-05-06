import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      gray: string;
    };
    spacing: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
