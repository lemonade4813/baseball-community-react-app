import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "@/styles/Styles";
import { useEffect, useState } from "react";
import PostSearchComponent from "./segments/PostSearchComponent";
import PostItem from "./segments/PostItem";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "@/store/useModalStore";
import PostSvg from "@/assets/post.svg";
import { usePostsQuery } from "@/hooks/queries/usePostsQuery";

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
  gap : 20px;
  align-items : center;
`


export default function Posts() {
  const navigate = useNavigate();
  const [creteria, setCreteria] = useState({ title: '', content: '' });
  const {data : posts = [], error, isLoading, refetch } = usePostsQuery(creteria.title, creteria.content);

  const { openModal } = useModalStore();

  useEffect(()=>{
    if(error){
      openModal(error.message)
    }
  },[error])


  return (
    <Container>
        <Title>
            <img src={PostSvg} width={40} height={40} alt="게시판 이미지"/>
            <span>게시판</span>
        </Title>
        <PostSearchWrapper>
          <PostSearchComponent creteria={creteria} setCreteria={setCreteria} />
          <Button onClick={() => refetch()}>조회</Button>
          <Button onClick={() => navigate("/posts/write")}>게시글 작성</Button>
        </PostSearchWrapper>
        {isLoading ? (
          <SpinnerComponent/>
        ) : 
          <PostItem posts={posts}/>
        }
    </Container>
  );
}