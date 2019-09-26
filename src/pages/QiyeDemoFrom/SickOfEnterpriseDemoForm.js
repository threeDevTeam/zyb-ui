import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
sickBigName: {type: "string", required: true, message: '职业病大类名称不能为空'},
sickSmallName: {type: "string", required: true, message: '职业病小类名称不能为空'},
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
 request.get('/zybadmin/sickOfEnterprise/TreeSelcetData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>

  <FormItem label="姓名" name="name"><Input/></FormItem>
 <FormItem label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem label="职业病大类名称" name="sickBigName"><Input/></FormItem>
 <FormItem label="职业病小类名称" name="sickSmallName"><Input/></FormItem>
 <FormItem label="病人类别" name="type">
  <Select >
   <option key={"新病例"}>{"新病例"}</option>
   <option key={"首次晋期"}>{"首次晋期"}</option>
   <option key={"再次晋期"}>{"再次晋期"}</option>
  </Select>
 </FormItem>
 <FormItem label="诊断机构" name="org"><Input/></FormItem>
 <FormItem label="诊断日期" name="checkDate"><InputNumber/></FormItem>
 <FormItem label="诊断年份" name="checkYear"><InputNumber/></FormItem>
 <FormItem label="诊断月份" name="checkMonth"><InputNumber/></FormItem>
 <FormItem label="发病工龄" name="sickYear"><InputNumber/></FormItem>
 <FormItem label="是否进行了职业病病人报告" name="isReport">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem label="职业病损失工作日" name="workDay"><InputNumber/></FormItem>
 <FormItem label="新增" name="increase"><Input/></FormItem>
 <FormItem label="转归情况" name="transform">
  <Select >
   <option key={"治愈中"}>{"治愈中"}</option>
   <option key={"康复"}>{"康复"}</option>
   <option key={"死亡"}>{"死亡"}</option>
  </Select>
 </FormItem>
 <FormItem label="死亡日期" name="dieDate"><InputNumber/></FormItem>
 <FormItem label="死亡年份" name="dieYear"><InputNumber/></FormItem>
 <FormItem label="死亡月份" name="dieMonth"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default SickOfEnterpriseDemoForm
