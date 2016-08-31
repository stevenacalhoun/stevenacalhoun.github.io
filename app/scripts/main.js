// Load in content
var content = require('html!../content.html');
document.body.innerHTML = content

// Load in css
require('../styles/main.scss');

// Switch tabs
function showTab() {
  // Get id of which to show
  var sectionId = this.id.replace("-link", "-section");

  // Change classes
  document.getElementById("about-link").className = "tab-link";
  document.getElementById("work-link").className = "tab-link";
  document.getElementById(this.id).className += " selected";

  // Hide everything
  document.getElementById("about-section").style.display = 'none';
  document.getElementById("work-section").style.display = 'none';

  // Show new tab
  document.getElementById(sectionId).style.display = 'block';
}

// Setup click event
document.getElementById("about-link").onclick = showTab;
document.getElementById("work-link").onclick = showTab;
