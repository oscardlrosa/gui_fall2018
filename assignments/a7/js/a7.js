function validate() {
  $('#input').validate({
    rules: {
      rowStart: {
        digits: true,
        min: -10,
        max: 10,
        required: true,
      },
      rowEnd: {
        digits: true,
        min: -10,
        max: 10,
        required: true,
      },
      colStart: {
        digits: true,
        min: -10,
        max: 10,
        required: true,
      },
      colEnd: {
        digits: true,
        min: -10,
        max: 10,
        required: true,
      },
    },
    messages: {
      rowStart: {
        digits: 'ERROR Num',
        required: 'ERROR Req',
      },
      rowEnd: {
        digits: 'ERROR Num',
        required: 'ERROR Req',
      },
      colStart: {
        digits: 'ERROR Num',
        required: 'ERROR Req',
      },
      colEnd: {
        digits: 'ERROR Num',
        required: 'ERROR Req',
      },
    },

    submitHandler: function () {
      makeTable();
      return false;
    },

    invalidHandler: function () {
      $('#warningMsg').empty();
      $('#ghostTable').empty();
    },

    errorElement: 'div',
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
  });
}

function makeTable() {
  var resultTable = document.getElementById('ghostTable');
  if (resultTable != null) resultTable.remove();

  var temp;
  var rowStart = +document.getElementById('rowStart').value;
  var rowEnd = +document.getElementById('rowEnd').value;
  var colStart = +document.getElementById('colStart').value;
  var colEnd = +document.getElementById('colEnd').value;

  var bRef = document.getElementsByTagName('body')[0];

  var crtTbl = document.createElement('table'); /*create table*/
  var crtTblBod = document.createElement('tbody'); /*create table body*/

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

function clearForm() {
  document.getElementById('input').reset();
}

$('#destroy').click(function () {
  $('#ghostTable div').hide();
});
