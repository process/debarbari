var map;

var churches_ = [
  {
    name: "Church of San Nicolò dei Mendicoli",
    center: [-72.63993,22875.55664],
    zoom: 7
  },
  {
    name: "Church of San Giacomo dell'Orio",
    center: [-67.11875,22924.90723],
    zoom: 7
  },
  {
    name: "Church of Sant'Alvise",
    center: [-62.69431,22940.04639],
    zoom: 7
  },
  {
    name: "Church of Santo Stefano",
    center: [-74.13408,22916.67847],
    zoom: 6
  },
  {
    name: "Church of Santa Maria Gloriosa dei Frari",
    center: [-69.51915,22913.10791],
    zoom: 6
  },
  {
    name: "Church of the Carmini",
    center: [-72.73148,22894.9585],
    zoom: 7
  },
  {
    name: "Church of San Giobbe",
    center: [-62.84512,22906.74683],
    zoom: 7
  },
  {
    name: "Church of Angelo Raffaele",
    center: [-72.90026,22884.79614],
    zoom: 7
  },
  {
    name: "Church of San Pantalon",
    center: [-70.54686,22904.24194],
    zoom: 7
  },
  {
    name: "Church of San Giacomo at Rialto",
    center: [-69.75616,22947.4292],
    zoom: 7
  },
  {
    name: "Church of Santi Maria e Donato",
    center: [-61.90793,23002.37183],
    zoom: 7
  },
  {
    name: "Church of Madonna dell'Orto",
    center: [-63.77278,22946.90186],
    zoom: 7
  },
  {
    name: "Church of S. Michele in Isola",
    center: [-64.97936,22987.13379],
    zoom: 7
  },
  {
    name: "Church of Santa Maria dei Miracoli",
    center: [-70.24832,22967.89673],
    zoom: 7
  },
  {
    name: "Church of Santi Apostoli",
    center: [-68.39109,22958.33862],
    zoom: 7
  },
  {
    name: "Church of SS. Giovanni e Paolo",
    center: [-70.71447,22981.97021],
    zoom: 6
  },
  {
    name: "Church of Santa Maria Formosa",
    center: [-73.6154,22976.09253],
    zoom: 7
  },
  {
    name: "Church of San Giovanni Crisostomo",
    center: [-69.72191,22959.77783],
    zoom: 7
  },
  {
    name: "Former Convent of San Salvador",
    center: [-72.7119,22953.41675],
    zoom: 7
  },
  {
    name: "Convent of San Francesco della Vigna",
    center: [-72.47528,23009.63379],
    zoom: 6
  },
  {
    name: "Church of San Lorenzo",
    center: [-74.13408,22998.27393],
    zoom: 6
  },
  {
    name: "Church of Sant'Agnese",
    center: [-76.16925,22889.68506],
    zoom: 7
  },
  {
    name: "Former Church of San Gregorio",
    center: [-77.71627,22914.93164],
    zoom: 6
  },
  {
    name: "Former Church of the Carità",
    center: [-74.48466,22899.6936],
    zoom: 7
  },
  {
    name: "Church of the San Fantin", /* Correct? */
    center: [-75.79403,22932.58667],
    zoom: 7
  },
  {
    name: "Church of San Giovanni in Bragora",
    center: [-76.94545,23009.74365],
    zoom: 6
  },
  {
    name: "Church of San Zaccaria",
    center: [-76.52706,22992.49512],
    zoom: 6
  },
  {
    name: "Church of San Martino near Arsenale",
    center: [-77.57523,23024.23462],
    zoom: 7
  },
  {
    name: "Church of San Giorgio Maggiore and Cloister of the Cipressi",
    center: [-81.43359,22974.36768],
    zoom: 6
  },
  {
    name: "Basilica of Saint Mark",
    center: [-76.05321,22967.18262],
    zoom: 7
  },
  {
    name: "Church of San Pietro di Castello",
    center: [-76.58836,23070.73975],
    zoom: 6
  }
];

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
  ["Demolished Church of Corpus Domini", [-69.1018992122562, 22891.31103515625], 7],
  ["Demolished Church of Santa Lucia", [-67.92720481451185, 22896.23291015625], 7],
  ["Demolished Church of Santa Margherita", [-71.42280436921011, 22901.429443359375], 8],
  ["Demolished Church of the Templari", [-76.75802477369372, 22946.11083984375], 8], // or Santa Maria dell'Ascensione
  ["Demolished Church of Ternita", [-74.5506480395836, 23015.04455566406], 8],
  ["Demolished Church of San Stin", [-68.9869706187376, 22916.689453125], 8],
  ["Demolished Church of Sant'Agostin", [-68.9001312167013, 22926.104736328125], 8],
  ["Demolished Church of San Boldo", [-68.2256180821868, 22932.328491210938], 8],
  ["Demolished Convent of the Celestia", [-73.64481249034911, 23018.5107421875], 8], // or Santa Maria de la Celestia
  ["Demolished Church of Santa Maria dei Servi", [-64.33752904242549, 22934.954223632812], 8], // not really demolished?
  ["Demolished Church of San Tomà", [-71.47610617440442, 22912.66845703125], 8], // not really demolished?
  ["Demolished Church of Santa Croce", [-70.31133703000764, 22891.744995117188], 8],
  ["Demolished Church of San Vio", [-76.34930387697642, 22898.501586914062], 8],
  ["Demolished Convent of the Crociferi", [-67.02887556543278, 22971.69799804687], 8],
  ["Demolished Church of Geminiano", [-76.23475200291313, 22949.21997070312], 8],
  ["Demolished Convent of San Cristoforo", [-66.46724418515859, 22983.11279296875], 8],
  ["Demolished Church of San Provolo", [-76.05188901233623, 22985.101318359375], 8],
  ["Demolished Church of Santa Marina", [-71.07049277109596, 22967.77587890625], 8],
  ["Demolished Church of San Daniele", [-76.74165712324191, 23057.237548828125], 8],
  ["Demolished Convent of the Vergini", [-77.33662698794667, 23025.855102539062], 8], //??
  ["Demolished Church of San Paterniano", [-73.67417651166814, 22938.788452148438], 8],
  ["Demolished Church of San Severo", [-75.3617294907569, 22987.996215820312], 8],
  ["Demolished Church of Sant'Angelo", [-73.9194260357383, 22921.226806640625], 8],
  ["Demolished Church of San Nicoló di Castello", [-78.64299357031803, 23054.326171875], 7], //?
  ["Demolished Convent of Sant'Anna", [-78.510263861155, 23072.266845703125], 8],
  ["Demolished Hospital and Convent of Sant’Antonio", [-80.297927149974, 23067.059326171875], 8],
  ["Demolished Convent of San Domenico", [-78.94087000996285, 23058.599853515625], 8],
  ["Demolished Church of San Bartolomeo di Castello", [-71.18952520749146, 22957.613525390625], 8] //?
  /*["Convent of the Crociferi????????", [-67.08668927672144, 22971.533203125], 7]*/
];

