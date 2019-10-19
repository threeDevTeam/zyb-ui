import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber} from 'nowrapper/lib/antd'
import request from "../../utils/request";
import {TreeSelect} from "antd";
const validate = {
postBigName: {type: "string", required: true, message: '岗位的大类名称不能为空'},
postSmallName: {type: "string", required: true, message: '岗位的小类名称不能为空'},

}
class PostOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/postOfEnterprise/TreeSelcetData').then(res =>{
  console.log(res.data)
  if(res && res.flag){
   this.setState({dataSource:res.data})
  }
 })
 request.get('/zybadmin/jianceDetailOfService/cascadeData3').then(res => {
  console.log(res.data)
  if (res && res.flag) {
   this.setState({dataSource1: res.data})
  }
 })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 7}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
  <FormItem required={true} label="岗位名称" name="cascaded1"><Cascader options={this.state.dataSource1}  onChange={this.onChange} placeholder="岗位名称"/></FormItem>

 </Form>
 )
 }
 }
export default PostOfEnterpriseDemoForm
