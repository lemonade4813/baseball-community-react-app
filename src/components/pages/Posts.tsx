import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "@/styles/Styles";
import { useEffect, useMemo, useState } from "react";
import PostItem from "./segments/PostItem";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "@/store/useModalStore";
import PostSvg from "@/assets/post.svg";
import { usePostsQuery } from "@/hooks/queries/usePostsQuery";
import { SelectGroup } from "../compounds/select/SelectGroup";
import { Option } from "../compounds/select/Option";

const Button = styled.button`
  width : 120px;
  height : 40px;
  border-radius : 8px;
  border : none;
  background-color : #B80000;
  color : #FFF;
  cursor : pointer;
`

const PostSearchWrapper = styled.div`
  display : flex;
  flex-wrap : wrap;
  gap : 40px;
  align-items : center;
  justify-content : flex-end;
  width : 100%;
`

const InputField = styled.input`

    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding : 10px 14px;
`

const PageTitle = styled.h2`
  font-weight : 500;
`


export default function Posts() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState(""); 
  const [keyword, setKeyword] = useState("");

  // 2. 검색 타입에 따른 쿼리 파라미터 분기 로직
  // searchType이 ""이면 제목/내용 모두 keyword를 보내거나, 
  // 서버 API 설계에 따라 'all' 파라미터를 하나만 보낼 수도 있습니다.
  const queryTitle = (searchType === "title" || searchType === "") ? keyword : "";
  const queryContent = (searchType === "content" || searchType === "") ? keyword : "";
  const { data: posts = [], error, isLoading, refetch } = usePostsQuery(queryTitle, queryContent);
  const { openModal } = useModalStore();

  useEffect(()=>{
    if(error){
      openModal(error.message)
    }
  },[error])

  const getSelectLabel = () => {
    if (searchType === "title") return "제목";
    if (searchType === "content") return "내용";
    return "전체"; // "" 일 때
  };

  

  return (
    <Container>
        <Title>
            <img src={PostSvg} width={40} height={40} alt="게시판 이미지"/>
            <PageTitle>게시판</PageTitle>
        </Title>
        <PostSearchWrapper>
        <SelectGroup 
          value={searchType} 
          onChange={(val) => setSearchType(val)} 
          placeholder={getSelectLabel()}
        >
          <Option value="">전체</Option>
          <Option value="title">제목</Option>
          <Option value="content">내용</Option>
        </SelectGroup>
        <InputField
          placeholder="검색어를 입력하세요" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
          <Button onClick={() => refetch()}>조회</Button>
        </PostSearchWrapper>
        {isLoading ? (
          <SpinnerComponent/>
        ) : 
          <PostItem posts={posts}/>
        }
          <Button onClick={() => navigate("/posts/write")} style={{marginTop : '60px'}}>게시글 작성</Button>
    </Container>
  );
}