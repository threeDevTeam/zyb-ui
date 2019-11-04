import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import themes from './theme'

let switchFlag = "no"
//技术服务机构
export default class NationServiceVisual extends Component {
    state = {
        display1: 'block',
        display2: 'none',
        year: '2019',
        type: '行政区划',
    }
    data1 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type}
        }
    }

    data2 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type}
        }
    }

    componentWillMount() {
        this.data1()
    }

    yearOnChange = year => {
        this.setState({year})
        //
        let type = this.state.type
        if ("行政区划" === type) {
            this.data1(year, type)
        } else if ("登记注册类型" === type) {
            this.data2(year, type)
        }
    }

    typeOnChange = obj => {
        let type = obj.target.value
        this.setState({type})
        //
        let year = this.state.year
        if ("行政区划" === type) {
            let option11Category = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
            let option12Category = ['香港', '新疆', '宁夏', '青海', '甘肃', '陕西', '西藏', '云南', '贵州', '四川', '重庆', '海南', '广西', '广东', '湖南', '湖北', '河南', '山东', '江西', '福建', '安徽', '浙江', '江苏', '上海', '黑龙江', '吉林', '辽宁', '内蒙古', '山西', '河北', '天津', '北京']
            this.setState({option11Category, option12Category})
            this.data1(year, type)
            this.setState({
                display1: 'block',
                display2: 'none',
            })
        } else if ("登记注册类型" === type) {
            let option21Category = ['国有企业', '集体企业', '股份合作企业', '联营企业', '联营企业', '联营企业', '联营企业', '联营企业', '有限责任公司', '有限责任公司', '有限责任公司', '股份有限公司', '私营企业', '私营企业', '私营企业', '私营企业', '私营企业', '其他企业', '合资经营企业（港或澳、台资）', '合作经营企业（港或澳、台资）', '港、澳、台商独资经营企业', '港、澳、台商投资股份有限公司', '其他港、澳、台商投资企业', '中外合资经营企业', '中外合作经营企业', '外资企业', '外商投资股份有限公司', '其他外商投资企业', '事业单位', '社会团体']
            let option22Category = ['社会团体', '事业单位', '其他外商投资企业', '外商投资股份有限公司', '外资企业', '中外合作经营企业', '中外合资经营企业', '其他港、澳、台商投资企业', '港、澳、台商投资股份有限公司', '港、澳、台商独资经营企业', '合作经营企业（港或澳、台资）', '合资经营企业（港或澳、台资）', '其他企业', '私营企业', '私营企业', '私营企业', '私营企业', '私营企业', '股份有限公司', '有限责任公司', '有限责任公司', '有限责任公司', '联营企业', '联营企业', '联营企业', '联营企业', '联营企业', '股份合作企业', '集体企业', '国有企业']
            this.setState({option21Category, option22Category})
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'block'
            })
        }
    }

    render() {
        let onEvents = {
            'click': (params) => {
                alert(params.name)
            }
        }

        return <div>
            <Row gutter={24}>
                <Col span={24}>
                    <div style={{background: '#fff', height: 60}}>
                        <Select onChange={this.yearOnChange} defaultValue={this.state.year} size={'large'}
                                style={{width: 120, marginLeft: 18, marginTop: 8, marginRight: 10}}>
                            <Select.Option value="2019">2019</Select.Option>
                            <Select.Option value="2018">2018</Select.Option>
                            <Select.Option value="2017">2017</Select.Option>
                        </Select>
                        <Radio.Group onChange={this.typeOnChange} defaultValue={this.state.type} size={'large'}>
                            <Radio.Button value="危害因素">危害因素</Radio.Button>
                            <Radio.Button value="行政区划">行政区划</Radio.Button>
                            <Radio.Button value="登记注册类型">登记注册类型</Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>
            {/*行政区划*/}
            <div style={{display: this.state.display1}}>
                <Row gutter={24} style={{marginTop: 10}}>

                </Row>
            </div>
            {/*登记注册类型*/}
            <div style={{display: this.state.display2}}>
                <Row gutter={24} style={{marginTop: 24}}>

                </Row>
            </div>
        </div>
    }


}