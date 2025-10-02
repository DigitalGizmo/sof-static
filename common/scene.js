// Vanilla JavaScript for links in tab text
// @click doesn't work in dynamically added content
document.addEventListener('click', function (event) {
  if (!event.target.matches('.open-link')) return;
  event.preventDefault();
  // Log the clicked element in the console
  const hrefs = event.target.getAttribute('href').split("/");
  // console.log("- hrefs[0]: " + hrefs[0]);
  // Forward
  // openLink(linkType, shortName, anchorName)
  openLink(hrefs[0], hrefs[1], hrefs[2])
}, false);

// Scene Vue app
var sceneApp = new Vue({
  el: '#scene-app',
  data: {
    scene: scene,
    tabIndex: 0,
    tabName: 'Overview',
    tabTexts: tabTexts,
    tabTitles: ['Overview', 'English Perspective', 'French Perspective', 
      'Kanienkehaka Perspective', 'Wendat Perspective', 'W&ocirc;banaki Perspective'],
    tabHovers: [false, false, false, false, false, false],
    rollTexts: rollTexts,
    rollName: 'none',
    rollText: 'Hover or tap to explore the image above.',
    rollLinks: rollLinks,
    // rollJustShown: 'noneYet',
    related: related,
    outlinesOn: false,
    outlineHover: false,
    outlineToolTips: ['Show all hot spots in picture',
      'Remove hotspot outlines'],
    iconHover: false,
    relatedUp: [false, false, false, false],
    relatedMenuTitles: ['People', 'Artifacts', 'Explanations', 'Maps'],
    relatedMenuKeys: ['people', 'artifacts', 'background', 'maps'],
  },
  // created () {
  //   this.tabText = tabTexts[this.tabName]
  // },
  methods: {
    // -------------- TABS ----------------
    showTab: function(_tabIndex) {
      // console.log(' -- showPop')
      // Only if enabled
      if (this.scene.tabs[_tabIndex].enabled) {
        this.tabIndex = _tabIndex
        this.tabName = this.scene.tabs[_tabIndex].tabName
        // this.tabText = tabTexts[this.tabName]
      }
    },
    // Determine tab state
    getTabSuffix: function(_tabIndex) {
      if (scene.tabs[_tabIndex].enabled) { // is enabled
        if (_tabIndex === this.tabIndex) { // tab selected
          return '_f4'
        } else { // enabled, but not selected
          if (this.tabHovers[_tabIndex]) { // hovering
            return '_f3'
          } else { // not hovering
            return '_f2'
          }
        }
      } else { // tab with this index not enabled
        return '_f5'
      }
    },
    // Lose pointer over diabled tabs
    cursorState: function(_tabIndex) {
      if (this.scene.tabs[_tabIndex].enabled) {
        if (_tabIndex === this.tabIndex) { // no pointer for current
          return "no-pointer"
        } else {
          return "pointer"
        }
      } else { // disabled
        return "no-pointer"
      }
    },
    getTabState: function(_tabIndex) {
      if (_tabIndex === this.tabIndex) {
        return "tab-selected"
      } else { // disabled
        return "tab"
      }
    },
    hoverTab: function(_tabIndex) {
      // console.log(" - hovering over: " + _tabIndex)
      this.tabHovers[_tabIndex] = true
      sceneApp.$forceUpdate();
    },
    unHoverTab: function(_tabIndex) {
      this.tabHovers[_tabIndex] = false
      sceneApp.$forceUpdate();
    },
    tabAbbr: function (_tabName) {
      return _tabName.substring(0, 3)
    },
    // ----- HOT SPOTS -------------------
    // Simplified hover function - shows preview text only 2025-09-26
    showPop: function(_rollName) {
      this.rollName = _rollName
      this.rollText = this.rollTexts[_rollName]
    },

    // Simplified click function - directly opens link
    showRollLink: function(_rollName) {
      // Always open the link immediately on click/tap
      // Data format: rollLinks[rollName] = [linkType, shortName, anchorName]
      openLink(this.rollLinks[_rollName][0], 
        this.rollLinks[_rollName][1], 
        this.rollLinks[_rollName][2])  
    },

    hidePop: function() {
      this.rollText = ''
      this.rollName = 'none'
    },

    // ------ OUTLINE AND LARGER BUTTONS ---------
    toggleOutlines: function() {
      if (this.outlinesOn) { // They're on
        this.outlinesOn = false
      } else { // They're off
        this.outlinesOn = true
      }
      sceneApp.$forceUpdate();
    },
    // ------- RELATED LINKS -------------
    toggleRelated: function(relatedIndex) {
      if (this.relatedUp[relatedIndex]) { // this one is on
        this.relatedUp[relatedIndex] = false
      } else { // we're turning this one on
        this.closeAllRelated()
        this.relatedUp[relatedIndex] = true  
      }
      sceneApp.$forceUpdate();
    },
    closeAllRelated: function() {
      console.log(" -- closing AllRelated")
      // Use ES5 for-loop -- prob to retain "this"
      for (let i = 0; i < this.relatedUp.length; i++) {
        this.relatedUp[i] = false
      }
      sceneApp.$forceUpdate();
    },
    closeRelatedIfOut: function(event) {
      // For mobile: no mouse leave so close related menu
      // unless click was on a related link.
      if (!event.target.matches('.related-link')) {
        this.closeAllRelated()
      }
    },
  },
  computed: {
    largerUrl: function() {
      return "illustrations/" + this.scene.scenewide.sceneName + ".html"
    },
    outlineSuffix: function() {
      if (this.outlineHover) {
        // console.log(" -- suffix should be selected")
        return '_f3'
      } else {
        if (this.outlinesOn) {
          return '_f4'
        } else {
          return '_f2'
        }
      }
    },
    outlineToolTip: function() {
      // If on, show "Remove" msg, if off, show "Show" msg.
      return (this.outlinesOn ? this.outlineToolTips[1] :
        this.outlineToolTips[0])
    },
    iconSuffix: function() {
      return (this.iconHover ? '_f3' : '_f2')
    }
  }
});
