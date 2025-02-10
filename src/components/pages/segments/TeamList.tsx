import { useState } from "react";
import { styled } from "styled-components";
import Arrow from "@assets/arrow-up.svg";
import { Team } from "../../../util/filterItems";
import TeamItem from "./TeamItem";
import { teamImgList, teamImgListAll } from "../../../util/teamList";


const TeamListWrapper = styled.div`
  position: relative;
  border: 1px solid #d3d3d3;
  border-radius: 16px;
  flex: 1 0 0;
`;

const SelectedTeamWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 16px;
  width: 200px;
  height: 48px;
`;

const TeamMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  background-color: white;
  overflow-y : auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: translateY(${({ isOpen }) => (isOpen ? "0" : "-10px")});
`;

interface ITeamList {
  onClick: (team: Team) => void;
  selectedTeam: string;
  isSchedulePage?: boolean;
}

export default function TeamList({ isSchedulePage, selectedTeam, ...rest }: ITeamList) {
  const teamList = isSchedulePage ? teamImgListAll : teamImgList;
  const selectedTeamObj = teamList.find((t) => t.team === selectedTeam);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TeamListWrapper>
      <SelectedTeamWrapper onClick={() => setIsOpen((prev) => !prev)}>
        {selectedTeamObj ? (
          <>
            <img src={selectedTeamObj.src} width={20} />
            <p>{selectedTeamObj.name}</p>
          </>
        ) : (
          <p>팀을 선택해 주세요.</p>
        )}
        <img
          width={20}
          src={Arrow}
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
        />
      </SelectedTeamWrapper>
      <TeamMenu isOpen={isOpen}>
        {teamList.map((team, index) => (
          <TeamItem key={index} {...rest} {...team} selectedTeam={selectedTeam} onClose={() => setIsOpen(false)} />
        ))}
      </TeamMenu>
    </TeamListWrapper>
  );
}