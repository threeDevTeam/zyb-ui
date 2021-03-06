import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
const validate = {
accidentNum: {type: "string", required: true, message: '职业病危害事故编号不能为空'},
startTime: {type: "number", required: true, message: '事故发生时间不能为空'},
place: {type: "string", required: true, message: '事故发生地点不能为空'},
sickCount: {type: "number", required: true, message: '发病人数不能为空'},
treatCount: {type: "number", required: true, message: '送医院治疗人数不能为空'},
dieCount: {type: "number", required: true, message: '死亡人数不能为空'},
directLose: {type: "number", required: true, message: '直接经济损失不能为空'},
indirectLose: {type: "number", required: true, message: '间接经济损失不能为空'},
reason: {type: "string", required: true, message: '事故原因不能为空'},
process: {type: "string", required: true, message: '事故经过不能为空'},
isReport: {type: "string", required: true, message: '是否向有关部门报告不能为空'},

}
class AccidentSumOfEnterpriseDemoForm extends PureComponent {
 state = {}
 constructor(props) {
  super(props);
this.core = new FormCore({validateConfig: validate});
 }
componentWillMount() {
 let {type, record} = this.props.option
 this.core.setValue('isReport','是')
 if ('edit' === type || 'view' === type) {
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
 }
 request.get('/zyb/jianceDetailOfService/cascadeData4').then(res => {
  if (res && res.flag) {
   this.setState({dataSource1: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="职业病危害事故编号" name="accidentNum"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="事故发生时间" name="startTime"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="事故发生地点" name="place"><Input style={{width: 230}}/></FormItem>
  <FormItem required={true} label="导致事故的职业病危害因素名称" name="cascaded1"><Cascader style={{width: 230}} options={this.state.dataSource1}  onChange={this.onChange} placeholder="职业病危害因素名称"/></FormItem>

 <FormItem required={true} label="发病人数" name="sickCount"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="送医院治疗人数" name="treatCount"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="直接经济损失" name="directLose"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="间接经济损失" name="indirectLose"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="事故原因" name="reason"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="事故经过" name="process"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true}  label="是否向有关部门报告" name="isReport">
  <Radio.Group  style={{width:200}}>
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default AccidentSumOfEnterpriseDemoForm
