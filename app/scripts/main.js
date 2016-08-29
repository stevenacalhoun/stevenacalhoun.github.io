require('../styles/main.scss');

function showTab() {
  var sectionId = this.id.replace("-link", "-section");

  document.getElementById("about-link").className = "tab-link";
  document.getElementById("work-link").className = "tab-link";
  document.getElementById(this.id).className += " selected";

  document.getElementById("about-section").style.display = 'none';
  document.getElementById("work-section").style.display = 'none';


  document.getElementById(sectionId).style.display = 'block';

}
document.getElementById("about-link").onclick = showTab;
document.getElementById("work-link").onclick = showTab;
