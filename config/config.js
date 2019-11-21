export default {
/*    base: "/zyb/",
    publicPath: "/zyb/",*/
    targets: {
        ie: 11
    },
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true,
            },
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
                webpackChunkName: true,
                level: 1,
            },
            title: '职业病危害监测预警预控云服务平台',
            metas: [{charset: 'utf-8'}]
        }]
    ],
    routes: [
        {
            path: '/visual',
            component: '../layouts/VisualLayout',
            routes: [
                {path: '/visual', redirect: '/visual/NationVisual'},
                {path: '/visual/NationVisual', component: './DataVisual/Nation/NationVisual'},
                {path: '/visual/OtherVisual', component: './DataVisual/Other/OtherVisual'},
                {path: '/visual/OtherVisual3', component: './DataVisual/Other3/OtherVisual3'},
                {path: '/visual/OtherVisual4', component: './DataVisual/Other4/OtherVisual4'},
            ]
        },
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {path: '/user', redirect: '/user/login'},
                {path: '/user/register', component: './Login/SysUserRegister'},
                {path: '/user/login', component: './Login/Login'},
                {path: '/user/changePassword', component: './Login/ChangePassword'},
            ]
        },
        {
            path: '/',
            component: '../layouts/AdminLayout',
            routes: [
                {path: '/', redirect: '/user/login'},
                {path: '/demo/index', component: './Demo/Index'},
                {path: '/fileUpDown/index', component: './FileUpDown/Index'},
                {path: '/demo/map', component: './Chart/Map'},
                {path: '/demo/city', component: './Chart/City'},
                {path: '/demo/pro', component: './Chart/Pro'},
                {path: '/test', component: './Test/Test1'},
                {path: '/supervise', component: './zhengFu/Supervise'},
                {path: '/personOfSupervise', component: './zhengFu/PersonOfSupervise'},
                {path: '/equipmentOfSupervise', component: './zhengFu/EquipmentOfSupervise'},
                {path: '/lawOfSupervise', component: './zhengFu/LawOfSupervise'},
                {path: '/educationOfSupervise', component: './zhengFu/EducationOfSupervise'},
                {path: '/propagateOfSupervise', component: './zhengFu/PropagateOfSupervise'},
                {path: '/serviceOfSupervise', component: './zhengFu/ServiceOfSupervise'},
                {path: '/serviceSuperviseOfSupervise', component: './zhengFu/ServiceSuperviseOfSupervise'},
                {path: '/executeLawOfSupervise', component: './zhengFu/ExecuteLawOfSupervise'},
                {path: '/threeCheckOfSupervise', component: './zhengFu/ThreeCheckOfSupervise'},
                {path: '/accidentOfSupervise', component: './zhengFu/AccidentOfSupervise'},
                {path: '/china', component: './zhengFu/China'},
                {path: '/jianceBasicOfService', component: './JishujiGou/JianceBasicOfService'},
                {path: '/jianceDetailOfService', component: './JishujiGou/JianceDetailOfService'},
                {path: '/jianceTotalOfService', component: './JishujiGou/JianceTotalOfService'},
                {path: '/tijianBasicOfService', component: './JishujiGou/TijianBasicOfService'},
                {path: '/tijianDetail1OfService', component: './JishujiGou/TijianDetail1OfService'},
                {path: '/tijianDetail2OfService', component: './JishujiGou/TijianDetail2OfService'},
                {path: '/tijianTotalOfService', component: './JishujiGou/TijianTotalOfService'},
                {path: '/zhenduanBasicOfService', component: './JishujiGou/ZhenduanBasicOfService'},
                {path: '/zhenduanDetailOfService', component: './JishujiGou/ZhenduanDetailOfService'},
                {path: '/zhenduanTotalOfService', component: './JishujiGou/ZhenduanTotalOfService'},
                {path: '/changePassword', component: './Login/ChangePassword'},
                {path: '/Enterprise', component: './Qiye/Enterprise'},
                {path: '/procuctionOfEnterprise', component: './Qiye/ProcuctionOfEnterprise.js'},
                {path: '/workplaceOfEnterprise', component: './Qiye/WorkplaceOfEnterprise'},
                {path: '/postOfEnterprise', component: './Qiye/PostOfEnterprise'},
                {path: '/personOfEnterprise', component: './Qiye/PersonOfEnterprise'},
                {path: '/postDangerOfEnterprise', component: './Qiye/PostDangerOfEnterprise'},
                {path: '/touchPersonOfEnterprise', component: './Qiye/TouchPersonOfEnterprise'},
                {path: '/enterpriseCheckSumOfEnterprise', component: './Qiye/EnterpriseCheckSumOfEnterprise'},
                {path: '/fixCheckOfEnterprise', component: './Qiye/FixCheckOfEnterprise'},
                {path: '/monitorOfEnterprise', component: './Qiye/MonitorOfEnterprise'},
                {path: '/healthOfEnterprise', component: './Qiye/HealthOfEnterprise'},
                {path: '/protectOfEnterprise', component: './Qiye/ProtectOfEnterprise'},
                {path: '/personProtectOfEnterprise', component: './Qiye/PersonProtectOfEnterprise'},
                {path: '/testOfEnterprise', component: './Qiye/TestOfEnterprise'},
                {path: '/sickOfEnterprise', component: './Qiye/SickOfEnterprise'},
                {path: '/alikeSickOfEnterprise', component: './Qiye/AlikeSickOfEnterprise'},
                {path: '/accidentSumOfEnterprise', component: './Qiye/AccidentSumOfEnterprise'},
                {path: '/accidentPersonOfEnterprise', component: './Qiye/AccidentPersonOfEnterprise'},
                {path: '/checkOfEnterprise', component: './Qiye/CheckOfEnterprise'},
                {path: '/otherOfDic', component: './Systemsetup/OtherOfDic'},
                {path: '/userManagement', component: './Systemsetup/UserManagement'},
                {path: '/menuManagement', component: './Systemsetup/MenuManagement'},
                {path: '/roleManagement', component: './Systemsetup/RoleManagement'},
                {path: '/dataVisualSwitchFlag', component: './Systemsetup/dataVisualSwitchFlag'}
            ]
        }
    ],
    proxy: {
        '/zyb': {
            target: 'http://localhost:8081',
            changeOrigin: true,
        },
    }
    // disableCSSModules: true
}