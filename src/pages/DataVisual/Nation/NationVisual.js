import React, {Component} from 'react'
import {Row, Col, Layout, Tabs} from 'antd'
import NationDangerVisual from './NationDangerVisual'
import NationEnterpriseVisual from './NationEnterpriseVisual'
import NationGovVisual from './NationGovVisual'
import NationServiceVisual from './NationServiceVisual'

const {TabPane} = Tabs
//国家
export default class NationVisual extends Component {
    state = {
        type: '政府监管部门'
    }

    componentWillMount() {
    }

    onClick = type => {
        this.setState({type})
    }

    displayVisual = type => {
        if ('风险预警' === type) {
            return <NationDangerVisual></NationDangerVisual>
        } else if ('企业' === type) {
            return <NationEnterpriseVisual></NationEnterpriseVisual>
        } else if ('政府监管部门' === type) {
            return <NationGovVisual></NationGovVisual>
        } else if ('技术服务机构' === type) {
            return <NationServiceVisual></NationServiceVisual>
        }

    }

    render() {
        return <div>
            <Layout.Header style={{background: '#fff', padding: 0, marginBottom: 10, height: 70}}>
                <span style={{paddingRight: 70, float: "left", marginLeft: 18}}>职业病危害监测预警预控云服务平台</span>
                <a onClick={() => this.onClick('风险预警')} style={{}}>风险预警</a>
                <a onClick={() => this.onClick('企业')} style={{marginLeft: 20}}>企业</a>
                <a onClick={() => this.onClick('政府监管部门')} style={{marginLeft: 20}}>政府监管部门</a>
                <a onClick={() => this.onClick('技术服务机构')} style={{marginLeft: 20}}>技术服务机构</a>
            </Layout.Header>
            {
                this.displayVisual(this.state.type)
            }

        </div>
    }
}