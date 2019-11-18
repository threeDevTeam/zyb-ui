import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message, Row, Col, Icon} from "antd";
import request from "../../utils/request";
import bj from '../../assets/bj2.jpg'
import styles from './login.less'
import Link from 'umi/link'

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

                        window.location.href = '/supervise'
                        // message.success("登录成功")

                    } else {
                        message.error("账号或密码错误")
                    }
                })
            }
        })
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            //do somethings
            this.handleOperator()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey);
    }

    componentWillUmount() {
        document.removeEventListener("keydown", this.handleEenterKey);
    }

    render() {
        let backgroundImage = 'url(' + bj + ')'
        return (
            <div className={styles.wrapper}>
                <Form core={this.core} className={styles.login}>
                    <div className={styles.loginText}>登录</div>
                    <div className={styles.content}>
                        <FormItem name="loginName"><Input autocomplete="off" prefix={<Icon type="user"
                                                                                           style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                          placeholder="登录名" size='large'/></FormItem>
                        <FormItem name="loginPassword"><Input type="password" autocomplete="off"
                                                              prefix={<Icon type="lock"
                                                                            style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                              placeholder="密码"
                                                              size='large'/></FormItem>
                        <FormItem onKeydown={this.handleEnterKey}><Button size='large'
                                                                          style={{width: 255, marginTop: 20}}
                                                                          onClick={this.handleOperator}
                                                                          type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;录</Button></FormItem>
                    </div>
                    <div className={styles.registerText}><Link to="/user/register">注册账号</Link></div>
                </Form>
            </div>
        )
    }
}

export default Register;