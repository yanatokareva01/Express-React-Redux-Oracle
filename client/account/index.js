import React from 'react';
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Account from './containers/App';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Account />
	</Provider>,
	document.getElementById('root')
);