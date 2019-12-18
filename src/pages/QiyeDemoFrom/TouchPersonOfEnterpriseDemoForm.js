import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import moment from 'moment'
import request from "../../utils/request";
import locale from "antd/es/date-picker/locale/zh_CN";

const validate = {
    name: {type: "string", required: true, message: '姓名不能为空'},
    idNum: {type: "string", required: true, message: '身份证号不能为空'},
    gender: {type: "string", required: true, message: '性别不能为空'},
    touchYear: {type: "number", required: true, message: '接害工龄不能为空'},
    isBuy: {type: "string", required: true, message: '是否缴纳工伤保险不能为空'},
    isSign: {type: "string", required: true, message: '是否签订劳动合同不能为空'},
    isPractice: {type: "string", required: true, message: '是否参加职业卫生培训不能为空'},

}

class TouchPersonOfEnterpriseDemoForm extends PureComponent {
    state = {
        value: undefined,
    };
    onChange = value => {
        this.setState({value});
    };

    constructor(props) {
        super(props);
        this.core = new FormCore();
    }

    componentWillMount() {
        let {type, record} = this.props.option
        this.core.setValue('gender','男')
        this.core.setValue('isBuy','是')
        this.core.setValue('isSign','是')
        this.core.setValue('isPractice','是')

        if ('edit' === type || 'view' === type) {
            console.log(record)
            // //提取和删除日期
            let birthStr = record.birthStr
            delete record.birthStr
            this.core.setValue('birthStr', moment(birthStr, 'YYYY-MM-DD'))
            // //提取和删除日期
            let startDateStr = record.startDateStr
            delete record.startDateStr
            this.core.setValue('startDateStr', moment(startDateStr, 'YYYY-MM-DD'))
            // //提取和删除日期
            let leaveDateStr = record.leaveDateStr
            delete record.leaveDateStr
            this.core.setValue('leaveDateStr', moment(leaveDateStr, 'YYYY-MM-DD'))
            //
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
            //设置日期
        }
        request.get('/zyb/touchPersonOfEnterprise/TreeSelcetData').then(res => {
            if (res && res.flag) {
                this.setState({dataSource: res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 9}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'}
                                                                                     style={{width: 230}}
                                                                                     placeholder="请选择工作场所"
                                                                                     treeData={this.state.dataSource}
                                                                                     onChange={this.onChange}/></FormItem>
                <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="性别" name="gender">
                    <Radio.Group value={this.state.value} style={{width:200,paddingLeft:10}}>
                        <Radio value={"男"}>男</Radio>
                        <Radio value={"女"}>女</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem required={true} label="出生日期" name="birthStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择出生日期"/></FormItem>
                <FormItem required={true} label="上岗时间" name="startDateStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择上岗时间"/></FormItem>
                <FormItem required={true} label="离岗时间" name="leaveDateStr"><DatePicker  locale={locale} style={{width: 230}} placeholder="请选择离岗时间"/></FormItem>
                <FormItem required={true} label="接害工龄" name="touchYear"><InputNumber style={{width: 230}}/></FormItem>
                <FormItem required={true} label="是否缴纳工伤保险" name="isBuy">
                    <Radio.Group value={this.state.value} style={{width:200,paddingLeft:10}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem required={true} label="是否签订劳动合同" name="isSign">
                    <Radio.Group value={this.state.value} style={{width:200,paddingLeft:10}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem required={true} label="是否参加职业卫生培训" name="isPractice">
                    <Radio.Group value={this.state.value} style={{width:200,paddingLeft:10}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
            </Form>
        )
    }
}

export default TouchPersonOfEnterpriseDemoForm
