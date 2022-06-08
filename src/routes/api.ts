import { Router } from 'express';
import {readHacerNews} from '../utils/request';
import { insertCommentBD, insertStoryBD } from '../utils/extras';

const router = Router();

/**
 * Post track
 * @openapi
 * /api/:
 *    get:
 *      tags:
 *        - API
 *      summary: "Realizar peticiones manuales a hackernews"
 *      description: Este endpoint es para Realizar peticiones manuales a hackernews 
 *      responses:
 *        '200':
 *          description: Retorna el resultado de la peticion a hackernews.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseApi'
 *              example:
 *                status: 200
 *                message: "Se han agregado 10 historias/temas y 10 comentarios"
 *        '500':
 *          description: Error en el servidor.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error'
 *              example:
 *                status: 500
 *                error: "objeto con el error"
 *                message: 'Ocurrio un error en el servidor'
 */

router.get('/',async(req, res)=>{
    try {
        const data= await readHacerNews();
        console.log(data);
        let a=0, b=0;
        if(data.storys[0]!=null){
          a= await insertStoryBD(data.storys);
        }else{
          console.log('No hay historias nuevas')
        }
        if(data.comment[0]!=null){
         b= await insertCommentBD(data.comment);
        }else{
          console.log('No hay comentarios nuevos')
        }
        res.status(200).json({ status: 200, message: `Se han agregado ${a} historias/temas y ${b} comentarios` });
      } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
      }
});

export default router;