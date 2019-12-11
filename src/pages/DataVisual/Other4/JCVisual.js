import React, {Component} from 'react'
import {Button, Card, Col, ConfigProvider, Radio, Row, Select, Table} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import zhCh from 'antd/es/locale/zh_CN'
import {Modal} from "nowrapper/lib/antd";

let switchFlag = "no"
let currentYear = new Date().getFullYear()
let areaQuery = {}
//检测机构
export default class JCVisual extends Component {
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
        //option11
        request('/zyb/serviceVisual/' + switchFlag + '/option11', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option11Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Detail: res.data})
            }
        })
        //option24
        request('/zyb/serviceVisual/' + switchFlag + '/option24', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Data: res.data})
            }
        })
        request('/zyb/serviceVisual/' + switchFlag + '/option24Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Detail: res.data})
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
        if ('option11' === type) {
            title = '作业场所职业病危害因素检测情况'
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '检测点数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '达标点数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '达标率',
                    dataIndex: 'var3',
                    key: 'var3'
                }]
        } else if ('option24' === type) {
            title = '职业卫生技术服务机构统计'
            columns = [
                {
                    title: '职业卫生技术服务机构数',
                    dataIndex: 'var1',
                    key: 'var1'
                },
                {
                    title: '职业卫生技术服务专业技术人员数',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '经培训合格专业技术人员数',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '检测仪器设备台套数',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '平均取得计量认证项目数',
                    dataIndex: 'var5',
                    key: 'var5'
                },
                {
                    title: '职业病危害评价报告完成数',
                    dataIndex: 'var6',
                    key: 'var6'
                },
                {
                    title: '职业病危害检测报告完成数',
                    dataIndex: 'var7',
                    key: 'var7'
                },
                {
                    title: '检测点数',
                    dataIndex: 'var8',
                    key: 'var8'
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

        let option11 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)', '#BBBBBB', 'rgb(133, 67, 224)'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                data: ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '60%'],
                    data: this.state.option11Data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        let option24 = {
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
                    {name: '职业卫生技术服务机构数', max: 10000},
                    {name: '职业卫生技术服务专业技术人员数', max: 10000},
                    {name: '经培训合格专业技术人员数', max: 10000},
                    {name: '检测仪器设备台套数', max: 10000},
                    {name: '平均取得计量认证项目数', max: 10000},
                    {name: '职业病危害评价报告完成数', max: 10000},
                    {name: '职业病危害检测报告完成数', max: 10000},
                    {name: '检测点数', max: 10000}
                ]
            },
            series: [{
                name: '合计',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: this.state.option24Data,
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
                        {/*表1  作业场所职业病危害因素检测情况统计分析表*/}
                        <Card
                            title={'作业场所职业病危害因素检测情况'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option11')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option11}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表4-职业卫生技术服务机构统计分析表*/}
                        <Card
                            title={'职业卫生技术服务机构统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option24')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option24}
                                onEvents={onEvents} style={{height: '50vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }


}