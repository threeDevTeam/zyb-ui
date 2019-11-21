import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    loginName: {type: "string", required: true, message: '用户名不能为空'},
    email: {type: "string", required: true, message: '邮箱不能为空'},
    mobile:{type: "string", required: true, message: '联系方式不能为空'}
}

class UserManagementFrom extends PureComponent {
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
            <Form core={this.core} layout={{label:7}}>
                <FormItem label="用户名" name="loginName"><Input/></FormItem>
                <FormItem label="邮箱" name="email"><InputNumber/></FormItem>
                <FormItem label="联系方式" name="mobile"><Input/></FormItem>
             </Form>
        )
    }
}

export default UserManagementFrom
