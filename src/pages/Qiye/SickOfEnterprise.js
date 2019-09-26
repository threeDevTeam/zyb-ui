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
import SickOfEnterpriseDemoForm from '../QiyeDemoFrom/SickOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class SickOfEnterprise extends PureComponent {
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
                content: <SickOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/sickOfEnterprise/add', {data: {...values}}).then(res => {
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
        } else if ('edit' === type || 'view' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/zybadmin/sickOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <SickOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/sickOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除姓名=${this.state.record.name}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/sickOfEnterprise/delete?id=' + this.state.record.id).then(res => {
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
            <List url='/zybadmin/sickOfEnterprise/list'  onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="姓名" name="name"><Input/></Filter.Item>

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
                    <Table.Column title="id" dataIndex="id"/>
                    <Table.Column title="姓名" dataIndex="name"/>
                    <Table.Column title="身份证号" dataIndex="idNum"/>
                    <Table.Column title="职业病大类名称" dataIndex="sickBigName"/>
                    <Table.Column title="职业病小类名称" dataIndex="sickSmallName"/>
                    <Table.Column title="病人类别" dataIndex="type"/>
                    <Table.Column title="诊断机构" dataIndex="org"/>
                    <Table.Column title="诊断日期" dataIndex="checkDate"/>
                    <Table.Column title="诊断年份" dataIndex="checkYear"/>
                    <Table.Column title="诊断月份" dataIndex="checkMonth"/>
                    <Table.Column title="发病工龄" dataIndex="sickYear"/>
                    <Table.Column title="是否进行了职业病病人报告" dataIndex="isReport"/>
                    <Table.Column title="职业病损失工作日" dataIndex="workDay"/>
                    <Table.Column title="新增" dataIndex="increase"/>
                    <Table.Column title="累计" dataIndex="total"/>
                    <Table.Column title="转归情况" dataIndex="transform"/>
                    <Table.Column title="死亡日期" dataIndex="dieDate"/>
                    <Table.Column title="死亡年份" dataIndex="dieYear"/>
                    <Table.Column title="死亡月份" dataIndex="dieMonth"/>

                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default SickOfEnterprise