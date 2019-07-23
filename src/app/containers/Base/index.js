import React from 'react';

import BarraTopo from './BarraTopo';
import Menu from './Menu';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Dashboard extends React.Component {
    render(){
        return (
            <div className="flex horizontal full-height">
                <div className="flex vertical">
                    <Menu history={this.props.history} />
                </div>
                <div className="flex vertical full-width">
                    <div className="flex horizontal">
                        <BarraTopo handleLogout={this.props.handleLogout} />
                    </div>
                    <main className="flex full-height">
                        { this.props.children }
                    </main>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(Dashboard);