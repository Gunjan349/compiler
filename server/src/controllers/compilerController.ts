import { Request, Response } from "express";
import { Code } from "../models/codeSchema";

export const saveCode = async (req: Request, res: Response) => {
  const {code} = req.body;
  try {
    const newCode = await Code.create({
        code : code
    });

    return res.status(201).send({url : newCode._id, message : "Code saved successfully."});
  } 
  catch (error) {
    return res.status(500).send({ message: "Error in saving code.", error });
  }
};

export const loadCode = async (req:Request, res:Response) => {
    const {id} = req.body;

   try{
       const existingCode = await Code.findById(id);
      
       if(!existingCode){
        return res.status(404).send({ message: "Code not found"})
       }
       return res.status(200).send({code:existingCode.code});
   }
   catch (error) {
    return res.status(500).send({ message: "Error in loading code.", error });
  }
}
