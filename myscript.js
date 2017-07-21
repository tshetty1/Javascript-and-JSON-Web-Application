/* @author Triveni Shetty */

var dynamicVariable = false;
var contentTrueText = "";
var contentFalseText = "";
var dynamicObject;
var objectConstructor = {}.constructor;
var arrayConstructor = [].constructor;
var input;
var textBoxCount = 0;
var togglerbuttoncount = 0;
var checkboxcount = 0;
var paneselectorboxcount = 0;

/*
 * This function is called on the button click after entering text in the
 * TextArea. It checks if the entered expression in the TextArea is a valid JSON
 * expression. Else, displays an error message.
 */
function CallMethod() {
	var string = document.getElementById("textArea").value.trim();
	try {
		input = JSON.parse(string);
	} catch (err) {
		document.getElementById("main").innerHTML = "";
		document.getElementById("error").innerHTML = "Invalid JSON. Please enter a valid JSON expression.";
	}

	funcJSONInput(input);
}

/* This function determines the type of JSON for the given JSON expression. */
function funcTypeOfJSON(object) {
	if (object.constructor === arrayConstructor) {
		return "Array";
	} else if (object.constructor === objectConstructor) {
		return "Object";
	}
}

/* This function checks if the entered JSON expression is an Object or Array. */
function funcJSONInput(input) {
	if (funcTypeOfJSON(input) == "Array") {
		document.getElementById("main").innerHTML = "";
		document.getElementById("error").innerHTML = "You've entered a JSON Array. Please enter a JSON Object.";
	} else if (funcTypeOfJSON(input) == "Object") {
		funcJSONObject(input);
	}
}

/*
 * This function checks if the JSON Object has a 'type' property. If yes, it
 * checks the type and calls the corresponding function of the Box. Else,
 * displays appropriate message.
 */
function funcJSONObject(object) {
	document.getElementById("error").innerHTML = "";
	if (!object.hasOwnProperty('type')) {
		document.getElementById("main").innerHTML = "";
		document.getElementById("error").innerHTML = "Please enter the type of Box to be rendered.";
	} else {
		document.getElementById("main").innerHTML = "";
		switch (object.type) {
		case "TextBox":
			funcTextBox(object);
			break;
		case "RowBox":
			funcRowBox(object);
			break;
		case "TogglerButtonBox":
			funcTogglerButtonBox(object);
			break;
		case "StyleBox":
			funcStyleBox(object);
			break;
		case "CheckboxBox":
			funcCheckboxBox(object);
			break;
		case "PaneSelectorBox":
			funcPaneSelectorBox(object);
			break;
		default:
			document.getElementById("main").innerHTML = "";
			document.getElementById("error").innerHTML = "The Type should be either TextBox, RowBox, TogglerButtonBox, StyleBox, CheckboxBox or PaneSelectorBox.";
			break;
		}
	}

}

/*
 * This function is used to create a TextBox based on the JSON Object given as
 * input.
 */
function funcTextBox(object) {
	textBoxCount = textBoxCount + 1;
	var div = document.createElement('DIV');
	div.setAttribute("name", "textboxdiv");
	div.setAttribute("id", "textboxdiv");
	div.innerHTML = '<input type="text" name="inputtext" id="inputtext'
			+ textBoxCount + '" value="' + object.text + '"> <br>';
	document.getElementById("main").appendChild(div);
	return this;
}

/*
 * This function is used to create a TogglerButtonBox based on the JSON Object
 * given as input.
 */
function funcTogglerButtonBox(object) {
	togglerbuttoncount = togglerbuttoncount + 1;
	var div = document.createElement('DIV');
	div.setAttribute("name", "togglerbuttonboxDiv");
	div.setAttribute("id", "togglerbuttonboxDiv");
	div.innerHTML = '<button name="togglerbutton" id="togglerbutton'
			+ togglerbuttoncount + '">' + object.content.text + '</button>';
	document.getElementById("main").appendChild(div);
	dynamicObject = object.replacementContent.text;
	var button = document.getElementById("togglerbutton" + togglerbuttoncount);
	button.onclick = funcButtonClick;
	return this;
}

/* This function is called when a TogglerButton is clicked. */
function funcButtonClick() {
	document.getElementById("togglerbutton" + togglerbuttoncount).innerHTML = dynamicObject;
}

/*
 * This function is used to create a CheckboxBox based on the JSON Object given
 * as input.
 */
function funcCheckboxBox(object) {
	checkboxcount = checkboxcount + 1;
	var div = document.createElement('DIV');
	div.setAttribute("name", "checkboxboxdiv");
	div.setAttribute("id", "checkboxboxdiv");
	if (dynamicVariable) {
		div.innerHTML = '<input type = "checkbox" name="checkboxname" id="checkboxname'
				+ checkboxcount + '" checked>' + object.dynamicVariable;
		document.getElementById("main").appendChild(div);
	} else if (!dynamicVariable) {
		div.innerHTML = '<input type = "checkbox" name="checkboxname" id="checkboxname'
				+ checkboxcount + '"/>' + object.dynamicVariable;
		document.getElementById("main").appendChild(div);
	}
	var checkbox = document.getElementById("checkboxname" + checkboxcount);
	checkbox.onclick = checkBoxChanged;
	return this;
}

