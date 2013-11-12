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
  ["Church of San Salvatore", [-72.7119, 22953.41675], 7],
  ["San Francesco della Vigna", [-72.47528, 23009.63379], 6],
  ["Church of San Lorenzo", [-74.13408, 22998.27393], 6],
  ["Church of Sant'Agnese", [-76.16925, 22889.68506], 7],
  ["Former Church of San Gregorio", [-77.71627, 22914.93164], 6],
  ["Former Church of the Carità", [-74.48466, 22899.6936], 7],
  ["Church of the San Fantin", [-75.79403, 22932.58667], 7], /* Correct? */
  ["Church of San Giovanni in Bragora", [-76.94545, 23009.74365], 6],
  ["Church of San Zaccaria", [-76.52706, 22992.49512], 6],
  ["Church of San Martino near Arsenale", [-77.57523, 23024.23462], 7],
  ["Church of San Giorgio Maggiore and Cloister of the Cipressi", [-81.43359, 22974.36768], 6],
  ["Saint Mark's Basilica", [-76.05321, 22967.18262], 7],
  ["Church of San Pietro di Castello", [-76.58836, 23070.73975], 6]
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

    $("#select").click(startDrawMode);

    $("#minus-sign").click(hideHeader);
    $("#plus-sign").click(showHeader);

    // Initialize search
    var churchNames = churches.map(function (e) { return e[0]; });
    $(".search").autocomplete({ source: churchNames });
    $(".search").on("autocompleteselect", function (event, ui) {
      var church = findData(churches, ui.item.value);
      map.setView(church[1], church[2], { animate: true });
    });
    
    // Initialize leaflet map
    map = L.map('map', { center: [-73, 22973.5], zoom: 3 });
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

var rectX, rectY;

function startRect(event) {
  $(".rect-canvas").append('<div class="rect"></div>');
  rectX = event.clientX;
  rectY = event.clientY;
  $(".rect").css({ top: rectY, left: rectX });
  $(".rect-canvas").mousemove(updateRect);
}

function updateRect(event) {
  $(".rect").css({ width: (event.clientX - rectX)+"px", height: (event.clientY - rectY)+"px"});
}

function endRect(event) {
  var x = rectX;
  var y = rectY;
  var width = $(".rect").css("width").slice(0, -2);
  var height = $(".rect").css("height").slice(0, -2);

  $(".rect").remove();
  $(".rect-canvas").remove();

  // GET IMAGE
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

function startDrawMode() {
  $("body").append('<div class="rect-canvas"></div>');
  $(".rect-canvas").mousedown(startRect)
  $(".rect-canvas").mouseup(endRect)
}
