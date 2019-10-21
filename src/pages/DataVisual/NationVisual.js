import React, {Component} from 'react'
import {Row, Col} from 'antd'
import NationDangerVisual from "./NationDangerVisual"
//国家
export default class NationVisual extends Component {
    state = {}

    componentWillMount() {
    }

    render() {
        return <div>
            <NationDangerVisual></NationDangerVisual>
        </div>
    }
}