const SQM_TO_HA = 0.0001;
const HA_TO_SQM = 10000;

function addRow() {
    var table = document.getElementById('dataTable');
    var newRow = table.insertRow(table.rows.length);

    for (var i = 0; i < 8; i++) {
        var cell = newRow.insertCell(i);
        var input = document.createElement('input');

        if (i === 4 || i === 5 || i === 7) {
            input.type = 'number';
        } else if (i === 6) {
            input.type = 'date';
        } else {
            input.type = 'text';
        }

        input.name = table.rows[0].cells[i].textContent.toLowerCase().replace(/\s/g, '') + '[]';
        input.addEventListener('input', function () {
            updateUVRate(this);
        });

        cell.appendChild(input);
    }

    updateUVRate(newRow.cells[4].getElementsByTagName('input')[0]);
}

function updateUVRate(input) {
    var row = input.parentNode.parentNode;
    var landArea = parseFloat(row.cells[4].getElementsByTagName('input')[0].value);
    var assessedUV = parseFloat(row.cells[5].getElementsByTagName('input')[0].value);
    var uvRateCell = row.cells[7].getElementsByTagName('input')[0];

    if (!isNaN(landArea) && !isNaN(assessedUV) && landArea !== 0) {
        var uvRate = assessedUV / landArea;
        uvRateCell.value = uvRate.toFixed(2);
    } else {
        uvRateCell.value = '';
    }

    calculateValues();
}

function saveRows() {
    alert('Rows saved!');
}

function calculateValues() {
    var adoptedRate = parseFloat(document.getElementById('adoptedRate').value);
    var increasePerAnnum = parseFloat(document.getElementById('increasePerAnnum').value);
    var yearFrom = parseInt(document.getElementById('yearFrom').value);
    var yearTo = parseInt(document.getElementById('yearTo').value);

    if (!isNaN(adoptedRate) && !isNaN(increasePerAnnum) && !isNaN(yearFrom) && !isNaN(yearTo) && yearFrom <= yearTo) {
        var totalIncrease = increasePerAnnum * (yearTo - yearFrom);
        var newUVRate = (totalIncrease * adoptedRate / 100) + adoptedRate;

        document.getElementById('totalIncrease').value = totalIncrease.toFixed(2) + '%';
        document.getElementById('newUVRate').value = newUVRate.toFixed(2);

        var subjectLandArea = parseFloat(document.getElementById('subjectLandArea').value);
        var newUV = subjectLandArea * newUVRate;

        document.getElementById('newUV').value = newUV.toFixed(2);
    } else {
        document.getElementById('totalIncrease').value = '';
        document.getElementById('newUVRate').value = '';
        document.getElementById('newUV').value = '';
    }
}

function convertLandUnits() {
    var unit = document.getElementById('landUnit').value;
    var table = document.getElementById('dataTable');

    for (var i = 1; i < table.rows.length; i++) {
        var cell = table.rows[i].cells[4].getElementsByTagName('input')[0];
        var value = parseFloat(cell.value);

        if (!isNaN(value)) {
            if (unit === 'ha' && cell.dataset.unit !== 'ha') {
                cell.value = (value * SQM_TO_HA).toFixed(4);
                cell.dataset.unit = 'ha';
            } else if (unit === 'sqm' && cell.dataset.unit !== 'sqm') {
                cell.value = (value * HA_TO_SQM).toFixed(0);
                cell.dataset.unit = 'sqm';
            }
        }
    }
}

function convertRateUnits() {
    var unit = document.getElementById('rateUnit').value;
    var table = document.getElementById('dataTable');

    for (var i = 1; i < table.rows.length; i++) {
        var cell = table.rows[i].cells[7].getElementsByTagName('input')[0];
        var value = parseFloat(cell.value);

        if (!isNaN(value)) {
            if (unit === 'kha' && cell.dataset.unit !== 'kha') {
                cell.value = (value * HA_TO_SQM).toFixed(2);
                cell.dataset.unit = 'kha';
            } else if (unit === 'ksqm' && cell.dataset.unit !== 'ksqm') {
                cell.value = (value * SQM_TO_HA).toFixed(2);
                cell.dataset.unit = 'ksqm';
            }
        }
    }
}

function displayInformation() {
    var leaseType = document.getElementById('leaseType').value;
    var adoptedRate = document.getElementById('adoptedRate').value;
    var increasePerAnnum = document.getElementById('increasePerAnnum').value;
    var yearFrom = document.getElementById('yearFrom').value;
    var yearTo = document.getElementById('yearTo').value;
    var totalIncrease = document.getElementById('totalIncrease').value;
    var newUVRate = document.getElementById('newUVRate').value;
    var subjectLandArea = document.getElementById('subjectLandArea').value;
    var newUV = document.getElementById('newUV').value;

    var analysisStatement = `
        Lease Type: ${leaseType} <br>
        Adopted Rate: ${adoptedRate} <br>
        Increase Per Annum: ${increasePerAnnum}% <br>
        Year From: ${yearFrom} <br>
        Year To: ${yearTo} <br>
        Total % Increase: ${totalIncrease} <br>
        New UV Rate: ${newUVRate} <br>
        Subject Land Area: ${subjectLandArea} sq.m <br>
        New UV: ${newUV} PGK
    `;

    document.getElementById('analysisStatement').innerHTML = analysisStatement;
}

function exportToPDF() {
    // Implement PDF export functionality here
    alert('PDF export functionality to be implemented.');
}
