/**
 * Created by RCC on 2018/11/5.
 */

import React from 'react';
import { Button } from 'antd';
import { dispatch } from '@util/dispatch';
import { connect } from 'react-redux';
import { downloadFile } from '@util';
import './index.less';

class DeployFail extends React.Component {

    handleRetry() {
        dispatch({
            type: 'deployFail/retryDeploy',
            payload: {
                url: '/deploy/retryDeploy/',
                body: {
                    task_id: this.props.deployResult.task_id
                }
            }
        });
    }

    render() {
        const { isRetryDeploy } = this.props;
        return (
            <div className="deploy-fail-container">
                <div className="deploy-fail-body">
                    <div className="deploy-fail-content">
                        <div className="deploy-fail-icon"></div>
                        <div className="text-1">CloudUltra部署失败！</div>
                        <div className="text-2">请导出日志并联系交付人员</div>
                        <Button type="danger" className="button-1" onClick={downloadFile.bind(this, '/deployapi/deploy/download_deploy_log/')}>导出日志</Button>
                        <Button loading={isRetryDeploy} className="button-1" onClick={this.handleRetry.bind(this)}>重试</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(({ deployFail }) => ({ ...deployFail }))(DeployFail);
