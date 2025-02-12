import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Flex, H2, Input, Label, Textarea } from "../../styles/Styles";
import axiosInstance from "../../util/axiosIntance";
import { getAccessToken } from "../../util/auth";
import { useModalStore } from "../../store/useModalStore";

export default function PostDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { openModal } = useModalStore();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

        const isAuthor = await isAuthorOfPost(id);

        if(!isAuthor){
          openModal('삭제 권한이 없습니다.');
        }

        const accessToken = getAccessToken();

        try{
            await axiosInstance.delete(`/posts/${id}`, { 
              headers : { 
                Authorization : `Bearer ${accessToken}`
              }});
            navigate('/posts');
          }
        catch(e){
          if(e instanceof Error){
            console.log(e.message);
          }
        }
      }

      const isAuthorOfPost = async (id : string) => {

        const accessToken = getAccessToken();

        try{
            const {data, status} = await axiosInstance.get(`/posts/${id}/is-author`, 
            { headers : { Authorization : `Bearer ${accessToken}`}});
            if(status === 200){
              return data;
            }
          }
        catch(e){
          if(e instanceof Error){
            console.log(e.message);
          }
        }
      }

      const navigateToEditPage = async (id : string) => {
        
        const isAuthor = await isAuthorOfPost(id);

        if(!isAuthor){
          openModal('삭제 권한이 없습니다.');
          return;
        }
        navigate(`/posts/edit/${id}`);

      }

    return (
        <div>
            <H2>게시글 상세</H2>
              <Flex style={{marginTop : '20px'}}>
                <Label htmlFor="title">제목</Label>
                <Input id="title" value={title} readOnly/>
              </Flex>
              <Flex style={{marginTop : '20px'}}>
                <Label htmlFor="content">내용</Label>
                <Textarea id="content" value={content} readOnly/>
              </Flex>
              {id && 
                <Flex style={{marginTop : '20px', justifyContent : 'flex-end'}}>
                  <Button style={{width : '120px'}} onClick={()=> navigateToEditPage(id)}>게시글 수정</Button>
                  <Button style={{width : '120px'}} onClick={()=> deletePost(id)}>게시글 삭제</Button>
                </Flex>
              }
        </div>
    )
}
