import './config/alias'
import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import cron from 'node-cron';
import {readHacerNews} from './utils/request';
import { insertCommentBD, insertStoryBD } from './utils/extras';
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

cron.schedule('0 */1 * * *',async ()=>{
  try {
    const data= await readHacerNews();
    console.log(data);
    if(data.storys[0]!=null){
      const a= await insertStoryBD(data.storys);
    }else{
      console.log('No hay historias nuevas')
    }
    if(data.comment[0]!=null){
      const b= await insertCommentBD(data.comment);
    }else{
      console.log('No hay comentarios nuevos')
    }
  } catch (e) {
    console.log(e);
  }
})

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use('/',routes);

export default app;
