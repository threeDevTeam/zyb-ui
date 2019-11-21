import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    upCount: {type: "number", required: true, message: '验收方案上报数不能为空'},
    reportCount: {type: "number", required: true, message: '职业病危害严重建设项目控制效果评价和防护设施验收工作过程报告数不能为空'},
    orgCount: {type: "number", required: true, message: '检查建设单位数不能为空'},
    paperCount: {type: "number", required: true, message: '下达执法文书数不能为空'},
    changeCount: {type: "number", required: true, message: '给予警告责令限期整改单位数不能为空'},
    stopCount: {type: "number", required: true, message: '责令停止产生职业病危害作业单位数不能为空'},
    closeCount: {type: "number", required: true, message: '提请责令停建或关闭单位数不能为空'},
    pulishCount: {type: "number", required: true, message: '罚款建设单位数不能为空'},
    pulishMoney: {type: "number", required: true, message: '罚款金额不能为空'},

}

class ThreeCheckOfSuperviseDemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label: 10}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="年份" value={2019} name="year"><InputNumber/></FormItem>
                <FormItem required={true} label="验收方案上报数" name="upCount"><InputNumber/></FormItem>
                <FormItem required={true} label="职业病危害严重建设项目控制效果评价和防护设施验收工作过程报告数" name="reportCount"><InputNumber style={{marginTop: 10}}/></FormItem>
                <FormItem required={true} label="检查建设单位数" name="orgCount"><InputNumber/></FormItem>
                <FormItem required={true} label="下达执法文书数" name="paperCount"><InputNumber/></FormItem>
                <FormItem required={true} label="给予警告责令限期整改单位数" name="changeCount"><InputNumber/></FormItem>
                <FormItem required={true} label="责令停止产生职业病危害作业单位数" name="stopCount"><InputNumber/></FormItem>
                <FormItem required={true} label="提请责令停建或关闭单位数" name="closeCount"><InputNumber/></FormItem>
                <FormItem required={true} label="罚款建设单位数" name="pulishCount"><InputNumber/></FormItem>
                <FormItem required={true} label="罚款金额" name="pulishMoney"><InputNumber/></FormItem>
            </Form>
        )
    }
}

export default ThreeCheckOfSuperviseDemoForm
