import ThumbUpSvg from "../../../assets/thumbup.svg";
import ThumbDownSvg from "../../../assets/thumbdown.svg";
import styled from "styled-components";
import { useEffect } from "react";
import { useModalStore } from "../../../store/useModalStore";
import axiosInstance from "../../../util/axiosIntance";
import { usePostRecommendQuery } from "../../../hooks/queries/usePostRecommendQuery";

const RecommendPostWrapper = styled.div`
    display : flex;
    gap : 20px;
    justify-content : center;
    align-items : center;
    border-radius : 8px;
    align-self : flex-end;
`
const RecommendItemWrapper = styled.div`
    width : 100px;
    height : 40px;
    border-radius : 8px;
    cursor : pointer;
    display : flex;
    justify-content: center;
    align-items : center;
    gap : 20px;
    box-shadow : 0 2px 3px 0 rgb(0 0 0 / 0.1);
`



export default function RecommendPost({id} : {id? :  string}) {

  if(id === undefined){
    return null;
  }

  const {data, refetch, error } = usePostRecommendQuery(id);                                    
  const { openModal } = useModalStore();

  const handleRecommend = async (id : string, isRecommend : boolean) => {
        await axiosInstance.post(`/posts/recommend`, { id, isRecommend });
        refetch();
  }

  useEffect(()=>{
      if(error)
        openModal(error.message);
    },[error])


  return (
    <RecommendPostWrapper>
        <RecommendItemWrapper onClick={() => handleRecommend(id, true)}>
            <img src={ThumbUpSvg} width={30}/>
            {data?.recommendedCount}         
        </RecommendItemWrapper>
        <RecommendItemWrapper onClick={() => handleRecommend(id, false)}>
            <img src={ThumbDownSvg} width={30}/>
            {data?.notRecommendedCount}
        </RecommendItemWrapper>
    </RecommendPostWrapper>
  )
}

// import ThumbUpSvg from "../../../assets/thumbup.svg";
// import ThumbDownSvg from "../../../assets/thumbdown.svg";
// import styled from "styled-components";
// import { useFetch } from "../../../hooks/api/useFetch";
// import { useRequest } from "../../../hooks/api/useRequest";
// import { useEffect } from "react";
// import { useModalStore } from "../../../store/useModalStore";

// const RecommendPostWrapper = styled.div`
//     display : flex;
//     gap : 20px;
//     justify-content : center;
//     align-items : center;
//     border-radius : 8px;
//     align-self : flex-end;
// `
// const RecommendItemWrapper = styled.div`
//     width : 100px;
//     height : 40px;
//     border-radius : 8px;
//     cursor : pointer;
//     display : flex;
//     justify-content: center;
//     align-items : center;
//     gap : 20px;
//     box-shadow : 0 2px 3px 0 rgb(0 0 0 / 0.1);
// `

// interface IPostRecommend{
//     recommendedCount : number;
//     notRecommendedCount : number;

// }

// export default function RecommendPost({id} : {id? :  string}) {

//   if(id === undefined){
//     return null;
//   }

//   const { data, error : fetchError, refetch } = useFetch<IPostRecommend>(`/posts/${id}/recommend/count`);
//   const { requestApi , error : requestError } = useRequest();
//   const { openModal } = useModalStore();

//   const handleRecommend = (id : string, isRecommend : boolean) => {
//         requestApi(`/posts/recommend`, 'POST',{ id, isRecommend });
//         refetch();
//   }

//   useEffect(()=>{
//     if(fetchError || requestError){
//         const error = fetchError || requestError;
//         openModal(error!);
//     }

//   },[fetchError, requestError])


//   return (
//     <RecommendPostWrapper>
//         <RecommendItemWrapper onClick={() => handleRecommend(id, true)}>
//             <img src={ThumbUpSvg} width={30}/>
//             {data?.recommendedCount}         
//         </RecommendItemWrapper>
//         <RecommendItemWrapper onClick={() => handleRecommend(id, false)}>
//             <img src={ThumbDownSvg} width={30}/>
//             {data?.notRecommendedCount}
//         </RecommendItemWrapper>
//     </RecommendPostWrapper>
//   )
// }
