import React, { Component } from 'react';
import Titulo from '../../../components/Texto/Titulo';
import ButtonSimples from '../../../components/Button/Simples';

import { TextoDados } from '../../../components/Texto/Dados';
import InputValor from '../../../components/Inputs/InputValor';
import InputSelect from '../../../components/Inputs/Select';
import BlocoImagens from '../../../components/Imagens/Bloco';
import AlertGeral from '../../../components/Alert/Geral';

import { connect } from 'react-redux';
import * as actions from '../../../actions/variacoes';

class OpcaoVariacao extends Component {
    
    generateStateVariacao = (props) => ({
        codigo: props.variacao ? props.variacao.codigo : "",
        nome: props.variacao ? props.variacao.nome : "",
        preco: props.variacao ? props.variacao.preco : 0,
        promocao: props.variacao ? props.variacao.promocao : 0,
        quantidade: props.variacao ? props.variacao.quantidade : 0,
        peso: props.variacao ? props.variacao.entrega.pesoKg : 0,
        freteGratis: props.variacao ? (props.variacao.entrega.freteGratis ? "sim" : "nao") : "",
        largura: props.variacao ? props.variacao.entrega.dimensoes.larguraCm : 0,
        altura: props.variacao ? props.variacao.entrega.dimensoes.alturaCm : 0,
        comprimento: props.variacao ? props.variacao.entrega.dimensoes.profundidadeCm : 0,
        fotos: props.variacao ? props.variacao.fotos : [],
    });

    constructor(props){
        super();
        this.state = {
            ...this.generateStateVariacao(props),
            aviso: null,
            erros: {}
        }
    }

    componentWillUpdate(nextProps){
        if(
            ( !this.props.variacao && nextProps.variacao ) ||
            ( this.props.variacao && nextProps.variacao &&
              this.props.variacao.updatedAt !== nextProps.variacao.updatedAt )
        ) this.setState(this.generateStateVariacao(nextProps));
    }

    componentWillUnmount(){
        this.props.limparVariacao();
    }

    onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

    validate(){
        const { codigo, nome, preco, quantidade, peso, largura, altura, comprimento } = this.state;
        const erros = {};

        if(!codigo) erros.codigo = "Preencha aqui com o código da variação";
        if(!nome) erros.nome = "Preencha aqui com o nome da variação";
        if(!preco) erros.preco = "Preencha aqui com o preço da variação";
        if(!quantidade) erros.quantidade = "Preencha aqui com a quantidade da variação";
        if(!peso) erros.peso = "Preencha aqui com o peso da variação";
        if(!largura) erros.largura = "Preencha aqui com a largura da variação";
        if(!altura) erros.altura = "Preencha aqui com o altura da variação";
        if(!comprimento) erros.comprimento = "Preencha aqui com o comprimento da variação";

        this.setState({ erros });
        return !( Object.keys(erros).length > 0 );  
    }

    updateVariacao(){
        const { usuario, produto, variacao } = this.props;
        if(!usuario || !produto || !variacao || !this.validate()) return null;
        this.props.updateVariacao(this.state, variacao._id, produto._id, usuario.loja, (error) => {
            this.setState({
                aviso: {
                    status: !error,
                    msg: error ? error.message : "Variação atualizada com sucesso"
                }
            });
            this.props.getVariacoes(produto._id, usuario.loja);
        });
    }

    removeVariacao(){
        const { usuario, produto, variacao } = this.props;
        if(!usuario || !produto || !variacao) return null;
        if(window.confirm("Deseja realmente deletar essa variação?")){
            this.props.removeVariacao(variacao._id, produto._id, usuario.loja, (error) => {
                this.setState({
                    aviso: {
                        status: !error,
                        msg: error ? error.message : "Variação removida com sucesso"
                    }
                });
                this.props.getVariacoes(produto._id, usuario.loja);
            });
        }
    }

    renderCabecalho(){
        const { nome } = this.state;
        return (
            <div className="flex horizontal">
                <div className="flex-1">
                    <Titulo tipo="h3" titulo={"Variação - " + nome} />
                </div>
                <div className="flex-1 flex flex-end">
                    <ButtonSimples
                        type="success" onClick={() => this.updateVariacao()}
                        label="Salvar" />
                    <ButtonSimples
                        type="danger" onClick={() => this.removeVariacao()}
                        label="Remover" />
                </div>
            </div>
        )
    }

