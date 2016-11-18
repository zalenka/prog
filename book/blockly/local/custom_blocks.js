/**
 * Custom block definitions
 */
Blockly.Blocks.math_floor_division = {
    init: function() {
        this.jsonInit({
            message0: "celoštevilski rezultat pri %1 ÷ %2",
            args0: [{
                type: "input_value",
                name: "DIVIDEND",
                check: "Number"
            }, {
                type: "input_value",
                name: "DIVISOR",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: "Vrne celoštevilski rezultat pri deljenju dveh števil.",
            helpUrl: "https://en.wikipedia.org/wiki/Modulo_operation"
        })
    }
};

Blockly.Blocks.text_comment = {
    init: function() {
        this.jsonInit({
            message0: "komentiraj %1",
            args0: [{
                type: "input_value",
                name: "TEXT",
				check: "String"
            }],
			previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.texts.HUE,
            tooltip: "Izpiše komentar kode.",
            helpUrl: ""
        })
    }
};

/**
 * Custom block generator functions
 */
Blockly.JavaScript.math_floor_division = function(a) {
    var b = Blockly.JavaScript.valueToCode(a, "DIVIDEND", Blockly.JavaScript.ORDER_MODULUS) || "0";
    a = Blockly.JavaScript.valueToCode(a, "DIVISOR", Blockly.JavaScript.ORDER_MODULUS) || "0";
    return ["Math.floor(" + b + " / " + a + ")", Blockly.JavaScript.ORDER_MODULUS]
};
Blockly.Python.math_floor_division = function(a) {
    var b = Blockly.Python.valueToCode(a, "DIVIDEND", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    a = Blockly.Python.valueToCode(a, "DIVISOR", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    return [b + " // " + a, Blockly.Python.ORDER_MULTIPLICATIVE]
};

Blockly.JavaScript.text_comment = function(a) {
    var str = Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE);
    return "// " + str.substr(1, str.length-2) + "\n"
    //return "// " + (Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE)) + "\n"
};
Blockly.Python.text_comment = function(a) {
    var str = Blockly.Python.valueToCode(a, "TEXT", Blockly.Python.ORDER_NONE);
    return "# " + str.substr(1, str.length-2) + "\n"
    //return "# " + (Blockly.Python.valueToCode(a, "TEXT", Blockly.Python.ORDER_NONE)) + "\n"
};
