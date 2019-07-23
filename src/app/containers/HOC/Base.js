import React from 'react';
import Base from '../Base';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const base = Component => {
    class ComponentBase extends React.Component {

        componentWillMount(){
            const { getUser, authorized, history, usuario } = this.props;
            getUser();
            if(!authorized || !usuario || !usuario.role.includes("admin")) history.replace("/login");
        }

        componentWillUpdate(nextProps){
            const { history } = this.props;
            if( !nextProps.authorized || !nextProps.usuario || !nextProps.usuario.role.includes("admin")){
                history.replace("/login");
            }  
        }

        render(){
            return (
                <Base history={this.props.history}>
                    <Component {...this.props} />
                </Base>
            )
        }
    }

    const mapStateToProps = state => ({
        authorized: state.auth.authorized,
        usuario: state.auth.usuario
    });
    return connect(mapStateToProps, actions)(ComponentBase);
}

export default base;