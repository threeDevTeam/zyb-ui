import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {DatePicker , Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/zh_CN';
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
        this.core.setValue('isGet','是')
        this.core.setValue('gender','男')
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
            let birthStr = record.birthStr
            delete record.birthStr
            this.core.setValue('birthStr', moment(birthStr, 'YYYY-MM-DD'))
        }
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="姓名" name="name"><Input/></FormItem>
                   <FormItem required={true}  label="性别" name="gender">
                       <Radio.Group  value={this.state.value} style={{width:200}} >
                           <Radio value={"男"}>男</Radio>
                           <Radio value={"女"}>女</Radio>
                       </Radio.Group>
                   </FormItem>
                     <FormItem required={true} label="身份证号" name="idNum"><Input/></FormItem>
                    <FormItem required={true} label="出生日期" name="birthStr"><DatePicker locale={locale} placeholder="请选择出生日期"/></FormItem>
                   <FormItem required={true} label="职务" name="job"><Input/></FormItem>
                    <FormItem required={true} label="所学专业" name="major"><Input/></FormItem>

                     <FormItem required={true} label="是否取得执法资格证书" name="isGet">
                         <Radio.Group  value={this.state.value}style={{width:200}} >
                             <Radio value={"是"}>是</Radio>
                             <Radio value={"否"}>否</Radio>
                         </Radio.Group>
                     </FormItem>

            </Form>
        )
    }
}

export default PersonOfSuperviseDemoForm
