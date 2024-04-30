import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-size:16px;
  }


  html {
    padding-right:0 !important;
  }


  *::before,
  *::after {
    box-sizing: border-box;
  }

 

  body {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: 16px;
    height:100vh;
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
