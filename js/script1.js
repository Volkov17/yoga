'use strict';

class Options {
    constructor(height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign; 
    };

    createDiv() {

        let div = document.createElement('div');
        document.body.appendChild(div);
        let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
		div.style.cssText = param;
    }
}

let newOne = new Options(300, 350, "red", 14, "center");
newOne.createDiv();



