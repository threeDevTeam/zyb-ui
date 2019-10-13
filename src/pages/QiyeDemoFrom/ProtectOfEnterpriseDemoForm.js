import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio, Select} from 'nowrapper/lib/antd'
import {TreeSelect} from "antd";
import request from "../../utils/request";
const validate = {
isSet: {type: "string", required: true, message: '是否设置防护设施不能为空'},
name: {type: "string", required: true, message: '防护设施名称不能为空'},
type: {type: "string", required: true, message: '防护设施类别不能为空'},
status: {type: "string", required: true, message: '运行状态不能为空'},
isFix: {type: "string", required: true, message: '是否定期进行维护检修保养不能为空'},
protectEffect: {type: "string", required: true, message: '工程防护效果不能为空'},

}
class ProtectOfEnterpriseDemoForm extends PureComponent {
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
 request.get('/zybadmin/protectOfEnterprise/TreeSelcetData').then(res =>{
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
  <FormItem required={true} label="工作场所" name="treeSelect"><TreeSelect placeholder="请选择工作场所"   treeData={this.state.dataSource}  onChange={this.onChange}/></FormItem>
 <FormItem required={true} label="是否设置防护设施" name="isSet">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="防护设施名称" name="name"><Input/></FormItem>
 <FormItem required={true} label="防护设施类别" name="type">
  <Select>
   <option key={"防尘设施"}>{"防尘设施"}</option>
   <option key={"防毒设施"}>{"防毒设施"}</option>
   <option key={"防噪声设施"}>{"防噪声设施"}</option>
   <option key={"防高温设施"}>{"防高温设施"}</option>
   <option key={"防辐射设施"}>{"防辐射设施"}</option>
   <option key={"其他"}>{"其他"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="运行状态" name="status">
  <Select >
   <option key={"正常"}>{"正常"}</option>
   <option key={"维修"}>{"维修"}</option>
   <option key={"故障"}>{"故障"}</option>
   <option key={"停用"}>{"停用"}</option>
   <option key={"报废"}>{"报废"}</option>
   <option key={"其他"}>{"其他"}</option>
  </Select>
 </FormItem>
 <FormItem required={true} label="是否定期进行维护检修保养" name="isFix">
  <Radio.Group  >
   <Radio value={"是"}>是</Radio>
   <Radio value={"否"}>否</Radio>
  </Radio.Group>
 </FormItem>
 <FormItem required={true} label="工程防护效果" name="protectEffect">
  <Select >
   <option key={"良好"}>{"良好"}</option>
   <option key={"一般"}>{"一般"}</option>
   <option key={"差"}>{"差"}</option>

  </Select>
 </FormItem>
 </Form>
 )
 }
 }
export default ProtectOfEnterpriseDemoForm
