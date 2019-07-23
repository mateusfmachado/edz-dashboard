import { getHeaders } from './localStorage';
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import {
    GET_AVALIACOES,
    GET_AVALIACAO,
    LIMPAR_AVALIACAO,
    REMOVE_AVALIACAO
} from './types';

export const getAvaliacoes = (produto, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/avaliacoes?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => dispatch({ type: GET_AVALIACOES, payload: response.data }))
        .catch(errorHandling);
    }
}

export const getAvaliacao = (id, produto, loja) => {
    return function(dispatch){
        axios.get(`${api}/${versao}/api/avaliacoes/${id}?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => dispatch({ type: GET_AVALIACAO, payload: response.data }))
        .catch(errorHandling);
    }
}

export const limparAvaliacao = () => ({ type: LIMPAR_AVALIACAO });

export const removeAvaliacao = (id, produto, loja, cb) => {
    return function(dispatch){
        axios.delete(`${api}/${versao}/api/avaliacoes/${id}?loja=${loja}&produto=${produto}`, getHeaders())
        .then(response => {
            dispatch({ type: REMOVE_AVALIACAO, payload: response.data });
            cb(null);
        })
        .catch((e) => cb(errorHandling(e)));
    }
}