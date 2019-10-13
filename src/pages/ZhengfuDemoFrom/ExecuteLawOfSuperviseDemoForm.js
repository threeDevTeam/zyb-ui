import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    personCount: {type: "number", required: true, message: '检查用人单位数不能为空'},
    paperCount: {type: "number", required: true, message: '下达执法文书数不能为空'},
    questionCount: {type: "number", required: true, message: '发现问题或隐患数不能为空'},
    changeCount: {type: "number", required: true, message: '责令当场改正数不能为空'},
    fixCount: {type: "number", required: true, message: '责令限期改正数不能为空'},
    punishCount: {type: "number", required: true, message: '罚款用人单位数不能为空'},
    punishMoney: {type: "number", required: true, message: '罚款金额不能为空'},
    stopCount: {type: "number", required: true, message: '责令停产整顿用人单位数不能为空'},
    closeCount: {type: "number", required: true, message: '提请关闭用人单位数不能为空'},

}

class ExecuteLawOfSuperviseDemoForm extends PureComponent {
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
                <FormItem style={{display: 'none'}} name="id"><InputNumber/></FormItem>

                <FormItem required={true} label="年份" name="year"><InputNumber/></FormItem>

                <FormItem required={true} label="检查用人单位数" name="personCount"><InputNumber/></FormItem>

                <FormItem required={true} label="下达执法文书数" name="paperCount"><InputNumber/></FormItem>

                <FormItem required={true} label="发现问题或隐患数" name="questionCount"><InputNumber/></FormItem>

                <FormItem required={true} label="责令当场改正数" name="changeCount"><InputNumber/></FormItem>

                <FormItem required={true} label="责令限期改正数" name="fixCount"><InputNumber/></FormItem>

                <FormItem required={true} label="罚款用人单位数" name="punishCount"><InputNumber/></FormItem>

                <FormItem required={true} label="罚款金额" name="punishMoney"><InputNumber/></FormItem>

                <FormItem required={true} label="责令停产整顿用人单位数" name="stopCount"><InputNumber/></FormItem>

                <FormItem required={true} label="提请关闭用人单位数" name="closeCount"><InputNumber/></FormItem>


            </Form>
        )
    }
}

export default ExecuteLawOfSuperviseDemoForm
