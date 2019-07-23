import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { HashRouter as Router, Route } from 'react-router-dom';

import base from './containers/HOC/Base';
import noAuth from './containers/HOC/NoAuth';

import { initApp } from './actions';

// CONTAINER COM BASE
import Pedidos from './containers/Pedidos';
import Pedido from './containers/Pedido';

import Clientes from './containers/Clientes';
import Cliente from './containers/Cliente';

import Categorias from './containers/Categorias';
import NovaCategoria from './containers/Categorias/novaCategoria';
import Categoria from './containers/Categoria';

import Produtos from './containers/Produtos';
import NovoProduto from './containers/Produtos/novoProduto';
import Produto from './containers/Produto';

import Avaliacoes from './containers/Avaliacoes';
import Avaliacao from './containers/Avaliacao';

import Configuracoes from './containers/Configuracoes';
import Perfil from './containers/Perfil';

// CONTAINER SEM BASE
import Login from './containers/Login';
import RecuperarSenha from './containers/RecuperarSenha';
import ResetarSenha from './containers/RecuperarSenha/ResetarSenha';

class App extends Component {

  componentWillMount(){
    initApp();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path={"/"} exact component={base(Pedidos)} />
            <Route path={"/pedido/:id"} exact component={base(Pedido)} />

            <Route path={"/clientes"} exact component={base(Clientes)} />
            <Route path={"/cliente/:id"} exact component={base(Cliente)} />

            <Route path={"/categorias"} exact component={base(Categorias)} />
            <Route path={"/categorias/nova"} exact component={base(NovaCategoria)} />
            <Route path={"/categoria/:id"} exact component={base(Categoria)} />

            <Route path={"/produtos"} exact component={base(Produtos)} />
            <Route path={"/produtos/novo"} exact component={base(NovoProduto)} />
            <Route path={"/produto/:id"} exact component={base(Produto)} />

            <Route path={"/avaliacoes/:id"} exact component={base(Avaliacoes)} />
            <Route path={"/avaliacao/:id"} exact component={base(Avaliacao)} />

            <Route path={"/configuracoes"} exact component={base(Configuracoes)} />
            <Route path={"/perfil"} exact component={base(Perfil)} />

            <Route path={"/login"} exact component={noAuth(Login)} />
            <Route path={"/recuperar-senha"} exact component={noAuth(RecuperarSenha)} />
            <Route path={"/resetar-senha/:token"} exact component={noAuth(ResetarSenha)} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;