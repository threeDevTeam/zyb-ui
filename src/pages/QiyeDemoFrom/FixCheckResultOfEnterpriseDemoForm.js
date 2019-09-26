import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber} from 'nowrapper/lib/antd'
const validate = {
checkResult: {type: "number", required: true, message: '检测结果不能为空'},
type: {type: "string", required: true, message: '类别不能为空'},
unit: {type: "string", required: true, message: '单位不能为空'},

}
class FixCheckResultOfEnterpriseDemoForm extends PureComponent {
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
  <FormItem label="选择" name="Cascader"><Cascader/></FormItem>
 <FormItem label="检测结果" name="checkResult"><InputNumber/></FormItem>
 <FormItem label="类别" name="type"><Input/></FormItem>
 <FormItem label="单位" name="unit"><Input/></FormItem>
 </Form>
 )
 }
 }
export default FixCheckResultOfEnterpriseDemoForm
