import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../util/axiosIntance";
import { Button, Input, InputWrapper, Label, Textarea } from "../styles/Styles";

export default function PostWrite({isEditMode} : {isEditMode? : boolean}) {
  
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  

    console.log(title);
    console.log(content);

    useEffect(() => {
        if (isEditMode && id) {
          axiosInstance(`/posts/${id}`)
            .then((res) => {
              setTitle(res.data.title);
              setContent(res.data.content);
            });
        }
      }, [isEditMode, id]);
  
      const handleSubmit = async () => {
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/posts/${id}` : '/posts'  ;

        console.log(url);
        console.log(method)
        try{
            const { status } = await axiosInstance(url, {
                    method,
                    data : { title, content, author : 'user'},
                    headers: { "Content-Type": "application/json" },
            });
            console.log(status);
            navigate('/posts');
        }
        catch(e){
            if(e instanceof Error){
                console.log("에러 발생");
                console.log(e.message);
            }
        }
      };
    
      return (
        <div>
          <h2 style={{fontWeight : '600', fontSize : '24px', marginTop : '48px', marginBottom : '24px'}}>{isEditMode ? "게시글 수정" : "새 게시글 작성"}</h2>
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
          <Button style={{marginTop : '20px'}} onClick={handleSubmit}>{isEditMode ? "수정하기" : "작성하기"}</Button>
        </div>
      );
}
