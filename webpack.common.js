import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';


export default {
	mode: 'development',
	entry: {
		app: './src/index.js',
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HTMLWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(process.cwd(), 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(csv|tsv)$/i,
				use: ['csv-loader'],
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
			// `...`,
			new CssMinimizerPlugin(),
		],
	},
	resolve: {
		alias: {
			Fonts: path.resolve(process.cwd(), 'src/assets/fonts/'),
			Images: path.resolve(process.cwd(), 'src/assets/images/'),
			Svg: path.resolve(process.cwd(), 'src/assets/svgs/'),
		},
	},
};
