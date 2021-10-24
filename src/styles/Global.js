import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    background: #fffdf4;
    color: #333;
    font-family: Montserrat, sans-serif;
    cursor: default;
    font-size: 0.95em;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  select {
    font-family: Montserrat, sans-serif;
  }

  body.shiftOn * {
    cursor: cell !important;
  }

  * {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-overflow-scrolling: touch;
  }

  input, textarea {
    -webkit-appearance: none;
    border: 0;
    font-family: Montserrat, sans-serif;
  }

  button {
    outline: none;
    user-select: none;
    padding: 0px;
    font-family: Montserrat, sans-serif;
  }

  button:focus, textarea:focus, input:focus {
    outline:0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100%;
    display: flex;
    flex: 1;
  }

  .post-link {
    text-decoration: none;
    font-weight: 500;
    color: #4968c1;

    &:hover {
      text-decoration: underline;
    }
  }

  body.ReactModal__Body--open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(37,40,43,0.85);
    z-index: 10000;
  }
`;
