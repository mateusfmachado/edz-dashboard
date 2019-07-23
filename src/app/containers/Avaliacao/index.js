import React, { Component } from 'react';
import Voltar from '../../components/Links/Voltar';
import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples';

import AlertGeral from '../../components/Alert/Geral';
import { connect } from 'react-redux';
import * as actions from '../../actions/avaliacoes';

class Avaliacao extends Component {

    state = { aviso: null }

    getAvaliacao(props){
        const { usuario, produto } = props;
        if(!usuario || !produto) return;
        const { id: avaliacao } = props.match.params;
        this.props.getAvaliacao(avaliacao, produto._id, usuario.loja);
    }
    componentWillMount(){
        this.getAvaliacao(this.props);
    }
    componentWillUpdate(nextProps){
        if( 
            ( !this.props.usuario || !this.props.produto ) &&
            nextProps.usuario && nextProps.produto
        ) this.getAvaliacao(nextProps);
    }
    componentWillUnmount(){
        this.props.limparAvaliacao();
    }

    removeAvaliacao(){
        const { usuario, produto, avaliacao } = this.props;
        if( !usuario || !produto || !avaliacao ) return null;
        if(window.confirm("Você realmente deseja remover essa avaliação?")){
            this.props.removeAvaliacao(avaliacao._id, produto._id, usuario.loja, (error) => {
                if(error) return this.setState({ aviso: { status: false, msg: error.message } });
                else this.props.history.goBack();
            });
        }
    }

    renderCabecalho(){
        const { avaliacao, produto } = this.props;
        return (
            <div className="flex">
                <div className="flex-1 flex vertical">
                    <Titulo tipo="h3" titulo={`Avaliação - ${produto ? produto.titulo : ""} - ${avaliacao ? avaliacao.pontuacao : ""} estrelas`} />
                    <Titulo tipo="h4" titulo={`Cliente - ${avaliacao ? avaliacao.nome : ""}`} />
                </div>
                <div className="flex-1 flex flex-end">
                    <ButtonSimples 
                        type="danger"
                        onClick={() => this.removeAvaliacao()}
                        label="Remover" />
                </div>
            </div>
        )
    }

    renderMensagem(){
        const { avaliacao } = this.props;
        return (
            <div className="Mensagem">{ avaliacao ? avaliacao.texto : "..." }</div>
        )
    }

    render(){
        return (
            <div className="Avaliacao full-width">
                <div className="Card">
                    <Voltar history={this.props.history} />
                    <AlertGeral aviso={this.state.aviso} />
                    { this.renderCabecalho() }
                    { this.renderMensagem() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    produto: state.produto.produto,
    avaliacao: state.avaliacao.avaliacao
});

export default connect(mapStateToProps, actions)(Avaliacao);