import React, {Component} from 'react'
import {Button, Card, Col, ConfigProvider, Radio, Row, Select, Table} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import zhCh from 'antd/es/locale/zh_CN'
import {Modal} from "nowrapper/lib/antd";

let switchFlag = "no"
let currentYear = new Date().getFullYear()
let areaQuery = {}
//诊断机构
export default class ZDVisual extends Component {
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
        //option13
        request('/zyb/serviceVisual/' + switchFlag + '/option13', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option13Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Detail: res.data})
            }
        })
        //option26
        request('/zyb/serviceVisual/' + switchFlag + '/option26', params).then(res => {
            if (res && res.flag) {
                this.setState({option26Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option26Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option26Detail: res.data})
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
        if ('option13' === type) {
            title = '职业病诊断情况统计'
            columns = [
                {
                    title: '职业病诊断企业数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '诊断出职业病病人企业数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '职业病诊断人数',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '报告职业病人数',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '职业病诊断率',
                    dataIndex: 'var5',
                    key: 'var5'
                }]
        } else if ('option26' === type) {
            title = '职业病诊断机构统计'
            columns = [
                {
                    title: '职业病诊断机构数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '诊断医师数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '平均取得的诊断项目数',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '诊断人数',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '报告职业病病人数',
                    dataIndex: 'var5',
                    key: 'var5'
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

        let option13 = {
            color: ['#1890FF'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['职业病诊断率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '职业病诊断率',
                    type: 'bar',
                    data: this.state.option13Data && this.state.option13Data.list1
                }
            ]
        }

        let option26 = {
            color: ['#1890FF'],
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#1890FF',
                        // backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    {name: '职业病诊断机构数', max: 10000},
                    {name: '诊断医师数', max: 10000},
                    {name: '平均取得的诊断项目数', max: 10000},
                    {name: '诊断人数', max: 10000},
                    {name: '报告职业病病人数', max: 10000}
                ]
            },
            series: [{
                name: '合计',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: this.state.option26Data,
                        name: '合计'
                    }
                ]
            }]
        }

        let yearSelect = []
        for (let i = currentYear; i > (currentYear - 10); i--) {
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
                        {/*表3 职业病诊断情况统计分析表*/}
                        <Card
                            title={'职业病诊断情况统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option13')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option13}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表6-职业病诊断机构统计分析表*/}
                        <Card
                            title={'职业病诊断机构统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option26')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option26}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }


}