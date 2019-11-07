import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog, Cascader,DatePicker} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message} from "antd";
import request from "../../utils/request";
import moment from "moment";


const validate = {
    loginName: {type: "string", required: true, message: '登录名不能为空'},
    loginPassword: {type: "string", required: true, message: '登录密码不能为空'},

    ConfirmPassword: (values, context) => { // dynamic validate config
        const {loginPassword} = values;
        const {ConfirmPassword} = values;
        if (ConfirmPassword === null) {
            return {type: "string", required: true, message: '确认密码不能为空'};
        } else if (loginPassword !== ConfirmPassword) {
            message.error("密码不一致");
            return {type: "string", required: true, message: '密码不一致'};

        }
    },

    email: {type: "string", required: true, message: 'email不能为空或错误'},
    mobile: {type: "string", required: true, message: '手机号码不能为空'},
    type: {type: "string", required: true, message: '用户类型不能为空'},
    companyName: {type: "string", required: true, message: '企业名称不能为空'},
    code: {type: "string", required: true, message: '统一社会信用代码不能为空'},
    provinceName: {type: "string", required: true, message: '省的名称不能为空'},
    provinceCode: {type: "string", required: true, message: '省的代码不能为空'},
    cityName: {type: "string", required: true, message: '市的名称不能为空'},
    cityCode: {type: "string", required: true, message: '市的代码不能为空'},
    districtName: {type: "string", required: true, message: '区的名称不能为空'},
    districtCode: {type: "string", required: true, message: '区的代码不能为空'},
    productionCapacity: {type: "string", required: true, message: '核定生产能力不能为空'},
    unitType: {type: "string", required: true, message: '生产能力单位类型不能为空'},
    regiterMoney: {type: "string", required: true, message: '注册资本不能为空'},
    registerAddress: {type: "string", required: true, message: '注册地址不能为空'},
    propertyMoney: {type: "string", required: true, message: '资产总额不能为空'},
}

class SysUserLogin extends PureComponent {

