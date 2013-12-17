var map;
var DATA = [];
var fb = new Firebase('https://vpc.firebaseio.com/debarbari');

// Demolished Church of the Templari is aka Santa Maria dell'Ascensione
// Demolished Convent of the Celestia is aka Santa Maria de la Celestia
// Demolished Church of Santa Maria dei Servi not really demolished?
// Demolished Church of San Tomà not really demolished?
// Demolished Convent of the Vergini ??
// Demolished Church of San Nicoló di Castello ?
// Demolished Church of San Bartolomeo di Castello ?
// ["Convent of the Crociferi????????", [-67.08668927672144, 22971.533203125], 7]


// TODO: Combine these functions into a good search function (or research fb more)
function findData(list, val) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].properties && list[i].properties.name == val) return list[i];
  }

  return null;
}

function findDataByType(list, type) {
  var results = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].properties && list[i].properties.type == type) results.push(list[i]);
  }

  return results;
}

function getAutoCompleteNames(datasets) {
  var names = [];
  for (var i = 0; i < datasets.length; ++i) {
    for (var j = 0; j < datasets[i].length; ++j) {
      if (datasets[i][j].properties && datasets[i][j].properties.name)
        names.push(datasets[i][j].properties.name);
    }
  }

  return names;
}

function debarbariInit() {
  // jQuery init
  $(function() {
    // Get data from Firebase
    initializeSearch();
    initializeLayers();
    
    // Register handlers
    $("#dlbutton").click(function () { 
        var link = document.createElement("a");
        link.href = getData();
        link.download = "debarbari.png";
        var theEvent = document.createEvent("MouseEvent");
        theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(theEvent);
        delete link;
    });

    rectDrawer = new RectDrawer;
    $("#select").click(rectDrawer.initialize.bind(rectDrawer, downloadSection));

    $('#drawmode').click(togglePolyMode);

    $('#login-link').click(function () {
      showLoginForm('login');
    });
    $('#signup-link').click(function () {
      showLoginForm('signup');
    });
    $('#logout-link').click(fbLogout);

    $('#new-layer-button').click(addNewLayer);

    $('#new-feature-discard').click(cleanUpPolyMode);
    $('#new-feature-submit').click(submitFeature);

    $('#plus-sign').click(function () {
      $('#info-modal').modal('show');
    });

    // Tooltips
    $('#dlbutton').tooltip({ placement: 'bottom' });
    $('#select').tooltip({ placement: 'bottom' });
    $('#layers').tooltip({ placement: 'bottom' });
    $('#drawmode').tooltip({ placement: 'bottom' });
    $('#plus-sign').tooltip({ placement: 'bottom' });

    // Initialize leaflet map
    map = L.map('map', { center: [-73, 294/*22973.5*/], zoom: 3, attributionControl: false });
    new L.Control.Attribution({ prefix: false }).addAttribution('<a href="http://veniceprojectcenter.org">Venice Project Center</a>').addTo(map);
    L.tileLayer('tiles2/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true}).addTo(map);

    var tms2 = L.tileLayer('tiles2/{z}/{x}/{y}.png', {minZoom: 1, maxZoom: 1, tms: true});
    var miniMap = new L.Control.MiniMap(tms2, { toggleDisplay: true }).addTo(map);

    // Add zoom out button
    var MyControl = L.Control.extend({
      options: {
          position: 'topleft'
      },

      onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'leaflet-bar');

        var link = L.DomUtil.create('a', '', container);
        link.href = "#";
        $(link).click(function() {
          map.setZoom(1);
        });

        var img = L.DomUtil.create('img', 'fullscreen-link', link);
        img.src = "fullscreen.png";
        img.style.width = '14px';
        img.style.height = '14px';

        return container;
      }
    });

    map.addControl(new MyControl());
  });
}

function initializeSearch() {
  fb.child('vpc/features').on('child_added', function (snapshot) {
    DATA.push(snapshot.val());
    var names = getAutoCompleteNames([DATA]);
    $(".search").autocomplete({ source: names });
  });
  $(".search").on("autocompleteselect", function (event, ui) {
    var landmark = findData(DATA, ui.item.value);
    map.setView(landmark.properties.center, 8 /* LOL IGNORE ZOOM */, { animate: true });
  });
}

function initializeLayers() {
  fb.child('vpc/layers').on('child_added', function (snapshot) {
    var data = snapshot.val();
    var newOption = '<li role="presentation"><a role="menuitem" id="'+data.id+'-layer" href="#">'+data.name+'</a></li>';
    if (loggedIn) {
      $('#new-layer-button').before(newOption);
    }
    else {
      $('#layers-menu').append(newOption);
    }
    $('#' + data.id + '-layer').click(toggleLayer.bind(this, data.id, data.color));
    $('#new-feature-type').append('<option value="'+data.id+'">'+data.name+'</option>');
  });
}

