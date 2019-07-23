import React, { Component } from 'react';

import Variacoes from './variacoes';
import OpcaoVariacao from './opcaoVariacao';
import NovaVariacao from './novaVariacao';

import { connect } from 'react-redux';

class DetalhesVariacoes extends Component {
    render(){
        return (
            <div className="Detalhes-variacoes flex">
                <div className="Sub-Card flex-1">
                    <Variacoes />
                </div>
                <div className="Sub-Card flex-8">
                    { !this.props.variacao ? <NovaVariacao /> : <OpcaoVariacao />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    variacao: state.variacao.variacao
});

export default connect(mapStateToProps)(DetalhesVariacoes);