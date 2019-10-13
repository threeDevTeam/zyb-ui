import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
const validate = {
year: {type: "number", required: true, message: '年份不能为空'},
count2: {type: "number", required: true, message: '体检人数不能为空'},

}
class TijianTotalOfServiceDemoForm extends PureComponent {
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
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="年份" name="year"><InputNumber/></FormItem>
 <FormItem required={true} label="体检人数" name="count2"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default TijianTotalOfServiceDemoForm
