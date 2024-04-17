import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-size:16px;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }
  div button {
  transition-duration: 0.2s;
  }

  body {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  button {
    border:none;
  }
  
  table {
    margin: 0;
  }
`;
