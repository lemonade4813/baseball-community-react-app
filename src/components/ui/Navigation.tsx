import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #4B0229; /* 와인색 */
  padding: 8px 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  position: relative;
  display: flex;
  flex: 1;
  text-align: center;

  a {
    text-decoration: none;
    color: #FFF;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &.active {
      background-color: #721f40;
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
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  list-style: none;

  padding: 10px 0;
  width: 100%;

    a {
      display: block;
      padding: 8px 12px;
      color: #A0A0A0;

      &:hover {
        background-color: #F1F1F1;
        color: #721F40;
      }
  
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Menu>
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
