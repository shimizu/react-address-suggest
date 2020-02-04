### Install using npm :

```sh
npm i @shimizu/react-address-suggest
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
#### example slider style

[index.css](https://github.com/shimizu/react-address-suggest/blob/master/examples/src/index.css)

### Props

|  属性  |  説明  |
| ---- | ---- |
|  placeholder  |  空欄の時に入力欄に表示される入力例の値  |
|  pattern  |  妥当と判断されるために、入力欄の内容が一致する必要がある正規表現  |
|  maxlength  |  入力欄が受け付ける最大文字数 |
|  minlength  |  入力欄が取りうる、妥当と判断される最小文字列長  |
|  size  |  入力欄の長さを何文字分にするかを表す数値  |
|  |  |