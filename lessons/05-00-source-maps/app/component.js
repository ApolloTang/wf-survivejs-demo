var styles = require('./main.css');

module.exports = function() {
    var element = document.createElement('button');

    element.innerHTML = 'button 1';
    element.className = styles.redButton;
    console.log(styles.redButton)
    return element;
}
