import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  bottom: 5px;
  right: 8px;
  display: flex;
`;

export const Bubble = styled.a`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${props => props.txComplete === true ? '#41b123' : '#606060'};
  margin: 5px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;