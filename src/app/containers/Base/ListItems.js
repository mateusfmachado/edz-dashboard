import React from 'react';
import { Link } from 'react-router-dom';

const items = [
    { rota: "/", icone: (<i className="fas fa-copy" />), titulo: "Pedidos" },
    { rota: "/clientes", icone: (<i className="fas fa-users" />), titulo: "Clientes" },
    { rota: "/categorias", icone: (<i className="fas fa-clone" />), titulo: "Categorias" },
    { rota: "/produtos", icone: (<i className="fas fa-boxes" />), titulo: "Produtos" },
    { rota: "/configuracoes", icone: (<i className="fas fa-cog" />), titulo: "Configurações" },
    { rota: "/perfil", icone: (<i className="fas fa-user" />), titulo: "Perfil" },
]

const ListItems = ({ open, history }) => {
    const localAtual = history.location.pathname;
    return (
        <div className="items-wrapper">
            {
                items.map((item, idx) => (
                    <Link to={item.rota} key={idx}>
                        <div className={`menu-item ${ localAtual === item.rota ? "menu-item-active" : "" } flex horizontal`}>
                            <div className="flex-1 flex flex-center">
                                { item.icone }
                            </div>
                            { 
                                open && 
                                (
                                    <div className="flex-2 flex flex-start">
                                        <span>{item.titulo}</span>
                                    </div>
                                )
                            }
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default ListItems;