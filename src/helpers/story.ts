import Pool from '../utils/pool';
import { queriesStory, queriesTag} from '../utils/queries';
import { story, detailStory } from '../interfaces/Story';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getStorys= async(page:number):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY,[5, page*5 - 5])); 
      const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByAuthor= async({author, page}:{author:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY_BY_AUTHOR,[author, 5, page*5 - 5])); 
      const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByTitle = async({title, page}:{title:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY_BY_TITLE,[title, 5, page*5 - 5])); 
      const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByTag = async({tag, page}:{tag:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY_BY_TAG,[tag, 5, page*5 - 5])); 
      const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getStoryByDate= async({date, page}:{date:string, page:number}):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY_BY_DATE,[date, 5, page*5 - 5])); 
      const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
      return storys;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}

export const getFilterStory = async({title, author, page}:{title:string, author:string,  page:number}):Promise<detailStory[]>=>{
  const client = await pool.getConnection();
   try {
    const params:string[]=[];
    console.log(title?params.push(title):null);
    console.log(author?params.push(author):null);
    console.log(queriesStory.FILTER_STORY.BEGINNING + (title?` WHERE UPPER(title) LIKE CONCAT('%',UPPER(?),'%') `:` `)
    + (author?` ${title?'AND':' WHERE '} UPPER(author)  LIKE CONCAT('%',UPPER(?),'%') `:` `)+ queriesStory.FILTER_STORY.END)
    const [result] = (await client.query(queriesStory.FILTER_STORY.BEGINNING + (title?` WHERE UPPER(title) LIKE CONCAT('%',UPPER(?),'%') `:` `)
    + (author?` ${title?'AND':' WHERE '} UPPER(author)  LIKE CONCAT('%',UPPER(?),'%') `:` `)+ queriesStory.FILTER_STORY.END, [...params,5, page*5 - 5]));
    
    const storys:detailStory[]=[];
      for (const key in result) {
          storys.push({
            id_story:result[key].id_story,
            story_text:result[key].story_text,
            url:result[key].url,
            author:result[key].author,
            title:result[key].title,
            publication_date:result[key].publication_date,
            cant_comment:result[key].cant_comment
          });
      };
    return storys;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}  

export const deleteStory = async(id:number):Promise<boolean>=>{
  const client = await pool.getConnection();
  try {
    await client.query('BEGIN');
    const [response] = (await client.query(queriesStory.DELETE_STORY,[id])); 
    console.log(response["affectedRows"])
    await client.query('COMMIT');
    return response["affectedRows"]>0;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export const insertStory = async({story, tags}:{story:detailStory, tags:number[]}): Promise<boolean>=>{
    const client = await pool.getConnection();
    const {id_story, title, author, story_text, url, publication_date} = story;
    try {
      await client.query('BEGIN');
      const [resultStory] = (await client.query(queriesStory.INSERT_STORY,[id_story, title, author, story_text, url, publication_date])); 
      console.log(resultStory)
      tags.map(async (rows)=>{
        const [num]=(await client.query(queriesTag.INSERT_STORY_TAG,[id_story, rows]));
        console.log(num['affectedRows'])
        return num['affectedRows'];
      })
      await client.query('COMMIT');
      return resultStory['affectedRows'];
    } catch (e) {
      await client.query('ROLLBACK');
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
}

export const insertStory2 =async (story:story): Promise<boolean> => {
  const client = await pool.getConnection();
  const {id_story, title, url} = story;
  try {
    await client.query('BEGIN');
    const [resultStory] = (await client.query(queriesStory.INSERT_STORY_INCOMPLETE,[id_story, title, url])); 
    console.log(resultStory)
    await client.query('COMMIT');
    return resultStory['affectedRows'];
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}

export const checkStory = async (id:number): Promise<boolean> => {
  const client = await pool.getConnection();
  try {
      const [result] = (await client.query(queriesStory.GET_STORY_BY_ID,[id])); 
      console.log(result)
      return result[0]!=null;
  } catch (e) {
      console.log(e)
      throw e;
  } finally {
      client.release();
  }
}