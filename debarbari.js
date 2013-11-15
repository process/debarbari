var map;

var churches = [
  ["Church of San Nicolò dei Mendicoli", [-72.63993, 22875.55664], 7],
  ["Church of San Giacomo dell'Orio", [-67.11875, 22924.90723], 7],
  ["Church of Sant'Alvise", [-62.69431, 22940.04639], 7],
  ["Church of Santo Stefano", [-74.13408, 22916.67847], 6],
  ["Church of Santa Maria Gloriosa dei Frari", [-69.51915, 22913.10791], 6],
  ["Church of the Carmini", [-72.73148, 22894.9585], 7],
  ["Church of San Giobbe", [-62.84512, 22906.74683], 7],
  ["Church of Angelo Raffaele", [-72.90026, 22884.79614], 7],
  ["Church of San Pantalon", [-70.54686, 22904.24194], 7],
  ["Church of San Giacomo at Rialto", [-69.75616, 22947.4292], 7],
  ["Church of Santi Maria e Donato", [-61.90793, 23002.37183], 7],
  ["Church of Madonna dell'Orto", [-63.77278, 22946.90186], 7],
  ["Church of S. Michele in Isola", [-64.97936, 22987.13379], 7],
  ["Church of Santa Maria dei Miracoli", [-70.24832, 22967.89673], 7],
  ["Church of Santi Apostoli", [-68.39109, 22958.33862], 7],
  ["Church of SS. Giovanni e Paolo", [-70.71447, 22981.97021], 6],
  ["Church of Santa Maria Formosa", [-73.6154, 22976.09253], 7],
  ["Church of San Giovanni Crisostomo", [-69.72191, 22959.77783], 7],
  ["Former Convent of San Salvador", [-72.7119, 22953.41675], 7],
  ["Convent of San Francesco della Vigna", [-72.47528, 23009.63379], 6],
  ["Church of San Lorenzo", [-74.13408, 22998.27393], 6],
  ["Church of Sant'Agnese", [-76.16925, 22889.68506], 7],
  ["Former Church of San Gregorio", [-77.71627, 22914.93164], 6],
  ["Former Church of the Carità", [-74.48466, 22899.6936], 7],
  ["Church of the San Fantin", [-75.79403, 22932.58667], 7], /* Correct? */
  ["Church of San Giovanni in Bragora", [-76.94545, 23009.74365], 6],
  ["Church of San Zaccaria", [-76.52706, 22992.49512], 6],
  ["Church of San Martino near Arsenale", [-77.57523, 23024.23462], 7],
  ["Church of San Giorgio Maggiore and Cloister of the Cipressi", [-81.43359, 22974.36768], 6],
  ["Basilica of Saint Mark", [-76.05321, 22967.18262], 7],
  ["Church of San Pietro di Castello", [-76.58836, 23070.73975], 6]
];

var demolishedChurches = [
  ["Church of Corpus Domini", [-69.1018992122562, 22891.31103515625], 7],
  ["Church of Santa Lucia", [-67.92720481451185, 22896.23291015625], 7],
  /*["Convent of the Crociferi????????", [-67.08668927672144, 22971.533203125], 7]*/
  []
];

var repurposedChurches = [
  ["Church of San Vidal", [-74.48760078108175, 22912.6904296875], 7]
];

var bridges = [
  ["Ponte de la Croze", [-82.85133180485437, 22913.27270507812], 7]
];

var demolishedChurchColors = [
  [ /* Corpus Domini */
    [-69.9830151028733, 22888.883056640625],
    [-69.51145744782765, 22891.607666015625],
    [-69.36483123672544, 22891.541748046875],
    [-69.26393034602106, 22892.113037109375],
    [-69.18599349954394, 22892.069091796875],
    [-69.22499685411589, 22892.178955078125],
    [-69.18599349954394, 22892.552490234375],
    [-68.88727366584355, 22892.530517578125],
    [-68.60852084639887, 22890.882568359375],
    [-68.6325507815757, 22890.640869140625],
    [-68.52823492039876, 22890.61889648437],
    [-68.47186403726953, 22890.37719726562],
    [-68.52823492039876, 22890.113525390625],
    [-68.51214331858071, 22890.003662109375],
    [-68.5443150407769, 22888.619384765625],
    [-68.65655498475735, 22888.201904296875],
    [-69.58056349224897, 22887.301025390625],
    [-69.52683366454718, 22887.608642578125],
    [-69.55755297124296, 22887.85034179687]
  ],
  [ /* Santa Lucia */
    [-68.48395536734631, 22896.046142578125],
    [-68.53225602660771, 22896.199951171875],
    [-68.27345405495296, 22897.36450195312],
    [-68.05278304131106, 22897.342529296875],
    [-68.10200447389143, 22897.474365234375],
    [-67.92926896758328, 22898.11157226562],
    [-67.59666247714624, 22898.089599609375],
    [-67.29325646952465, 22896.199951171875],
    [-67.29325646952465, 22895.84838867187],
    [-67.62177205521934, 22894.354248046875],
    [-67.6969406930543, 22894.83764648437],
    [-67.67191113958987, 22894.947509765625],
    [-67.80509469602548, 22896.024169921875]
  ]
];

