import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import request from "../../utils/request";

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
}

class MenuManagementFrom extends PureComponent {
    state = {
        value: undefined,
    }

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
        request.get('/zybadmin/sysMenu/sysMenutree').then(res =>{
            console.log(res.data)
            if(res.flag){
                this.setState({dataSource:res.data})
            }
        })
    }
    onChange = value => {
        console.log(value);
        this.setState({ value });
    };
    render() {
        return (
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="栏位" name="cascader"><Cascader options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择栏位"/></FormItem>
                <FormItem label="名称" name="name"><Input/></FormItem>
                <FormItem label="地址" name="url"><Input/></FormItem>
            </Form>
        )
    }
}

export default MenuManagementFrom
