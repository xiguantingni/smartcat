/**
 * Created by RCC on 2018/8/21.
 */

import React from 'react';

function Wave(props) {
    const { color, radius } = props;
    let _width = 4 * radius;
    let _height = 2.5 * radius;
    let d = `M 0 ${2.5 * radius}
    L 0 ${0.5 * radius}
    Q ${0.5 * radius} 0 ${radius} ${0.5 * radius}
    Q ${1.5 * radius} ${radius} ${2 * radius} ${0.5 * radius}
    Q ${2.5 * radius} 0 ${3* radius} ${0.5 * radius}
    Q ${3.5 * radius} ${radius} ${4 * radius} ${0.5 * radius}
    L ${4 * radius} ${2.5 * radius} Z`;


    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={_height} width={_width}>
            <path d={d} stroke={color} strokeWidth="1" fill={color} />
        </svg>
    );
}

export default Wave
