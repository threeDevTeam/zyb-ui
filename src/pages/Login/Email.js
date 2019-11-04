import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message} from "antd";
import request from "../../utils/request";
const validate = {
    email: {type: "string", required: true, message: '邮箱不能为空'},
}
class Email extends PureComponent {
    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {

    }

    handleOperator = () => {
            this.core.validate((err) => {
                if (!err) {
                    request.post('/zyb/email/sendMail', {data: this.core.value}).then(res => {
                        if (res.flag) {
                            message.success("登录成功")

                        } else {
                            message.error("账号或密码错误")
                        }
                    })
                }
            })
        }
    render() {
        return (

            <Form core={this.core}>
                <FormItem label="邮箱" name="email" direction="horizontal"><Input/></FormItem>
                <FormItem direction="horizontal">
                    <Button type="primary" onClick={this.handleOperator}>发送邮件</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Email