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
    }

    constructor(props) {
        super(props);
        console.log(this.core)
    }

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        request.get('/zybadmin/sysRole/sysRoleTree').then(res => {
            console.log(res.data)
            if (res.flag) {
                this.setState({dataSource: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree2').then(res => {
            console.log(res.data)
            if (res.flag) {
                this.setState({dataSource2: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree3').then(res => {
            console.log(res.data)
            if (res.flag) {
                this.setState({dataSource3: res.data})
            }
        })
        request.get('/zybadmin/sysRole/sysRoleTree4').then(res => {
            console.log(res.data)
            if (res.flag) {
                this.setState({dataSource4: res.data})
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
                <FormItem label="政府监管部门" name="checkbox" className={styles.newLine}>
                <Checkbox.Group options={this.state.dataSource} onChange={this.onChange}/>
            </FormItem>
                <FormItem label="技术服务机构" name="checkbox2" className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource2} onChange={this.onChange}/>
                </FormItem>
                <FormItem label="企业" name="checkbox3" className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource3} onChange={this.onChange}/>
                </FormItem>
                <FormItem label="系统管理" name="checkbox4" className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource4} onChange={this.onChange}/>
                </FormItem>
            </Form>
        )
    }
}

export default AuthorizationFrom