function getCanvasFromMap() {
  var c = document.createElement("canvas");
  c.width = $("#map").width();
  c.height = $("#map").height();
  var canvas = c.getContext("2d");

  var imgs = $(".leaflet-tile-container.leaflet-zoom-animated").children();

  for (var i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    var rect = img.getBoundingClientRect();

    canvas.drawImage(img, rect.left, rect.top);
  }

  return c;
}

function getData() {
  var c = getCanvasFromMap();

  var img_url = c.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  return img_url;
}

function downloadSection(x, y, width, height) {
  var canvas = getCanvasFromMap();
  var ctx = canvas.getContext('2d');

  var selection = ctx.getImageData(x, y, width, height);
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(selection, 0, 0);

  var link = document.createElement("a");
  link.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  link.download = "debarbari.png";
  var theEvent = document.createEvent("MouseEvent");
  theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(theEvent);
}

function addRect(x, y, width, height) {
  var mapBounds = map.getBounds();

  var mapWidth = (mapBounds.getEast() - mapBounds.getWest()) * (width / window.innerWidth);
  var mapHeight = (mapBounds.getNorth() - mapBounds.getSouth()) * (height / window.innerHeight);

  var mapLng = ((mapBounds.getEast() - mapBounds.getWest()) * (x / window.innerWidth)) + mapBounds.getWest();
  var mapLat = ((mapBounds.getNorth() - mapBounds.getSouth()) * (y / window.innerHeight)) + mapBounds.getSouth();

  var rectBounds = [[mapLat+mapHeight, mapLng], [mapLat, mapLng+mapWidth]];
  new L.rectangle(rectBounds, {fillColor: "#ff7800", weight: 1}).addTo(map);
  console.log(rectBounds.toString());
}

// Draw poly
var points = [];
var markers = [];
var newPoly = null;

