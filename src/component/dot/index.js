import React from 'react';
import PropTypes from 'prop-types'

const style = {
    width: '10px',
    height: '10px',
    display: 'inline-block',
    backgroundColor: '#000',
    borderRadius: '50%',
    marginRight: '8px'
}

export default class Dot extends React.Component {
    render() {
        const { className, color } = this.props
        const newStyle = {
            ...style,
            backgroundColor: color
        }
        return (
            <span className={`dot ${className}`} style={newStyle}></span>
        )
    }
}

Dot.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string
}