import express from "express";
import {Request, Response} from "express";

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response)=>{
    return response.json({message: "Servidor esta rodando."})
});

app.listen(4000, ()=> console.log(`Servidor running on PORT 4000...`));