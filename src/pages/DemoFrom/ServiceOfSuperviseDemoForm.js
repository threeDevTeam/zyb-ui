import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    jianceLevel: {type: "string", required: true, message: '检测机构的资质等级不能为空'},
    jianceIncrease: {type: "number", required: true, message: '检测机构的新增不能为空'},
    jianceSum: {type: "number", required: true, message: '检测机构的累计不能为空'},
    tijianIncrease: {type: "number", required: true, message: '体检机构的新增不能为空'},
    tijianSum: {type: "number", required: true, message: '体检机构的累计不能为空'},
    zhenduanIncrease: {type: "number", required: true, message: '诊断机构的新增不能为空'},
    zhenduanSum: {type: "number", required: true, message: '诊断机构的累计不能为空'},

}

class ServiceOfSuperviseDemoForm extends PureComponent {
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
                <FormItem label="年份 " name="year"><InputNumber/></FormItem>
                <FormItem label="检测机构的资质等级" name="jianceLevel"><Input/></FormItem>
                <FormItem label="检测机构的新增" name="jianceIncrease"><InputNumber/></FormItem>
                <FormItem label="检测机构的累计" name="jianceSum"><InputNumber/></FormItem>
                <FormItem label="体检机构的新增" name="tijianIncrease"><InputNumber/></FormItem>
                <FormItem label="体检机构的累计" name="tijianSum"><InputNumber/></FormItem>
                <FormItem label="诊断机构的新增" name="zhenduanIncrease"><InputNumber/></FormItem>
                <FormItem label="诊断机构的累计" name="zhenduanSum"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default ServiceOfSuperviseDemoForm
