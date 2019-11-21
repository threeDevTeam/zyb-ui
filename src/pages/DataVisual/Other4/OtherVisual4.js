import React, {Component} from 'react'
import {Icon, Layout, Tabs} from 'antd'
import styles from './style.less'
import logo from '../../../assets/logo.png'
import router from "umi/router"
import JCVisual from './JCVisual'
import TJVisual from './TJVisual'
import ZDVisual from './ZDVisual'

const {TabPane} = Tabs
let areaQuery = {}
//国家
export default class OtherVisual4 extends Component {
    state = {
        type: '技术服务机构'
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
        if ('技术服务机构' === type) {
            let type = sessionStorage.getItem('type')
            if (type.match('检测机构')) {
                return <JCVisual areaQuery={areaQuery}/>
            } else if (type.match('体检机构')) {
                return <TJVisual areaQuery={areaQuery}/>
            } else if (type.match('诊断机构')) {
                return <ZDVisual areaQuery={areaQuery}/>
            }
        } else if ('进入后台' === type) {
            if (sessionStorage.getItem('loginName')) {
                let type = sessionStorage.getItem('type')
                if (type.match('检测机构')) {
                    router.push({pathname: '/jianceBasicOfService', query: areaQuery})
                } else if (type.match('体检机构')) {
                    router.push({pathname: '/tijianBasicOfService', query: areaQuery})
                } else if (type.match('诊断机构')) {
                    router.push({pathname: '/zhenduanBasicOfService', query: areaQuery})
                }
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
                <Tabs defaultActiveKey="技术服务机构" onChange={this.onChange}
                      style={{float: 'right', marginRight: 10, paddingTop: 18}}
                      className={styles.tabBorderBottom}>
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