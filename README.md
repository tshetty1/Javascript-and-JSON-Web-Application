# A JavaScript based Web Application to render an appropriate User Interface depending on the JSON expression.

The web application takes a *box descriptor* as an input and renders an appropriate User Interface.
The user should enter a valid JSON expression in the textarea provided.
An error message will be displayed otherwise.
A box descriptor is a JSON Object that has its first property as 'type' which determines the type of box to render.
The remaining properties depend on the type of the box.

### Box types

#### TextBox

Renders a piece of plain text.

* `"type": "TextBox"`
* `"text"`: JSON string to render

#### RowBox

Renders multiple boxes in a row, line-wrapped as necessary by the browser.

* `"type": "RowBox"`
* `"contents"`: JSON array of box descriptors except the RowBox itself.

#### StyleBox

Applies some (CSS) styling to its contents.

* `"type": "StyleBox"`
* `"content"`: JSON box descriptor of the styled content
* `"style"`: JSON object with the following properties:
    * `"fontFamily"`: string
    * `"fontSize"`: number (font size in CSS `px`)

#### TogglerButtonBox

Renders a button that, when clicked, replaces itself with some other content.

* `"type": "TogglerButtonBox"`
* `"content"`: JSON box descriptor of the content to render within the button
* `"replacementContent"`: JSON box descriptor of the content to replace the button with when clicked

#### CheckboxBox

Renders a checkbox that reflects the value of a named boolean *dynamic variable*. Dynamic variables are global throughout the application. Checkboxes can reference the same dynamic variable, in which case changing one should update all others. The default value should be `false` (unchecked).

* `"type": "CheckboxBox"`
* `"dynamicVariable"`: string

#### PaneSelectorBox

Renders one of two boxes depending on a dynamic variable (which could be changed via a `CheckboxBox`).

* `"type": "PaneSelectorBox"`
* `"dynamicVariable"`: string
* `"contentTrue"`: JSON box descriptor of the content to render in case the value of the dynamic variable is `true`
* `"contentFalse"`: JSON box descriptor of the content to render in case the value of the dynamic variable is `false`

### Code Implementation

* The Application consists of an HTML file(index.html), a JavaScript file (myscript.js) and a css file(styling.css) for styling.
* The html file consists of TextArea, button and the required div's.
* The JavaScript file consits of various functions.
  1. CallMethod() :  This function is called on the button click after entering text in the TextArea. It checks if the entered expression in the TextArea is a valid JSON expression. Else, displays an error message.
  2. funcTypeOfJSON(object): This function determines the type of JSON for the given JSON expression.
  3. funcJSONInput(input): This function checks if the entered JSON expression is an Object or Array.
  4. funcJSONObject(object): This function checks if the JSON Object has a 'type' property. If yes, it checks the type and calls the corresponding function of the Box. Else, displays appropriate message.
  5. funcTextBox(object): This function is used to create a TextBox based on the JSON Object given as input.
  6. funcTogglerButtonBox(object): This function is used to create a TogglerButtonBox based on the JSON Object given as input.
  7. funcButtonClick(): This function is called when a TogglerButton is clicked.
  8. funcCheckboxBox(object): This function is used to create a CheckboxBox based on the JSON Object given as input.
  9. funcCheckboxBoxOfRowBox(object): This function is used to create a CheckboxBox inside a RowBox based on the JSON Object given as input.
  10. checkBoxChanged(): This function is called when the CheckBox is clicked.
  11. checkBoxOfStyleBoxChanged(): This function is called when the CheckBox in the RowBox is clicked.
  12. funcPaneSelectorBox(object): This function is used to create a PaneSelectorBox based on the JSON Object given as input.
  13. funcStyleBox(object): This function is used to create a StyleBox based on the JSON Object given as input.
  14. funcRowBox(object): This function is used to create a RowBox based on the JSON Object given as input.
* The CSS file consists of all the styling that is implemented for the application.


### How to use it

* Afer saving all the 3 files in an IDE(such as Eclipse IDE), run the index.html file.
* A TextArea and a Button will be displayed.
* Enter a valid JSON expression and click the button. If not valid, an error message will be displayed.
* The entered JSON expression should be a object with the 'type' property(This property should be one of the Boxes defined above). Else, appropriate message is displayed.
* Depending on the type, corresponding UI is displayed below.

### Example Inputs

#### Simple piece of text

    {
        "type": "TextBox",
        "text": "Hello world"
    }

#### Row with some styled text

    {
        "type": "RowBox",
        "contents": [
            {
                "type": "TextBox",
                "text": "Regular"
            },
            {
                "type": "StyleBox",
                "content": {
                    "type": "TextBox",
                    "text": "Large"
                },
                "style": {
                    "fontFamily": "Arial",
                    "fontSize": 36
                }
            }
        ]
    }
    
#### Button that replaces itself with text when clicked

		{
			"type": "TogglerButtonBox",
			"content": {
				"type": "TextBox",
				"text": "Click me to replace me"
			},
			"replacementContent": {
				"type": "TextBox",
				"text": "I've replaced the button"
			}
		}
    
#### Checkbox controlling other content

    {
        "type": "RowBox",
			"contents": [
				{
					"type": "CheckboxBox",
					"dynamicVariable": "x"
				},
				{
					"type": "PaneSelectorBox",
					"dynamicVariable": "x",
					"contentTrue": {
						"type": "TextBox",
						"text": "x is true"
					},
					"contentFalse": {
						"type": "TextBox",
						"text": "x is false"
					}
				}
			] 
    }


#### Link to run the program

http://htmlpreview.github.io/?https://github.com/tshetty1/Javascript-and-JSON-Web-Application/blob/master/index.html
