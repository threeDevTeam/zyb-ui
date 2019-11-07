import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio, ConfigProvider} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import Link from 'umi/link'
import zhCh from 'antd/es/locale/zh_CN'

const {TabPane} = Tabs
let switchFlag = "no"

//企业
export default class NationGovVisual extends Component {
    state = {
        year: '2019'
    }


    componentWillMount() {
        this.yearOnChange(this.state.year)
    }

    yearOnChange = year => {
        let params = {
            params: {year: year || this.state.year}
        }
        //option1
        request('/zyb/nationGovVisual/' + switchFlag + '/option1', params).then(res => {
            if (res && res.flag) {
                this.setState({option1Data: res.data})
            }
        })
        //option2
        request('/zyb/nationGovVisual/' + switchFlag + '/option2', params).then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        //option3
        request('/zyb/nationGovVisual/' + switchFlag + '/option3', params).then(res => {
            if (res && res.flag) {
                this.setState({option3Data: res.data})
            }
        })
        //option4
        request('/zyb/nationGovVisual/' + switchFlag + '/option4', params).then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data})
            }
        })
        //option5
        request('/zyb/nationGovVisual/' + switchFlag + '/option5', params).then(res => {
            if (res && res.flag) {
                this.setState({option5Data: res.data})
            }
        })
        //option6
        request('/zyb/nationGovVisual/' + switchFlag + '/option6', params).then(res => {
            if (res && res.flag) {
                this.setState({option6Data: res.data})
            }
        })
        //option7
        request('/zyb/nationGovVisual/' + switchFlag + '/option7', params).then(res => {
            if (res && res.flag) {
                this.setState({option7Data: res.data})
            }
        })
    }

    onChange = tabKey => {
        if (tabKey === 'option5') {
            //option5
            request('/zyb/nationGovVisual/' + switchFlag + '/option5').then(res => {
                if (res && res.flag) {
                    this.setState({option5Data: res.data})
                }
            })
        } else if (tabKey === 'option6') {
            //option6
            request('/zyb/nationGovVisual/' + switchFlag + '/option6').then(res => {
                if (res && res.flag) {
                    this.setState({option6Data: res.data})
                }
            })
        } else if (tabKey === 'option7') {
            //option7
            request('/zyb/nationGovVisual/' + switchFlag + '/option7').then(res => {
                if (res && res.flag) {
                    this.setState({option7Data: res.data})
                }
            })
        }
    }

    render() {
        let onEvents = {
            'click': (params) => {
                alert(params.name)
            }
        }
        const option1Columns = [
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
        let option2 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['印发法律法规累计', '印发规范性文件累计', '印发标准累计'],
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
                data: ['香港', '新疆', '宁夏', '青海', '甘肃', '陕西', '西藏', '云南', '贵州', '四川', '重庆', '海南', '广西', '广东', '湖南', '湖北', '河南', '山东', '江西', '福建', '安徽', '浙江', '江苏', '上海', '黑龙江', '吉林', '辽宁', '内蒙古', '山西', '河北', '天津', '北京']
            },
            series: [
                {
                    name: '印发法律法规累计',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data && this.state.option2Data.list1
                },
                {
                    name: '印发规范性文件累计',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data && this.state.option2Data.list2
                },
                {
                    name: '印发标准累计',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.state.option2Data && this.state.option2Data.list3
                }
            ],
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                    left: '93%',
                    start: 100,
                    end: 95,
                },
                {
                    type: 'inside',
                    show: true,
                    yAxisIndex: [0],
                    start: 100,
                    end: 95
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
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['技术服务机构', '健康检查机构', '诊断机构']
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
                data: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '技术服务机构',
                    type: 'line',
                    data: this.state.option5Data && this.state.option5Data.list1
                },
                {
                    name: '健康检查机构',
                    type: 'line',
                    data: this.state.option5Data && this.state.option5Data.list2
                },
                {
                    name: '诊断机构',
                    type: 'line',
                    data: this.state.option5Data && this.state.option5Data.list3
                }
            ]
        }
        let option6 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)', '#BBBBBB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['检查机构数', '处罚机构数', '罚款金额', '吊销资质数']
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
                    data: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '检查机构数',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option6Data && this.state.option6Data.list1
                },
                {
                    name: '处罚机构数',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option6Data && this.state.option6Data.list2
                },
                {
                    name: '罚款金额',
                    type: 'bar',
                    stack: '因素2',
                    data: this.state.option6Data && this.state.option6Data.list3
                },
                {
                    name: '吊销资质数',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option6Data && this.state.option6Data.list4
                }
            ]
        }
        let option7 = {
            color: ['#00CCCC', '#1890FF', 'rgb(250, 204, 20)'],
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
                    data: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
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
        return <div>
            <ConfigProvider locale={zhCh}>
                <Row gutter={8}>
                    <Col span={24}>
                        <div style={{background: '#fff', height: 60}}>
                            <Radio.Group style={{marginLeft: 18, marginTop: 10}} onChange={this.yearOnChange}
                                         defaultValue={this.state.year} size={'large'}>
                                <span style={{fontSize: 16}}>年份：</span>
                                <Radio.Button value="2019">2019</Radio.Button>
                                <Radio.Button value="2018">2018</Radio.Button>
                                <Radio.Button value="2017">2017</Radio.Button>
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={16}>
                        {/*表2-29 职业健康监管资源统计分析表*/}
                        <Card
                            title={'职业健康监管资源统计'}
                            bordered={false}
                            headStyle={{height: 57}}

                        >
                            <Table columns={option1Columns} dataSource={this.state.option1Data}
                                   style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        {/*表2-30 职业健康法规标准建设统计分析表*/}
                        <Card
                            title={'职业健康法规标准建设统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed">详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option2}
                                onEvents={onEvents} style={{height: 350}}/>
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
                            <Table columns={option3Columns} dataSource={this.state.option1Data}
                                   style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-32 职业卫生“三同时”监督执法统计分析表*/}
                        <Card
                            title={'职业卫生“三同时”监督执法统计'}
                            bordered={false}
                            headStyle={{height: 57}}
                        >
                            <Table columns={option4Columns} dataSource={this.state.option1Data}
                                   style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={24}>
                        {/*
                        表2-33 技术服务机构监管情况统计分析表
                        表2-34 技术服务机构监管情况统计分析表（续）
                        表2-35 职业病危害事故统计分析表*/}
                        <Card
                            bordered={false}
                            title={'技术服务机构监管情况、职业病危害事故'}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('one')}>详细数据</Button>}
                        >
                            <Tabs defaultActiveKey="option6" onChange={this.onChange} type={'card'}>
                                <TabPane tab="技术服务机构监管情况1" key="option6">
                                    <ReactEcharts
                                        option={option6}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>
                                <TabPane tab="技术服务机构监管情况2" key="option5">
                                    <ReactEcharts
                                        option={option5}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>
                                <TabPane tab="职业病危害事故" key="option7">
                                    <ReactEcharts
                                        option={option7}
                                        onEvents={onEvents} style={{height: '50vh'}}/>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </ConfigProvider>
        </div>
    }
}