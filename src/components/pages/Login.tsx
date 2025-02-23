import { useForm } from "react-hook-form";
import { Button, Container, Flex, Input, Label, Title } from "../../styles/Styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosIntance";
import { useUserInfo } from "../../store/useUserInfoStore";
import styled from "styled-components";
import { useModalStore } from "../../store/useModalStore";
import { AxiosError } from "axios";

type LoginInputs = {
  userId: string;
  password: string;
};

const ErrorMessage = styled.p`
  font-size : 12px;
  color : red;
  margin-top : 4px;
`

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const navigate = useNavigate();

  const setUserInfo = useUserInfo((state) => state.setUserInfo);

  const { openModal }  = useModalStore();


  const submitLoginInfo = async (formData: LoginInputs) => {
    try {
     
      const {data, status} = await axiosInstance.post("/users/login", formData, 
                              {
                                headers : {
                                  "Content-Type" : 'application/json'}
                              });
      console.log(status)                        
      if(status === 200){
          setUserInfo({
            nickname: data.nickname,
            profileImagePath: data.profileImagePath,
            isLogined: true,
            team : data.team
          });
          sessionStorage.setItem('accessToken' , data.accessToken);
          
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath"); 
          navigate(redirectPath);

      }
    } catch (e : unknown) {
      if(e instanceof AxiosError){
          openModal(e.response?.data)
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(submitLoginInfo)}>
        <Title>로그인</Title>
        <Flex style={{marginTop : '20px'}}>
          <Label htmlFor="userId">아이디</Label>
          <Input
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
        </Flex>
        {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
        <Flex style={{marginTop : '20px'}}>
          <Label htmlFor="password">패스워드</Label>
          <Input
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
     
        </Flex>
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <div style={{textAlign : 'center'}}>
          <Button 
              type="submit" 
              style={{width : '150px', marginTop : '20px'}}
          >
            로그인
          </Button>
        </div>
      </form>
    </Container>
  );
}