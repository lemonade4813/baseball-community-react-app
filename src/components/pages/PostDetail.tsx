import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Flex, Input, InputWrapper, Label, Textarea, Title } from "../../styles/Styles";
import axiosInstance from "../../util/axiosIntance";
import { getAccessToken } from "../../util/auth";
import { useModalStore } from "../../store/useModalStore";
import { useRequest } from "../../hooks/api/useRequest";
import WriteSvg from "../../assets/write.svg";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { requestApi, error : requestError } = useRequest(); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
      if (id) {
          axiosInstance(`/posts/${id}`)
              .then((res) => {
                  setTitle(res.data.title);
                  setContent(res.data.content);
              })
              .catch((e) => openModal(`게시글 조회 중 에러가 발생했습니다. ${e.message}`));
      }
  }, [id]);

  useEffect(()=>{
    if(requestError){
        openModal('처리중 에러가 발생했습니다.')
    }
  },[requestError])

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

      const modalMessage = mode === 'write' ? '수정 권한이 없습니다.' : '삭제 권한이 없습니다.';

      if (!isAuthor) {
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
                      onClick={() => handlePost('delete', id, () => requestApi(`/posts/${id}`, 'DELETE'))}
                  >
                      게시글 삭제
                  </Button>
              </Flex>
          )}
      </Container>
  );
}