import * as styledComponents from 'styled-components/native';

import { DefaultTheme } from 'styled-components';

interface IThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
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
  ThemeProvider
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, ThemeProvider };
export default styled;
