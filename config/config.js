export default {
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
            }
        }]
    ],
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {path: '/user', redirect: '/user/login'},
                {path: '/user/login', component: './Login/SysUserLogin'},
                {path: '/user/register', component: './Login/Register'}
            ]
        },
        {
            path: '/',
            component: '../layouts/AdminLayout',
            routes: [
                {path: '/', redirect: '/demo/index'},
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
                {path: '/sysUserLogin', component: './Login/SysUserLogin'},
                {path: '/register', component: './Login/Register'},
            ]
        }
    ],
    proxy: {
        '/zybadmin': {
            target: 'http://localhost:8081',
            changeOrigin: true,
        },
    }
    // disableCSSModules: true
}