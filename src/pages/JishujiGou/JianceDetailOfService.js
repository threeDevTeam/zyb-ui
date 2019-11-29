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
import JianceDetailOfServiceDemoForm from '../JiShuDemoFrom/JianceDetailOfServiceDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'
import FileForm from "../FileUpDown/FileForm";


let globalList

// @connect(({demo}) => ({demo}))
class JianceDetailOfService extends PureComponent {
    state = {fileList: []
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
                width: 850,
                // style: {width: 1000},
                enableValidate: true,
                content: <JianceDetailOfServiceDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    if (values.checkDateStr) {
                        values.checkDateStr = values.checkDateStr._i
                    }

                    request.post('/zyb/jianceDetailOfService/add', {data: {...values}}).then(res => {
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
                    request.post('/zyb/jianceDetailOfService/exceladd',{method: 'post', data: formData}).then(res => {
                        if(res && res.flag){
                            modal.update({content: '操作成功', okButtonProps: {disabled: false}})
                            globalList.refresh()
                        }else{
                            modal.update({content: '操作失败,请联系管理员!', okButtonProps: {disabled: false}})
                        }
                    })
                }
            })
        }
        else if ('edit' === type || 'view' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/zyb/jianceDetailOfService/getById?id=' + this.state.record.id).then(res => {
                if (res && res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 850,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <JianceDetailOfServiceDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            if (values.checkDateStr) {
                                values.checkDateStr = values.checkDateStr._i
                            }
                            request.post('/zyb/jianceDetailOfService/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除企业名称=${this.state.record.enterpriseName}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zyb/jianceDetailOfService/delete?id=' + this.state.record.id).then(res => {
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
    isShowAddButton = () => {
        let type = sessionStorage.getItem('type')
        if ('管理员' === type) {
        } else {
            return <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}
                           className={styles.marginRight20}>新增</Button>
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
            <List url='/zyb/jianceDetailOfService/list'onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="企业名称" name="enterpriseName"><Input/></Filter.Item>
                    <Filter.Item label="判定结果" name="decideResult"><Input/></Filter.Item>
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
                    <Button icon="upload" type="primary" className={styles.marginLeft20} onClick={() => this.handleOperator('upExcel')}>上传Excel</Button>
                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="检测年份" dataIndex="checkYear"/>
                    <Table.Column title="企业名称" dataIndex="enterpriseName"/>
                    <Table.Column title="登记注册类型名称" dataIndex="registerSmallName"/>
                    <Table.Column title="所属行业名称" dataIndex="industrySmallName"/>
                    <Table.Column title="工作场所名称" dataIndex="workplaceName"/>
                    <Table.Column title="岗位名称" dataIndex="postSmallName"/>
                    <Table.Column title="判定结果" dataIndex="decideResult"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default JianceDetailOfService