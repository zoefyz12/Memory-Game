import React, {Component} from 'react';
import Card from '../card/card';
import ReactCountdownClock from 'react-countdown-clock';

import './game.scss';

class Game extends Component {

    constructor(props) {
        super(props);
        let cardGrid = [];
        let iconLayout = [];
        // row col

        for (let i = 1; i <= Math.pow(props.gameLevel.cardRow, 2) / 2; i++) {
            iconLayout.push(i);
            iconLayout.push(i);
        }

        iconLayout = this.createRandomLayout(iconLayout);

        for (let i = 0; i < props.gameLevel.cardRow; i++) {
            let rowGrid = [];

            for (let j = 0; j < props.gameLevel.cardRow; j++) {
                rowGrid.push({
                    matched: false,
                    flip: false,
                    serialNum: iconLayout.pop()
                });
            }

            cardGrid.push(rowGrid);
        }

        this.state = {
            cardGrid: cardGrid,
            timeLimit: props.gameLevel.time,
            gameOver: false,
            win: false
        };
    }

    resetGame = () => {
        this.props.resetGame();
    };

    timeFinished = () => {

    };

    // refer to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    createRandomLayout = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    render() {
        return (
            <div className='game-container'>

                <div className='game-content'>

                    <div className='timer-section'>
                        <ReactCountdownClock seconds={this.state.timeLimit}
                                             color="#42ebf4"
                                             showMilliseconds={true}
                                             size={100}
                                             alpha={0.6}
                                             onComplete={this.timeFinished}/>
                    </div>

                    <div className='game-section'>

                        {
                            this.state.cardGrid.map((val, rowIndex) => {
                                return (
                                    <div className='row mb-3' key={'row' + rowIndex}>
                                        {val.map((val, colIndex) => {
                                            return (
                                                <div key={rowIndex + colIndex}
                                                     className={'col-' + (12 / this.state.cardGrid.length).toString()}>
                                                    <Card cardInfo={val}/>
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