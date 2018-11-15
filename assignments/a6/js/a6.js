function makeTable() {
  var resultTable = document.getElementById('ghostTable');
  if (resultTable != null) resultTable.remove();

  var temp;
  var rowStart = +document.getElementById('rowStart').value;
  var rowEnd = +document.getElementById('rowEnd').value;
  var colStart = +document.getElementById('colStart').value;
  var colEnd = +document.getElementById('colEnd').value;

  var bRef = document.getElementsByTagName('body')[0];

  if (rowStart > rowEnd) {
    // document.getElementById('rowStart').setAttribute('style', 'outline-color: #FF9900');
    // document.getElementById('rowStart').setAttribute('style', 'border-color: #FF9900');
    temp = rowStart;
    rowStart = rowEnd;
    rowEnd = temp;
  }

  if (colStart > colEnd) {
    // document.getElementById('colStart').setAttribute('style', 'outline-color: #FF9900');
    // document.getElementById('colStart').setAttribute('style', 'border-color: #FF9900');
    temp = colStart;
    colStart = colEnd;
    colEnd = temp;
  }

  var crtTbl = document.createElement('table');     /*create table*/
  var crtTblBod = document.createElement('tbody');  /*create table body*/

  for (var rowFirstInt = rowStart, rowLastInt = rowEnd + 1;
  rowFirstInt <= rowLastInt; rowFirstInt++) {

    var row = document.createElement('tr');

    for (var colFirstInt = colStart, colLastInt = colEnd + 1;
      colFirstInt <= colLastInt; colFirstInt++) {
      var cell = document.createElement('td');
      var cellTxt;
      var cellStyle = 'padding: 10px; color: #FFFFFF;';

      if (rowFirstInt == rowStart && colFirstInt == colStart) {
        cellTxt = document.createTextNode('');
        cell.setAttribute('style', cellStyle + 'background-color: #FFFFFF');
      } else if (rowFirstInt == rowStart) {
        cellTxt = document.createTextNode(colFirstInt - 1);
        cell.setAttribute('style', cellStyle + 'background-color: #000000');
      } else if (colFirstInt == colStart) {
        cellTxt = document.createTextNode(rowFirstInt - 1);
        cell.setAttribute('style', cellStyle + 'background-color: #000000');
      } else {
        cellTxt = document.createTextNode((rowFirstInt - 1) * (colFirstInt - 1));
        cell.setAttribute('style', cellStyle + 'background-color: #0FF0F0');
      }

      cell.appendChild(cellTxt);
      row.appendChild(cell);
    }

    crtTblBod.appendChild(row);
  }

  crtTbl.appendChild(crtTblBod);
  bRef.appendChild(crtTbl);
  crtTbl.setAttribute('id', 'ghostTable');
}

function validateInput(fieldCheck, control, decimal) {
  var key;
  var keyChar;

  if (window.event) {
    key = window.event.keyCode;
  } else if (control) {
    key = control.which;
  } else {
    fieldCheck.setAttribute('style', 'outline-color: default');
    fieldCheck.setAttribute('style', 'border-color: default');
    return true;
  }

  keyChar = String.fromCharCode(key);

  if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27) || (key == 37) || (key == 38) || (key == 39) || (key == 40)) {
    // Check control
    if (strToInt(fieldCheck.value)) {
      fieldCheck.setAttribute('style', 'outline-color: #F6FF6F');
      fieldCheck.setAttribute('style', 'border-color: #F6FF6F');
    } else {
      fieldCheck.setAttribute('style', 'outline-color: #8A0707');
      fieldCheck.setAttribute('style', 'border-color: #8A0707');
    }

    return true;
  } else if ((('0123456789').indexOf(keyChar) > -1)) { // Check numbers
    if (strToInt(fieldCheck.value)) {
      fieldCheck.setAttribute('style', 'outline-color: #F6FF6F');
      fieldCheck.setAttribute('style', 'border-color: #F6FF6F');
    } else {
      fieldCheck.setAttribute('style', 'outline-color: #8A0707');
      fieldCheck.setAttribute('style', 'border-color: #8A0707');
    }

    return true;
  } else {
    if (isNaN(keyChar)) {
      window.alert('Not a valid input. Try again');
    }

    if (strToInt(fieldCheck.value)) {
      fieldCheck.setAttribute('style', 'outline-color: #F6FF6F');
      fieldCheck.setAttribute('style', 'border-color: #F6FF6F');
    } else {
      fieldCheck.setAttribute('style', 'outline-color: #8A0707');
      fieldCheck.setAttribute('style', 'border-color: #8A0707');
    }

    return true;
  }
}

function clearForm() {
  document.getElementById('input').reset();
}

function strToInt() {
  return /^\+?(0|[1-9]\d*)$/.test(string);
}
