/**
 * Created by RCC on 2018/12/20.
 * 源码地址：https://github.com/video-react/video-react/blob/master/src/components/Player.js
 */

import React from 'react';
import { Button } from 'antd';
import { dispatch } from '@util/dispatch';
import { connect } from 'react-redux';
import { Player } from 'video-react';
import "@src/../node_modules/video-react/dist/video-react.css"; // react-player默认样式
import './index.less';

class FilmPlay extends React.Component {

    componentDidMount() {
        // 此处发起请求
    }

    render() {
        return (
            <div className="film-play-container">
                <Player
                    playsInline
                    position="center"
                    //poster="/assets/poster.png"
                    src="http://localhost:8081/film/trailer.mp4"
                />
            </div>
        );
    }

}

export default FilmPlay;
