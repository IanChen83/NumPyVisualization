import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Init</div>,
    document.getElementById('root'),
);

if(module.hot) {
    module.hot.accept();
}
