import { styled } from "styled-components";
import TeamList from "./segments/TeamList";
import { useSchedulesQuery } from "../../hooks/queries/useScheduleQuery";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useMemo, useState } from "react";
import { ko } from "date-fns/locale";
import {  ScheduleFilterOption, IScheduleItem, Team, filterItems, ScheduleTeamOption } from "../../util/filterItems";
import { Button, Flex } from "../../styles/Styles";
import Calendar from "@assets/calendar.svg";
import { SpinnerComponent } from "../ui/Spinner";
import { useModalStore } from "../../store/useModalStore";
import { Container } from "./StadiumStatus";
import { Option } from "../compounds/select/Option";
import { SelectGroup } from "../compounds/select/SelectGroup";


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

  const { data : schedules , error, isLoading, refetch } = useSchedulesQuery();

  // const [date, setDate] = useState<Date | undefined>(undefined); 

  const [month, setMonth] = useState<string>('');

  const [{team}, setSelectedTeam] = useState<ScheduleTeamOption>({ team : '' })

  const [filteredItems, setFilteredItems] = useState<IScheduleItem[]>([]);

  const { openModal } = useModalStore();

  useEffect(()=>{

    if (schedules && !error) {
      const items = filterItems<IScheduleItem, ScheduleFilterOption>(schedules, {team, month});
      setFilteredItems(items);
    }

    else if(!schedules && error){
      openModal(error.message, refetch, "재시도");
    }

  },[schedules, team, month, error, openModal])

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
    <Container style={{flexDirection : 'column'}}>
      <Title>2025 KBO 경기 일정</Title>
      <Flex style={{alignItems : 'center'}}>
      <TeamSelectWrapper>
        <p>팀 선택</p>
        <TeamList onClick={handleTeam} selectedTeam={team} isSchedulePage/>
      </TeamSelectWrapper>  
      <DatepickerWrapper>
        <p>월 선택</p>
        {/* <DatePicker 
            onChange={(date)=> setDate(date!)} 
            selected={date}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            locale={ko}  
            placeholderText="월을 선택해주세요"  
        /> */}
        <SelectGroup 
            onChange={setMonth} 
            value={month} 
            placeholder={!month ? "월을 선택해주세요" : `${month}월`}
        >
          {monthOptionItems}
        </SelectGroup>
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
