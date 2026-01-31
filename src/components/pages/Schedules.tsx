import { styled } from "styled-components";
import TeamList from "./segments/TeamList";
import { useSchedulesQuery } from "@/hooks/queries/useScheduleQuery";
import 'react-datepicker/dist/react-datepicker.css';
import {  ScheduleFilterOption, IScheduleItem, Team, filterItems, ScheduleTeamOption } from "@/util/filterItems";
import {  Container } from "@/styles/Styles";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "@/store/useModalStore";
import { Option } from "@/compounds/select/Option";
import { SelectGroup } from "@/compounds/select/SelectGroup";
import { useEffect, useMemo, useState } from "react";
import ScheduleSvg from "@/assets/schedule.svg";
import axios from "axios";

// const SchedulesContainer = styled.main`
//     display : flex;
//     flex-direction : column;
//     align-items : center;
// `

const Table = styled.div`
  width : 80%;
  font-size : 18px;
  margin-top : 40px;
  height : 480px;
  overflow-y : auto;
`

const Tr = styled.tr`
  width : 100%;
  height : 60px;
  display : flex;
`

const Td = styled.td`
  flex : 1;
  text-align : center;
  border-bottom : 1px solid #D3D3D3;
  display : flex;
  align-items : center;
  justify-content : center;
  border-right : 1px solid #D3D3D3;

  &:last-child{
    border-right : none;
  }
`

const Th = styled.th`
  flex : 1;
  text-align : center;
  border-bottom : 1px solid #D3D3D3;
  display : flex;
  align-items : center;
  justify-content : center;
  background-color : #FF6A89;
  border-right : 1px solid #D3D3D3;

  &:last-child{
    border-right : none;
  }
`

const Title = styled.h2`
  align-self : flex-start;
  margin-top : 40px;
  margin-bottom : 40px;
  font-size : 32px;
  display : flex;
  align-items: center;
`

const ScheduleSearchWrapper = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;

   @media screen and (max-width : 575px){
    flex-direction : column;
  }
`



const DatepickerWrapper = styled.div`

   display : flex;
   justify-content : center;
   align-items : center; 
   gap : 20px;
   width : 400px;

  @media screen and (max-width : 575px){
    flex-direction : column;
    margin-top : 20px;
  }
`

const TeamSelectWrapper = styled.div`
  display : flex;
  align-items : center;
  gap : 20px;

  @media screen and (max-width : 575px){
    flex-direction : column;
  }
`

export default function Schedule() {

  const { data: schedules, error, isLoading, refetch } = useSchedulesQuery();
  const [month, setMonth] = useState<string>('');
  const [{ team }, setSelectedTeam] = useState<ScheduleTeamOption>({ team: '' });
  const { openModal } = useModalStore();

  // 🔴 에러 수정: 아래에 있던 useState를 모든 조건부 return 위로 올립니다.
  const [file, setFile] = useState<File | null>(null);

  const filteredItems = filterItems<IScheduleItem, ScheduleFilterOption>(schedules, { team, month });

  useEffect(() => {
    if (!schedules && error) {
      openModal(error.message, refetch, "재시도");
    }
  }, [schedules, error, openModal]);

  const monthOptionItems = useMemo(() => 
    Array.from({ length: 9 }, (_, i) => i + 1).map((month) => (
      <Option key={month} value={String(month)}>
        {`${month}월`}
      </Option>
    )), []);

     // 🟢 조건부 렌더링(Loading)은 모든 Hook 선언이 끝난 뒤에 위치해야 합니다.
  if (isLoading) {
    return <SpinnerComponent />;
  }

  const handleTeam = (team: Team) => {
    setSelectedTeam({ team });
  };

 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null); // 선택 취소 시 상태 초기화
    }  
  };
    
    
    
    const handleUpload = async () => {
      if (!file) {
        alert("파일을 먼저 선택해주세요!");
      return;
    }
    
    // 전송할 데이터를 담는 FormData 생성
    const formData = new FormData();
    
      formData.append('file', file); // 스프링 부트의 @RequestParam("file")과 이름이 일치해야 함
      try { 
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/schedule/upload`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data', // 중요: 멀티파트 설정
        },
      });
      
      alert("서버 응답: " + response.data);
      } catch (error) {
        console.error("업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
      }  
    }


  return (
    <Container>
      <Title>
        <img src={ScheduleSvg} width={40} height={40} alt="경기 일정 이미지"/>
        <span>2025 KBO 경기 일정</span>
      </Title>
      <div>
          <h3>Excel 파일 업로드 (MongoDB 저장)</h3>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
            서버로 전송
          </button>
       </div>  
      <ScheduleSearchWrapper>
      <TeamSelectWrapper>
        <p>팀 선택</p>
        <TeamList onClick={handleTeam} selectedTeam={team} isSchedulePage/>
      </TeamSelectWrapper>
       
      <DatepickerWrapper>
        <p>월 선택</p>
        <SelectGroup 
            onChange={setMonth} 
            value={month} 
            placeholder={!month ? "월을 선택해주세요" : `${month}월`}
        >
          {monthOptionItems}
        </SelectGroup>
        </DatepickerWrapper>
        </ScheduleSearchWrapper>
      <Table>
        <Tr>
          <Th>날짜</Th>
          <Th>요일</Th>
          <Th>경기시작 시간</Th>
          <Th>원정팀</Th>
          <Th>홈팀</Th>
          <Th>비고</Th>
        </Tr>
        {filteredItems.length ? (
            filteredItems?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.month}.{item.date}</Td>
                <Td>{item.day}</Td>
                <Td>{item.time}</Td>
                <Td>{item.awayTeam}</Td>
                <Td>{item.homeTeam}</Td>
                <Td>{item.notes}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td>데이터가 존재하지 않습니다.</Td>
            </Tr>
        )}
      </Table>
   </Container>
  )

          
}
