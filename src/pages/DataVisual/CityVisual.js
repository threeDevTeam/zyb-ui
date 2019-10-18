import React, {Component} from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import ScrollList from './ScrollList'
//安徽省->合肥市
export default class CityVisual extends Component {
    state = {}

    render() {
        return <div style={{width:500,height:800,background:'red'}}>
            <ScrollList option={{
                autoScroll:true,
                time:5000,
                width:500,
                height:100
            }}>
                <ul>
                    <li>aaa</li>
                    <li>bb</li>
                    <li>cc</li>
                    <li>dd</li>
                    <li>ee</li>
                    <li>ff</li>
                    <li>gg</li>
                    <li>hh</li>
                    <li>jj</li>
                    <li>kk</li>
                </ul>
            </ScrollList>
        </div>
    }
}