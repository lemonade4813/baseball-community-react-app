import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../util/axiosIntance";
import { Button, H2, Input, InputWrapper, Label, Textarea } from "../../styles/Styles";
import {  useRequest } from "../../hooks/api/useRequest";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "../../store/useModalStore";

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
        const modalMessage = isEditMode ? 
                             '수정이 완료되었습니다.' : 
                             '작성이 완료되었습니다.'
        requestApi(
                    url, 
                    method,
                    { title, content}, 
                    () => 
                      {
                        navigate('/posts');
                        openModal(modalMessage);
                      } 
                  )
      };
    
      return (
        <div>
          <H2 style={{ marginTop : '48px', marginBottom : '24px'}}>
            {isEditMode ? "게시글 수정" : "새 게시글 작성"}
          </H2>
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
          <div style={{textAlign : 'right', marginTop : '20px'}}>
            <Button 
                onClick={handleSubmit} 
                style={{width : '120px'}} 
                type="button"
            >
              {isEditMode ? "수정하기" : "작성하기"}
            </Button>
          </div>
        </div>
      );
}
