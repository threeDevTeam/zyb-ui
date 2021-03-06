import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, DatePicker, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/zh_CN';
const validate = {
 checkDate: {type: "number", required: true, message: '体检时间不能为空'},
 checkYear: {type: "number", required: true, message: '体检年份不能为空'},
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
 dangerBigName: {type: "string", required: true, message: '职业病危害因素大类名称不能为空'},
 dangerSmallName: {type: "string", required: true, message: '职业病危害因素小类名称不能为空'},
 sickBigName: {type: "string", required: true, message: '疑似职业病大类名称不能为空'},
 sickSmallName: {type: "string", required: true, message: '疑似职业病小类名称不能为空'},

}
class TijianDetail2OfServiceDemoForm extends PureComponent {
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
componentWillMount() {
 let currentYear=new Date().getFullYear()
 this.core.setValue('checkYear',currentYear)
 this.core.setValue('gender','男')
 let {type, record} = this.props.option
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
  if(res && res.flag){
   this.setState({dataSource1:res.data})
  }
 })
 request.get('/zyb/jianceDetailOfService/cascadeData2').then(res => {
  if (res && res.flag) {
   this.setState({dataSource2: res.data})
  }
 })
 request.get('/zyb/jianceDetailOfService/cascadeData3').then(res => {
  if (res && res.flag) {
   this.setState({dataSource3: res.data})
  }
 })
 request.get('/zyb/jianceDetailOfService/cascadeData4').then(res => {
  if (res && res.flag) {
   this.setState({dataSource4: res.data})
  }
 })
 request.get('/zyb/zhenduanDetailOfService/cascadeData5').then(res => {
  if (res && res.flag) {
   this.setState({dataSource5: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label:8}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem required={true} label="体检时间" name="checkDateStr"><DatePicker locale={locale} style={{width: 230}}  placeholder="请选择体检时间"/></FormItem>
 <FormItem required={true} label="体检年份"  name="checkYear">
  <InputNumber  style={{width: 230}} />
 </FormItem>
 <FormItem required={true} label="体检月份" name="checkMonth">
  <Select style={{width: 230}}>

   <option key={"1"}>{"1"}</option>
   <option key={"2"}>{"2"}</option>
   <option key={"3"}>{"3"}</option>
   <option key={"4"}>{"4"}</option>
   <option key={"5"}>{"5"}</option>
   <option key={"6"}>{"6"}</option>
   <option key={"7"}>{"7"}</option>
   <option key={"8"}>{"8"}</option>
   <option key={"9"}>{"9"}</option>
   <option key={"10"}>{"10"}</option>
   <option key={"11"}>{"11"}</option>
   <option key={"12"}>{"12"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="体检报告编号" name="num"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="企业名称" name="enterpriseName"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="统一社会信用代码" name="enterpriseCode"><Input style={{width: 230}} /></FormItem>
  <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 230}} options={this.state.dataSource}
                                                    onChange={this.onChange}
                                                    placeholder="请选择省/市/区"/></FormItem>
  <FormItem required={true} label="注册地址" name="registerAddress"><Input style={{width: 230}} /></FormItem>
  <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader style={{width: 230}} options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>

  <FormItem required={true} label="所属行业名称" name="cascaded2"><Cascader  style={{width: 230}} options={this.state.dataSource2}  onChange={this.onChange} placeholder="所属行业名称"/></FormItem>

  <FormItem required={true} label="工作场所地址" name="workAddress"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工作场所名称" name="workplaceName"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工作场所编码" name="workplaceCode"><InputNumber style={{width: 230}} /></FormItem>
  <FormItem required={true} label="岗位名称" name="cascaded3"><Cascader style={{width: 230}} options={this.state.dataSource3}  onChange={this.onChange} placeholder="岗位名称"/></FormItem>

  <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}} /></FormItem>
 <FormItem  required={true} label="性别" name="gender">
  <Radio.Group  value={this.state.value}style={{width:200}} >
   <Radio value={"男"}>男</Radio>
   <Radio value={"女"}>女</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="年龄" name="age"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="工龄" name="workYear"><InputNumber style={{width: 230}} /></FormItem>
  <FormItem required={true} label="职业病危害因素名称" name="cascaded4"><Cascader style={{width: 230}} options={this.state.dataSource4}  onChange={this.onChange} placeholder="职业病危害因素名称"/></FormItem>

  <FormItem required={true} label="可能导致的职业病名称" name="cascaded5"><Cascader style={{width: 230}} options={this.state.dataSource5}  onChange={this.onChange} placeholder="可能导致的职业病名称"/></FormItem>

 </Form>
 )
 }
 }
export default TijianDetail2OfServiceDemoForm
