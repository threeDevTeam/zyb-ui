import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater";
import {TreeSelect} from "antd";
import request from "../../utils/request";
let SelectInlineRepeater = Selectify(InlineRepeater)
const validate = {
checkDate: {type: "number", required: true, message: '检测时间不能为空'},
checkYear: {type: "number", required: true, message: '检测年份不能为空'},
checkMonth: {type: "number", required: true, message: '检测月份不能为空'},
org: {type: "string", required: true, message: '检测机构不能为空'},
code: {type: "string", required: true, message: '检测机构的社会统一代码不能为空'},
num: {type: "string", required: true, message: '检测报告编号不能为空'},
decideResult: {type: "string", required: true, message: '判定结果不能为空'},
reason: {type: "string", required: true, message: '超标原因不能为空'},
dangerLevel: {type: "string", required: true, message: '危害程度级别不能为空'},

}
class FixCheckOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/fixCheckOfEnterprise/TreeSelcetData').then(res =>{
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
  <FormItem label="检测时间" name="checkDate"><InputNumber/></FormItem>
 <FormItem label="检测年份" name="checkYear"><InputNumber/></FormItem>
 <FormItem label="检测月份" name="checkMonth"><InputNumber/></FormItem>
 <FormItem label="检测机构" name="org"><Input/></FormItem>
 <FormItem label="检测机构的社会统一代码" name="code"><Input/></FormItem>
 <FormItem label="检测报告编号" name="num"><Input/></FormItem>
 <FormItem label="判定结果" name="decideResult">
  <Radio.Group  value={this.state.value} >
   <Radio value={"合格"}>合格</Radio>
   <Radio value={"不合格"}>不合格</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem label="超标原因" name="reason"><Input/></FormItem>
 <FormItem label="危害程度级别" name="dangerLevel">
  <Radio.Group  value={this.state.value} >
   <Radio value={"轻度"}>轻度</Radio>
   <Radio value={"中度"}>中度</Radio>
   <Radio value={"高度"}>高度</Radio>
   <Radio value={"极度"}>极度</Radio>
  </Radio.Group>
 </FormItem>
  <FormItem name="course">
   <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
    <FormItem label='检测结果' name="checkResult"><Input/></FormItem>
    <FormItem label='类别' name="type">
     <Select value={this.state.city}>
      <option key={"CMAC"}>{"CMAC"}</option>
      <option key={"CTWA"}>{"CTWA"}</option>
      <option key={"CSTEL"}>{"CSTEL"}</option>
      <option key={"超限倍数"}>{"超限倍数"}</option>
      <option key={"其他"}>{"其他"}</option>
     </Select>
    </FormItem>
    <FormItem label='单位' name="unit"><Input/></FormItem>
   </SelectInlineRepeater>
  </FormItem>
 </Form>
 )
 }
 }
export default FixCheckOfEnterpriseDemoForm
