import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { WiThermometer, WiHumidity, WiWindy } from "react-icons/wi";
import { MdCalendarToday } from "react-icons/md";
import { IoMdMap } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";
import { HiOutlineMap } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";


const PageTitle = styled.p`
  font-size : 40px;
  margin-top : 40px;
  font-weight : 600;
`

const Address = styled.p`
  margin-top : 20px;
  font-size : 24px;
`

const Description = styled.p`
  margin-top : 20px;
  font-size : 20px;
`

const SectionTitle = styled.h2`
  font-size : 32px;
  margin-top : 60px;
  margin-bottom : 60px;
  display : flex;
  align-items : center;
  gap : 20px;
  font-weight : 500;
`

const WeatherItemWrapper = styled.div`
  display : flex;
  align-items : center;
  flex : 1;
  background-color : #FBE3CB;
  height : 150px;
  border-radius : 20px;
  box-shadow : 5px 5px 10px rgba(0,0,0,0.1); 
`

const WeatherItemTitle = styled.span`
  font-size : 24px;
  margin-left : 20px;
  font-weight : 500;
`
/*
const WeatherContentWrapper = styled.div`
  display : flex;
  align-items : center;
`
*/

const DayForecastItem = styled(Flex)<{$bgColor : string}>`
  flex-direction : column;
  background-color : ${({$bgColor}) => $bgColor};
  border-radius : 20px; 
  padding : 20px; 
  box-shadow : 5px 5px 20px rgba(0,0,0,0.2); 
`

const DayConditionText = styled.p`
  font-weight : 600;
  font-size : 22px;
`

const ForecastDate = styled.p`
  font-size : 20px;
  font-weight : 600;
`

const ForecastValue = styled.span`
  font-size : 30px;
  font-weight : 500;
  padding : 20px;
  border-left : 2px solid #fff;
`

import { MapBox } from "../map/MapBox";
import styled from "styled-components";
import { Flex } from "@/styles/Styles";

export default function StadiumItem() {
  const [ weatherData, setWeatherData] = useState<any>();

  const { team } = useParams();

  const findLocation = (team : string) => {
    switch(team){
        case 'kia' :
          return 'Gwangju'
        case 'samsung' :
          return 'Daegu'
        case 'ssg' :
          return 'Incheon'
        case 'hanwha' :
          return 'Daejeon'
        case 'nc' :
          return 'Changwon'
        case 'lotte' :
          return 'Busan'
        case 'kt' :
          return 'Suwon'
        default :
          return 'Seoul'  
    }
  } 

  const location = findLocation(team!);

  console.log(import.meta.env.VITE_WEATHER_BASE_URL);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [currentRes, forecastRes, teamInfo] = await Promise.all([
          axios.get(`${import.meta.env.VITE_WEATHER_BASE_URL}/current.json?key=a80108e501c64c168c6102431260703&q=${location}&aqi=no`),
          axios.get(`${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=a80108e501c64c168c6102431260703&q=${location}&days=7&lang=ko`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/stadium/${team}`)
        ]);

        // 2. 두 응답 모두 성공했는지 확인
        if (currentRes.status === 200 && forecastRes.status === 200) {
          // 3. 데이터 병합 (동일한 키가 있을 경우 뒤의 데이터가 덮어씌워지니 유의하세요)
          setWeatherData({
            ...currentRes.data,
            ...forecastRes.data,
            ...teamInfo.data
          });
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error("날씨 데이터를 가져오는 중 오류 발생:", e.message);
        }
      }
    };
    fetchWeather();
  }, []); 

  console.log(weatherData?.coordinates)
  return (
    <div>
      <div>   
        <PageTitle>{weatherData?.stadiumName}</PageTitle>
        <Address><HiLocationMarker size={20}/>주소 | {weatherData?.address}</Address>
        <SectionTitle><HiOutlineMap size={20}/>지도보기</SectionTitle> 
        {weatherData?.coordinates ? (
        <MapBox
          latitude={weatherData.coordinates[0]} 
          longitude={weatherData.coordinates[1]}  
          width={'100%'}   
          height={'300px'} 
          index={1}
        />
      ) : (
        <div style={{ width: '300px', height: '300px', backgroundColor: '#eee' }}>
          지도를 불러오는 중입니다...
        </div>
      )}
      <SectionTitle><FaBusAlt size={20}/>오시는길</SectionTitle>
      <Description>{weatherData?.direction}</Description>
      </div>      
      <SectionTitle><MdCalendarToday size={24}/>현재날씨</SectionTitle>
        <Flex $gap={40}>
          <WeatherItemWrapper>
            <WeatherItemTitle>기온</WeatherItemTitle>
              <Flex>
                <WiThermometer size={80} color="#FF4500" />
                <ForecastValue>{weatherData?.current.temp_c}°C</ForecastValue>
              </Flex>
          </WeatherItemWrapper>
          <WeatherItemWrapper>
            <WeatherItemTitle>습도</WeatherItemTitle>
              <Flex>
                <WiHumidity size={80} color="#3498DB" />
                <ForecastValue>{weatherData?.current.humidity}%</ForecastValue>
              </Flex>
          </WeatherItemWrapper>
          <WeatherItemWrapper>
            <WeatherItemTitle>풍속</WeatherItemTitle>
            <Flex>
              <WiWindy size={80} />
              <ForecastValue>{weatherData?.current.wind_kph}km/h</ForecastValue>
            </Flex>
          </WeatherItemWrapper>
        </Flex>
      <div>
        <SectionTitle> <IoMdMap size={24} /> 주간날씨</SectionTitle>
        <Description>최대 1주간 데이터가 표시됩니다.</Description>
        <Flex $justifyContent="center" $gap={60}>
        {weatherData?.forecast?.forecastday?.map(({date, day}: any, index : number) => {
        return (
          <DayForecastItem key={date} $bgColor={index % 2 == 0 ? '#BADAF7' : '#CCCCFF'}>
            <ForecastDate>{date}</ForecastDate>
            <DayConditionText>{day.condition.text}</DayConditionText>
            <img src={`${day.condition.icon}`} width={60} height={60}/>
            <div>
              <p style={{marginBottom : '10px'}}>최고기온 | {day.maxtemp_c}°C</p>
              <p>최저기온 | {day.mintemp_c}°C</p>
            </div>
          </DayForecastItem>
        );
      })}
      </Flex>
      </div>
    </div>
  )
}
