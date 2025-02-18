import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TeamList from "./segments/TeamList";
import { styled } from "styled-components";
import { Container, Flex, Input, Label, Title } from "../../styles/Styles";
import axiosInstance from "../../util/axiosIntance";
import { useModalStore } from "../../store/useModalStore";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Team } from "../../util/filterItems";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const schema = yup.object().shape({
  userId: yup
    .string()
    .matches(/^[a-z0-9]+$/, "영소문자와 숫자만 사용 가능합니다.")
    .min(6, "아이디는 최소 6자 이상이어야 합니다.")
    .required("아이디를 입력하세요.")
    .test("checkUsername", "이미 사용 중인 아이디입니다.", async (value) => {
      if (!value) return false;
      const response = await axiosInstance.get(`/users/check-username?username=${value}`);
      return response.data.available;
    }),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "영문과 숫자를 포함해야 합니다.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .required("비밀번호를 입력하세요."),
  nickname: yup
    .string()
    .required("닉네임을 입력하세요.")
    .test("checkNickname", "이미 사용 중인 닉네임입니다.", async (value) => {
      if (!value) return false;
      const response = await axiosInstance.get(`/users/check-nickname?nickname=${value}`);
      return response.data.available;
    }),
  team: yup
    .string()
    .oneOf(["두산", "KIA", "한화", "롯데", "SSG", "NC", "삼성", "LG", "키움", "KT"], "팀을 선택하세요.")
    .required("연령을 선택하세요."),
});

type LoginInputs = {
  userId: string;
  password: string;
  team: Exclude<Team, ''>;
  nickname: string;
};


const ErrorMessage = styled.p`
  font-size : 12px;
  color : red;
  margin-top : 4px;
`

const SubmitButton = styled.button<{ isValid: boolean }>`

  border: none;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  background-color : #D3D3D3;
  margin-top : 20px;
  ${({ isValid }) => 
      isValid && `
        background-color: #B80000;
        color: #FFF;
      `
}
`;

const SignupForm = styled.form`
  width : 50%;
  display : flex;
  flex-direction : column;
  justify-content : center;
`

const ImageUploadArea = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justifyContent: center;
  cursor: pointer;
  borderRadius : 8px;
`

export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({mode : "onChange", resolver : yupResolver(schema)});

  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement | null>(null);

  const fetchLoginInfo = async (data: LoginInputs) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("password", data.password);
    formData.append("team", data.team);
    formData.append("nickname", data.nickname);
    
    if (profileImageRef.current && profileImageRef.current?.files?.[0]) {
      formData.append("profileImage", profileImageRef.current?.files?.[0]);
    }

    try {
      const res = await axiosInstance.post("/users/register", formData, {
        headers : {"Content-Type" : "multipart-formdata"}
      });

      if(res.status === 200){
        openModal("회원가입에 성공했습니다. ", () => navigate("/login"));
      }
    } catch (e) {
      if(e instanceof Error){
        openModal(`에러가 발생했습니다. ${e.message}`);
      }
    }
  };

  const handleImageClick = () => {
    profileImageRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
  
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      openModal("허용되지 않은 파일 형식입니다. JPEG, JPG, PNG 파일만 업로드 가능합니다.");
      resetFileInput();
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      openModal("파일 크기가 5MB를 초과합니다.");
      resetFileInput();
      return;
    }
  
    setProfileImage(URL.createObjectURL(file));
  };
  
  const resetFileInput = () => {
    if (profileImageRef.current) {
      profileImageRef.current.value = '';
    }
  };


  return (
    <Container>
    <SignupForm onSubmit={handleSubmit(fetchLoginInfo)}>
      <Title>회원가입</Title>
      <Flex style={{marginTop : '20px'}}>
        <Label htmlFor="userId">아이디</Label>
        <Input
          id="userId"
          type="text"
          {...register("userId")}
          border={errors.userId && 'red'}
          placeholder="패스워드를 입력하세요"
        />
      </Flex>
      {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
      <Flex style={{marginTop : '20px'}}> 
        <Label htmlFor="password">패스워드</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          border={errors.password && 'red'}
          placeholder="패스워드를 입력하세요"
        />
      </Flex>
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      <Flex style={{marginTop : '20px'}}>
        <p style={{width :'80px'}}>팀 선택</p>
        <Controller
          name="team"
          control={control}
          render={({ field }) => (
            <TeamList 
                onClick={field.onChange} 
                selectedTeam={field.value}
            />
          )}
        />
      </Flex>
      {errors.team && <ErrorMessage>{errors.team.message}</ErrorMessage>}
      <Flex style={{marginTop : '20px'}}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          {...register("nickname")}
          placeholder="닉네임을 입력하세요"
          border={errors.nickname && 'red'}
        />
      </Flex>
      {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
      <Flex gap={20} style={{ marginTop : '20px', gap : '20px', alignSelf : 'flex-start'}}>
        <Label htmlFor="profileImg">프로필 이미지</Label>
        <Input
          type="file"
          id="profileImg"
          data-testId="profileImg"
          accept={ACCEPTED_FILE_TYPES.join(", ")}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {profileImage ? (
          <img
            src={profileImage}
            alt="파일 업로드"
            width={100}
            height={100}
            style={{ 
                cursor: "pointer", 
                border: "1px solid #ddd", 
                borderRadius: "8px" 
            }}
            onClick={handleImageClick}
          />
        ) : (
          <ImageUploadArea>이미지 업로드</ImageUploadArea>
        )}
      </Flex>
      <SubmitButton isValid={isValid} disabled={!isValid}>가입하기</SubmitButton>
    </SignupForm>
    </Container>
  );
}
