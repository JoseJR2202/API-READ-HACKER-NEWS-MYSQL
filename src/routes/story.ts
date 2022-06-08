import { Router } from 'express';
import { detailStory} from '../interfaces/Story';
import {getStoryByAuthor, getStoryByDate, getStoryByTag, getStoryByTitle, getStorys, deleteStory, getFilterStory} from '../helpers/story';
import {filterByAuthorFieldsValidation, filterByDateFieldsValidation, filterByTagFieldsValidation, filterByTitleFieldsValidation, filterStorysFiledsValidation, checkResult} from '../validations/fields'

const router = Router();

/**
 * @openapi
 * /story/{page}:
 *    get:
 *      tags:
 *        - Story
 *      summary: "Visualizar storys"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de storys a revisar
 *      description: Este endpoint es usado para visualizar los storys sacados de hackernews 
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los storys corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseTag'
 *              example:
 *                status: 200
 *                story: "story"
 *                message: "storys enviadas"
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.get('/:page', async(req, res)=>{
    try {
        const data:detailStory[]=await getStorys(+req.params.page);
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /story/author/{page}:
 *    post:
 *      tags:
 *        - Story
 *      summary: "filtrar historias por autor"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de historia a revisar
 *      description: Este endpoint es usado para visualizar las historias sacados de hackernews filtrados por su autor
 *      requestBody:
 *        description: Valor del autor por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterAuthor'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de las historias corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseStory'
 *              example:
 *                status: 200
 *                story: "Historias"
 *                message: "storys enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/author/:page', filterByAuthorFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByAuthor({author:req.body.author, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /story/date/{page}:
 *    post:
 *      tags:
 *        - Story
 *      summary: "filtrar historias por fecha de realizacion"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de historia a revisar
 *      description: Este endpoint es usado para visualizar las historias sacados de hackernews filtrados por su fecha de realizacion
 *      requestBody:
 *        description: Valor de la fecha por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterDate'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de las historias corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseStory'
 *              example:
 *                status: 200
 *                storys: "Historias"
 *                message: "storys enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/date/:page', filterByDateFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByDate({date:req.body.date, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /story/title/{page}:
 *    post:
 *      tags:
 *        - Story
 *      summary: "filtrar historias por su titulo"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de historia a revisar
 *      description: Este endpoint es usado para visualizar las historias sacados de hackernews filtrados por su titulo
 *      requestBody:
 *        description: Valor del titulo por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterTitle'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de las historias corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseStory'
 *              example:
 *                status: 200
 *                storys: "historias"
 *                message: "storys enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/title/:page', filterByTitleFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByTitle(({title:req.body.title, page: +req.params.page}));
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /story/tag/{page}:
 *    post:
 *      tags:
 *        - Story
 *      summary: "filtrar historias por sus tags"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de historia a revisar
 *      description: Este endpoint es usado para visualizar las historias sacados de hackernews filtrados por sus tags
 *      requestBody:
 *        description: Valor del tag por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterTag'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de las historias corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseStory'
 *              example:
 *                status: 200
 *                storys: "historias"
 *                message: "storys enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.post('/tag/:page', filterByTagFieldsValidation, checkResult, async(req, res)=>{
    try {
        const data:detailStory[]=await getStoryByTag({tag:req.body.tag, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

/**
 * @openapi
 * /story/filter/{page}:
 *    post:
 *      tags:
 *        - Story
 *      summary: "filtrar historias por su titulo y autor"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de historia a revisar
 *      description: Este endpoint es usado para visualizar las historias sacados de hackernews filtrados por su titulo y autor
 *      requestBody:
 *        description: Valor del titulo y el autor por cual filtrar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/storyFilter'
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de las historias corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseStory'
 *              example:
 *                status: 200
 *                storys: "historias"
 *                message: "storys enviadas"
 *        '400':
 *          $ref: '#/components/responses/ValidationFields'
 *        '500':
 *          $ref: '#/components/responses/Error' 
 */

router.post('/filter/:page', filterStorysFiledsValidation, checkResult, async(req, res)=>{
    try {
        const {author, title}= req.body;
        console.log(req.body)
        const data:detailStory[]=await getFilterStory({title:title, author:author, page: +req.params.page});
        res.status(200).json({ status: 200, storys: data, message: 'Storys enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

/**
 * @openapi
 * /story/{id}:
 *    delete:
 *      tags:
 *        - Story
 *      summary: "eliminar historias por su ID"
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la historia a eliminar
 *      description: Este endpoint es usado para eliminar las historias por su ID
 *      responses:
 *        '200':
 *          description: Retorna si la historia fue eliminada o no.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  storys:
 *                    type: boolean
 *                  message: 
 *                    type: string
 *              example:
 *                status: 200
 *                storys: true
 *                message: "story eliminado"
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.delete('/:id', async(req, res)=>{
    try {
        const data:boolean=await deleteStory(+req.params.id);
        res.status(200).json({ status: 200, storys: data, message: 'Story eliminado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

export default router;