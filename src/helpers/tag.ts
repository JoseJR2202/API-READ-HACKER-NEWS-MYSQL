import Pool from '../utils/pool';
import { queriesTag} from '../utils/queries';
import { tag } from '../interfaces/Tag';

const pool = Pool.getInstance();

export const getTag= async(page:number):Promise<tag[]>=>{
    const client = await pool.getConnection();
    try {
        const [result] = (await client.query(queriesTag.GET_TAG,[5, 5*page - 5])); 
        const tags:tag[]=[];
        for (const key in result) {
            tags.push({
                id_tag:result[key].id_tag,
                name:result[key].name
            });
        };
        return tags;
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }
  }

export const insertTag = async(name:string):Promise<number>=>{
    const client = await pool.getConnection();
    try {
      await client.query('BEGIN');
      const [result] = (await client.query(queriesTag.INSERT_TAG,[name])); 
      console.log(result)
      await client.query('COMMIT');
      return result['insertId'];
    } catch (e) {
      await client.query('ROLLBACK');
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

export const checkTag = async(name:string):Promise<number>=>{
    const client = await pool.getConnection();
    try {
        const [result] = (await client.query(queriesTag.CHECK_TAG,[name])); 
        console.log(result)
        return result[0].id_tag;
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }
}