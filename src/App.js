import React, {Component} from 'react';
import $ from 'jquery';
import Game from './component/game/game';

import './App.css';

const gameDifficulty = {
    0: {
        time: 80,
        cardRow: 4
    },
    1: {
        time: 90,
        cardRow: 6
    },
    2: {
        time: 60,
        cardRow: 6
    }
};

class App extends Component {

    state = {
        gameStart: false,
        gameLevel: null
    };

    componentDidMount() {
        $('#gameSetupModal').modal({backdrop: 'static', keyboard: false}, 'show');
    }

    resetGame = () => {
        this.setState({
            gameStart: false
        });

        $('#gameSetupModal').modal('show');
    };

    startGame = () => {
        this.setState({
            gameStart: true,
            gameLevel: gameDifficulty[document.getElementById('gameMode').value]
        });
    };

    render() {
        return (
            <React.Fragment>

                {this.state.gameStart ? (<Game resetGame={this.resetGame} gameLevel={this.state.gameLevel}/>) : ''}

                <div className="modal fade" id="gameSetupModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">
                                    Welcome to Memory Game!
                                </div>
                            </div>
                            <div className="modal-body">

                                <div className='row'>
                                    <div className="form-group col-12">
                                        <label>Please select difficulty</label>
                                        <select className="form-control" id="gameMode">
                                            <option value='0' defaultValue>Piece of Cake</option>
                                            <option value='1'>Think Twice</option>
                                            <option value='2'>You Shall Regret</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.startGame}>Start Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default App;
