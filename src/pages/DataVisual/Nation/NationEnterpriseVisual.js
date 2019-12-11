import React, {Component} from 'react'
import {Button, Card, Col, Radio, Row, Select, Table} from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from "../../../utils/request"
import _ from 'lodash'
import {Modal} from "nowrapper/lib/antd"

let switchFlag = "no"
let currentYear = new Date().getFullYear()
//企业
export default class NationEnterpriseVisual extends Component {
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
        option21Category: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
    }
    data1 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type}
        }
        //option11
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option11', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option11Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option11Detail: res.data})
            }
        })
        //option12
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option12', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option12Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option12Detail: res.data})
            }
        })
        //option13
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option13', params).then(res => {
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
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option13Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option13Detail: res.data})
            }
        })
        //option14
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option14', params).then(res => {
            if (res && res.flag) {
                this.setState({option14Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option14Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option14Detail: res.data})
            }
        })
        //option15
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option25Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Detail: res.data})
            }
        })
    }

    data2 = (year, type) => {
        let params = {
            params: {year: year || this.state.year, type: type || this.state.type}
        }
        //option21
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option21', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option21Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option21Detail: res.data})
            }
        })
        //option22
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option22', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option22Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option22Detail: res.data})
            }
        })
        //option23
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option23', params).then(res => {
            if (res && res.flag) {
                let tmp = res.data
                let data = [['防护配备', '职业病防护设施设置率', '个人防护用品配备率']]
                let areaArr = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
                for (let i = 0; i < areaArr.length; i++) {
                    data.push(_.flatMapDeep(_.concat(areaArr[i], tmp['list' + i])))
                }
                //将数据处理成['北京',tmp.list0]
                this.setState({option23Dataset: data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option23Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option23Detail: res.data})
            }
        })
        //option24
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option24', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option24Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option24Detail: res.data})
            }
        })
        //option25
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option25', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Data: res.data})
            }
        })
        request('/zyb/nationEnterpriseVisual/' + switchFlag + '/option25Detail', params).then(res => {
            if (res && res.flag) {
                this.setState({option25Detail: res.data})
            }
        })
    }

    componentWillMount() {
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
        let option21Category = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
        let option22Category = ['香港', '新疆', '宁夏', '青海', '甘肃', '陕西', '西藏', '云南', '贵州', '四川', '重庆', '海南', '广西', '广东', '湖南', '湖北', '河南', '山东', '江西', '福建', '安徽', '浙江', '江苏', '上海', '黑龙江', '吉林', '辽宁', '内蒙古', '山西', '河北', '天津', '北京']
        this.setState({option11Indicator, option11Indicator2, option14Category, option21Category, option22Category})
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
            let option21Category = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港']
            let option22Category = ['香港', '新疆', '宁夏', '青海', '甘肃', '陕西', '西藏', '云南', '贵州', '四川', '重庆', '海南', '广西', '广东', '湖南', '湖北', '河南', '山东', '江西', '福建', '安徽', '浙江', '江苏', '上海', '黑龙江', '吉林', '辽宁', '内蒙古', '山西', '河北', '天津', '北京']
            this.setState({option21Category, option22Category})
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
            let option21Category = ['国有企业', '集体企业', '股份合作企业', '联营企业', '有限责任公司', '股份有限公司', '私营企业', '其他企业', '合资经营企业（港或澳、台资）', '合作经营企业（港或澳、台资）', '港、澳、台商独资经营企业', '港、澳、台商投资股份有限公司', '其他港、澳、台商投资企业', '中外合资经营企业', '中外合作经营企业', '外资企业', '外商投资股份有限公司', '其他外商投资企业', '事业单位', '社会团体']
            let option22Category = ['社会团体', '事业单位', '其他外商投资企业', '外商投资股份有限公司', '外资企业', '中外合作经营企业', '中外合资经营企业', '其他港、澳、台商投资企业', '港、澳、台商投资股份有限公司', '港、澳、台商独资经营企业', '合作经营企业（港或澳、台资）', '合资经营企业（港或澳、台资）', '其他企业', '私营企业', '股份有限公司', '有限责任公司', '联营企业', '股份合作企业', '集体企业', '国有企业']
            this.setState({option21Category, option22Category})
            this.data2(year, type)
            this.setState({
                display1: 'none',
                display2: 'none',
                display3: 'none',
                display4: 'block',
                display5: 'none'
            })
        } else if ("所属行业" === type) {
            let option21Category = ['煤炭开采和洗选业', '石油和天然气开采业', '黑色金属矿采选业', '有色金属矿采选业', '非金属矿采选业', '开采辅助活动', '其他采矿业', '农副食品加工业', '食品制造业', '酒、饮料和精制茶制造业', '烟草制品业 ', '纺织业', '纺织服装、服饰业', '皮革、毛皮、羽毛及其制品和制鞋业', '木材加工和木、竹、藤、棕、草制品业', '家具制造业 ', '造纸和纸制品业 ', '印刷和记录媒介复制业', '文教、工美、体育和娱乐用品制造业', '石油加工、炼焦和核燃料加工业 ', '化学原料和化学制品制造业', '医药制造业 ', '化学纤维制造业', '橡胶和塑料制品业', '非金属矿物制品业', '黑色金属冶炼和压延加工业 ', '有色金属冶炼和压延加工业 ', '金属制品业 ', '通用设备制造业', '专用设备制造业 ', '汽车制造业', '铁路、船舶、航空航天和其他运输设备制造业', '电气机械和器材制造业 ', '计算机、通信和其他电子设备制造业', '仪器仪表制造业', '其他制造业', '废弃资源综合利用业', '金属制品、机械和设备修理业', '电力、热力生产和供应业', '燃气生产和供应业', '水的生产和供应业']
            let option22Category = ['水的生产和供应业', '燃气生产和供应业', '电力、热力生产和供应业', '金属制品、机械和设备修理业', '废弃资源综合利用业', '其他制造业', '仪器仪表制造业', '计算机、通信和其他电子设备制造业', '电气机械和器材制造业 ', '铁路、船舶、航空航天和其他运输设备制造业', '汽车制造业', '专用设备制造业 ', '通用设备制造业', '金属制品业 ', '有色金属冶炼和压延加工业 ', '黑色金属冶炼和压延加工业 ', '非金属矿物制品业', '橡胶和塑料制品业', '化学纤维制造业', '医药制造业 ', '化学原料和化学制品制造业', '石油加工、炼焦和核燃料加工业 ', '文教、工美、体育和娱乐用品制造业', '印刷和记录媒介复制业', '造纸和纸制品业 ', '家具制造业 ', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '纺织服装、服饰业', '纺织业', '烟草制品业 ', '酒、饮料和精制茶制造业', '食品制造业', '农副食品加工业', '其他采矿业', '开采辅助活动', '非金属矿采选业', '有色金属矿采选业', '黑色金属矿采选业', '石油和天然气开采业', '煤炭开采和洗选业']
            this.setState({option21Category, option22Category})
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
                    key: 'var2'
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