import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/sign-in',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path:'/TKBHocKy',
		name:'TKBHocKy',
		layout: "dashboard",
		component:()=>import('../views/TKBHocKy')
	},
	{
		path:'/TKBLichThi',
		name:'TKBLichThi',
		layout: "dashboard",
		component:()=>import('../views/TKBLichThi')
	},
	{
		path: '/DSSV/:MaLopHocPhan/:MaLopHoc/:TenDot',
		name: 'DSSV',
		layout: "dashboard",
		component: () => import('../views/DSSV'),
	},
	{
		path: '/DSSV_LHP_SiSo/:MaMonHoc/:MaLopHoc/:TenDot',
		name: 'DSSV_LHP_SiSo',
		layout: "dashboard",
		component: () => import('../views/DSSVLHPSiSo'),
	},
	{
		path: '/DSDangKyHocPhan',
		name: 'DSDangKyHocPhan',
		layout: "dashboard",
		component: () => import('../views/SVDSDangKyHocPhan'),
	},
	{
		path: '/DS_LHP_SiSo',
		name: 'DS_LHP_SiSo',
		layout: "dashboard",
		component: () => import('../views/DSLHPSiSo'),
	},
	{
		path: '/KetQuaHocTap',
		name: 'KetQuaHocTap',
		layout: "dashboard",
		component: () => import('../views/KetQuaHocTap'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
		component: () => import('../views/Tables.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/rtl',
		name: 'RTL',
		layout: "dashboard-rtl",
		meta: {
			layoutClass: 'dashboard-rtl',
		},
		component: () => import('../views/RTL.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},

	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('access_token');
	if (to.name !== 'Sign-In' && to.name !== 'Sign-Up' && !token) {
			next({name: 'Sign-In'});
	}
	else if(to.name ==='Sign-In' && token){
		localStorage.removeItem('access_token');
		next({name:'Sign-In'})
	}
	else if(to.name ==='Sign-Up' && token){
		localStorage.removeItem('access_token');
		next({name:'Sign-Up'})
	}
	else {
		next();
	}
})

export default router
