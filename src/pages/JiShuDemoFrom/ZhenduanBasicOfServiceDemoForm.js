import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import request from "../../utils/request";
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
    state = {
        Login: 'none',
        Login1: 'none',
        value: undefined,

    }

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
     this.state.Login='block'
     this.state.Login1='block'
  this.core.setValues({...record})
  this.core.setGlobalStatus('edit' === type ? type : 'preview')
 }
    request.get('/zyb/areaOfDic/cascadeData').then(res =>{
        if(res && res.flag){
            this.setState({dataSource:res.data})
        }
    })
    request.get('/zyb/jianceBasicOfService/cascadeData').then(res =>{
        if(res && res.flag){
            this.setState({dataSource1:res.data})
        }
    })
 }
 render() {
  return (
 <Form core={this.core} layout={{label: 8}}>
 <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
     <div style={{display: this.state.Login,marginBottom:10}}>
 <FormItem required={true} label="机构名称" name="name"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="社会统一代码" name="code"><Input style={{width: 230}} /></FormItem>
     </div>
 <FormItem required={true} label="申报年份" value={2019} name="year"><InputNumber style={{width: 230}} /></FormItem>
   <div style={{display: this.state.Login1,marginTop:10}}>
       <FormItem required={true} label="省/市/区" name="cascader"><Cascader style={{width: 230}} options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
       <FormItem required={true} label="注册地址" name="registerAddress"><Input style={{width: 230}} /></FormItem>
   </div>
     <div style={{marginTop:10,marginBottom:10}}>
     <FormItem required={true} label="登记注册类型" name="cascaded1"><Cascader  style={{width: 230}}  options={this.state.dataSource1}  onChange={this.onChange1} placeholder="登记注册类型"/></FormItem>
     </div>
     <FormItem required={true} label="资质等级" name="level">
     <Select value={this.state.city} style={{width: 230}}  >

         <option key={"甲级"}>{"甲级"}</option>
         <option key={"乙级"}>{"乙级"}</option>
         <option key={"丙级"}>{"丙级"}</option>

     </Select>
 </FormItem>
 <FormItem required={true} label="资质证书编号" name="num"><Input style={{width: 230}} /></FormItem>
 <FormItem required={true} label="诊断医师数量" name="doctorNum"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="诊断项目数量" name="projectCount"><InputNumber style={{width: 230}} /></FormItem>
 <FormItem required={true} label="诊断能力" name="scope">
     <Select value={this.state.city} style={{width: 230}} >

         <option key={"粉尘"}>{"粉尘"}</option>
         <option key={"化学因素"}>{"化学因素"}</option>
         <option key={"物理因素"}>{"物理因素"}</option>
         <option key={"放射性因素"}>{"放射性因素"}</option>
         <option key={"生物因素"}>{"生物因素"}</option>
     </Select>
 </FormItem>
 <FormItem required={true} label="医院等级" name="hospitalLevel">
     <Select value={this.state.city} style={{width: 230}} >

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
