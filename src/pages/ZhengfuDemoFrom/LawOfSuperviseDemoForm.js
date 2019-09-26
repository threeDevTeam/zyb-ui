import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    ruleIncrease: {type: "number", required: true, message: '印发法律法规的新增不能为空'},
    fileIncrease: {type: "number", required: true, message: '印发规范性文件的新增不能为空'},
    startdardIncrease: {type: "number", required: true, message: '印发标准的新增不能为空'},

}

class LawOfSuperviseDemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label: 8}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
               <FormItem label="年份 " name="year"><InputNumber/></FormItem>
                    <FormItem label="印发法律法规的新增" name="ruleIncrease"><InputNumber/></FormItem>
                <FormItem label="印发规范性文件的新增" name="fileIncrease"><InputNumber/></FormItem>
                <FormItem label="印发标准的新增" name="startdardIncrease"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default LawOfSuperviseDemoForm
