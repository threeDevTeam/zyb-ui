import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater";

const validate = {
    year: {type: "number", required: true, message: '申报年份不能为空'},

    isSet: {type: "string", required: true, message: '是否独立设置职业健康监管部门不能为空'},
    markCount: {type: "number", required: true, message: '职业健康监管人员编制数不能为空'},
    manageCount: {type: "number", required: true, message: '在岗职业健康监管人员数不能为空'},

}
let SelectInlineRepeater = Selectify(InlineRepeater)

class SuperviseDemoForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
        console.log(this.core)
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
            <Form core={this.core} layout={{label:5}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="省的名称" name="provinceName"><Input/></FormItem>
                <FormItem label="申报年份" name="year"><InputNumber/></FormItem>
                <FormItem label="省的代码" name="provinceCode"><Input/></FormItem>
                <FormItem label="市的名称" name="cityName"><Input/></FormItem>
                <FormItem label="市的代码" name="cityCode"><Input/></FormItem>
                <FormItem label="区的名称" name="districtName"><Input/></FormItem>
                <FormItem label="区的代码" name="districtCode"><Input/></FormItem>
                <FormItem label="注册地址" name="registerAddress"><Input/></FormItem>
                <FormItem label="单位名称" name="name"><Input/></FormItem>
                <FormItem label="是否独立设置职业健康监管" name="isSet">
                    <Radio.Group  value={this.state.value} style={{paddingLeft:40,paddingTop:20}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem label="职业健康监管人员编制数" name="markCount"><InputNumber/></FormItem>
                <FormItem label="在岗职业健康监管人员数" name="manageCount"><InputNumber/></FormItem></Form>
        )
    }
}

export default SuperviseDemoForm
