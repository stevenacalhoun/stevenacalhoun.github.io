var content = require('html!../content.html');

// Load in content
document.body.innerHTML = content;
document.getElementById('content').className += " fadein";

// Load in css
require('../styles/main.scss');
