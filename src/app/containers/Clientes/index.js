import React,{ Component } from 'react';

import Titulo from '../../components/Texto/Titulo';

import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';

import { connect } from "react-redux";
import * as actions from "../../actions/clientes";

class Clientes extends Component {

    state = {
        pesquisa: "",
        atual: 0,
        limit: 5
    }

    getClientes(){
        const { atual, limit, pesquisa } = this.state;
        const { usuario } = this.props;

        if(!usuario) return null;
        const loja = usuario.loja;

        if(pesquisa) this.props.getClientesPesquisa(pesquisa, atual, limit, loja);
        else this.props.getClientes(atual, limit, loja);
    }

    componentWillMount(){
        this.getClientes();
    }
    componentWillUpdate(nextProps){
        if(!this.props.usuario && nextProps.usuario) this.getClientes();
    }

    handleSubmitPesquisa(){
        this.setState({ atual: 0 }, () => this.getClientes())
    }

    onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })

    changeNumeroAtual = (atual) => this.setState({ atual }, () => this.getClientes());

    render(){
        const { pesquisa } = this.state;
        const { clientes } = this.props;

        const dados = [];
        ( clientes ? clientes.docs : [] ).forEach((item) => {
            dados.push({
                "Cliente": item.nome,
                "E-mail": item.usuario ? item.usuario.email : "",
                "Telefone": item.telefones[0],
                "CPF": item.cpf,
                "botaoDetalhes": `/cliente/${item._id}`
            });
        });

        return (
            <div className="Clientes full-width">
                <div className="Card">
                    <Titulo tipo="h1" titulo="Clientes" />
                    <br />
                    <Pesquisa
                        valor={pesquisa}
                        placeholder={"Pesquisa aqui pelo nome do cliente..."}
                        onChange={(ev) => this.onChangePesquisa(ev)}
                        onClick={() => this.handleSubmitPesquisa()} />
                    <br />
                    <Tabela 
                        cabecalho={["Cliente", "E-mail", "Telefone", "CPF"]}
                        dados={dados} />
                    <Paginacao 
                        atual={this.state.atual} 
                        total={clientes ? clientes.total : 0 } 
                        limite={this.state.limit} 
                        onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    clientes: state.cliente.clientes,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Clientes);