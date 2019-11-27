import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, ConfigProvider} from 'antd'
import {Modal} from 'nowrapper/lib/antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import 'ant-design-pro/dist/ant-design-pro.css'
import {WaterWave} from 'ant-design-pro/lib/Charts'
import zhCh from 'antd/es/locale/zh_CN'
import styles from '../Other/style.less'
import _ from 'lodash'
import router from 'umi/router'

let switchFlag = 'no'
let areaQuery = {}

export default class EnterpriseDangerVisual extends Component {
    state = {
        option2Data: [],
        option3Data: [],
        option4Data: [],
        option5Data: [],
        option6Data: [],
    }


    componentWillMount() {
        console.log("OtherDangerVisual3 componentWillMount")
        this.init()
    }

    init = () => {
        //行政区域
        this.area()
        //行政区域的参数
        let params = {
            params: areaQuery
        }
        //scroll
        request('/zyb/enterpriseDangerVisual/' + switchFlag + '/scroll', params).then(res => {
            if (res && res.flag) {
                this.setState({scrollData: res.data})
            }
        })
        //option2
        request('/zyb/enterpriseDangerVisual/' + switchFlag + '/option2', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        request('/zyb/enterpriseDangerVisual/' + switchFlag + '/option2Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Detail: res.data})
            }
        })

