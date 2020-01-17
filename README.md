### Install using npm :

* module install
```sh
npm i @shimizu/react-address-suggest
```

* copy Address datafile

```sh
cp -r node_modules/@shimizu/react-address-suggest/dist/data/ public/data
```

### How to use it ?

```js
import React from 'react';
import AddressSuggest from '@shimizu/react-address-suggest';

const onSubmit = (d) => {
	console.log(d);
};

function App() {
	return (
		<div>
            <AddressSUggestForm onSubmit={onSubmit} />
		</div>
	);
}

export default App;
```

