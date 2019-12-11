import React, {Component} from 'react'
import {Button, Card, Col, Radio, Row, Select, Table} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import {Modal} from "nowrapper/lib/antd"

let switchFlag = "no"
let currentYear = new Date().getFullYear()
let areaQuery = {}
//企业
export default class OtherEnterpriseVisual extends Component {
    state = {
        display1: 'block',
        display2: 'none',
        display3: 'none',
        display4: 'none',
        display5: 'none',
        year: currentYear,
        type: '危害因素',
        option11Data: [],
        option23Dataset: [['防护配备', '职业病防护设施设置率', '个人防护用品配备率']],
        option11Indicator: [],
        option11Indicator2: [],
        option13Dataset: [['防护配备', '职业病防护设施设置率', '个人防护用品配备率']],
        option14Category: ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素'],
        option21Category: []
    }
    data1 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type, ...areaQuery}
        }
        //option11
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option11', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option11Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Detail: res.data})
            }
        })
        //option12
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option12', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option12Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Detail: res.data})
            }
        })
        //option13
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option13', params).then(res => {
            if (res && res.flag) {
                let type = this.state.type
                let arr = []
                if ('危害因素' === type) {
                    arr = ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
                } else {
                    arr = ['微型', '小型', '中型', '大型']
                }

                let tmp = res.data
                let data = [['防护配备', '职业病防护设施设置率', '个人防护用品配备率']]
                for (let i = 0; i < arr.length; i++) {
                    data.push(_.flatMapDeep(_.concat(arr[i], tmp['list' + i])))
                }
                //将数据处理成['北京',tmp.list0]
                this.setState({option13Dataset: data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option13Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Detail: res.data})
            }
        })
        //option14
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option14', params).then(res => {
            if (res && res.flag) {
                this.setState({option14Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option14Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option14Detail: res.data})
            }
        })
        //option15
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option25Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Detail: res.data})
            }
        })
    }

    data2 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type, ...areaQuery}
        }
        //option21
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option21', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option21Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Detail: res.data})
            }
        })
        //option22
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option22', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option22Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Detail: res.data})
            }
        })
        //option23
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option23', params).then(res => {
            if (res && res.flag) {
                let tmp = res.data
                let data = [['防护配备', '职业病防护设施设置率', '个人防护用品配备率']]
                let areaArr = this.state.option21Category
                for (let i = 0; i < areaArr.length; i++) {
                    data.push(_.flatMapDeep(_.concat(areaArr[i], tmp['list' + i])))
                }
                //将数据处理成['北京',tmp.list0]
                this.setState({option23Dataset: data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option23Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option23Detail: res.data})
            }
        })
        //option24
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option24', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option24Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Detail: res.data})
            }
        })
        //option25
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        request('/zyb/otherEnterpriseVisual/' + switchFlag + '/option25Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Detail: res.data})
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

    industryCategory = () => {
        request('/zyb/categoryController/getIndustryStrList').then(res => {
            if (res && res.flag) {
                this.setState({option21Category: res.data})
            }
        })
        request('/zyb/categoryController/getIndustryReverseStrList').then(res => {
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

        let option11Indicator = [
            {name: '接害率', max: 100},
            {name: '接触粉尘危害率', max: 100},
            {name: '接触化学因素率', max: 100},
            {name: '接触物理因素危害率', max: 100},
            {name: '接触放射性因素危害率', max: 100},
            {name: '接触生物因素危害率', max: 100}
        ]
        let option11Indicator2 = ['生物因素', '放射性因素', '物理因素', '化学因素', '粉尘']
        let option14Category = ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
        this.setState({option11Indicator, option11Indicator2, option14Category})
        this.areaCategory()
        this.data1()
    }

    yearOnChange = year => {
        this.setState({year})
        //
        let type = this.state.type
        if ("危害因素" === type || "企业规模" === type) {
            this.data1(year, type)
        } else if ("行政区划" === type || "登记注册类型" === type || "所属行业" === type) {
            this.data2(year, type)
        }
    }

    typeOnChange = obj => {
        let type = obj.target.value
        this.setState({type})
        //
        let year = this.state.year
        if ("危害因素" === type) {
            let option11Indicator = [
                {name: '接害率', max: 100},
                {name: '接触粉尘危害率', max: 100},
                {name: '接触化学因素率', max: 100},
                {name: '接触物理因素危害率', max: 100},
                {name: '接触放射性因素危害率', max: 100},
                {name: '接触生物因素危害率', max: 100}
            ]
            let option11Indicator2 = ['生物因素', '放射性因素', '物理因素', '化学因素', '粉尘']
            let option14Category = ['粉尘', '化学因素', '物理因素', '放射性因素', '生物因素']
            this.setState({option11Indicator, option11Indicator2, option14Category})
            this.data1(year, type)
            this.setState({
                display1: 'block',
                display2: 'none',
                display3: 'none',
                display4: 'none',
                display5: 'none'
            })
        } else if ("行政区划" === type) {
            this.areaCategory()
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'block',
                display3: 'none',
                display4: 'none',
                display5: 'none'
            })
        } else if ("企业规模" === type) {
            let option11Indicator = [
                {name: '接害率', max: 100},
                {name: '微型', max: 100},
                {name: '小型', max: 100},
                {name: '中型', max: 100},
                {name: '大型', max: 100}
            ]
            let option11Indicator2 = ['大型', '中型', '小型', '微型']
            let option14Category = ['微型', '小型', '中型', '大型']
            this.setState({option11Indicator, option11Indicator2, option14Category})
            this.data1(year, type)
            this.setState({
                display1: 'none',
                display2: 'none',
                display3: 'block',
                display4: 'none',
                display5: 'none'
            })
        } else if ("登记注册类型" === type) {
            this.registerTypeCategory()
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'none',
                display3: 'none',
                display4: 'block',
                display5: 'none'
            })
        } else if ("所属行业" === type) {
            this.industryCategory()
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'none',
                display3: 'none',
                display4: 'none',
                display5: 'block'
            })
        }
    }

    detailData = (type) => {
        let dataSource = this.state[type + 'Detail']
        let columns = []
        let title = ''
        let width = '90vw'
        let pagination = true
        if ('危害因素' === this.state.type || '企业规模' === this.state.type) {
            pagination = false
        }
        if ('option11' === type || 'option21' === type) {
            title = ''
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '用人单位数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '从业人数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '接触职业病危害人数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '接害率',
                    dataIndex: 'var4',
                    key: 'var4'
                },
                {
                    title: '接触粉尘危害人数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '接尘率',
                    dataIndex: 'var6',
                    key: 'var6'
                },
                {
                    title: '接触化学因素危害人数',
                    dataIndex: 'var7',
                    key: 'var7',
                    sorter: (a, b) => a.var7 - b.var7
                },
                {
                    title: '接毒率',
                    dataIndex: 'var8',
                    key: 'var8'
                },
                {
                    title: '接触物理因素危害人数',
                    dataIndex: 'var9',
                    key: 'var9',
                    sorter: (a, b) => a.var9 - b.var9
                },
                {
                    title: '接触物理因素危害率',
                    dataIndex: 'var10',
                    key: 'var10'
                },
                {
                    title: '接触放射性因素危害人数',
                    dataIndex: 'var11',
                    key: 'var11',
                    sorter: (a, b) => a.var11 - b.var11
                },
                {
                    title: '接触放射性因素危害率',
                    dataIndex: 'var12',
                    key: 'var12'
                },
                {
                    title: '接触生物因素危害人数',
                    dataIndex: 'var13',
                    key: 'var13',
                    sorter: (a, b) => a.var13 - b.var13
                },
                {
                    title: '接触生物因素危害率',
                    dataIndex: 'var14',
                    key: 'var14'
                }
            ]
        } else if ('option12' === type || 'option22' === type) {
            title = ''
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '应检点数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '实检点数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '检测率',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '达标点数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '达标率',
                    dataIndex: 'var5',
                    key: 'var5'
                }
            ]
            width = '70vw'
        } else if ('option13' === type || 'option23' === type) {
            title = ''
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '存在职业病危害岗位数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '设置职业病防护设施岗位数',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '职业病防护设施设置率',
                    dataIndex: 'var3',
                    key: 'var3'
                },
                {
                    title: '配备个体防护用品岗位数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '个人防护用品配备率',
                    dataIndex: 'var5',
                    key: 'var5'
                }
            ]
        } else if ('option14' === type || 'option24' === type) {
            title = ''
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '体检人数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '体检率',
                    dataIndex: 'var2',
                    key: 'var2',
                    sorter: (a, b) => a.var2 - b.var2
                },
                {
                    title: '疑似职业病人数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '新增职业病病人数',
                    dataIndex: 'var4',
                    key: 'var4',
                    sorter: (a, b) => a.var4 - b.var4
                },
                {
                    title: '累计职业病病人数',
                    dataIndex: 'var5',
                    key: 'var5',
                    sorter: (a, b) => a.var5 - b.var5
                },
                {
                    title: '累计职业病患病率',
                    dataIndex: 'var6',
                    key: 'var6'
                },
                {
                    title: '新增职业病死亡人数',
                    dataIndex: 'var7',
                    key: 'var7',
                    sorter: (a, b) => a.var7 - b.var7
                },
                {
                    title: '累计职业病死亡人数',
                    dataIndex: 'var8',
                    key: 'var8',
                    sorter: (a, b) => a.var8 - b.var8
                },
                {
                    title: '累计职业病病死率',
                    dataIndex: 'var9',
                    key: 'var9'
                },
                {
                    title: '损失工作日',
                    dataIndex: 'var10',
                    key: 'var10',
                    sorter: (a, b) => a.var10 - b.var10
                }
            ]
            width = '95vw'
        } else if ('option25' === type) {
            title = ''
            columns = [
                {
                    title: this.state.type,
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '签订劳动合同人数',
                    dataIndex: 'var1',
                    key: 'var1',
                    sorter: (a, b) => a.var1 - b.var1
                },
                {
                    title: '劳动合同签订率',
                    dataIndex: 'var2',
                    key: 'var2'
                },
                {
                    title: '缴纳工伤保险人数',
                    dataIndex: 'var3',
                    key: 'var3',
                    sorter: (a, b) => a.var3 - b.var3
                },
                {
                    title: '工伤保险参保率',
                    dataIndex: 'var4',
                    key: 'var4'
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
        //危害因素、企业规模
        let option11 = {
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
                indicator: this.state.option11Indicator
            },
            series: [{
                name: '危害',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: this.state.option11Data,
                        name: '危害率'
                    }
                ]
            }]
        };
        let option12 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['检测率', '达标率', '损失率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: this.state.option11Indicator2
                }
            ],
            series: [
                {
                    name: '检测率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: this.state.option12Data && this.state.option12Data.list1
                },
                {
                    name: '达标率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.state.option12Data && this.state.option12Data.list2
                },
                {
                    name: '损失率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data: this.state.option12Data && this.state.option12Data.list3
                }
            ]
        };
        let option13 = {
            color: ['#1890FF', 'rgb(19, 194, 194)'],
            legend: {},
            tooltip: {},
            dataset: {
                source: this.state.option13Dataset
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: [
                {type: 'bar'},
                {type: 'line'}
            ]
        };
        let option14 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['体检率', '累计职业病患病率', '累计职业病病死率']
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
                data: this.state.option14Category
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '体检率',
                    type: 'line',
                    data: this.state.option14Data && this.state.option14Data.list1
                },
                {
                    name: '累计职业病患病率',
                    type: 'line',
                    data: this.state.option14Data && this.state.option14Data.list2
                },
                {
                    name: '累计职业病病死率',
                    type: 'line',
                    data: this.state.option14Data && this.state.option14Data.list3
                }
            ]
        };
        let option15 = {
            color: ['#1890FF', 'rgb(19, 194, 194)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['劳动合同签订率', '工伤保险参保率']
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
                    data: ['微型', '小型', '中型', '大型']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '劳动合同签订率',
                    type: 'bar',
                    data: this.state.option25Data && this.state.option25Data.list1
                },
                {
                    name: '工伤保险参保率',
                    type: 'bar',
                    data: this.state.option25Data && this.state.option25Data.list2
                }
            ]
        };
        //行政区划、登记注册类型、所属行业
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
                data: ['检测率', '达标率', '损失率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: this.state.option22Category
                }
            ],
            series: [
                {
                    name: '检测率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: this.state.option22Data && this.state.option22Data.list1
                },
                {
                    name: '达标率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.state.option22Data && this.state.option22Data.list2
                },
                {
                    name: '损失率',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data: this.state.option22Data && this.state.option22Data.list3
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
        };
        let option23 = {
            color: ['#1890FF', 'rgb(19, 194, 194)'],
            legend: {},
            tooltip: {},
            dataset: {
                source: this.state.option23Dataset
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: [
                {type: 'bar'},
                {type: 'line'}
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
        let option24 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['体检率', '累计职业病患病率', '累计职业病病死率']
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
                    name: '体检率',
                    type: 'line',
                    data: this.state.option24Data && this.state.option24Data.list1
                },
                {
                    name: '累计职业病患病率',
                    type: 'line',
                    data: this.state.option24Data && this.state.option24Data.list2
                },
                {
                    name: '累计职业病病死率',
                    type: 'line',
                    data: this.state.option24Data && this.state.option24Data.list3
                }
            ]
        };
        let option25 = {
            color: ['#1890FF', 'rgb(19, 194, 194)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['劳动合同签订率', '工伤保险参保率']
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
                    name: '劳动合同签订率',
                    type: 'bar',
                    stack: '劳动',
                    data: this.state.option25Data && this.state.option25Data.list1
                },
                {
                    name: '工伤保险参保率',
                    type: 'bar',
                    stack: '劳动',
                    data: this.state.option25Data && this.state.option25Data.list2
                }
            ]
        };

        let yearSelect = []
        for (let i = currentYear; i > (currentYear - 10); i--) {
            yearSelect.push(<Select.Option value={i}>{i}</Select.Option>);
        }
        return <div>
            <Row gutter={8}>
                <Col span={24}>
                    <div style={{background: '#fff', height: 60}}>
                        <Select onChange={this.yearOnChange} defaultValue={this.state.year} size={'large'}
                                style={{width: 120, marginLeft: 18, marginTop: 8, marginRight: 10}}>
                            {yearSelect}
                        </Select>
                        <Radio.Group onChange={this.typeOnChange} defaultValue={this.state.type} size={'large'}>
                            <Radio.Button value="危害因素">危害因素</Radio.Button>
                            <Radio.Button value="行政区划">行政区划</Radio.Button>
                            <Radio.Button value="企业规模">企业规模</Radio.Button>
                            <Radio.Button value="登记注册类型">登记注册类型</Radio.Button>
                            <Radio.Button value="所属行业">所属行业</Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>
            {/*危害因素*/}
            <div style={{display: this.state.display1}}>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option11')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option11}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option12')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option12}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={12}>
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option13')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option13}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option14')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option14}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/*行政区划*/}
            <div style={{display: this.state.display2}}>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={24}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option24')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option24}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-9 基础信息统计分析表（按行政区划续4）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option25')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option25}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/*企业规模*/}
            <div style={{display: this.state.display3}}>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={9}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option11')}>详细数据</Button>}
                            style={{marginBottom: 10}}
                        >
                            <ReactEcharts
                                option={option11}
                                onEvents={onEvents} style={{height: 164}}/>
                        </Card>
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option25')}>详细数据</Button>}
                            style={{marginBottom: 10}}
                        >
                            <ReactEcharts
                                option={option15}
                                onEvents={onEvents} style={{height: 150}}/>
                        </Card>
                    </Col>
                    <Col span={15} style={{marginBottom: 10}}>
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option12')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option12}
                                onEvents={onEvents} style={{height: 428}}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option13')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option13}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option14')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option14}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/*登记注册类型*/}
            <div style={{display: this.state.display4}}>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={24}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option24')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option24}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-9 基础信息统计分析表（按行政区划续4）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option25')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option25}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/*所属行业*/}
            <div style={{display: this.state.display5}}>
                <Row gutter={8} style={{marginTop: 10}}>
                    <Col span={24}>
                        {/*表2-1 基础信息统计分析表（按危害因素）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-2 基础信息统计分析表（按危害因素续1）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                        {/*表2-3 基础信息统计分析表（按危害因素续2）*/}
                        <Card
                            title={'基础信息统计分析表'}
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
                    <Col span={12}>
                        {/*表2-4 基础信息统计分析表（按危害因素续3）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option24')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option24}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/*表2-9 基础信息统计分析表（按行政区划续4）*/}
                        <Card
                            title={'基础信息统计分析表'}
                            bordered={false}
                            headStyle={{height: 57}}
                            extra={<Button type="dashed" onClick={() => this.detailData('option25')}>详细数据</Button>}
                        >
                            <ReactEcharts
                                option={option25}
                                onEvents={onEvents} style={{height: '60vh'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    }
}