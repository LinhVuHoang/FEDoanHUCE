import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/404.vue'),
	},
	{
		// will match everything
		path: '/forbidden',
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		redirect: '/sign-in',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/Layout.vue'),
	},
	{
		path:'/TKBHocKy',
		name:'TKBHocKy',
		layout: "dashboard",
		meta: {
			allowedRoles: [1,2], // Tất cả các vai trò được phép
		},
		component:()=>import('../views/TKBHocKy')
	},
	{
		path:'/TKBGiangDay',
		name:'TKBGiangDay',
		layout: "dashboard",
		meta: {
			allowedRoles: [1,3], // Tất cả các vai trò được phép
		},
		component:()=>import('../views/TKBGiangDay')
	},
	{
		path:'/TKBLichThi',
		name:'TKBLichThi',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component:()=>import('../views/TKBLichThi')
	},
	{
		path: '/DSSV/:MaLopHocPhan/:MaLopHoc/:TenDot',
		name: 'DSSV',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/DSSV'),
	},
	{
		path: '/DSSV_LHP_SiSo/:MaMonHoc/:MaLopHoc/:TenDot',
		name: 'DSSV_LHP_SiSo',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/DSSVLHPSiSo'),
	},
	{
		path: '/DSDangKyHocPhan',
		name: 'DSDangKyHocPhan',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/SVDSDangKyHocPhan'),
	},
	{
		path: '/QuanLyDHP',
		name: 'QuanLyDHP',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/QuanLyDHP'),
	},
	{
		path: '/DS_LHP_SiSo',
		name: 'DS_LHP_SiSo',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/DSLHPSiSo'),
	},
	{
		path: '/KetQuaHocTap',
		name: 'KetQuaHocTap',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2], // Tất cả các vai trò được phép
		},
		component: () => import('../views/KetQuaHocTap'),
	},
	{
		path: '/LichSuPH',
		name: 'LichSuPH',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/PHLichSu'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/Tables.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		meta: {
			allowedRoles: [1, 2, 3], // Tất cả các vai trò được phép
		},
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/rtl',
		name: 'RTL',
		layout: "dashboard-rtl",
		meta: {
			layoutClass: 'dashboard-rtl',
			allowedRoles: [1, 2, 3]
		},

		component: () => import('../views/RTL.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
			allowedRoles: [1, 2, 3],
		},
		component: () => import('../views/Profile.vue'),
	},

	{
		path: '/sign-in',
		name: 'Sign-In',
		meta: {
			allowedRoles: [1, 2, 3,4],
		},
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
			allowedRoles: [1, 2, 3,4],
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
	if((localStorage.getItem('link')==null ||localStorage.getItem('link')=="" || localStorage.getItem('link')==undefined ) && to.name === 'Sign-In' && token) {
		next({name: 'TKBHocKy'});
	}
	else if (to.name !== 'Sign-In' && to.name !== 'Sign-Up' && (!token || token=="" || token==undefined)) {
			next({name: 'Sign-In'});
	}
	else if(to.name ==='Sign-In' && token){
		localStorage.removeItem('access_token');
		localStorage.removeItem('Role');
		next({name: 'Sign-In'});
	}
	else if(to.name ==='Sign-Up' && token){
		localStorage.removeItem('access_token');
		localStorage.removeItem('Role');
		next({name:'Sign-Up'})
	}else{
		const userRoles = localStorage.getItem('Role') || [4];
		console.log(userRoles)
		const allowedRoles = to.meta.allowedRoles || [4];
		console.log(allowedRoles)
		const hasPermission = allowedRoles.some(role => userRoles.includes(role));
		console.log(hasPermission)
		if (hasPermission) {
			// Nếu người dùng có ít nhất một vai trò được phép, cho phép chuyển đến route
			next();
		} else {
			// Ngược lại, chuyển hướng về một route khác hoặc hiển thị thông báo lỗi
			console.log("Lỗi phân quyền")
			next('/forbidden');
		}
	}
})

export default router
