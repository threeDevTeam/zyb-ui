import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
const validate = {
year: {type: "number", required: true, message: '申报年份不能为空'},
registerBigName: {type: "string", required: true, message: '登记注册类型的大类名称不能为空'},
registerSmallName: {type: "string", required: true, message: '登记注册类型的小类名称不能为空'},
level: {type: "string", required: true, message: '资质等级不能为空'},
num: {type: "string", required: true, message: '资质证书编号不能为空'},
technologyCount: {type: "number", required: true, message: '专业技术人员数不能为空'},
passCount: {type: "number", required: true, message: '经培训合格数不能为空'},
equipmentCount: {type: "number", required: true, message: '检测仪器台套数不能为空'},
projectCount: {type: "number", required: true, message: '计量认证项目数不能为空'},

}
class JianceBasicOfServiceDemoForm extends PureComponent {
 state = {
  Login: 'none',
  Login1: 'none',
  value: undefined,

 }

 onChange = value => {
  this.setState({ value });
 };
 onChange1 = value => {
  this.setState({ value });
 };
 constructor(props) {
  super(props);
this.core = new FormCore({validateConfig: validate});
 }
componentWillMount() {
 let currentYear=new Date().getFullYear()
 this.core.setValue('year',currentYear)
 let {type, record} = this.props.option
 if ('edit' === type || 'view' === type) {
  this.state.Login='block'
  this.state.Login1='block'
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
 }
 request.get('/zyb/areaOfDic/cascadeData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 request.get('/zyb/jianceBasicOfService/cascadeData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource1:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label:8}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <div style={{display: this.state.Login,marginBottom:10}}>
  <FormItem required={true} label="机构名称" name="name"><Input style={{width:230}}/></FormItem>
  <FormItem required={true} label="社会统一代码" name="code"><Input style={{width:230}}/></FormItem>
 </div>
  <div style={{marginBottom:10}}>
   <FormItem required={true} label="申报年份"  name="year"><InputNumber  style={{width:230}}/></FormItem>
  </div>
  <div style={{display: this.state.Login1,marginTop:10,marginBottom:10}}>
   <FormItem required={true} label="省/市/区" name="cascader"><Cascader  style={{width:230}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
 <FormItem required={true} label="注册地址" name="registerAddress"><Input style={{width:230}}/></FormItem>
  </div>
  <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader  style={{width:230}}options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>

  <FormItem required={true} label="资质等级" name="level">
  <Select value={this.state.city}  style={{width:230}}>

   <option key={"甲级"}>{"甲级"}</option>
   <option key={"乙级"}>{"乙级"}</option>
   <option key={"丙级"}>{"丙级"}</option>

  </Select>
 </FormItem>
 <FormItem required={true} label="资质证书编号" name="num"><Input style={{width:230}}/></FormItem>
 <FormItem required={true} label="专业技术人员数" name="technologyCount"><InputNumber style={{width:230}}/></FormItem>
 <FormItem required={true} label="经培训合格数" name="passCount"><InputNumber style={{width:230}}/></FormItem>
 <FormItem required={true} label="检测仪器台套数" name="equipmentCount"><InputNumber style={{width:230}}/></FormItem>
 <FormItem required={true} label="计量认证项目数" name="projectCount"><InputNumber style={{width:230}}/></FormItem>
 </Form>
 )
 }
 }
export default JianceBasicOfServiceDemoForm
