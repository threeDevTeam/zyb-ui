import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
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
 request.get('/zyb/monitorOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'}  style={{width: 212}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="监测周期" name="cycle"><Input/></FormItem>
 <FormItem required={true} label="监测时间" name="monitorTime"><InputNumber/></FormItem>
 <FormItem required={true} label="监测结果" name="monitorResult"><InputNumber/></FormItem>
 <FormItem required={true} label="单位" name="unit">
  <Select value={this.state.city} style={{width: 212}}>

   <option key={"mg/m3"}>{"mg/m3"}</option>
   <option key={"kV"}>{"kV"}</option>
   <option key={"..."}>{"..."}</option>

  </Select>
 </FormItem>
 <FormItem required={true} value={"合格"} label="判定结果" name="decideResult">
  <Radio.Group  value={this.state.value} style={{width:200,paddingLeft:10}}>
   <Radio value={"合格"}>合格</Radio>
   <Radio value={"不合格"}>不合格</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default MonitorOfEnterpriseDemoForm
