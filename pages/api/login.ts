import type {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDb} from '../../middlewares/conectarMongoDb';
import type {RespostaPadraoMsg} from '../../type/RespostaPadraoMsg';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';


const endpointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<RespostaPadraoMsg>
) => {
    if (req.method === 'POST') {
        const {login, senha} = req.body;

        const usuarioEncontrados = await UsuarioModel.find({email : login, senha: md5(senha)});
        if(usuarioEncontrados && usuarioEncontrados.length > 0) {
            const usuarioEncontrado = usuarioEncontrados[0];
           return res.status(200).json({msg : `Usuario ${usuarioEncontrado.nome} autenticado com sucesso`});
        }
        return res.status(400).json({erro : 'Usuário ou senha não encontrado'});

    }
    return res.status(405).json({erro : 'Metodo informado não existe'});
}

export default conectarMongoDb(endpointLogin);