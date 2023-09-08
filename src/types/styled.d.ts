import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      [index: string]: string;

      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;

      bg: string;

      primary: string;
      primaryLight: string;

      fontPrimary: string;
      fontSecondary: string;
    };
  }
}
