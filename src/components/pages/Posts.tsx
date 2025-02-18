import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, Flex, Title } from "../../styles/Styles";
import { useFetch } from "../../hooks/api/useFetch";
import { useEffect, useState } from "react";
import PostSearchComponent from "./segments/PostSearchComponent";
import PostItem from "./segments/PostItem";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "../../store/useModalStore";
import PostSvg from "../../assets/post.svg";

const Button = styled.button`
  width : 120px;
  height : 40px;
  border-radius : 8px;
  border : none;
  background-color : #B80000;
  color : #FFF;
  cursor : pointer;
`

interface IPost {
    id : string;
    title : string;
    author : string;
    content : string;
    createdAt : string;
}

export default function Posts() {
  const navigate = useNavigate();
  const [creteria, setCreteria] = useState({ title: '', content: '' });
  const { data: posts, loading, error, refetch } = useFetch<IPost[]>('/posts', creteria);

  const { openModal } = useModalStore();

  useEffect(()=>{
    if(error){
      openModal(error)
    }
  },[error])


  return (
    <Container>
        <Title>
            <img src={PostSvg} width={40} height={40} alt="게시판 이미지"/>
            <span>게시판</span>
        </Title>
        <Flex>
          <PostSearchComponent creteria={creteria} setCreteria={setCreteria} />
          <Button onClick={refetch}>조회</Button>
          <Button onClick={() => navigate("/posts/write")}>게시글 작성</Button>
        </Flex>
        {loading ? (
          <SpinnerComponent/>
        ) : 
          <PostItem posts={posts}/>
        }
    </Container>
  );
}