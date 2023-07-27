import type { NextApiRequest, NextApiResponse } from "next";
import type {RespostaPadraoMsg} from '../../type/RespostaPadraoMsg';
import type {UsuarioRequisicao} from '../../type/UsuarioRequisicao';
import {} from '../../models/UsuarioModel'

const endpointCadastro = (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    if (req.method === 'POST') {
        const usuario = req.body as UsuarioRequisicao;

        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro: 'Nome invalido'});
        }
        if(!usuario.email 
            || usuario.email.length < 5 
            || !usuario.email.includes('@') 
            || !usuario.email.includes('.')){
            return res.status(400).json({erro: 'E-mail informado invalido'});

        }
        if(!usuario.senha || usuario.senha.length < 4){
            return res.status(400).json({erro: 'Senha não é valida'});
        }

        return res.status(200).json({msg: 'Usuario cadastrado com sucesso'});
    }
    return res.status(405).json({erro : 'Metodo informado não é valido'});
}

export default endpointCadastro;