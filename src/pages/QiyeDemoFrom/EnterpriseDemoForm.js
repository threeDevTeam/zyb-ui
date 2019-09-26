import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Select} from 'nowrapper/lib/antd'
const validate = {
riskLevel: {type: "string", required: true, message: '风险等级不能为空'},
year: {type: "number", required: true, message: '申报年份不能为空'},
size: {type: "string", required: true, message: '企业规模不能为空'},

workAddress: {type: "string", required: true, message: '工作场所地址不能为空'},
registerBigName: {type: "string", required: true, message: '登记注册类型的大类名称不能为空'},
registerSmallName: {type: "string", required: true, message: '登记注册类型的小类名称不能为空'},
industryBigName: {type: "string", required: true, message: '所属行业的大类名称不能为空'},
industrySmallName: {type: "string", required: true, message: '所属行业的小类名称不能为空'},

saleMoney: {type: "number", required: true, message: '营业收入不能为空'},
workerNumber: {type: "number", required: true, message: '从业人数不能为空'},
womenWorkerNumber: {type: "number", required: true, message: '从业人数中的女工数不能为空'},
outNumber: {type: "number", required: true, message: '劳务派遣用工人数不能为空'},
outWomenNumber: {type: "number", required: true, message: '劳务派遣的女工数不能为空'},

}
class EnterpriseDemoForm extends PureComponent {
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
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
 <FormItem label="企业名称" name="name"><Input/></FormItem>
 <FormItem label="统一社会信用代码" name="code"><Input/></FormItem>
 <FormItem label="风险等级" name="riskLevel">
  <Select value={this.state.city}>

   <option key={"I级"}>{"I级"}</option>
   <option key={"Ⅱ级"}>{"Ⅱ级"}</option>
   <option key={"Ⅲ级"}>{"Ⅲ级"}</option>

  </Select>
 </FormItem>
 <FormItem label="申报年份" name="year"><InputNumber/></FormItem>
 <FormItem label="企业规模" name="size">
  <Select value={this.state.city}>
   <option key={"微型"}>{"微型"}</option>
   <option key={"小型"}>{"小型"}</option>
   <option key={"中型"}>{"中型"}</option>
   <option key={"大型"}>{"大型"}</option>

  </Select>
 </FormItem>
 <FormItem label="省的名称" name="provinceName"><Input/></FormItem>
 <FormItem label="省的代码" name="provinceCode"><Input/></FormItem>
 <FormItem label="市的名称" name="cityName"><Input/></FormItem>
 <FormItem label="市的代码" name="cityCode"><Input/></FormItem>
 <FormItem label="区的名称" name="districtName"><Input/></FormItem>
 <FormItem label="区的代码" name="districtCode"><Input/></FormItem>
 <FormItem label="工作场所地址" name="workAddress"><Input/></FormItem>
 <FormItem label="登记注册类型的大类名称" name="registerBigName"><Input/></FormItem>
 <FormItem label="登记注册类型的小类名称" name="registerSmallName"><Input/></FormItem>
 <FormItem label="所属行业的大类名称" name="industryBigName"><Input/></FormItem>
 <FormItem label="所属行业的小类名称" name="industrySmallName"><Input/></FormItem>
 <FormItem label="核定生产能力" name="productionCapacity"><InputNumber/></FormItem>
 <FormItem label="生产能力单位类型" name="unitType">
  <Select value={this.state.city}>
   <option key={"万件"}>{"万件"}</option>
   <option key={"万吨"}>{"万吨"}</option>
   <option key={"万立方米"}>{"万立方米"}</option>
   <option key={"万千瓦时"}>{"万千瓦时"}</option>

  </Select>
 </FormItem>
 <FormItem label="注册资本" name="regiterMoney"><InputNumber/></FormItem>
 <FormItem label="注册地址" name="registerAddress"><Input/></FormItem>
 <FormItem label="注册时间" name="registerDate"><InputNumber/></FormItem>
 <FormItem label="投产时间" name="startDate"><InputNumber/></FormItem>
 <FormItem label="资产总额" name="propertyMoney"><InputNumber/></FormItem>
 <FormItem label="营业收入" name="saleMoney"><InputNumber/></FormItem>
 <FormItem label="从业人数" name="workerNumber"><InputNumber/></FormItem>
 <FormItem label="从业人数中的女工数" name="womenWorkerNumber"><InputNumber/></FormItem>
 <FormItem label="劳务派遣用工人数" name="outNumber"><InputNumber/></FormItem>
 <FormItem label="劳务派遣的女工数" name="outWomenNumber"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default EnterpriseDemoForm