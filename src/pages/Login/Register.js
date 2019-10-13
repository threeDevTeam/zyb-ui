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
                console.log(this.core.value);
                request.post('/zybadmin/sysUser/register', {data: this.core.value}).then(res => {
                    if (res.flag) {
                        sessionStorage.setItem("loginName", res.data.loginName)

                        window.location.href ='/supervise'
                        // message.success("登录成功")

                    } else {
                        message.error("账号或密码错误")
                    }
                })
            }
        })
    }

    render() {

        return (
            <Card title="登录表单">
                <Form core={this.core} layout={{label: 7}}>
                        <FormItem required={true} label="登录名" name="loginName" ><Input placeholder="请输入用户名"/></FormItem>
                        <FormItem required={true} label="登录密码" name="loginPassword"><Input.Password placeholder="请输入密码"/></FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleOperator}>登录</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default Register;