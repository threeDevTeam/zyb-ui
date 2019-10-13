import React, {Component} from 'react'
import {message} from 'antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'
import request from "../../utils/request"
//国家
export default class NationVisual extends Component {
    state = {}

    render() {
        let option = {
            aria: {
                show: true
            },
            tooltip: {},
            color: ['red','green', 'blue', 'yellow', 'orange'],
            legend: {
                // orient: 'vertical',
                // left: 'left',
                data: ['暂无风险', '轻微风险(Ⅰ级)', '低度风险(Ⅱ级)', '中度风险(Ⅲ级)', '高度风险(Ⅳ级)']
            },
            visualMap: {
                min: 1,
                max: 5,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                seriesIndex: [1, 2, 3, 4, 5],
                inRange: {
                    color: ['green', 'blue', 'yellow', 'orange', 'red']
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
                    name: 'aaaaaaaaaaa',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: 0
                }, {
                    name: '暂无风险',
                    type: 'map',
                    geoIndex: 0,
                    data: [{name: '黑龙江', value: 1}]
                }, {
                    name: '轻微风险(Ⅰ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: [{name: '吉林', value: 2}]
                }, {
                    name: '低度风险(Ⅱ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: [{name: '辽宁', value: 3}]
                }, {
                    name: '中度风险(Ⅲ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: [{name: '内蒙古', value: 4}]
                }, {
                    name: '高度风险(Ⅳ级)',
                    type: 'map',
                    geoIndex: 0,
                    data: [{name: '新疆', value: 5}]
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