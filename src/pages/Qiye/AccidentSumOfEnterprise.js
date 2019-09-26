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
import AccidentSumOfEnterpriseDemoForm from '../QiyeDemoFrom/AccidentSumOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class AccidentSumOfEnterprise extends PureComponent {
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
                content: <AccidentSumOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/accidentSumOfEnterprise/add', {data: {...values}}).then(res => {
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
            request('/zybadmin/accidentSumOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <AccidentSumOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/accidentSumOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除职业病危害事故编号=${this.state.record.accidentNum}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/accidentSumOfEnterprise/delete?id=' + this.state.record.id).then(res => {
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
            <List url='/zybadmin/accidentSumOfEnterprise/list' pageSize={2} onError={this.handleError} onMount={this.onMount}>
                <Filter cols={5}>
                    <Filter.Item label="职业病危害事故编号" name="accidentNum"><Input/></Filter.Item>

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
                    <Table.Column title="职业病危害事故编号" dataIndex="accidentNum"/>
                    <Table.Column title="事故发生时间" dataIndex="startTime"/>
                    <Table.Column title="事故发生地点" dataIndex="place"/>
                    <Table.Column title="导致事故的职业病危害因素大类名称" dataIndex="dangerBigName"/>
                    <Table.Column title="导致事故的职业病危害因素小类名称" dataIndex="dangerSmallName"/>
                    <Table.Column title="发病人数" dataIndex="sickCount"/>
                    <Table.Column title="送医院治疗人数" dataIndex="treatCount"/>
                    <Table.Column title="死亡人数" dataIndex="dieCount"/>
                    <Table.Column title="直接经济损失" dataIndex="directLose"/>
                    <Table.Column title="间接经济损失" dataIndex="indirectLose"/>
                    <Table.Column title="事故原因" dataIndex="reason"/>
                    <Table.Column title="事故经过" dataIndex="process"/>
                    <Table.Column title="是否向有关部门报告" dataIndex="isReport"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default AccidentSumOfEnterprise