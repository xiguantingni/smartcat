
import React, { Fragment } from 'react';
import { Drawer, Select, Tabs, Input, Button, Row, Col, Divider, Checkbox } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dispatch } from '@util/dispatch';
import { regex } from '@util';
// import './index.less'

const options = [
    { label: '计算节点', value: 'computer_node' },
    { label: '存储节点', value: 'ceph_node' }
];

const { TabPane } = Tabs
const CheckboxGroup = Checkbox.Group

class NodeConfigDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.node2State(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentNode.id !== nextProps.currentNode.id) {
            this.setState(this.node2State(nextProps));
        }
    }

    node2State(props) {
        const { currentNode } = props;
        const { config_role: roleConfig, network_config, config_advance } = currentNode
        const roleValue = [];
        // 管理节点
        if (roleConfig.controller_node) {
            roleValue.push('controller_node');
        }
        // 网络节点
        if (roleConfig.network_node) {
            roleValue.push('network_node');
        }
        // 计算节点
        if (roleConfig.computer_node) {
            roleValue.push('computer_node');
        }
        // 存储节点
        if (roleConfig.ceph_node) {
            roleValue.push('ceph_node');
        }
        return {
            currentNodeRole: roleValue, // 节点角色
            networkConfig: network_config || {}, // 网络角色
            advanceConfig: config_advance || {} // 高级参数
        }
    }

    handleRoleConfigChange(checkedList) {
        this.setState({
            currentNodeRole: checkedList
        });
    }

    handleMyraChange(e) {
        this.setState({
            advanceConfig: {
                ...this.state.advanceConfig,
                myra_node: e.target.checked
            }
        });
    }

    handleHpcChange(e) {
        this.setState({
            advanceConfig: {
                ...this.state.advanceConfig,
                hpc_node: e.target.checked
            }
        });
    }

    handleRoleSelectChange(type, name, value) {
        const { currentNode } = this.props;
        let _config = this.state[type];
        let _currentConfig = {
            role: undefined,
            ip: ''
        };
        if (!value) {
            // 清除角色，则取用机器中的网口参数
            for (let i = 0; i < (currentNode.machine_info.net_info || []).length; i++) {
                let item = currentNode.machine_info.net_info[i];
                if (name === item.name) {
                    _currentConfig.role = undefined;
                    _currentConfig.ip = item.ip;
                    _currentConfig.cluster = false;
                    _currentConfig.VM = false;
                }
            }
        } else {
            _currentConfig = {
                ...(_config[name] || {}),
                role: value
            };
        }
        this.setState({
            [type]: {
                ..._config,
                [name]: _currentConfig
            }
        });
    }
    handleNetworkClusterChange(type, name, e) {
        let _config = this.state[type];
        this.setState({
            [type]: {
                ..._config,
                [name]: {
                    ...(_config[name] || {}),
                    cluster: e.target.checked
                }
            }
        }, () => {
            // 如果都是 cluster 和 vm 同为true
            _config = this.state[type];
            if (_config[name].cluster && _config[name].VM) {
                for (let key in _config) {
                    if (key !== name && _config[key].role === 'storage') {
                        // 清空其他角色为存储的网口
                        this.handleRoleSelectChange('networkConfig', key, '');
                    }
                }
            }
        });
    }
    handleNetworkVMChange(type, name, e) {
        let _config = this.state[type];
        this.setState({
            [type]: {
                ..._config,
                [name]: {
                    ...(_config[name] || {}),
                    VM: e.target.checked
                }
            }
        }, () => {
            // 如果都是 cluster 和 vm 同为true
            _config = this.state[type];
            if (_config[name].cluster && _config[name].VM) {
                for (let key in _config) {
                    if (key !== name && _config[key].role === 'storage') {
                        // 清空其他角色为存储的网口
                        this.handleRoleSelectChange('networkConfig', key, '');
                    }
                }
            }
        });
    }
    handleIPInputChange(type, name, e) {
        let _config = this.state[type];
        this.setState({
            [type]: {
                ..._config,
                [name]: {
                    ...(_config[name] || {}),
                    ip: e.target.value
                }
            }
        });
    }
    handleIpmiUsernameChange(e) {
        this.setState({
            advanceConfig: {
                ...this.state.advanceConfig,
                ipmi_user: e.target.value
            }
        })
    }
    handleIpmiPasswordChange(e) {
        this.setState({
            advanceConfig: {
                ...this.state.advanceConfig,
                ipmi_pass: e.target.value
            }
        })
    }

    // 点击保存按钮
    handleSaveConfig() {
        const { currentNodeRole, networkConfig, advanceConfig } = this.state;
        const { currentNode, onClose, saveCallback } = this.props;
        dispatch({
            type: 'deployStep/postNodeConfig',
            payload: {
                url: '/hosts/createHosts/',
                pageStatusCheck: true,
                body: {
                    ...currentNode,
                    // 角色设置
                    config_role: {
                        ...currentNode.config_role,
                        controller_node: currentNodeRole.indexOf('controller_node') >= 0,
                        network_node: currentNodeRole.indexOf('network_node') >= 0,
                        computer_node: currentNodeRole.indexOf('computer_node') >= 0,
                        ceph_node: currentNodeRole.indexOf('ceph_node') >= 0
                    },
                    network_config: networkConfig, // network driver配置
                    config_advance: advanceConfig, // 高级参数
                    config_status: '1' // 改成已配置
                },
                successCallback: (res) => {
                    saveCallback(res.data)
                    onClose();
                }
            }
        });
    }

    // 保存逻辑
    // 黄显宗对此逻辑负责
    saveIsEnable() {
        const { networkConfig, currentNodeRole } = this.state;
        let _con = {
            manage: [],
            external: [],
            internal: [],
            internal_vm: [],
            storage: []
        };
        for (let key in networkConfig) {
            let item = networkConfig[key];
            if (item.role) {
                _con[item.role].push(item);
            }
        }
        // 角色至少有一个
        if (currentNodeRole.length <= 0) {
            return false;
        }
        if (_con.external.length === 1 && _con.internal.length === 1) {
            if (_con.storage.length === 1 || _con.storage.length === 2) {
                let _c = 0;
                let _v = 0;
                let _ipValid = true; // ip校验通过
                _con.storage.forEach(it => {
                    if (it.cluster) {
                        _c++;
                    }
                    if (it.VM) {
                        _v++;
                    }
                    if (!regex.isIP.test(it.ip)) {
                        _ipValid = false;
                    }
                });
                // cluster和vm必填，且只填一项
                if (_c === 1 && _v === 1 && _ipValid) {
                    return true;
                }
            }
        }
        return false;
    }

    // cluster network 复选框可用性检测
    clusterIsEnable() {
        const { networkConfig } = this.state;
        for (let key in networkConfig) {
            if (networkConfig[key].role === 'storage' && networkConfig[key].cluster) {
                return false;
            }
        }
        return true;
    }

    // vm network 复选框可用性检测
    vmIsEnable() {
        const { networkConfig } = this.state;
        for (let key in networkConfig) {
            if (networkConfig[key].role === 'storage' && networkConfig[key].VM) {
                return false;
            }
        }
        return true;
    }

    renderRoleSelect(item) {
        const { currentNode } = this.props;
        const { networkConfig } = this.state;
        let _isManage = item.ip === currentNode.ssh_ip;
        let _roleValue = undefined;
        if (_isManage) {
            _roleValue = 'manage';
        }
        let _configRole = (networkConfig[item.name] || {}).role;
        if (_configRole === 'external' || _configRole === 'internal' || _configRole === 'storage') {
            _roleValue = _configRole;
        }
        let _con = {
            manage: [],
            external: [],
            internal: [],
            internal_vm: [],
            storage: []
        };
        for (let key in networkConfig) {
            let _i = networkConfig[key];
            if (_i.role) {
                _con[_i.role].push(_i);
            }
        }
        return (
            <Select
                disabled={_isManage}
                allowClear
                placeholder="请选择"
                size="small"
                style={{ width: '100%' }}
                value={_roleValue}
                onChange={this.handleRoleSelectChange.bind(this, 'networkConfig', item.name)}
            >
                <Select.Option value="manage" disabled>管理</Select.Option>
                <Select.Option value="storage" disabled={_con.storage.length > 1}>存储</Select.Option>
                <Select.Option value="internal" disabled={_con.internal.length !== 0}>内部网络</Select.Option>
                <Select.Option value="external" disabled={_con.external.length !== 0}>外部网络</Select.Option>
            </Select>
        )
    }

    render() {
        const { onClose, visible, currentNode, isPostNodeConfig } = this.props
        const { currentNodeRole, networkConfig, advanceConfig } = this.state;
        if (!currentNode.machine_info) {
            return null
        }
        const { cpu_cores, cpu_nums, cpu_version, hostname, mem_total } = currentNode.machine_info
        const saveEnable = this.saveIsEnable();
        const clusterEnable = this.clusterIsEnable();
        const vmIsEnable = this.vmIsEnable();
        return (
            <Drawer
                className='node-config-container'
                visible={visible}
                onClose={onClose}
                title='配置节点'
                width={500}
                maskClosable
            >
                <Row className="node-attr-row" style={{ marginTop: -14 }}>
                    <Col span="6">节点主机名：</Col>
                    <Col span="18">{hostname}</Col>
                </Row>
                <Row className="node-attr-row">
                    <Col span="6" style={{ textAlign: 'left' }}>处理器：</Col>
                    <Col span="18">{cpu_version}</Col>
                </Row>
                <Row className="node-attr-row">
                    <Col span="6" style={{ textAlign: 'left' }}>物理核心数量：</Col>
                    <Col span="6">{cpu_cores} 核</Col>
                    <Col span="6" style={{ textAlign: 'left' }}>处理器数量：</Col>
                    <Col span="6">{cpu_nums} 核</Col>
                </Row>
                <Row className="node-attr-row" style={{ marginBottom: -14 }}>
                    <Col span="6" style={{ textAlign: 'left' }}>内存：</Col>
                    <Col span="18">{(parseInt(mem_total) / 1048576).toFixed(2)} GB</Col>
                </Row>
                <Divider dashed />
                <div className="select-role-text">选择节点角色</div>
                <CheckboxGroup
                    options={options}
                    value={currentNodeRole}
                    onChange={this.handleRoleConfigChange.bind(this)}
                />
                <Tabs type="card" style={{ margin: '20px 0' }}>
                    <TabPane tab="网口" key="net">
                        {
                            (currentNode.machine_info.net_info || []).map((item, index) => {
                                let _isManage = item.ip === currentNode.ssh_ip;
                                let _ipFromConfig = (networkConfig[item.name] || {}).ip || undefined;
                                let _ipFromMachine = item.ip;
                                let _subnetFromMachine = item.subnet_mask;
                                let _clusterIsChecked = !!(networkConfig[item.name] || {}).cluster;
                                let _vmIsChecked = !!(networkConfig[item.name] || {}).VM;
                                return (
                                    <div className="role-detail-row" key={item.name || index}>
                                        <Row>
                                            <Col span="16" className="role-detail-left">
                                                <div className="role-driver">{item.driver}</div>
                                                <div className="role-other-1">
                                                    <div>
                                                        <div className="role-other-value">接口 {item.name}</div>
                                                    </div>
                                                    <div>
                                                        <div className="role-other-value">速度 {item.speed}</div>
                                                    </div>
                                                    <div>
                                                        <div className="role-other-value">状态 {item.status}</div>
                                                    </div>
                                                </div>
                                                <div className="role-other-3">
                                                    <Row style={{ lineHeight: '28px' }}>
                                                        <Col span="4" offset="2">IP地址</Col>
                                                        <Col span="12">
                                                            <Input
                                                                disabled={(networkConfig[item.name] || {}).role !== 'storage'}
                                                                size="small"
                                                                placeholder="ip地址"
                                                                value={_isManage ? _ipFromMachine : _ipFromConfig || _ipFromMachine}
                                                                onChange={this.handleIPInputChange.bind(this, 'networkConfig', item.name)}
                                                            />
                                                        </Col>
                                                        <Col span="4">
                                                            <span>&nbsp;&nbsp;{'/ ' + _subnetFromMachine}</span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col span="8">
                                                <Row>
                                                    <Col span="9" className="role-other-text">角色</Col>
                                                    <Col span="15">{this.renderRoleSelect(item)}</Col>
                                                </Row>
                                                {
                                                    (networkConfig[item.name] || {}).role === 'storage' ? (
                                                        <Fragment>
                                                            <Checkbox
                                                                disabled={!(clusterEnable || _clusterIsChecked)}
                                                                style={{ margin: '8px 0 0 20px' }}
                                                                checked={_clusterIsChecked}
                                                                onChange={this.handleNetworkClusterChange.bind(this, 'networkConfig', item.name)}
                                                            >集群地址
                                                            </Checkbox>
                                                            <Checkbox
                                                                disabled={!(vmIsEnable || _vmIsChecked)}
                                                                style={{ margin: '0 0 0 20px' }}
                                                                checked={_vmIsChecked}
                                                                onChange={this.handleNetworkVMChange.bind(this, 'networkConfig', item.name)}
                                                            >存储地址
                                                            </Checkbox>
                                                        </Fragment>
                                                    ) : null
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </TabPane>
                    <TabPane tab="磁盘" key="disk">
                        {
                            (currentNode.machine_info.disk_info || []).map((item, index) => {
                                return (
                                    <div className="role-detail-row" style={{ height: 90 }} key={item.name || index}>
                                        <Row>
                                            <div className="role-driver">{item.driver}</div>
                                            <div className="role-other-1">
                                                <div>
                                                    <div>盘符</div>
                                                    <div className="role-other-value">{item.name}</div>
                                                </div>
                                                <div>
                                                    <div>容量</div>
                                                    <div className="role-other-value">{(parseInt(item.size) / 1073741824).toFixed(2)} GB</div>
                                                </div>
                                                <div>
                                                    <div>类型</div>
                                                    <div className="role-other-value">{item.type}</div>
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </TabPane>
                    <TabPane tab="高级参数" key="high">
                        {
                            currentNodeRole.indexOf('computer_node') >= 0 ? (
                                <Checkbox
                                    style={{ display: 'block', margin: '0 0 0 15px' }}
                                    checked={!!advanceConfig.hpc_node}
                                    onChange={this.handleHpcChange.bind(this)}
                                >
                                    高性能计算节点
                                </Checkbox>
                            ) : null
                        }
                        <div className="ipmi-config-text">IPMI配置</div>
                        <Row style={{ marginBottom: 5 }}>
                            <Col span="5" style={{ lineHeight: '24px', marginLeft: 15 }}>IPMI地址</Col>
                            <Col span="10">
                                <span>{currentNode.machine_info.ipmi_ip}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Col span="5" style={{ lineHeight: '24px', marginLeft: 15 }}>IPMI用户名</Col>
                            <Col span="10">
                                <Input
                                    size="small"
                                    placeholder="用户名"
                                    value={advanceConfig.ipmi_user || currentNode.machine_info.ipmi_user}
                                    onChange={this.handleIpmiUsernameChange.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="5" style={{ lineHeight: '24px', marginLeft: 15 }}>IPMI密码</Col>
                            <Col span="10">
                                <Input
                                    size="small"
                                    type="password"
                                    placeholder="密码"
                                    value={advanceConfig.ipmi_pass || currentNode.machine_info.ipmi_pass}
                                    onChange={this.handleIpmiPasswordChange.bind(this)}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
                <div className="button-list">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                    {
                        isPostNodeConfig ?
                            <Button disabled type="primary" loading>保存中</Button>
                            : <Button onClick={this.handleSaveConfig.bind(this)} disabled={!saveEnable} type="primary">保存</Button>
                    }
                </div>
            </Drawer>
        )
    }
}

NodeConfigDrawer.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentNode: PropTypes.object.isRequired,
    isPostNodeConfig: PropTypes.bool.isRequired,
    saveCallback: PropTypes.func.isRequired
}

export default connect(
    ({ deployStep }) => ({
        isPostNodeConfig: deployStep.isPostNodeConfig,
    })
)(NodeConfigDrawer)