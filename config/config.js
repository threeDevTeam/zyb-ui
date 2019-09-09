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
                {path: '/supervise', component: './zhengFu/supervise'},
                {path: '/personOfSupervise', component: './zhengFu/personOfSupervise'},
                {path: '/equipmentOfSupervise', component: './zhengFu/equipmentOfSupervise'},
                {path: '/lawOfSupervise', component: './zhengFu/lawOfSupervise'},
                {path: '/educationOfSupervise', component: './zhengFu/educationOfSupervise'},
                {path: '/propagateOfSupervise', component: './zhengFu/propagateOfSupervise'},
                {path: '/serviceOfSupervise', component: './zhengFu/serviceOfSupervise'},
                {path: '/serviceSuperviseOfSupervise', component: './zhengFu/serviceSuperviseOfSupervise'},
                {path: '/executeLawOfSupervise', component: './zhengFu/executeLawOfSupervise'},
                {path: '/threeCheckOfSupervise', component: './zhengFu/threeCheckOfSupervise'},
                {path: '/accidentOfSupervise', component: './zhengFu/accidentOfSupervise'},
                {path: '/index', component: './zhengFu/Index'},
                {path: '/index2', component: './zhengFu/Index2'},
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