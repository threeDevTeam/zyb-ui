import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message} from "antd";
import request from "../../utils/request";

const validate = {
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
                request.post('/zyb/sysUser/changePassword', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        window.location.href ='/user/login'
                       message.success("修改成功")

                    } else {
                        message.error("修改错误")
                    }
                })
            }
        })
    }

    render() {

        return (
            <Card title="登录表单">
                <Form core={this.core} layout={{label: 7}}>
                    <FormItem label="原密码" name="loginPassword"><Input.Password placeholder="请输入旧密码"/></FormItem>
                    <FormItem label="新密码" name="newPassword"><Input.Password placeholder="请输入新密码"/></FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleOperator}>确认修改</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default Register;