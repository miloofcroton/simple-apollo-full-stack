import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono');

  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    text-align: center;
    margin: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

`;

export default GlobalStyle;
