import React from 'react';

import './card.scss';

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
        return null;
    });
    return images;
};

// refer https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
const images = importAll(require.context('./../../assist/img', false, /\.(png|jpe?g|svg)$/));

const card = ({cardInfo, onClick}) => {
    return (
        <div className='card-container' style={{'transform': cardInfo.flip ? 'rotateY(180deg)' : 'rotateY(0deg)'}}
             onClick={() => onClick(cardInfo.index)}>
            <img src={images[cardInfo.serialNum + '.svg']} alt='icon'/>
        </div>
    );
};

export default card;