        //随机数
        this.setState({random: Math.round(Math.random() * 80)})
    }

    area = () => {
        areaQuery = this.props.areaQuery
    }


    detailData = (type) => {
        let dataSource = []
        let columns = []
        let title = ''
        let width = '70vw'
        let pagination = true
        if ("zero" === type) {
            pagination=false
            title = '监督检查频次'
            dataSource = this.state.scrollData
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'areaName',
                    key: 'areaName',
                },
                {
                    title: '职业病危害风险等级',
                    dataIndex: 'level',
                    key: 'level',
                },
                {
                    title: '监督检查频次',
                    dataIndex: 'count',
                    key: 'count',
                    sorter: (a, b) => a.count - b.count
                }
            ]
        } else if ("option2" === type) {
            title = '企业风险数量'
            dataSource = this.state.option2Detail
            columns = [
                {
                    title: '年份',
                    dataIndex: 'year',
                    key: 'year',
                    sorter: (a, b) => a.year - b.year
                },
                {
                    title: '职业病危害风险I级企业数量',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '职业病危害风险II级企业数量',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业病危害风险III级企业数量',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                }
            ]
            pagination = false
        } else if ("option4" === type) {
            let tabKey = this.state.tabKey
            if ("industryOfEnterprise" === tabKey) {
                title = '企业的职业病危害风险分布情况'
                dataSource = this.state.option4Detail
                columns = [
                    {
                        title: '所属行业',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '暂无风险企业数量',
                        dataIndex: 'var1',
                        key: 'var1',
                        sorter: (a, b) => a.var1 - b.var1
                    },
                    {
                        title: '风险I级企业数量',
                        dataIndex: 'var2',
                        key: 'var2',
                        sorter: (a, b) => a.var2 - b.var2
                    },
                    {
                        title: '风险II级企业数量',
                        dataIndex: 'var3',
                        key: 'var3',
                        sorter: (a, b) => a.var3 - b.var3
                    },
                    {
                        title: '风险III级企业数量',
                        dataIndex: 'var4',
                        key: 'var4',
                        sorter: (a, b) => a.var4 - b.var4
                    }
                ]
            } else if ("areaOfEnterprise" === tabKey) {
                title = '企业的职业病危害风险分布情况'
                dataSource = this.state.option3Detail
                columns = [
                    {
                        title: '行政区划',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '暂无风险企业数量',
                        dataIndex: 'var1',
                        key: 'var1',
                        sorter: (a, b) => a.var1 - b.var1
                    },
                    {
                        title: '风险I级企业数量',
                        dataIndex: 'var2',
                        key: 'var2',
                        sorter: (a, b) => a.var2 - b.var2
                    },
                    {
                        title: '风险II级企业数量',
                        dataIndex: 'var3',
                        key: 'var3',
                        sorter: (a, b) => a.var3 - b.var3
                    },
                    {
                        title: '风险III级企业数量',
                        dataIndex: 'var4',
                        key: 'var4',
                        sorter: (a, b) => a.var4 - b.var4
                    }
                ]
            } else if ("registerTypeOfEnterprise" === tabKey) {
                title = '企业的职业病危害风险分布情况'
                dataSource = this.state.option5Detail
                columns = [
                    {
                        title: '登记注册类型',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '暂无风险企业数量',
                        dataIndex: 'var1',
                        key: 'var1',
                        sorter: (a, b) => a.var1 - b.var1
                    },
                    {
                        title: '风险I级企业数量',
                        dataIndex: 'var2',
                        key: 'var2',
                        sorter: (a, b) => a.var2 - b.var2
                    },
                    {
                        title: '风险II级企业数量',
                        dataIndex: 'var3',
                        key: 'var3',
                        sorter: (a, b) => a.var3 - b.var3
                    },
                    {
                        title: '风险III级企业数量',
                        dataIndex: 'var4',
                        key: 'var4',
                        sorter: (a, b) => a.var4 - b.var4
                    }
                ]
            } else if ("areaOfArea" === tabKey) {
                title = '区域的职业病危害风险分布情况'
                dataSource = this.state.option6Detail
                columns = [
                    {
                        title: '行政区划',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '暂无风险企业数量',
                        dataIndex: 'var1',
                        key: 'var1',
                        sorter: (a, b) => a.var1 - b.var1
                    },
                    {
                        title: '风险I级企业数量',
                        dataIndex: 'var2',
                        key: 'var2',
                        sorter: (a, b) => a.var2 - b.var2
                    },
                    {
                        title: '风险II级企业数量',
                        dataIndex: 'var3',
                        key: 'var3',
                        sorter: (a, b) => a.var3 - b.var3
                    },
                    {
                        title: '风险III级企业数量',
                        dataIndex: 'var4',
                        key: 'var4',
                        sorter: (a, b) => a.var4 - b.var4
                    }
                ]
            }
        }
        Modal.info({
            title: title,
            okText: '关闭',
            content: <ConfigProvider locale={zhCh}><Table pagination={pagination} columns={columns}
                                                          dataSource={dataSource} bordered={false}
                                                          size={'middle'}/></ConfigProvider>,
            width: width
        })
    }

    render() {
        let onEvents = {
            'click': (params) => {
                console.log(params);
            }
        }
        let option2 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['暂无风险', '低度风险(Ⅰ级)', '中度风险(Ⅱ级)', '高度风险(Ⅲ级)'],
                textStyle: {
                    // color:'#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: this.state.option2Data.yearList
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data.zero
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data.one
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data.two
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data.three
                }
            ]
        }
        const columns = [
            {
                title: '名称',
                dataIndex: 'areaName',
                render: text => <a>{text}</a>,
            },
            {
                title: '风险等级',
                dataIndex: 'level',
            },
            {
                title: '监督检查',
                dataIndex: 'count',
            }
        ]

        return <div style={{marginTop:20}}>
            <ConfigProvider locale={zhCh}>
                <Row gutter={8}>
                    <Col span={6}>
                        {/*表2-40 企业职业病危害风险分级及管控措施*/}
                        <Card
                            title={'风险提示、监督检查频次'}
                            bodyStyle={{textAlign: 'center', fontSize: 0}}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('zero')}>详细数据</Button>}
                        >
                            <div style={{height: 300, paddingTop: 50}}>
                                <WaterWave height={200} title="高度风险(Ⅳ级)" percent={this.state.random}
                                           color={'rgb(240, 72, 100)'}/></div>
                        </Card>
                    </Col>
                    <Col span={18}>
                        {/*表2-44 企业职业病危害风险分布情况*/}
                        <Card
                            title={'企业风险数量'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option2')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option2}
                                onEvents={onEvents} style={{height: 300}}/>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }
}