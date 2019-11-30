import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    markCount: {type: "number", required: true, message: '培训监管人员数不能为空'},
    personCount: {type: "number", required: true, message: '培训用人单位数不能为空'},
    mainCount: {type: "number", required: true, message: '培训用人单位主要负责人数不能为空'},
    manageCount: {type: "number", required: true, message: '培训用人单位职业健康管理人员数不能为空'},
    workerCount: {type: "number", required: true, message: '培训接触职业病危害的劳动者数不能为空'},

}

class EducationOfSuperviseDemoForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="年份 " name="year"><InputNumber placeholder="2019"/></FormItem>
                <FormItem required={true} label="培训监管人员数" name="markCount"><InputNumber/></FormItem>
                <FormItem required={true} label="培训用人单位数" name="personCount"><InputNumber/></FormItem>
                <FormItem required={true} label="培训用人单位主要负责人数" name="mainCount"><InputNumber/></FormItem>
                <FormItem required={true} label="培训用人单位职业健康管理人员数" name="manageCount"><InputNumber/></FormItem>
                <FormItem required={true} label="培训接触职业病危害的劳动者数" name="workerCount"><InputNumber/></FormItem>


            </Form>
        )
    }
}

export default EducationOfSuperviseDemoForm
