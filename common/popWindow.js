// handle contitional link on popus opened by outside sites
// variable used in all popups
var isOpenedByNon1704 = false;
if (opener == null) {
    this.isOpenedByNon1704 = true;
} else if (!opener.openedBy1704) { // opened by outside js
    // alert("not opened by 1704");
    this.isOpenedByNon1704 = true;
}
// to be deleted
var appRoot = "notSetYet";
// set appRoot here so we don't need jps in this js
function setAppRoot(appRoot) {
    this.appRoot = appRoot;
}

function openFocus() {
    window.focus();
}

// called by all links to people, artifacts, background, maps, glossary 
var openedBy1704 = true;
function openLink(linkType, shortName, anchorName) {
    // xsl has to have same name as linkType
    var width = 600;
    var height = 500;
    if (linkType == "glossary") {
        width = 350; height = 300;
    } else if (linkType == "footnotes") {
        width = 440; height = 300;
    } else if (linkType == "scene_preview") {
        width = 800; height = 600;
    } else if (linkType == "maps") {
        width = 600; height = 440;
    } else if (linkType == "artifacts") {
        width = 800; height = 600;
    }
    var linkUrl = "/popups/" + linkType + "/" + shortName + ".html";
    // TEMPORARILY DISABLED FOR SCRAPING - re-enable after capture
    if (anchorName && anchorName.length > 0) {
        linkUrl += "#" + anchorName;
    }

    var win = window.open(linkUrl, linkType,
      "scrollbars=yes,resizable=yes,width=" +
      width + ",height=" + height +
      ",location=yes,status=yes");
    win.focus();
}

function openWin(linkType) {
    // xsl has to have same name as linkType
    var width = 600;
    var height = 500;
    if (linkType == "glossary") {
        width = 350; height = 300;
    } else if (linkType == "footnotes") {
        width = 440; height = 300;
    } else if (linkType == "scene_preview") {
        width = 800; height = 600;
    } else if (linkType == "maps") {
        width = 600; height = 440;
    }
    var linkUrl = "_blank";

	window.open("", linkType,
                "scrollbars=yes,resizable=yes,width=" +
                width + ",height=" + height +
                ",location=yes,status=yes"); 
}

// called by links to full pages: glossary list, bibliography, artifacts menu
function openList(listType, sublist) {
   if (listType == "biblio") {
       location = "/servlet/list?listType=biblio&sublist=";
   }
}
// called by scene enlarge
function openSimpleWindow(linkType,url, target) {
    var width = 600;
    var height = 500;
    if (linkType == "enlarge") {
        width = 1000; height = 576;
    } else if (linkType == "editref") {
        width = 350; height = 350;
    } else if (linkType == "maps") {
        width = 600; height = 440;
    }
	window.open(url, target,
	"scrollbars=yes,resizable=yes,menubar=yes,location=yes,status=yes,width=" +
                width + ",height=" + height);        
}

// called by trackers
function openEdit(action, id, docid, bibType) {
    var width = 560;
    var height = 500;
	window.open("/servlet/docControl?action=" + action + 
                "&id=" + id +  
                "&docid=" + docid +
                "&bibType=" + bibType , 
                "edit",
	"scrollbars=yes,resizable=yes,menubar=yes,location=yes,status=yes,toolbar=yes," +
                "width=" + width + ",height=" + height);     
}

function changePage(event, shortName, pageName) {
  // prevent default behavior
  event.preventDefault();
  
  // Access the global viewer instance
  if (typeof viewer !== 'undefined' && viewer) {
    // Map page names to anchor names for the IIIF URL
    var suffix;
    
    // Check if this is the first page (empty string or special marker)
    if (pageName === '' || pageName === '_first') {
      suffix = ''; // No suffix for the first page
    }
    // Check if pageName is a number
    else if (!isNaN(pageName) && !isNaN(parseFloat(pageName))) {
      // Pad the page number to 3 digits (e.g., '1' -> '001', '12' -> '012')
      suffix = '_p' + pageName.padStart(3, '0');
    } else {
      // Use the pageName as-is for non-numeric values
      suffix = '_' + pageName;
    }
    
    // Construct the new IIIF tile source URL
    var newTileSource = 'https://img.americancenturies.org/iiif/3/sof|' + 
                        shortName + suffix + '.jp2/info.json';
    
    // Open the new tile source in the existing viewer
    viewer.open(newTileSource);
    
    // Optional: Reset zoom to initial view
    viewer.viewport.goHome();
  } else {
    console.error('OpenSeadragon viewer not found');
  }
  
  return false;
}

// generic open window - was onlin in map index.do.html
function openHelp(url) {
    window.open(url,"maps","scrollbars=yes,resizable=yes,menubar=yes,width=824,height=513");
}
