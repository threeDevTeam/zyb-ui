import React, {PureComponent} from 'react'
import List, {Table, Pagination} from 'nolist/lib/wrapper/antd'
import {Radio, Button} from 'nowrapper/lib/antd'
import Form, {FormCore, FormItem} from 'noform'
import {Row, Col, Tree, message} from 'antd'
import styles from "./index.less";
import request from "../../utils/request";
import {delay} from "lodash";


// @connect(({demo}) => ({demo}))
class dataVisualSwitchFlag extends PureComponent {
    state = {
        value: undefined,
    }

    constructor(props) {
        super(props);
        this.core = new FormCore();
    }
    componentWillMount() {
        request.get('/zyb/dataVisualSwitchFlag/list').then(res =>{
            if(res && res.flag){
                this.core.setValues({...res.data})
            }
        })
    }
    handleOperator = () => {
        console.log(this.core.value)
        request.post('/zyb/dataVisualSwitchFlag/up', {data: this.core.value}).then(res => {
            if (res && res.flag) {
                message.success("修改成功")
                window.location.href ='/dataVisualSwitchFlag'
            } else {
                message.error("修改失败")
            }
        })
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 8, control:10}}>
                <FormItem  label="国家 开关" required={true}   value={"no"} name="nationSwitch">
                    <Radio.Group value={this.state.value} >
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="省和市 开关" required={true} value={"no"}  name="provinceOrCitySwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="市 开关" required={true} value={"no"} name="citySwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="市和区 开关" required={true} value={"no"} name="countryOrDistrictSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="企业 开关" required={true} value={"no"} name="enterpriceSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="检测机构 开关" required={true}  value={"no"} name="jianceSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="体检机构 开关" required={true}  value={"no"} name="tijianSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="诊断机构机构 开关" required={true} value={"no"} name="zhenduanSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem label="政府开关 开关" required={true} value={"no"} name="zhengfuSwitch">
                    <Radio.Group value={this.state.value}>
                        <Radio value={"yes"}>实际数据</Radio>
                        <Radio value={"no"}>虚拟数据</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem>
                <Button type="primary" onClick={this.handleOperator} >确定</Button>
                </FormItem>
            </Form>
        )
    }
}

export default dataVisualSwitchFlag