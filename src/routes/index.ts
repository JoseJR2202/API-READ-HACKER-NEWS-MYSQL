import { Router } from 'express';
import Comment from './comment';
import Story from './story';
import Tag from './tag';
import Api from './api';

const router = Router();

router.use('/comment', Comment);
router.use('/story', Story);
router.use('/tag', Tag);
router.use('/api', Api);

export default router;
