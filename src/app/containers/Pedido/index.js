import React, { Component } from 'react';

import DetalhesDoPedido from './DetalhesDoPedido';
import DetalhesDaEntrega from './DetalhesDaEntrega';
import DetalhesDoPagamento from './DetalhesDoPagamento';

import Voltar from '../../components/Links/Voltar';
import { connect } from 'react-redux';
import * as actions from '../../actions/pedidos';

class Pedido extends Component {

    componentWillMount(){
        const { usuario } = this.props;
        const { id } = this.props.match.params;
        if(!usuario) return null;
        this.props.getPedido(id, usuario.loja);
    }

    componentWillUnmount(){
        this.props.limparPedido();
    }

    render(){
        return (
            <div className="Pedidos full-width flex vertical">
                <div className="Card">
                    <Voltar history={this.props.history} />
                    <DetalhesDoPedido />
                </div>
                <div className="flex horizontal">
                    <div className="Sub-Card flex-1 flex vertical">
                        <DetalhesDaEntrega />
                    </div>
                    <div className="Sub-Card flex-1 flex vertical">
                        <DetalhesDoPagamento />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Pedido);