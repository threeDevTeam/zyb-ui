import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Select} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    jianceLevel: {type: "string", required: true, message: '检测机构的资质等级不能为空'},
    jianceIncrease: {type: "number", required: true, message: '检测机构的新增不能为空'},
    tijianIncrease: {type: "number", required: true, message: '体检机构的新增不能为空'},
    zhenduanIncrease: {type: "number", required: true, message: '诊断机构的新增不能为空'},

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
                <FormItem required={true} label="年份 " name="year"><InputNumber/></FormItem>
                <FormItem required={true} label="检测机构的资质等级" name="jianceLevel">
                    <Select value={this.state.city} style={{width: 212}}  onChange={this.getCity}>

                        <option key={"甲级"}>{"甲级"}</option>
                        <option key={"乙级"}>{"乙级"}</option>
                        <option key={"丙级"}>{"丙级"}</option>

                    </Select>
                </FormItem>
                <FormItem required={true} label="检测机构的新增" name="jianceIncrease"><InputNumber/></FormItem>
                <FormItem required={true} label="体检机构的新增" name="tijianIncrease"><InputNumber/></FormItem>
                <FormItem required={true} label="诊断机构的新增" name="zhenduanIncrease"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default ServiceOfSuperviseDemoForm
