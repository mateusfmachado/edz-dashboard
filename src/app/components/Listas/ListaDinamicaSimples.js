import React from 'react';
import ButtonSimples from '../Button/Simples';
import InputSimples from '../Inputs/Simples';

class ListaDinamicaSimples extends React.Component {
    state = { texto: "" }

    onChangeInput = (ev) => this.setState({ texto: ev.target.value })

    onAdd(){
        const { texto } = this.state;
        this.props.onAdd(texto);
        this.setState({ texto: "" });
    }

    render(){
        const { dados, onRemove } = this.props;
        const { texto } = this.state;
        return (
            <div className="flex vertical">
                {
                    dados.map((item, idx) => (
                        <div key={idx} className="flex horizontal">
                            <div className="flex-3 flex flex-start border-green">
                                <span>{item}</span>
                            </div>
                            {
                                onRemove && 
                                (
                                    <div className="flex-1 flex flex-center">
                                        <ButtonSimples 
                                            type="danger" 
                                            onClick={() => onRemove(idx)} 
                                            label=" - " />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
                <div className="flex">
                    <div className="flex flex-start">
                        <InputSimples
                            type="text"
                            value={texto}
                            onChange={this.onChangeInput} />
                    </div>
                    <div className="flex flex-center">
                        <ButtonSimples 
                            type="success" 
                            onClick={() => this.onAdd(texto)} 
                            label=" + " />
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaDinamicaSimples;