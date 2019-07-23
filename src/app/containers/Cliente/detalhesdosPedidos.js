import React,{ Component } from 'react';
import moment from 'moment';

import Titulo from '../../components/Texto/Titulo';
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';

import { connect } from 'react-redux';
import * as actions from '../../actions/clientes';
import { formatMoney } from '../../actions';

class DetalhesDosPedidos extends Component {

    state = {
        atual: 0,
        limit: 5
    }

    getPedidos(){
        const { atual, limit } = this.state;
        const { usuario, id } = this.props;

        if(!usuario || !id) return null;
        this.props.getClientePedidos(id, atual, limit, usuario.loja);
    }

    componentWillMount(){
        this.getPedidos();
    }
    componentWillUpdate(nextProps){
        if(!this.props.usuario && nextProps.usuario) this.getPedidos();
    }

    changeNumeroAtual = atual => this.setState({ atual }, () => this.getPedidos())

    render(){
        const { clientePedidos } = this.props;
        if(!clientePedidos) return (<div></div>);

        const dados = [];
        (clientePedidos ? clientePedidos.docs : []).forEach((item) => {
            dados.push({
                "ID": item._id, 
                "Valor Total": formatMoney(item.pagamento.valor),
                "Data": moment(item.createdAt).format("DD/MM/YYYY"), 
                "Situação": `${item.pagamento.status || "-"} / ${item.entrega.status || "-"}`,
                "botaoDetalhes": `/pedido/${item._id}`
            });
        });

        return (
            <div className="Detalhes-dos-Pedidos">
                <Titulo tipo="h3" titulo="Pedidos Feitos" />
                <br />
                <Tabela 
                    cabecalho={["ID", "Valor Total", "Data", "Situação"]}
                    dados={dados} />
                <Paginacao
                    atual={this.state.atual}
                    total={ this.props.clientePedidos ? this.props.clientePedidos.total : 0 }
                    limite={ this.state.limit }
                    onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    clientePedidos: state.cliente.clientePedidos
})

export default connect(mapStateToProps, actions)(DetalhesDosPedidos);