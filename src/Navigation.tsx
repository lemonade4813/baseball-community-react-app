import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #343a40;
  padding: 10px 20px;
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
  display : flex;

  a {
    text-decoration: none;
    color: #ffffff;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    display : inline-block;
    width : 200px;
    text-align : center;

    &.active {
      background-color: #007bff;
      color: #ffffff;
    }

    &:hover {
      background-color: #0056b3;
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
  margin: 0;
  padding: 10px 0;

  li {
    margin: 0;

    a {
      display: block;
      padding: 8px 12px;
      color: #333;

      &:hover {
        background-color: #f1f1f1;
        color: #007bff;
      }
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Menu>
        <MenuItem>
          <NavLink
            to="/schedule"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            경기일정
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            게시판
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/stadium/location"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            경기장 정보
          </NavLink>
          <SubMenu>
            <li>
              <NavLink
                to="/stadium/location"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                경기장 위치
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stadium/food"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
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