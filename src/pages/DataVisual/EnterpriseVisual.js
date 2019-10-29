import React, {Component} from 'react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs} from 'antd'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
//企业
export default class EnterpriseVisual extends Component {
    state = {}

    componentWillMount() {
    }

    render() {
        return <div>
            <Row gutter={16}>
                <Col span={24}>
                    <div style={{background: '#fff'}}>aaaaaaa</div>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop: 20}}>
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