    renderDadosCadastrais(){
        const { nome, codigo, preco, promocao, quantidade, erros } = this.state;
        return (
            <div className="Dados-Produto">
                <TextoDados
                    chave="Código"
                    valor={(
                        <InputValor
                            value={codigo} noStyle name="codigo" erro={erros.codigo}
                            handleSubmit={(valor) => this.onChangeInput( "codigo", valor )} />
                    )} />
                <TextoDados
                    chave="Nome"
                    valor={(
                        <InputValor
                            value={nome} noStyle name="nome" erro={erros.nome}
                            handleSubmit={(valor) => this.onChangeInput( "nome", valor )} />
                    )} />
                <TextoDados
                    chave="Preço Padrão"
                    valor={(
                        <InputValor
                            value={preco} noStyle name="preco" type="number" erro={erros.preco}
                            handleSubmit={(valor) => this.onChangeInput( "preco", Number(valor) )} />
                    )} />
                <TextoDados
                    chave="Preço Promocional"
                    valor={(
                        <InputValor
                            value={promocao} noStyle name="promocao" type="number" erro={erros.promocao}
                            handleSubmit={(valor) => this.onChangeInput( "promocao", Number(valor) )} />
                    )} />
                <TextoDados
                    chave="Quantidade"
                    valor={(
                        <InputValor
                            value={quantidade} noStyle name="quantidade" type="number" erro={erros.quantidade}
                            handleSubmit={(valor) => this.onChangeInput( "quantidade", valor )} />
                    )} />
            </div>
        )
    }

    renderDadosEnvio(){
        const { peso, freteGratis, largura, comprimento, altura, erros } = this.state;
        return (
            <div className="Dados-Envio">
                <TextoDados
                    chave="Peso (Kg)"
                    valor={(
                        <InputValor
                            value={peso} noStyle name="peso" erro={erros.peso} type="number"
                            handleSubmit={(valor) => this.onChangeInput( "peso", Number(valor) )} />
                    )} />
                <TextoDados
                    chave="Frete Grátis"
                    valor={(
                        <InputSelect
                            name="freteGratis"
                            onChange={(ev) => this.onChangeInput("freteGratis", ev.target.value)}
                            value={freteGratis}
                            opcoes={[
                                { label: "Sim", value: "sim" },
                                { label: "Não", value: "nao" },
                            ]} />
                    )} />
                <TextoDados
                    chave="Largura (cm)"
                    valor={(
                        <InputValor
                            value={largura} noStyle name="largura" type="number" erro={erros.largura}
                            handleSubmit={(valor) => this.onChangeInput( "largura", Number(valor) )} />
                    )} />
                <TextoDados
                    chave="Comprimento (cm)"
                    valor={(
                        <InputValor
                            value={comprimento} noStyle name="comprimento" type="number" erro={erros.comprimento}
                            handleSubmit={(valor) => this.onChangeInput( "comprimento", Number(valor) )} />
                    )} />
                <TextoDados
                    chave="Altura (cm)"
                    valor={(
                        <InputValor
                            value={altura} noStyle name="altura" type="number" erro={erros.altura}
                            handleSubmit={(valor) => this.onChangeInput( "altura", Number(valor) )} />
                    )} />
            </div>
        )
    }
    
    onRemove = (id) => {
        const { usuario, produto, variacao } = this.props;
        if(!usuario || !produto || !variacao) return null;

        const { fotos: _fotos } = this.state;
        const fotos = _fotos.filter((foto, index) => index !== id);

        if(window.confirm("Você deseja realmente remover esta imagem?")){
            this.props.removeVariacaoImagens(fotos, variacao._id, produto._id, usuario.loja, (error) => {
                this.setState({
                    aviso: {
                        status: !error,
                        msg: error ? error.message : "Foto da Variação removida com sucesso"
                    }
                })
            });
        }
    }

    handleUploadFoto = (ev) => {
        const { usuario, produto, variacao } = this.props;
        if(!usuario || !produto || !variacao) return null;

        const data = new FormData();
        data.append("files", ev.target.files[0]);

        this.props.updateVariacaoImagens(data, variacao._id, produto._id, usuario.loja, (error) => {
            this.setState({
                aviso: {
                    status: !error,
                    msg: error ? error.message : "Foto da Variação adicionada com sucesso"
                }
            })
        });
    }

    renderImagens(){
        const { fotos } = this.state;
        return (
            <div className="dados-de-imagens">
                <BlocoImagens
                    imagens={(fotos || [])}
                    handleSubmit={this.handleUploadFoto}
                    onRemove={this.onRemove} />
            </div>
        )
    }

    render(){
        return (
            <div className="Opcao-variacao">
                { this.renderCabecalho() }
                <AlertGeral aviso={this.state.aviso} />
                <br />
                <div className="flex horizontal">
                    <div className="flex-1">
                        { this.renderDadosCadastrais() }
                    </div>
                    <div className="flex-1">
                        { this.renderDadosEnvio() }
                    </div>
                    <div className="flex-1">
                        { this.renderImagens() }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    variacao: state.variacao.variacao,
    produto: state.produto.produto,
    usuario: state.auth.usuario
});

export default connect(mapStateToProps, actions)(OpcaoVariacao);