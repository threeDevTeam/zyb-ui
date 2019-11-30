import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
year: {type: "number", required: true, message: '检测年份不能为空'},
shouldNum: {type: "number", required: true, message: '应检点数不能为空'},

}
class EnterpriseCheckSumOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zyb/enterpriseCheckSumOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 9}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect notFoundContent={'暂无数据'} style={{width: 230}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="检测年份" value={2019} name="year"><InputNumber style={{width: 230}}/></FormItem>
 <FormItem required={true} label="检测月份" name="month">
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
 <FormItem required={true} label="应检点数" name="shouldNum"><InputNumber style={{width: 230}}/></FormItem>
 </Form>
 )
 }
 }
export default EnterpriseCheckSumOfEnterpriseDemoForm
