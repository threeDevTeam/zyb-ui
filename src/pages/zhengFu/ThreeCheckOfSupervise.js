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
import ThreeCheckOfSuperviseDemoForm from '../ZhengfuDemoFrom/ThreeCheckOfSuperviseDemoForm'
import {connect} from 'dva'
import request from '../../utils/request'


let globalList

// @connect(({demo}) => ({demo}))
class ThreeCheckOfSupervise extends PureComponent {
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
                content: <ThreeCheckOfSuperviseDemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    request.post('/zybadmin/threeCheckOfSupervise/add', {data: {...values}}).then(res => {
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
            request('/zybadmin/threeCheckOfSupervise/getById?id=' + this.state.record.id).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <ThreeCheckOfSuperviseDemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/zybadmin/threeCheckOfSupervise/edit', {data: {...values}}).then(res => {
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
                    request('/zybadmin/threeCheckOfSupervise/delete?id=' + this.state.record.id).then(res => {
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

                <List url='/zybadmin/threeCheckOfSupervise/list'  onError={this.handleError} onMount={this.onMount}>
                    <Filter cols={2}>
                        <Filter.Item label="年份" name="year"><Input/></Filter.Item>
                        <Filter.Item label="罚款金额" name="pulishMoney"><Input/></Filter.Item>
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
                        <Table.Column title="年份 " dataIndex="year"/>
                        <Table.Column title="验收方案上报数" dataIndex="upCount"/>
                        <Table.Column title="职业病危害严重建设项目控制效果评价和防护设施验收工作过程报告数" dataIndex="reportCount"/>
                        <Table.Column title="检查建设单位数" dataIndex="orgCount"/>
                        <Table.Column title="下达执法文书数" dataIndex="paperCount"/>
                        <Table.Column title="给予警告责令限期整改单位数" dataIndex="changeCount"/>
                        <Table.Column title="责令停止产生职业病危害作业单位数" dataIndex="stopCount"/>
                        <Table.Column title="提请责令停建或关闭单位数" dataIndex="closeCount"/>
                        <Table.Column title="罚款建设单位数" dataIndex="pulishCount"/>
                        <Table.Column title="罚款金额" dataIndex="pulishMoney"/>


                    </Table>
                    <Pagination/>
                </List>
        )
    }
}

export default ThreeCheckOfSupervise