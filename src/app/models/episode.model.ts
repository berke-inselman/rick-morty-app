export interface episode{
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: any
}
export class episode implements episode{}