import { useEffect } from "react";
import { useFetch } from "../../hooks/api/useFetch";
import { useModalStore } from "../../store/useModalStore";
import styled from "styled-components";
import HomepageSvg from "../../assets/home.svg";
import { teamImgList } from "../../util/teamList";

interface IStadiumInfo {
  team: string;
  stadiumName: string;
  address: string;
  seat: number;
  area: number;
  features: string[];
  imagePath: string;
  homepage: string;
}

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  align-self: flex-start;
  margin-bottom: 20px;
  color: #444;
  font-size : 36px
`;

const StadiumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const StadiumCard = styled.div`
  background: #FFF;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 450px;
  padding: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StadiumImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const StadiumTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const StadiumInfo = styled.p`
  margin: 8px 0;
  font-size: 0.9rem;
  color: #666;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FeatureItem = styled.li`
  font-size: 0.85rem;
  color: #444;
  background: #F4F4F4;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 3px;
`;

export default function StadiumLocation() {
  const { openModal } = useModalStore();
  const { data: stadiumInfoList, error } = useFetch<IStadiumInfo[]>("/stadium");

  useEffect(() => {
    if (error) {
      openModal(error);
    }
  }, [error, openModal]);

  return (
    <Container style={{padding : '20px', flexDirection : 'column'}}>
      <Title>{`> 경기장 현황`}</Title>
      <StadiumContainer>
        {stadiumInfoList?.map((stadium) => (
          <StadiumCard key={stadium.team}>
            <img width={48} height={48} src={teamImgList.find((t) => t.team === stadium.team)?.src}/>
            <StadiumImage
              src={`${import.meta.env.VITE_API_BASE_URL}${stadium.imagePath}`}
              alt={`${stadium.stadiumName} 이미지`}
            />
            <a 
              href={stadium.homepage} 
              style={{cursor : 'pointer'}} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                  src={HomepageSvg} 
                  width={40} 
                  height={40} 
                  alt="홈페이지 링크" 
                  style={{ marginBottom: "10px" }} 
              />
            </a>
            <StadiumTitle>{stadium.stadiumName}</StadiumTitle>
            <StadiumInfo>주소: {stadium.address}</StadiumInfo>
            <StadiumInfo>좌석 수: {stadium.seat?.toLocaleString()}</StadiumInfo>
            <StadiumInfo>면적: {stadium.area?.toLocaleString()} m²</StadiumInfo>
            <FeatureList>
              {stadium.features?.map((feature, featureIndex) => (
                <FeatureItem key={featureIndex}>{feature.trim()}</FeatureItem>
              ))}
            </FeatureList>
          </StadiumCard>
        ))}
      </StadiumContainer>
    </Container>
  );
}