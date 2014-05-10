// Turn on strict mode
"use strict";

var map,
    DATA = [],
    Firebase,
    fb = new Firebase('https://vpc.firebaseio.com/debarbari');


// Remove if possible!!!!
var fbAuth = new firebaseAuth();
var rectDrawer;

/* Useful static utilties for searching and using the
 * data we have
 */
var dataUtilities = {

  /* Searches the given list of landmarks for one with the given name.
   * This will return the first valid result found, or null if nothing has
   * been found.
   */
  findData: function (list, val) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].properties && list[i].properties.name == val) return list[i];
    }

    return null;
  },

  /* Searches the given list of landmarks for ones with the given type.
   * This will return a list of results
   */
  findDataByType: function (list, type) {
    var results = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].properties && list[i].properties.type == type) results.push(list[i]);
    }

    return results;
  },

  /* Returns a list of lists of landmarks, creates a list of names
   * to be used with as autocompletion names in the search bar
   */
  getAutoCompleteNames: function (datasets) {
    var names = [];
    for (var i = 0; i < datasets.length; ++i) {
      for (var j = 0; j < datasets[i].length; ++j) {
        if (datasets[i][j].properties && datasets[i][j].properties.name)
          names.push(datasets[i][j].properties.name);
      }
    }

    return names;
  },

  /* GetJSON uses x/y coordinates, whereas
   * Leaflet uses Lat/Lng
   */
  geoJSONToLeaflet: function (points) {
    return points.map(function (e) {
      return [e[1], e[0]];
    });
  }
};

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
    });

    rectDrawer = new RectDrawer();
    $("#select").click(rectDrawer.initialize.bind(rectDrawer, downloadSection));

    $('#drawmode').click(startPolyMode);

    $('#login-link').click(function () {
      showLoginForm('login');
    });
    $('#signup-link').click(function () {
      showLoginForm('signup');
    });
    $('#logout-link').click(fbAuth.logout);

    $('#new-layer-button').click(addNewLayer);
    $('#new-feature-submit').click(submitFeature);
    $('#new-feature-discard').click(discardFeature);

    $('#clone-button').click(clonePoly2);

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
    new L.Control.Attribution({ prefix: false, position: 'bottomleft' }).addAttribution('<a href="http://veniceprojectcenter.org"><img src="img/vpc-small.png"></img></a>').addTo(map);
    L.tileLayer('http://debarbari.veniceprojectcenter.org/tiles2/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true}).addTo(map);

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
        img.src = "img/fullscreen.png";
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
    var names = dataUtilities.getAutoCompleteNames([DATA]);
    $(".search").autocomplete({ source: names });
  });
  $(".search").on("autocompleteselect", function (event, ui) {
    var landmark = dataUtilities.findData(DATA, ui.item.value);
    map.setView(landmark.properties.center, 8 /* LOL IGNORE ZOOM */, { animate: true });
  });
}

