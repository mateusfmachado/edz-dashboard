import { getHeaders } from './localStorage';
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import { transformeDate } from './index';
import { 
    GET_CLIENTES,
    GET_CLIENTE,
    GET_CLIENTE_PEDIDOS,
    REMOVE_CLIENTE,
    LIMPAR_CLIENTE
} from './types';

export const getClientes = (atual, limit, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/clientes?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CLIENTES, payload: response.data }))
        .catch(errorHandling);
    }
}

export const getClientesPesquisa = (termo, atual, limit, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/clientes/search/${termo}?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CLIENTES, payload: response.data }))
        .catch(errorHandling);
    }
}

export const getCliente = (id, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CLIENTE, payload: response.data }))
        .catch(errorHandling);
    }
}

export const getClientePedidos = (id, atual, limit, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/clientes/admin/${id}/pedidos?loja=${loja}&offset=${atual}&limit=${limit}`, getHeaders())
        .then(response => dispatch({ type: GET_CLIENTE_PEDIDOS, payload: response.data }))
        .catch(errorHandling);
    }
}


export const limparCliente = () => ({ type: LIMPAR_CLIENTE });

export const updateCliente = (cliente, id, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`, {
            nome: cliente.nome,
            cpf: cliente.CPF,
            email: cliente.email,
            telefones: [cliente.telefone],
            endereco: {
                local: cliente.endereco,
                numero: cliente.numero,
                bairro: cliente.bairro,
                cidade: cliente.cidade,
                estado: cliente.estado,
                CEP: cliente.cep
            },
            dataDeNascimento: transformeDate(cliente.dataDeNascimento, "/", "YYYY-MM-DD")
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_CLIENTE, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)))
    }
}

export const removerCliente = (id, loja, cb) => {
    return function(dispatch){
        axios.delete(`${api}/${versao}/api/clientes/admin/${id}?loja=${loja}`, getHeaders())
        .then(response => {
            dispatch({ type: REMOVE_CLIENTE, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)))
    }
}