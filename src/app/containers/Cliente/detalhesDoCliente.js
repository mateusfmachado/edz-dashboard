import React from 'react';
import moment from "moment";
import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';

import Voltar from '../../components/Links/Voltar';
import { connect } from 'react-redux';
import * as actions from '../../actions/clientes';
import AlertGeral from '../../components/Alert/Geral';

class DetalhesDoCliente extends React.Component {

    generateStateCliente = (props) => ({
        nome: props.cliente ? props.cliente.nome : "",
        CPF: props.cliente ? props.cliente.cpf : "",
        telefone: props.cliente ? props.cliente.telefones[0] : "",
        dataDeNascimento: props.cliente ? moment(props.cliente.dataDeNascimento).format("DD/MM/YYYY") : "",
        email: props.cliente && props.cliente.usuario ? props.cliente.usuario.email : "",

        endereco: props.cliente && props.cliente.endereco ? props.cliente.endereco.local : "",
        numero: props.cliente && props.cliente.endereco ? props.cliente.endereco.numero : "",
        bairro: props.cliente && props.cliente.endereco ? props.cliente.endereco.bairro : "",
        cidade: props.cliente && props.cliente.endereco ? props.cliente.endereco.cidade : "",
        estado: props.cliente && props.cliente.endereco ? props.cliente.endereco.estado : "",
        cep: props.cliente && props.cliente.endereco ? props.cliente.endereco.CEP : "",
    });

    constructor(props){
        super();
        this.state = {
            ...this.generateStateCliente(props),
            aviso: null,
            erros: {}
        }
    }

    cleanAlert = () => this.setState({ aviso: null })

    componentWillUpdate(nextProps){
        if(
            ( !this.props.cliente && nextProps.cliente ) ||
            ( this.props.cliente && nextProps.cliente && this.props.cliente.updatedAt !== nextProps.cliente.updatedAt )
        ) this.setState(this.generateStateCliente(nextProps));
    }

    handleSubmit = (field, value) => {
        this.setState({ [field]: value }, () => this.validate());
    }

    validate(){
        const { nome, CPF, telefone, dataDeNascimento, email, endereco, numero, bairro, cidade, estado, cep } = this.state;
        const erros = {};

        if(!nome) erros.nome = "Preencha aqui com o nome do cliente";
        if(!CPF) erros.CPF = "Preencha aqui com o CPF do cliente";
        if(!telefone) erros.telefone = "Preencha aqui com o telefone do cliente";
        if(!dataDeNascimento) erros.dataDeNascimento = "Preencha aqui com a data de nascimento do cliente";
        if(!email) erros.email = "Preencha aqui com o email do cliente";
        if(!endereco) erros.endereco = "Preencha aqui com o endereço do cliente";
        if(!numero) erros.numero = "Preencha aqui com o número do cliente";
        if(!bairro) erros.bairro = "Preencha aqui com o bairro do cliente";
        if(!cidade) erros.cidade = "Preencha aqui com a cidade do cliente";
        if(!estado) erros.estado = "Preencha aqui com o estado do cliente";
        if(!cep) erros.cep = "Preencha aqui com o CEP do cliente";

        this.setState({ erros });
        return !( Object.keys(erros).length > 0 );
    }

    salvarCliente(){
        this.cleanAlert();
        const { usuario, cliente } = this.props;
        if(!usuario || !cliente) return null;
        if(!this.validate()) return null;
        this.props.updateCliente(this.state, cliente._id, usuario.loja, (error) => {
            this.setState({ 
                aviso: {
                    status: !error,
                    msg: error ? error.message : "Cliente atualizado com sucesso!"
                }
            });
        });
    }

    removerCliente(){
        this.cleanAlert();
        const { usuario, cliente } = this.props;
        if(!usuario || !cliente) return null;
        
        if(window.confirm("Você realmente deseja remover esse cliente?")){
            this.props.removerCliente(cliente._id, usuario.loja, (error) => {
                this.setState({ 
                    aviso: {
                        status: !error,
                        msg: error ? error.message : "Cliente removido com sucesso!"
                    }
                });
            });
        }
    }

