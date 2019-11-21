import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
type: {type: "string", required: true, message: '病人类别不能为空'},
org: {type: "string", required: true, message: '诊断机构不能为空'},
checkDate: {type: "number", required: true, message: '诊断日期不能为空'},
checkYear: {type: "number", required: true, message: '诊断年份不能为空'},
checkMonth: {type: "number", required: true, message: '诊断月份不能为空'},
sickYear: {type: "number", required: true, message: '发病工龄不能为空'},
isReport: {type: "string", required: true, message: '是否进行了职业病病人报告不能为空'},
workDay: {type: "number", required: true, message: '职业病损失工作日不能为空'},
increase: {type: "string", required: true, message: '新增不能为空'},
transform: {type: "string", required: true, message: '转归情况不能为空'},
dieDate: {type: "number", required: true, message: '死亡日期不能为空'},
dieYear: {type: "number", required: true, message: '死亡年份不能为空'},
dieMonth: {type: "number", required: true, message: '死亡月份不能为空'},

}
class SickOfEnterpriseDemoForm extends PureComponent {
 state = {
  value: undefined,
 };
 onChange = value => {
  this.setState({ value });
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
  let dieDateStr = record.dieDateStr
  delete record.dieDateStr
  this.core.setValue('dieDateStr', moment(dieDateStr, 'YYYY-MM-DD'))
 }

 request.get('/zyb/zhenduanDetailOfService/cascadeData5').then(res => {
  if (res && res.flag) {
   this.setState({dataSource1: res.data})
  }
 })
 request.get('/zyb/sickOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 230}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem style={{display: 'none'}} name="id"><Input style={{width: 230}}/></FormItem>
  <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}}/></FormItem>
  <FormItem required={true} label="职业病名称" name="cascaded1"><Cascader style={{width: 230}} options={this.state.dataSource1}  onChange={this.onChange} placeholder="职业病名称"/></FormItem>

  <FormItem required={true} label="病人类别" name="type">
  <Select style={{width: 230}} >
   <option key={"新病例"}>{"新病例"}</option>
   <option key={"首次晋期"}>{"首次晋期"}</option>
   <option key={"再次晋期"}>{"再次晋期"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="诊断机构" name="org"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="诊断日期" name="checkDateStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择诊断日期"/></FormItem>
 <FormItem required={true} label="诊断年份" name="checkYear"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="诊断月份" name="checkMonth"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="发病工龄" name="sickYear"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} value={"是"}  label="是否进行了职业病病人报告" name="isReport">
  <Radio.Group style={{width:200,paddingLeft:10}} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="职业病损失工作日" name="workDay"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="新增" name="increase"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="转归情况" name="transform">
  <Select style={{width: 230}}>
   <option key={"治愈中"}>{"治愈中"}</option>
   <option key={"康复"}>{"康复"}</option>
   <option key={"死亡"}>{"死亡"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="死亡日期" name="dieDateStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择死亡日期"/></FormItem>
 <FormItem required={true} label="死亡年份" name="dieYear"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="死亡月份" name="dieMonth"><InputNumber style={{width: 230}}/></FormItem>
 </Form>
 )
 }
 }
export default SickOfEnterpriseDemoForm
