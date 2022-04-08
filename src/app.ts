import "dotenv/config";
import express from "express";
import {router} from "../src/routes";

const app = express();


app.use(express.json());
app.use(router);

// Rota para registro de autorização no github
app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback', (request, response) => {
    const {code}  = request.query;
    return response.json({code: code});
});

app.listen(4000, ()=> console.log(`Servidor running on PORT 4000...`));