import React, {Component} from 'react'
import {Row, Col} from 'antd'
import NationDangerVisual from './NationDangerVisual'
import NationEnterpriseVisual from './NationEnterpriseVisual'
import NationGovVisual from './NationGovVisual'
//国家
export default class NationVisual extends Component {
    state = {}

    componentWillMount() {
    }


    render() {
        return <div>
            <NationGovVisual></NationGovVisual>
        </div>
    }
}