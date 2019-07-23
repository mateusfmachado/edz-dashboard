import React, { Component } from 'react';

import Titulo from '../../components/Texto/Titulo';

import Input from '../../components/Inputs/Simples';
import Checkbox from '../../components/Inputs/Checkbox';

import Button from '../../components/Button/Simples';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { api, versao } from '../../config';

import Alert from '../../components/Alert/Danger';

class Login extends Component {

    state = {
        email: "",
        senha: "",
        opcaoLembrar: true,
        erros: {}
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
        this.validate();
    }
    onChangeCheckbox = (field) => this.setState({ [field]: !this.state[field] });

    handleLogin(){
        const { email, senha: password, opcaoLembrar } = this.state;
        if(!this.validate()) return;

        this.props.handleLogin({email, password, opcaoLembrar}, (error) => {
            this.setState({ erros: { ...this.state.erros, form: error } });
        })
    }

    validate(){
        const { email, senha } = this.state;
        const erros = {};

        if(!email) erros.email = "Preencha aqui com o seu e-mail";
        if(!senha) erros.senha = "Preencha aqui com a sua senha";

        this.setState({ erros });
        return !( Object.keys(erros).length > 0 );
    }

    render(){
        const { email, senha, opcaoLembrar, erros } = this.state;
        return (
            <div className="Login flex flex-center">
                <div className="Card">

                    <div className="flex vertical flex-center">
                        <Titulo tipo="h1" titulo="LOJA IT" />
                        <p>Faça seu login abaixo</p>
                    </div>

                    <br /><br />

                    <Alert error={erros.form} />

                    <Input
                        label="E-mail"
                        value={email}
                        type="email"
                        error={erros.email}
                        onChange={(ev) => this.onChangeInput("email", ev)} />

                    <Input
                        label="Senha"
                        value={senha}
                        error={erros.senha}
                        type="password"
                        onChange={(ev) => this.onChangeInput("senha", ev)} />

                    <div className="flex">
                        <div className="flex-1">
                            <Checkbox 
                                value={opcaoLembrar} 
                                onChange={() => this.onChangeCheckbox("opcaoLembrar")}
                                label="Lembrar?" />
                        </div>
                        <div className="flex-1 flex flex-end">
                            {/* <Link to="/recuperar-senha"><small>Esqueceu sua senha?</small></Link> */}
                            <a href={`${api}/${versao}/api/usuarios/recuperar-senha`}>
                                <small>
                                    Esqueceu sua senha?
                                </small>
                            </a>
                        </div>
                    </div>

                    <br /><br />

                    <div className="flex flex-center">
                        <Button type="success" label="ENTRAR" onClick={() => this.handleLogin()} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(Login);