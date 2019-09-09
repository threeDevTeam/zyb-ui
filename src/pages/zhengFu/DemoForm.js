import React, {PureComponent} from 'react'
import {Card} from 'antd'
import Form, {FormItem, FormCore} from 'noform'
import {Input} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    username: {type: "string", required: true, message: 'username不能为空'}
}

class DemoForm extends PureComponent {
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
            <Form core={this.core} layout={{label: 4, control: 20}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="username" name="username"><Input/></FormItem>
                <FormItem label="age" name="age"><Input/></FormItem>
                <FormItem name="course">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='courseName' name="courseName"><Input/></FormItem>
                        <FormItem label='courseScore' name="courseScore"><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Form>
        )
    }
}

export default DemoForm
