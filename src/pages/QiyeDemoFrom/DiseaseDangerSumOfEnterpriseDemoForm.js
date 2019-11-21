import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
const validate = {
total: {type: "number", required: true, message: '接触职业病危害总人数不能为空'},
dust: {type: "number", required: true, message: '接触粉尘人数不能为空'},
chemistry : {type: "number", required: true, message: '接触化学因素人数不能为空'},
physical : {type: "number", required: true, message: '接触物理因素人数不能为空'},
radioactivity: {type: "number", required: true, message: '接触放射性因素人数不能为空'},
biology: {type: "number", required: true, message: '接触生物因素人数不能为空'},
year: {type: "number", required: true, message: '年份不能为空'},
month: {type: "number", required: true, message: '月份不能为空'},

}
class DiseaseDangerSumOfEnterpriseDemoForm extends PureComponent {
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
 <FormItem required={true} label="接触职业病危害总人数" name="total"><InputNumber/></FormItem>
 <FormItem required={true} label="接触粉尘人数" name="dust"><InputNumber/></FormItem>
 <FormItem required={true} label="接触化学因素人数" name="chemistry "><InputNumber/></FormItem>
 <FormItem required={true} label="接触物理因素人数" name="physical "><InputNumber/></FormItem>
 <FormItem required={true} label="接触放射性因素人数" name="radioactivity"><InputNumber/></FormItem>
 <FormItem required={true} label="接触生物因素人数" name="biology"><InputNumber/></FormItem>
 <FormItem required={true} label="年份" value={2019} name="year"><InputNumber/></FormItem>
 <FormItem required={true} label="月份" name="month"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default DiseaseDangerSumOfEnterpriseDemoForm
