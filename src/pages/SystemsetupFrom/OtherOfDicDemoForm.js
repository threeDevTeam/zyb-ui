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
                <FormItem label="name" name="name"><Input/></FormItem>
                <FormItem label="sort" name="sort"><InputNumber/></FormItem>
                <FormItem label="chineseTableName" name="chineseTableName"><Input/></FormItem>
                <FormItem label="englishTableName" name="englishTableName"><InputNumber/></FormItem>
                <FormItem label="chineseColumnName" name="chineseColumnName"><Input/></FormItem>
                <FormItem label="englishColumnName" name="englishColumnName"><InputNumber/></FormItem>
            </Form>
        )
    }
}

export default OtherOfDicDemoForm

