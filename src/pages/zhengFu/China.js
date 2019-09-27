import React, {PureComponent} from 'react'
import Form, {FormItem} from 'noform'
import List from 'nolist/lib/wrapper/antd'
import {Button, Cascader} from 'nowrapper/lib/antd'
import request from "../../utils/request";


class China extends PureComponent {
    state = {
        value: undefined,
        dataSource:[]
}
    onChange = value => {
        console.log(value);
        this.setState({ value });
    };
    componentWillMount() {
        request.get('/zybadmin/areaOfDic/TreeSelcetData').then(res =>{
            if(res.flag){
                console.log(res.data)
                this.setState({dataSource:res.data})
            }
        })
    }

    handleOperator = () => {
        console.log(this.core);

    }
    render() {
        return (
            <Form core={this.core}>
            <FormItem label="Cascader" name="Cascader"><Cascader options={this.state.dataSource}  onChange={this.onChange}/></FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleOperator}>提交</Button>
                </FormItem>
            </Form>
        )
    }
}

export default China