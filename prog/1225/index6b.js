/**
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code12256b = {};

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code12256b.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code12256b.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code12256b.loadBlocks = function(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code12256b.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code12256b.workspace);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code12256b.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code12256b.importPrettify = function() {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '../blockly/local/prettify.css');
  document.head.appendChild(link);
  var script = document.createElement('script');
  script.setAttribute('src', '../blockly/local/prettify.js');
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code12256b.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code12256b.LANG = 'sl';

/**
 * List of tab names.
 * @private
 */
Code12256b.TABS_ = ['blocks', 'python'];

Code12256b.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code12256b.tabClick = function(clickedName) {
  if (document.getElementById('tab2_blocks').className == 'tabon') {
    Code12256b.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code12256b.TABS_.length; i++) {
    var name = Code12256b.TABS_[i];
    document.getElementById('tab2_' + name).className = 'taboff';
    document.getElementById('content2_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code12256b.selected = clickedName;
  document.getElementById('tab2_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content2_' + clickedName).style.visibility =
      'visible';
  Code12256b.renderContent();
  if (clickedName == 'blocks') {
    Code12256b.workspace.setVisible(true);
  }
  Blockly.svgResize(Code12256b.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code12256b.renderContent = function() {
  var content = document.getElementById('content2_' + Code12256b.selected);
  // Initialize the pane.
  if (content.id == 'content2_python') {
    var code = Blockly.Python.workspaceToCode(Code12256b.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'py');
      content.innerHTML = code;
    }
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code12256b.init = function() {
  Code12256b.initLanguage();

  var container = document.getElementById('content2_area');
  var onresize = function(e) {
    var bBox = Code12256b.getBBox_(container);
    for (var i = 0; i < Code12256b.TABS_.length; i++) {
      var el = document.getElementById('content2_' + Code12256b.TABS_[i]);
      el.style.top = bBox.y + 'px!important';
      el.style.left = bBox.x + 'px!important';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px!important';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px!important';
      el.style.width = bBox.width + 'px!important';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px!important';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Code12256b.workspace && Code12256b.workspace.toolbox_.width) {
      document.getElementById('tab2_blocks').style.minWidth =
          (Code12256b.workspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  // Interpolate translated messages into toolbox.
  var toolboxText = document.getElementById('toolbox2').outerHTML;
  toolboxText = toolboxText.replace(/{(\w+)}/g,
      function(m, p1) {return MSG[p1]});
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);

  Code12256b.workspace = Blockly.inject('content2_blocks',
      {grid:
          {spacing: 15,
           length: 0,
           colour: '#ccc',
           snap: true},
       media: '../blockly/media/',
	   oneBasedIndex: false,
       toolbox: toolboxXml,
       zoom:
           {controls: true,
            wheel: true}
      });

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code12256b.workspace);
  }

  Code12256b.tabClick(Code12256b.selected);

  Code12256b.bindClick('trashButton2',
      function() {Code12256b.discard(); Code12256b.renderContent();});
  Code12256b.bindClick('runButton2', Code12256b.runJS);

  // Load workspace initial content
  Blockly.Xml.domToWorkspace(document.getElementById('workspace2'), Code12256b.workspace);

  for (var i = 0; i < Code12256b.TABS_.length; i++) {
    var name = Code12256b.TABS_[i];
    Code12256b.bindClick('tab2_' + name,
        function(name_) {return function() {Code12256b.tabClick(name_);};}(name));
  }
  onresize();
  Blockly.svgResize(Code12256b.workspace);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(Code12256b.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code12256b.initLanguage = function() {
  // Set the HTML's language and direction.
  document.dir = 'ltr';
  document.head.parentElement.setAttribute('lang', Code12256b.LANG);

  // Inject language strings.
  document.getElementById('tab2_blocks').textContent = MSG['blocks'];
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code12256b.runJS = function() {
  $('#output2').html(''); // Erase content of the output
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw MSG['timeout'];
    }
  };
  var code = Blockly.JavaScript.workspaceToCode(Code12256b.workspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(MSG['badCode'].replace('%1', e));
  }
};

/**
 * Discard all blocks from the workspace.
 */
Code12256b.discard = function() {
  $('#output2').html(''); // Erase content of the output
  Code12256b.workspace.clear();
  window.location.hash = '';

  // Load workspace initial content
  Blockly.Xml.domToWorkspace(document.getElementById('workspace2'), Code12256b.workspace);
};

// Load the Code demo's language strings.
document.write('<script src="../blockly/local/msg/' + Code12256b.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="../blockly/msg/js/' + Code12256b.LANG + '.js"></script>\n');
window.addEventListener('load', Code12256b.init);