/*
 * This function is used to create a CheckboxBox inside a RowBox based on the
 * JSON Object given as input.
 */
function funcCheckboxBoxOfRowBox(object) {
	var div = document.createElement('DIV');
	div.setAttribute("name", "checkboxboxdiv1");
	div.setAttribute("id", "checkboxboxdiv1");
	if (dynamicVariable) {
		div.innerHTML = '<input type = "checkbox" name="checkboxname" id="checkboxname" checked>'
				+ object.dynamicVariable;
		document.getElementById("main").appendChild(div);
	} else if (!dynamicVariable) {
		div.innerHTML = '<input type = "checkbox" name="checkboxname" id="checkboxname"/>'
				+ object.dynamicVariable;
		document.getElementById("main").appendChild(div);
	}
	var checkbox = document.getElementById("checkboxname");
	checkbox.onclick = checkBoxOfStyleBoxChanged;
	return this;
}

/* This function is called when the CheckBox is clicked. */
function checkBoxChanged() {
	if (document.getElementById("checkboxname" + checkboxcount).checked) {
		dynamicVariable = true;
	} else {
		dynamicVariable = false;
	}
}

/* This function is called when the CheckBox in the RowBox is clicked. */
function checkBoxOfStyleBoxChanged() {
	if (document.getElementById("checkboxname").checked) {
		dynamicVariable = true;
	} else {
		dynamicVariable = false;
	}
	if (dynamicVariable) {
		document.getElementById("paneselectorbox" + paneselectorboxcount).value = contentTrueText;
	} else if (!dynamicVariable) {
		document.getElementById("paneselectorbox" + paneselectorboxcount).value = contentFalseText;
	}
}

/*
 * This function is used to create a PaneSelectorBox based on the JSON Object
 * given as input.
 */
function funcPaneSelectorBox(object) {
	paneselectorboxcount = paneselectorboxcount + 1;
	var div = document.createElement('DIV');
	div.setAttribute("name", "paneselectorboxdiv");
	div.setAttribute("id", "paneselectorboxdiv");
	if (dynamicVariable) {
		div.innerHTML = '<input type="text" name="paneselectorbox" id="paneselectorbox'
				+ paneselectorboxcount
				+ '" value="'
				+ object.contentTrue.text
				+ '"> <br>';
		document.getElementById("main").appendChild(div);
	} else if (!dynamicVariable) {
		div.innerHTML = '<input type="text" name="paneselectorbox" id="paneselectorbox'
				+ paneselectorboxcount
				+ '" value="'
				+ object.contentFalse.text
				+ '"> <br>';
		document.getElementById("main").appendChild(div);
	}
	return this;
}

/*
 * This function is used to create a StyleBox based on the JSON Object given as
 * input.
 */
function funcStyleBox(object) {
	var type = object.content.type;
	switch (type) {
	case "TextBox":
		funcTextBox(object.content);
		document.getElementById("inputtext" + textBoxCount).style.fontFamily = object.style.fontFamily;
		document.getElementById("inputtext" + textBoxCount).style.fontSize = object.style.fontSize
				+ 'px';
		break;
	case "TogglerButtonBox":
		funcTogglerButtonBox(object.content);
		document.getElementById("togglerbutton" + togglerbuttoncount).style.fontFamily = object.style.fontFamily;
		document.getElementById("togglerbutton" + togglerbuttoncount).style.fontSize = object.style.fontSize
				+ 'px';
		break;
	case "CheckboxBox":
		funcCheckboxBox(object.content);
		document.getElementById("checkboxlabel" + checkboxcount).style.fontFamily = object.style.fontFamily;
		document.getElementById("checkboxlabel" + checkboxcount).style.fontSize = object.style.fontSize
				+ 'px';
		break;
	case "PaneSelectorBox":
		funcPaneSelectorBox(object.content);
		document.getElementById("paneselectorbox" + paneselectorboxcount).style.fontFamily = object.style.fontFamily;
		document.getElementById("paneselectorbox" + paneselectorboxcount).style.fontSize = object.style.fontSize
				+ 'px';
		break;
	}

}

/*
 * This function is used to create a RowBox based on the JSON Object given as
 * input.
 */
function funcRowBox(object) {
	var i;
	document.getElementById("main").innerHTML = "";
	for (i = 0; i < object.contents.length; i++) {
		switch (object.contents[i].type) {
		case "TextBox":
			funcTextBox(object.contents[i]);
			break;
		case "StyleBox":
			funcStyleBox(object.contents[i]);
			break;
		case "TogglerButtonBox":
			funcTogglerButtonBox(object.contents[i]);
			break;
		case "CheckboxBox":
			funcCheckboxBoxOfRowBox(object.contents[i]);
			break;
		case "PaneSelectorBox":
			contentTrueText = object.contents[i].contentTrue.text;
			contentFalseText = object.contents[i].contentFalse.text;
			funcPaneSelectorBox(object.contents[i]);
			break;
		case "RowBox":
			funcRowBox(object.contents[i]);
			break;
		}
	}
	return this;
}
