import { 
    GET_AVALIACOES,
    GET_AVALIACAO,
    LIMPAR_AVALIACAO,
    REMOVE_AVALIACAO
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case GET_AVALIACOES:
            return {
                ...state,
                avaliacoes: action.payload.avaliacoes
            }
        case GET_AVALIACAO:
            return {
                ...state,
                avaliacao: action.payload.avaliacao
            }
        case LIMPAR_AVALIACAO:
        case REMOVE_AVALIACAO:
            return {
                ...state,
                avaliacao: null
            }
        default:
            return state;
    }
}