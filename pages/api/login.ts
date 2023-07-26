import type {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDb} from '../../middlewares/conectarMongoDb';
import type {RespostaPadraoMsg} from '../../type/RespostaPadraoMsg'


const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse<RespostaPadraoMsg>
) => {
    if (req.method === 'POST') {
        const {login, senha} = req.body;
        
        if(login === 'admin@admin.com' && senha === 'Admin@123'){
           return res.status(200).json({msg : 'Usuario autenticado com sucesso'});
        }
        return res.status(400).json({erro : 'Usuário ou senha não encontrado'});

    }
    return res.status(405).json({erro : 'Metodo informado não é valido'});
}

export default conectarMongoDb(endpointLogin);