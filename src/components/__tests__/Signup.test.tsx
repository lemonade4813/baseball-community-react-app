import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Schedule from "../pages/Schedules";

test('아이디는 최소 6자이상, 영소문사와 숫자를 포함해야 한다.', async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/schedule" element={<Schedule />} /> {/* 회원가입 후 이동할 페이지 */}
        </Routes>
      </MemoryRouter>);
    
    const errorMessageValid = "아이디는 최소 6자 이상, 영소문자와 숫자를 포함해야 합니다."

    const errorMessageNoInput ="아이디를 입력하세요."

    const idInputElement = screen.getByPlaceholderText("아이디를 입력하세요");

    expect(idInputElement).toBeInTheDocument();
    
    // 입력값 변경 (fireEvent 사용)
    fireEvent.change(idInputElement, { target: { value: 'ab12'} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageValid)).toBeInTheDocument();
    })

    fireEvent.change(idInputElement, { target: { value: ''} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageNoInput)).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.queryByText(errorMessageValid)).not.toBeInTheDocument();
    }, { timeout: 500 });
  });

  test('패스워드는 최소 8자 이상, 영문과 숫자를 포함해야 한다.', async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/schedule" element={<Schedule />} /> {/* 회원가입 후 이동할 페이지 */}
        </Routes>
      </MemoryRouter>);
    
    const errorMessageValid = "패스워드는 최소 8자 이상, 영문과 숫자를 포함해야 합니다."

    const errorMessageNoInput ="패스워드를 입력하세요."

    const passwordInputElement = screen.getByPlaceholderText("패스워드를 입력하세요");

    expect(passwordInputElement).toBeInTheDocument();
    
    // 입력값 변경 (fireEvent 사용)
    fireEvent.change(passwordInputElement, { target: { value: 'abc1234'} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageValid)).toBeInTheDocument();
    })

    fireEvent.change(passwordInputElement, { target: { value: '12345678'} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageValid)).toBeInTheDocument();
    })

    fireEvent.change(passwordInputElement, { target: { value: 'abcdasdf'} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageValid)).toBeInTheDocument();
    })

    fireEvent.change(passwordInputElement, { target: { value: ''} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageNoInput)).toBeInTheDocument();
    })

    fireEvent.change(passwordInputElement, { target: { value: 'abcd12345'} });
    await waitFor(() => {
      expect(screen.queryByText(errorMessageValid)).not.toBeInTheDocument();
    }, { timeout: 500 });

  });


  test('닉네임이 입력되었는지 확인한다.', async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/schedule" element={<Schedule />} /> {/* 회원가입 후 이동할 페이지 */}
        </Routes>
      </MemoryRouter>);
    

    const errorMessageNoInput ="닉네임을 입력하세요."

    const nicknameInputElement = screen.getByPlaceholderText("닉네임을 입력하세요");

    expect(nicknameInputElement).toBeInTheDocument();
    
    //입력값 변경 (fireEvent 사용)
    fireEvent.change(nicknameInputElement, { target: { value: ''} });
    await waitFor(() => {
      expect(screen.getByText(errorMessageNoInput)).toBeInTheDocument();
    })

    fireEvent.change(nicknameInputElement, { target: { value: 'hero123'} });
    await waitFor(() => {
      expect(screen.queryByText(errorMessageNoInput)).not.toBeInTheDocument();
    }, { timeout: 500 });
  });


