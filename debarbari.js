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

    $("#id").click(function () { 
      this.href = getData(); 
      setTimeout(function() { 
        $("#id").attr("href", "#");
      }, 100); 
    });

    $("#minus-sign").click(hideHeader);
    $("#plus-sign").click(showHeader);
    
    // Initialize leaflet map
    var map = L.map('map', { center: [-73, 22973.5], zoom: 3 });
    L.tileLayer('http://debarbari.veniceprojectcenter.org/tiles/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 13, tms: true}).addTo(map);
  });
}


function getData() {
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
