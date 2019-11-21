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

const {TabPane} = Tabs
let switchFlag = 'no'
let areaQuery = {}

export default class OtherDangerVisual2 extends Component {
    state = {
        option2Data: [],
        option3Data: [],
        option4Data: [],
        option5Data: [],
        option6Data: [],
        tabKey: 'industryOfEnterprise'
    }


    componentWillMount() {
        // console.log("OtherDangerVisual2 componentWillMount")
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
        request('/zyb/otherDangerVisual2/' + switchFlag + '/scroll', params).then(res => {
            if (res && res.flag) {
                this.setState({scrollData: res.data})
            }
        })
        //option2
        request('/zyb/otherDangerVisual/' + switchFlag + '/option2', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        request('/zyb/otherDangerVisual/' + switchFlag + '/option2Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Detail: res.data})
            }
        })
        //option4
        request('/zyb/otherDangerVisual/' + switchFlag + '/option4', params).then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data})
            }
        })
        request('/zyb/otherDangerVisual/' + switchFlag + '/option4Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option4Detail: res.data})
            }
        })

        //随机数
        this.setState({random: Math.round(Math.random() * 80)})
    }

    area = () => {
        areaQuery = this.props.areaQuery
    }

    onChange = tabKey => {
        this.setState({tabKey})
        //行政区域的参数
        let params = {
            params: areaQuery
        }
        if (tabKey === 'areaOfEnterprise') {
            //option3
            request('/zyb/otherDangerVisual/' + switchFlag + '/option3', params).then(res => {
                if (res && res.flag) {
                    this.setState({option3Data: res.data})
                }
            })
            request('/zyb/otherDangerVisual/' + switchFlag + '/option3Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option3Detail: res.data})
                }
            })
        } else if (tabKey === 'industryOfEnterprise') {
            //option4
            request('/zyb/otherDangerVisual/' + switchFlag + '/option4', params).then(res => {
                if (res && res.flag) {
                    this.setState({option4Data: res.data})
                }
            })
            request('/zyb/otherDangerVisual/' + switchFlag + '/option4Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option4Detail: res.data})
                }
            })
        } else if (tabKey === 'registerTypeOfEnterprise') {
            //option5
            request('/zyb/otherDangerVisual/' + switchFlag + '/option5', params).then(res => {
                if (res && res.flag) {
                    this.setState({option5Data: res.data})
                }
            })
            request('/zyb/otherDangerVisual/' + switchFlag + '/option5Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option5Detail: res.data})
                }
            })
        } else if (tabKey === 'areaOfArea') {
            //option6
            request('/zyb/otherDangerVisual/' + switchFlag + '/option6', params).then(res => {
                if (res && res.flag) {
                    this.setState({option6Data: res.data})
                }
            })
            request('/zyb/otherDangerVisual/' + switchFlag + '/option6Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option6Detail: res.data})
                }
            })
        }
    }

    detailData = (type) => {
        let dataSource = []
        let columns = []
        let title = ''
        let width = '70vw'
        let pagination = true
        if ("zero" === type) {
            pagination = false
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
        let onEvent = {
            'click': (params) => {
                // alert(params.name)
                if (areaQuery['name2']) {
                    areaQuery['name3'] = params.name
                } else {
                    areaQuery['name2'] = params.name
                    router.push({
                        pathname: '/visual/OtherVisual',
                        query: areaQuery
                    })
                }
                // console.log("otherDangerVisual2", areaQuery)
                this.init()
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
        //
        let option3 = {
            // color: ['#CCFFCC', 'blue', 'yellow', 'red'],
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['暂无风险', '低度风险(Ⅰ级)', '中度风险(Ⅱ级)', '高度风险(Ⅲ级)'],
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
                data: this.state.option3Data.flagList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'line',
                    data: this.state.option3Data.zero
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'line',
                    data: this.state.option3Data.one
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'line',
                    data: this.state.option3Data.two
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'line',
                    data: this.state.option3Data.three
                }
            ]
        }

        let option4 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['暂无风险', '低度风险(Ⅰ级)', '中度风险(Ⅱ级)', '高度风险(Ⅲ级)']
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
                    data: ['煤炭开采和洗选业', '石油和天然气开采业', '黑色金属矿采选业', '有色金属矿采选业', '非金属矿采选业', '开采辅助活动', '其他采矿业', '农副食品加工业', '食品制造业', '酒、饮料和精制茶制造业', '烟草制品业 ', '纺织业', '纺织服装、服饰业', '皮革、毛皮、羽毛及其制品和制鞋业', '木材加工和木、竹、藤、棕、草制品业', '家具制造业 ', '造纸和纸制品业 ', '印刷和记录媒介复制业', '文教、工美、体育和娱乐用品制造业', '石油加工、炼焦和核燃料加工业 ', '化学原料和化学制品制造业', '医药制造业 ', '化学纤维制造业', '橡胶和塑料制品业', '非金属矿物制品业', '黑色金属冶炼和压延加工业 ', '有色金属冶炼和压延加工业 ', '金属制品业 ', '通用设备制造业', '专用设备制造业 ', '汽车制造业', '铁路、船舶、航空航天和其他运输设备制造业', '电气机械和器材制造业 ', '计算机、通信和其他电子设备制造业', '仪器仪表制造业', '其他制造业', '废弃资源综合利用业', '金属制品、机械和设备修理业', '电力、热力生产和供应业', '燃气生产和供应业', '水的生产和供应业']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '暂无风险',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option4Data && this.state.option4Data.list1
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option4Data && this.state.option4Data.list2
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'bar',
                    stack: '因素2',
                    data: this.state.option4Data && this.state.option4Data.list3
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'bar',
                    stack: '因素2',
                    data: this.state.option4Data && this.state.option4Data.list4
                }
            ]
        }
        let option5 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['暂无风险', '低度风险(Ⅰ级)', '中度风险(Ⅱ级)', '高度风险(Ⅲ级)']
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
                    data: ['国有企业', '集体企业', '股份合作企业', '联营企业', '有限责任公司', '股份有限公司', '私营企业', '其他企业', '合资经营企业（港或澳、台资）', '合作经营企业（港或澳、台资）', '港、澳、台商独资经营企业', '港、澳、台商投资股份有限公司', '其他港、澳、台商投资企业', '中外合资经营企业', '中外合作经营企业', '外资企业', '外商投资股份有限公司', '其他外商投资企业', '事业单位', '社会团体']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '暂无风险',
                    type: 'bar',
                    data: this.state.option5Data && this.state.option5Data.list1
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'bar',
                    data: this.state.option5Data && this.state.option5Data.list2
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'bar',
                    data: this.state.option5Data && this.state.option5Data.list3
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'bar',
                    data: this.state.option5Data && this.state.option5Data.list4
                }
            ]
        }

        let option6 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['暂无风险', '低度风险(Ⅰ级)', '中度风险(Ⅱ级)', '高度风险(Ⅲ级)'],
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
                data: this.state.option6Data.flagList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'line',
                    data: this.state.option6Data.zero
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'line',
                    data: this.state.option6Data.one
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'line',
                    data: this.state.option6Data.two
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'line',
                    data: this.state.option6Data.three
                }
            ]
        }

        return <div>
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
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={24}>
                        {/*表2-41 企业职业病危害风险分布情况（按行政区划统计）*/}
                        <Card
                            bordered={false}
                            title={'企业及区域的职业病危害风险分布情况'}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option4')}>详细数据</Button>}
                        >
                            <Tabs defaultActiveKey="industryOfEnterprise" onChange={this.onChange} type="card">
                                <TabPane tab="行业(企业)" key="industryOfEnterprise">
                                    <ReactEcharts
                                        option={option4}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>
                                {/*                              <TabPane tab="行政区划(企业)" key="areaOfEnterprise">
                                    <ReactEcharts
                                        option={option3}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>*/}
                                <TabPane tab="登记注册类型(企业)" key="registerTypeOfEnterprise">
                                    <ReactEcharts
                                        option={option5}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>
                                {/*                                <TabPane tab="行政区划(区域)" key="areaOfArea">
                                    <ReactEcharts
                                        option={option6}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>*/}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }
}