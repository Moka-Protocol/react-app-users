import styled from 'styled-components';

export const Wrap = styled.div`
  border-bottom: 1px solid #f7f7f7;
  padding: 15px 10px 15px 20px;
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  color: inherit;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BodyTop = styled.div`
  display: flex;
  align-items: center;
`;

export const UserLink = styled.a`
  background: #f3f3f3;
  padding: 2px 8px;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  transition: 0.5s;

  &:hover {
    background: #e9e9e9;
  }
`;

export const PostLink = styled.a`
  font-size: 0.9em;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const BodyMedium = styled.div`
  display: flex;
  margin: 15px 3px;
`;

export const BodyBottom = styled.div`
  display: flex;
`;

export const Vote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65px;
  margin-left: auto;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Reward = styled.div`
  margin-left: auto;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;