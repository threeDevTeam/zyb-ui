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
import HealthOfEnterpriseDemoForm from '../QiyeDemoFrom/HealthOfEnterpriseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'
import FileForm from "../FileUpDown/FileForm";


let globalList

// @connect(({demo}) => ({demo}))
class HealthOfEnterprise extends PureComponent {
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
                width: 650,
                // style: {width: 1000},
                enableValidate: true,
                content: <HealthOfEnterpriseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/healthOfEnterprise/add', {data: {...values}}).then(res => {
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
                    request.post('/zybadmin/healthOfEnterprise/exceladd',{method: 'post', data: formData}).then(res => {
                        if(res.flag){
                            modal.update({content: '操作成功', okButtonProps: {disabled: false}})
                            globalList.refresh()
                        }else{
                            modal.update({content: '操作失败,请联系管理员!', okButtonProps: {disabled: false}})
                        }
                    })
                }
            })
        }  else if ('edit' === type || 'view' === type) {
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/zybadmin/healthOfEnterprise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <HealthOfEnterpriseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/healthOfEnterprise/edit', {data: {...values}}).then(res => {
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
                content: `确定要删除id=${this.state.record.id}的数据吗?`,
                onOk: (values, hide) => {
                    request('/zybadmin/healthOfEnterprise/delete?id=' + this.state.record.id).then(res => {
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
            <List url='/zybadmin/healthOfEnterprise/list'  onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="是否制定职业病防治计划和实施方案" name="isA"><Input/></Filter.Item>

                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>新增</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                            className={styles.marginLeft20}>编辑</Button>
                    <Button icon="search" type="primary" onClick={() => this.handleOperator('view')}
                            className={styles.marginLeft20}>浏览</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                            className={styles.marginLeft20}>删除</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                            className={styles.marginLeft20} href={'/zybadmin/excelTemplate/download'+window.location.pathname.replace("/zybadmin","")}>下载模板</Button>
                    <Button icon="upload" type="primary" className={styles.marginLeft20} onClick={() => this.handleOperator('upExcel')}>上传Excel</Button>

                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="是否制定职业病防治计划和实施方案" dataIndex="isA"/>
                    <Table.Column title="是否建立职业病防治责任制度" dataIndex="isB"/>
                    <Table.Column title="是否建立职业病危害警示与告知制度" dataIndex="isC"/>
                    <Table.Column title="是否建立职业病危害项目申报制度" dataIndex="isD"/>
                    <Table.Column title="是否建立职业病防治宣传教育培训制度" dataIndex="isE"/>
                    <Table.Column title="是否建立职业病防护设施维护检修制度" dataIndex="isF"/>
                    <Table.Column title="是否建立职业病防护用品管理制度" dataIndex="isG"/>
                    <Table.Column title="是否建立职业病危害监测及评价管理制度" dataIndex="isH"/>
                    <Table.Column title="是否建立建设项目职业病防护设施“三同时”管理制度" dataIndex="isI"/>
                    <Table.Column title="是否建立劳动者职业健康监护及其档案管理制度" dataIndex="isJ"/>
                    <Table.Column title="是否建立职业病危害事故处置与报告制度" dataIndex="isK"/>
                    <Table.Column title="是否建立职业病危害应急救援与管理制度" dataIndex="isL"/>
                    <Table.Column title="是否建立岗位职业卫生操作规程" dataIndex="isM"/>
                    <Table.Column title="是否设置或指定职业卫生管理机构" dataIndex="isN"/>
                    <Table.Column title="是否配备了专职或兼职职业卫生管理人员" dataIndex="isO"/>
                    <Table.Column title="单位负责人是否培训合格" dataIndex="isP"/>
                    <Table.Column title="职业卫生管理人员是否培训合格" dataIndex="isQ"/>
                    <Table.Column title="接触职业病危害员工是否培训合格" dataIndex="isR"/>
                    <Table.Column title="是否建立健全职业卫生档案" dataIndex="isS"/>
                    <Table.Column title="是否进行了职业病危害项目申报" dataIndex="isT"/>
                    <Table.Column title="是否落实了建设项目职业病防护设施“三同时”" dataIndex="isU"/>
                    <Table.Column title="是否在醒目位置设置公告栏公布职业病防治相关信息" dataIndex="isV"/>
                    <Table.Column title="是否在存在职业病危害作业场所、岗位、设备的醒目位置设置了警示标识" dataIndex="isW"/>
                    <Table.Column title="是否实施了职业病危害因素日常监测" dataIndex="isX"/>
                    <Table.Column title="是否实施工作场所职业病危害因素定期检测" dataIndex="isY"/>
                    <Table.Column title="是否与劳动者签订合同并进行危害告知" dataIndex="isZ"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default HealthOfEnterprise