import React, {Component} from 'react'
import {message} from 'antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'
import request from "../../utils/request"
import lbx from '../../assets/lbx.png'
//国家
export default class NationVisual extends Component {
    state = {}

    componentWillMount() {
        request('/zybadmin/nationVisual/get').then(res => {
            if (res && res.flag) {
                this.setState({provinceData: res.data})
            }
        })
    }

    render() {
        let option = {
            tooltip: {},
            legend: {
                show: false,
                data: ['暂无风险', '轻微风险(Ⅰ级)', '低度风险(Ⅱ级)', '中度风险(Ⅲ级)', '高度风险(Ⅳ级)']
            },
            visualMap: {
                // show: false,
                min: 0,
                max: 4,
                left: 'right',
                // top: 'bottom',
                text: ['高', '低'],
                seriesIndex: [0, 1, 2, 3, 4],
                inRange: {
                    color: ['#CCFFCC', 'blue', 'yellow', 'orange', 'red']
                },
                calculable: true
            },
            geo: {
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
                    data: this.state.provinceData && this.state.provinceData.zero
                }, {
                    name: '轻微风险(Ⅰ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.provinceData && this.state.provinceData.one
                }, {
                    name: '低度风险(Ⅱ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.provinceData && this.state.provinceData.two
                }, {
                    name: '中度风险(Ⅲ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.provinceData && this.state.provinceData.three
                }, {
                    name: '高度风险(Ⅳ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: this.state.provinceData && this.state.provinceData.four
                },
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: 0
                }
            ]
        }
        let onEvents = {
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
        return <div>
            <ReactEcharts
                option={option}
                onEvents={onEvents}
                style={{height: '100vh', width: '100%'}}/>
        </div>
    }
}