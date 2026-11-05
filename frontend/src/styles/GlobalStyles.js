import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
    background-color: #050507;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    user-select: none;
  }

  /* Retícula técnica sutil estilo CAD no fundo */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(rgba(244, 244, 240, 0.055) 1px, transparent 0);
    background-size: 28px 28px;
    z-index: 1;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(212, 255, 51, 0.35);
  }
`;
