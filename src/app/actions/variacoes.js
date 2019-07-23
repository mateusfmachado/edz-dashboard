import { getHeaders } from './localStorage';
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import {
    GET_VARIACOES,
    GET_VARIACAO,
    LIMPAR_VARIACAO,
    REMOVE_VARIACAO
} from './types';

export const getVariacoes = (produto, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/variacoes?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => dispatch({ type: GET_VARIACOES, payload: response.data }))
        .catch(errorHandling);
    }
}

export const getVariacao = (id, produto, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/variacoes/${id}?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => dispatch({ type: GET_VARIACAO, payload: response.data }))
        .catch(errorHandling);
    }
}

export const limparVariacao = () => ({ type: LIMPAR_VARIACAO });

export const salvarVariacao = (variacao, produto, loja, cb) => {
    return function(dispatch){
        axios.post(`${api}/${versao}/api/variacoes?loja=${loja}&produto=${produto}`, {
            codigo: variacao.codigo,
            nome: variacao.nome,
            preco: variacao.preco,
            promocao: variacao.promocao,
            quantidade: variacao.quantidade,
            entrega: {
                freteGratis: (variacao.freteGratis === "sim"),
                pesoKg: variacao.peso,
                dimensoes: {
                    alturaCm: variacao.altura,
                    larguraCm: variacao.largura,
                    profundidadeCm: variacao.comprimento
                }
            }
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_VARIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const removeVariacao = (id, produto, loja, cb) => {
    return function(dispatch){
        axios.delete(`${api}/${versao}/api/variacoes/${id}?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => {
            dispatch({ type: REMOVE_VARIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const updateVariacao = (variacao, id, produto, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/variacoes/${id}?loja=${loja}&produto=${produto}`, {
            codigo: variacao.codigo,
            nome: variacao.nome,
            preco: variacao.preco,
            promocao: variacao.promocao,
            quantidade: variacao.quantidade,
            entrega: {
                freteGratis: (variacao.freteGratis === "sim"),
                pesoKg: variacao.peso,
                dimensoes: {
                    alturaCm: variacao.altura,
                    larguraCm: variacao.largura,
                    profundidadeCm: variacao.comprimento
                }
            }
        }, getHeaders())
        .then(response => {
            dispatch({ type: GET_VARIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const removeVariacaoImagens = (fotos, id, produto, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/variacoes/${id}?loja=${loja}&produto=${produto}`, { fotos }, getHeaders())
        .then(response => {
            dispatch({ type: GET_VARIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}

export const updateVariacaoImagens = (data, id, produto, loja, cb) => {
    return function(dispatch){
        axios.put(`${api}/${versao}/api/variacoes/images/${id}?loja=${loja}&produto=${produto}`, data, getHeaders())
        .then(response => {
            dispatch({ type: GET_VARIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}