var utils = require('../utils');

function BorderLayout(params) {

    var template =
        '<div style="height: 100%;">' +
        '<div id="north"></div>' +
        '<div id="centerRow" style="height: 100%; overflow: auto;">' +
        '<div id="west" style="height: 100%; float: left;"></div>' +
        '<div id="east" style="height: 100%; float: right;"></div>' +
        '<div id="center" style="height: 100%;"></div>' +
        '</div>' +
        '<div id="south"></div>' +
        '</div>';

    this.eGui = document.createElement('div');
    this.eGui.innerHTML = template;

    if (params) {
        this.setupPanels(params);
    }

    var that = this;
    setInterval(function () {
        that.doLayout();
    }, 200);
    console.warn('ag-grid: need to shut down the border layout');
}

BorderLayout.prototype.setupPanels = function(params) {

    this.eNorthWrapper = this.setupPanel(params.north, '#north');
    this.eSouthWrapper = this.setupPanel(params.south, '#south');
    this.eEastWrapper = this.setupPanel(params.east, '#east');
    this.eWestWrapper = this.setupPanel(params.west, '#west');
    this.eCenterWrapper = this.setupPanel(params.center, '#center');

    // center row is not provided by user, so we always grab this
    this.eCenterRow = this.eGui.querySelector('#centerRow');
};

BorderLayout.prototype.setupPanel = function(content, cssSelector) {
    var ePanel = this.eGui.querySelector(cssSelector);
    if (content) {
        ePanel.appendChild(content);
        return ePanel;
    } else {
        ePanel.parentNode.removeChild(ePanel);
        return  null;
    }
};

BorderLayout.prototype.getGui = function() {
    return this.eGui;
};

BorderLayout.prototype.doLayout = function() {
    this.layoutHeight();
    this.layoutWidth();
};

BorderLayout.prototype.layoutHeight = function() {
    var totalHeight = utils.offsetHeight(this.eGui);
    var northHeight = utils.offsetHeight(this.eNorthWrapper);
    var southHeight = utils.offsetHeight(this.eSouthWrapper);

    var centerHeight = totalHeight - northHeight - southHeight;
    if (centerHeight < 0) {
        centerHeight = 0;
    }

    if (centerHeight !== this.centerHeightLastTime && this.eCenterWrapper) {
        this.eCenterRow.style.height = centerHeight;
    }

    this.centerHeightLastTime = centerHeight;
};

BorderLayout.prototype.layoutWidth = function() {
    var totalWidth = utils.offsetWidth(this.eGui);
    var eastWidth = utils.offsetWidth(this.eEastWrapper);
    var westWidth = utils.offsetWidth(this.eWestWrapper);

    var centerWidth = totalWidth - eastWidth - westWidth;
    if (centerWidth < 0) {
        centerWidth = 0;
    }

    if (centerWidth !== this.centerWidthLastTime && this.eCenterWrapper) {
        this.eCenterWrapper.style.width = centerWidth;
    }

    this.centerWidthLastTime = centerWidth;
};

BorderLayout.prototype.setEastVisible = function(visible) {
    if (this.eEastWrapper) {
        this.eEastWrapper.style.display = visible ? '' : 'none';
        this.doLayout();
    }
};

module.exports = BorderLayout;