function initializeLayers() {
  fb.child('vpc/layers').on('child_added', function (snapshot) {
    var data = snapshot.val();
    var newOption = '<li role="presentation"><a role="menuitem" id="'+data.id+'-layer" href="#">'+data.name+'</a></li>';

    if (data.parent) {
      var strippedParentName = data.parent.replace(/\s/g, '');
      if ($('#'+strippedParentName+'-menu').length == 0) {
        var newGroup = ' <li class="dropdown-submenu"><a href="#">'+data.parent+'</a><ul id="'+strippedParentName+'-menu" class="dropdown-menu"></ul></li>';
        $('#new-layer-parent-other').before('<option value="'+data.parent+'">'+data.parent+'</option>')

        if (loggedIn) {
          $('#new-layer-menu').before(newGroup);
        }
        else {
          $('layers-menu').append(newGroup);
        }
      }
      $('#'+strippedParentName+'-menu').append(newOption);
    }
    else {
      if (loggedIn) {
        $('#new-layer-menu').before(newOption);
      }
      else {
        $('.layers-menu').append(newOption);
      }
    }

    $('#' + data.id + '-layer').click(toggleLayer.bind(this, data.id, data.color));
    $('.layers-select').append('<option value="'+data.id+'">'+data.name+'</option>');
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
var points = [],
    markers = [],
    newPoly = null,
    state = "start",
    editor,
    polyLayer;
function startPolyMode() { // XXX misleading function name
  if (state == "draw") return;

  // End edit mode
  if (state == "edit") {
    editor.disable();
    state = "editend";

    $('#new-feature-name').val(selectedData.properties.name);
    $('#new-feature-type').val(selectedData.properties.type);
    $('#new-feature-link').val(selectedData.properties.link);

    $('#new-feature').modal('show');
    $('#drawmode').removeClass('active');
    return;
  }

  // XXX HACK ALERT
  // Check if a feature is selected. This will unselect it.
  var layerCount = Object.keys(map._layers).length;
  map.closePopup();
  var newLayerCount = Object.keys(map._layers).length;
  var objectSelected = layerCount > newLayerCount;

  if(objectSelected) { // If an object is selected, edit it
    // selectedPoly in the poly click handler
    polyLayer = selectedPoly;
    editor = new L.Edit.Poly(selectedPoly);
    editor.enable();
    state = "edit";
  }

  else { // Draw a new polygon
    map.once('draw:created', function (e) {
      polyLayer = e.layer;
      $('#new-feature').modal('show');
      $('#drawmode').removeClass('active');
      state = "start";
    });

    // Start the Leaflet.Draw plugin
    var circleIcon = new L.Icon({
      iconUrl: "img/circle.png",
      iconSize: [8,8]
    });
    new L.Draw.Polygon(map, {icon: circleIcon}).enable();
    state = "draw";
  }

  // Update button style
  $('#drawmode').addClass('active');
}

function submitFeature() {
  var name = $('#new-feature-name').val();
  var type = $('#new-feature-type').val();
  var link = $('#new-feature-link').val();

  // XXX fix name
  if (!name) return;

  // If the feature already exists, update it
  var feature;
  if (state == "editend") {
    feature = selectedData;
    state = "start";
  }
  else {
    feature = dataUtilities.findData(DATA, name);
  }
  if (feature) {
    feature.properties.name = name;
    feature.geometry = polyLayer.toGeoJSON().geometry;
    feature.properties.type = type;
    feature.properties.link = link;
    fb.child('vpc/features').set(DATA);
  }
  else {
    var newFeature = {
      type: "Feature",
      geometry: polyLayer.toGeoJSON().geometry,
      properties: {
        name: name,
        type: type,
        link: link,
        zoom: map.getZoom(),
        center: {
          lat: polyLayer.getBounds().getCenter().lat,
          lng: polyLayer.getBounds().getCenter().lng
        }
      }
    };
    fb.child('vpc/features').push(newFeature);
  }

  $('#new-feature').modal('hide');
}

function discardFeature() {
  if (state == "editend") { // If data exists (editing), delete it
    DATA.splice(DATA.indexOf(selectedData), 1);
    fb.child('vpc/features').set(DATA);
  }

  $('#new-feature').modal('hide');
}

// Download rect
function RectDrawer() {
  var rectX, rectY,
      latlngStart, latlngEnd;

  this.endRect = function (callback, event) {
    var x = $(".rect").css("left").slice(0, -2);;
    var y = $(".rect").css("top").slice(0, -2);;
    var width = $(".rect").css("width").slice(0, -2);
    var height = $(".rect").css("height").slice(0, -2);

    $(".rect").remove();
    $(".rect-canvas").remove();

    $('#select').removeClass('active');
    callback(x, y, width, height);
  }

  this.startRect = function (event) {
    $(".rect-canvas").append('<div class="rect"></div>');
    rectX = event.clientX;
    rectY = event.clientY;
    $(".rect").css({ top: rectY, left: rectX });
    $(".rect-canvas").mousemove(this.updateRect);
  }

  this.initialize = function (callback) {
    $("body").append('<div class="rect-canvas"></div>');
    $(".rect-canvas").mousedown(this.startRect.bind(this));
    $(".rect-canvas").mouseup(this.endRect.bind(this, callback));

    $('#select').addClass('active');
  }

  this.updateRect = function (event) {
    var xDiff = event.clientX - rectX,
        yDiff = event.clientY - rectY,
        newX, newY, newWidth, newHeight;

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
  var parent = $('#new-layer-parent').val();

  if (parent == "Other") {
    parent = $('#new-layer-new-parent').val();
  }

  // Fail silently if fields empty for now
  if (!(name || id || color)) {
    return;
  }

  // TODO generalize for any account
  fb.child('vpc/layers').push({name: name, id: id, color: color, parent: parent});
  $('#new-layer').modal('hide');
}

function clonePoly() {
  $('#clone-layer').modal('show');
}

function clonePoly2() {
  var newData = $.extend(true, {}, selectedData); // clone the data
  newData.properties.type = $('#clone-layer-type').val();
  fb.child('vpc/features').push(newData);

  $('#clone-layer').modal('hide');
  map.closePopup();
}

var polyState = {};
var selectedPoly = null;
var selectedData = null;
function toggleLayer(type, color) {
  if (!polyState[type]) {
    polyState[type] = [];
    for (var i = 0; i < DATA.length; ++i) {
      if (DATA[i].properties.type == type && DATA[i].geometry) {
        var points = dataUtilities.geoJSONToLeaflet(DATA[i].geometry.coordinates[0]);
        var newPoly = L.polygon(points, {color: color, weight: 2});

        // Clicking on a polygon will bring up a pop up
        newPoly.on('click', (function (data, poly){
          var content = '<b class="popup">'+data.properties.name+'</b>';
          if (data.properties.link) {
            content = '<a href="' + data.properties.link + '" target="blank_">' + content + '</a>';
          }
          if (loggedIn) {
            content += '<br /><a class="clone" href="#" onclick="clonePoly()">Clone</a>';
          }
          L.popup().setLatLng(data.properties.center).setContent(content).openOn(map);
          selectedPoly = poly;
          selectedData = data;
        }).bind(this, DATA[i], newPoly));

        // Double clicking a polygon will center the landmark
        // XXX Doesn't work?
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
      activeLandmarks = activeLandmarks.concat(dataUtilities.findDataByType(DATA, activeType));
    }
  }

  $('.search').autocomplete({ source: dataUtilities.getAutoCompleteNames([activeLandmarks]) });
}

var loggedIn = false;

// Firebase auth

function firebaseAuth () {
  var auth;

  this.userCallback = function (error, user) {
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
      $('.layers-menu').append('<li id="new-layer-menu" role="presentation"><a role="menu-item" href="#" data-toggle="modal" data-target="#new-layer">New Layer</a></li>');
    } else { /* Logged out */
      loggedIn = false;
      $('#login-text').show();
      $('#loggedin-text').hide();
      $('#login-form').hide();
      $('#drawmode').css('display', 'none');
      $('#new-layer-menu').remove();
    }
  };

  this.login = function (email, password) {
    auth.login('password', {
      email: email,
      password: password,
      rememberMe: true
    }, function(error, user) {
      if (error)
        console.log(error);
    });
  };

  this.logout = function () {
    auth.logout();
  };

  this.signup = function (email, password) {
    // Not implemented for now.
    // Firebase has a very simple easy API for signing up.

    // This should probably log the user in after the account
    // is created.
  };

  // Create the firebase login object
  auth = new FirebaseSimpleLogin(fb, this.userCallback);

  return this;
}

// Login form
function showLoginForm(type) {
  var callback;
  if (type == "login") {
    callback = fbAuth.login;
  }
  else {
    alert("Not working yet. Check back soon!");
    return;
    callback = fbAuth.signup;
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
