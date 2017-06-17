module.exports = {
	entry: {
		index: './src/index.js',
		account: './src/account.js'
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
						presets: ['es2015', 'react']
					}
				}]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json']
	},
};