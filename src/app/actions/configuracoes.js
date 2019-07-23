import { getHeaders } from './localStorage';
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import {
    GET_CONFIGURACOES,
    LIMPAR_CONFIGURACOES
} from './types';

export const getConfiguracao = (loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/lojas/${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CONFIGURACOES, payload: response.data }))
        .catch(errorHandling);
    }
}

export const updateConfiguracao = (dados, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/lojas/${loja}?loja=${loja}`, {
            nome: dados.nome,
            cnpj: dados.CNPJ,
            email: dados.email,
            endereco: {
                local: dados.endereco,
                numero: dados.numero,
                bairro: dados.bairro,
                cidade: dados.cidade,
                estado: dados.estado,
                CEP: dados.cep
            },
            telefones: dados.telefones
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_CONFIGURACOES, payload: response.data });
            cb(null)
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const limparConfiguracao = () => ({ type: LIMPAR_CONFIGURACOES })