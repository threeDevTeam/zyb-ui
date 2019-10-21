import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
const validate = {
name: {type: "string", required: true, message: '产品名称不能为空'},
status: {type: "string", required: true, message: '产品状态不能为空'},
yearNumber: {type: "number", required: true, message: '产品年产量不能为空'},
productionType: {type: "string", required: true, message: '产量类型不能为空'},
middleName: {type: "string", required: true, message: '中间品名称不能为空'},
middleStatus: {type: "string", required: true, message: '中间品状态不能为空'},
middleYearNumber: {type: "number", required: true, message: '中间品年产量不能为空'},
materialName: {type: "string", required: true, message: '原辅料名称不能为空'},
materialStatus: {type: "string", required: true, message: '原辅料状态不能为空'},
materialYearNumber: {type: "number", required: true, message: '原辅料年用量不能为空'},
materialType: {type: "string", required: true, message: '用量类型不能为空'},
describe: {type: "string", required: true, message: '主要生产工艺描述不能为空'},
isExist: {type: "string", required: true, message: '是否存在职业病危害工艺岗位不能为空'},
isFisrt: {type: "string", required: true, message: '是否优先采用有利于职业病防治和保护劳动者健康的新技术、新工艺和新材料不能为空'},
isUse: {type: "string", required: true, message: '是否使用国家明令禁止的可能产生职业病危害的设备和材料不能为空'},
isHave: {type: "string", required: true, message: '可能产生职业病危害的设备、化学品是否有中文说明书不能为空'},

}
class ProcuctionOfEnterpriseDemoForm extends PureComponent {
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
 <FormItem required={true} label="产品名称" name="name"><Input/></FormItem>
 <FormItem required={true} label="产品状态" name="status">
  <Select style={{width: 212}}>
   <option key={"固态"}>{"固态"}</option>
   <option key={"液态"}>{"液态"}</option>
   <option key={"气态"}>{"气态"}</option>
   <option key={"其他"}>{"其他"}</option>

  </Select>
 </FormItem>
 <FormItem required={true} label="产品年产量" name="yearNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="产量类型" name="productionType"><Input/></FormItem>
 <FormItem required={true} label="中间品名称" name="middleName"><Input/></FormItem>
 <FormItem required={true} label="中间品状态" name="middleStatus"><Input/></FormItem>
 <FormItem required={true} label="中间品年产量" name="middleYearNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="原辅料名称" name="materialName"><Input/></FormItem>
 <FormItem required={true} label="原辅料状态" name="materialStatus"><Input/></FormItem>
 <FormItem required={true} label="原辅料年用量" name="materialYearNumber"><InputNumber/></FormItem>
 <FormItem required={true} label="用量类型" name="materialType"><Input/></FormItem>
 <FormItem required={true} label="主要生产工艺描述" name="describee"><Input/></FormItem>
 <FormItem required={true} label="是否存在职业病危害工艺岗位" name="isExist">
  <Radio.Group>
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="是否优先采用有利于职业病防治和保护劳动者健康的新技术、新工艺和新材料" name="isFisrt">
  <Radio.Group>
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="是否使用国家明令禁止的可能产生职业病危害的设备和材料" name="isUse">
  <Radio.Group>
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="可能产生职业病危害的设备、化学品是否有中文说明书" name="isHave">
  <Radio.Group >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default ProcuctionOfEnterpriseDemoForm
