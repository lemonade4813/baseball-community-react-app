import { useEffect, useState } from "react";
import BgImage1 from "@/assets/background/banner_doosan.png";
import BgImage2 from "@/assets/background/banner_lg.png";
import ArrowImg from "@/assets/arrow_carousel.svg";

import styled from "styled-components";

const images = [BgImage1, BgImage2];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <CarouselWrapper>
      <CarouselTrack
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              width={'100%'}
            />
            <Overlay />
          </Slide>
        ))}
      </CarouselTrack>

      <PrevButton onClick={handlePrev}>
        <img src={ArrowImg} width={20}/>
      </PrevButton>
      <NextButton onClick={handleNext}>
        <img src={ArrowImg} width={20}/>
      </NextButton>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.3s;
`;

const Slide = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;

  aspect-ratio : 1920/540;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.3;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 0; /* 내부 여백 초기화 (크기를 고정할 때 중요) */
  color: white;
  background-color: rgba(55, 55, 55, 0.5);
  border: none;
  cursor: pointer;
`;

const PrevButton = styled(Button)`
  left: 0;
  background-color : rgba(197, 199, 166, 0.6);
  border-radius : 999px;
  width : 40px;
  height : 40px;
`;

const NextButton = styled(Button)`
  right: 0;
  background-color : rgba(197, 199, 166, 0.6);
  border-radius : 999px;
  width : 40px;
  height : 40px;
  transform : rotate(180deg);
`;
