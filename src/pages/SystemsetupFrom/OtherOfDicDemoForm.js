import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import {Table} from "nolist/lib/wrapper/antd";

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    username: {type: "string", required: true, message: 'username不能为空'},
    age: {type: "number", required: true, message: 'age不能为空'}
}

class OtherOfDicDemoForm extends PureComponent {
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
                <FormItem label="大类名称" name="chineseTableName"><Input/></FormItem>
                <FormItem label="大类英文名称" name="englishTableName"><Input/></FormItem>
                <FormItem label="小类名称" name="chineseColumnName"><Input/></FormItem>
                <FormItem label="小类英文名称" name="englishColumnName"><Input/></FormItem>
                <FormItem label="排序" name="sort"><InputNumber/></FormItem>
                <FormItem label="值" name="name"><Input/></FormItem>
            </Form>
        )
    }
}

export default OtherOfDicDemoForm