var bridgeColors = [
  [ /* Ponte de la Croze */
    [-82.89970337643459, 22912.6025390625],
    [-82.87249197680256, 22912.646484375],
    [-82.85064817916859, 22912.80029296875],
    [-82.83422163810538, 22913.10791015625],
    [-82.82873778533543, 22913.41552734375],
    [-82.83970131925237, 22913.701171875],
    [-82.86976513726212, 22913.942871093746],
    [-82.90241882535476, 22914.0087890625],
    [-82.84791302601151, 22914.2724609375],
    [-82.83696199993649, 22914.536132812496],
    [-82.80125583766977, 22914.51416015625],
    [-82.79023374767752, 22913.96484375],
    [-82.78747560323012, 22913.437499999996],
    [-82.79574688944791, 22912.97607421875],
    [-82.80400874018102, 22912.514648437496]
  ]
]

function findData(list, val) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] == val) return list[i];
  }

  return null;
}

function debarbariInit() {
  // jQuery init
  $(function() {
    // Register handlers
    $("#header").hover(
      function () { // onmouseenter
        $("#header").animate({ opacity: 1.0 }, 250); 
      },
      function () { // onmouseleave
        $("#header").animate({ opacity: 0.6 }, 250); 
      }
    );

    $(".dl").click(function () { 
      this.href = getData(); 
      setTimeout(function() { 
        $("#dl").attr("href", "#");
      }, 100); 
    });

    $("#select").click(startDrawMode.bind(this, downloadSection));

    $("#minus-sign").click(hideHeader);
    $("#plus-sign").click(showHeader);

    // Initialize search
    var churchNames = churches.map(function (e) { return e[0]; });
    for (var i = 0; i < demolishedChurches.length; ++i) {
      churchNames.push(demolishedChurches[i][0]);
    }
    for (var i = 0; i < repurposedChurches.length; ++i) {
      churchNames.push(repurposedChurches[i][0]);
    }
    for (var i = 0; i < bridges.length; ++i) {
      churchNames.push(bridges[i][0]);
    }
    $(".search").autocomplete({ source: churchNames });
    $(".search").on("autocompleteselect", function (event, ui) {
      var church = findData(churches, ui.item.value) || findData(repurposedChurches, ui.item.value) || findData(demolishedChurches, ui.item.value) || findData(bridges, ui.item.value);
      map.setView(church[1], church[2], { animate: true });
    });
    
    // Initialize leaflet map
    map = L.map('map', { center: [-73, 22973.5], zoom: 3, attributionControl: false });
    new L.Control.Attribution({ prefix: false }).addAttribution('<a href="http://veniceprojectcenter.org">Venice Project Center</a>').addTo(map);
    L.tileLayer('http://debarbari.veniceprojectcenter.org/tiles/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true}).addTo(map);

    var tms2 = L.tileLayer('http://debarbari.veniceprojectcenter.org/tiles/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true});
    var miniMap = new L.Control.MiniMap(tms2, { toggleDisplay: true }).addTo(map);
  });
}

function getCanvasFromMap() {
  var c = document.createElement("canvas");
  c.width = $("#map").width();
  c.height = $("#map").height();
  var canvas = c.getContext("2d");

  var imgs = $(".leaflet-tile-container.leaflet-zoom-animated").children();

  for (i in imgs) {
    if (isNaN(i)) continue;
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

function hideHeader() {
  $("#header").animate({height: 0, width: 0}, 250, function () {
    $("#header").css('display', 'none');
    $("#mini-header").css('display', 'block');
  });
}

function showHeader() {
  $("#header").css({height: "auto", width: "auto"});
  var autoWidth = $("#header").css("width");
  var autoHeight = $("#header").css("height");
  $("#header").css({height: 0, width: 0, display: "block"});

  $("#mini-header").css({display: "none"});
  $("#header").animate({height: autoHeight, width: autoWidth}, 250);
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

function startPolyMode() {
  map.on('click', addPoint);
}

function endPolyMode() {
  L.polygon(points).addTo(map);
  map.off('click', addPoint);

  for (var i = 0; i < points.length; ++i) {
    console.log('['+points[i].lat+', '+points[i].lng+']');
  }

  points = [];
  for (var i = 0; i < markers.length; ++i) {
    map.removeLayer(markers[i]);
  }
  markers = []
}

// Download rect
var rectX, rectY;
var latlngStart, latlngEnd;

function startRect(event) {
  $(".rect-canvas").append('<div class="rect"></div>');
  rectX = event.clientX;
  rectY = event.clientY;
  $(".rect").css({ top: rectY, left: rectX });
  $(".rect-canvas").mousemove(updateRect);
}

function updateRect(event) {
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

function endRect(callback, event) {
  var x = $(".rect").css("left").slice(0, -2);;
  var y = $(".rect").css("top").slice(0, -2);;
  var width = $(".rect").css("width").slice(0, -2);
  var height = $(".rect").css("height").slice(0, -2);

  $(".rect").remove();
  $(".rect-canvas").remove();

  callback(x, y, width, height);
}

function startDrawMode(callback) {
  $("body").append('<div class="rect-canvas"></div>');
  $(".rect-canvas").mousedown(startRect)
  $(".rect-canvas").mouseup(endRect.bind(this, callback))
}

// Enable layers
function showDemolishedChurches() {
  for (var i = 0; i < demolishedChurchColors.length; ++i) {
    L.polygon(demolishedChurchColors[i]).addTo(map);
  }
}

// UTIL
function record(name) {
    console.log('["' + name + '", [' + map.getCenter().lat + ', ' + map.getCenter().lng + '], ' + map.getZoom() + ']');
}