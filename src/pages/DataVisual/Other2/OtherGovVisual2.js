import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio, ConfigProvider} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import Link from 'umi/link'
import zhCh from 'antd/es/locale/zh_CN'
import {Modal} from "nowrapper/lib/antd";

const {TabPane} = Tabs
let switchFlag = "no"
let currentYear = new Date().getFullYear()
let areaQuery = {}
//政府
export default class OtherGovVisual extends Component {
    state = {
        year: currentYear,
        tabKey: 'option6',
        option21Category: [],
        option22Category: []
    }

    areaCategory = () => {
        let params = {
            params: areaQuery
        }
        request('/zyb/categoryController/getAreaStrChildren', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Category: res.data})
            }
        })
        request('/zyb/categoryController/getAreaReverseStrChildren', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Category: res.data})
            }
        })
    }

    componentWillMount() {
        //行政区划
        areaQuery = this.props.areaQuery

        this.areaCategory()

        this.yearOnChange(this.state.year)
    }

    yearOnChange = year => {
        let params = {
            params: {year: year || this.state.year, ...areaQuery}
        }
        //option1
        request('/zyb/otherGovVisual2/' + switchFlag + '/option1', params).then(res => {
            if (res && res.flag) {
                this.setState({option1Data: res.data})
            }
        })
        request('/zyb/otherGovVisual2/' + switchFlag + '/option1Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option1Detail: res.data})
            }
        })
        //option2
        request('/zyb/otherGovVisual2/' + switchFlag + '/option2', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        request('/zyb/otherGovVisual2/' + switchFlag + '/option2Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Detail: res.data})
            }
        })
        //option3
        request('/zyb/otherGovVisual2/' + switchFlag + '/option3', params).then(res => {
            if (res && res.flag) {
                this.setState({option3Data: res.data})
            }
        })
        //option4
        request('/zyb/otherGovVisual2/' + switchFlag + '/option4', params).then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data})
            }
        })
        //option5
        request('/zyb/otherGovVisual2/' + switchFlag + '/option5', params).then(res => {
            if (res && res.flag) {
                this.setState({option5Data: res.data})
            }
        })
        request('/zyb/otherGovVisual2/' + switchFlag + '/option5Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option5Detail: res.data})
            }
        })
        //option6
        request('/zyb/otherGovVisual2/' + switchFlag + '/option6', params).then(res => {
            if (res && res.flag) {
                this.setState({option6Data: res.data})
            }
        })
        request('/zyb/otherGovVisual2/' + switchFlag + '/option6Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option6Detail: res.data})
            }
        })
        //option7
        request('/zyb/otherGovVisual2/' + switchFlag + '/option7', params).then(res => {
            if (res && res.flag) {
                this.setState({option7Data: res.data})
            }
        })
        request('/zyb/otherGovVisual2/' + switchFlag + '/option7Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option7Detail: res.data})
            }
        })
    }

    onChange = tabKey => {
        let params = {
            params: {year: this.state.year, ...areaQuery}
        }
        this.setState({tabKey})
        if (tabKey === 'option5') {
            //option5
            request('/zyb/otherGovVisual/' + switchFlag + '/option5', params).then(res => {
                if (res && res.flag) {
                    this.setState({option5Data: res.data})
                }
            })
            request('/zyb/otherGovVisual/' + switchFlag + '/option5Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option5Detail: res.data})
                }
            })
        } else if (tabKey === 'option6') {
            //option6
            request('/zyb/otherGovVisual/' + switchFlag + '/option6', params).then(res => {
                if (res && res.flag) {
                    this.setState({option6Data: res.data})
                }
            })
            request('/zyb/otherGovVisual/' + switchFlag + '/option6Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option6Detail: res.data})
                }
            })
        } else if (tabKey === 'option7') {
            //option7
            request('/zyb/otherGovVisual/' + switchFlag + '/option7', params).then(res => {
                if (res && res.flag) {
                    this.setState({option7Data: res.data})
                }
            })
            request('/zyb/otherGovVisual/' + switchFlag + '/option7Detail', params).then(res => {
                if (res && res.flag) {
                    this.setState({option7Detail: res.data})
                }
            })
        }
    }

    detailData = (type) => {
        let dataSource = []
        let columns = []
        let title = ''
        let width = '70vw'
        let pagination = false
        if ('option1' === type) {
            title = '职业健康监管资源统计'
            dataSource = this.state.option1Detail
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '行政区划内用人单位数（个）',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '行政区划内从业人员数（人）',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业健康监管人员数（人）',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '取得执法资格证书职业健康监管人员数（人）',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '职业健康监管装备数量（台/套）',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '在用职业健康监管装备数量（台/套）',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                }
            ]
        } else if ('option2' === type) {
            title = ''
            dataSource = this.state.option2Detail
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '印发法律法规数',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var1',
                            key: 'var1'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var2',
                            key: 'var2',
                        }
                    ]
                },
                {
                    title: '印发规范性文件数',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var3',
                            key: 'var3'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var4',
                            key: 'var4',
                        }
                    ]
                },
                {
                    title: '印发标准数',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var5',
                            key: 'var5'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var6',
                            key: 'var6',
                        }
                    ]
                }
            ]
        }else if('option5'===type){
            width = '95vw'
            title = '技术服务机构监管情况1'
            dataSource = this.state.option5Detail
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '职业卫生技术服务机构（甲级）',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var1',
                            key: 'var1'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var2',
                            key: 'var2',
                        }
                    ]
                },
                {
                    title: '职业卫生技术服务机构（乙级）',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var3',
                            key: 'var3'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var4',
                            key: 'var4',
                        }
                    ]
                },
                {
                    title: '职业卫生技术服务机构（丙级）',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var5',
                            key: 'var5'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var6',
                            key: 'var6',
                        }
                    ]
                },
                {
                    title: '职业健康检查机构',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var7',
                            key: 'var7'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var8',
                            key: 'var8',
                        }
                    ]
                },
                {
                    title: '职业病诊断机构',
                    children: [
                        {
                            title: '新增',
                            dataIndex: 'var9',
                            key: 'var9'
                        },
                        {
                            title: '累计',
                            dataIndex: 'var10',
                            key: 'var10',
                        }
                    ]
                }
            ]
        } else if('option6'===type){
            width = '95vw'
            title = '技术服务机构监管情况2'
            dataSource = this.state.option6Detail
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '检查机构数（家）',
                    children: [
                        {
                            title: '职业卫生技术服务机构',
                            dataIndex: 'var1',
                            key: 'var1'
                        },
                        {
                            title: '职业健康检查机构',
                            dataIndex: 'var2',
                            key: 'var2',
                        },
                        {
                            title: '职业病诊断机构',
                            dataIndex: 'var3',
                            key: 'var3',
                        }
                    ]
                },
                {
                    title: '处罚机构数（家）',
                    children: [
                        {
                            title: '职业卫生技术服务机构',
                            dataIndex: 'var4',
                            key: 'var4'
                        },
                        {
                            title: '职业健康检查机构',
                            dataIndex: 'var5',
                            key: 'var5',
                        },
                        {
                            title: '职业病诊断机构',
                            dataIndex: 'var6',
                            key: 'var6',
                        }
                    ]
                },
                {
                    title: '罚款金额',
                    children: [
                        {
                            title: '职业卫生技术服务机构',
                            dataIndex: 'var7',
                            key: 'var7'
                        },
                        {
                            title: '职业健康检查机构',
                            dataIndex: 'var8',
                            key: 'var8',
                        },
                        {
                            title: '职业病诊断机构',
                            dataIndex: 'var9',
                            key: 'var9',
                        }
                    ]
                },
                {
                    title: '吊销资质数',
                    children: [
                        {
                            title: '职业卫生技术服务机构',
                            dataIndex: 'var10',
                            key: 'var10'
                        },
                        {
                            title: '职业健康检查机构',
                            dataIndex: 'var11',
                            key: 'var11',
                        },
                        {
                            title: '职业病诊断机构',
                            dataIndex: 'var12',
                            key: 'var12',
                        }
                    ]
                }
            ]
        }else if('option7'===type){
            width = '95vw'
            title = '职业病危害事故'
            dataSource = this.state.option7Detail
            columns = [
                {
                    title: '行政区划',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '事故或事件数（起）',
                    children: [
                        {
                            title: '合计',
                            dataIndex: 'var1',
                            key: 'var1'
                        },
                        {
                            title: '尘肺病事件',
                            dataIndex: 'var2',
                            key: 'var2',
                        },
                        {
                            title: '中毒事故',
                            dataIndex: 'var3',
                            key: 'var3'
                        },
                        {
                            title: '其它事故',
                            dataIndex: 'var4',
                            key: 'var4',
                        }
                    ]
                },
                {
                    title: '事故人数（人）',
                    children: [
                        {
                            title: '合计',
                            dataIndex: 'var5',
                            key: 'var5'
                        },
                        {
                            title: '尘肺病事件人数',
                            dataIndex: 'var6',
                            key: 'var6',
                        },
                        {
                            title: '中毒事故人数',
                            dataIndex: 'var7',
                            key: 'var7'
                        },
                        {
                            title: '其它事故人数',
                            dataIndex: 'var8',
                            key: 'var8',
                        }
                    ]
                },
                {
                    title: '死亡人数',
                    dataIndex: 'var9',
                    key: 'var9',
                },
                {
                    title: '直接经济损失',
                    dataIndex: 'var10',
                    key: 'var10',
                }
            ]
        }
        Modal.info({
            title: title,
            okText: '关闭',
            content: <Table pagination={pagination} columns={columns} dataSource={dataSource} bordered={true}
                            size={'small'}/>,
            width: width
        })
    }

    render() {
        let onEvents = {
            'click': (params) => {
                console.log(params.name)
            }
        }
        let option1 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)', '#BBBBBB'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                data: ['用人单位数', '从业人员数', '职业健康监管人员数', '取得执法资格证书职业健康监管人员数']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '60%'],
                    data: this.state.option1Data,
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
        let option2 = {
            color: ['#1890FF', 'rgb(19, 194, 194)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['累计','新增']
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
                data: ['印发法律法规文件', '印发规范化文件', '印发标准']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '累计',
                    type: 'bar',
                    data: this.state.option2Data && this.state.option2Data.list1
                },
                {
                    name: '新增',
                    type: 'bar',
                    data: this.state.option2Data && this.state.option2Data.list2
                }
            ]
        }
        const option3Columns = [
            {
                title: '行政区划',
                dataIndex: 'area',
                key: 'area',
            },
            {
                title: '检查用人单位数（个）',
                dataIndex: 'var1',
                key: 'var1',
                sorter: (a, b) => a.var1 - b.var1
            },
            {
                title: '下达执法文书数（份）',
                dataIndex: 'var2',
                key: 'var2',
                sorter: (a, b) => a.var2 - b.var2
            },
            {
                title: '发现问题或隐患数（项）',
                dataIndex: 'var3',
                key: 'var3',
                sorter: (a, b) => a.var3 - b.var3
            },
            {
                title: '责令改正用人单位数（个）',
                dataIndex: 'var4',
                key: 'var4',
                sorter: (a, b) => a.var4 - b.var4
            },
            {
                title: '罚款用人单位数（个）',
                dataIndex: 'var5',
                key: 'var5',
                sorter: (a, b) => a.var5 - b.var5
            },
            {
                title: ' 罚款金额（万元）',
                dataIndex: 'var6',
                key: 'var6',
                sorter: (a, b) => a.var6 - b.var6
            },
            {
                title: '责令停产整顿用人单位数（个）',
                dataIndex: 'var7',
                key: 'var7',
                sorter: (a, b) => a.var7 - b.var7
            },
            {
                title: '提请关闭用人单位数（个）',
                dataIndex: 'var8',
                key: 'var8',
                sorter: (a, b) => a.var8 - b.var8
            }
        ]
        const option4Columns = [
            {
                title: '行政区划',
                dataIndex: 'area',
                key: 'area',
            },
            {
                title: '检查建设单位数（个）',
                dataIndex: 'var1',
                key: 'var1',
                sorter: (a, b) => a.var1 - b.var1
            },
            {
                title: '下达执法文书数（份）',
                dataIndex: 'var2',
                key: 'var2',
                sorter: (a, b) => a.var2 - b.var2
            },
            {
                title: '给予警告责令限期整改单位数（个）',
                dataIndex: 'var3',
                key: 'var3',
                sorter: (a, b) => a.var3 - b.var3
            },
            {
                title: '罚款建设单位数（个）',
                dataIndex: 'var4',
                key: 'var4',
                sorter: (a, b) => a.var4 - b.var4
            },
            {
                title: '罚款金额（万元）',
                dataIndex: 'var5',
                key: 'var5',
                sorter: (a, b) => a.var5 - b.var5
            },
            {
                title: '责令停止产生职业病危害作业单位数（个）',
                dataIndex: 'var6',
                key: 'var6',
                sorter: (a, b) => a.var6 - b.var6
            },
            {
                title: '提请责令停建或关闭单位数数（个）',
                dataIndex: 'var7',
                key: 'var7',
                sorter: (a, b) => a.var7 - b.var7
            }
        ]
        let option5 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                data: ['技术服务机构', '健康检查机构', '诊断机构']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.state.option5Data,
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
        let option6 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)', '#BBBBBB'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['检查机构数','处罚机构数','罚款金额','吊销资质数']
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
                data: ['职业卫生技术服务机构','职业健康检查机构','职业病诊断机构']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '检查机构数',
                    type: 'line',
                    data: this.state.option6Data && this.state.option6Data.list1
                },
                {
                    name: '处罚机构数',
                    type: 'line',
                    data: this.state.option6Data && this.state.option6Data.list2
                },
                {
                    name: '罚款金额',
                    type: 'line',
                    data: this.state.option6Data && this.state.option6Data.list3
                },
                {
                    name: '吊销资质数',
                    type: 'line',
                    data: this.state.option6Data && this.state.option6Data.list4
                }
            ]
        }
        let option7 = {
            color: ['#1890FF', '#00CCCC', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['事故数', '事故人数', '死亡人数']
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
                    data: ['合计']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '事故数',
                    type: 'bar',
                    data: this.state.option7Data && this.state.option7Data.list1
                },
                {
                    name: '事故人数',
                    type: 'bar',
                    data: this.state.option7Data && this.state.option7Data.list2
                },
                {
                    name: '死亡人数',
                    type: 'bar',
                    data: this.state.option7Data && this.state.option7Data.list3
                }
            ]
        }

        let yearSelect = []
        for (let i = currentYear; i > (currentYear - 3); i--) {
            yearSelect.push(<Radio.Button value={i}>{i}</Radio.Button>);
        }

        return <div>
            <ConfigProvider locale={zhCh}>
                <Row gutter={8}>
                    <Col span={24}>
                        <div style={{background: '#fff', height: 60}}>
                            <Radio.Group style={{marginLeft: 18, marginTop: 10}} onChange={this.yearOnChange}
                                         defaultValue={this.state.year} size={'large'}>
                                <span style={{fontSize: 16}}>年份：</span>
                                {yearSelect}
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-29 职业健康监管资源统计分析表*/}
                        <Card
                            title={'职业健康监管资源统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option1')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option1}
                                onEvents={onEvents} style={{height: '40vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-30 职业健康法规标准建设统计分析表*/}
                        <Card
                            title={'职业健康法规标准建设统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option2')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option2}
                                onEvents={onEvents} style={{height: '40vh'}}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-31 职业健康监督执法统计分析表*/}
                        <Card
                            title={'职业健康监督执法统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                        >
                            <Table pagination={false} columns={option3Columns} dataSource={this.state.option3Data}
                                   style={{height: 250, overflowY: 'scroll'}} size={'middle'}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-32 职业卫生“三同时”监督执法统计分析表*/}
                        <Card
                            title={'职业卫生“三同时”监督执法统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                        >
                            <Table pagination={false}  columns={option4Columns} dataSource={this.state.option4Data}
                                   style={{height: 250, overflowY: 'scroll'}} size={'middle'}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={8}>
                        {/*表2-33 技术服务机构监管情况统计分析表*/}
                        <Card
                            title={'技术服务机构监管情况1'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option5')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option5}
                                onEvents={onEvents} style={{height: '40vh'}}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        {/*表2-34 技术服务机构监管情况统计分析表（续）*/}
                        <Card
                            title={'技术服务机构监管情况2'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option6')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option6}
                                onEvents={onEvents} style={{height: '40vh'}}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        {/*表2-35 职业病危害事故统计分析表*/}
                        <Card
                            title={'职业病危害事故'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option7')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option7}
                                onEvents={onEvents} style={{height: '40vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }
}