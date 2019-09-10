import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, InputNumber,Select} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";

const validate = {
    name: {type: "string", required: true, message: '装备名称不能为空'},
    num: {type: "string", required: true, message: '规格型号不能为空'},
    amount: {type: "number", required: true, message: '数量不能为空'},
    buyDate: {type: "number", required: true, message: '购置时间不能为空'},
    status: {type: "String", required: true, message: '装备状态不能为空'},

}

class EquipmentOfSuperviseDemoForm extends PureComponent {
    state = {}

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
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 6}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="装备名称" name="name"><Input/></FormItem>
                <FormItem label="规格型号" name="num"><Input/></FormItem>
                <FormItem label="数量" name="amount"><InputNumber/></FormItem>
                <FormItem label="购置时间" name="buyDate"><InputNumber/></FormItem>

                <FormItem label="装备状态" name="status">
                    <Select value={this.state.city}>

                             <option key={"在用"}>{"在用"}</option>
                             <option key={"停用"}>{"停用"}</option>
                            <option key={"报废"}>{"报废"}</option>

                    </Select>
                </FormItem>


            </Form>
        )
    }
}

export default EquipmentOfSuperviseDemoForm
