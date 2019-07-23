import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import memoryUtils from './utils/memoryUtils'
import storeUtils from './utils/storeUtils'


memoryUtils.user = storeUtils.getUser('user_key');

ReactDOM.render(<App />, document.getElementById('root'));

