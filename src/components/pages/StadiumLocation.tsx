import { useFetch } from "../../hooks/api/useFetch";

interface IStadiumInfo {
  team: string;
  stadiumName: string;
  address: string;
  seat: number;
  area: number;
  features: string[]; 
  imagePath: string;
}

export default function StadiumLocation() {
  const { data: stadiumInfoList, error, refetch } = useFetch<IStadiumInfo[]>("/stadium");

  if (error) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <>
      <h2>경기장 위치</h2>
      <div>
        {stadiumInfoList?.map((stadium, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <p>경기장: {stadium.stadiumName}</p>
            <p>주소: {stadium.address}</p>
            <p>좌석 수: {stadium.seat}</p>
            <p>면적: {stadium.area}</p>
            <p>특징:</p>
            <ul>
              {stadium.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}