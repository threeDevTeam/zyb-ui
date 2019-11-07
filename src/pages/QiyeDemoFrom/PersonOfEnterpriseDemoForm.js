import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
gender: {type: "string", required: true, message: '性别不能为空'},
age: {type: "number", required: true, message: '年龄不能为空'},

}
class PersonOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zyb/personOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 212}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="姓名" name="name"><Input/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem required={true}  value={"男"} label="性别" name="gender">
  <Radio.Group  value={this.state.value} style={{width:200,paddingLeft:10}}>
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default PersonOfEnterpriseDemoForm
