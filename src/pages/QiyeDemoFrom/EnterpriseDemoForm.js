import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

const validate = {
    year: {type: "number", required: true, message: '申报年份不能为空'},
    workAddress: {type: "string", required: true, message: '工作场所地址不能为空'},

    saleMoney: {type: "number", required: true, message: '营业收入不能为空'},
    workerNumber: {type: "number", required: true, message: '从业人数不能为空'},
    womenWorkerNumber: {type: "number", required: true, message: '从业人数中的女工数不能为空'},
    outNumber: {type: "number", required: true, message: '劳务派遣用工人数不能为空'},
    outWomenNumber: {type: "number", required: true, message: '劳务派遣的女工数不能为空'},

}

class EnterpriseDemoForm extends PureComponent {
    state = {
        Login: 'none',
        Login1: 'none',
        Login2: 'none',
        value: undefined,

    }

    onChange = value => {
        this.setState({value});
    };

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {
        let currentYear=new Date().getFullYear()
        this.core.setValue('year',currentYear)
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')

            this.state.Login = 'block'
            this.state.Login1 = 'block'
            this.state.Login2 = 'block'
            let registerDateStr = record.registerDateStr
            console.log(registerDateStr)
            delete record.registerDateStr
            this.core.setValue('registerDateStr', moment(registerDateStr, 'YYYY-MM-DD'))

            let startDateStr = record.startDateStr
            delete record.startDateStr
            this.core.setValue('startDateStr', moment(startDateStr, 'YYYY-MM-DD'))
        }
        request.get('/zyb/areaOfDic/cascadeData').then(res => {

            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
        request.get('/zyb/jianceBasicOfService/cascadeData').then(res => {

            if (res && res.flag) {
                this.setState({dataSource1: res.data})
            }
        })
        request.get('/zyb/jianceDetailOfService/cascadeData2').then(res => {

            if (res && res.flag) {
                this.setState({dataSource2: res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <div style={{display: this.state.Login1, marginTop: 10, marginBottom: 10}}>
                    <FormItem required={true} label="企业名称" name="name"><Input style={{width: 230}}/></FormItem>
                    <FormItem required={true} label="统一社会信用代码" name="code"><Input style={{width: 230}}/></FormItem>
                </div>

                <FormItem required={true} label="申报年份"  name="year"><InputNumber
                    style={{width: 230}}/></FormItem>

                <div style={{display: this.state.Login, marginTop: 10, marginBottom: 10}}>
                    <FormItem required={true} label="风险等级" name="riskLevel">
                        <Input style={{width: 230}}  disabled/>
                        {/*<Select value={this.state.city} style={{width: 230}} disabled>*/}

                        {/*    <option key={"I级"}>{"I级"}</option>*/}
                        {/*    <option key={"Ⅱ级"}>{"Ⅱ级"}</option>*/}
                        {/*    <option key={"Ⅲ级"}>{"Ⅲ级"}</option>*/}

                        {/*</Select>*/}
                    </FormItem>
                    <FormItem required={true} label="企业规模" name="size">
                        <Input style={{width: 230}} disabled/>
                    </FormItem>
                    <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 230}}
                                                                                      options={this.state.dataSource}
                                                                                      onChange={this.onChange}
                                                                                      placeholder="请选择省/市/区"/></FormItem>
                </div>
                <div style={{marginTop: 10, marginBottom: 10}}>
                    <FormItem required={true} label="工作场所地址" name="workAddress"><Input style={{width: 230}}/></FormItem>
                </div>

                <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader style={{width: 230}}
                                                                                    options={this.state.dataSource1}
                                                                                    onChange={this.onChange1}
                                                                                    placeholder="登记注册类型"/></FormItem>

                <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader style={{width: 230}}
                                                                                    options={this.state.dataSource2}
                                                                                    onChange={this.onChange}
                                                                                    placeholder="所属行业名称"/></FormItem>


                <div style={{display: this.state.Login2, marginTop: 10, marginBottom: 10}}>
                    <FormItem required={true} label="核定生产能力" name="productionCapacity"><InputNumber
                        style={{width: 230}}/></FormItem>
                    <FormItem required={true} label="生产能力单位类型" name="unitType">
                        <Select value={this.state.city} style={{width: 230}}>
                            <option value={"万件"}>{"万件"}</option>
                            <option value={"万吨"}>{"万吨"}</option>
                            <option value={"万立方米"}>{"万立方米"}</option>
                            <option value={"万千瓦时"}>{"万千瓦时"}</option>

                        </Select>
                    </FormItem>
                    <FormItem required={true} label="注册资本" name="regiterMoney"><InputNumber
                        style={{width: 230}}/></FormItem>
                    <FormItem required={true} label="注册地址" name="registerAddress"><Input
                        style={{width: 230}}/></FormItem>
                    <FormItem required={true} disabled label="注册时间" name="registerDateStr"><DatePicker locale={locale}
                                                                                                       style={{width: 230}}
                                                                                                       placeholder="请选择注册时间"/></FormItem>
                    <FormItem required={true} label="投产时间" name="startDateStr"><DatePicker locale={locale}
                                                                                           style={{width: 230}}
                                                                                           placeholder="请选择投产时间"/></FormItem>
                    <FormItem required={true} label="资产总额" name="propertyMoney"><InputNumber
                        style={{width: 230}}/></FormItem>
                </div>
                <div style={{marginTop: 10, marginBottom: 10}}>
                    <FormItem required={true} label="营业收入" name="saleMoney"><InputNumber
                        style={{width: 230}}/></FormItem>
                </div>
                <FormItem required={true} label="从业人数" name="workerNumber"><InputNumber
                    style={{width: 230}}/></FormItem>
                <FormItem required={true} label="从业人数中的女工数" name="womenWorkerNumber"><InputNumber style={{width: 230}}/></FormItem>
                <FormItem required={true} label="劳务派遣用工人数" name="outNumber"><InputNumber
                    style={{width: 230}}/></FormItem>
                <FormItem required={true} label="劳务派遣的女工数" name="outWomenNumber"><InputNumber
                    style={{width: 230}}/></FormItem>
            </Form>
        )
    }
}

export default EnterpriseDemoForm
