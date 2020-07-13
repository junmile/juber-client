import * as styledComponents from 'styled-components';

import { ThemedStyledComponentsModule } from 'styled-components';

interface IThemeInterface {
  blueColor: string;
  greyColor: string;
  yellowColor: string;
  greenColor: string;
  redColor: string;
}
const {
  default: styled,
  css,
  ThemeProvider,
  createGlobalStyle,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, ThemeProvider, createGlobalStyle };
export default styled;
