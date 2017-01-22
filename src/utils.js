function queryToHash(page, feat) {
	if(!feat) {
		return `#${page}`;
	}

	const featStr = Object.keys(feat)
		.map((v, i, a) => (a[v] === true ? `${v}` : `${v}=${a[v]}`))
		.join('&');

	return `#${page}?${featStr}`;
}

function hashToQuery(hash) {
	if(!hash.startsWith('#')) {
		if(hash === '') {
			return {
				page: '',
				query: {},
			};
		}
		throw new Error(`hash should start with "#", got ${hash} instead.`);
	}

	const s = hash.substr(1).split('?');
	if(s.length === 1) {
		// No feature
		return {
			page: s[0],
			query: {},
		};
	} else if(s.length === 2) {
		const querys = s[1].split('&');
		const feat = {};
		querys.forEach((x) => {
			const q = x.split('=');
			if(q.length === 1) {
				feat[q[0]] = true;
			} else if(q.length === 2) {
				feat[q[0]] = q[1];
			} else {
				throw new Error('Format error when parsing hash to query');
			}
		});

		return {
			page: s[0],
			query: feat,
		};
	}

	throw new Error('Format error when parsing hash to query (multiple \'?\')');
}

function goToPage(page, feat) {
	return(() => { window.location.hash = queryToHash(page, feat); });
}

function goToUrl(url) {
	return() => window.open(url);
}

function isNaturalNum(value) {
	// console.log(value);

	if (value.indexOf('.') !== -1) {
		return false;
	}

	if (value.replace(/ /gi, '')[0] === '0') {
		return false;
	}

	let x;
	if (isNaN(value)) {
		return false;
	}

	x = parseFloat(value);

	return (x | 0) === x;
}

function	displayNodeDFS(rootNode) {
	if (rootNode.length === 0) {
		return [];
	}
	
	let displayNode = [];
	for (const subNode of rootNode) {
		
		if (subNode.children === undefined) {
			continue;
		}
		
		const collectDisplayNode = displayNodeDFS(subNode.children);
		if (collectDisplayNode.length === 0) {
			if (subNode.type === 'array') {
				displayNode.push(subNode);
			}
		} else {
			displayNode = [...displayNode, collectDisplayNode]
		}
	}

	return displayNode
}

export {
	goToPage,
	goToUrl,
	queryToHash,
	hashToQuery,
	isNaturalNum,
	displayNodeDFS,
};
