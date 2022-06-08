import { Router } from 'express';
import {tag} from '../interfaces/Tag';
import {getTag} from '../helpers/tag';

const router = Router();

/**
 * @openapi
 * /tag/{page}:
 *    get:
 *      tags:
 *        - tag
 *      summary: "Visualizar Tags"
 *      parameters:
 *          - in: path
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la pagina de tags a revisar
 *      description: Este endpoint es usado para visualizar los tags sacados de hackernews 
 *      responses:
 *        '200':
 *          description: Retorna el arreglo de los tags corespondiente a la pagina de {page}.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/responseTag'
 *              example:
 *                status: 200
 *                tags: "tags"
 *                message: "tags enviadas"
 *        '500':
 *          $ref: '#/components/responses/Error'
 */

router.get('/:page',async (req, res) => {
    try {
        const data:tag[]= await getTag(+req.params.page);
        res.status(200).json({ status: 200, tags: data, message: 'Tags enviados' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
})

export default router;