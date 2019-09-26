import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
isSet: {type: "string", required: true, message: '是否配备个人防护用品不能为空'},
name: {type: "string", required: true, message: '个人防护用品名称不能为空'},
modelNum: {type: "string", required: true, message: '防护用品型号不能为空'},
count: {type: "string", required: true, message: '发放数量不能为空'},
cycle: {type: "number", required: true, message: '发放周期不能为空'},
isCorrect: {type: "string", required: true, message: '劳动者是否正确佩戴使用防护用品不能为空'},
isReplace: {type: "string", required: true, message: '是否定期更换个人防护用品不能为空'},

}
class PersonProtectOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/personProtectOfEnterprise/TreeSelcetData').then(res =>{
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
 <FormItem label="是否配备个人防护用品" name="isSet">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem label="个人防护用品名称" name="name"><Input/></FormItem>
 <FormItem label="防护用品型号" name="modelNum"><Input/></FormItem>
 <FormItem label="发放数量" name="count"><Input/></FormItem>
 <FormItem label="发放周期" name="cycle"><InputNumber/></FormItem>
 <FormItem label="劳动者是否正确佩戴使用防护用品" name="isCorrect">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem label="是否定期更换个人防护用品" name="isReplace">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 </Form>
 )
 }
 }
export default PersonProtectOfEnterpriseDemoForm