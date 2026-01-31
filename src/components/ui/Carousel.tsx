import { useEffect, useState } from "react";
import BgImage1 from "@/assets/background/bg_1.jpg";
import BgImage2 from "@/assets/background/bg_2.jpg";
import BgImage3 from "@/assets/background/bg_3.jpg";

import styled from "styled-components";

const images = [BgImage1, BgImage2, BgImage3];

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
              height={'250px'}
              width={'100%'}
            />
            <Overlay />
          </Slide>
        ))}
      </CarouselTrack>

      <PrevButton onClick={handlePrev}>{"<"}</PrevButton>
      <NextButton onClick={handleNext}>{">"}</NextButton>
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
  color: white;
  background-color: rgba(55, 55, 55, 0.5);
  border: none;
  cursor: pointer;
`;

const PrevButton = styled(Button)`
  left: 0;
`;

const NextButton = styled(Button)`
  right: 0;
`;
