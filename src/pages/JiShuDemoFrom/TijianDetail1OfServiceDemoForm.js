import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/zh_CN';
const validate = {
 checkDate: {type: "number", required: true, message: '体检时间不能为空'},
 checkYear: {type: "number", required: true, message: '体检年份不能为空'},
 checkMonth: {type: "number", required: true, message: '体检月份不能为空'},
 num: {type: "string", required: true, message: '体检报告编号不能为空'},
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
 workYear: {type: "number", required: true, message: '工龄不能为空'},
 tijianType: {type: "string", required: true, message: '体检类别不能为空'},
 result: {type: "string", required: true, message: '体检结果不能为空'},

}
class TijianDetail1OfServiceDemoForm extends PureComponent {
 state = {
  value: undefined,
 }

 onChange = value => {
  this.setState({ value });
 };
 constructor(props) {
  super(props);
this.core = new FormCore({validateConfig: validate});
 }
componentWillMount() {  let {type, record} = this.props.option
 if ('edit' === type || 'view' === type) {
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
  let checkDateStr = record.checkDateStr
  delete record.checkDateStr
  this.core.setValue('checkDateStr', moment(checkDateStr, 'YYYY-MM-DD'))
 }
 request.get('/zyb/areaOfDic/cascadeData').then(res => {
  if (res && res.flag) {
   this.setState({dataSource: res.data})
  }
 })
 request.get('/zyb/jianceBasicOfService/cascadeData').then(res =>{
  if(res.flag){
   this.setState({dataSource1:res.data})
  }
 })
 request.get('/zyb/jianceDetailOfService/cascadeData2').then(res => {
  if (res.flag) {
   this.setState({dataSource2: res.data})
  }
 })
 request.get('/zyb/jianceDetailOfService/cascadeData3').then(res => {

  if (res.flag) {
   this.setState({dataSource3: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="体检时间" name="checkDateStr"><DatePicker locale={locale} style={{width: 230}}  placeholder="请选择体检时间"/></FormItem>
 <FormItem required={true} label="体检年份" name="checkYear"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="体检月份" name="checkMonth"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="体检报告编号" name="num"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="企业名称" name="enterpriseName"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="统一社会信用代码" name="enterpriseCode"><Input style={{width: 230}} /></FormItem>
  <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 230}}  options={this.state.dataSource}
                                                    onChange={this.onChange}
                                                    placeholder="请选择省/市/区"/></FormItem>
  <FormItem required={true} label="注册地址" name="registerAddress"><Input style={{width: 230}} /></FormItem>
  <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader style={{width: 230}} options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>
  <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader style={{width: 230}} options={this.state.dataSource2}  onChange={this.onChange} placeholder="所属行业名称"/></FormItem>

  <FormItem required={true} label="工作场所地址" name="workAddress"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工作场所名称" name="workplaceName"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工作场所编码" name="workplaceCode"><InputNumber style={{width: 230}} /></FormItem>
  <FormItem required={true} label="岗位名称" name="cascaded3"><Cascader style={{width: 230}} options={this.state.dataSource3}  onChange={this.onChange} placeholder="岗位名称"/></FormItem>

  <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}} /></FormItem>
 <FormItem value={"男"} required={true} label="性别" name="gender">
  <Radio.Group  value={this.state.value} style={{width:200}}>
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工龄" name="workYear"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="体检类别" name="tijianType">
  <Select value={this.state.city} style={{width: 230}}>

   <option key={"上岗前"}>{"上岗前"}</option>
   <option key={"在岗期间"}>{"在岗期间"}</option>
   <option key={"离岗时"}>{"离岗时"}</option>
   <option key={"应急"}>{"应急"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="体检结果" name="result">
  <Select value={this.state.city} style={{width: 230}}>

   <option key={"复查"}>{"复查"}</option>
   <option key={"目前未见异常"}>{"目前未见异常"}</option>
   <option key={"其他疾病"}>{"其他疾病"}</option>
   <option key={"职业禁忌证"}>{"职业禁忌证"}</option>
  </Select>
 </FormItem>
 </Form>
 )
 }
 }
export default TijianDetail1OfServiceDemoForm
