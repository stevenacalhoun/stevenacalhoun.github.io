require('../styles/main.scss');
var $ = require('jquery');

// Container
var profile = $('<div class="profile" />').appendTo('body');

// Name and picture
$('<div class="pictureBox"> <div class="picture"></div> </div>').appendTo(profile);
$('<h1>Steven Calhoun</h1>').appendTo(profile);

// Bio
var bio = $('<div class="bio" />').appendTo(profile);
bio.html("Currently employed at FireEye, Inc as I pursue a Master’s degree in Computer Science at the Georgia Institute of Technology, with a specialization in Computer Graphics. \
       I am passionate about video game design and graphic engines development. \
       In addition to those, I have a large interest in the development of electric vehicles and renewable energy.")

// Social
var social = $('<div class="social" />').appendTo(profile);
var socialList = $('<ul />').appendTo(social);
$('<li><a href="https://twitter.com/stevenacalhoun">Twitter</a></li>').appendTo(socialList);
$('<li><a href="mailto:stevenacalhoun@gmail.com?Subject=Hello">Email</a></li>').appendTo(socialList);
$('<li><a href="https://github.com/stevenacalhoun">GitHub</a></li>').appendTo(socialList);
$('<li><a href="files/Steven%20Calhoun%20Resume.pdf">Résumé</a></li>').appendTo(socialList);
