import React from 'react'
import 'antd/dist/antd.css'
import styles from './AdminLayout.less'
import {Layout, Menu, Icon} from 'antd'
import Link from 'umi/link'

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={256}
                       style={{minHeight: '100vh', color: 'white'}}>
                    <div className={styles.logo}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        <Menu.Item key="1">
                            <Link to="/demo/pro">
                                <Icon type="pie-chart"/>
                                <span>pro</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="dashboard"/><span>测试</span></span>}
                        >
                            <Menu.Item key="2"><Link to="/demo/index">增删改查</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/fileUpDown/index">文件上传</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/demo/map">中国地图</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/demo/city">省市县联动</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/test">Test1</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                            {this.props.children}

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AdminLayout