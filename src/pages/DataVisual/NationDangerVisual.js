import React, {Component} from 'react'
import {message, Row, Col, Carousel, Table, Card, Tabs} from 'antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'
import request from "../../utils/request"
import 'ant-design-pro/dist/ant-design-pro.css'
import {TagCloud, WaterWave} from 'ant-design-pro/lib/Charts'
import ScrollList from './ScrollList'
import bj from '../../assets/bg01.png'

const {TabPane} = Tabs

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
        //scroll
        request('/zybadmin/nationDangerVisual/scroll').then(res => {
            if (res && res.flag) {
                this.setState({scrollData: res.data})
            }
        })
        //option1
        request('/zybadmin/nationDangerVisual/option1').then(res => {
            if (res && res.flag) {
                this.setState({option1Data: res.data})
            }
        })
        //option2
        request('/zybadmin/nationDangerVisual/option2').then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data})
            }
        })
        //option3
        request('/zybadmin/nationDangerVisual/option3').then(res => {
            if (res && res.flag) {
                this.setState({option3Data: res.data})
            }
        })
        //option4
        request('/zybadmin/nationDangerVisual/option4').then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data})
            }
        })
        //option5
        request('/zybadmin/nationDangerVisual/option5').then(res => {
            if (res && res.flag) {
                this.setState({option5Data: res.data})
            }
        })
        //option6
        request('/zybadmin/nationDangerVisual/option3').then(res => {
            if (res && res.flag) {
                this.setState({option6Data: res.data})
            }
        })
    }

    onChange = tabKey => {
        this.setState({tabKey})
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
                    color: ['#CCFFCC', 'blue', 'yellow', 'orange', 'red']
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
                request('/zybadmin/areaOfDic/getGeoJsonByName?name=' + params.name).then(res => {
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
            color: ['#CCFFCC', 'blue', 'yellow', 'red'],
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
        // let backgroundImage = 'url(' + bj + ')'
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
            color: ['#CCFFCC', 'blue', 'yellow', 'red'],
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
                boundaryGap: false,
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
            color: ['#CCFFCC', 'blue', 'yellow', 'red'],
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
                boundaryGap: false,
                data: this.state.option4Data.flagList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'line',
                    data: this.state.option4Data.zero
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'line',
                    data: this.state.option4Data.one
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'line',
                    data: this.state.option4Data.two
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'line',
                    data: this.state.option4Data.three
                }
            ]
        }
        let option5 = {
            color: ['#CCFFCC', 'blue', 'yellow', 'red'],
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
                boundaryGap: false,
                data: this.state.option5Data.flagList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '暂无风险',
                    type: 'line',
                    data: this.state.option5Data.zero
                },
                {
                    name: '低度风险(Ⅰ级)',
                    type: 'line',
                    data: this.state.option5Data.one
                },
                {
                    name: '中度风险(Ⅱ级)',
                    type: 'line',
                    data: this.state.option5Data.two
                },
                {
                    name: '高度风险(Ⅲ级)',
                    type: 'line',
                    data: this.state.option5Data.three
                }
            ]
        }
        /*    let option6 = {
               color: ['#CCFFCC', 'blue', 'yellow', 'red'],
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
                   boundaryGap: false,
                   data: this.state.option6Data.areaNameList
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
           }*/

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
                    >
                        <ReactEcharts
                            option={option1}
                            onEvents={onEvents1} style={{height: '80vh'}}/>
                    </Card>
                </Col>
                <Col span={7}>
                    {/*表2-44 企业职业病危害风险分布情况*/}
                    <Card
                        title={'企业风险分布情况'}
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
                        <WaterWave height={120} title="高度风险(Ⅳ级)" percent={34} color={'red'}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop: 20}}>
                <Col span={24}>
                    {/*表2-41 企业职业病危害风险分布情况（按行政区划统计）*/}
                    <Card
                        bordered={false}
                    >
                        <Tabs defaultActiveKey="1" onChange={this.onChange}>
                            <TabPane tab="行政区划(企业)" key="areaOfEnterprise">
                                <ReactEcharts
                                    option={option3}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="行业(企业)" key="industryOfEnterprise">
                                <ReactEcharts
                                    option={option4}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="登记注册类型(企业)" key="registerTypeOfEnterprise">
                                <ReactEcharts
                                    option={option5}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                            <TabPane tab="行政区划(区域)" key="areaOfArea">
                                <ReactEcharts
                                    option={option3}
                                    onEvents={onEvents1} style={{height: '50vh'}}/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}