    renderCabecalho(){
        const { nome } = this.state;
        const { cliente } = this.props;
        return (
            <div className="flex">
                <div className="flex-1 flex">
                    <Titulo tipo="h1" titulo={nome} />
                </div>
                {
                    cliente && cliente.deletado ? (
                        <div className="flex-1 flex flex-end">
                            <ButtonSimples label="Removido" type="danger" />
                        </div>
                    ): (
                    <div className="flex-1 flex flex-end">
                        <ButtonSimples 
                            onClick={() => this.salvarCliente()}
                            label="Salvar"
                            type="success" />
                        <ButtonSimples 
                            onClick={() => this.removerCliente()}
                            label="Remover"
                            type="danger" />
                    </div>
                    )
                }
            </div>
        )
    }

    renderDetalhesCadastro(){
        const { nome, CPF, email, telefone, dataDeNascimento, erros } = this.state;
        return (
            <div className="Detalhes-do-Cadastro">
                <TextoDados 
                    chave="Nome"
                    valor={(
                        <InputValor 
                            name="nome" noStyle erro={erros.nome}
                            handleSubmit={(valor) => this.handleSubmit("nome", valor)}
                            value={nome} />
                    )}
                    />
                <TextoDados 
                    chave="CPF"
                    valor={(
                        <InputValor 
                            name="cpf" noStyle erro={erros.CPF}
                            handleSubmit={(valor) => this.handleSubmit("CPF", valor)}
                            value={CPF} />
                    )}
                    />
                <TextoDados 
                    chave="Telefone"
                    valor={(
                        <InputValor 
                            name="telefone" noStyle erro={erros.telefone}
                            handleSubmit={(valor) => this.handleSubmit("telefone", valor)}
                            value={telefone} />
                    )}
                    />
                <TextoDados 
                    chave="E-mail"
                    valor={(
                        <InputValor 
                            name="email" noStyle erro={erros.email}
                            handleSubmit={(valor) => this.handleSubmit("email", valor)}
                            value={email} />
                    )}
                    />
                <TextoDados 
                    chave="Data de Nascimento"
                    valor={(
                        <InputValor 
                            name="datadenascimento" noStyle erro={erros.dataDeNascimento}
                            handleSubmit={(valor) => this.handleSubmit("dataDeNascimento", valor)}
                            value={dataDeNascimento} />
                    )}
                    />
            </div>
        );
    }
    renderDetalhesEntrega(){
        const { endereco, numero, bairro, cidade, estado, cep, erros } = this.state;
        return (
            <div className="Detalhes-da-Entrega">
                <TextoDados 
                    chave="Endereço"
                    valor={(
                        <InputValor 
                            name="endereco" noStyle erro={erros.endereco}
                            handleSubmit={(valor) => this.handleSubmit("endereco", valor)}
                            value={endereco} />
                    )}
                    />
                <TextoDados 
                    chave="Numero"
                    valor={(
                        <InputValor 
                            name="numero" noStyle erro={erros.numero}
                            handleSubmit={(valor) => this.handleSubmit("numero", valor)}
                            value={numero} />
                    )}
                    />
                <TextoDados 
                    chave="Bairro"
                    valor={(
                        <InputValor 
                            name="cpf" noStyle erro={erros.bairro}
                            handleSubmit={(valor) => this.handleSubmit("bairro", valor)}
                            value={bairro} />
                    )}
                    />
                <TextoDados 
                    chave="Cidade"
                    valor={(
                        <InputValor 
                            name="cidade" noStyle erro={erros.cidade}
                            handleSubmit={(valor) => this.handleSubmit("cidade", valor)}
                            value={cidade} />
                    )}
                    />
                <TextoDados 
                    chave="Estado"
                    valor={(
                        <InputValor 
                            name="estado" noStyle erro={erros.estado}
                            handleSubmit={(valor) => this.handleSubmit("estado", valor)}
                            value={estado} />
                    )}
                    />
                <TextoDados 
                    chave="CEP"
                    valor={(
                        <InputValor 
                            name="cep" noStyle erro={erros.cep}
                            handleSubmit={(valor) => this.handleSubmit("cep", valor)}
                            value={cep} />
                    )}
                    />
            </div>
        );
    }

    render(){
        return (
            <div className="DetalhesDoCliente">
                <Voltar history={this.props.history} />
                { this.renderCabecalho() }
                <AlertGeral aviso={this.state.aviso} />
                <div className="flex horizontal">
                    <div className="flex-1 flex vertical">
                        { this.renderDetalhesCadastro() }
                    </div>
                    <div className="flex-1 flex vertical">
                        { this.renderDetalhesEntrega() }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cliente: state.cliente.cliente,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetalhesDoCliente);