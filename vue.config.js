module.exports = {
	runtimeCompiler: true,

	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'HUCE PROJECT MADE BY LVH'
				return args
			})
	}
}
