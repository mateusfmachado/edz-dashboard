import {
    GET_CATEGORIAS,
    GET_CATEGORIA,
    GET_CATEGORIA_PRODUTOS,
    LIMPAR_CATEGORIA,
    REMOVE_CATEGORIA
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case GET_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload.categorias
            }
        case GET_CATEGORIA:
            return {
                ...state,
                categoria: action.payload.categoria
            }
        case LIMPAR_CATEGORIA:
        case REMOVE_CATEGORIA:
            return {
                ...state,
                categoria: null
            }
        case GET_CATEGORIA_PRODUTOS:
            return {
                ...state,
                categoriaProdutos: action.payload.produtos
            }
        default:
            return state;
    }
}