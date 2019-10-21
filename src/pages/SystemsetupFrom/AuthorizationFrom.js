import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Radio, Checkbox, Cascader} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import request from "../../utils/request";
import styles from './newLine.less'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {}

class AuthorizationFrom extends PureComponent {
    state = {
        value: undefined,
        records:[]
    }

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        let {type, record} = this.props.option

        if ('authorization' === type || 'view' === type) {
            this.setState({records:record})
            console.log(record)
        }
        request.get('/zybadmin/sysRole/sysRoleTree').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree2').then(res => {
            if (res && res.flag) {
                this.setState({dataSource2: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree3').then(res => {
            if (res && res.flag) {
                this.setState({dataSource3: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree4').then(res => {
            if (res && res.flag) {
                this.setState({dataSource4: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
    }

    onChange = value => {
        console.log(value);
        this.setState({value});
    };

    render() {

        return (
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="政府监管部门" name="checkbox" value={this.state.records} className={styles.newLine}>
                <Checkbox.Group options={this.state.dataSource}  onChange={this.onChange}/>
            </FormItem>
                <FormItem label="技术服务机构" name="checkbox2"value={this.state.records} className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource2}   onChange={this.onChange}/>
                </FormItem>
                <FormItem label="企业" name="checkbox3"value={this.state.records} className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource3}   onChange={this.onChange}/>
                </FormItem>
                <FormItem label="系统管理" name="checkbox4"value={this.state.records} className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource4}  onChange={this.onChange}/>
                </FormItem>
            </Form>
        )
    }
}

export default AuthorizationFrom
