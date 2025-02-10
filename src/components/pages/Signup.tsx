import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TeamList from "./segments/TeamList";
import { styled } from "styled-components";
import { Container, Flex, H2, Input, Label } from "../../styles/Styles";
import axiosInstance from "../../util/axiosIntance";
import { useModalStore } from "../../store/useModalStore";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type LoginInputs = {
  userId: string;
  password: string;
  team: string;
  nickname: string;
  profileImage: FileList;
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



export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({mode : "onChange"});

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
    

    // if (data.profileImage && data.profileImage[0]) {
    //   formData.append("profileImage", data.profileImage[0]);
    // }

    if (profileImageRef.current && profileImageRef.current?.files?.[0]) {
      formData.append("profileImage", profileImageRef.current?.files?.[0]);
    }

    for (const x of formData) {
      console.log(x);
     };

    try {
      const res = await axiosInstance.post("/users/register", formData, {
        headers : {"Content-Type" : "multipart-formdata"}
      });

      if(res.status === 200){
        openModal("회원가입에 성공했습니다. ", () => navigate("/login"));
      }
      
    } catch (e) {
      if(e instanceof Error){
        console.error("Error:", e);
      }
    }
  };

  const handleImageClick = () => {
    profileImageRef.current?.click();
  };

  console.log(isValid)

  return (
    <Container>
    <form onSubmit={handleSubmit(fetchLoginInfo)} style={{width : '50%', display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
      <H2>회원가입</H2>
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
          border={errors.userId && 'red'}
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
          rules={{ required: "팀을 선택하세요." }}
          render={({ field }) => (
            <TeamList onClick={field.onChange} selectedTeam={field.value}/>
          )}
        />
      </Flex>
      {errors.team && <ErrorMessage>{errors.team.message}</ErrorMessage>}
      <Flex style={{marginTop : '20px'}}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          {...register("nickname", {
            required: "닉네임을 입력하세요",
          })}
          placeholder="닉네임을 입력하세요"
          border={errors.nickname && 'red'}
        />
      </Flex>
      {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
      <div style={{display : 'flex', alignItems : 'center', marginTop : '20px', gap : '20px'}}>
        <Label htmlFor="profileImg">프로필 이미지</Label>
        <Input
          type="file"
          id="profileImg"
          accept={ACCEPTED_FILE_TYPES.join(", ")}
          style={{ display: "none" }}
          {...register("profileImage", {
            validate: {
              size: (value) =>
              !value[0] || value[0].size < MAX_FILE_SIZE || "파일 크기는 5MB 이하이어야 합니다.",
              type: (value) =>
                !value[0] || ACCEPTED_FILE_TYPES.includes(value[0].type) || "지원하지 않는 파일 형식입니다.",
              },
          })}
          ref={(e) => {
            register("profileImage").ref(e);
            profileImageRef.current = e;
          }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setProfileImage(URL.createObjectURL(file));
            }
          }}
        />

        {profileImage ? (
          <img
            src={profileImage}
            alt="파일 업로드"
            width={100}
            height={100}
            style={{ cursor: "pointer", border: "1px solid #ddd", borderRadius: "8px" }}
            onClick={handleImageClick}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
          >
            이미지 업로드
          </div>
        )}
        {errors.profileImage && <ErrorMessage>{errors.profileImage.message}</ErrorMessage>}
      </div>
      <SubmitButton isValid={isValid} disabled={!isValid}>가입하기</SubmitButton>
    </form>
    </Container>
  );
}
