/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

type props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

const BarraNavegacao: React.FC<props> = ({ tema, botoes, seletorView }) => {
    useEffect(() => {
        const initializeMaterialize = () => {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
            
            let dropdown = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(dropdown);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMaterialize);
        } else {
            initializeMaterialize();
        }

        return () => {
            document.removeEventListener('DOMContentLoaded', initializeMaterialize);
        };
    }, []);

    const getIconeMenu = (item: string) => {
        switch(item) {
            case 'Dashboard':
                return <i className="material-icons left">dashboard</i>;
            case 'Clientes':
                return <i className="material-icons left">people</i>;
            case 'Cadastrar Cliente':
                return <i className="material-icons left">person_add</i>;
            case 'Relatórios':
                return <i className="material-icons left">assessment</i>;
            case 'Configurações':
                return <i className="material-icons left">settings</i>;
            default:
                return <i className="material-icons left">navigate_next</i>;
        }
    };

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>
        } else {
            let lista = botoes.map(valor =>
                <li key={valor}>
                    <a onClick={(e) => seletorView(valor, e)}>
                        {getIconeMenu(valor)}
                        {valor}
                    </a>
                </li>
            )
            return lista
        }
    };
    let estilo = `${tema}`;
    
    return (
        <>
            <nav className={estilo}>
                <div className="nav-wrapper">
                    <a data-target="mobile-menu" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="left hide-on-med-and-down">
                        {gerarListaBotoes()}
                    </ul>
                    
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a className="dropdown-trigger" data-target="user-dropdown">
                                <i className="material-icons left">account_circle</i>
                                Usuário
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            {/* Dropdown do usuário */}
            <ul id="user-dropdown" className="dropdown-content">
                <li><a><i className="material-icons left">person</i>Perfil</a></li>
                <li><a><i className="material-icons left">settings</i>Configurações</a></li>
                <li className="divider"></li>
                <li><a><i className="material-icons left">exit_to_app</i>Sair</a></li>
            </ul>
            
            {/* Menu lateral mobile */}
            <ul className="sidenav" id="mobile-menu">
                <li>
                    <div className="user-view">
                        <div className="background purple lighten-2"></div>
                        <a><i className="material-icons circle">account_circle</i></a>
                        <a><span className="white-text name">Usuário Sistema</span></a>
                        <a><span className="white-text email">usuario@wb.com</span></a>
                    </div>
                </li>
                {gerarListaBotoes()}
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="#!"><i className="material-icons">exit_to_app</i>Sair</a></li>
            </ul>
        </>
    );
};

export default BarraNavegacao;