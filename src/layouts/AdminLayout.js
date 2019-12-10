import React from 'react'
import 'antd/dist/antd.css'
import styles from './AdminLayout.less'
import {ConfigProvider, Dropdown, Icon, Layout, Menu} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import Link from 'umi/link'
import request from "../utils/request"
import router from 'umi/router'

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu

let projectName = ''
const menu = (
    <Menu>
        <Menu.Item>
            <div style={{float: "left", width: 20}}>
                <Icon type="edit"/>
            </div>
            <Link to='/user/changePassword'>修改密码</Link>
        </Menu.Item>
        <Menu.Item>
            <div style={{float: "left", width: 20}}>
                <Icon type="left-square"/>
            </div>
            <Link to='/user/login'>退出登录</Link>
        </Menu.Item>
    </Menu>
);

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
        menus: [],
        display: 'inline-block',
        openKeys: [],
        defaultSelectedKeys: []
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            display: this.state.display === 'inline-block' ? 'none' : 'inline-block'
        })
    }

    rootSubmenuKeys = ['1', '13', '25', '48']

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    renderMenu = data => data.map((item) => {
        console.log(item.id + "=" + item.name)
        if (item.children && item.children.length > 0) {
            return (
                <Menu.SubMenu key={item.id} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                    {this.renderMenu(item.children)}
                </Menu.SubMenu>
            )
        }
        return <Menu.Item key={item.id} title={item.name}><Link
            to={item.url}>{item.name}</Link></Menu.Item>
    })

    componentWillMount() {
        try {
            //获取用户拥有的菜单
            let loginName = sessionStorage.getItem("loginName")
            if (loginName) {
                //ajax,用户名-->角色-->菜单
                // this.setState({menus: res.data.menus})
                request.get('/zyb/sysMenu/sysMenulogin?loginName=' + loginName).then(res => {
                    if (res && res.flag) {
                        this.setState({menus: res.data})
                    }
                })

                let type = sessionStorage.getItem('type')
                if ('管理员' === type) {
                    this.setState({openKeys: ['48'], defaultSelectedKeys: ['50']})
                } else if ('政府监管部门' === type) {
                    this.setState({openKeys: ['1'], defaultSelectedKeys: ['2']})
                } else if ('企业' === type) {
                    this.setState({openKeys: ['25'], defaultSelectedKeys: ['26']})
                } else if (type.match('检测机构')) {
                    this.setState({openKeys: ['13'], defaultSelectedKeys: ['14']})
                } else if (type.match('体检机构')) {
                    this.setState({openKeys: ['13'], defaultSelectedKeys: ['18']})
                } else if (type.match('诊断机构')) {
                    this.setState({openKeys: ['13'], defaultSelectedKeys: ['22']})
                }else if (type.match('普通用户')) {
                    this.setState({openKeys: ['54'], defaultSelectedKeys: ['55']})
                }
            } else {
                router.push('/user/login')
            }
        } catch (e) {
            console.log(e);
            router.push('/user/login')
        }
    }

    show = () => {
        let type = sessionStorage.getItem('type')
        if ('管理员' === type) {
            return (
                <Menu.Item key='100'>
                    <a href={projectName + '/visual/NationVisual'}>
                        <Icon type='area-chart'/>
                        <span>监控可视化</span>
                    </a>
                </Menu.Item>
            )
        } else if ('政府监管部门' === type) {
            let name1 = sessionStorage.getItem('name1')
            let name2 = sessionStorage.getItem('name2')
            let name3 = sessionStorage.getItem('name3')
            let query = 'name1=' + name1
            if (name2) {
                query += '&name2=' + name2
            }
            if (name3) {
                query += '&name3=' + name3
            }
            return (
                <Menu.Item key='100'>
                    <a href={projectName + '/visual/OtherVisual?' + query}>
                        <Icon type='area-chart'/>
                        <span>监控可视化</span>
                    </a>
                </Menu.Item>
            )
        } else if ('企业' === type) {
            let name = sessionStorage.getItem('name')
            let name1 = sessionStorage.getItem('name1')
            let name2 = sessionStorage.getItem('name2')
            let name3 = sessionStorage.getItem('name3')
            let query = 'name=' + name
            if (name1) {
                query += '&name1=' + name1
            }
            if (name2) {
                query += '&name2=' + name2
            }
            if (name3) {
                query += '&name3=' + name3
            }
            return (
                <Menu.Item key='100'>
                    <a href={projectName + '/visual/OtherVisual3?' + query}>
                        <Icon type='area-chart'/>
                        <span>监控可视化</span>
                    </a>
                </Menu.Item>
            )
        } else if (type.match('技术服务机构')) {
            let name = sessionStorage.getItem('name')
            let name1 = sessionStorage.getItem('name1')
            let name2 = sessionStorage.getItem('name2')
            let name3 = sessionStorage.getItem('name3')
            let query = 'name=' + name
            if (name1) {
                query += '&name1=' + name1
            }
            if (name2) {
                query += '&name2=' + name2
            }
            if (name3) {
                query += '&name3=' + name3
            }
            return (
                <Menu.Item key='100'>
                    <a href={projectName + '/visual/OtherVisual4?' + query}>
                        <Icon type='area-chart'/>
                        <span>监控可视化</span>
                    </a>
                </Menu.Item>
            )
        }
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={256}
                           style={{minHeight: '100vh', color: 'white'}}>
                        <div className={styles.logo}>
                            <div style={{
                                color: '#1890FF',
                                display: this.state.display,
                                width: '200px',
                                lineHeight: '48px',
                                paddingLeft: '65px',
                                letterSpacing: 8,
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}>云服务平台
                            </div>
                        </div>
                        <Menu theme="dark" mode="inline"
                              openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} onOpenChange={this.onOpenChange}>
                            {this.show()}
                            {this.renderMenu(this.state.menus)}
                            {/* <Menu.Item key="1">
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
                            <Menu.Item key="41"><Link to="/zhenduanDetailOfService">诊断机构的具体报告</Link></Menu.Item>
                            <Menu.Item key="42"><Link to="/zhenduanTotalOfService">诊断机构的总体信息</Link></Menu.Item>

                        </SubMenu>
                        <SubMenu
                        key="sub5"
                        title={<span><Icon type="dashboard"/><span>注册</span></span>}
                    >
                        <Menu.Item key="43"><Link to="/sysUserLogin">注册</Link></Menu.Item>
                        <Menu.Item key="44"><Link to="/register">登录</Link></Menu.Item>
                            <Menu.Item key="45"><Link to="/email">邮箱</Link></Menu.Item>
                    </SubMenu>
                        <SubMenu
                            key="sub6"
                            title={<span><Icon type="dashboard"/><span>企业</span></span>}
                        >
                            <Menu.Item key="50"><Link to="/enterprise">企业基本信息</Link></Menu.Item>
                            <Menu.Item key="51"><Link to="/procuctionOfEnterprise">生产工艺信息</Link></Menu.Item>
                            <Menu.Item key="53"><Link to="/workplaceOfEnterprise">工作场所</Link></Menu.Item>
                            <Menu.Item key="54"><Link to="/postOfEnterprise">岗位</Link></Menu.Item>
                            <Menu.Item key="55"><Link to="/personOfEnterprise">人员信息</Link></Menu.Item>
                            <Menu.Item key="56"><Link to="/postDangerOfEnterprise">岗位危害信息</Link></Menu.Item>
                            <Menu.Item key="57"><Link to="/touchPersonOfEnterprise">接害人员信息</Link></Menu.Item>
                            <Menu.Item key="58"><Link to="/enterpriseCheckSumOfEnterprise">职业病危害因素检测信息</Link></Menu.Item>
                            <Menu.Item key="59"><Link to="/fixCheckOfEnterprise">定期检测信息</Link></Menu.Item>
                           <Menu.Item key="61"><Link to="/monitorOfEnterprise">日常监测信息</Link></Menu.Item>
                            <Menu.Item key="62"><Link to="/healthOfEnterprise">职业卫生管理信息</Link></Menu.Item>
                            <Menu.Item key="63"><Link to="/protectOfEnterprise">防护设施信息</Link></Menu.Item>
                            <Menu.Item key="64"><Link to="/personProtectOfEnterprise">个体防护信息</Link></Menu.Item>
                            <Menu.Item key="66"><Link to="/testOfEnterprise">岗位职业健康检查信息</Link></Menu.Item>
                            <Menu.Item key="67"><Link to="/sickOfEnterprise">职业病病人信息</Link></Menu.Item>
                            <Menu.Item key="68"><Link to="/alikeSickOfEnterprise">疑似职业病病人信息</Link></Menu.Item>
                            <Menu.Item key="69"><Link to="/accidentSumOfEnterprise">职业病危害事故信息</Link></Menu.Item>
                            <Menu.Item key="70"><Link to="/accidentPersonOfEnterprise">事故伤亡人员信息</Link></Menu.Item>
                            <Menu.Item key="71"><Link to="/checkOfEnterprise">监督检查信息</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub7"
                            title={<span><Icon type="dashboard"/><span>设置</span></span>}
                        >
                            <Menu.Item key="80"><Link to="/otherOfDic">设置选项</Link></Menu.Item>
                        </SubMenu>*/}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className={styles.trigger}
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <span><h2 style={{
                                color: '#1890FF',
                                fontWeight: 'bold',
                                letterSpacing: 8,
                                display: 'inline'
                            }}>职业病危害监测预警预控云服务平台</h2></span>
                            <Dropdown overlay={menu}>
                                <span style={{paddingRight: 40, float: "right"}}><Icon type="user"
                                                                                       style={{marginRight: 10}}/>欢迎你,{sessionStorage.getItem("loginName")}</span>
                            </Dropdown>
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
            </ConfigProvider>
        );
    }
}

export default AdminLayout