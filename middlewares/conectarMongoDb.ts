import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";
import type {RespostaPadraoMsg} from '../type/RespostaPadraoMsg';

export const conectarMongoDb = (handler : NextApiHandler) => async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {

    //Verificar se o banco está conectado, se estiver seguir para o endpoint
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    // Se não estiver conectado, vamos conectar pegar a variavel de ambiente preenchida do env.
    const {DB_CONEXAO_STRING} = process.env;

    // se a env estiver vazio avise o programador
    if(!DB_CONEXAO_STRING){
        return res.status(500).json({erro: 'ENV de config do banco não informado'});
    }

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
    mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar no banco ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);

    //Seguir para o endpoint
    return handler(req,res);

}