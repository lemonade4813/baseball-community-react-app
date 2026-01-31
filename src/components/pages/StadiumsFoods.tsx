import FoodSvg from "@/assets/food.svg";
import { Container, Title } from "@/styles/Styles";

export default function StadiumFoods() {
  return (
    <Container>
      <Title>
        <img src={FoodSvg} width={40} height={40} alt="음식 이미지"/>
        <span>주변 맛집</span>
      </Title>
    </Container>
  )
}
