import { styled } from "styled-components";
import TeamList from "./segments/TeamList";
import { useSchedulesQuery } from "../../hooks/queries/useScheduleQuery";
import 'react-datepicker/dist/react-datepicker.css';
import {  ScheduleFilterOption, IScheduleItem, Team, filterItems, ScheduleTeamOption } from "../../util/filterItems";
import {  Container } from "../../styles/Styles";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "../../store/useModalStore";
import { Option } from "../compounds/select/Option";
import { SelectGroup } from "../compounds/select/SelectGroup";
import { useEffect, useMemo, useState } from "react";
import ScheduleSvg from "../../assets/schedule.svg";

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

  const { data : schedules , error, isLoading, refetch } = useSchedulesQuery();

  const [month, setMonth] = useState<string>('');

  const [{team}, setSelectedTeam] = useState<ScheduleTeamOption>({ team : '' })

  const { openModal } = useModalStore();

  const filteredItems = filterItems<IScheduleItem, ScheduleFilterOption>(schedules, {team, month});
  
  useEffect(()=>{
    if(!schedules && error){
      openModal(error.message, refetch, "재시도");
    }

  },[schedules, error, openModal])

  const monthOptionItems = useMemo(() =>  Array.from({length:9}, 
    (_,i)=>i+1).map((month) => 
        <Option value={String(month)}>
          {`${month}월`}
        </Option>),
    [])

  const handleTeam = (team : Team) => {
      setSelectedTeam({ team })
  }

  if(isLoading){
    return <SpinnerComponent/>
  }

  return (
    <Container>
      <Title>
        <img src={ScheduleSvg} width={40} height={40} alt="경기 일정 이미지"/>
        <span>2025 KBO 경기 일정</span>
      </Title>
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
