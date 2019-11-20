import React, {Component} from 'react'
import {Row, Col, Layout, Tabs, Icon} from 'antd'
import OtherDangerVisual from './OtherDangerVisual'
import OtherDangerVisual2 from '../Other2/OtherDangerVisual2'
import OtherEnterpriseVisual from './OtherEnterpriseVisual'
import OtherEnterpriseVisual2 from '../Other2/OtherEnterpriseVisual2'
import OtherGovVisual from './OtherGovVisual'
import OtherGovVisual2 from '../Other2/OtherGovVisual2'
import OtherServiceVisual from './OtherServiceVisual'
import OtherServiceVisual2 from '../Other2/OtherServiceVisual2'
import styles from './style.less'
import logo from '../../../assets/logo.png'
import request from "../../../utils/request"
import router from "umi/router";

const {TabPane} = Tabs
let areaQuery = {}
//国家
export default class OtherVisual extends Component {
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
        //取出地址栏的行政区域信息
        areaQuery = this.props.location.query
        if ('风险预警' === type) {
            if (areaQuery['name3']) {
                return <OtherDangerVisual2 areaQuery={areaQuery}></OtherDangerVisual2>
            } else if ((areaQuery['name1'] === '北京' || areaQuery['name1'] === '上海' || areaQuery['name1'] === '重庆' || areaQuery['name1'] === '天津') && areaQuery['name2']) {
                return <OtherDangerVisual2 areaQuery={areaQuery}></OtherDangerVisual2>
            } else {
                return <OtherDangerVisual areaQuery={areaQuery}></OtherDangerVisual>
            }
        } else if ('企业信息' === type) {
            if (areaQuery['name3']) {
                return <OtherEnterpriseVisual2 areaQuery={areaQuery}></OtherEnterpriseVisual2>
            } else if ((areaQuery['name1'] === '北京' || areaQuery['name1'] === '上海' || areaQuery['name1'] === '重庆' || areaQuery['name1'] === '天津') && areaQuery['name2']) {
                return <OtherEnterpriseVisual2 areaQuery={areaQuery}></OtherEnterpriseVisual2>
            } else {
                return <OtherEnterpriseVisual areaQuery={areaQuery}></OtherEnterpriseVisual>
            }
        } else if ('政府监管部门' === type) {
            if (areaQuery['name3']) {
                return <OtherGovVisual2 areaQuery={areaQuery}></OtherGovVisual2>
            } else if ((areaQuery['name1'] === '北京' || areaQuery['name1'] === '上海' || areaQuery['name1'] === '重庆' || areaQuery['name1'] === '天津') && areaQuery['name2']) {
                return <OtherGovVisual2 areaQuery={areaQuery}></OtherGovVisual2>
            } else {
                return <OtherGovVisual areaQuery={areaQuery}></OtherGovVisual>
            }
        } else if ('技术服务机构' === type) {
            if (areaQuery['name3']) {
                return <OtherServiceVisual2 areaQuery={areaQuery}></OtherServiceVisual2>
            } else if ((areaQuery['name1'] === '北京' || areaQuery['name1'] === '上海' || areaQuery['name1'] === '重庆' || areaQuery['name1'] === '天津') && areaQuery['name2']) {
                return <OtherServiceVisual2 areaQuery={areaQuery}></OtherServiceVisual2>
            } else {
                return <OtherServiceVisual areaQuery={areaQuery}></OtherServiceVisual>
            }
        } else if ('进入后台' === type) {
            if(sessionStorage.getItem('loginName')){
                router.push({pathname: '/supervise', query: areaQuery})
            }else{
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
                      style={{float: 'right', marginRight: 60, paddingTop: 18}}
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
                        <span><Icon type="home" theme="filled"/>进入后台</span>} key="进入后台">
                    </TabPane>
                </Tabs>
            </Layout.Header>
            {
                this.displayVisual(this.state.type)
            }

        </div>
    }
}