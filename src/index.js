import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import SVG from './svg';

ReactDOM.render(
    // <SVG id="svg" />,
    <App />,
    document.getElementById('root'),
);

if(module.hot) {
    module.hot.accept();
}
