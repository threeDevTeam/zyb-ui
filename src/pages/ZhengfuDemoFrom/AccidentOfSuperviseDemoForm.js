import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    dustCount: {type: "number", required: true, message: '尘肺病事故数不能为空'},
    poisonCount: {type: "number", required: true, message: '中毒事故数不能为空'},
    otherCount: {type: "number", required: true, message: '其它事故数不能为空'},
    dustPersonCount: {type: "number", required: true, message: '尘肺病事故人数不能为空'},
    poisonPersonCount: {type: "number", required: true, message: '中毒事故人数不能为空'},
    otherPersonCount: {type: "number", required: true, message: '其它事故人数不能为空'},
    otherDieCount: {type: "number", required: true, message: '其它事故死亡人数不能为空'},
    loseMoney: {type: "number", required: true, message: '直接经济损失不能为空'},

}

class AccidentOfSuperviseDemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label:8}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="年份" value={2019} name="year"><InputNumber/></FormItem>
                <FormItem required={true} label="尘肺病事故数" name="dustCount"><InputNumber/></FormItem>
                <FormItem required={true} label="中毒事故数" name="poisonCount"><InputNumber/></FormItem>
                <FormItem required={true} label="其它事故数" name="otherCount"><InputNumber/></FormItem>
                <FormItem required={true} label="尘肺病事故人数" name="dustPersonCount"><InputNumber/></FormItem>
                <FormItem required={true} label="中毒事故人数" name="poisonPersonCount"><InputNumber/></FormItem>
                <FormItem required={true} label="其它事故人数" name="otherPersonCount"><InputNumber/></FormItem>
                <FormItem required={true} label="尘肺病事故死亡人数" name="dustDieCount"><Input/></FormItem>
                <FormItem required={true} label="中毒事故死亡人数" name="poisonDieCount"><Input/></FormItem>
                <FormItem required={true} label="其它事故死亡人数" name="otherDieCount"><InputNumber/></FormItem>
                <FormItem required={true} label="直接经济损失" name="loseMoney"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default AccidentOfSuperviseDemoForm
