import React, {PureComponent} from 'react'
import {Card, message} from 'antd'
import List, {Filter, Table, Pagination} from 'nolist/lib/wrapper/antd'
import {Input, DatePicker, Dialog, Button} from 'nowrapper/lib/antd'
//antd、noform、nowrapper、nolist的样式
import 'antd/dist/antd.less'
import 'nowrapper/dist/antd/index.css'
import 'noform/dist/index.css'
import "nolist/dist/wrapper/antd.css"
//
import classNames from 'classnames'
import styles from './index.less'
//
import ZhenduanBasicOfServiceDemoForm from '../JiShuDemoFrom/ZhenduanBasicOfServiceDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class ZhenduanBasicOfService extends PureComponent {
    state = {}

    handleOperator = (type) => {
        const {dispatch} = this.props;
        if ('create' === type) {
            Dialog.show({
                title: '创建',
                footerAlign: 'label',
                locale: 'zh',
                width: 650,
                // style: {width: 1000},
                enableValidate: true,
                content: <ZhenduanBasicOfServiceDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/zhenduanBasicOfService/add', {data: {...values}}).then(res => {
                        if (res.flag) {
                            message.success("操作成功")
                            hide()
                            globalList.refresh()
                        } else {
                            message.error("操作失败")
                            hide()
                        }
                    })
                }
            })
        } else if ('edit' === type || 'view' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/zybadmin/zhenduanBasicOfService/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <ZhenduanBasicOfServiceDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/zhenduanBasicOfService/edit', {data: {...values}}).then(res => {
                                if (res.flag) {
                                    message.success("操作成功")
                                    hide()
                                    globalList.refresh()
                                } else {
                                    message.error("操作失败")
                                    hide()
                                }
                            })
                        }
                    })
                } else {
                    message.error("操作失败")
                }
            })
        } else if ('delete' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            Dialog.show({
                title: '提示',
                footerAlign: 'label',
                locale: 'zh',
                style: {width: '400px'},
                content: `确定要删除机构名称=${this.state.record.name}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/zhenduanBasicOfService/delete?id=' + this.state.record.id).then(res => {
                        hide()
                        if (res.flag) {
                            globalList.refresh()
                            message.success("删除成功")
                        } else {
                            message.error("删除失败")
                        }
                    })
                }
            })
        }
    }

    handleError = (err) => {
        console.log('err', err);
    }

    onMount = (list) => {
        this.list = globalList = list;
    }

    clickOperation = (type, record) => {
        // console.log(type, record)
        this.setState({record})
        if ('onDoubleClick' === type) {
            this.handleOperator('edit')
        }
    }

    render() {
        return (
            <List url='/zybadmin/zhenduanBasicOfService/list'  onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="机构名称" name="name"><Input/></Filter.Item>
                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>创建</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                            className={styles.marginLeft20}>编辑</Button>
                    <Button icon="search" type="primary" onClick={() => this.handleOperator('view')}
                            className={styles.marginLeft20}>浏览</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                            className={styles.marginLeft20}>删除</Button>
                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="机构名称" dataIndex="name"/>
                    <Table.Column title="社会统一代码" dataIndex="code"/>
                    <Table.Column title="申报年份" dataIndex="year"/>
                    <Table.Column title="省的名称" dataIndex="provinceName"/>
                    <Table.Column title="市的名称" dataIndex="cityName"/>
                    <Table.Column title="区的名称" dataIndex="districtName"/>
                    <Table.Column title="注册地址" dataIndex="registerAddress"/>
                    <Table.Column title="登记注册类型的大类名称" dataIndex="registerBigName"/>
                    <Table.Column title="登记注册类型的小类名称" dataIndex="registerSmallName"/>
                    <Table.Column title="资质等级" dataIndex="level"/>
                    <Table.Column title="资质证书编号" dataIndex="num"/>
                    <Table.Column title="诊断医师数量" dataIndex="doctorNum"/>
                    <Table.Column title="诊断项目数量" dataIndex="projectCount"/>
                    <Table.Column title="诊断能力" dataIndex="scope"/>
                    <Table.Column title="医院等级" dataIndex="hospitalLevel"/>

                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default ZhenduanBasicOfService