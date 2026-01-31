import { InputGroup } from "@/compounds/input/InputGroup";
import { Flex } from "@/styles/Styles";
import styled from "styled-components";

const PostSearchWrapper = styled.div`
  display : flex;

  @media screen and (max-width : 575px){
    flex-direction : column;
  }
`

interface IPostSearchComponentProps {
  creteria: {
    title: string;
    content: string;
  };
  setCreteria: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
}


export default function PostSearchComponent({ creteria, setCreteria }: IPostSearchComponentProps) {
  const handleChange = (name: string, value: string) => {
    setCreteria((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <InputGroup values={creteria} onChange={handleChange}>
          <PostSearchWrapper>
            <Flex>
              <InputGroup.Label label="제목" htmlFor="title" />
              <InputGroup.Input name="title" />
            </Flex>
            <Flex>
              <InputGroup.Label label="내용" htmlFor="content" />
              <InputGroup.Input name="content" />
            </Flex>
          </PostSearchWrapper>
      </InputGroup>

  );
}
