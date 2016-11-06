// var styles = require('./main.css');

module.exports = function() {
    var element = document.createElement('button');
    element.innerHTML = 'red button';

    // element.className = styles.redButton;
    element.className = 'redButton';
    return element;
}
