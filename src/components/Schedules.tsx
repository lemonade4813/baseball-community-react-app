import { styled } from "styled-components";
import TeamList from "./TeamList";
import { useSchedulesQuery } from "../hooks/queries/useScheduleQuery";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useMemo, useState } from "react";
import { ko } from "date-fns/locale";

import { ScheduleFilterOption, Team, filterItems } from "../util/filterItems";
import { SelectGroup } from "./compound/select/SelectGroup";
import { Option } from "./compound/select/Option";
import { InputGroup } from "./compound/input/InputGroup";
import { Input } from "./compound/input/Input";
import { CheckboxGroup } from "./compound/checkbox/CheckboxGroup";
import { Checkbox } from "./compound/checkbox/Checkbox";
import Label from "./compound/input/Label";


const SchedulesContainer = styled.main`
    display : flex;
    flex-direction : column;
    align-items : center;
`

// interface ISchedule {

//   date : string;
//   day : string;
//   time : string;
//   awayTeam : string;
//   homeTeam : string;
//   notes : string;

// } []

const Table = styled.div`
  width : 80%;
  font-size : 18px;
  margin-top : 40px;
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

  .react-datepicker__input-container input{
    height : 40px;
    width : 160px;
    background : #FFFFCC;
    border-radius : 8px;
    border : 1px solid #FFD400;
    padding-left : 8px;
    font-size : 16px;

  }

  .react-datepicker__header {
    display : none;
  }

  .react-datepicker__navigation{
    display : none;
  }

  .react-datepicker__month-container{
    background-color : #FFE0B2;
    border : 1px solid #FF7043;
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
  margin-bottom : 32px;

`

export default function Schedule() {

  const { data : schedules , error, isLoading } = useSchedulesQuery();

  const [date, setDate] = useState(new Date());

  const [creteria, setCretria] = useState<ScheduleFilterOption>({ team : '' })

  const filteredItems = useMemo(() => {
    if(schedules){
      return filterItems(schedules, creteria)
    }},
   [ schedules, creteria ])
    
  const handleTeam = (team : Team) => {
      setCretria({ team })
  }

  return (
    <SchedulesContainer>
      <Title>2025 KBO 경기 일정</Title>
      <TeamSelectWrapper>
        <p>팀 선택</p>
        <TeamList onClick={handleTeam} selectedTeam={creteria.team}/>
      </TeamSelectWrapper>  
      <DatepickerWrapper>
        <p>월 선택</p>
        <DatePicker 
            onChange={(date)=> setDate(date!)} 
            selected={date}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            locale={ko}    
        />
        </DatepickerWrapper>
      <Table>
        <Tr>
          <Th>날짜</Th>
          <Th>요일</Th>
          <Th>경기시작 시간</Th>
          <Th>원정팀</Th>
          <Th>홈팀</Th>
          <Th>비고</Th>
        </Tr>
        {filteredItems?.map((game : any) => 
          <Tr>
            <Td>{game.date}</Td>
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
