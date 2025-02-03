import { useEffect, useState } from "react"
import { axiosInstance } from "../util/axiosIntance";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width : 120px;
  height : 40px;
  border-radius : 8px;
  border : none;
  background-color : #B80000;
  color : #FFF;
  cursor : pointer;


`

export default function Posts() {

  const [posts, setPosts] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance('/posts')
      .then((res) => setPosts(res.data))
      .catch((e) => console.error('조회에 실패하였습니다.', e.message));
  }, []);

  return (
    <div>
      <h2>게시판</h2>
      <Button onClick={()=> navigate('/posts/write')}>게시글 작성</Button>
      <table>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
        </tr>
        {posts.map((post : any) =>
          <tr onClick={()=> navigate(`/posts/detail/${post.id}`)}>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.createdAt}</td>
          </tr>)}
        </table>
      </div>
  )
}
