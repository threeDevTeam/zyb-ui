import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
gender: {type: "string", required: true, message: '性别不能为空'},
birth: {type: "number", required: true, message: '出生日期不能为空'},
startDate: {type: "number", required: true, message: '上岗时间不能为空'},
leaveDate: {type: "number", required: true, message: '离岗时间不能为空'},
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
 }
 request.get('/zybadmin/touchPersonOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 212}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="姓名" name="name"><Input/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem required={true} label="性别" name="gender">
  <Radio.Group  value={this.state.value} >
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="出生日期" name="birth"><InputNumber/></FormItem>
 <FormItem required={true} label="上岗时间" name="startDate"><InputNumber/></FormItem>
 <FormItem required={true} label="离岗时间" name="leaveDate"><InputNumber/></FormItem>
 <FormItem required={true} label="接害工龄" name="touchYear"><InputNumber/></FormItem>
 <FormItem required={true} value={"是"}  label="是否缴纳工伤保险" name="isBuy">
  <Radio.Group  value={this.state.value} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} value={"是"}  label="是否签订劳动合同" name="isSign">
  <Radio.Group  value={this.state.value} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} value={"是"}  label="是否参加职业卫生培训" name="isPractice">
  <Radio.Group  value={this.state.value} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default TouchPersonOfEnterpriseDemoForm
