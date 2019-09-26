import React, {PureComponent} from 'react'
import Form, {FormItem} from 'noform'
import List from 'nolist/lib/wrapper/antd'
import {Cascader} from 'nowrapper/lib/antd'
import request from "../../utils/request";

class China extends PureComponent {
    state = {
        dataSource:[]
}

    componentWillMount() {
        request.get('/zybadmin/areaOfDic/TreeSelcetData').then(res =>{
            if(res.flag){
                console.log(res.data)
                this.setState({dataSource:res.data})
            }
        })
    }
    render() {
        return (
            <Form core={this.core}>
            <FormItem label="Cascader" name="Cascader"><Cascader options={this.state.dataSource}/></FormItem>
            </Form>
        )
    }
}

export default China