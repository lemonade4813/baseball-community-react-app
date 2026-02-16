import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { WiThermometer, WiHumidity, WiSunrise, WiWindDeg, WiWindy } from "react-icons/wi";

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

  console.log(weatherData);
  console.log(weatherData?.forecast?.forecastday);

  console.log(import.meta.env.VITE_WEATHER_BASE_URL);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_WEATHER_BASE_URL}/current.json?key=1d963a8827fb40c48f562527261602&q=${location}&aqi=no`),
          axios.get(`${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=1d963a8827fb40c48f562527261602&q=${location}&days=7&lang=ko`)
        ]);
  
        // 2. 두 응답 모두 성공했는지 확인
        if (currentRes.status === 200 && forecastRes.status === 200) {
          // 3. 데이터 병합 (동일한 키가 있을 경우 뒤의 데이터가 덮어씌워지니 유의하세요)
          setWeatherData({
            ...currentRes.data,
            ...forecastRes.data
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

  return (
    <div>
      <h2>현재날씨</h2>
        <div style={{display : 'flex', alignItems : 'center' }}>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <WiThermometer size={60} color="#FF4500" /> 
            <span>{weatherData?.current.temp_c}°C</span>
          </div>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <WiHumidity size={60} color="#3498DB" /> 
            <span>{weatherData?.current.humidity}%</span>
          </div>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <WiWindy size={60} /> 
            <span>{weatherData?.current.wind_kph}km/h</span>
          </div>
         
        </div>
 
      <div>
        <h2>주간날씨</h2>
        <div style={{ display : 'flex', padding : '20px', justifyContent : 'space-between'}}>
        {weatherData?.forecast?.forecastday?.map(({date, day}: any) => {
        return (
          <div key={date} style={{ display : 'flex', alignItems : 'center', gap : '20px', flexDirection : 'column', backgroundColor : '#D2F7FF', borderRadius : '20px', padding : '20px', boxShadow : '5px 5px 20px rgba(0,0,0,0.2)' }}>
            <p>{date}</p>
            <p style={{fontWeight : 600, fontSize : '22px'}}>{day.condition.text}</p>
            <img src={`${day.condition.icon}`} width={60} height={60}/>
            <div>
              <p style={{marginBottom : '10px'}}>최고기온 | {day.maxtemp_c}°C</p>
              <p>최저기온 | {day.mintemp_c}°C</p>
            </div>
          </div>
        );
      })}
      </div>
      </div>
    </div>
  )
}
