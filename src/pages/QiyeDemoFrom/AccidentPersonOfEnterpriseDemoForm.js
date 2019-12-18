import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/zh_CN';
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
 this.core.setValue('gender','男')
 this.core.setValue('isDie','是')
 if ('edit' === type || 'view' === type) {
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
  let dieDateStr = record.dieDateStr
  delete record.dieDateStr
  this.core.setValue('dieDateStr', moment(dieDateStr, 'YYYY-MM-DD'))
 }
 request.get('/zyb/accidentPersonOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input style={{width: 230}}/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 230}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
  <FormItem required={true} label="职业病危害事故编号" name="accidentNum"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="性别" name="gender">
  <Radio.Group  style={{width:200}}>
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="是否死亡" name="isDie">
  <Radio.Group  style={{width:200}}>
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true}  label="死亡日期" name="dieDateStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择死亡日期"/></FormItem>
 </Form>
 )
 }
 }
export default AccidentPersonOfEnterpriseDemoForm
