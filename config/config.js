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
                {path: '/test', component: './Test/Test1'}
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