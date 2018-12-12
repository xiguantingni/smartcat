import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

class RButton extends React.Component {
    render() {
        const { icon, title, ...rest } = this.props
        const iconStyle = title ? { marginRight: '4px', fontSize: '12px' } : { fontSize: '14px' }
        const style = title ? {} : { paddingLeft: '8px', paddingRight: '8px' }
        return (
            <Button {...rest} style={style}>
                {icon ? <i className={`iconfont icon-${icon}`} style={iconStyle} /> : null}
                {title ? <span>{title}</span> : null}
            </Button>
        )
    }
}

RButton.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
}

export default RButton