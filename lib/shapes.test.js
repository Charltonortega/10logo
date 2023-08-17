const { Triangle, Square, Circle } = require('./shapes');

describe('Triangle', () => {
    it('should render the correct SVG string with the given color', () => {
        const shape = new Triangle();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="blue" />');
    });
});

describe('Square', () => {
    it('should render the correct SVG string with the given color', () => {
        const shape = new Square();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<rect x="50" y="50" width="200" height="100" fill="blue" />');
    });
});

describe('Circle', () => {
    it('should render the correct SVG string with the given color', () => {
        const shape = new Circle();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="90" fill="blue" />');
    });
})
// we use Jest test to ensure our classes and methords are working

// This test check if the render method is implemented of 'triangle'class returns expect SVG string when the color is set to blue.

// run test using "npm test"