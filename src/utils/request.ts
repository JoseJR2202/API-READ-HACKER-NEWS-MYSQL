import axios from 'axios';
import {detailStory} from '../interfaces/Story'
import {detailComment} from '../interfaces/Comment'

let dataStorys:detailStory[]= [];
let dataComment:detailComment[]=[];

export const readHacerNews =async (): Promise<{
    storys: detailStory[];
    comment: detailComment[];
}> => {
    const response= await axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
    const data = await response.data;
    const storys:detailStory[]=[];
    const comments:detailComment[]=[];
    data.hits.forEach((rows)=>{
        if(rows.title!=null){
             storys.push({
                id_story: parseInt(rows.objectID),
                title: rows.title,
                author: rows.author,
                story_text: rows.story_text,
                url: rows.url,
                publication_date: rows.created_at,
                tags:rows._tags
            })
        }else {
            comments.push({
                id_comment: parseInt(rows.objectID),
                author: rows.author,
                comment_text: rows.comment_text,
                publication_date: rows.created_at,
                id_story: rows.story_id,
                tags:rows._tags
            })
            console.log(!storys.find(item=> item.id_story===rows.story_id))
            if(!storys.find(item=> item.id_story===rows.story_id) && rows.story_id){
                storys.push({
                        id_story: rows.story_id,
                        title: rows.story_title?rows.story_title:'Titulo no encontrado',
                        url: rows.story_url!=null?rows.story_url:'URL no encontrada',
                        publication_date:rows.publication_date//undefined
                })
            }  
        }
    })

    const finalData={
        storys: storys.filter((row)=>
            !dataStorys.find((item)=> item.id_story=== row.id_story)
        ),
        comment: comments.filter((row)=>
            !dataComment.find((item)=> item.id_comment=== row.id_comment)
        )
    }
    //actualizando datos
    if(finalData.storys[0]!=null){
        dataStorys= storys;
    }
    if(finalData.comment[0]!=null){
        dataComment= comments;
    }
    return finalData;
}