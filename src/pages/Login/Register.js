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
                request.post('/zyb/sysUser/register', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
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
    handleEnterKey = (e) => {
        if(e.keyCode === 13){
            //do somethings
            this.handleOperator()
        }
    }
    componentDidMount(){
        document.addEventListener("keydown",this.handleEnterKey);
    }
    componentWillUmount(){
        document.removeEventListener("keydown",this.handleEenterKey);
    }
    render() {

        return (
            <Card title="登录表单">
                <Form core={this.core}  layout={{label: 7}}>
                        <FormItem label="登录名" name="loginName" defaultMinWidth={false} ><Input style={{width: 230}} placeholder="请输入用户名"/></FormItem>
                        <FormItem label="登录密码" name="loginPassword" defaultMinWidth={false}><Input.Password style={{width: 230}} placeholder="请输入密码"/></FormItem>
                    <FormItem   onKeydown={this.handleEnterKey}>
                        <Button type="primary"  onClick={this.handleOperator}>登录</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default Register;