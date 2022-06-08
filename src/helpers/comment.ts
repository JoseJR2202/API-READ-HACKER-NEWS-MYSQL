import Pool from '../utils/pool';
import { queriesComment, queriesTag} from '../utils/queries';
import { comment, detailComment } from '../interfaces/Comment';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getComment= async(page:number):Promise<detailComment[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesComment.GET_COMMENT,[5, (page*5 - 5)])); 
      console.log(result)
      const comments:detailComment[]=[];
      for (const key in result) {
        comments.push({
          id_comment:result[key].id_comment,
          comment_text:result[key].comment_text,
          id_story:result[key].id_story,
          author:result[key].author,
          publication_date:result[key].publication_date,
        });
      }
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByAuthor= async({author, page}:{author:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.getConnection();
  try {
      console.log(author)
      const [result] = (await client.query(queriesComment.GET_COMMENT_BY_AUTHOR,[author,5, page*5 - 5])); 
      console.log(result)
      const comments:detailComment[]=[];
      for (const key in result) {
        comments.push({
          id_comment:result[key].id_comment,
          comment_text:result[key].comment_text,
          id_story:result[key].id_story,
          author:result[key].author,
          publication_date:result[key].publication_date,
        });
      }
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByTag = async({tag, page}:{tag:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesComment.GET_COMMENT_BY_TAG,[tag,5, page*5 - 5])); 
      console.log(result)
      const comments:detailComment[]=[];
      for (const key in result) {
        comments.push({
          id_comment:result[key].id_comment,
          comment_text:result[key].comment_text,
          id_story:result[key].id_story,
          author:result[key].author,
          publication_date:result[key].publication_date,
        });
      }
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getCommentByDate= async({date, page}:{date:string, page:number}):Promise<detailComment[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesComment.GET_COMMENT_BY_DATE,[date, 5, page*5 - 5])); 
      console.log(result)
      const comments:detailComment[]=[];
      for (const key in result) {
        comments.push({
          id_comment:result[key].id_comment,
          comment_text:result[key].comment_text,
          id_story:result[key].id_story,
          author:result[key].author,
          publication_date:result[key].publication_date,
        });
      }
      return comments;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getFilterComment = async({ author, tags, page}:{ author:string, tags:string[], page:number}):Promise<detailComment[]>=>{
  const client = await pool.getConnection();
   try {
    const params:string[]=[];
    console.log(author?params.push(author):null);
    console.log(tags? params.push(...tags):null);
    let queryTag:string='';
    if(tags){
      for(let i=params.indexOf(tags[0]);i<params.length;i++)
        queryTag+=i===(params.length-1)?`UPPER(?) `:`UPPER(?), `;
    }
    console.log((queriesComment.FILTER_COMMENT.BEGINNING 
      + (author?` AND UPPER(author) LIKE CONCAT('%',UPPER(?),'%') `:` `)+ (tags? ` AND UPPER(tag.name) IN (${queryTag}) `: ` `) + queriesComment.FILTER_COMMENT.END));
    const [result] = (await client.query(queriesComment.FILTER_COMMENT.BEGINNING 
    + (author?` AND UPPER(author) LIKE CONCAT('%',UPPER(?),'%') `:` `)+ (tags? ` AND UPPER(tag.name) IN (${queryTag}) `: ` `) + queriesComment.FILTER_COMMENT.END, [...params,5, page*5 - 5]));
    
    console.log(result)
    const comments:detailComment[]=[];
    for (const key in result) {
      comments.push({
        id_comment:result[key].id_comment,
        comment_text:result[key].comment_text,
        id_story:result[key].id_story,
        author:result[key].author,
        publication_date:result[key].publication_date,
      });
    }
    return comments;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}  

export const deleteComment = async(id:number):Promise<boolean>=>{
  const client = await pool.getConnection();
  try {
    await client.query('BEGIN');
    const [result] = (await client.query(queriesComment.DELETE_COMMENT,[id])); 
    console.log(result['affectedRows'])
    await client.query('COMMIT');
    return result['affectedRows']>0;//result.affectedRows
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export const insertComment =async ({comment, tags}:{comment:detailComment, tags:number[]}) => {
    const client = await pool.getConnection();
    const {id_comment, author, comment_text, publication_date, id_story} = comment;
    try {
      await client.query('BEGIN');
      const [resultComment] = (await client.query(queriesComment.INSERT_COMMENT,[id_comment, author, comment_text, publication_date, id_story])); 
      console.log(resultComment)
      tags.map(async (rows)=>{
        const num:number=(await client.query(queriesTag.INSERT_COMMENT_TAG,[id_comment, rows]))['affectedRows'];
        console.log(num)
        return num;
      })
      await client.query('COMMIT');
      return resultComment['insertId'];
    } catch (e) {
      await client.query('ROLLBACK');
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
}

export const checkComment = async (id:number): Promise<boolean> => {
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesComment.GET_COMMENT_BY_ID,[id])); 
      console.log(result)
      return result[0]!=null;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}