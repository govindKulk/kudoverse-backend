import jwt from "jsonwebtoken";
const verifyToken = (token: string) => {

    try {

        const decoded = jwt.verify(token, "SECRET");
        return decoded;


    }catch(error){
        return error;
    }

}

export default verifyToken;