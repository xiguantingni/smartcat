/**
 * Created by RCC on 2018/11/5.
 */

import React from 'react';
import { Button } from 'antd';
import { downloadFile } from '@util';
import './index.less';

class DeploySuccess extends React.Component {

    render() {
        return (
            <div className="deploy-success-container">
                <div className="deploy-success-body">
                    <div className="deploy-success-content">
                        <div className="deploy-success-icon"></div>
                        <div className="text-1">CloudUltra部署成功！</div>
                        <Button type="primary" className="button-1">
                            <a href="http://172.16.179.161/" target="_blank">管理云平台</a>
                        </Button>
                        <div className="button-list">
                            <div className="text-2">
                                <a href="http://172.16.29.121:51380" target="_blank">配置管理中心</a>
                            </div>
                            <div className="divider-1"></div>
                            <div className="text-2">
                                <a href="https://docs.openstack.org/install-guide/overview.html" target="_blank">帮助手册</a>
                            </div>
                            <div className="divider-1"></div>
                            <div className="text-2" onClick={downloadFile.bind(this, '/deployapi/deploy/download_deploy_log/')}>导出日志</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default DeploySuccess;
