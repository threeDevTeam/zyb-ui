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
import RoleManagementFrom from '../SystemsetupFrom/RoleManagementFrom'
import AuthorizationFrom from '../SystemsetupFrom/AuthorizationFrom'
import BindUserFrom from '../SystemsetupFrom/BindUserFrom'
import {connect} from 'dva'
import request from '../../utils/request'

import _ from 'lodash'


let globalList

// @connect(({demo}) => ({demo}))
class RoleManagement extends PureComponent {
    state = {}

    handleOperator = (type) => {

        if (!this.state.record) {
            message.warning('请先单击一条数据!')
            return
        }
        request('/zyb/sysRoleMenu/getById?id=' + this.state.record.id).then(res => {
            if ('authorization' === type) {
                Dialog.show({
                    title: '授权',
                    footerAlign: 'label',
                    locale: 'zh',
                    width: 650,
                    // style: {width: 1000},
                    enableValidate: true,
                    content: <AuthorizationFrom option={{type, record: res.data}}/>,
                    onOk: (values, hide) => {
                        request.post('/zyb/sysRoleMenu/add?id=' + this.state.record.id, {data: {...values}}).then(res => {
                            if (res && res.flag) {
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
            }
        })
        if (!this.state.record) {
            message.warning('请先单击一条数据!')
            return
        }

        request('/zyb/sysRoleUser/getById?id=' + this.state.record.id).then(res => {
            if ('BindUser' === type) {
                Dialog.show({
                    title: '绑定用户',
                    footerAlign: 'label',
                    locale: 'zh',
                    width: 650,
                    // style: {width: 1000},
                    enableValidate: true,
                    content: <BindUserFrom option={{type, record: res.data}}/>,
                    onOk: (values, hide) => {
                        console.log(values)
                        request.post('/zyb/sysRoleUser/add?id=' + this.state.record.id, {data: {...values}}).then(res => {
                            if (res && res.flag) {
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

            }
        })
        if ('edit' === type || 'view' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/zyb/sysRole/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <RoleManagementFrom option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zyb/sysRole/edit', {data: {...values}}).then(res => {
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
        } else if ('download' === type) {

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
            <List url='/zyb/sysRole/list' onError={this.handleError} onMount={this.onMount}>

                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="plus" type="primary" onClick={() => this.handleOperator2('create')}>新增</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                            className={styles.marginLeft20}>编辑</Button>
                    <Button icon="eye" type="primary" onClick={() => this.handleOperator('view')}
                            className={styles.marginLeft20}>浏览</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('authorization')}
                            className={styles.marginLeft20}>授权</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('BindUser')}
                            className={styles.marginLeft20}>绑定用户</Button>
                    <div style={{float: 'right'}}>
                        <Filter noDefaultLayout>
                            <Filter.Item label="角色名称：" name="name"><Input/></Filter.Item>
                            <Filter.Search><Button icon="search" type='primary'>查询</Button></Filter.Search>
                        </Filter>
                    </div>
                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="id" dataIndex="id"/>
                    <Table.Column title="角色名称" dataIndex="name"/>

                </Table>
                <Pagination/>
            </List>
        )
    }

    handleOperator2(type) {
        const {dispatch} = this.props;
        if ('create' === type) {
            Dialog.show({
                title: '新增',
                footerAlign: 'label',
                locale: 'zh',
                width: 650,
                // style: {width: 1000},
                enableValidate: true,
                content: <RoleManagementFrom option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zyb/sysRole/add', {data: {...values}}).then(res => {
                        if (res && res.flag) {
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
        }
    }
}

export default RoleManagement