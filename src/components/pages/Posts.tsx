import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, Flex, H2 } from "../../styles/Styles";
import { useFetch } from "../../hooks/api/useFetch";
import { useState } from "react";
import PostSearchComponent from "./segments/PostSearchComponent";
import PostItem from "./segments/PostItem";

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
  const [queryString, setQueryString] = useState('');
  const { data: posts, loading } = useFetch<IPost[]>(`/posts?${queryString}`);

  const handleCreteria = () => {
    const params = new URLSearchParams();
    Object.entries(creteria).forEach(([key, value]) => {
      if (value.trim() !== "") {
        params.append(key, value);
      }
    });
    setQueryString(params.toString());
  };

  return (
    <Container>
      <div style={{width : '90%'}}>
        <H2>게시판</H2>
        <Flex>
          <PostSearchComponent creteria={creteria} setCreteria={setCreteria} />
          <Button onClick={handleCreteria}>조회</Button>
          <Button onClick={() => navigate("/posts/write")}>게시글 작성</Button>
        </Flex>
        {loading ? (
          <p>로딩 중입니다.</p>
        ) : 
          <PostItem posts={posts}/>
        }
      
          
      
      </div>
    </Container>
  );
}