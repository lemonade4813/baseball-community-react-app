import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../util/axiosIntance";
import { Button } from "../styles/Styles";

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
            <h2>게시글 상세</h2>
            <p>{title}</p>
            <p>{content}</p>
            {id &&  <Button style={{width : '120px'}}onClick={()=>deletePost(id)}>삭제</Button>}
        </div>
    )
}
