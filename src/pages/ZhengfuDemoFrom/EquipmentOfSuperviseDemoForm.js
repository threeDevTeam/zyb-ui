import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {DatePicker, Input, InputNumber, Select} from 'nowrapper/lib/antd'
import {Col, Row} from "antd";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/zh_CN';
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
            let buyDateStr = record.buyDateStr
            delete record.buyDateStr
            this.core.setValue('buyDateStr', moment(buyDateStr, 'YYYY-MM-DD'))
        }
    }

    render() {
        return (
            <Form core={this.core} layout={{label: 8}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem required={true} label="装备名称" name="name"><Input style={{width:230}}/></FormItem>
                <FormItem required={true} label="规格型号" name="num"><Input style={{width:230}}/></FormItem>
                <FormItem required={true} label="数量" name="amount"><InputNumber style={{width:230}}/></FormItem>
                <FormItem required={true} label="购置时间" name="buyDateStr"><DatePicker locale={locale} style={{width:230}} placeholder="请选择购置时间"/></FormItem>

                <FormItem required={true} label="装备状态" name="status">
                    <Select value={this.state.city} style={{width:230}}>

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
