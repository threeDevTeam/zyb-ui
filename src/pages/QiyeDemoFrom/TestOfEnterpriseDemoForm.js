import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
name: {type: "string", required: true, message: '姓名不能为空'},
idNum: {type: "string", required: true, message: '身份证号不能为空'},
type: {type: "string", required: true, message: '体检类别不能为空'},
result: {type: "string", required: true, message: '体检结果不能为空'},
note: {type: "string", required: true, message: '处理意见不能为空'},
implement: {type: "string", required: true, message: '落实情况不能为空'},

}
class TestOfEnterpriseDemoForm extends PureComponent {
 state = {
  value: undefined,
 };
 onChange = value => {
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
 request.get('/zyb/testOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core}layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input style={{width: 230}}/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect  notFoundContent={'暂无数据'} style={{width: 230}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
  <FormItem required={true} label="姓名" name="name"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="身份证号" name="idNum"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="体检类别" name="type">
  <Select style={{width: 230}}>
   <option key={"上岗前"}>{"上岗前"}</option>
   <option key={"在岗期间"}>{"在岗期间"}</option>
   <option key={"离岗时"}>{"离岗时"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="体检结果" name="result">
  <Select style={{width: 230}}>
   <option key={"正常"}>{"正常"}</option>
   <option key={"异常"}>{"异常"}</option>
   <option key={"职业禁忌证"}>{"职业禁忌证"}</option>
   <option key={"疑似职业病"}>{"疑似职业病"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="处理意见" name="note"><Input style={{width: 230}}/></FormItem>
 <FormItem required={true} label="落实情况" name="implement"><Input style={{width: 230}}/></FormItem>
 </Form>
 )
 }
 }
export default TestOfEnterpriseDemoForm
