import React, {PureComponent} from 'react'
import {Icon, Row, Col} from 'antd'
import Form, {FormItem, FormCore} from 'noform'
import {Input, Upload} from 'nowrapper/lib/antd'
import styles from './upload.less'

const validate = {
    flag: {type: "string", required: true, message: 'flag不能为空'}
}

class FileForm extends PureComponent {
    state = {
        fileList: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    beforeUpload = file => {
        this.props.putFileToState(file)
        return false
    }

    render() {
        return (
            <div>
                <Form core={this.core} layout={{label: 8, control: 16}}>
                    <FormItem label="username" name="username"><Input/></FormItem>
                    <FormItem label="age" name="age"><Input/></FormItem>
                    <div style={{paddingLeft: 95, marginTop: 10}}>
                        <Upload.Dragger listType='text ' beforeUpload={this.beforeUpload} className={styles.upload}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                                <p className="ant-upload-text">上传/拖拽</p>
                            </p>
                        </Upload.Dragger>
                    </div>
                </Form>

            </div>
        )
    }
}

export default FileForm
