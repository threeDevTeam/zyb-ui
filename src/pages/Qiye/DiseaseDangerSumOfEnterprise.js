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
import DiseaseDangerSumOfEnterpriseDemoForm from '../QiyeDemoFrom/DiseaseDangerSumOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class DiseaseDangerSumOfEnterprise extends PureComponent {
    state = {}
    isShowAddButton = () => {
        let type = sessionStorage.getItem('type')
        if ('管理员' === type) {
        } else {
            return <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}
                           className={styles.marginRight20}>新增</Button>
        }
    }
    handleOperator = (type) => {
        const {dispatch} = this.props;
        if ('create' === type) {
            Dialog.show({
                title: '新增',
                footerAlign: 'label',
                locale: 'zh',
                width: 650,
                // style: {width: 1000},
                enableValidate: true,
                content: <DiseaseDangerSumOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zyb/diseaseDangerSumOfEnterprise/add', {data: {...values}}).then(res => {
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
            request('/zyb/diseaseDangerSumOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res && res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <DiseaseDangerSumOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zyb/diseaseDangerSumOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除月份=${this.state.record.month}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zyb/diseaseDangerSumOfEnterprise/delete?id=' + this.state.record.id).then(res => {
                        hide()
                        if (res && res.flag) {
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
    }

    onMount = (list) => {
        this.list = globalList = list;
    }

    clickOperation = (type, record) => {
        this.setState({record})
        if ('onDoubleClick' === type) {
            this.handleOperator('edit')
        }
    }

    render() {
        return (
            <List url='/zyb/diseaseDangerSumOfEnterprise/list' onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="月份" name="month"><Input/></Filter.Item>


                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    {this.isShowAddButton()}
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                           >编辑</Button>
                    <Button icon="eye" type="primary" onClick={() => this.handleOperator('view')}
                            className={styles.marginLeft20}>浏览</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                            className={styles.marginLeft20}>删除</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                            className={styles.marginLeft20} href={'/zyb/excelTemplate/download'+window.location.pathname.replace("/zyb","")}>下载模板</Button>

                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="接触职业病危害总人数" dataIndex="total"/>
                    <Table.Column title="接触粉尘人数" dataIndex="dust"/>
                    <Table.Column title="接触化学因素人数" dataIndex="chemistry "/>
                    <Table.Column title="接触物理因素人数" dataIndex="physical "/>
                    <Table.Column title="接触放射性因素人数" dataIndex="radioactivity"/>
                    <Table.Column title="接触生物因素人数" dataIndex="biology"/>
                    <Table.Column title="年份" dataIndex="year"/>
                    <Table.Column title="月份" dataIndex="month"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default DiseaseDangerSumOfEnterprise