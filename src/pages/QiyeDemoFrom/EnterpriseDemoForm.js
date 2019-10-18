import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
const validate = {
riskLevel: {type: "string", required: true, message: '风险等级不能为空'},
year: {type: "number", required: true, message: '申报年份不能为空'},
size: {type: "string", required: true, message: '企业规模不能为空'},
workAddress: {type: "string", required: true, message: '工作场所地址不能为空'},

saleMoney: {type: "number", required: true, message: '营业收入不能为空'},
workerNumber: {type: "number", required: true, message: '从业人数不能为空'},
womenWorkerNumber: {type: "number", required: true, message: '从业人数中的女工数不能为空'},
outNumber: {type: "number", required: true, message: '劳务派遣用工人数不能为空'},
outWomenNumber: {type: "number", required: true, message: '劳务派遣的女工数不能为空'},

}
class EnterpriseDemoForm extends PureComponent {
 state = {
  Login: 'none',
  Login1: 'none',
  Login2: 'none',
  value: undefined,

 }

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
  this.state.Login='block'
  this.state.Login1='block'
  this.state.Login2='block'
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
 }
 request.get('/zybadmin/areaOfDic/cascadeData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource:res.data})
  }
 })
 request.get('/zybadmin/jianceBasicOfService/cascadeData').then(res =>{
  console.log(res.data)
  if(res.flag){
   this.setState({dataSource1:res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData2').then(res => {
  console.log(res.data)
  if (res.flag) {
   this.setState({dataSource2: res.data})
  }
 })
}
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <div style={{display: this.state.Login1,marginTop:10,marginBottom:10}}>
 <FormItem required={true} label="企业名称" name="name"><Input/></FormItem>
 <FormItem required={true} label="统一社会信用代码" name="code"><Input/></FormItem>
  </div>
 <FormItem required={true} label="风险等级" name="riskLevel">
  <Select value={this.state.city}>

   <option key={"I级"}>{"I级"}</option>
   <option key={"Ⅱ级"}>{"Ⅱ级"}</option>
   <option key={"Ⅲ级"}>{"Ⅲ级"}</option>

  </Select>
 </FormItem>
 <FormItem required={true} label="申报年份" name="year"><InputNumber/></FormItem>
 <FormItem required={true} label="企业规模" name="size">
  <Select value={this.state.city}>
   <option key={"微型"}>{"微型"}</option>
   <option key={"小型"}>{"小型"}</option>
   <option key={"中型"}>{"中型"}</option>
   <option key={"大型"}>{"大型"}</option>

  </Select>
 </FormItem>
  <div style={{display: this.state.Login,marginTop:10,marginBottom:10}}>
   <FormItem required={true} label="省/市/区" name="cascader"><Cascader options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
  </div>
  <FormItem required={true} label="工作场所地址" name="workAddress"><Input/></FormItem>
  <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>

  <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader options={this.state.dataSource2}  onChange={this.onChange} placeholder="所属行业名称"/></FormItem>

  <FormItem required={true} label="核定生产能力" name="productionCapacity"><InputNumber/></FormItem>
 <FormItem required={true} label="生产能力单位类型" name="unitType">
  <Select value={this.state.city}>
   <option key={"万件"}>{"万件"}</option>
   <option key={"万吨"}>{"万吨"}</option>
   <option key={"万立方米"}>{"万立方米"}</option>
   <option key={"万千瓦时"}>{"万千瓦时"}</option>

  </Select>
 </FormItem>
  <div style={{display: this.state.Login2,marginTop:10,marginBottom:10}}>
 <FormItem required={true} label="注册资本" name="regiterMoney"><InputNumber/></FormItem>
 <FormItem required={true} label="注册地址" name="registerAddress"><Input/></FormItem>
 <FormItem required={true} label="注册时间" name="registerDate"><InputNumber/></FormItem>
 <FormItem required={true} label="投产时间" name="startDate"><InputNumber/></FormItem>
 <FormItem required={true} label="资产总额" name="propertyMoney"><InputNumber/></FormItem>
  </div>
 <FormItem required={true} label="营业收入" name="saleMoney"><InputNumber/></FormItem>
 <FormItem required={true} label="从业人数" name="workerNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="从业人数中的女工数" name="womenWorkerNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="劳务派遣用工人数" name="outNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="劳务派遣的女工数" name="outWomenNumber"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default EnterpriseDemoForm
