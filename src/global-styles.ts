import reset from 'styled-reset';
import { createGlobalStyle } from './typed-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  input,
  button {
    &:focus,&:active{outline: none}
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: "Maven Pro", sans-serif;
  }
`;

export default GlobalStyle;
