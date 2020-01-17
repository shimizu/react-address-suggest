import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tsv } from 'd3-fetch';
import './index.css';

const DATA_URL = 'data/suggestData.tsv';
const cast = (d) => {
	Object.keys(d).forEach((key) => {
		if (!isNaN(+d[key])) d[key] = +d[key];
	});
	return d;
};

AddressSuggestForm.propTypes = {
	onSubmit: PropTypes.func
};

function AddressSuggestForm(props) {
	const { onSubmit } = props;

	const [ suggestData, setSuggestData ] = useState([]);
	const [ suggest, setSUggest ] = useState([]);
	const [ showText, setShowText ] = useState('');

	const [ suggestLength, setSuggestLength ] = useState(-1);
	const [ suggestCurrentIndex, setSuggestCurrentIndex ] = useState(-1);

	const [ resultData, setResultData ] = useState(null);

	let refs = [];

	useEffect(() => {
		const fetchData = async () => {
			const result = await tsv(DATA_URL, cast);
			setSuggestData(result);
		};

		fetchData();
	}, []);

	const suggestClear = () => {
		setSUggest([]);
		setSuggestLength(-1);
	};

	const _onChange = (e) => {
		setSuggestCurrentIndex(-1);

		const re = new RegExp(e.target.value);
		const filterd = suggestData.filter(function(d) {
			return (
				re.test(d['都道府県名（漢字）']) || re.test(d['市区町村名（漢字）']) || re.test(d['都道府県名（かな）']) || re.test(d['市区町村名（かな）'])
			);
		});

		if (!e.target.value) {
			suggestClear();
		} else {
			setSUggest(filterd);
			setSuggestLength(filterd.length - 1);
		}

		setShowText(e.target.value);
	};

	const _onKeyDown = (e) => {
		let current = suggestCurrentIndex;
		switch (e.key) {
			case 'ArrowUp':
				if (current > -1) current--;
				break;
			case 'ArrowDown':
				if (current < suggestLength) current++;
				break;
		}

		const d = suggest[current];
		if (d) {
			setResultData(d);
			setShowText(d['都道府県名（漢字）'] + d['市区町村名（漢字）']);
			refs[current].scrollIntoView();
		}

		setSuggestCurrentIndex(current);
	};

	const _onMouseOver = (e) => {
		console.dir(e.target)
	}

	const _onSubmit = (e) => {
		e.preventDefault();
		suggestClear();
		onSubmit(resultData);
	};

	return (
		<div>
			<form onSubmit={_onSubmit}>
				<input
					className="address-input-form"
					type="text"
					value={showText}
					onChange={_onChange}
					onKeyDown={_onKeyDown}
				/>
			</form>
			<ul className="address-list">
				{suggest.map((d, i) => {
					const className = i === suggestCurrentIndex ? 'address-value selected' : 'address-value';

					return (
						<li ref={(inst) => refs.push(inst)} className={className} key={d.uid} data-key={i} onMouseOver={_onMouseOver}>
							{d['都道府県名（漢字）'] + d['市区町村名（漢字）']}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default AddressSuggestForm;
