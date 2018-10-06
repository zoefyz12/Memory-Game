import React, {Component} from 'react';
import Card from '../card/card';

import './game.scss';

class Game extends Component {

    // state = {
    //     cardGrid: null,
    //     timeLimit: 0
    // };

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

    render() {

        console.log(this.state.cardGrid)
        return (
            <div className='game-container'>
                {/*<button onClick={this.resetGame}>Reset</button>*/}

                <div className='game-content'>

                    <div className='info-section'>

                    </div>

                    <div className='game-section'>

                        <div className='row'>
                            {
                                this.state.cardGrid.map((val, index) => {
                                    return val.map((val, index) => {
                                        return (
                                            <div className={'col-' + (12 / this.state.cardGrid.length).toString()}>
                                                <Card/>
                                            </div>
                                        )
                                    });
                                })
                            }
                        </div>

                    </div>

                </div>
            </div>
        );

    }
}

export default Game;