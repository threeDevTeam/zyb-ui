import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    name: {type: "string", required: true, message: '角色名称不能为空'},

}

class RoleManagementFrom extends PureComponent {
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
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="角色名称" name="name"><Input/></FormItem>
                 </Form>
        )
    }
}

export default RoleManagementFrom
