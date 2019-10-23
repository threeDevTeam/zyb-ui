import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater";
import request from "../../utils/request";

let SelectInlineRepeater = Selectify(InlineRepeater)
const validate = {
 checkDate: {type: "number", required: true, message: '检测时间不能为空'},
 checkYear: {type: "number", required: true, message: '检测年份不能为空'},
 checkMonth: {type: "number", required: true, message: '检测月份不能为空'},
 num: {type: "string", required: true, message: '检测报告编号不能为空'},
 enterpriseName: {type: "string", required: true, message: '企业名称不能为空'},
 enterpriseCode: {type: "string", required: true, message: '统一社会信用代码不能为空'},
 registerAddress: {type: "string", required: true, message: '注册地址不能为空'},
 registerSmallName: {type: "string", required: true, message: '登记注册类型的小类名称不能为空'},
 industryBigName: {type: "string", required: true, message: '所属行业的大类名称不能为空'},
 industrySmallName: {type: "string", required: true, message: '所属行业的小类名称不能为空'},
 workAddress: {type: "string", required: true, message: '工作场所地址不能为空'},
 workplaceName: {type: "string", required: true, message: '工作场所名称不能为空'},
 workplaceCode: {type: "number", required: true, message: '工作场所编码不能为空'},
 postBigName: {type: "string", required: true, message: '岗位的大类名称不能为空'},
 postSmallName: {type: "number", required: true, message: '岗位的小类名称不能为空'},
 dangerBigName: {type: "string", required: true, message: '职业病危害因素大类名称不能为空'},
 dangerSmallName: {type: "string", required: true, message: '职业病危害因素小类名称不能为空'},
 decideResult: {type: "string", required: true, message: '判定结果不能为空'},
 reason: {type: "string", required: true, message: '超标原因不能为空'},

}

class JianceDetailOfServiceDemoForm extends PureComponent {
    state = {
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
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        request.get('/zybadmin/areaOfDic/cascadeData').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
        request.get('/zybadmin/jianceDetailOfService/cascadeData1').then(res => {
            if (res && res.flag) {
                this.setState({dataSource1: res.data})
            }
        })
        request.get('/zybadmin/jianceDetailOfService/cascadeData2').then(res => {
            if (res && res.flag) {
                this.setState({dataSource2: res.data})
            }
        })
        request.get('/zybadmin/jianceDetailOfService/cascadeData3').then(res => {
            if (res && res.flag) {
                this.setState({dataSource3: res.data})
            }
        })

        request.get('/zybadmin/jianceDetailOfService/cascadeData4').then(res => {
            if (res && res.flag) {
                this.setState({dataSource4: res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 7}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="检测时间" name="checkDate"><InputNumber/></FormItem>
                <FormItem required={true} label="检测年份" name="checkYear"><InputNumber/></FormItem>
                <FormItem required={true} label="检测月份" name="checkMonth"><InputNumber/></FormItem>
                <FormItem required={true} label="检测报告编号" name="num"><Input/></FormItem>
                <FormItem required={true} label="企业名称" name="enterpriseName"><Input/></FormItem>
                <FormItem required={true} label="统一社会信用代码" name="enterpriseCode"><Input/></FormItem>
                <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 212}} options={this.state.dataSource}
                                                                  onChange={this.onChange}
                                                                  placeholder="请选择省/市/区"/></FormItem>
                <FormItem required={true} label="注册地址" name="registerAddress"><Input/></FormItem>

                <FormItem required={true} label="登记注册类型小类名" name="cascaded1"><Cascader style={{width: 212}} options={this.state.dataSource1}  onChange={this.onChange} placeholder="登记注册类型"/></FormItem>

                <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader style={{width: 212}} options={this.state.dataSource2}  onChange={this.onChange} placeholder="所属行业名称"/></FormItem>

               <FormItem required={true} label="工作场所地址" name="workAddress"><Input/></FormItem>
                <FormItem required={true} label="工作场所名称" name="workplaceName"><Input/></FormItem>
                <FormItem required={true} label="工作场所编码" name="workplaceCode"><InputNumber/></FormItem>
                <FormItem required={true} label="岗位名称" name="cascaded3"><Cascader style={{width: 212}} options={this.state.dataSource3}  onChange={this.onChange} placeholder="岗位名称"/></FormItem>
                <FormItem required={true} label="职业病危害因素名称" name="cascaded4"><Cascader style={{width: 212}} options={this.state.dataSource4}  onChange={this.onChange} placeholder="职业病危害因素名称"/></FormItem>
                <FormItem required={true} value={"合格"}  label="判定结果" name="decideResult">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"合格"}>合格</Radio>
                        <Radio value={"不合格"}>不合格</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem required={true} label="超标原因" name="reason"><Input/></FormItem>

                <FormItem name="course">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem  label='检测结果' name="checkResult"><Input/></FormItem>
                        <FormItem label='类别' name="type">
                            <Select value={this.state.city} style={{width: 212}}>

                                <option key={"CMAC"}>{"CMAC"}</option>
                                <option key={"CTWA"}>{"CTWA"}</option>
                                <option key={"CSTEL"}>{"CSTEL"}</option>
                                <option key={"超限倍数"}>{"超限倍数"}</option>
                                <option key={"其他"}>{"其他"}</option>
                            </Select>
                        </FormItem>
                        <FormItem label='单位' name="unit"><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Form>
        )
    }
}

export default JianceDetailOfServiceDemoForm
