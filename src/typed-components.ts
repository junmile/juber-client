import * as styledComponents from 'styled-components/native';

import { DefaultTheme } from 'styled-components';

interface IThemeInterface {
  blueColor: string;
}

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta'
  }
};
const {
  default: styled,
  css,
  ThemeProvider,
  createGlobalStyle
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, ThemeProvider, createGlobalStyle };
export default styled;
