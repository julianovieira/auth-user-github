
import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({
            errorCode: "token.invalid."
        });

        /**
         * Estrutura tokens
         * Bearer 90384028ljc09180980w0cn0....
         */
        const [,token] = authToken.split(" ");

        try {
            const {sub} = verify(token, process.env.SECRET_JWT) as IPayload;
            request.user_id = sub;
        } catch (error) {
            return response.status(401).json({errorCode: "token.expired"})
        }

        
    }
}