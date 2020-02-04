import React from 'react';
import { render } from 'react-dom';
import AddressSuggest from '../../src';

const onSubmit = (d) => {
	console.log(d);
};

const App = () => <AddressSuggest placeholder={'test'} onSubmit={onSubmit} />;
render(<App />, document.getElementById('root'));
