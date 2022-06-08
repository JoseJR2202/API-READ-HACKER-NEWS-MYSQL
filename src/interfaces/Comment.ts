export interface comment{
    id_comment:number,
    author:string,
    comment_text:string,
    id_story?:number
}

export interface detailComment extends comment{
    publication_date:string,
    tags?:string[]
}

export interface storyComment extends detailComment{
    story_title:string,
    story_url:string
}