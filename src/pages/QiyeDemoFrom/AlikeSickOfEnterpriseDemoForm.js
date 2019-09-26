import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
org: {type: "string", required: true, message: '检查机构不能为空'},
checkDate: {type: "number", required: true, message: '检查日期不能为空'},
checkYear: {type: "number", required: true, message: '检查年份不能为空'},
checkMonth: {type: "number", required: true, message: '检查月份不能为空'},
sickYear: {type: "number", required: true, message: '发病工龄不能为空'},
isReport: {type: "string", required: true, message: '是否进行了疑似职业病病人报告不能为空'},

}
class AlikeSickOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/alikeSickOfEnterprise/TreeSelcetData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core}layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
  <FormItem label="姓名" name="name"><Input/></FormItem>
 <FormItem label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem label="检查机构" name="org"><Input/></FormItem>
 <FormItem label="检查日期" name="checkDate"><InputNumber/></FormItem>
 <FormItem label="检查年份" name="checkYear"><InputNumber/></FormItem>
 <FormItem label="检查月份" name="checkMonth"><InputNumber/></FormItem>
 <FormItem label="发病工龄" name="sickYear"><InputNumber/></FormItem>
 <FormItem label="是否进行了疑似职业病病人报告" name="isReport">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default AlikeSickOfEnterpriseDemoForm