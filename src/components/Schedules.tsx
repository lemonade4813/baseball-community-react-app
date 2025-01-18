import { styled } from "styled-components";
import TeamList from "./TeamList";
import { useSchedulesQuery } from "../hooks/queries/useScheduleQuery";

const SchedulesContainer = styled.main`
    display : flex;
    flex-direction : column;
    align-items : center;
`

interface ISchedule {

  date : string;
  day : string;
  time : string;
  awayTeam : string;
  homeTeam : string;
  notes : string;

} []

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
`

const Th = styled.th`
  flex : 1;
  text-align : center;
  border-bottom : 1px solid #D3D3D3;
  display : flex;
  align-items : center;
  justify-content : center;
`

const Title = styled.h2`
  align-self : flex-start;
  margin-top : 40px;
  margin-bottom : 40px;
  font-size : 32px;
`

export default function Schedule() {

  const { data : games, error, isLoading } = useSchedulesQuery();


  return (
    <SchedulesContainer>
      <Title>2025 KBO 경기 일정</Title>
      <TeamList/>
      <Table>
        <Tr>
          <Th>날짜</Th>
          <Th>요일</Th>
          <Th>경기시작 시간</Th>
          <Th>원정팀</Th>
          <Th>홈팀</Th>
          <Th>비고</Th>
        </Tr>
        {games?.map((game : ISchedule) => 
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
