<template>
	
	<!-- Main Sidebar -->
	<component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">

		<!-- Layout Header -->
		<a-layout-header>
			<a-row type="flex">

				<!-- Header Breadcrumbs & Title Column -->
				<a-col :span="24" :md="6">

					<!-- Header Breadcrumbs -->
					<a-breadcrumb>
						<a-breadcrumb-item><router-link to="/"> Trang</router-link></a-breadcrumb-item>
						<a-breadcrumb-item>{{ this.$route.name }}</a-breadcrumb-item>
					</a-breadcrumb>
					<!-- / Header Breadcrumbs -->

					<!-- Header Page Title -->
					<div class="ant-page-header-heading">
						<span class="ant-page-header-heading-title">{{ this.$route.name }}</span>
					</div>
					<!-- / Header Page Title -->

				</a-col>
				<!-- / Header Breadcrumbs & Title Column -->

				<!-- Header Control Column -->
				<a-col :span="24" :md="18" class="header-control">

					<!-- Header Control Buttons -->
					<a-dropdown :trigger="['click']" overlayClassName="header-notifications-dropdown" :getPopupContainer="() => wrapper">
						<a-badge>
							<a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <svg width="40" height="40" viewBox="0 0 1000 1000" id="Layer_2" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M483.968,397.833h258.063c2.647,0,4.802-2.154,4.802-4.802v-15.333c0-2.647-2.154-4.802-4.802-4.802 H483.968c-2.647,0-4.802,2.154-4.802,4.802v15.333C479.166,395.679,481.321,397.833,483.968,397.833z" style="fill:#231F20;"></path> <path d="M462.09,634.27c5.53,5.53,8.561,12.89,8.55,20.72c0,10.66,13.79,20.01,29.5,20.01 c15.721,0,29.5-9.35,29.5-20c-0.01-7.84,3.03-15.2,8.551-20.73c5.5-5.51,12.81-8.54,20.59-8.54h239.84V300c0-16.57-13.43-30-30-30 H231.38c-16.57,0-30,13.43-30,30v325.73H441.5C449.29,625.73,456.6,628.76,462.09,634.27z M759.333,552.608H540.791 c-6.903,0-12.5-5.597-12.5-12.5s5.597-12.5,12.5-12.5h218.542c6.903,0,12.5,5.597,12.5,12.5S766.237,552.608,759.333,552.608z M759.333,502.608H540.791c-6.903,0-12.5-5.597-12.5-12.5s5.597-12.5,12.5-12.5h218.542c6.903,0,12.5,5.597,12.5,12.5 S766.237,502.608,759.333,502.608z M454.166,377.698c0-16.433,13.369-29.802,29.802-29.802h258.063 c16.433,0,29.802,13.369,29.802,29.802v15.333c0,16.433-13.369,29.802-29.802,29.802H483.968 c-16.433,0-29.802-13.369-29.802-29.802V377.698z M466.666,477.608h20.667c6.903,0,12.5,5.597,12.5,12.5s-5.597,12.5-12.5,12.5 h-20.667c-6.903,0-12.5-5.597-12.5-12.5S459.763,477.608,466.666,477.608z M466.666,527.608h20.667c6.903,0,12.5,5.597,12.5,12.5 s-5.597,12.5-12.5,12.5h-20.667c-6.903,0-12.5-5.597-12.5-12.5S459.763,527.608,466.666,527.608z M392.148,540.108l-0.185-2.333 c-0.71-8.921-5.964-16.849-13.904-20.977l-16.63-8.648c-8.569-4.456-13.952-13.299-13.982-22.954 c9.219-7.172,16.345-19.496,19.57-32.515c0.216,0.037,0.436,0.057,0.657,0.057c3.456,0,6.258-4.651,6.282-8.712 c1.502-1.743,2.475-4.34,2.475-6.73c0-4.074-2.814-7.376-6.284-7.376c-0.62,0-1.219,0.109-1.784,0.306 c-0.001-0.001-0.001-0.002-0.001-0.003h0.008c0,0,3.88-3.27,2.396-16.809c-1.483-13.539-9.375-18.732-9.375-18.732 c3.607-3.338,0-8.531,0-8.531c-1.61,1.443-7.599,1.677-15.002,1.446c1.369-4.601-4.207-7.315-4.207-7.315 c-0.562,1.647-3.977,4-8.71,6.64c-10.344-0.669-20.379-1.443-23.908-0.771c-7.789,1.483-13.353,8.531-17.805,20.401 c-3.316,8.845-1.69,18.922-0.646,23.485c-0.353-0.072-0.715-0.117-1.085-0.117c-3.471,0-6.284,3.302-6.284,7.376 c0,2.391,0.973,4.987,2.475,6.73c0.025,4.061,2.827,8.712,6.282,8.712c0.384,0,0.758-0.066,1.123-0.173 c3.212,13.062,10.354,25.438,19.6,32.631c-0.03,9.654-5.413,18.497-13.983,22.954l-16.631,8.648 c-7.939,4.129-13.194,12.056-13.903,20.977l-0.186,2.333c-17.158-19.977-27.852-48.182-27.852-79.442 C240.667,400.1,280.812,351,330.333,351S420,400.1,420,460.667C420,491.927,409.306,520.132,392.148,540.108z" style="fill:#231F20;"></path> <path d="M812.613,650.731H558.639c-2.319,0-4.142,1.905-4.139,4.226c0,0.014,0,0.028,0,0.043 c0,24.852-24.4,45-54.5,45c-30.1,0-54.5-20.148-54.5-45c0-0.015,0-0.029,0-0.043c0.003-2.32-1.818-4.226-4.139-4.226H187.388 c-18.451,0-32.528,16.498-29.627,34.719l3.069,19.269c2.32,14.563,14.881,25.281,29.628,25.281h619.085 c14.748,0,27.309-10.719,29.628-25.283l3.067-19.267C845.141,667.229,831.063,650.731,812.613,650.731z M226,702.866h-12.12 c-6.903,0-12.5-5.596-12.5-12.5c0-6.904,5.597-12.5,12.5-12.5H226c6.903,0,12.5,5.596,12.5,12.5 C238.5,697.269,232.904,702.866,226,702.866z M786.12,702.866H774c-6.903,0-12.5-5.596-12.5-12.5c0-6.904,5.597-12.5,12.5-12.5 h12.12c6.903,0,12.5,5.596,12.5,12.5C798.62,697.269,793.024,702.866,786.12,702.866z" style="fill:#231F20;"></path> </g> </g></svg>
							</a>
						</a-badge>
						
						<a-list item-layout="horizontal" class="header-notifications-list" :data-source="notificationsData" slot="overlay">
							<a-list-item slot="renderItem" slot-scope="item">
								<a-list-item-meta>
									<a slot="title" href="#">{{ item.title }} <br><br>  {{item.Email}}</a>

								</a-list-item-meta>
							</a-list-item>

						</a-list>
					</a-dropdown>
					<a-button type="link" ref="secondarySidebarTriggerBtn" @click="$emit('toggleSettingsDrawer', true)">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="#111827"/>
						</svg>
					</a-button>
					<a-button type="link" class="sidebar-toggler" @click="$emit('toggleSidebar', ! sidebarCollapsed) , resizeEventHandler()">
						<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
					</a-button>
					<router-link  to="/sign-in" class="btn-sign-in" @click="e => e.preventDefault()">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z" fill="#111827"/>
						</svg>
						<span style="white-space: nowrap">Đăng xuất</span>
					</router-link>
          <router-link  to="/ChangePass" class="btn-sign-in" @click="e => e.preventDefault()">
            <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Layer_7" data-name="Layer 7"> <path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM14,35a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,23,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,32,35Z"></path> </g> </g> </g></svg>
            <span style="white-space: nowrap">Đổi mật khẩu</span>
          </router-link>
					<!-- / Header Control Buttons -->

					<!-- Header Search Input -->