    state = {
        value: undefined,
        dataSource:[],
        Login: 'block',
        displayEnterprise: 'none',
        displayGov: 'none',
        displayService: 'none',
        primaryreturn: 'none',
        study: 'block',
        handleOperator: 'none'
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {

    }

    study = () => {
        if ("企业" === this.core.value.type) {
            this.setState({
                Login: 'none',
                displayEnterprise: 'block',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'block',
                study: 'none',
                handleOperator: 'block'
            })
        }
        if ("政府监管部门" === this.core.value.type) {
            this.setState({
                Login: 'none',
                displayEnterprise: 'none',
                displayGov: 'block',
                displayService: 'none',
                primaryreturn: 'block',
                study: 'none',
                handleOperator: 'block'
            })
        }
        if ("技术服务机构" === this.core.value.type) {
            this.setState({
                Login: 'none',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'block',
                primaryreturn: 'block',
                study: 'none',
                handleOperator: 'block'
            })
        }
        if ("普通用户" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                study: 'none',
                handleOperator: 'block'
            })
        }
    }
    handleOperator = () => {
        this.core.validate((err) => {
            if (!err) {
                if (this.core.value.type === '企业') {

                    //提取日期
                    if (this.core.value.registerDateStr) {
                        this.core.value.registerDateStr = this.core.value.registerDateStr.format('YYYY-MM-DD')
                    }
                    //提取日期
                    if (this.core.value.startDateStr) {
                        this.core.value.startDateStr = this.core.value.startDateStr.format('YYYY-MM-DD')
                    }
                    request.post('/zyb/enterpriseOfRegister/add', {data: this.core.value}).then(res => {
                        console.log(res)
                        if (res && res.flag) {
                            message.success("操作成功")
                            window.location.href ='/user/login'
                        } else {
                            message.error("操作失败")
                        }
                    })
                }

            } else if (this.core.value.type === '政府监管部门') {
                request.post('/zyb/superviseOfRegister/add', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        message.success("操作成功")
                        window.location.href ='/user/login'
                    } else {
                        message.error("操作失败")
                    }
                })
            } else if (this.core.value.type === '技术服务机构') {
                request.post('/zyb/serviceOfRegister/add', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        message.success("操作成功")
                        window.location.href ='/user/login'
                    } else {
                        message.error("操作失败")
                    }
                })
            } else if (this.core.value.type === '普通用户') {
                request.post('/zyb/sysUser/add', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        message.success("操作成功")
                        window.location.href ='/user/login'
                    } else {
                        message.error("操作失败")
                    }
                })
            }
        })
    }
    primaryreturn = () => {
        if ("企业" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
        if ("政府监管部门" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
        if ("技术服务机构" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
    }

    onSelect = (value) => {
        if ("企业" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
        if ("政府监管部门" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
        if ("技术服务机构" === this.core.value.type) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                primaryreturn: 'none',
                study: 'block',
                handleOperator: 'none'
            })
        }
        if ("普通用户" === value) {
            this.setState({
                Login: 'block',
                displayEnterprise: 'none',
                displayGov: 'none',
                displayService: 'none',
                study: 'none',
                handleOperator: 'block'
            })
        }
    }
    componentWillMount() {

        request.get('/zyb/areaOfDic/cascadeData').then(res =>{
            if(res.flag){
                this.setState({dataSource:res.data})
            }
        })
    }
    onChange = value => {
        this.setState({ value });
    };
    render() {
        const dateFormat = 'YYYY/MM/DD';
        return (
            <Card title="注册表单">
                <div>
                    <Button type="primary" style={{display: this.state.primaryreturn}}
                            onClick={this.primaryreturn}>返回上一层</Button>
                </div>
                <Form core={this.core} layout={{label: 7}}>
                    <div style={{display: this.state.Login}}>
                        <FormItem label="登录名" name="loginName" required={true}><Input style={{width: 212}} placeholder="请输入用户名"/></FormItem>
                        <FormItem label="登录密码" name="loginPassword" required={true}><Input.Password style={{width: 212}} placeholder="请输入密码"/></FormItem>
                        <FormItem label="确认密码" name="ConfirmPassword" required={true}><Input.Password style={{width: 212}} placeholder="请输入密码"/></FormItem>
                        <FormItem label="电子邮箱" name="email" required={true}><Input placeholder="email"/></FormItem>
                        <FormItem label="手机号码" name="mobile" required={true}><Input style={{width: '100%'}}
                                                                    placeholder="请输入电话号码"/></FormItem>
                        <FormItem label="用户类型" name="type" required={true}>
                            <Select onSelect={this.onSelect} style={{width: 212}} placeholder="----请选择用户类型----">
                                <option key={"企业"}>{"企业"}</option>
                                <option key={"政府监管部门"}>{"政府监管部门"}</option>
                                <option key={"技术服务机构"}>{"技术服务机构"}</option>
                                <option key={"普通用户"}>{"普通用户"}</option>
                            </Select>
                        </FormItem>
                        <FormItem label="企业名称" name="companyName" required={true}><Input  placeholder="请选择企业名称"/></FormItem>
                    </div>
                    <div style={{display: this.state.displayEnterprise}}>
                        <br/>
                        <FormItem label="统一社会信用代码" name="code" required={true}><Input/></FormItem>
                        <FormItem label="省/市/区" name="cascader" required={true}><Cascader style={{width: 212}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>

                        <FormItem label="核定生产能力" name="productionCapacity" required={true}><Input/></FormItem>
                        <FormItem label="生产能力单位类型" name="unitType" required={true}><Input/></FormItem>
                        <FormItem label="注册资本" name="regiterMoney" required={true}><Input/></FormItem>
                        <FormItem label="注册地址" name="registerAddress" required={true}><Input/></FormItem>
                        <FormItem label="注册时间" name="registerDateStr" required={true}><DatePicker placeholder="请选择注册时间"/></FormItem>
                        <FormItem label="投产时间" name="startDateStr" required={true}><DatePicker placeholder="请选择投产时间"/></FormItem>
                        <FormItem label="资产总额" name="propertyMoney" required={true}><Input/></FormItem>
                    </div>
                    <div style={{display: this.state.displayGov}}>
                        <br/>
                        <FormItem label="省/市/区" name="cascader" required={true}><Cascader style={{width: 212}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
                        <FormItem label="注册地址" name="registerAddress" required={true}><Input/></FormItem>
                    </div>
                    <div style={{display: this.state.displayService}}>
                        <br/>
                        <FormItem label="社会统一代码" name="code" required={true}><Input/></FormItem>
                        <FormItem label="省/市/区" name="cascader" required={true}><Cascader style={{width: 212}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
                        <FormItem label="注册地址" name="registerAddress" required={true}><Input/></FormItem>
                        <FormItem label="机构类型" name="type2" required={true}>
                            <Select placeholder="----请选择机构类型----" style={{width: 212}}>
                                <option key={"检测机构"}>{"检测机构"}</option>
                                <option key={"体检机构"}>{"体检机构"}</option>
                                <option key={"诊断机构"}>{"诊断机构"}</option>
                            </Select>
                        </FormItem>

                    </div>
                    <br/>
                    <FormItem direction="horizontal" style={{marginLeft:290}}>
                        <Button style={{display: this.state.study}} type="primary" onClick={this.study}>下一步</Button>
                    </FormItem>

                    <FormItem direction="horizontal">
                        <Button style={{display: this.state.handleOperator}} type="primary"
                                onClick={this.handleOperator}>注册</Button>
                    </FormItem>

                </Form>
            </Card>
        );
    }
}

export default SysUserLogin;