import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
accidentNum: {type: "string", required: true, message: '职业病危害事故编号不能为空'},
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
gender: {type: "string", required: true, message: '性别不能为空'},
age: {type: "number", required: true, message: '年龄不能为空'},
isDie: {type: "string", required: true, message: '是否死亡不能为空'},
dieDate: {type: "number", required: true, message: '死亡日期不能为空'},

}
class AccidentPersonOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/accidentPersonOfEnterprise/TreeSelcetData').then(res =>{
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
  <FormItem required={true} label="职业病危害事故编号" name="accidentNum"><Input/></FormItem>
 <FormItem required={true} label="姓名" name="name"><Input/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem required={true} value={"男"} label="性别" name="gender">
  <Radio.Group  >
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber/></FormItem>
 <FormItem required={true} value={"是"} label="是否死亡" name="isDie">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} value={"是"} label="死亡日期" name="dieDate"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default AccidentPersonOfEnterpriseDemoForm
