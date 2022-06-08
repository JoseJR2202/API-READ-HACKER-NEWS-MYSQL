import { Router } from 'express';
import { detailComment} from '../interfaces/Comment';
import {getComment, getCommentByAuthor, getCommentByDate, getCommentByTag, deleteComment, getFilterComment} from '../helpers/comment';
import {filterByAuthorFieldsValidation, filterByDateFieldsValidation, filterByTagFieldsValidation, filterCommentsFiledsValidation, checkResult} from '../validations/fields'
const router = Router();

/**
 * @openapi
 * /comment/{page}:
 *    get:
 *      tags:
 *        - Comment
 *      summary: "Visualizar comentarios"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de comentarios a revisar
 *      description: Este endpoint es usado para visualizar los comentarios sacados de hackernews 
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los comentarios corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseComment'
 *              example:
 *                status: 200
 *                comment: "Comentarios"
 *                message: "Comments enviadas"
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.get('/:page',async(req, res)=>{
    try {
        const data:detailComment[]=await getComment(+req.params.page);
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /comment/author/{page}:
 *    post:
 *      tags:
 *        - Comment
 *      summary: "filtrar comentarios por autor"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de comentarios a revisar
 *      description: Este endpoint es usado para visualizar los comentarios sacados de hackernews filtrados por su autor
 *      requestBody:
 *        description: Valor del autor por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterAuthor'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los comentarios corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseComment'
 *              example:
 *                status: 200
 *                comment: "Comentarios"
 *                message: "Comments enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/author/:page', filterByAuthorFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByAuthor({author:req.body.author, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /comment/date/{page}:
 *    post:
 *      tags:
 *        - Comment
 *      summary: "filtrar comentarios por fecha de realizacion"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de comentarios a revisar
 *      description: Este endpoint es usado para visualizar los comentarios sacados de hackernews filtrados por su fecha de realizacion
 *      requestBody:
 *        description: Valor de la fecha por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterDate'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los comentarios corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseComment'
 *              example:
 *                status: 200
 *                comment: "Comentarios"
 *                message: "Comments enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/date/:page', filterByDateFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByDate({date:req.body.date, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /comment/tag/{page}:
 *    post:
 *      tags:
 *        - Comment
 *      summary: "filtrar comentarios por tags"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de comentarios a revisar
 *      description: Este endpoint es usado para visualizar los comentarios sacados de hackernews filtrados por sus tags
 *      requestBody:
 *        description: Valor del tag por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterTag'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los comentarios corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseComment'
 *              example:
 *                status: 200
 *                comment: "Comentarios"
 *                message: "Comments enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/tag/:page',filterByTagFieldsValidation, checkResult,  async(req, res)=>{
    try {
        const data:detailComment[]=await getCommentByTag({tag:req.body.tag, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /comment/filter/{page}:
 *    post:
 *      tags:
 *        - Comment
 *      summary: "filtrar comentarios por autor y tags"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de comentarios a revisar
 *      description: Este endpoint es usado para visualizar los comentarios sacados de hackernews filtrados por su autor y tags
 *      requestBody:
 *        description: Valor del autor por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/commentFilter'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los comentarios corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseComment'
 *              example:
 *                status: 200
 *                comment: "Comentarios"
 *                message: "Comments enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error' 
 */

router.post('/filter/:page', filterCommentsFiledsValidation, checkResult, async(req, res)=>{
    try {
        const {author, tags}= req.body;
        const data:detailComment[]=await getFilterComment({author:author, tags:tags, page: +req.params.page});
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

/**
 * @openapi
 * /comment/{id}:
 *    delete:
 *      tags:
 *        - Comment
 *      summary: "Eliminar un comentario por su id"
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID del comentario a eliminar
 *      description: Este endpoint es usado para eliminar un comentario por su id
 *      responses:
 *        '200':
 *          description: Retorna si el comentario fue eliminado o no.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  comment:
 *                    type: boolean
 *                  message: 
 *                    type: string
 *              example:
 *                status: 200
 *                comment: true
 *                message: "Commentario eliminado"
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.delete('/:id', async(req, res)=>{
    try {
        const data:boolean=await deleteComment(+req.params.id);
        res.status(200).json({ status: 200, comment: data, message: 'Comments enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

export default router;