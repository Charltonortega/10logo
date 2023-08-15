const inquirer = require('inquirer'); // Import the inquirer
const fs = require('fs'); // Import the file system
const { Triangle, Circle, Square } = require('./lib/shapes'); // Import the shapes
const open = require('open');// Import the open module
const path = require('path');

const namedColors = [
    'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
    'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 
    'silver', 'teal', 'white', 'yellow'
];

function isValidColor(input) {
    // Check if it's a valid hex code
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input)) return true;
    
    // Check if it's a valid named color
    if (namedColors.includes(input.toLowerCase())) return true;
    
    return false;  // Invalid color
}

// Define the questions for Inquirer
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo text:',
        validate: input => input.length <= 3 || 'Please enter up to three characters only!'
    },
    {
        type: 'list',
        name: 'font',
        message: 'Choose a font for the text:',
        choices: ['Arial', 'Times New Roman', 'Courier New']
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (color name or hex code):',
        validate: input => isValidColor(input) || 'Please enter a valid color name or hex code!'
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
        message: 'Enter the shape color (color name or hex code):',
        validate: input => isValidColor(input) || 'Please enter a valid color name or hex code!'
    },
    {
        type: 'input',
        name: 'filename',
        message: 'Enter a name for the logo file (without extension):',
        default: 'logo',
        validate: input => input.length > 0 || 'Filename cannot be empty!'
    }
];

// Main function using inquirer to prompt the user
inquirer.prompt(questions).then(answers => {
    let shape;
    
    // Determine the shape based on user input
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

    // Generate the SVG content with the chosen shape and text
    const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()}
        <text x="150" y="100" font-family="${answers.font}" font-size="24" fill="${answers.textColor}" text-anchor="middle" dy=".3em">
        ${answers.text}
    </text>
    </svg>
    `;

    // Define the output path for the SVG file
    const outputPath = path.join(__dirname, 'examples', `${answers.filename}.svg`);

    // Check if a file with the provided name already exists and handle accordingly
    if (fs.existsSync(outputPath)) {
        console.error('A file with this name already exists. Choose a different name.');
        return;
    }
    
    // Write the SVG content to the file
    fs.writeFileSync(outputPath, svgContent);
    console.log(`Generated ${answers.filename}.svg in the examples folder.`);
    
    // Preview the generated SVG
    open(outputPath);
});