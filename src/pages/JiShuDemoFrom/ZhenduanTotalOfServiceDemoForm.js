import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
const validate = {
year: {type: "number", required: true, message: '年份不能为空'},
count1: {type: "number", required: true, message: '诊断人数不能为空'},
count2: {type: "number", required: true, message: '诊断职业病企业数不能为空'},

}
class ZhenduanTotalOfServiceDemoForm extends PureComponent {
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
 }
 }
 render() {
  return (
 <Form core={this.core} layout={{label:8}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="年份" value={new Date().getFullYear()} name="year"><InputNumber/></FormItem>
 <FormItem required={true} label="诊断人数" name="count1"><InputNumber/></FormItem>
 <FormItem required={true} label="诊断职业病企业数" name="count2"><InputNumber/></FormItem>

 </Form>
 )
 }
 }
export default ZhenduanTotalOfServiceDemoForm
