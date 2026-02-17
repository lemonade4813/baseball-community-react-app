import BaseBallSvg from '@/assets/baseball.svg';
import Bears from "@/assets/team/bears.webp";
import Dinos from "@/assets/team/dinos.svg";
import Eagles from "@/assets/team/eagles.svg";
import Giants from "@/assets/team/giants.svg";
import Landers from "@/assets/team/landers.svg";
import Lions from "@/assets/team/lions.svg";
import Twins from "@/assets/team/twins.svg";
import Tigers from "@/assets/team/tigers.svg";
import Wiz from "@/assets/team/wiz.svg";
import Heroes from "@/assets/team/heroes.svg";
import { Team } from './filterItems';


export type TeamImgList = {
    src: string;
    name: string;
    team: Team
  }[];
  
  export const teamImgList: TeamImgList = [
    { src: Bears, name: "두산 베어스", team: "doosan" },
    { src: Dinos, name: "NC 다이노스", team: "nc" },
    { src: Eagles, name: "한화 이글스", team: "hanwha" },
    { src: Giants, name: "롯데 자이언츠", team: "lotte" },
    { src: Tigers, name: "기아 타이거즈", team: "kia" },
    { src: Landers, name: "SSG 랜더스", team: "ssg" },
    { src: Lions, name: "삼성 라이온스", team: "samsung" },
    { src: Twins, name: "LG 트윈스", team: "lg" },
    { src: Wiz, name: "KT 위즈", team: "kt" },
    { src: Heroes, name: "키움 히어로즈", team: "kiwoom" },
  ];
  
  export const teamImgListAll: TeamImgList = [
    { src: BaseBallSvg, name: "전체", team: '' },
    ...teamImgList,
  ];
  