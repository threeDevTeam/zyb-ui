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
        records: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore();
    }

    componentWillMount() {
        let {type, record} = this.props.option
        console.log(record);
        if ('authorization' === type || 'view' === type) {
                this.core.setValues({checkbox: record.supervise, checkbox2: record.service, checkbox3: record.enterprise, checkbox4: record.Management,checkbox5: record.opinion})
        }
        request.get('/zyb/sysRole/sysRoleTree').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
        request.get('/zyb/sysRole/sysRoleTree2').then(res => {
            if (res && res.flag) {
                this.setState({dataSource2: res.data})
            }
        })
        request.get('/zyb/sysRole/sysRoleTree3').then(res => {
            if (res && res.flag) {
                this.setState({dataSource3: res.data})
            }
        })
        request.get('/zyb/sysRole/sysRoleTree4').then(res => {
            if (res && res.flag) {
                this.setState({dataSource4: res.data})
            }
        })
        request.get('/zyb/sysRole/sysRoleTree5').then(res => {
            if (res && res.flag) {
                this.setState({dataSource5: res.data})
            }
        })
        request.get('/zyb/sysRole/sysRoleTree').then(res => {
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
                <FormItem label="公众舆情" name="checkbox5" className={styles.newLine}>
                    <Checkbox.Group options={this.state.dataSource5} onChange={this.onChange}/>
                </FormItem>
            </Form>
        )
    }
}

export default AuthorizationFrom
