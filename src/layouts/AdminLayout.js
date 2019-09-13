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
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="dashboard"/><span>政府监管部门</span></span>}
                        >
                            <Menu.Item key="21"><Link to="/supervise">监管部门信息</Link></Menu.Item>
                            <Menu.Item key="22"><Link to="/personOfSupervise">监管人员信息</Link></Menu.Item>
                            <Menu.Item key="23"><Link to="/equipmentOfSupervise">监管装备信息</Link></Menu.Item>
                            <Menu.Item key="24"><Link to="/lawOfSupervise">法规标准建设信息</Link></Menu.Item>
                            <Menu.Item key="25"><Link to="/educationOfSupervise">教育培训情况</Link></Menu.Item>
                            <Menu.Item key="26"><Link to="/propagateOfSupervise">职业健康宣传信息</Link></Menu.Item>
                            <Menu.Item key="27"><Link to="/serviceOfSupervise">检测机构信息</Link></Menu.Item>
                            <Menu.Item key="28"><Link to="/serviceSuperviseOfSupervise">检测机构监督信息</Link></Menu.Item>
                            <Menu.Item key="29"><Link to="/executeLawOfSupervise">监督执法信息</Link></Menu.Item>
                            <Menu.Item key="30"><Link to="/threeCheckOfSupervise">“三同时”监督检查信息</Link></Menu.Item>
                            <Menu.Item key="31"><Link to="/accidentOfSupervise">职业病危害事故信息</Link></Menu.Item>
                            <Menu.Item key="32"><Link to="/china">中国</Link></Menu.Item>

                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="dashboard"/><span>技术服务机构</span></span>}
                        >
                            <Menu.Item key="33"><Link to="/jianceBasicOfService">检测机构的基本信息</Link></Menu.Item>
                            <Menu.Item key="34"><Link to="/jianceTotalOfService">检测机构的总体信息</Link></Menu.Item>
                            <Menu.Item key="35"><Link to="/jianceDetailOfService">检测机构的具体报告</Link></Menu.Item>
                            <Menu.Item key="36"><Link to="/tijianBasicOfService">体检机构的基本信息</Link></Menu.Item>
                            <Menu.Item key="37"><Link to="/tijianTotalOfService">体检机构的总体信息</Link></Menu.Item>
                            <Menu.Item key="38"><Link to="/tijianDetail1OfService">体检机构的具体报告1</Link></Menu.Item>
                            <Menu.Item key="39"><Link to="/tijianDetail2OfService">体检机构的具体报告2</Link></Menu.Item>
                            <Menu.Item key="40"><Link to="/zhenduanBasicOfService">诊断机构的基本信息</Link></Menu.Item>
                            <Menu.Item key="41"><Link to="/zhenduanDetailOfService">诊断机构的总体信息</Link></Menu.Item>
                            <Menu.Item key="42"><Link to="/zhenduanTotalOfService">诊断机构的具体报告</Link></Menu.Item>

                        </SubMenu>
                        <SubMenu
                            key="sub5"
                            title={<span><Icon type="dashboard"/><span>注册</span></span>}
                        >
                            <Menu.Item key="43"><Link to="/sysUserLogin">注册</Link></Menu.Item>
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