var repurposedChurches = [
  ["Church of San Vidal", [-74.48760078108175, 22912.6904296875], 7]
];

var bridges = [
  ["Ponte de la Croze", [-82.85133180485437, 22913.27270507812], 7]
];

var demolishedChurchColors = [
  [ "Demolished Church of Corpus Domini",
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
  [ "Demolished Church of Santa Lucia",
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
  ],
  [ "Demolished Church of San Stin",
    [-69.32995725081676, 22915.17333984375],
    [-69.20550391636527, 22915.1513671875],
    [-69.15864952562399, 22915.2392578125],
    [-69.08817875992878, 22915.2392578125],
    [-69.01748042199839, 22915.283203125],
    [-69.0332108625924, 22915.634765625],
    [-69.00173871231313, 22915.72265625],
    [-68.63655326841952, 22915.74462890625],
    [-68.40322416624196, 22915.986328125],
    [-68.62854757995426, 22916.25],
    [-68.96233509064633, 22916.31591796875],
    [-68.97022145813169, 22917.6123046875],
    [-69.00961097622238, 22917.744140625],
    [-69.0646379640348, 22917.72216796875],
    [-69.10385857475971, 22917.81005859375],
    [-69.26004013759507, 22917.81005859375],
    [-69.3609591299117, 22917.5244140625]
  ],
  [ "Demolished Church of San Tomà",
    [-71.5978807327708, 22913.300170898438],
    [-71.55274065141298, 22912.827758789062],
    [-71.43417616304582, 22912.827758789062],
    [-71.3816348737918, 22913.069458007812],
    [-71.37110941823616, 22913.179321289062],
    [-71.3675996578466, 22913.541870117188],
    [-71.38864865717821, 22913.783569335938],
    [-71.38864865717821, 22913.607788085934],
    [-71.44816299792794, 22913.464965820312]
  ],
  [ "Demolished Church of Geminiano",
    [-76.44490733708943, 22949.208984375],
    [-76.53729617099738, 22949.27490234375],
    [-76.53729617099738, 22949.7802734375],
    [-76.25825951133778, 22949.736328125],
    [-76.1902412856612, 22949.472656249996],
    [-76.19548515714274, 22949.296874999996],
    [-76.06380082579659, 22949.27490234375],
    [-75.82903976426945, 22948.83544921875],
    [-76.06380082579659, 22948.505859375],
    [-76.33633385775283, 22948.505859375],
    [-76.33114246585924, 22947.4951171875],
    [-76.39331166244494, 22947.5390625],
    [-76.37261948220726, 22948.286132812496],
    [-76.42944882508331, 22948.330078125],
    [-76.39847988900951, 22948.61572265625]
  ],
  [ "Demolished Convent of the Celestia",
    [-73.86761239709705, 23017.9833984375],
    [-73.9194260357383, 23019.42260742187],
    [-73.53462847039683, 23019.400634765625],
    [-73.43468937493594, 23019.27978515625],
    [-73.43468937493594, 23019.114990234375],
    [-73.52216821373521, 23018.88427734375],
    [-73.58748242628445, 23018.88427734375],
    [-73.42215560370377, 23016.917724609375],
    [-73.46285669225547, 23016.719970703125],
    [-73.53462847039683, 23016.730957031246],
    [-73.5595215050371, 23017.093505859375],
    [-73.6060973425433, 23017.17041015625],
    [-73.67108797869977, 23017.17041015625],
    [-73.7972528526321, 23017.137451171875],
    [-73.81257376708518, 23017.56591796875]
  ],
  [ "Demolished Church of San Vio",
    [-76.65444953503201, 22899.034423828125],
    [-76.66965642801192, 22898.84765625],
    [-76.56284986632163, 22898.814697265625],
    [-76.437180242191, 22898.309326171875],
    [-76.26086902512846, 22898.34228515625],
    [-76.22167523997352, 22898.82568359375],
    [-76.19548515714274, 22899.0673828125],
    [-76.20596704314148, 22899.3310546875],
    [-76.41397301513197, 22899.935302734375],
    [-76.49631101453926, 22900.242919921875],
    [-76.52194106477647, 22900.330810546875],
    [-76.49631101453926, 22900.001220703125],
    [-76.56540261576497, 22899.045410156246]
  ],
  [ "Demolished Church of San Daniele",
    [-77.29320180280092, 23057.7099609375],
    [-77.15227758214056, 23057.68798828125],
    [-77.03941844273027, 23057.5341796875],
    [-77.05419428289702, 23058.25927734375],
    [-76.8358132457717, 23058.3251953125],
    [-76.75047294087425, 23058.10546875],
    [-76.70507304221529, 23057.556152343746],
    [-76.61381450204216, 23057.556152343746],
    [-76.45005633358495, 23057.2705078125],
    [-76.58325853729983, 23056.94091796875],
    [-76.68484630658422, 23056.875],
    [-76.64430214504891, 23055.6884765625],
    [-76.6239846338914, 23055.66650390625],
    [-76.57305800816077, 23054.282226562496],
    [-76.55263410642529, 23053.7548828125],
    [-76.6087265897133, 23053.95263671875],
    [-76.83080820849284, 23054.4580078125],
    [-76.90070892588689, 23054.677734375],
    [-77.00981701794444, 23055.205078124996],
    [-77.0836963067392, 23055.5126953125],
    [-77.23021785516423, 23056.040039062496]
  ],
  [ "Demolished Church of San Bartolomeo di Castello",
    [-71.95858391176317, 22958.822021484375],
    [-71.97218900592375, 22959.019775390625],
    [-71.81512993041657, 22959.56909179687],
    [-71.71888229713917, 22959.56909179687],
    [-71.6774828543785, 22959.393310546875],
    [-71.6774828543785, 22959.23950195312],
    [-71.65674919588636, 22959.173583984375],
    [-71.57358780072138, 22959.129638671875],
    [-71.53882990638355, 22958.997802734375],
    [-71.46912418989676, 22957.701416015625],
    [-71.10965785497814, 22957.72338867187],
    [-70.79413934642663, 22957.459716796875],
    [-71.09542504766098, 22957.152099609375],
    [-71.43417616304582, 22957.152099609375],
    [-71.51097803770108, 22957.020263671875],
    [-71.57358780072138, 22956.998291015625],
    [-71.65674919588636, 22956.734619140625],
    [-71.7050925307212, 22956.690673828125],
    [-71.7739410364347, 22957.767333984375],
    [-71.76019138754775, 22957.943115234375],
    [-71.74643171904148, 22958.470458984375],
    [-71.76019138754775, 22958.865966796875]
  ],
  [ "Demolished Convent of San Cristoforo",
    [-66.77458576472547, 22982.27783203125],
    [-66.32868478255794, 22982.27783203125],
    [-66.22260000154931, 22982.45361328125],
    [-66.25801126452266, 22983.99169921875],
    [-66.33750501996518, 22984.12353515625],
    [-66.40795547978848, 22984.69482421875],
    [-66.81787214936936, 22984.716796875],
    [-66.81787214936936, 22984.29931640625],
    [-66.76591933032796, 22984.12353515625],
    [-66.80922097449334, 22983.8818359375],
    [-66.85244636494531, 22983.7939453125],
    [-66.85244636494531, 22983.42041015625],
    [-66.80922097449334, 22982.76123046875]
  ],
  [ "Demolished Church of Ternita",
    [-74.65129477919845, 23013.292236328125],
    [-74.28653913497898, 23013.292236328125],
    [-74.28653913497898, 23013.44604492187],
    [-74.13107414231926, 23013.577880859375],
    [-74.29248881670038, 23013.775634765625],
    [-74.31626559042309, 23013.885498046875],
    [-74.58134763420868, 23013.929443359375],
    [-74.5755046849982, 23014.083251953125],
    [-74.4405190775907, 23014.127197265625],
    [-74.36963510892254, 23014.259033203125],
    [-74.62801354073919, 23017.005615234375],
    [-74.66292249033842, 23017.137451171875],
    [-74.89367903011835, 23017.247314453125],
    [-74.97933566982907, 23016.829833984375],
    [-74.86502093158697, 23015.137939453125],
    [-74.801786094667, 23014.500732421875],
    [-74.81905749995477, 23014.017333984375],
    [-74.76718570583333, 23013.929443359375],
    [-74.71514088066166, 23013.709716796875],
    [-74.71514088066166, 23013.44604492187],
  ],
  [ "Demolished Church of San Boldo",
    [-68.67653884786664, 22932.13623046875],
    [-68.4597662352406, 22931.21337890625],
    [-68.26531882965097, 22931.25732421875],
    [-68.19197126323203, 22931.65283203125],
    [-67.81339357926149, 22931.69677734375],
    [-67.61340516352136, 22931.8505859375],
    [-67.78848808681396, 22932.0703125],
    [-68.24903968254743, 22932.09228515625],
    [-68.23274893432084, 22932.377929687496],
    [-68.28158638257969, 22932.70751953125],
    [-68.31408673369978, 22932.94921875],
    [-68.50006707835483, 22933.037109375]
  ]
];

var bridgeColors = [
  [ "Ponte de la Croze",
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

function findData_(list, val) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].name == val) return list[i];
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

    rectDrawer = new RectDrawer;
    $("#select").click(rectDrawer.initialize.bind(rectDrawer, downloadSection));

    $("#minus-sign").click(hideHeader);
    $("#plus-sign").click(showHeader);

    $("#churches-layer").click(toggleChurchLayer);
    $("#bridges-layer").click(toggleBridgeLayer);

    function showdrawicon() {
      if(window.location.hash == '#color') {
        $('#drawmode').css('display', 'inline');
        $('#drawmode').click(togglePolyMode);
      }
      else {
        $('#drawmode').css('display', 'none');
      }
    }
    window.onhashchange = showdrawicon;
    showdrawicon();

    // Initialize search
    var churchNames = churches_.map(function (e) { return e.name; });
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
      map.setView(church[1], 8 /* LOL IGNORE ZOOM */, { animate: true });
    });
    
    // Initialize leaflet map
    map = L.map('map', { center: [-73, 22973.5], zoom: 3, attributionControl: false });
    new L.Control.Attribution({ prefix: false }).addAttribution('<a href="http://veniceprojectcenter.org">Venice Project Center</a>').addTo(map);
    L.tileLayer('tiles/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true}).addTo(map);

    var tms2 = L.tileLayer('tiles/{z}/{x}/{y}.png', {minZoom: 2, maxZoom: 8, tms: true});
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
}

