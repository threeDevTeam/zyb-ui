import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio, ConfigProvider} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import zhCh from 'antd/es/locale/zh_CN'
import {Modal} from "nowrapper/lib/antd";

let switchFlag = "no"
let currentYear = new Date().getFullYear()

let areaQuery = {}
//技术服务机构
export default class OtherServiceVisual extends Component {
    state = {
        display1: 'block',
        display2: 'none',
        display3: 'none',
        year: currentYear,
        type: '危害因素',
        option11Data: [],
        option21Category: [],
        option24Columns: [],
        option25Columns: [],
        option26Columns: [],
        option24Data: [],
        option25Data: [],
        option26Data: [],
    }
    data1 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type, ...areaQuery}
        }
        //option11
        request('/zyb/otherServiceVisual/' + switchFlag + '/option11', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option11Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Detail: res.data})
            }
        })
        //option12
        request('/zyb/otherServiceVisual/' + switchFlag + '/option12', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option12Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Detail: res.data})
            }
        })
        //option13
        request('/zyb/otherServiceVisual/' + switchFlag + '/option13', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option13Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Detail: res.data})
            }
        })
    }

    data2 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type, ...areaQuery}
        }
        //option21
        request('/zyb/otherServiceVisual/' + switchFlag + '/option21', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option21Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Detail: res.data})
            }
        })
        //option22
        request('/zyb/otherServiceVisual/' + switchFlag + '/option22', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option22Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Detail: res.data})
            }
        })
        //option23
        request('/zyb/otherServiceVisual/' + switchFlag + '/option23', params).then(res => {
            if (res && res.flag) {
                this.setState({option23Data: res.data})
            }
        })
        request('/zyb/otherServiceVisual/' + switchFlag + '/option23Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option23Detail: res.data})
            }
        })
        //option24
        request('/zyb/otherServiceVisual/' + switchFlag + '/option24', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Data: res.data})
            }
        })
        //option25
        request('/zyb/otherServiceVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        //option26
        request('/zyb/otherServiceVisual/' + switchFlag + '/option26', params).then(res => {
            if (res && res.flag) {
                this.setState({option26Data: res.data})
            }
        })
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

    registerTypeCategory = () => {
        request('/zyb/categoryController/getRegisterTypeStrList').then(res => {
            if (res && res.flag) {
                this.setState({option21Category: res.data})
            }
        })
        request('/zyb/categoryController/getRegisterTypeReverseStrList').then(res => {
            if (res && res.flag) {
                this.setState({option22Category: res.data})
            }
        })
    }

    componentWillMount() {
        //行政区划
        areaQuery = this.props.areaQuery

        this.areaCategory()

        this.data1()
    }

    yearOnChange = year => {
        this.setState({year})
        //
        let type = this.state.type
        if ("危害因素" === type) {
            this.data1(year, type)
        } else if ("行政区划" === type || "登记注册类型" === type) {
            this.data2(year, type)
        }
    }

    typeOnChange = obj => {
        let type = obj.target.value
        this.setState({type})
        //
        let year = this.state.year
        if ("危害因素" === type) {
            let option11Category = ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
            this.setState({option11Category})
            this.setState({
                display1: 'block',
                display2: 'none',
            })
        } else if ("行政区划" === type) {
            this.areaCategory()
            let option24Columns = [
                {
                    title: '行政区划',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业卫生技术服务机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '职业卫生技术服务专业技术人员数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '经培训合格专业技术人员数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '检测仪器设备台套数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '平均取得计量认证项目数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '职业病危害评价报告完成数',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                },
                {
                    title: '职业病危害检测报告完成数',
                    dataIndex: 'var7',
                    key: 'var7',
                    sorter: (a, b) => a.var7 - b.var7
                },
                {
                    title: '检测点数',
                    dataIndex: 'var8',
                    key: 'var8',
                    sorter: (a, b) => a.var8 - b.var8
                }
            ]
            let option25Columns = [
                {
                    title: '行政区划',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业健康检查机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '职业健康检查机构医护人员数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业健康检查机构取证人员数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '平均取得职业健康检查项目数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '完成职业健康检查报告数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '体检人数',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                }
            ]
            let option26Columns = [
                {
                    title: '行政区划',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业病诊断机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '诊断医师数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '平均取得的诊断项目数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '诊断人数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '报告职业病病人数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                }
            ]
            this.setState({option24Columns, option25Columns, option26Columns})
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'block',
            })
        } else if ("登记注册类型" === type) {
            this.registerTypeCategory()
            let option24Columns = [
                {
                    title: '登记注册类型',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业卫生技术服务机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '职业卫生技术服务专业技术人员数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '经培训合格专业技术人员数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '检测仪器设备台套数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '平均取得计量认证项目数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '职业病危害评价报告完成数',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                },
                {
                    title: '职业病危害检测报告完成数',
                    dataIndex: 'var7',
                    key: 'var7',
                    sorter: (a, b) => a.var7 - b.var7
                },
                {
                    title: '检测点数',
                    dataIndex: 'var8',
                    key: 'var8',
                    sorter: (a, b) => a.var8 - b.var8
                }
            ]
            let option25Columns = [
                {
                    title: '登记注册类型',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业健康检查机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '职业健康检查机构医护人员数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业健康检查机构取证人员数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '平均取得职业健康检查项目数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '完成职业健康检查报告数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '体检人数',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                }
            ]
            let option26Columns = [
                {
                    title: '登记注册类型',
                    dataIndex: 'area',
                    key: 'area',
                },
                {
                    title: '职业病诊断机构数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '诊断医师数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '平均取得的诊断项目数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '诊断人数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '报告职业病病人数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                }
            ]
            this.setState({option24Columns, option25Columns, option26Columns})
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'block'
            })
        }
    }

    detailData = (type) => {
        let dataSource = this.state[type + 'Detail']
        let columns = []
        let title = ''
        let width = '90vw'
        let pagination = true
        if ('危害因素' === this.state.type) {
            pagination = false
        }
        if ('option11' === type || 'option21' === type) {
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
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '达标点数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '达标率',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                }]
        } else if ('option12' === type || 'option22' === type) {
            title = '职业健康检查结果统计'
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '职业健康检查企业数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '体检报告数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业禁忌证人数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '职业禁忌证检出率',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '疑似职业病人数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '疑似职业病检出率',
                    dataIndex: 'var6',
                    key: 'var6',
                    sorter: (a, b) => a.var6 - b.var6
                },
                {
                    title: '检出疑似职业病企业数',
                    dataIndex: 'var7',
                    key: 'var7',
                    sorter: (a, b) => a.var7 - b.var7
                },
                {
                    title: '检出疑似职业病企业率',
                    dataIndex: 'var8',
                    key: 'var8',
                    sorter: (a, b) => a.var8 - b.var8
                }]
        } else if ('option13' === type || 'option23' === type) {
            title = '职业病诊断情况统计'
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '职业病诊断企业数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '诊断出职业病病人企业数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业病诊断人数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '报告职业病人数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '职业病诊断率',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                }]
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
        };
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
        };
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
        //行政区划、登记注册类型
        let option21 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)', '#BBBBBB', 'rgb(133, 67, 224)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
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
                    data: this.state.option21Category
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '粉尘',
                    type: 'bar',
                    data: this.state.option21Data && this.state.option21Data.list1
                },
                {
                    name: '化学因素',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option21Data && this.state.option21Data.list2
                },
                {
                    name: '物理因素',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option21Data && this.state.option21Data.list3
                },
                {
                    name: '放射性因素',
                    type: 'bar',
                    stack: '因素',
                    data: this.state.option21Data && this.state.option21Data.list4
                },
                {
                    name: '生物因素',
                    type: 'bar',
                    data: this.state.option21Data && this.state.option21Data.list5,
                    /*                    markLine: {
                                            lineStyle: {
                                                normal: {
                                                    type: 'dashed'
                                                }
                                            },
                                            data: [
                                                [{type: 'min'}, {type: 'max'}]
                                            ]
                                        }*/
                }
            ]
        };
        let option22 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
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
            xAxis: [
                {
                    type: 'category',
                    data: this.state.option21Category
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '职业禁忌证检出率',
                    type: 'bar',
                    data: this.state.option22Data && this.state.option22Data.list1
                },
                {
                    name: '疑似职业病检出率',
                    type: 'bar',
                    data: this.state.option22Data && this.state.option22Data.list2
                },
                {
                    name: '检出疑似职业病企业率',
                    type: 'bar',
                    data: this.state.option22Data && this.state.option22Data.list3
                }
            ],
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 50
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50
                }
            ]
        }
        let option23 = {
            color: ['#1890FF'],
            tooltip: {
                trigger: 'axis'
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
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: this.state.option21Category
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '职业病诊断率',
                    type: 'line',
                    data: this.state.option23Data && this.state.option23Data.list1
                }
            ],
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 50
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50
                }
            ]
        };

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
                            <Radio.Group onChange={this.typeOnChange} defaultValue={this.state.type} size={'large'}>
                                <Radio.Button value="危害因素">危害因素</Radio.Button>
                                {/*<Radio.Button value="行政区划">行政区划</Radio.Button>*/}
                                <Radio.Button value="登记注册类型">登记注册类型</Radio.Button>
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
                {/*危害因素*/}
                <div style={{display: this.state.display1}}>
                    <Row gutter={8} style={{marginTop: 10}}>
                        <Col span={8}>
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
                        <Col span={8}>
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
                        <Col span={8}>
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
                    </Row>
                </div>
                {/*行政区划、登记注册类型*/}
                <div style={{display: this.state.display2}}>
                    <Row gutter={8} style={{marginTop: 10}}>
                        <Col span={24}>
                            <Card
                                title={'作业场所职业病危害因素检测情况'}
                                bordered={false}
                                headStyle={{height: 57}}
                                extra={<Button type="dashed" onClick={() => this.detailData('option21')}>详细数据</Button>}
                            >
                                <ReactEcharts
                                    option={option21}
                                    onEvents={onEvents} style={{height: '60vh'}}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={8} style={{marginTop: 10}}>
                        <Col span={12}>
                            {/*表2-职业健康检查结果统计分析表*/}
                            <Card
                                title={'职业健康检查结果统计'}
                                bordered={false}
                                headStyle={{height: 57}}
                                extra={<Button type="dashed" onClick={() => this.detailData('option22')}>详细数据</Button>}
                            >
                                <ReactEcharts
                                    option={option22}
                                    onEvents={onEvents} style={{height: '60vh'}}/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            {/*表3 职业病诊断情况统计分析表*/}
                            <Card
                                title={'职业病诊断情况统计'}
                                bordered={false}
                                headStyle={{height: 57}}
                                extra={<Button type="dashed" onClick={() => this.detailData('option23')}>详细数据</Button>}
                            >
                                <ReactEcharts
                                    option={option23}
                                    onEvents={onEvents} style={{height: '60vh'}}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={8} style={{marginTop: 10}}>
                        <Col span={24}>
                            {/*表4-职业卫生技术服务机构统计分析表*/}
                            <Card
                                title={'职业卫生技术服务机构统计'}
                                bordered={false}
                                headStyle={{height: 57}}
                            >
                                <Table columns={this.state.option24Columns} dataSource={this.state.option24Data}
                                       style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={8} style={{marginTop: 10}}>
                        <Col span={12}>
                            {/*表5-职业健康检查机构统计分析表*/}
                            <Card
                                title={'职业健康检查机构统计'}
                                bordered={false}
                                headStyle={{height: 57}}
                            >
                                <Table columns={this.state.option25Columns} dataSource={this.state.option25Data}
                                       style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            {/*表6-职业病诊断机构统计分析表*/}
                            <Card
                                title={'职业病诊断机构统计'}
                                bordered={false}
                                headStyle={{height: 57}}
                            >
                                <Table columns={this.state.option26Columns} dataSource={this.state.option26Data}
                                       style={{height: 350, overflowY: 'scroll'}} size={'middle'}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </ConfigProvider>
        </div>
    }


}