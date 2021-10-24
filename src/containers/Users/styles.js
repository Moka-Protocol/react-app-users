import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const NetworkBar = styled.div`
  position: fixed;
  top: 5px;
  right: 8px;
  display: flex;
`;

export const NetworkBarInternal = styled.div`
  height: 20px;
  border-radius: 5px;
  padding: 4px 10px;
  color: ${props => props.error ? '#fff' : null};
  background: ${props => props.error ? '#da2d2b' : '#ffd700'};
  margin: 5px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
`;

export const Profile = styled.div`
  margin: 50px 0px;
`;

export const ProfilePic = styled.img`
  width: 150px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #b1b1b1;
  background: #f5f5f5;
  margin-bottom: 20px; 
`;

export const Address = styled.div`
  padding: 5px 10px;
  font-weight: 700;
  background: #fdf9ea;
  border-radius: 3px;
`;

export const Header = styled.div`
  display: flex;
  height: 65px;
  width: 100%;
`;

export const HeaderOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  cursor: pointer;
  border-bottom: 1px solid #c5c5c5;
  background: ${props => props.selected ? '#f3f3f3' : '#fff'};

  &:hover {
    background: #f3f3f3;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 0px 3px 0px #c9c9c9;
  border-radius: 3px;
  margin-bottom: 50px;
  max-width: 760px;
  width: 90%;
  text-align: left;
  overflow: hidden;
  flex-shrink: 0;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: #6e6e6e;

  &:hover {
    color: #333;
  }
`;