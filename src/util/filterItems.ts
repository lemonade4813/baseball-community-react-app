export type Team = '두산' | '키움' | '한화' | 'NC' | 'SSG' | '삼성' | 'LG' | 'KIA' | 'KT' | '롯데' | '';


export interface ScheduleItem {
    date : string;
    day : string;
    time : string;
    awayTeam : Team;
    homeTeam : Team;
    stadius : string;
    notes : string;
}

export interface PostItem {
    id : string;
    title : string;
    content : string;
    author : string;
    createdAt : string;
}

export type PostFilterOption = Pick<PostItem, 'title' | 'author'>;

export type ScheduleFilterOption = {
    team : Team
}


export const filterItems = <T extends (ScheduleItem | PostItem), C extends (PostFilterOption | ScheduleFilterOption)>(items: T[], criteria: C): T[] => {

    if (Object.values(criteria).every(value => !value)) {
        return items;
    }
    
    return items.filter(item => 
        Object.entries(criteria).every(([key , value]) => {

            if ('homeTeam' in item && 'awayTeam' in item) {
                const teamFields: ('homeTeam' | 'awayTeam')[] = ['homeTeam', 'awayTeam']; 
                return teamFields.some(field => item[field] === value);
            }

            return item[key as keyof T] === value;
        })
    );
};