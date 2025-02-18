import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../util/axiosIntance";
import { Button, Input, InputWrapper, Label, Textarea, Title, Container } from "../../styles/Styles";
import {  useRequest } from "../../hooks/api/useRequest";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "../../store/useModalStore";
import WriteSvg from "../../assets/write.svg";

export default function PostWrite({isEditMode} : {isEditMode? : boolean}) {
  
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { openModal } = useModalStore();

    const { requestApi, error : postError, loading } = useRequest();
  
    useEffect(() => {
        if (isEditMode && id) {
          axiosInstance(`/posts/${id}`)
            .then((res) => {
              setTitle(res.data.title);
              setContent(res.data.content);
            }).catch(e => openModal(`게시글 조회에 실패하였습니다. : ${e.message}`));
        }
      }, [isEditMode, id]);

      useEffect(()=>{
        if(postError){
          openModal("요청중 오류가 발생했습니다.");
        }
      },[postError])

      if(loading){
        return(<SpinnerComponent/>)
      }

      const handleSubmit = async () => {
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/posts/${id}` : '/posts';
        requestApi( url,  method,  {title, content}, callback)
      };

      const callback =  () => {
        const modalMessage = isEditMode ? '수정이 완료되었습니다.' : '작성이 완료되었습니다.';
        navigate('/posts');
        openModal(modalMessage);
      } 
    
      return (
        <Container>
          <Title>
            <img src={WriteSvg} width={40} height={40} alt="게시글 작성 이미지"/>
            <span>{isEditMode ? "게시글 수정" : "새 게시글 작성"}</span>
          </Title>
          <InputWrapper>
            <Label htmlFor="title">제목</Label>
            <Input
                id="title"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper style={{marginTop : '16px'}}>
            <Label htmlFor="content">내용</Label>
            <Textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
          </InputWrapper>
    
            <Button 
                onClick={handleSubmit} 
                style={{width : '120px', alignSelf : 'flex-end', marginTop : '20px'}} 
                type="button"
            >
              {isEditMode ? "수정하기" : "작성하기"}
            </Button>
       
        </Container>
      );
}



