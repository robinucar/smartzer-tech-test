import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
