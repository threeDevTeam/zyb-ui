import React, {Component} from 'react'
import {Row, Col} from 'antd'
import NationDangerVisual from './NationDangerVisual'
import NationEnterpriseVisual from './NationEnterpriseVisual'
import NationGovVisual from './NationGovVisual'
import NationServiceVisual from './NationServiceVisual'
//国家
export default class NationVisual extends Component {
    state = {}

    componentWillMount() {

    }

    render() {
        return <div>
            <NationDangerVisual></NationDangerVisual>
            <br/> <br/><br/> <br/>
            <NationEnterpriseVisual></NationEnterpriseVisual>
            <br/> <br/><br/> <br/>
            <NationGovVisual></NationGovVisual>
            <br/> <br/><br/> <br/>
            <NationServiceVisual></NationServiceVisual>
        </div>
    }
}