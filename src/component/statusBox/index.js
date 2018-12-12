import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

const StatusBox = (props) => {
    const { text, color } = props
    return (
        <p className={`status-box`}>
            <span className={`status-dot ${color}`}></span>
            {text}
        </p>
    )
}

StatusBox.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default StatusBox