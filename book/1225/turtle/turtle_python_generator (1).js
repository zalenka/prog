Blockly.Python['turtle_move'] = function(block) {
  var dropdown_dir = block.getFieldValue('DIR');
  var value_move = Blockly.Python.valueToCode(block, 'MOVE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_turn'] = function(block) {
  var dropdown_dir = block.getFieldValue('DIR');
  var value_turn = Blockly.Python.valueToCode(block, 'TURN', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_width'] = function(block) {
  var value_width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_pen'] = function(block) {
  var dropdown_pen = block.getFieldValue('PEN');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_show'] = function(block) {
  var dropdown_showhide = block.getFieldValue('SHOWHIDE');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_shape'] = function(block) {
  var dropdown_shape = block.getFieldValue('SHAPE');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_setpos'] = function(block) {
  var number_posx = block.getFieldValue('POSX');
  var number_posy = block.getFieldValue('POSY');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_color'] = function(block) {
  var colour_color = block.getFieldValue('COLOR');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_circle'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtl_arc'] = function(block) {
  var number_radius = block.getFieldValue('RADIUS');
  var angle_angle = block.getFieldValue('ANGLE');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_write'] = function(block) {
  var value_write = Blockly.Python.valueToCode(block, 'WRITE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['turtle_pos'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['turtle_isdown'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['turtle_reset'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};