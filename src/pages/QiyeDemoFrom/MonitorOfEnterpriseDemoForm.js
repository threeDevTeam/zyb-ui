import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
cycle: {type: "string", required: true, message: '监测周期不能为空'},
monitorTime: {type: "number", required: true, message: '监测时间不能为空'},
monitorResult: {type: "number", required: true, message: '监测结果不能为空'},
unit: {type: "string", required: true, message: '单位不能为空'},
decideResult: {type: "string", required: true, message: '判定结果不能为空'},

}
class MonitorOfEnterpriseDemoForm extends PureComponent {
 state = {
  value: undefined,
 };
 onChange = value => {
  console.log(value);
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
 }
 request.get('/zybadmin/monitorOfEnterprise/TreeSelcetData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem label="监测周期" name="cycle"><Input/></FormItem>
 <FormItem label="监测时间" name="monitorTime"><InputNumber/></FormItem>
 <FormItem label="监测结果" name="monitorResult"><InputNumber/></FormItem>
 <FormItem label="单位" name="unit"><Input/></FormItem>
 <FormItem label="判定结果" name="decideResult">
  <Radio.Group  value={this.state.value} >
   <Radio value={"合格"}>合格</Radio>
   <Radio value={"不合格"}>不合格</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default MonitorOfEnterpriseDemoForm