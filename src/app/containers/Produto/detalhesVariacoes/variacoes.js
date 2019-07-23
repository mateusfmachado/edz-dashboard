import React, { Component } from 'react';
import Titulo from '../../../components/Texto/Titulo';

import { connect } from 'react-redux';
import * as actions from '../../../actions/variacoes';

class Variacoes extends Component {
    state = {
        variacaoSelecionada: "",
        variacoes: []
    }

    getVariacoes(props){
        const { produto, usuario, getVariacoes } = props;

        if(!usuario || !produto) return null;
        getVariacoes(produto._id, usuario.loja);
    }

    componentWillMount(){
        this.getVariacoes(this.props);
    }
    componentWillUpdate(nextProps){
        if( 
            ( !this.props.usuario || !this.props.produto ) &&
            nextProps.usuario && nextProps.produto
        ) this.getVariacoes(nextProps);
    }

    getVariacao(id){
        const { produto, usuario, getVariacao, limparVariacao } = this.props;
        limparVariacao();
        if( produto && usuario && id !== "novo" ) getVariacao(id, produto._id, usuario.loja);
        this.setState({ variacaoSelecionada: id !== "novo" ? id : "" });
    }

    render(){
        const { variacaoSelecionada } = this.state;
        const { variacoes } = this.props;
        return (
            <div className="Variacoes flex vertical flex-center">
                <Titulo tipo="h2" titulo="Variações" />
                {
                    (variacoes || []).map((item, idx) => (
                        <div
                            onClick={() => this.getVariacao(item._id)} key={idx}
                            className={`flex flex-center variacao-item ${ variacaoSelecionada === item._id ? "variacao-item-ativa" : "" }`}>
                            <span>{ item.nome }</span>
                        </div>
                    ))
                }
                <div
                    onClick={() => this.getVariacao("novo")}
                    className={`flex flex-center variacao-item ${ !variacaoSelecionada ? "variacao-item-ativa" : "" }`}>
                    <span>+ Novo</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    variacoes: state.variacao.variacoes,
    variacao: state.variacao.variacao,
    produto: state.produto.produto,
    usuario: state.auth.usuario
});

export default connect(mapStateToProps, actions)(Variacoes);