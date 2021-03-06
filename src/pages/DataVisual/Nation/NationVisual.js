import React, {Component} from 'react'
import {Row, Col, Layout, Tabs, Icon} from 'antd'
import NationDangerVisual from './NationDangerVisual'
import NationEnterpriseVisual from './NationEnterpriseVisual'
import NationGovVisual from './NationGovVisual'
import NationServiceVisual from './NationServiceVisual'
import styles from './style.less'
import logo from '../../../assets/logo.png'
import router from 'umi/router'

const {TabPane} = Tabs
//国家
export default class NationVisual extends Component {
    state = {
        type: '风险预警'
    }

    componentWillMount() {
    }

    onClick = type => {
        this.setState({type})
    }

    onChange = tabKey => {
        this.setState({type: tabKey})
    }

    displayVisual = type => {
        if ('风险预警' === type) {
            return <NationDangerVisual/>
        } else if ('企业信息' === type) {
            return <NationEnterpriseVisual/>
        } else if ('政府监管部门' === type) {
            return <NationGovVisual/>
        } else if ('技术服务机构' === type) {
            return <NationServiceVisual/>
        } else if ('进入后台' === type) {
            if (sessionStorage.getItem('loginName')) {
                router.push('/userManagement')
            } else {
                router.push('/user/login')
            }
        }
    }

    render() {
        return <div>
            <Layout.Header
                style={{background: '#fff', padding: 0, marginBottom: 10, height: 70, boxShadow: '0 0 12px #ccc'}}>
                <img src={logo} style={{float: 'left', paddingTop: 10, paddingLeft: 20}}/>
                <span style={{paddingRight: 70, float: "left", marginLeft: 10}}><h2
                    style={{color: '#1890FF', fontWeight: 'bold', letterSpacing: 8}}>职业病危害监测预警预控云服务平台</h2></span>
                <Tabs defaultActiveKey="风险预警" onChange={this.onChange}
                      style={{float: 'right', marginRight: 10, paddingTop: 18}}
                      className={styles.tabBorderBottom}>
                    <TabPane tab="风险预警" key="风险预警">
                    </TabPane>
                    <TabPane tab="企业信息" key="企业信息">
                    </TabPane>
                    <TabPane tab="政府监管部门" key="政府监管部门">
                    </TabPane>
                    <TabPane tab="技术服务机构" key="技术服务机构">
                    </TabPane>
                    <TabPane tab={
                        <span style={{paddingLeft:20}}><Icon type="home" theme="twoTone"/>进入后台</span>} key="进入后台">
                    </TabPane>
                </Tabs>
            </Layout.Header>
            {
                this.displayVisual(this.state.type)
            }

        </div>
    }
}