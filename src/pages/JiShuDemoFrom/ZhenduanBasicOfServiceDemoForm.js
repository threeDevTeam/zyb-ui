import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Select} from 'nowrapper/lib/antd'
const validate = {
year: {type: "number", required: true, message: '申报年份不能为空'},
registerBigName: {type: "string", required: true, message: '登记注册类型的大类名称不能为空'},
registerSmallName: {type: "string", required: true, message: '登记注册类型的小类名称不能为空'},
level: {type: "string", required: true, message: '资质等级不能为空'},
num: {type: "string", required: true, message: '资质证书编号不能为空'},
doctorNum: {type: "number", required: true, message: '诊断医师数量不能为空'},
projectCount: {type: "number", required: true, message: '诊断项目数量不能为空'},
scope: {type: "string", required: true, message: '诊断能力不能为空'},
hospitalLevel: {type: "string", required: true, message: '医院等级不能为空'},

}
class ZhenduanBasicOfServiceDemoForm extends PureComponent {
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
 <FormItem label="机构名称" name="name"><Input/></FormItem>
 <FormItem label="社会统一代码" name="code"><Input/></FormItem>
 <FormItem label="申报年份" name="year"><InputNumber/></FormItem>
 <FormItem label="省的名称" name="provinceName"><Input/></FormItem>
 <FormItem label="省的代码" name="provinceCode"><Input/></FormItem>
 <FormItem label="市的名称" name="cityName"><Input/></FormItem>
 <FormItem label="市的代码" name="cityCode"><Input/></FormItem>
 <FormItem label="区的名称" name="districtName"><Input/></FormItem>
 <FormItem label="区的代码" name="districtCode"><Input/></FormItem>
 <FormItem label="注册地址" name="registerAddress"><Input/></FormItem>
 <FormItem label="登记注册类型的大类名称" name="registerBigName"><Input/></FormItem>
 <FormItem label="登记注册类型的小类名称" name="registerSmallName"><Input/></FormItem>
 <FormItem label="资质等级" name="level">
     <Select value={this.state.city}>

         <option key={"甲级"}>{"甲级"}</option>
         <option key={"乙级"}>{"乙级"}</option>
         <option key={"丙级"}>{"丙级"}</option>

     </Select>
 </FormItem>
 <FormItem label="资质证书编号" name="num"><Input/></FormItem>
 <FormItem label="诊断医师数量" name="doctorNum"><InputNumber/></FormItem>
 <FormItem label="诊断项目数量" name="projectCount"><InputNumber/></FormItem>
 <FormItem label="诊断能力" name="scope">
     <Select value={this.state.city}>

         <option key={"粉尘"}>{"粉尘"}</option>
         <option key={"化学因素"}>{"化学因素"}</option>
         <option key={"物理因素"}>{"物理因素"}</option>
         <option key={"放射性因素"}>{"放射性因素"}</option>
         <option key={"生物因素"}>{"生物因素"}</option>
     </Select>
 </FormItem>
 <FormItem label="医院等级" name="hospitalLevel">
     <Select value={this.state.city}>

         <option key={"一级"}>{"一级"}</option>
         <option key={"二级"}>{"二级"}</option>
         <option key={"三级"}>{"三级"}</option>

     </Select>
 </FormItem>
 </Form>
 )
 }
 }
export default ZhenduanBasicOfServiceDemoForm
