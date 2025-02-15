import { useEffect } from "react";

interface ICoordinate {
    latitude : number;
    longitude : number;
    index : number;
}


export const MapBox = ({latitude, longitude, index} : ICoordinate) => {
    useEffect(() => {
      let container = document.getElementById(`map${index}`); // 지도를 담을 영역의 DOM 레퍼런스
      let options = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };
  
      let markerPosition = new window.kakao.maps.LatLng(
        latitude,
        longitude
      );
  
      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
  
      // 마커를 지도 위에 표시

      let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

      marker.setMap(map);
    }, []);
  
    return <div id={`map${index}`} style={{ width: "100%", height: "300px" }}></div>;
  };