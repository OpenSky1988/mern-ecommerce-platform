const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config({ path: '.env' });

const servers = {
  local: `http://${require('ip').address()}:8090`,
  // public: 'http://public.path.here',
};

const serverContext = '/api';

const { NODE_ENV, API_ENV, PORT } = process.env;
const config = {};

config.mode = NODE_ENV;

config.entry = {
	app: [
		path.join(__dirname, 'src', 'index.tsx'),
	],
};

config.resolve = {
	extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.css'],
	plugins: [
    new TsconfigPathsPlugin({
      configFile: path.resolve(process.cwd(), 'tsconfig.json'),
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.css']
    }),
  ],
};

config.optimization = {
	removeAvailableModules: true,
	splitChunks: {
		chunks: 'all',
		cacheGroups: {
			defaultVendors: {
				name: 'vendors',
				test: /[\\/]node_modules[\\/]/,
				priority: -10,
			},
			default: {
				name: 'app',
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true,
			},
		},
	},
};

config.module = {
	rules: [
      	// 'source-map-loader' extracts existing source maps from all JavaScript entries.
		{
			test: /\.js$/,
			enforce: 'pre',
			use: ['source-map-loader'],
		},

		// TypeScript linter
		{
			test: /\.ts(x?)$/,
			enforce: 'pre',
			exclude: /node_modules/,
			use: [
				{
					loader: 'tslint-loader',
					options: {
						emitErrors: true,
					},
				},
			],
		},

		// 'babel-loader' allows transpiling JavaScript files using Babel and Webpack.
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader'],
		},

		// TypeScript loader
		{
			test: /\.(ts|tsx)?$/,
			exclude: /node_modules/,
			use: [
				'babel-loader',
				'awesome-typescript-loader',
			],
		},

		// CSS and LESS loaders
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},

		{
			test: /\.less$/,
			use: [
				{
					loader: 'style-loader' // 3. Injects styles into DOM
				}, {
					loader: 'css-loader', // 2. Turns CSS into CommonJS
					options: {
						sourceMap: true,
					}
				}, {
					loader: 'less-loader', // 1. Turns LESS onto CSS
					options: {
						sourceMap: true,
					}
				},
			],
		},

		// 'asset/resource' resolves import / require() on a file into a url and emits the file into the output directory.
		// Images
		{
			test: /\.(png|svg|jpg|jpeg|gif|tiff)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'img/[name].[ext]',
			},
		},

		// Fonts
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'fonts/[name].[ext]',
			},
		}
	]
};

config.plugins = [
	new HtmlWebpackPlugin({
		template: path.join(__dirname, 'public', 'index.html'),
		filename: './index.html',
	}),
	// To refer to 'img' directory with '/img' instead of '../../img' in CSS files.
	// new CopyWebpackPlugin({
	// 	patterns: [
	// 		{
	// 			from: './src/img',
	// 			to: 'img',
	// 		},
	// 	],
	// }),
	// new webpack.EnvironmentPlugin({
	// 	'API_PATH': serverContext,
	// }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
];

config.output = {
	path: path.join(__dirname, 'public'),
	filename: '[name].js',
	publicPath: '/',
};

if (NODE_ENV === 'development') {
	config.plugins.push(
		new webpack.DefinePlugin({
			DEBUG: true,
		}),
	);

	config.watchOptions = {
	  	ignored: /node_modules/,
	};

	config.devtool = 'eval-cheap-module-source-map';

	config.devServer = {
		contentBase: path.join(__dirname, 'build'),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		},
		proxy: {
			[serverContext]: {
				target: servers[API_ENV] ? servers[API_ENV] : API_ENV,
				secure: true,
				changeOrigin: true,
			}
		},
		port: PORT,
		hot: true,
		/** Open compiled code in Chrome browser:
		- 'Google Chrome' on macOS
		- 'google-chrome' on Linux
		- 'chrome' on Windows
		*/
		open: 'Google Chrome',
		historyApiFallback: true,
		quiet: false,
		// display no info to console (only warnings and errors)
		noInfo: false,
		disableHostCheck: true,
		compress: true,
		stats: {
			// Assets information
			assets: false,
			// Information about cached (not built) modules
			cached: false,
			// Messages from child loaders
			children: false,
			// Adds built modules information to chunk information
			chunkModules: false,
			// The origins of chunks and chunk merging info
			chunkOrigins: false,
			// Chunk information
			chunks: false,
			// With console colors
			colors: true,
			// Error details (like resolving log)
			errorDetails: true,
			// Compilation hash (browser gets an updated asset from a server, not from cache)
			contenthash: true,
			// Built modules information
			modules: false,
			// Information about the reasons why modules are included
			reasons: false,
			// Source code of modules
			source: false,
			// Timing information
			timings: true,
			// Webpack version information
			version: false,
		},
		https: true,
	};
}

if (NODE_ENV === 'production') {
	config.output = {
	 	path: path.join(__dirname, '/build/'),
	 	filename: '[name].[contenthash].js',
	 	// publicPath: 'img/',
	};

	config.devtool = 'source-map';

	config.optimization.minimizer = [
		new TerserPlugin({
			parallel: true,
			sourceMap: true,
		}),
	];

	config.stats = {
		assets: false,
		version: false,
		hash: false,
		timings: true,
		chunks: true,
		chunkModules: false,
		children: false,
		modules: false,
	};
}

module.exports = config;
