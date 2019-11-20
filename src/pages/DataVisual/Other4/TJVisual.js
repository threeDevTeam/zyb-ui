import React, {Component} from 'react'
import {Button, Card, Col, ConfigProvider, Radio, Row, Select, Table} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import zhCh from 'antd/es/locale/zh_CN'
import {Modal} from "nowrapper/lib/antd";

let switchFlag = "no"
let currentYear = new Date().getFullYear()
let areaQuery = {}
//体检机构
export default class TJVisual extends Component {
    state = {
        year: currentYear,
        type: '危害因素',
        option11Data: [],
        option24Data: [],
        option25Data: [],
        option26Data: [],
    }
    data1 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type, ...areaQuery}
        }
        //option12
        request('/zyb/serviceVisual/' + switchFlag + '/option12', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option12Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Detail: res.data})
            }
        })
        //option25
        request('/zyb/serviceVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option25Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Detail: res.data})
            }
        })
    }


    componentWillMount() {
        //参数
        areaQuery = this.props.areaQuery
        this.data1()
    }

    yearOnChange = year => {
        this.setState({year})
        let type = this.state.type
        this.data1(year, type)
    }

    detailData = (type) => {
        let dataSource = this.state[type + 'Detail']
        let columns = []
        let title = ''
        let width = '90vw'
        let pagination = false
        if ('option12' === type) {
            title = '职业健康检查结果统计'
            columns = [
                {
                    title: '职业健康检查企业数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '体检报告数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '职业禁忌证人数',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '职业禁忌证检出率',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '疑似职业病人数',
                    dataIndex: 'var5',
                    key: 'var5'
                },
                {
                    title: '疑似职业病检出率',
                    dataIndex: 'var6',
                    key: 'var6'
                },
                {
                    title: '检出疑似职业病企业数',
                    dataIndex: 'var7',
                    key: 'var7'
                },
                {
                    title: '检出疑似职业病企业率',
                    dataIndex: 'var8',
                    key: 'var8'
                }]
        } else if ('option25' === type) {
            title = '职业健康检查机构统计'
            columns = [
                {
                    title: '职业健康检查机构数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '职业健康检查机构医护人员数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '职业健康检查机构取证人员数',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '平均取得职业健康检查项目数',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '完成职业健康检查报告数',
                    dataIndex: 'var5',
                    key: 'var5'
                },
                {
                    title: '体检人数',
                    dataIndex: 'var6',
                    key: 'var6'
                }
            ]
        }
        Modal.info({
            title: title,
            okText: '关闭',
            content: <Table pagination={pagination} columns={columns} dataSource={dataSource} bordered={false}
                            size={'middle'}/>,
            width: width
        })
    }

    render() {
        let onEvents = {
            'click': (params) => {
                console.log(params.name)
            }
        }

        let option12 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['职业禁忌证检出率', '疑似职业病检出率', '检出疑似职业病企业率']
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
                    name: '职业禁忌证检出率',
                    type: 'line',
                    data: this.state.option12Data && this.state.option12Data.list1
                },
                {
                    name: '疑似职业病检出率',
                    type: 'line',
                    data: this.state.option12Data && this.state.option12Data.list2
                },
                {
                    name: '检出疑似职业病企业率',
                    type: 'line',
                    data: this.state.option12Data && this.state.option12Data.list3
                }
            ]
        }

        let option25 = {
            color: ['#1890FF'],
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
                    {name: '职业健康检查机构数', max: 10000},
                    {name: '职业健康检查机构医护人员数', max: 10000},
                    {name: '职业健康检查机构取证人员数', max: 10000},
                    {name: '平均取得职业健康检查项目数', max: 10000},
                    {name: '完成职业健康检查报告数', max: 10000},
                    {name: '体检人数', max: 10000}
                ]
            },
            series: [{
                name: '合计',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: this.state.option25Data,
                        name: '合计'
                    }
                ]
            }]
        }

        let yearSelect = []
        for (let i = currentYear; i > (currentYear - 3); i--) {
            yearSelect.push(<Select.Option value={i}>{i}</Select.Option>);
        }


        return <div>
            <ConfigProvider locale={zhCh}>
                <Row gutter={8}>
                    <Col span={24}>
                        <div style={{background: '#fff', height: 60}}>
                            <Select onChange={this.yearOnChange} defaultValue={this.state.year} size={'large'}
                                    style={{width: 120, marginLeft: 18, marginTop: 8, marginRight: 10}}>
                                {yearSelect}
                            </Select>
                            <Radio.Group defaultValue={this.state.type} size={'large'}>
                                <Radio.Button value="危害因素">危害因素</Radio.Button>
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
                {/*危害因素*/}
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-职业健康检查结果统计分析表*/}
                        <Card
                            title={'职业健康检查结果统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option12')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option12}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表5-职业健康检查机构统计分析表*/}
                        <Card
                            title={'职业健康检查机构统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option25')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option25}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }


}