const inquirer = require('inquirer'); // Import the inquirer, 8.2.4 for current work.
const fs = require('fs'); // Import the file system
const { Triangle, Circle, Square, Ellipse, Pentagon, Hexagon } = require('./lib/shapes'); // Import the shapes for the logo
const open = require('open');// Import the open module
const path = require('path');// Import the path for file save
const cssColorNames = require('css-color-names'); // Import the css color names for color validation

function isValidColor(input) {
    // Check if it's a valid hex code 
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input)) return true; // if it's a valid hex code return true
    
    // Check if it's a valid named color
    if (cssColorNames[input.toLowerCase()]) return true; // if it's a valid named color return true

    return false;  // if not, return false until user corrects input
}

// Define the questions for Inquirer
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo text:',
        validate: input => input.length <= 3 || 'Please enter up to three characters only!' // Check if the input is less than or equal to 3
    },
    {
        type: 'list',
        name: 'font',
        message: 'Choose a font for the text:',
        choices: ['Arial', 'Times New Roman', 'Courier New'] // List of fonts
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (color name or hex code):',
        validate: input => isValidColor(input) || 'Please enter a valid color name or hex code!' // Check if the input is a valid color
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Triangle', 'Square', 'Circle', 'Ellipse','Pentagon','Hexagon', ] // List of shapes
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (color name or hex code):',
        validate: input => isValidColor(input) || 'Please enter a valid color name or hex code!'// Check if the input is a valid color
    },
    {
        type: 'input',
        name: 'filename',
        message: 'Enter a name for the logo file (without extension):',
        default: 'logo',
        validate: input => input.length > 0 || 'Filename cannot be empty!' // Check if the input is not empty
    }
];

// Main function using inquirer to prompt the user
inquirer.prompt(questions).then(answers => {
    let shape;
    
    // Determine the shape based on user input 
    switch (answers.shape) { // Switch statement, depending on user input will determine which shape
        case 'Circle':
            shape = new Circle(answers.shapeColor); 
            break; 
        case 'Triangle':
            shape = new Triangle(answers.shapeColor);
            break; 
        case 'Square':
            shape = new Square(answers.shapeColor);
            break;
        case 'Ellipse':
            shape = new Ellipse(answers.shapeColor);
            break;
        case 'Pentagon':
            shape = new Pentagon(answers.shapeColor);
            break;
        case 'Hexagon':
            shape = new Hexagon(answers.shapeColor);
            break;
    }

    // Generate the SVG content with the chosen shape and text
    const svgContent = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()} 
        <text x="150" y="100" font-family="${answers.font}" font-size="5em" fill="${answers.textColor}" text-anchor="middle" dy=".3em">
        ${answers.text} 
    </text>
    </svg>
    `;

    // Define the output path for the SVG file
    const outputPath = path.join(__dirname, 'examples', `${answers.filename}.svg`); // Join the path and filename

    // Check if a file with the provided name already exists and handle accordingly
    if (fs.existsSync(outputPath)) {
        console.error('A file with this name already exists. Choose a different name.');
        ;

    } else {
        // Write the SVG content to the file
        fs.writeFileSync(outputPath, svgContent);
        console.log(`Generated ${answers.filename}.svg in the examples folder.`);
        
        // Preview the generated SVG
        open(outputPath);
    }
});