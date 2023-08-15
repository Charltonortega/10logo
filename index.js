const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Define the questions for Inquirer
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo text:',
        validate: input => input.length <= 3 || 'Please enter up to three characters only!'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (color name or hex code):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (color name or hex code):'
    }
];

inquirer.prompt(questions).then(answers => {
    let shape;
    switch (answers.shape) {
        case 'circle':
            shape = new Circle(answers.shapeColor);
            break;
        case 'triangle':
            shape = new Triangle(answers.shapeColor);
            break;
        case 'square':
            shape = new Square(answers.shapeColor);
            break;
    }

    // Generate the SVG content
    const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()}
        <text x="150" y="100" font-family="Arial" font-size="24" fill="${answers.textColor}" text-anchor="middle" dy=".3em">
            ${answers.text}
        </text>
    </svg>
    `;

    // Write the SVG content to a file
    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');
});

