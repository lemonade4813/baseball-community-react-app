export type Team = '두산' | '키움' | '한화' | 'NC' | 'SSG' | '삼성' | 'LG' | 'KIA' | 'KT' | '롯데' | '';

export interface IScheduleItem {
    id : string;
    month : string;
    date : string;
    day : string;
    time : string;
    awayTeam : Team;
    homeTeam : Team;
    stadium : string;
    notes : string;
}

interface IStadiumInfoItem {
    team: string;
    stadiumName: string;
    address: string;
    seat: number;
    area: number;
    features: string[]; 
    imagePath: string;
  }
  

export type StadiumInfoFilterOption = Pick<IStadiumInfoItem, 'team'>;

export type ScheduleTeamOption = {
    team : Team
}

export type ScheduleMonthOption = {
    month? : string;
}

export type ScheduleFilterOption = ScheduleTeamOption & ScheduleMonthOption;

// export interface ScheduleFilterOption {
//     team : Team
//     month? : string;
// }

export const filterItems = <T extends (IScheduleItem | IScheduleItem), C extends (StadiumInfoFilterOption | ScheduleFilterOption)>(items: T[], criteria: C): T[] => {
    if (Object.values(criteria).every(value => !value)) {
        return items;
    }
    
    return items.filter(item => 
        Object.entries(criteria).every(([key , value]) => {
            if (!value) return true;
            
            if (key === 'month' && 'month' in item) {
                return item.month === value;
            }
            
            if ('homeTeam' in item && 'awayTeam' in item) {
                const teamFields: ('homeTeam' | 'awayTeam')[] = ['homeTeam', 'awayTeam']; 
                return teamFields.some(field => item[field] === value);
            }

            return item[key as keyof T] === value;
        })
    );
};
