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
import EducationOfSuperviseDemoForm from '../DemoFrom/EducationOfSuperviseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class EducationOfSupervise extends PureComponent {
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
                content: <EducationOfSuperviseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/educationOfSupervise/add', {data: {...values}}).then(res => {
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
            request('/zybadmin/educationOfSupervise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <EducationOfSuperviseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/educationOfSupervise/edit', {data: {...values}}).then(res => {
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
                    request('/zybadmin/educationOfSupervise/delete?id=' + this.state.record.id).then(res => {
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

                <List url='/zybadmin/educationOfSupervise/list' pageSize={2} onError={this.handleError} onMount={this.onMount}>
                    <Filter cols={5}>
                        <Filter.Item label="username" name="username"><Input/></Filter.Item>
                        <Filter.Item label="age" name="age"><Input/></Filter.Item>
                        <Filter.Item label="date" name="date"><DatePicker/></Filter.Item>
                        <Filter.Item label="创建时间" colSpan="2">
                            <React.Fragment>
                                <Filter.Item noLayout name="createStartTime"><DatePicker/></Filter.Item>
                                <Filter.Item noLayout name="createEndTime"><DatePicker/></Filter.Item>
                            </React.Fragment>
                        </Filter.Item>
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
                        <Table.Column title="年份" dataIndex="year"/>
                        <Table.Column title="培训监管人员数" dataIndex="markCount"/>
                        <Table.Column title="培训用人单位数" dataIndex="personCount"/>
                        <Table.Column title="培训用人单位主要负责人数" dataIndex="mainCount"/>
                        <Table.Column title="培训用人单位职业健康管理人员数" dataIndex="manageCount"/>
                        <Table.Column title="培训接触职业病危害的劳动者数" dataIndex="workerCount"/>
                    </Table>
                    <Pagination/>
                </List>
        )
    }
}

export default EducationOfSupervise