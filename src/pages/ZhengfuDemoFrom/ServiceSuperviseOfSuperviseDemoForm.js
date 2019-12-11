import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    jianceCount: {type: "number", required: true, message: '检测机构的数量不能为空'},
    tijianianceount: {type: "number", required: true, message: '体检机构的数量不能为空'},
    zhenduanCount: {type: "number", required: true, message: '诊断机构的数量不能为空'},
    jiancePunishCount: {type: "number", required: true, message: '检测机构的被处罚数量不能为空'},
    tijianPunishCount: {type: "number", required: true, message: '体检机构的被处罚数量不能为空'},
    zhenduanPunishCount: {type: "number", required: true, message: '诊断机构的被处罚数量不能为空'},
    jianceMoney: {type: "number", required: true, message: '检测机构的罚款金额不能为空'},
    tijianMoney: {type: "number", required: true, message: '体检机构的罚款金额不能为空'},
    zhenduanMoney: {type: "number", required: true, message: '诊断机构的罚款金额不能为空'},
    jianceCancelCount: {type: "number", required: true, message: '检测机构的被吊销资质数量不能为空'},
    tijianianceancelCount: {type: "number", required: true, message: '体检机构的被吊销资质数量不能为空'},
    zhenduanCancelCount: {type: "number", required: true, message: '诊断机构的被吊销资质数量不能为空'},

}

class ServiceSuperviseOfSuperviseDemoForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {
        let currentYear=new Date().getFullYear()
        this.core.setValue('year',currentYear)
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
    }

    render() {
        return (
            <Form core={this.core} layout={{label:9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="年份"  name="year"><InputNumber /></FormItem>
                <FormItem required={true} label="检测机构的数量" name="jianceCount"><InputNumber/></FormItem>
                <FormItem required={true} label="体检机构的数量" name="tijianianceount"><InputNumber/></FormItem>
                <FormItem required={true} label="诊断机构的数量" name="zhenduanCount"><InputNumber/></FormItem>
                <FormItem required={true} label="检测机构的被处罚数量" name="jiancePunishCount"><InputNumber/></FormItem>
                <FormItem required={true} label="体检机构的被处罚数量" name="tijianPunishCount"><InputNumber/></FormItem>
                <FormItem required={true} label="诊断机构的被处罚数量" name="zhenduanPunishCount"><InputNumber/></FormItem>
                <FormItem required={true} label="检测机构的罚款金额" name="jianceMoney"><InputNumber/></FormItem>
                <FormItem required={true} label="体检机构的罚款金额" name="tijianMoney"><InputNumber/></FormItem>
                <FormItem required={true} label="诊断机构的罚款金额" name="zhenduanMoney"><InputNumber/></FormItem>

                <FormItem required={true} label="检测机构的被吊销资质数量" name="jianceCancelCount"><InputNumber/></FormItem>
                <FormItem required={true} label="体检机构的被吊销资质数量" name="tijianianceancelCount"><InputNumber/></FormItem>
                <FormItem required={true} label="诊断机构的被吊销资质数量" name="zhenduanCancelCount"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default ServiceSuperviseOfSuperviseDemoForm
