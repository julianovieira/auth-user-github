import "dotenv/config";
import axios from "axios";

/**
 * Mapeamento das Regras de negocio
 * ===================================
 *  - Receber code do github
 *  - Recuperar o access_token do github
 *  - Recuperar infomações do usuário no github
 *  - Verificar se usuário existe no BD
 *  - Se existir cria um token para o usuário
 *  - Se não exister criar o usuário no BD e gerar um token para o usuáio
 *  - Retornar o token com as informações do usuário
 */

 interface IAccessTokenResponse{
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {

    async execute(code: string) {

        //Recuperar o access_token do github
        const url = "https://github.com/login/oauth/access_token";        
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "accept": "application/json"
            }
        });

        //Recuperar o access_token do github
        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        return response.data;
    }
}
export {AuthenticateUserService}