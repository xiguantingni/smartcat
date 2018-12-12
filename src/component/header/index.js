import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'antd'
import './index.less'
import { Link } from 'react-router-dom'

const { Item } = Menu

const Logo = require('@image/logo.png')

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { currentNav } = this.props
        return (
            <header className='project-header-wrapper'>
                <div className='project-header'>
                    <a className='logo-wrapper'>
                        <img className='logo' src={Logo} />
                    </a>
                    <Menu
                        selectedKeys={[currentNav]}
                        mode='horizontal'
                    >
                        <Item key='dataCenter'>
                            <Link to='/dataCenter'>
                                <i className='iconfont icon-shujuzhongxin' />
                                <span>数据中心</span>
                            </Link>
                        </Item>
                        <Item key='system'>
                            <Link to='/system'>
                                <i className='iconfont icon-setting1' />
                                <span>系统设置</span>
                            </Link>
                        </Item>
                        <Item key='help'>
                            <a href='https://docs.openstack.org/install-guide/overview.html' target='_blank'>
                                <i className='iconfont icon-c_question-s' />
                                <span>帮助</span>
                            </a>
                        </Item>
                    </Menu>
                    <Button className='btn-logout' shape='circle' onClick={this.props.onLogout}>
                        <i className='iconfont icon-signout' />
                    </Button>
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentNav: PropTypes.string.isRequired
}