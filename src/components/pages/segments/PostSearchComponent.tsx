import { InputGroup } from "../../compounds/input/InputGroup";
import { Flex } from "../../../styles/Styles";

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
    <Flex>
      <InputGroup values={creteria} onChange={handleChange}>
        <InputGroup.Label label="제목" htmlFor="title" />
        <InputGroup.Input name="title" />
        <InputGroup.Label label="내용" htmlFor="content" />
        <InputGroup.Input name="content" />
      </InputGroup>
    </Flex>
  );
}
