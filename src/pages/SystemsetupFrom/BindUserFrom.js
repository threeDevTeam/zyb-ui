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
        records:[]
    }

    constructor(props) {
        super(props);
    }

    onChange = value => {
        this.setState({value});
    };

    componentWillMount() {
        let {type, record} = this.props.option
        if ('BindUser' === type || 'view' === type) {
            this.setState({records:record})
            console.log(record)
        }
        request.get('/zyb/sysRole/bindUser').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
    }

    render() {

        return (
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="绑定" name="checkbox" value={this.state.records} className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource} onChange={this.onChange}/>
                </FormItem>

            </Form>
        )
    }
}

export default BindUserFrom
