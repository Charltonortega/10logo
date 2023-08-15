const inquirer = require('inquirer');
const fs = require('fs');
const {triangle, Circle, Square} = require('./shapes');

const question = [
    {
        type: 'input',
        name: 'color',
        message: 'Enter up to three characters for the logo text:'
        validate: input => input.length <= 3 || 'Please enter up to three characters only!'
    },
    {
        type: 'input',
        name: 'textColor'
        message: 'Enter the text color (color name or hex code)'
    },
]: