import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater";
import {TreeSelect} from "antd";
import request from "../../utils/request";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

let SelectInlineRepeater = Selectify(InlineRepeater)
const validate = {
    checkDate: {type: "number", required: true, message: '检测时间不能为空'},
    checkYear: {type: "number", required: true, message: '检测年份不能为空'},
    org: {type: "string", required: true, message: '检测机构不能为空'},
    code: {type: "string", required: true, message: '检测机构的社会统一代码不能为空'},
    num: {type: "string", required: true, message: '检测报告编号不能为空'},
    decideResult: {type: "string", required: true, message: '判定结果不能为空'},
    reason: {type: "string", required: true, message: '超标原因不能为空'},
    dangerLevel: {type: "string", required: true, message: '危害程度级别不能为空'},

}

class FixCheckOfEnterpriseDemoForm extends PureComponent {
    state = {
        value: undefined,
    };
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
            let checkDateStr = record.checkDateStr
            delete record.checkDateStr
            this.core.setValue('checkDateStr', moment(checkDateStr, 'YYYY-MM-DD'))
        }
        request.get('/zyb/fixCheckOfEnterprise/TreeSelcetData').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 9}}>
                <FormItem style={{display: 'none'}} name="id"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'}
                                                                                     style={{width: 230}}
                                                                                     placeholder="请选择工作场所"
                                                                                     treeData={this.state.dataSource}
                                                                                     onChange={this.onChange}/></FormItem>
                <FormItem required={true} label="检测时间" name="checkDateStr"><DatePicker locale={locale}
                                                                                       style={{width: 230}}
                                                                                       placeholder="请选择检测时间"/></FormItem>
                <FormItem required={true} label="检测年份" value={2019} name="checkYear"><InputNumber style={{width: 230}}/></FormItem>
                <FormItem required={true} label="检测月份" name="checkMonth">
                    <Select style={{width: 230}}>

                        <option key={"1"}>{"1"}</option>
                        <option key={"2"}>{"2"}</option>
                        <option key={"3"}>{"3"}</option>
                        <option key={"4"}>{"4"}</option>
                        <option key={"5"}>{"5"}</option>
                        <option key={"6"}>{"6"}</option>
                        <option key={"7"}>{"7"}</option>
                        <option key={"8"}>{"8"}</option>
                        <option key={"9"}>{"9"}</option>
                        <option key={"10"}>{"10"}</option>
                        <option key={"11"}>{"11"}</option>
                        <option key={"12"}>{"12"}</option>
                    </Select>
                </FormItem>
                <FormItem required={true} label="检测机构" name="org"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="检测机构的社会统一代码" name="code"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="检测报告编号" name="num"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} value={"合格"} label="判定结果" name="decideResult">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"合格"}>合格</Radio>
                        <Radio value={"不合格"}>不合格</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem required={true} label="超标原因" name="reason"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="危害程度级别" name="dangerLevel">
                    <Radio.Group value={this.state.value} style={{width: 230}}>
                        <Radio value={"轻度"}>轻度</Radio>
                        <Radio value={"中度"}>中度</Radio>
                        <Radio value={"高度"}>高度</Radio>
                        <Radio value={"极度"}>极度</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem name="course">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='检测结果' name="checkResult"><Input style={{width: 230}}/></FormItem>
                        <FormItem label='类别' name="type">
                            <Select value={this.state.city} style={{width: 230}}>
                                <option key={"CMAC"}>{"CMAC"}</option>
                                <option key={"CTWA"}>{"CTWA"}</option>
                                <option key={"CSTEL"}>{"CSTEL"}</option>
                                <option key={"超限倍数"}>{"超限倍数"}</option>
                                <option key={"其他"}>{"其他"}</option>
                            </Select>
                        </FormItem>
                        <FormItem label='单位' name="unit">
                            <Select value={this.state.city} style={{width: 230}}>

                                <option key={"mg/m3"}>{"mg/m3"}</option>
                                <option key={"kV"}>{"kV"}</option>
                                <option key={"..."}>{"..."}</option>

                            </Select>
                        </FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Form>
        )
    }
}

export default FixCheckOfEnterpriseDemoForm
