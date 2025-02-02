import axios from "axios";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TeamList from "./TeamList";
import { styled } from "styled-components";

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
${({ isValid }) => 
      isValid && `
        background-color: #B80000;
        color: #FFF;
      `
}
  border: none;
  height: 40px;
  width: 120px;
  border-radius: 8px;
`;



export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({mode : "onChange"});

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement | null>(null);

  const fetchLoginInfo = async (data: LoginInputs) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("password", data.password);
    formData.append("team", data.team);
    formData.append("nickname", data.nickname);
    
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const res = await axios.post("http://localhost:8080/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("status:", res.status);
    } catch (e) {
      if(e instanceof Error){
        console.error("Error:", e);
      }
    }
  };

  const handleImageClick = () => {
    profileImageRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit(fetchLoginInfo)}>
      <h2 style={{fontSize : '25px', marginTop : '30px'}}>회원가입</h2>
      <label htmlFor="profileImg">프로필 이미지</label>
      <input
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
      {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}

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
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      <p>팀 선택</p>
      <Controller
        name="team"
        control={control}
        rules={{ required: "팀을 선택하세요." }}
        render={({ field }) => (
          <TeamList onClick={field.onChange} selectedTeam={field.value} />
        )}
      />
      {errors.team && <ErrorMessage>{errors.team.message}</ErrorMessage>}

      <label htmlFor="nickname">닉네임</label>
      <input
        id="nickname"
        type="text"
        {...register("nickname", {
          required: "닉네임을 입력하세요",
        })}
        placeholder="닉네임을 입력하세요"
      />
      {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
      <SubmitButton isValid={isValid} disabled={!isValid}>가입하기</SubmitButton>
    </form>
  );
}
