import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Radio, Checkbox, Cascader} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import request from "../../utils/request";
import {Row, Col, Tree} from 'antd'
import styles from './newLine.less'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {}

class BindUserFrom extends PureComponent {
    state = {
        value: undefined,
    }

    constructor(props) {
        super(props);
        console.log(this.core)
    }

    onChange = value => {
        console.log(value);
        this.setState({value});
    };

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        request.get('/zybadmin/sysRole/bindUser').then(res => {
            console.log(res.data)
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
    }

    render() {

        return (
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="绑定" name="checkbox" className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource} onChange={this.onChange}/>
                </FormItem>

            </Form>
        )
    }
}

export default BindUserFrom