var circleIcon = L.icon({
  // lol...
  iconUrl: "http://www.rand.org/content/dam/rand/www/external/pubs/research_briefs/RB9385/images/circle1.gif", 
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

function addPoint(event) {
  var marker = new L.Marker(event.latlng, {icon: circleIcon});
  marker.addTo(map);
  markers.push(marker);
  points.push(event.latlng);
}

var polymode = false;
function togglePolyMode() {
  if (polymode) {
    endPolyMode();
    polymode = false;
  }
  else {
    startPolyMode();
    polymode = true;
  }
}

function startPolyMode() {
  map.on('click', addPoint);
  $('#drawmode>.icon').css('box-shadow','0 0 5px #fff');
  $('#map').css('cursor', 'crosshair');
}

function endPolyMode() {
  newPoly = L.polygon(points);
  newPoly.addTo(map);
  map.off('click', addPoint);

  $('#map').css('cursor', 'grab'); // XXX Figure out why grabbing doesn't work
  $('#drawmode>.icon').css('box-shadow','0 0 0');

  $('#new-feature').modal('show');
  // landmarkName = prompt("What is the name of this landmark?");
  // var data = {points: points, name: landmarkName};
  // fb.child('vpc').child('polyTemp').push(data);
}

function submitFeature() {
  var name = $('#new-feature-name').val();
  var type = $('#new-feature-type').val();

  // XXX fix name
  if (!name) return;

  // If the feature already exists, update it
  var feature = findData(DATA, name);
  if (feature) {
    feature.geometry = newPoly.toGeoJSON().geometry;
    fb.child('vpc/features').set(DATA);
  }
  else {
    var newFeature = {
      type: "Feature",
      geometry: newPoly.toGeoJSON().geometry,
      properties: {
        name: name,
        type: type,
        zoom: map.getZoom(),
        center: newPoly.getBounds().getCenter()
      }
    };
    fb.child('vpc/features').push(newFeature);
  }

  $('#new-feature').modal('hide');
  cleanUpPolyMode();
}

function cleanUpPolyMode() {
  points = [];
  for (var i = 0; i < markers.length; ++i) {
    map.removeLayer(markers[i]);
  }
  markers = [];
}

// Download rect
function RectDrawer() {
  var rectX, rectY;
  var latlngStart, latlngEnd;

  this.endRect = function(callback, event) {
    var x = $(".rect").css("left").slice(0, -2);;
    var y = $(".rect").css("top").slice(0, -2);;
    var width = $(".rect").css("width").slice(0, -2);
    var height = $(".rect").css("height").slice(0, -2);

    $(".rect").remove();
    $(".rect-canvas").remove();

    callback(x, y, width, height);
  }

  this.startRect = function(event) {
    $(".rect-canvas").append('<div class="rect"></div>');
    rectX = event.clientX;
    rectY = event.clientY;
    $(".rect").css({ top: rectY, left: rectX });
    $(".rect-canvas").mousemove(this.updateRect);
  }

  this.initialize = function(callback) {
    $("body").append('<div class="rect-canvas"></div>');
    $(".rect-canvas").mousedown(this.startRect.bind(this));
    $(".rect-canvas").mouseup(this.endRect.bind(this, callback));
  }

  this.updateRect = function(event) {
    var xDiff = event.clientX - rectX;
    var yDiff = event.clientY - rectY;

    var newX, newY, newWidth, newHeight;

    if (xDiff < 0) {
      newWidth = Math.abs(xDiff);
      newX = rectX - newWidth;
    }
    else {
      newX = rectX;
      newWidth = xDiff;
    }

    if (yDiff < 0) {
      newHeight = Math.abs(yDiff);
      newY = rectY - newHeight;
    }
    else {
      newY = rectY;
      newHeight = yDiff;
    }

    $(".rect").css({ left: newX+"px", top: newY+"px", width: newWidth+"px", height: newHeight+"px"});
  }
}

// Layers
function addNewLayer() {
  var name = $('#new-layer-name').val();
  var id = $('#new-layer-id').val();
  var color = $('#new-layer-color').val();

  // Fail silently if fields empty for now
  if (!(name || id || color)) {
    return;
  }

  // TODO generalize for any account
  fb.child('vpc').child('layers').push({name: name, id: id, color: color});
  $('#new-layer').modal('hide');
}

var polyState = {};
function toggleLayer(type, color) {
  if (!polyState[type]) {
    polyState[type] = [];
    for (var i = 0; i < DATA.length; ++i) {
      if (DATA[i].properties.type == type && DATA[i].geometry) {
        var points = geoJSONToLeaflet(DATA[i].geometry.coordinates[0]);
        var newPoly = L.polygon(points, {color: color, weight: 2});

        // Clicking on a polygon will bring up a pop up
        newPoly.on('click', (function (data){
          var content = '<b class="popup">'+data.properties.name+'</b>';
          if (data.properties.link) {
            content = '<a href="' + data.properties.link + '">' + content + '</a>';
          }
          L.popup().setLatLng(data.properties.center).setContent(content).openOn(map);
        }).bind(this, DATA[i]));

        // Double clicking a polygon will center the landmark
        newPoly.on('dblclick', (function (loc) {
          map.setView(loc).setZoom(8);
        }).bind(this, DATA[i].properties.center));

        newPoly.addTo(map);
        polyState[type].push(newPoly);
      }
    }

    $('#'+type+'-layer').css('font-weight', 600);
  }
  else {
    for (var i = 0; i < polyState[type].length; ++i) {
      map.removeLayer(polyState[type][i]);
    }

    $('#'+type+'-layer').css('font-weight', 400);

    delete polyState[type];
  }

  // Update autocomplete based on selected layers
  var activeLandmarks;
  if (Object.keys(polyState).length == 0) {
    activeLandmarks = DATA;
  }
  else {
    activeLandmarks = [];
    for (var activeType in polyState) {
      activeLandmarks = activeLandmarks.concat(findDataByType(DATA, activeType));
    }
  }
    
  $('.search').autocomplete({ source: getAutoCompleteNames([activeLandmarks]) });
}

// Firebase auth
var auth = new FirebaseSimpleLogin(fb, fbUserCallback);
var loggedIn = false;

function fbUserCallback(error, user) {
  if (error) { /* Error */
    console.log(error);
    loggedIn = false;
    $('#login-text').show();
    $('#loggedin-text').hide();
    $('#login-form').hide();
  }
  else if (user) { /* Logged in */
    loggedIn = true;
    $('#login-form').hide();
    $('#login-text').hide();
    $('#loggedin-username').text(user.email);
    $('#loggedin-text').show();
    $('#drawmode').css('display', 'inline');
    $('#layers-menu').append('<li id="new-layer-button" role="presentation"><a role="menu-item" href="#" data-toggle="modal" data-target="#new-layer">New Layer</a></li>')
  } else { /* Logged out */
    loggedIn = false;
    $('#login-text').show();
    $('#loggedin-text').hide();
    $('#login-form').hide();
    $('#drawmode').css('display', 'none');
    $('#new-layer-button').remove();
  }
}

function fbLogout() {
  auth.logout();
}

function fbLogin(email, password) {
  auth.login('password', {
    email: email,
    password: password,
    rememberMe: true
  }, function(error, user) { 
    if (error)
      console.log(error);
  });
}

function fbSignup(email, password) {

}

// Login form
function showLoginForm(type) {
  var callback;
  if (type == "login") {
    callback = fbLogin;
  }
  else {
    alert("Not working yet. Check back soon!");
    return; //
    callback = fbSignup;
  }

  $('#password').on('keyup', function(e) {
    if (e.keyCode == 13) {
      callback($('#email').val(), $('#password').val());
      $('#password').off('keyup');
    }
  });

  $('#login-form').css('display', 'block');
  $('#login-text').hide();
}

// UTIL

/* GetJSON uses x/y coordinates, whereas
 * Leaflet uses Lat/Lng
 */
function geoJSONToLeaflet(points) {
  return points.map(function (e) {
    return [e[1], e[0]];
  });
}
