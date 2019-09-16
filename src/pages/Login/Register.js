import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message} from "antd";
import request from "../../utils/request";

const validate = {
    loginName: {type: "string", required: true, message: '登录名不能为空'},
    loginPassword: {type: "string", required: true, message: '登录密码不能为空'},
}
class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {

    }

    handleOperator = () => {

        this.core.validate((err) => {
            if (!err) {
                request.post('/zybadmin/sysUser/register', {data: this.core.value}).then(res => {
                    if (res.flag) {
                        message.success("操作成功")
                    } else {
                        message.error("操作失败")
                    }
                })
            }
        })
    }

    render() {

        return (
            <Card title="登录表单">
                <Form core={this.core} layout={{label: 7}}>
                        <FormItem label="登录名" name="loginName"><Input placeholder="请输入用户名"/></FormItem>
                        <FormItem label="登录密码" name="loginPassword"><Input.Password placeholder="请输入密码"/></FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleOperator}>注册</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default Register;