class Shape { // Parent class to other shapes utilised. 
    constructor(color = 'black') { // The constructor method initializes the Shape with a color. 
        this.color = color;
    }
    // setColor(color): This is a simple method to set the color of the shape.
    setColor(color) {
        this.color = color; //
    }
    
    render() { 
        // This method will be overridden by child classes.
        throw new Error('The render method should be implemented by child classes.');
    }
}
// we created a parent 'shape' class to provide common functionailites for all shapes.

// //constructor(color = 'black'): The constructor method initializes the Shape with a color. If no color is provided, it defaults to 'black'.

// setColor(color): This is a simple method to set the color of the shape.

// render(): This method is a placeholder. It is expected that each specific shape class (like Triangle) will provide its own implementation of this method. If a child class doesn't override this method, it will throw an error.

module.exports = { Shape };
//It uses extends to inherit properties and methods from the parent Shape class.
// The render() method in each specific shape class provides the SVG string for that shape, using the shape's color.

class Triangle extends Shape {
    render() {
        return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
    }
}

class Circle extends Shape {
    render() {
        return `<circle cx="150" cy="100" r="90" fill="${this.color}" />`;
    }
}

class Square extends Shape { 
    render() {
        return `<rect x="50" y="50" width="200" height="100" fill="${this.color}" />`;
    }
}

class Ellipse extends Shape {
    render() {
        return `<ellipse cx="150" cy="100" rx="100" ry="60" fill="${this.color}" />`;
    }
}
// additional shapes 
class Pentagon extends Shape { 
    render() {
        return `<polygon points="150,25 190,85 175,160 125,160 110,85" fill="${this.color}" />`;
    }
}

class Hexagon extends Shape {
    render() {
        return `<polygon points="150,10 190,60 190,140 150,190 110,140 110,60" fill="${this.color}" />`;
    }
}


module.exports = { Shape, Triangle, Circle, Square, Ellipse, Pentagon, Hexagon }; // Export the classes

