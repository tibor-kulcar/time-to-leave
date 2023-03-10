import 'styled-components';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      title: string;
      background: string;
      backgroundSecondary: string;
      text: string;
      borderColor: string;
    };
  }
}
