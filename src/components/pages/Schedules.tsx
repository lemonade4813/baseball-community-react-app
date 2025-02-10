import { styled } from "styled-components";
import TeamList from "./segments/TeamList";
import { useSchedulesQuery } from "../../hooks/queries/useScheduleQuery";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import { ko } from "date-fns/locale";

import { ScheduleTeamOption, ScheduleFilterOption, ScheduleItem, Team, filterItems } from "../../util/filterItems";
import { Flex } from "../../styles/Styles";
import Calendar from "@assets/calendar.svg";


const SchedulesContainer = styled.main`
    display : flex;
    flex-direction : column;
    align-items : center;
`

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
  background-color : #FFDEE9;
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
`

const DatepickerWrapper = styled.div`

   display : flex;
   justify-content : center;
   align-items : center; 
   gap : 20px;
   width : 400px;

  .react-datepicker{
    border : none;
  }


  .react-datepicker__input-container input{
    height : 48px;
    width : 160px;
    // background : #FFFFCC;
    border-radius : 16px;
    border : 1px solid #D3D3D3;
    padding-left : 8px;
    font-size : 16px;
    background-image : url(${Calendar});
    background-repeat: no-repeat;
    background-position: right 16px center; 
    background-size: 20px; 
  }

  .react-datepicker__header {
    display : none;
  }

  .react-datepicker__navigation{
    display : none;
  }

  .react-datepicker__month-container{

    border : 1px solid #D3D3D3;
    border-radius : 16px;
  }

  .react-datepicker__month-text {
    height : 36px;
    width : 48px;
    line-height : 30px;
    font-size : 16px;
  }

  .react-datepicker__triangle{
    display : none;
  }
`

const TeamSelectWrapper = styled.div`
  display : flex;
  align-items : center;
  gap : 20px;

`

export default function Schedule() {

  const { data : schedules , error, isLoading } = useSchedulesQuery();

  const [date, setDate] = useState<Date | undefined>(undefined); 

  const [{team}, setSelectedTeam] = useState<ScheduleTeamOption>({ team : '' })

  const [filteredItems, setFilteredItems] = useState<ScheduleItem[]>([]);

  useEffect(()=>{
    if (schedules) {
      const items = filterItems<ScheduleItem, ScheduleFilterOption>(schedules, 
                                                                      { team , 
                                                                        month : date ? String(date.getMonth()+1) : undefined
                                                                      });
      setFilteredItems(items);
    }
  },[schedules, team, date])

  const handleTeam = (team : Team) => {
      setSelectedTeam({ team })
  }

  if(isLoading){
    return <p>로딩 중입니다.</p>
  }

  if(error){
    return <p>{`에러가 발생했습니다. ${error.message}`}</p>
  }

  return (
    <SchedulesContainer>
      <Title>2025 KBO 경기 일정</Title>
      <Flex style={{alignItems : 'center'}}>
      <TeamSelectWrapper>
        <p>팀 선택</p>
        <TeamList onClick={handleTeam} selectedTeam={team} isSchedulePage/>
      </TeamSelectWrapper>  
      <DatepickerWrapper>
        <p>월 선택</p>
        <DatePicker 
            onChange={(date)=> setDate(date!)} 
            selected={date}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            locale={ko}  
            placeholderText="월을 선택해주세요"  
        />
        </DatepickerWrapper>
        </Flex>
      <Table>
        <Tr>
          <Th>날짜</Th>
          <Th>요일</Th>
          <Th>경기시작 시간</Th>
          <Th>원정팀</Th>
          <Th>홈팀</Th>
          <Th>비고</Th>
        </Tr>
        {filteredItems?.map((game, index : number) => 
          <Tr key={index}>
            <Td>{game.month}.{game.date}</Td>
            <Td>{game.day}</Td>
            <Td>{game.time}</Td>
            <Td>{game.awayTeam}</Td>
            <Td>{game.homeTeam}</Td>
            <Td>{game.notes}</Td>
          </Tr>
        )}
      </Table>
   </SchedulesContainer>
  )
}
