import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio} from 'antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
//企业
export default class EnterpriseVisual extends Component {
    state = {
        year: '2019',
        type: '危害因素'
    }

    componentWillMount() {
    }

    yearOnChange = year => this.setState({year})

    typeOnChange = type => this.setState({type})

    render() {
        return <div>
            <Row gutter={16}>
                <Col span={24}>
                    <div style={{background: '#fff', height: 50}}>
                        <Select onChange={this.yearOnChange} defaultValue="2019" size={'large'}
                                style={{width: 120, marginLeft: 18, marginTop: 8,marginRight:10}}>
                            <Select.Option value="2019">2019</Select.Option>
                            <Select.Option value="2018">2018</Select.Option>
                            <Select.Option value="2017">2017</Select.Option>
                        </Select>
                        <Radio.Group onChange={this.typeOnChange} defaultValue="危害因素" size={'large'} >
                            <Radio.Button value="危害因素">危害因素</Radio.Button>
                            <Radio.Button value="行政区划">行政区划</Radio.Button>
                            <Radio.Button value="企业规模">企业规模</Radio.Button>
                            <Radio.Button value="登记注册类型">登记注册类型</Radio.Button>
                            <Radio.Button value="所属行业">所属行业</Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card
                        bordered={false}
                        style={{height: '90vh'}}
                        headStyle={{border: 0}}
                        // extra={<Button type="dashed" onClick={() => this.detailData('one')}>详细数据</Button>}
                    >
                        aaaaaaaaaaaaaaaaa
                    </Card>
                </Col>
            </Row>
        </div>
    }
}