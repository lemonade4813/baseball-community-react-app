import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { formatTimestamp } from "@/util/formatTimeStamp";
import { memo } from "react";

const Table = styled.table`
    width: 100%;
    text-align: center;
`;

const Th = styled.th`
    border: 1px solid #DDD;
    vertical-align: middle;
`;

const Tr = styled.tr`
    height: 36px;

    &:nth-child(even){
      background-color : #808080;
    }
`;

const Td = styled.td`
    border: 1px solid #DDD;
    vertical-align: middle;
    text-align: center;
`;

const NoPostMessage = styled.p`
  text-align : center;
  margin-top : 100px;
  border-top : 1px solid #D3D3D3;
  padding-top : 20px;

`

interface IPostItem {
  posts: {
    id: string;
    title: string;
    author: string;
    content: string;
    createdAt: string;
  }[]
}

function PostItem({ posts }: IPostItem) {
  
  const navigate = useNavigate();

  if ( posts?.length === 0) {
    return (
      <NoPostMessage>검색된 게시글이 없습니다.</NoPostMessage>
    );
  }

  return (
     <Table style={{ marginTop: "24px" }}>
          <Tr>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>내용</Th>
            <Th>작성일자</Th>
          </Tr>
      {posts?.map((post) => (
        <Tr key={post.id} onClick={() => navigate(`/posts/detail/${post.id}`)}>
          <Td>{post.title}</Td>
          <Td>{post.author}</Td>
          <Td>{post.content.substring(0, 10)}</Td>
          <Td>{formatTimestamp(post.createdAt)}</Td>
        </Tr>
      ))}
    </Table>
  );
}

export default memo(PostItem);