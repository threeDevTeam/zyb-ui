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
org: {type: "string", required: true, message: '检查机构不能为空'},
checkDate: {type: "number", required: true, message: '检查日期不能为空'},
checkYear: {type: "number", required: true, message: '检查年份不能为空'},
sickYear: {type: "number", required: true, message: '发病工龄不能为空'},
isReport: {type: "string", required: true, message: '是否进行了疑似职业病病人报告不能为空'},

}
class AlikeSickOfEnterpriseDemoForm extends PureComponent {
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
 }
 request.get('/zyb/alikeSickOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core}layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 230}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
  <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="检查机构" name="org"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="检查日期" name="checkDateStr"><DatePicker locale={locale} style={{width: 230}} placeholder="请选择检查日期"/></FormItem>
 <FormItem required={true} label="检查年份" value={2019} name="checkYear"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="检查月份" name="checkMonth">
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
 <FormItem required={true} label="发病工龄" name="sickYear"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true}  value={"是"} label="是否进行了疑似职业病病人报告" name="isReport">
  <Radio.Group style={{width:200}} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default AlikeSickOfEnterpriseDemoForm
