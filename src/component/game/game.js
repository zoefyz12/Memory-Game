import React, {Component} from 'react';
import Card from '../card/card';
import ReactCountdownClock from 'react-countdown-clock';

import './game.scss';
import $ from "jquery";

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
                    flip: false,
                    serialNum: iconLayout.pop(),
                    index: {
                        row: i,
                        col: j
                    }
                });
            }

            cardGrid.push(rowGrid);
        }

        this.state = {
            cardGrid: cardGrid,
            timeLimit: props.gameLevel.time,
            cardFlip: [],
            matchedNum: 0,
            win: false
        };
    }

    resetGame = () => {
        this.props.resetGame();
    };

    timeFinished = () => {
        $('#gameOverModal').modal({backdrop: 'static', keyboard: false}, 'show');
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

    cardClicked = (index) => {
        let cardGrid = [...this.state.cardGrid];
        let card = cardGrid[index.row][index.col];

        if (!card.flip) {
            card.flip = true;

            this.setState({
                cardGrid: cardGrid
            });

            setTimeout(() => {
                let cardFlip = [...this.state.cardFlip];
                let matchedNum = this.state.matchedNum;

                if (this.state.cardFlip.length === 0) {
                    cardFlip.push(card);
                } else {
                    if (card.serialNum !== cardFlip[0].serialNum) {
                        let firstCard = cardGrid[cardFlip[0].index.row][cardFlip[0].index.col];
                        firstCard.flip = false;
                        card.flip = false;
                    } else {
                        matchedNum += 2;
                        this.checkGameWin(matchedNum);
                    }

                    cardFlip = [];
                }

                this.setState({
                    cardGrid: cardGrid,
                    cardFlip: cardFlip,
                    matchedNum: matchedNum
                });
            }, 500);
        }
    };

    checkGameWin = (matchedNum) => {
        if (matchedNum === Math.pow(this.state.cardGrid.length, 2)) {
            this.setState({
                win: true
            });

            $('#gameOverModal').modal({backdrop: 'static', keyboard: false}, 'show');
        }
    };

    render() {
        return (
            <React.Fragment>

                <div className='game-container'>

                    <div className='game-content'>

                        <div className='timer-section'>
                            <ReactCountdownClock seconds={this.state.timeLimit}
                                                 color="#42ebf4"
                                                 showMilliseconds={true}
                                                 size={100}
                                                 alpha={0.6}
                                                 paused={this.state.win}
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
                                                        <Card cardInfo={val} onClick={this.cardClicked}/>
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

                <div className="modal fade" id="gameOverModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">
                                    Thank you for playing!!
                                </div>
                            </div>
                            <div className="modal-body">
                                {this.state.win ? 'Woo!! I should make this game harder next time!!' : 'Sorry! Time is up! Try hard next time!!'}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.resetGame}>Start New Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}

export default Game;