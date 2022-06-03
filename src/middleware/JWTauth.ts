import  {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

// Create token Validator middleware

const authToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizeHeader= (req.headers.authorization as unknown) as string;

        if (!authorizeHeader) {
            throw new Error('No token was found')
        }
        const token = authorizeHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()

    } catch (error) {
        res.status(401);
        res.json('invalid token');
    }
}
export default authToken;