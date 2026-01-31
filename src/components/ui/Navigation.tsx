import { useAtomValue } from "jotai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { isResponsiveNavOpenAtom } from "@/store/isResponsiveNavOpen";

const Nav = styled.nav<{isOpen : boolean}>`
  background-color: #4B0229; /* 와인색 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  height : 48px;

  @media screen and (max-width : 575px){
    padding: 0;
    position : relative;
    display : ${({isOpen}) => isOpen ? 'block' : 'none'};
  }
`;

const Menu = styled.ul<{isOpen : boolean}>`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width : 575px){
    position: absolute;
    flex-direction: column;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transform: translateY(${({ isOpen }) => (isOpen ? "0" : "-120px")});
    z-index : 9999;
    background-color : rgba(0, 0, 0, 0.5);
    width : 100%;
  }
`;

const MenuItem = styled.li`
  position: relative;
  display: flex;
  flex: 1;
  text-align: center;

  a {
    height : 48px;
    text-decoration: none;
    color: #FFF;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &.active {
      background-color: #721f40;
      color : #FFF;
    }

    &:hover {
      background-color: #5e1435;
      color: #ffffff;
    }
  }

  &:hover > ul {
    display: block;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%; /* MenuItem과 동일한 너비 */
  background-color: #fff;
  border-radius: 8px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  list-style: none;
  z-index: 9999;
  overflow: hidden;

  a {
    display: block;
    color: #333;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    line-height : 48px;
    height : 48px;

    &:hover {
      background-color:rgb(138, 66, 95);
      color: #fff;
    }
  }
`;

const Navigation = () => {
  const isResponsiveNavOpen = useAtomValue(isResponsiveNavOpenAtom);
  
  return (
    <Nav isOpen={isResponsiveNavOpen}>
      <Menu isOpen={isResponsiveNavOpen}>
        <MenuItem>
          <NavLink to="/schedule" className={({ isActive }) => (isActive ? "active" : undefined)}>
            경기 일정
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/posts" className={({ isActive }) => (isActive ? "active" : undefined)}>
            게시판
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : undefined)}>
            채팅방
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/stadiums/location" className={({ isActive }) => (isActive ? "active" : undefined)}>
            경기장 정보
          </NavLink>
          <SubMenu>
            <li>
              <NavLink to="/stadiums/location" className={({ isActive }) => (isActive ? "active" : undefined)}>
                경기장 현황
              </NavLink>
            </li>
            <li>
              <NavLink to="/stadiums/foods" className={({ isActive }) => (isActive ? "active" : undefined)}>
                주변 맛집
              </NavLink>
            </li>
          </SubMenu>
        </MenuItem>
      </Menu>
    </Nav>
  );
};

export default Navigation;
