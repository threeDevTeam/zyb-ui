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
        console.log(value);
        this.setState({ value });
    };
    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
        console.log(this.core)
    }

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
          this.state.Login='block'
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        request.get('/zybadmin/areaOfDic/cascadeData').then(res =>{
            console.log(res.data)
            if(res.flag){
                this.setState({dataSource:res.data})
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label:5}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>

                <FormItem label="申报年份" name="year"><InputNumber/></FormItem>
                <div style={{display: this.state.Login,marginTop:10}}>
                    <FormItem label="省/市/区" name="cascader"><Cascader options={this.state.dataSource}  onChange={this.onChange} placeholder="请选择省/市/区"/></FormItem>
                    <FormItem label="注册地址" name="registerAddress"><Input/></FormItem>
                <FormItem label="单位名称" name="name"><Input/></FormItem>
                </div>
                <FormItem label="是否独立设置职业健康监管" name="isSet">
                    <Radio.Group  value={this.state.value} style={{paddingLeft:40,paddingTop:20}}>
                        <Radio value={"是"}>是</Radio>
                        <Radio value={"否"}>否</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem label="职业健康监管人员编制数" name="markCount"><InputNumber/></FormItem>
                <FormItem label="在岗职业健康监管人员数" name="manageCount"><InputNumber/></FormItem></Form>
        )
    }
}

export default SuperviseDemoForm
