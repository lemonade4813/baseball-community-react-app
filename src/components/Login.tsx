import axios from "axios";
import { useForm } from "react-hook-form";

type LoginInputs = {
  userId: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const submitLoginInfo = async (data: LoginInputs) => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", data);
      console.log("로그인 성공", response.data);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitLoginInfo)}>
      <div>로그인</div>

      <label htmlFor="userId">아이디</label>
      <input
        id="userId"
        {...register("userId", {
          required: "아이디를 입력하세요.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/,
            message: "아이디는 최소 6자 이상, 영소문자와 숫자를 포함해야 합니다.",
          },
        })}
        placeholder="아이디를 입력하세요"
      />
      {errors.userId && <p>{errors.userId.message}</p>}

      <label htmlFor="password">패스워드</label>
      <input
        id="password"
        type="password"
        {...register("password", {
          required: "패스워드를 입력하세요.",
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "패스워드는 최소 8자 이상, 영문과 숫자를 포함해야 합니다.",
          },
        })}
        placeholder="패스워드를 입력하세요"
      />
      {errors.password && <p>{errors.password.message}</p>}
        
      <button type="submit">로그인</button>
    </form>
  );
}