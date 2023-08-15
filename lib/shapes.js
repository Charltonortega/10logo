class Shape {
    constructor(color = 'black') {
        this.color = color;
    }

    setColor(color) {
        this.color = color;
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

class Triangle extends Shape {
    render() {
        return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
    }
}


//It uses extends to inherit properties and methods from the parent Shape class.

// The render() method in each specific shape class provides the SVG string for that shape, using the shape's color.

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

module.exports = { Shape, Triangle, Circle, Square };

