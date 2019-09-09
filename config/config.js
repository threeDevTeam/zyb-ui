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
                {path: '/supervise', component: './zhenfu/supervise'},
                {path: '/personOfSupervise', component: './zhenfu/personOfSupervise'},
                {path: '/equipmentOfSupervise', component: './zhenfu/equipmentOfSupervise'},
                {path: '/lawOfSupervise', component: './zhenfu/lawOfSupervise'},
                {path: '/educationOfSupervise', component: './zhenfu/educationOfSupervise'},
                {path: '/propagateOfSupervise', component: './zhenfu/propagateOfSupervise'},
                {path: '/serviceOfSupervise', component: './zhenfu/serviceOfSupervise'},
                {path: '/serviceSuperviseOfSupervise', component: './zhenfu/serviceSuperviseOfSupervise'},
                {path: '/executeLawOfSupervise', component: './zhenfu/executeLawOfSupervise'},
                {path: '/threeCheckOfSupervise', component: './zhenfu/threeCheckOfSupervise'},
                {path: '/accidentOfSupervise', component: './zhenfu/accidentOfSupervise'},
                {path: '/index', component: './zhenfu/Index'},
                {path: '/index2', component: './zhenfu/Index2'},
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