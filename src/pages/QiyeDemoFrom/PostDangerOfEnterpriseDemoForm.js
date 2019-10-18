import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
upDatee: {type: "number", required: true, message: '申报时间不能为空'},
upYear: {type: "number", required: true, message: '申报年份不能为空'},
upMonth: {type: "number", required: true, message: '申报月份不能为空'},
hurt: {type: "string", required: true, message: '可能引起的急性职业伤害不能为空'},
workTime: {type: "number", required: true, message: '工作时间不能为空'},
touchTime: {type: "number", required: true, message: '接触时间不能为空'},
touchFrequency: {type: "number", required: true, message: '接触频次不能为空'},
touchMode: {type: "string", required: true, message: '作业方式不能为空'},

}
class PostDangerOfEnterpriseDemoForm extends PureComponent {
 state = {
  value: undefined,
 };
 onChange = value => {
  console.log(value);
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
 request.get('/zybadmin/postDangerOfEnterprise/TreeSelcetData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource:res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData4').then(res => {
  console.log(res.data)
  if (res.flag) {
   this.setState({dataSource1: res.data})
  }
 })
 request.get('/zybadmin/zhenduanDetailOfService/cascadeData5').then(res => {
  console.log(res.data)
  if (res.flag) {
   this.setState({dataSource2: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 8}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="申报时间" name="upDatee"><InputNumber/></FormItem>
 <FormItem required={true} label="申报年份" name="upYear"><InputNumber/></FormItem>
 <FormItem required={true} label="申报月份" name="upMonth"><InputNumber/></FormItem>
  <FormItem required={true} label="职业病危害因素名称" name="cascaded1"><Cascader options={this.state.dataSource1}  onChange={this.onChange} placeholder="职业病危害因素名称"/></FormItem>

  <FormItem required={true} label="可能导致的职业病名称" name="cascaded2"><Cascader options={this.state.dataSource2}  onChange={this.onChange} placeholder="可能导致的职业病名称"/></FormItem>

  <FormItem required={true} label="可能引起的急性职业伤害" name="hurt"><Input/></FormItem>
 <FormItem required={true} label="工作时间" name="workTime"><InputNumber/></FormItem>
 <FormItem required={true} label="接触时间" name="touchTime"><InputNumber/></FormItem>
 <FormItem required={true} label="接触频次" name="touchFrequency"><InputNumber/></FormItem>
 <FormItem required={true} label="作业方式" name="touchMode">
  <Select value={this.state.city}>
   <option key={"定点作业"}>{"定点作业"}</option>
   <option key={"巡检作业"}>{"巡检作业"}</option>
   <option key={"手工作业"}>{"手工作业"}</option>
   <option key={"自动控制"}>{"自动控制"}</option>

  </Select>
 </FormItem>
 </Form>
 )
 }
 }
export default PostDangerOfEnterpriseDemoForm
