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
import PostDangerOfEnterpriseDemoForm from '../QiyeDemoFrom/PostDangerOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class PostDangerOfEnterprise extends PureComponent {
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
                content: <PostDangerOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/postDangerOfEnterprise/add', {data: {...values}}).then(res => {
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
            request('/zybadmin/postDangerOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <PostDangerOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/postDangerOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除申报时间=${this.state.record.upDatee}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/postDangerOfEnterprise/delete?id=' + this.state.record.id).then(res => {
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
            <List url='/zybadmin/postDangerOfEnterprise/list' onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="申报时间" name="upDatee"><Input/></Filter.Item>
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
                    <Table.Column title="申报时间" dataIndex="upDatee"/>
                    <Table.Column title="申报年份" dataIndex="upYear"/>
                    <Table.Column title="申报月份" dataIndex="upMonth"/>
                    <Table.Column title="职业病危害因素大类名称" dataIndex="dangerBigName"/>
                    <Table.Column title="职业病危害因素小类名称" dataIndex="dangerSmallName"/>
                    <Table.Column title="可能导致的职业病大类名称" dataIndex="sickBigName"/>
                    <Table.Column title="可能导致的职业病小类名称" dataIndex="sickSmallName"/>
                    <Table.Column title="可能引起的急性职业伤害" dataIndex="hurt"/>
                    <Table.Column title="接害人数" dataIndex="touchNum"/>
                    <Table.Column title="工作时间" dataIndex="workTime"/>
                    <Table.Column title="接触时间" dataIndex="touchTime"/>
                    <Table.Column title="接触频次" dataIndex="touchFrequency"/>
                    <Table.Column title="作业方式" dataIndex="touchMode"/>

                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default PostDangerOfEnterprise