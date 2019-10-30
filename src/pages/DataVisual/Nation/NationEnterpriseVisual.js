import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import themes from './theme'
//企业
export default class NationEnterpriseVisual extends Component {
    state = {
        display1: 'block',
        display2: 'none',
        display3: 'none',
        display4: 'none',
        display5: 'none',
        year: '2019',
        type: '危害因素'
    }
    data1 = () => {
    }
    data2 = () => {
    }
    data3 = () => {
    }
    data4 = () => {
    }
    data5 = () => {
    }

    componentWillMount() {
        this.data1()
    }

    yearOnChange = year => {
        this.setState({year})
        //
        let type = this.state.type
        if ("危害因素" === type) {
            this.data1()
        } else if ("行政区划" === type) {
            this.data2()
        } else if ("企业规模" === type) {
            this.data3()
        } else if ("登记注册类型" === type) {
            this.data4()
        } else if ("所属行业" === type) {
            this.data5()
        }
    }

    typeOnChange = obj => {
        let type = obj.target.value
        this.setState({type})
        //
        if ("危害因素" === type) {
            this.data1()
            this.setState({display1: 'block', display2: 'none', display3: 'none', display4: 'none', display5: 'none'})
        } else if ("行政区划" === type) {
            this.data2()
            this.setState({display1: 'none', display2: 'block', display3: 'none', display4: 'none', display5: 'none'})
        } else if ("企业规模" === type) {
            this.data3()
            this.setState({display1: 'none', display2: 'none', display3: 'block', display4: 'none', display5: 'none'})
        } else if ("登记注册类型" === type) {
            this.data4()
            this.setState({display1: 'none', display2: 'none', display3: 'none', display4: 'block', display5: 'none'})
        } else if ("所属行业" === type) {
            this.data5()
            this.setState({display1: 'none', display2: 'none', display3: 'none', display4: 'none', display5: 'block'})
        }
    }

    render() {
        let onEvents = {
            'click': (params) => {
                alert(params.name)
            }
        }
        //危害因素
        let option11 = {
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    {name: '接害率', max: 100},
                    {name: '接触粉尘危害率', max: 100},
                    {name: '接触化学因素率', max: 100},
                    {name: '接触物理因素危害率', max: 100},
                    {name: '接触放射性因素危害率', max: 100},
                    {name: '接触生物因素危害率', max: 100}
                ]
            },
            series: [{
                name: '危害',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: [90, 30, 50, 20, 30, 80],
                        name: '危害率'
                    }
                ]
            }]
        };
        let option12 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['检测率', '达标率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    // data: ['粉尘', '化学毒物', '物理因素', '放射性因素', '生物因素']
                    data: ['生物因素', '放射性因素', '物理因素', '化学因素', '粉尘']
                }
            ],
            series: [
                {
                    name: '检测率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: [100, 302, 341, 374, 390]
                },
                {
                    name: '达标率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data: [200, -132, -101, -134, -190]
                }
            ]
        };
        let option13 = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['防护配备', '职业病防护设施设置率', '个人防护用品配备率'],
                    ['粉尘', 43.3, 85.8],
                    ['化学因素', 83.1, 73.4],
                    ['物理因素', 86.4, 65.2],
                    ['放射性因素', 72.4, 53.9],
                    ['生物因素', 83.1, 73.4],
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: [
                {type: 'bar'},
                {type: 'line'}
            ]
        };
        let option14 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['体检率', '累计职业病患病率', '累计职业病病死率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '体检率',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '累计职业病患病率',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '累计职业病病死率',
                    type: 'line',
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        //行政区划
        //企业规模
        //登记注册类型
        //所属行业
        return <div>
            <Row gutter={16}>
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
                            <Radio.Button value="企业规模">企业规模</Radio.Button>
                            <Radio.Button value="登记注册类型">登记注册类型</Radio.Button>
                            <Radio.Button value="所属行业">所属行业</Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>
            <div style={{display: this.state.display1}}>
                <Row gutter={16} style={{marginTop: 5}}>
                    <Col span={12}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed">详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option11}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed">详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option12}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed">详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option13}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed">详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option14}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    }
}