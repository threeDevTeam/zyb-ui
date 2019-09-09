import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    name: {type: "string", required: true, message: '姓名不能为空'},
    gender: {type: "string", required: true, message: '性别不能为空'},
    idNum: {type: "string", required: true, message: '身份证号不能为空'},
    birth: {type: "number", required: true, message: '出生日期不能为空'},
    job: {type: "string", required: true, message: '职务不能为空'},
    major: {type: "string", required: true, message: '所学专业不能为空'},
    isGet: {type: "string", required: true, message: '是否取得执法资格证书不能为空'},

}

class PersonOfSuperviseDemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="姓名" name="name"><Input/></FormItem>
                   <FormItem label="性别" name="gender"><Input/></FormItem>
                     <FormItem label="身份证号" name="idNum"><Input/></FormItem>
                    <FormItem label="出生日期" name="birth"><InputNumber/></FormItem>
                   <FormItem label="职务" name="job"><Input/></FormItem>
                    <FormItem label="所学专业" name="major"><Input/></FormItem>

                     <FormItem label="是否取得执法资格证书" name="isGet">
                         <Radio.Group  value={this.state.value} >
                             <Radio value={"是"}>是</Radio>
                             <Radio value={"否"}>否</Radio>
                         </Radio.Group>
                     </FormItem>

            </Form>
        )
    }
}

export default PersonOfSuperviseDemoForm
