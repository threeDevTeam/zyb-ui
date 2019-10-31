import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Select} from 'nowrapper/lib/antd'
const validate = {
checkResult: {type: "number", required: true, message: '检测结果不能为空'},
type: {type: "string", required: true, message: '类别不能为空'},
unit: {type: "string", required: true, message: '单位不能为空'},

}
class JianceDetailResultOfServiceDemoForm extends PureComponent {
 state = {}
 constructor(props) {
  super(props);
this.core = new FormCore({validateConfig: validate});
 }
componentWillMount() {
 }
 render() {
  return (
 <Form core={this.core} layout={{label:7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="检测结果" name="checkResult"><InputNumber/></FormItem>
 <FormItem required={true} label="类别" name="type"><Input/></FormItem>
 <FormItem required={true} label="单位" name="unit">
  <Select style={{width: 212}}>

   <option key={"mg/m3"}>{"mg/m3"}</option>
   <option key={"kV"}>{"kV"}</option>
   <option key={"..."}>{"..."}</option>

  </Select>
 </FormItem>
 </Form>
 )
 }
 }
export default JianceDetailResultOfServiceDemoForm
