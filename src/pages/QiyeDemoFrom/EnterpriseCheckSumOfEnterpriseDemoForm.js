import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
year: {type: "number", required: true, message: '检测年份不能为空'},
month: {type: "number", required: true, message: '检测月份不能为空'},
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
 request.get('/zybadmin/enterpriseCheckSumOfEnterprise/TreeSelcetData').then(res =>{
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect style={{width: 212}} placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="检测年份" name="year"><InputNumber/></FormItem>
 <FormItem required={true} label="检测月份" name="month"><InputNumber/></FormItem>
 <FormItem required={true} label="应检点数" name="shouldNum"><InputNumber/></FormItem>
 </Form>
 )
 }
 }
export default EnterpriseCheckSumOfEnterpriseDemoForm
