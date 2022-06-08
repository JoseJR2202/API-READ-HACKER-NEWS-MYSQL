import {insertStory, insertStory2, checkStory} from '../helpers/story';
import {checkComment, insertComment} from '../helpers/comment';
import {checkTag, insertTag} from '../helpers/tag';
import { tag } from '../interfaces/Tag';
import { detailStory } from '../interfaces/Story';
import { detailComment } from '../interfaces/Comment';

export const insertStoryBD = async(storys:detailStory[]):Promise<number>=>{
    let count:number=0;
    for (const item of storys) {
        let tags:number[]=[];
        let tag:number;
        const verificador:boolean=await checkStory(item.id_story);
        console.log(verificador?'ya se encuentra':'no se encuentra')
        if(!verificador){
            count++;
            if(item.tags!=null){
                for (const row of item.tags) {
                    try {
                        tag= await insertTag(row);
                    } catch (e) {
                        tag= await checkTag(row);
                    }
                    tags.push(tag)
                }
                const story= await insertStory({story:item, tags:tags})
            }else{
                const story= await insertStory2(item)
            }
        }
    }
    return count
};

export const insertCommentBD = async(comments:detailComment[]): Promise<number>=> {
    console.log('iniciooooooooooooooooooooooooooooooooo')
    let count:number=0;
    for (const item of comments) {
        let tags:number[]=[];
        let tag:number;
        const verificador:boolean=await checkComment(item.id_comment);
        console.log(verificador?'ya se encuentra':'no se encuentra')
        if(!verificador){
            count++;
            if(item.tags!=null){
                for (const row of item.tags) {
                    try {
                        tag= await insertTag(row);
                        console.log(tag)
                    } catch (e) {
                        tag= await checkTag(row);
                        console.log(tag)
                    }
                    tags.push(tag)
                }
            }
            const comment= await insertComment({comment:item, tags:tags})
        } 
    }
    return count
}