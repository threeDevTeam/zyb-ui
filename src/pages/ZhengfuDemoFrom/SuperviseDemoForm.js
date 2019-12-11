import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Cascader, Input, InputNumber, Radio} from 'nowrapper/lib/antd'
import {Col, Row, TreeSelect} from "antd";
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater";
import request from "../../utils/request";

const validate = {
    year: {type: "number", required: true, message: '申报年份不能为空'},

    isSet: {type: "string", required: true, message: '是否独立设置职业健康监管部门不能为空'},
    markCount: {type: "number", required: true, message: '职业健康监管人员编制数不能为空'},
    manageCount: {type: "number", required: true, message: '在岗职业健康监管人员数不能为空'},

}
let SelectInlineRepeater = Selectify(InlineRepeater)

class SuperviseDemoForm extends PureComponent {
    state = {
        Login: 'none',
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
        let currentYear=new Date().getFullYear()
        this.core.setValue('year',currentYear)
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
          this.state.Login='block'
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        request.get('/zyb/areaOfDic/cascadeData').then(res =>{
            if(res && res.flag){
                this.setState({dataSource:res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label:10}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>

                <FormItem required={true} label="申报年份"  name="year"  ><InputNumber  style={{width: 230}}/></FormItem>
                <div style={{display: this.state.Login,marginTop:10}}>
                    <FormItem required={true} label="省/市/区" name="cascader"><Cascader  options={this.state.dataSource} onChange={this.onChange} placeholder="请选择省/市/区" style={{width: 230}}/></FormItem>
                    <FormItem required={true} label="注册地址" name="registerAddress"><Input style={{width: 230}}/></FormItem>
                <FormItem required={true} label="单位名称" name="name"><Input style={{width: 230}}/></FormItem>
                </div>
                <FormItem required={true}  value={"是"} style={{paddingTop:20}}  label="是否独立设置职业健康监管" name="isSet">
                    <Radio.Group  value={this.state.value} style={{width:200}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem required={true} label="职业健康监管人员编制数" name="markCount"><InputNumber style={{width: 230}}/></FormItem>
                <FormItem required={true} label="在岗职业健康监管人员数" name="manageCount"><InputNumber style={{width: 230}}/></FormItem></Form>
        )
    }
}

export default SuperviseDemoForm
