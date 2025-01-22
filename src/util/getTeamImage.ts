import Bears from "../assets/team/bears.webp";
import Dinos from "../assets/team/dinos.svg";
import Eagles from "../assets/team/eagles.svg";
import Giants from "../assets/team/giants.svg";
import Landers from "../assets/team/landers.svg";
import Lions from "../assets/team/lions.svg";
import Twins from "../assets/team/twins.svg";
import Tigers from "../assets/team/tigers.svg";
import Wiz from "../assets/team/wiz.svg";
import Heroes from "../assets/team/heroes.svg";


export const getTeamImages = (team : string) => {

    switch(team){
        case 'tigers' : 
            return {src : Tigers, name : '기아 타이거즈'};
        case 'dinos' : 
            return {src : Dinos, name : 'NC 다이노스'};
        case 'landers' : 
            return {src : Landers, name : 'SSG 랜더스'};
        case 'bears' : 
            return {src : Bears, name : '두산 베어스'};
        case 'twins' : 
            return {src : Twins, name : 'LG 트윈스'};
        case 'eagles' : 
            return {src : Eagles, name : '한화 이글스'};
        case 'giants' : 
            return {src : Giants, name : '롯데 자이언츠'};
        case 'wiz':
            return {src : Wiz, name : 'KT 위즈'};
        case 'lions':
            return {src : Lions, name : '삼성 라이온스'};
        case 'heroes':
            return {src : Heroes, name : '키움 히어로즈'};
    }
}