import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import request from "../../utils/request";
const validate = {
 checkDate: {type: "number", required: true, message: '诊断时间不能为空'},
 checkYear: {type: "number", required: true, message: '诊断年份不能为空'},
 checkMonth: {type: "number", required: true, message: '诊断月份不能为空'},
 enterpriseName: {type: "string", required: true, message: '企业名称不能为空'},
 enterpriseCode: {type: "string", required: true, message: '统一社会信用代码不能为空'},
 registerAddress: {type: "string", required: true, message: '注册地址不能为空'},
 registerBigName: {type: "string", required: true, message: '登记注册类型的大类名称不能为空'},
 registerSmallName: {type: "string", required: true, message: '登记注册类型的小类名称不能为空'},
 industryBigName: {type: "string", required: true, message: '所属行业的大类名称不能为空'},
 industrySmallName: {type: "string", required: true, message: '所属行业的小类名称不能为空'},
 workAddress: {type: "string", required: true, message: '工作场所地址不能为空'},
 workplaceName: {type: "string", required: true, message: '工作场所名称不能为空'},
 workplaceCode: {type: "number", required: true, message: '工作场所编码不能为空'},
 postBigName: {type: "string", required: true, message: '岗位的大类名称不能为空'},
 postSmallName: {type: "string", required: true, message: '岗位的小类名称不能为空'},
 name: {type: "string", required: true, message: '姓名不能为空'},
 idNum: {type: "string", required: true, message: '身份证号不能为空'},
 gender: {type: "string", required: true, message: '性别不能为空'},
 age: {type: "number", required: true, message: '年龄不能为空'},
 sickBigName: {type: "string", required: true, message: '职业病大类名称不能为空'},
 sickSmallName: {type: "string", required: true, message: '职业病小类名称不能为空'},
 dangerBigName: {type: "string", required: true, message: '职业病危害因素大类名称不能为空'},
 dangerSmallName: {type: "string", required: true, message: '职业病危害因素小类名称不能为空'},
 touchYear: {type: "number", required: true, message: '接害工龄不能为空'},

}
class ZhenduanDetailOfServiceDemoForm extends PureComponent {
 state = {
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
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
 }
 request.get('/zybadmin/areaOfDic/cascadeData').then(res =>{
  console.log(res.data)
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 request.get('/zybadmin/jianceBasicOfService/cascadeData').then(res =>{
  console.log(res.data)
  if(res && res.flag){
   this.setState({dataSource1:res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData2').then(res => {
  console.log(res.data)
  if (res && res.flag) {
   this.setState({dataSource2: res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData3').then(res => {
  console.log(res.data)
  if (res && res.flag) {
   this.setState({dataSource3: res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData4').then(res => {
  console.log(res.data)
  if (res && res.flag) {
   this.setState({dataSource4: res.data})
  }
 })
 request.get('/zybadmin/zhenduanDetailOfService/cascadeData5').then(res => {
  console.log(res.data)
  if (res && res.flag) {
   this.setState({dataSource5: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label:7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="诊断时间" name="checkDate"><InputNumber/></FormItem>
 <FormItem required={true} label="诊断年份" name="checkYear"><InputNumber/></FormItem>
 <FormItem required={true} label="诊断月份" name="checkMonth"><InputNumber/></FormItem>
 <FormItem required={true} label="企业名称" name="enterpriseName"><Input/></FormItem>
 <FormItem required={true} label="统一社会信用代码" name="enterpriseCode"><Input/></FormItem>
  <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 212}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
  <FormItem required={true} label="注册地址" name="registerAddress"><Input/></FormItem>
  <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader style={{width: 212}} options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>

  <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader style={{width: 212}} options={this.state.dataSource2}  onChange={this.onChange} placeholder="所属行业名称"/></FormItem>

  <FormItem required={true} label="工作场所地址" name="workAddress"><Input/></FormItem>
 <FormItem required={true} label="工作场所名称" name="workplaceName"><Input/></FormItem>
 <FormItem required={true} label="工作场所编码" name="workplaceCode"><InputNumber/></FormItem>
  <FormItem required={true} label="岗位名称" name="cascaded3"><Cascader style={{width: 212}} options={this.state.dataSource3}  onChange={this.onChange} placeholder="岗位名称"/></FormItem>

  <FormItem required={true} label="姓名" name="name"><Input/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input/></FormItem>
 <FormItem required={true} label="性别" name="gender">
  <Radio.Group  value={this.state.value} >
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber/></FormItem>
  <FormItem required={true} label="职业病名称" name="cascaded5"><Cascader style={{width: 212}} options={this.state.dataSource5}  onChange={this.onChange} placeholder="职业病名称"/></FormItem>

  <FormItem required={true} label="职业病危害因素名称" name="cascaded4"><Cascader style={{width: 212}} options={this.state.dataSource4}  onChange={this.onChange} placeholder="职业病危害因素名称"/></FormItem>

  <FormItem required={true} label="接害工龄" name="touchYear"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default ZhenduanDetailOfServiceDemoForm
