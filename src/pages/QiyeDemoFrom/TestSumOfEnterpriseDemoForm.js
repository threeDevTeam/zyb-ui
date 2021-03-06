import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
const validate = {
year: {type: "number", required: true, message: '体检年份不能为空'},
month: {type: "number", required: true, message: '体检月份不能为空'},
shouldNum: {type: "number", required: true, message: '应检人数不能为空'},
realNum: {type: "number", required: true, message: '实检人数不能为空'},
testRate: {type: "number", required: true, message: '体检率不能为空'},
stopNum: {type: "number", required: true, message: '职业禁忌证人数不能为空'},

}
class TestSumOfEnterpriseDemoForm extends PureComponent {
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
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="体检年份"  name="year"><InputNumber placeholder="2019"/></FormItem>
 <FormItem required={true} label="体检月份" name="month"><InputNumber/></FormItem>
 <FormItem required={true} label="应检人数" name="shouldNum"><InputNumber/></FormItem>
 <FormItem required={true} label="实检人数" name="realNum"><InputNumber/></FormItem>
 <FormItem required={true} label="体检率" name="testRate"><InputNumber/></FormItem>
 <FormItem required={true} label="职业禁忌证人数" name="stopNum"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default TestSumOfEnterpriseDemoForm
