import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {DatePicker, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
const validate = {
year: {type: "number", required: true, message: '年份不能为空'},
isAccept: {type: "string", required: true, message: '是否接受过相关部门检查不能为空'},
checkDate: {type: "number", required: true, message: '检查时间不能为空'},
org: {type: "string", required: true, message: '检查部门不能为空'},
content: {type: "string", required: true, message: '检查内容不能为空'},
question: {type: "string", required: true, message: '发现问题不能为空'},
isPunish: {type: "string", required: true, message: '是否被行政处罚不能为空'},
type: {type: "string", required: true, message: '行政处罚类别不能为空'},
money: {type: "number", required: true, message: '罚款金额不能为空'},
isChange: {type: "string", required: true, message: '是否落实整改不能为空'},

}
class CheckOfEnterpriseDemoForm extends PureComponent {
 state = {}
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
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="年份" value={2019} name="year"><InputNumber/></FormItem>
 <FormItem required={true}  value={"是"} label="是否受过相关部门检查" name="isAccept">
  <Radio.Group  style={{width:200}} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="检查时间" name="checkDateStr"><DatePicker locale={locale} placeholder="请选择检查时间"/></FormItem>
 <FormItem required={true} label="检查部门" name="org"><Input/></FormItem>
 <FormItem required={true} label="检查内容" name="content"><Input/></FormItem>
 <FormItem required={true} label="发现问题" name="question"><Input/></FormItem>
 <FormItem required={true}  value={"是"} label="是否被行政处罚" name="isPunish">
  <Radio.Group style={{width:200}}  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="行政处罚类别" name="type"><Input/></FormItem>
 <FormItem required={true} label="罚款金额" name="money"><InputNumber/></FormItem>
 <FormItem required={true}  value={"是"} label="是否落实整改" name="isChange">
  <Radio.Group  style={{width:200}} >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default CheckOfEnterpriseDemoForm
