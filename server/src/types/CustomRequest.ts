import { Request } from "express";

interface CustomRequest extends Request {
    user: {
        id: string;
    }
    authtoken: string
}

export default CustomRequest;