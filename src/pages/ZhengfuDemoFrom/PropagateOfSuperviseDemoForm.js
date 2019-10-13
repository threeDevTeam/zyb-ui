import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    year: {type: "number", required: true, message: '年份 不能为空'},
    newsCount: {type: "number", required: true, message: '新闻报道数不能为空'},
    paperCount: {type: "number", required: true, message: '印发宣传材料数不能为空'},
    videoCount: {type: "number", required: true, message: '制作和发放专题宣传片（视频）数不能为空'},
    outCount: {type: "number", required: true, message: '出动宣传人员数不能为空'},
    acceptCount: {type: "number", required: true, message: '宣传受众人数不能为空'},

}

class PropagateOfSuperviseDemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label:9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="年份 " name="year"><InputNumber/></FormItem>
                <FormItem required={true} label="新闻报道数" name="newsCount"><InputNumber/></FormItem>
                <FormItem required={true} label="印发宣传材料数" name="paperCount"><InputNumber/></FormItem>
                <FormItem required={true} label="制作和发放专题宣传片（视频）数" name="videoCount"><InputNumber/></FormItem>
                <FormItem required={true} label="出动宣传人员数" name="outCount"><InputNumber/></FormItem>
                <FormItem required={true} label="宣传受众人数" name="acceptCount"><InputNumber/></FormItem>

            </Form>
        )
    }
}

export default PropagateOfSuperviseDemoForm
