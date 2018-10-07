import React, {Component} from 'react';
import Card from '../card/card';
import ReactCountdownClock from 'react-countdown-clock';

import './game.scss';

class Game extends Component {

    constructor(props) {
        super(props);
        let cardGrid = [];
        // row col

        for (let i = 0; i < props.gameLevel.cardRow; i++) {
            let rowGrid = [];

            for (let j = 0; j < props.gameLevel.cardRow; j++) {
                rowGrid.push({
                    matched: false,
                    flip: false
                });
            }

            cardGrid.push(rowGrid);
        }

        this.state = {
            cardGrid: cardGrid,
            timeLimit: props.gameLevel.time
        };
    }

    resetGame = () => {
        this.props.resetGame();
    };

    timeFinished = () => {

    };

    render() {

        console.log(this.state.cardGrid)
        return (
            <div className='game-container'>

                <div className='game-content'>

                    <div className='timer-section'>
                        <ReactCountdownClock seconds={this.state.timeLimit}
                                             color="#42ebf4"
                                             showMilliseconds={true}
                                             size={100}
                                             alpha={0.6}
                                             onComplete={this.timeFinished} />
                    </div>

                    <div className='game-section'>

                        {
                            this.state.cardGrid.map((val, index) => {
                                return (
                                    <div className='row mb-3'>
                                        {val.map((val, index) => {
                                            return (
                                                <div className={'col-' + (12 / this.state.cardGrid.length).toString()}>
                                                    <Card/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className='btn-section'>
                        <button className='btn-primary btn btn-block' onClick={this.resetGame}>Reset Game</button>
                    </div>

                </div>
            </div>
        );

    }
}

export default Game;