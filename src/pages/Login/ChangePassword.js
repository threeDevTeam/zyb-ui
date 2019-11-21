import React, {PureComponent} from 'react'
import {Button, Input} from 'nowrapper/lib/antd'
import Form, {FormCore, FormItem} from 'noform'
import {Card, Col, Layout, message, Row} from "antd";
import request from "../../utils/request";
import logo from "../../assets/logo.png"
import Link from 'umi/link'

const validate = {
    loginPassword: {type: "string", required: true, message: '旧密码不能为空'},
    newPassword: {type: "string", required: true, message: '新密码不能为空'}
}

class ChangePassword extends PureComponent {
    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    handleOperator = () => {
        this.core.validate((err) => {
            if (!err) {
                request.post('/zyb/sysUser/changePassword', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        window.location.href = '/user/login'
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
            <div style={{background: '#f2f4f5',height:'100vh'}}>
                <Layout.Header
                    style={{background: '#fff', padding: 0, marginBottom: 10, height: 70, boxShadow: '0 0 12px #ccc'}}>
                    <img src={logo} style={{float: 'left', paddingTop: 10, paddingLeft: 20}}/>
                    <span style={{paddingRight: 70, float: "left", marginLeft: 10}}><h2
                        style={{color: '#1890FF', fontWeight: 'bold', letterSpacing: 8}}>职业病危害监测预警预控云服务平台</h2></span>
                    <div style={{
                        display: 'inline-block',
                        float: 'right',
                        marginRight: 80,
                        marginTop: 13,
                        fontSize: 18
                    }}>已有账号？<Link to="/user/login">请登录></Link></div>
                </Layout.Header>
                <Row>
                    <Col span={8} offset={8}>
                        <Card title="修改密码"   headStyle={{fontWeight: 'bold', fontSize: '18px', letterSpacing: 4}}>

                            <Form core={this.core} layout={{label: 7}}>
                                <div style={{fontSize:'16px',marginTop:20}}>
                                <FormItem label="旧密码" name="loginPassword"><Input.Password
                                    placeholder="请输入旧密码" size={'large'}/></FormItem>
                                <FormItem label="新密码" name="newPassword"><Input.Password
                                    placeholder="请输入新密码" size={'large'}/></FormItem>
                                <FormItem>
                                    <Button style={{marginTop:30}} size={'large'} type="primary" onClick={this.handleOperator}>确认修改</Button>
                                </FormItem>
                                </div>
                            </Form>

                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChangePassword;