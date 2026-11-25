import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.bgCanvas};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden;
  }

  button, a, input, select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandPrimary};
    outline-offset: 2px;
  }

  /* Barras de rolagem discretas e refinadas */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(30, 36, 32, 0.16);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(30, 36, 32, 0.30);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
