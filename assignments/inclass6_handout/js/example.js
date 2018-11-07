// ADD NEW ITEM TO END OF LIST
var node = document.createElement('li');
var textnode = document.createTextNode('cream');
node.setAttribute('id', 'five');
node.appendChild(textnode);
var list = document.getElementsByTagName('ul')[0];
list.appendChild(node);

// ADD NEW ITEM START OF LIST
var node2 = document.createElement('li');
var textnode2 = document.createTextNode('kale');
node2.appendChild(textnode2);
node2.setAttribute('id', 'six');
node2.appendChild(textnode2);
list.insertBefore(node2, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
// document.getElementById('one').classList.add('cool');
var listItems = Array.prototype.slice.call(document.getElementsByTagName('li'));
for (var i = 0; i < listItems.length; i++) {
  document.getElementsByTagName('li')[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var numOfItems = listItems.length;
document.getElementsByTagName('h2')[0].innerHTML += '<span>' + numOfItems + '</span>';