function endPolyMode() {
  L.polygon(points).addTo(map);
  map.off('click', addPoint);

  var polydata = "[\n";
  for (var i = 0; i < points.length; ++i) {
    polydata += '\t['+points[i].lat+', '+points[i].lng+'],\n';
  }
  polydata += "]";

  $('body').append('<pre id="polydata">'+polydata+'</pre>');
  $('#polydata').dialog({title: 'Send this to Justin with the name of the landmark!', width: "50%", close: function() {$('#polydata').remove();} });
  console.log(polydata);

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

// Enable layers
var churchPolys = []
function toggleChurchLayer() {
  if (churchPolys.length == 0) {
    for (var i = 0; i < demolishedChurchColors.length; ++i) {
      var churchColor = demolishedChurchColors[i];
      var church = findData(demolishedChurches, churchColor[0]);
      var newPoly = L.polygon(churchColor.slice(1), {color: 'red'});
      newPoly.on('click', (function(name, loc){return function() { L.popup().setLatLng(loc).setContent(name).openOn(map); }})(churchColor[0], church[1]));
      newPoly.on('dblclick', (function (loc) {return function() {map.setLatLng(loc).setZoom(8);}})(church[1]));
      newPoly.addTo(map);
      churchPolys.push(newPoly);
    }
  }
  else {
    for (var i = 0; i < demolishedChurchColors.length; ++i) {
      map.removeLayer(churchPolys[i]);
    }

    churchPolys = [];
  }
}

var bridgePolys = [];
function toggleBridgeLayer() {
  if (bridgePolys.length == 0) {
    for (var i = 0; i < bridgeColors.length; ++i) {
      var newPoly = L.polygon(bridgeColors[i].slice(1))
      newPoly.addTo(map);
      bridgePolys.push(newPoly);
    }
  }
  else {
    for (var i = 0; i < bridgeColors.length; ++i) {
      map.removeLayer(bridgePolys[i]);
    }

    bridgePolys = [];
  }
}

// UTIL
function record(name) {
    console.log('["' + name + '", [' + map.getCenter().lat + ', ' + map.getCenter().lng + '], ' + map.getZoom() + ']');
}
