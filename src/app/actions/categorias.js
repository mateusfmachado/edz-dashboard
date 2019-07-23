import { getHeaders } from './localStorage';
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import {
    GET_CATEGORIAS,
    GET_CATEGORIA,
    LIMPAR_CATEGORIA,
    REMOVE_CATEGORIA,
    GET_CATEGORIA_PRODUTOS
} from './types';

export const getCategorias = (loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/categorias?loja=${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CATEGORIAS, payload: response.data }))
        .catch(errorHandling);
    }
}

export const salvarCategoria = (categoria, loja, cb) => {
    return function(dispatch){
        axios.post(`${api}/${versao}/api/categorias?loja=${loja}` , {
            nome: categoria.nome,
            codigo: categoria.codigo
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_CATEGORIAS, payload: response.data });
            cb(null);
        })
        .catch(e => cb(errorHandling(e)))
    }
}

export const getCategoria = (id, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/categorias/${id}?loja=${loja}`, getHeaders())
        .then(response => dispatch({ type: GET_CATEGORIA, payload: response.data }))
        .catch(errorHandling);
    }
}

export const limparCategoria = () => ({ type: LIMPAR_CATEGORIA });

export const getCategoriaProdutos = (id, atual, limit, loja) => {
    return function(dispatch){
        axios.get(
            `${api}/${versao}/api/categorias/${id}/produtos?loja=${loja}&offset=${atual}&limit=${limit}`, 
            getHeaders()
        )
        .then(response => dispatch({ type: GET_CATEGORIA_PRODUTOS, payload: response.data }))
        .catch(errorHandling);
    }
}

export const updateCategoria = (categoria, id, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/categorias/${id}?loja=${loja}`, {
            nome: categoria.nome,
            codigo: categoria.codigo,
            disponibilidade: categoria.disponibilidade === "disponivel" ? "true" : "false"
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_CATEGORIA, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const removerCategoria = (id, loja, cb) => {
    return function(dispatch){
        axios.delete(`${api}/${versao}/api/categorias/${id}?loja=${loja}`, getHeaders())
        .then(response => {
            dispatch({ type: REMOVE_CATEGORIA, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}