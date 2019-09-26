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
import ProcuctionOfEnterpriseDemoForm from '../QiyeDemoFrom/ProcuctionOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class ProcuctionOfEnterprise extends PureComponent {
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
                content: <ProcuctionOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/procuctionOfEnterprise/add', {data: {...values}}).then(res => {
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
            request('/zybadmin/procuctionOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <ProcuctionOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/procuctionOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除产品名称=${this.state.record.name}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/procuctionOfEnterprise/delete?id=' + this.state.record.id).then(res => {
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
            <List url='/zybadmin/procuctionOfEnterprise/list'onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="产品名称" name="name"><Input/></Filter.Item>
                    <Filter.Item label="产量类型" name="productionType"><Input/></Filter.Item>
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
                    <Table.Column title="产品名称" dataIndex="name"/>
                    <Table.Column title="产品状态" dataIndex="status"/>
                    <Table.Column title="产品年产量" dataIndex="yearNumber"/>
                    <Table.Column title="产量类型" dataIndex="productionType"/>
                    <Table.Column title="中间品名称" dataIndex="middleName"/>
                    <Table.Column title="中间品状态" dataIndex="middleStatus"/>
                    <Table.Column title="中间品年产量" dataIndex="middleYearNumber"/>
                    <Table.Column title="原辅料名称" dataIndex="materialName"/>
                    <Table.Column title="原辅料状态" dataIndex="materialStatus"/>
                    <Table.Column title="原辅料年用量" dataIndex="materialYearNumber"/>
                    <Table.Column title="用量类型" dataIndex="materialType"/>
                    <Table.Column title="主要生产工艺描述" dataIndex="describee"/>
                    <Table.Column title="是否存在职业病危害工艺岗位" dataIndex="isExist"/>
                    <Table.Column title="是否优先采用有利于职业病防治和保护劳动者健康的新技术、新工艺和新材料" dataIndex="isFisrt"/>
                    <Table.Column title="是否使用国家明令禁止的可能产生职业病危害的设备和材料" dataIndex="isUse"/>
                    <Table.Column title="可能产生职业病危害的设备、化学品是否有中文说明书" dataIndex="isHave"/>

                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default ProcuctionOfEnterprise