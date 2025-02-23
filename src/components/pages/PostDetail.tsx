import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Flex, Input, InputWrapper, Label, Textarea, Title } from "../../styles/Styles";
import axiosInstance from "../../util/axiosIntance";
import { getAccessToken } from "../../util/auth";
import { useModalStore } from "../../store/useModalStore";
import WriteSvg from "../../assets/write.svg";
import RecommendPost from "./segments/RecommendPost";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { usePostDetailQuery } from "../../hooks/queries/usePostDetailQuery";

export default function PostDetail() {

  const queryClient = new QueryClient();      

  const { id } = useParams();

  if(!id){
    return <p>게시글 ID가 존재하지 않습니다.</p>
  }

  const navigate = useNavigate();

  const { openModal } = useModalStore();

  const {data : postDetail , error, refetch} = usePostDetailQuery(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const deletePost = (id : string) => axiosInstance.delete(`/posts/${id}`);

  const mutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] }); 
      },
      onError : (error) => {
        openModal(`저장중 오류가 발생했습니다. : ${error.message}`);
      }
    });

    useEffect(() => {
      if (postDetail && !error) {
        setTitle(postDetail.title);
        setContent(postDetail.content);
      }
      else if(!postDetail && error){
        openModal('데이터를 조회하는데 실패했습니다.', refetch);
      }
    }, [postDetail, error]);  


  const isAuthorOfPost = async (postId : string) => {
      const accessToken = getAccessToken();

      try {
          const { data, status } = await axiosInstance.get(`/posts/${postId}/is-author`, {
              headers: { Authorization: `Bearer ${accessToken}` }
          });
          return status === 200 && data;
      } catch (e) {
          console.error('에러가 발생했습니다.', e);
          return false; 
      }
  };

  const handlePost = async (mode : 'write' | 'delete', 
                            postId : string, 
                            callback : (i : string) => void) => {

      const isAuthor = await isAuthorOfPost(postId);

      if (!isAuthor) {
          const modalMessage = mode === 'write' ? '수정 권한이 없습니다.' : '삭제 권한이 없습니다.';
          openModal(modalMessage);
          return;
      }
      callback && callback(postId);
  };

  

  return (
 
      <Container>
        <Title>
            <img src={WriteSvg} width={20} height={20} alt="게시글 상세 이미지" />
            <span>게시글 상세</span>
          </Title>
          <RecommendPost id={id}/>
          <InputWrapper style={{ marginTop: '20px' }}>
              <Label htmlFor="title">제목</Label>
              <Input id="title" value={title} readOnly/>
          </InputWrapper>
          <InputWrapper style={{ marginTop: '20px' }}>
              <Label htmlFor="content">내용</Label>
              <Textarea id="content" value={content} readOnly />
          </InputWrapper>
          {id && (
              <Flex 
                style={{ marginTop: '20px', 
                alignSelf: 'flex-end' }}
              >
                  <Button
                      style={{ width: '120px' }}
                      onClick={() => handlePost('write', id, () => navigate(`/posts/edit/${id}`))}
                  >
                      게시글 수정
                  </Button>
                  <Button
                      style={{ width: '120px' }}
                      onClick={() => handlePost('delete', id, mutation.mutate)}
                  >
                      게시글 삭제
                  </Button>
              </Flex>
          )}
        
      </Container>
  );
}

