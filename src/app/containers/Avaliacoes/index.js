import React,{ Component } from 'react';
import moment from 'moment';
import Titulo from '../../components/Texto/Titulo';
import Tabela from '../../components/Tabela/Simples';
import Voltar from '../../components/Links/Voltar';

import { connect } from 'react-redux';
import * as actions from '../../actions/avaliacoes';

class Avaliacoes extends Component {

    getAvaliacoes(props){
        const { usuario, produto } = props;
        if(!usuario || !produto) return;
        this.props.getAvaliacoes(produto._id, usuario.loja);
    }

    componentWillMount(){
        this.getAvaliacoes(this.props);
    }
    componentWillUpdate(nextProps){
        if( 
            ( !this.props.usuario || !this.props.produto ) &&
            nextProps.usuario && nextProps.produto
        ) this.getAvaliacoes(nextProps);
    }

    render(){
        
        const { avaliacoes, produto } = this.props;
        const dados = [];
        (avaliacoes || []).forEach((item) => {
            dados.push({
                "Cliente": item.nome,
                "Data": moment(item.createdAt).format("DD/MM/YYYY"),
                "botaoDetalhes": `/avaliacao/${item._id}`
            });
        });

        return (
            <div className="Avaliacoes full-width">
                <div className="Card">
                    <Voltar history={this.props.history} />
                    <Titulo tipo="h1" titulo={`Avaliações - ${produto ? produto.titulo : ""}`} />
                    <br />
                    <Tabela cabecalho={["Cliente", "Data"]} dados={dados} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    avaliacoes: state.avaliacao.avaliacoes,
    produto: state.produto.produto
});

export default connect(mapStateToProps, actions)(Avaliacoes);