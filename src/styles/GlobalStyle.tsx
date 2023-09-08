import { createGlobalStyle } from 'styled-components';

import reset from 'styled-reset';
import font from './font';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${font}

  html {
    font-family: 'Pretendard', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.fontPrimary};
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
