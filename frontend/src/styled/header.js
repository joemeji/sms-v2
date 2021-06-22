import styled from 'styled-components';

const _height = '70px';

export const Header = styled.header`
  height: ${_height};
  background: #fff;
  box-shadow: -1px 0px 20px #00000026;
`;

export const Nav = styled.nav`
  height: ${_height};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.5em;
  font-weight: 900;
`;

export const Link = styled.a`
  padding: 8px 15px;
  margin-right: 3px;
  color: #000;
  opacity: 0.9;
  font-weight: 600;
  border-radius: 0.25em; 
  text-decoration: none;
  &:hover {
    background: #f3f3f3;
    text-decoration: none;
    color: #000;
    opacity: 1;
  }
`;