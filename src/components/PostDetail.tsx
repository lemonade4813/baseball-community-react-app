import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Flex, H2, Input, Label, Textarea } from "../styles/Styles";
import axiosInstance from "../util/axiosIntance";

export default function PostDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        if (id) {
          axiosInstance(`/posts/${id}`)
            .then((res) => {
              setTitle(res.data.title);
              setContent(res.data.content);
            });
        }
      }, [id]);


      const deletePost = async (id : string) => {

        try{
            await axiosInstance.delete(`/posts/${id}`);
            navigate('/posts');
          }
        catch(e){
          if(e instanceof Error){
            console.log(e.message);
          }
        }
      }


    return (
        <div>
            <H2>게시글 상세</H2>
              <Flex style={{marginTop : '20px'}}>
                <Label htmlFor="title">제목</Label>
                <Input id="title" value={title}/>
              </Flex>
              <Flex style={{marginTop : '20px'}}>
                <Label htmlFor="content">내용</Label>
                <Textarea id="content" value={content}/>
              </Flex>
              {id && 
                <Flex style={{marginTop : '20px', justifyContent : 'flex-end'}}>
                  <Button style={{width : '120px'}} onClick={()=> navigate(`/posts/edit/${id}`)}>게시글 수정</Button>
                  <Button style={{width : '120px'}} onClick={()=> deletePost(id)}>게시글 삭제</Button>
                </Flex>
              }
        </div>
    )
}
