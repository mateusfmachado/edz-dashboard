import React from 'react';
import Titulo from '../Texto/Titulo';
import { api } from '../../config';

class BlocoImagem extends React.Component {
    render(){
        const { handleSubmit, imagens, onRemove} = this.props
        return (
            <div className="Bloco-Imagem">
                <div className="flex horizontal">
                    <Titulo tipo="h3" titulo="Imagens" />
                </div>
                <div className="flex vertical">
                    <label><strong>Insira aqui uma nova imagem:&nbsp;</strong></label>
                    <input type="file" onChange={handleSubmit} />
                </div>
                <hr /><br />
                <div className="imagens-container">
                    {
                        imagens.map((src, idx) => (
                            <div 
                                className="imagem-container flex flex-center"
                                style={{ backgroundImage: `url("${api}/public/images/${src}")` }}
                                key={idx} >
                                <div className="imagem-remover flex flex-center" onClick={() => onRemove(idx)}>
                                    <span>{"-"}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default BlocoImagem;