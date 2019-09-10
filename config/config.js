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