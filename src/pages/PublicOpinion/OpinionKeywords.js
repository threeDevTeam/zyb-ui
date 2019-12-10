import React, {PureComponent} from 'react'
import {Card, Col, message, Row} from 'antd'
import List, {Filter, Table, Pagination} from 'nolist/lib/wrapper/antd'
import {Input, Checkbox, Dialog, Button, Radio} from 'nowrapper/lib/antd'
import Form, {FormCore, FormItem} from "noform";
import request from "../../utils/request";
import styles from "../SystemsetupFrom/newLine.less";

const {TextArea} = Input;

class OpinionKeywords extends PureComponent {


    state = {
        value: undefined,
        records: []
    };

    constructor(props) {
        super(props);
        this.core = new FormCore();
    }

    componentWillMount() {

        request.get('/zyb/publicOpinion/sysRoleTree').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })

        request.get('/zyb/publicOpinion/list').then(res => {
            if (res && res.flag) {
                this.core.setValues({...res.data})
            }
        })
    }

    handleOperator = () => {

        console.log(this.core.value)
        request.post('/zyb/publicOpinion/add', {data: this.core.value}).then(res => {
            if (res && res.flag) {
                message.success("设置成功")
            } else {
                message.error("设置失败")
            }
        })
    }

    render() {
        return (
            <Card title="设置关键字">
                <Form core={this.core}>

                            <FormItem style={{marginLeft:60}} required={true} label="关键字" name="text"><TextArea placeholder="请输入关键字"  style={{width: 400}} rows={7}/></FormItem>

                            <FormItem style={{marginLeft:60}} label="源站类型" name="typename" className={styles.newLine} >
                                <Checkbox.Group options={this.state.dataSource} onChange={this.onChange}/>
                            </FormItem>

                            <FormItem style={{marginLeft:60}}>
                                <Button  type="primary" style={{marginLeft: 130, marginTop: 20}}
                                        onClick={this.handleOperator}>确定</Button>
                            </FormItem>


                </Form>
            </Card>
        )
    }
}

export default OpinionKeywords