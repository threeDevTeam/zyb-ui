import React, {PureComponent} from 'react'
import {Card, message, Modal, Spin} from 'antd'
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
import EquipmentOfSuperviseDemoForm from '../ZhengfuDemoFrom/EquipmentOfSuperviseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'
import FileForm from "../FileUpDown/FileForm";


let globalList

// @connect(({demo}) => ({demo}))
class EquipmentOfSupervise extends PureComponent {
    state = { fileList: []
    }
    putFileToState = file => {
        this.setState({fileList: [...this.state.fileList, file]})
        return false
    }

    handleOperator = (type) => {
        const {dispatch} = this.props;
        if ('create' === type) {
            Dialog.show({
                title: '新增',
                footerAlign: 'label',
                locale: 'zh',
                width: 550,
                // style: {width: 1000},
                enableValidate: true,
                content: <EquipmentOfSuperviseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    if (values.buyDateStr) {
                        values.buyDateStr = values.buyDateStr.format('YYYY-MM-DD')
                    }
                    request.post('/zyb/equipmentOfSupervise/add', {data: {...values}}).then(res => {
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
            request('/zyb/equipmentOfSupervise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 550,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <EquipmentOfSuperviseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            if (values.buyDateStr) {
                                values.buyDateStr = values.buyDateStr.format('YYYY-MM-DD')
                            }
                            request.post('/zyb/equipmentOfSupervise/edit', {data: {...values}}).then(res => {
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
        }else if ('upExcel' === type) {
            Dialog.show({
                title: '',
                footerAlign: 'label',
                locale: 'zh',
                width: 300,
                enableValidate: true,
                content: <FileForm putFileToState={this.putFileToState}/>,
                onOk: (values, hide) => {
                    hide()
                    //准备附件数据
                    const formData = new FormData();
                    this.state.fileList.forEach((file) => {
                        formData.append('files', file)
                    })
                    const modal = Modal.info({
                        title: '提示',
                        content: <div><Spin/>正在操作中...</div>,
                        okButtonProps: {disabled: true}
                    })
                    //将表单数据放入formData
                    formData.append("form", JSON.stringify(values))
                    //异步请求
                    request.post('/zyb/equipmentOfSupervise/exceladd',{method: 'post', data: formData}).then(res => {
                        if(res.flag){
                            modal.update({content: '操作成功', okButtonProps: {disabled: false}})
                            globalList.refresh()
                        }else{
                            modal.update({content: '操作失败,请联系管理员!', okButtonProps: {disabled: false}})
                        }
                    })
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
                content: `确定要删除id=${this.state.record.id}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zyb/equipmentOfSupervise/delete?id=' + this.state.record.id).then(res => {
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

                <List url='/zyb/equipmentOfSupervise/list'  onError={this.handleError} onMount={this.onMount}>
                    <Filter cols={2}>
                        <Filter.Item label="装备名称" name="name"><Input/></Filter.Item>
                        <Filter.Item label="规格型号" name="num"><Input/></Filter.Item>
                    </Filter>
                    <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                        <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>新增</Button>
                        <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                                className={styles.marginLeft20}>编辑</Button>
                        <Button icon="eye" type="primary" onClick={() => this.handleOperator('view')}
                                className={styles.marginLeft20}>浏览</Button>
                        <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                                className={styles.marginLeft20}>删除</Button>
                        <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                                className={styles.marginLeft20} href={'/zyb/excelTemplate/download'+window.location.pathname.replace("/zyb","")}>下载模板</Button>
                        <Button icon="upload" type="primary" className={styles.marginLeft20} onClick={() => this.handleOperator('upExcel')}>上传Excel</Button>
                    </div>
                    <Table onRow={record => {
                        return {
                            onClick: () => this.clickOperation('onClick', record),
                            onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                        }
                    }}>
                        <Table.Column title="装备名称" dataIndex="name"/>
                        <Table.Column title="规格型号" dataIndex="num"/>
                        <Table.Column title="数量" dataIndex="amount"/>
                        <Table.Column title="购置时间" dataIndex="buyDate"/>
                        <Table.Column title="装备状态" dataIndex="status"/>


                    </Table>
                    <Pagination/>
                </List>

        )
    }
}

export default EquipmentOfSupervise