const { Triangle } = require('./shapes');

describe('Triangle', () => {
    it('should render the correct SVG string with the given color', () => {
        const shape = new Triangle();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="blue" />');
    });
});

// we use Jest test to ensure our classes and methords are working

// This test check if the render method is implemented of 'triangle'class returns expect SVG string when the color is set to blue.

// run test using "npm test"