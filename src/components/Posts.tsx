import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { H2 } from "../styles/Styles";
import { useFetch } from "../hooks/api/useFetch";

const Button = styled.button`
  width : 120px;
  height : 40px;
  border-radius : 8px;
  border : none;
  background-color : #B80000;
  color : #FFF;
  cursor : pointer;
`

const Table = styled.table`
    width: 100%;
    text-align: center;
`;

const Tr = styled.tr`
    height: 36px;
`;

const Th = styled.th`
    border: 1px solid #DDD;
    vertical-align: middle;
`;

const Td = styled.td`
    border: 1px solid #DDD;
    vertical-align: middle;
    text-align: center;
`;


interface IPost {
    id : string;
    title : string;
    author : string;
    content : string;
    createdAt : string;
}

export default function Posts() {

  const navigate = useNavigate();

  const {data : posts, refetch, loading } = useFetch<IPost[]>('/posts');

  if(loading){
    return <p>로딩 중입니다.</p>
  }

  return (
    <div>
      <H2>게시판</H2>
      <Table style={{marginTop : '24px'}}>
        <Tr>
          <Th>제목</Th>
          <Th>작성자</Th>
          <Th>내용</Th>
          <Th>작성일자</Th>
        </Tr>
        {posts?.map((post) =>
          <Tr key={post.id} onClick={()=> navigate(`/posts/detail/${post.id}`)}>
            <Td>{post.title}</Td>
            <Td>{post.author}</Td>
            <Td>{post.content.substring(0,10)}</Td>
            <Td>{post.createdAt}</Td>
          </Tr>)}
        </Table>
        <div style={{textAlign : 'right', marginTop : '20px'}}>
          <Button onClick={()=> navigate('/posts/write')}>게시글 작성</Button>
        </div>
      </div>
  )
}