<!--					<a-input-search class="header-search" :class="searchLoading ? 'loading' : ''" placeholder="Tìm kiếm…" @search="onSearch" :loading='searchLoading'>-->
<!--						<svg slot="prefix" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--							<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#111827"/>-->
<!--						</svg>-->
<!--					</a-input-search>-->
					<!-- / Header Search Input -->

				</a-col>
				<!-- / Header Control Column -->

			</a-row>
		</a-layout-header>
		<!--  /Layout Header -->

	</component>
	<!-- / Main Sidebar -->

</template>

<script>
const getNotificationsData = () => {
  return [
    {
      title: localStorage.getItem('HoTen'),
      Email: localStorage.getItem('username'),
    },
    // Các thông báo khác nếu có
  ];
};

	export default ({
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: false,
			},

			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Header notifications data.
			notificationsData: {
				type: Array,
        default: function() {
          return getNotificationsData();
        },
			},
		},
		data() {
			return {
				// Fixed header/sidebar-footer ( Affix component ) top offset.
				top: 0,
				// Search input loading status.
				searchLoading: false,

				// The wrapper element to attach dropdowns to.
				wrapper: document.body,
        login:localStorage.getItem('username')
			}
		},
		methods: {
			resizeEventHandler(){
				this.top = this.top ? 0 : -0.01 ;
				// To refresh the header if the window size changes.
				// Reason for the negative value is that it doesn't activate the affix unless
				// scroller is anywhere but the top of the page.
			},
			onSearch(value){
			}
		},
		mounted: function(){
			// Set the wrapper to the proper element, layout wrapper.
			this.wrapper = document.getElementById('layout-dashboard') ;
		},
		created() {
			// Registering window resize event listener to fix affix elements size
			// error while resizing.
			window.addEventListener("resize", this.resizeEventHandler);
		},
		destroyed() {
			// Removing window resize event listener.
			window.removeEventListener("resize", this.resizeEventHandler);
		},
	})

</script>
