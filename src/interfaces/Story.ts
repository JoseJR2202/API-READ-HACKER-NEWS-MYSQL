export interface story{
    id_story:number,
    title:string,
    author?:string,
    story_text?:string,
    url:string
}

export interface detailStory extends story{
    publication_date:string,
    tags?:string[],
    cant_comment?:number
}
