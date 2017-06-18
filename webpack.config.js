module.exports = {
	entry: {
		index: './client/index/index.js',
		main: './client/account/index.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'stage-2']
					}
				}]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json']
	},
};