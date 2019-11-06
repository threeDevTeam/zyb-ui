import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs} from 'antd'
import {Modal} from 'nowrapper/lib/antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'
import request from "../../../utils/request"
import 'ant-design-pro/dist/ant-design-pro.css'
import {WaterWave} from 'ant-design-pro/lib/Charts'
import bj from '../../../assets/map_bg.jpg'

const {TabPane} = Tabs
let switchFlag = "no"
//国家
export default class NationDangerVisual extends Component {
    state = {
        option1Data: [],
        option2Data: [],
        option3Data: [],
        option4Data: [],
        option5Data: [],
        option6Data: [],
        scrollData: [],
        tabKey: 'areaOfEnterprise'
    }

    componentWillMount() {
        //后台取出开关
        switchFlag = "no"
        //scroll
        request('/zyb/nationDangerVisual/' + switchFlag + '/scroll').then(res => {
            if (res && res.flag) {
                this.setState({scrollData: res.data})
            }
        })
        //option1
        request('/zyb/nationDangerVisual/' + switchFlag + '/option1').then(res => {
            if (res && res.flag) {
                this.setState({option1Data: res.data})
            }
        })
        //option2
        request('/zyb/nationDangerVisual/' + switchFlag + '/option2').then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        //option4
        request('/zyb/nationDangerVisual/' + switchFlag + '/option4').then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data})
            }
        })

        //随机数
        this.setState({random: Math.round(Math.random() * 80)})
    }

    onChange = tabKey => {
        this.setState({tabKey})
        if (tabKey === 'areaOfEnterprise') {
            //option3
            request('/zyb/nationDangerVisual/' + switchFlag + '/option3').then(res => {
                if (res && res.flag) {
                    this.setState({option3Data: res.data})
                }
            })
        } else if (tabKey === 'industryOfEnterprise') {
            //option4
            request('/zyb/nationDangerVisual/' + switchFlag + '/option4').then(res => {
                if (res && res.flag) {
                    this.setState({option4Data: res.data})
                }
            })
        } else if (tabKey === 'registerTypeOfEnterprise') {
            //option5
            request('/zyb/nationDangerVisual/' + switchFlag + '/option5').then(res => {
                if (res && res.flag) {
                    this.setState({option5Data: res.data})
                }
            })
        } else if (tabKey === 'areaOfArea') {
            //option6
            request('/zyb/nationDangerVisual/' + switchFlag + '/option6').then(res => {
                if (res && res.flag) {
                    console.log(res.data);
                    this.setState({option6Data: res.data})
                }
            })
        }
    }

    detailData = (type) => {
        if ("one" === type) {
            const dataSource = [
                {
                    key: '1',
                    name: 'aa',
                    age: 32,
                    address1: 'aa',
                    address2: 'aaaa',
                    address3: 'aaaaa',
                },
                {
                    key: '2',
                    name: 'bb',
                    age: 42,
                    address1: 'bbb',
                    address2: 'bbbb',
                    address3: 'bbbbbb',
                },
            ];

            const columns = [
                {
                    title: '行政区划',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '区域职业病危害风险值',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '风险等级',
                    dataIndex: 'address1',
                    key: 'address1',
                },
                {
                    title: '应配备监管人员（人）',
                    dataIndex: 'address2',
                    key: 'address2',
                },
                {
                    title: '应配备技术服务人员（人）',
                    dataIndex: 'address3',
                    key: 'address3',
                }
            ];
            Modal.info({
                title: '区域职业病危害风险分级及管控措施',
                okText: '关闭',
                content: <Table columns={columns} dataSource={dataSource}/>,
                width: '70vw'
            })
        } else if ("two" === type) {

        }
    }

    render() {
        let option1 = {
            /*            title: {
                            text: '职业病的区域危害风险分级及管控措施',
                            subtext: '副标题，不需要主删除此行',
                            left: 'center',
                            // top: '13%',
                            textStyle: {
                                // color: '#fff'
                            }
                        },*/
            tooltip: {},
            legend: {
                show: false,
                data: ['暂无风险', '轻微风险(Ⅰ级)', '低度风险(Ⅱ级)', '中度风险(Ⅲ级)', '高度风险(Ⅳ级)']
            },
            visualMap: {
                show: false,
                min: 0,
                max: 4,
                // left: 'center',
                // top: 'bottom',
                // orient: 'horizontal',
                // text: ['高', '低'],
                seriesIndex: [0, 1, 2, 3, 4],
                inRange: {
                    // color: ['#CCFFCC', 'blue', 'yellow', 'orange', 'red']
                    color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','orange','rgb(240, 72, 100)'],
                },
                calculable: true
            },
            geo: {
                zoom: 1.2,
                map: 'china',
                roam: false,//禁止拖拽
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis: {
                        color: null,
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.option1Data && this.state.option1Data.zero
                }, {
                    name: '轻微风险(Ⅰ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.option1Data && this.state.option1Data.one
                }, {
                    name: '低度风险(Ⅱ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.option1Data && this.state.option1Data.two
                }, {
                    name: '中度风险(Ⅲ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.option1Data && this.state.option1Data.three
                }, {
                    name: '高度风险(Ⅳ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.option1Data && this.state.option1Data.four
                },
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: 0
                }
            ]
        }
        let onEvents1 = {
            'click': (params) => {
                alert(params.name)
                request('/zyb/areaOfDic/getGeoJsonByName?name=' + params.name).then(res => {
                    if (res && res.flag) {
                        this.setState({mapType: params.name})
                        echarts.registerMap(params.name, res.data);
                    } else {
                        message.error("操作失败")
                    }
                })

            }
        }
        let option2 = {
            color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','rgb(240, 72, 100)'],
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
        let backgroundImage = 'url(' + bj + ')'
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
            color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','rgb(240, 72, 100)'],
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
            color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','rgb(240, 72, 100)'],
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
            color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','rgb(240, 72, 100)'],
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
                    data: ['国有企业', '集体企业', '股份合作企业', '联营企业', '联营企业', '联营企业', '联营企业', '联营企业', '有限责任公司', '有限责任公司', '有限责任公司', '股份有限公司', '私营企业', '私营企业', '私营企业', '私营企业', '私营企业', '其他企业', '合资经营企业（港或澳、台资）', '合作经营企业（港或澳、台资）', '港、澳、台商独资经营企业', '港、澳、台商投资股份有限公司', '其他港、澳、台商投资企业', '中外合资经营企业', '中外合作经营企业', '外资企业', '外商投资股份有限公司', '其他外商投资企业', '事业单位', '社会团体']
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
            color: [ '#00CCCC','#1890FF','rgb(250, 204, 20)','rgb(240, 72, 100)'],
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
            <Row gutter={16}>
                <Col span={5}>
                    {/*表2-40 企业职业病危害风险分级及管控措施*/}
                    <Card
                        title={'监督检查频次'}
                        bordered={false}
                        style={{height: '97vh', overflow: 'hidden'}}
                    >
                        <Carousel autoplay dotPosition={"right"} dots={false}>
                            <Table size={'middle'} showHeader={false} columns={columns}
                                   dataSource={this.state.scrollData.four}
                                   pagination={false}/>
                            <Table size={'middle'} showHeader={false} columns={columns}
                                   dataSource={this.state.scrollData.three}
                                   pagination={false}/>
                            <Table size={'middle'} showHeader={false} columns={columns}
                                   dataSource={this.state.scrollData.two}
                                   pagination={false}/>
                            <Table size={'middle'} showHeader={false} columns={columns}
                                   dataSource={this.state.scrollData.one}
                                   pagination={false}/>
                        </Carousel>
                    </Card>
                </Col>
                <Col span={12}>
                    {/*表2-45 区域职业病危害风险分级及管控措施*/}
                    <Card
                        title={'区域职业病危害风险分级'}
                        bordered={false}
                        headStyle={{height: 57}}
                        extra={<Button type="dashed" onClick={() => this.detailData('one')}>详细数据</Button>}
                    >
                        <ReactEcharts
                            option={option1}
                            onEvents={onEvents1} style={{height: '80vh'}}/>
                    </Card>
                </Col>
                <Col span={7}>
                    {/*表2-44 企业职业病危害风险分布情况*/}
                    <Card
                        title={'企业风险数量'}
                        bordered={false}
                    >
                        <ReactEcharts
                            option={option2}
                            onEvents={onEvents1} style={{height: '40vh'}}/>
                    </Card>
                    <Card
                        title={'高度风险占比'}
                        bodyStyle={{textAlign: 'center', fontSize: 0}}
                        bordered={false}
                        style={{marginTop: 10, height: '38vh'}}
                    >
                        <WaterWave height={140} title="高度风险(Ⅳ级)" percent={this.state.random} color={'rgb(240, 72, 100)'}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop: 20}}>
                <Col span={24}>
                    {/*表2-41 企业职业病危害风险分布情况（按行政区划统计）*/}
                    <Card
                        bordered={false}
                        title={'企业及区域的职业病危害风险分布情况'}
                        headStyle={{height: 57}}
                        extra={<Button type="dashed" onClick={() => this.detailData('one')}>详细数据</Button>}
                    >
                        <Tabs defaultActiveKey="industryOfEnterprise" onChange={this.onChange}  type="card">
                            <TabPane tab="行业(企业)" key="industryOfEnterprise" >
                                <ReactEcharts
                                    option={option4}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="行政区划(企业)" key="areaOfEnterprise" >
                                <ReactEcharts
                                    option={option3}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="登记注册类型(企业)" key="registerTypeOfEnterprise">
                                <ReactEcharts
                                    option={option5}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="行政区划(区域)" key="areaOfArea" >
                                <ReactEcharts
                                    option={option6}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}