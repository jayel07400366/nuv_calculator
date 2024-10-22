// Function to update LLI
function updateLLI() {
  var salePrice = parseFloat(document.getElementById("salePrice").value) || 0;
  var improvementValue = parseFloat(document.getElementById("improvementValue").value) || 0;
  var LLI = salePrice - improvementValue;
  document.getElementById("LLI").value = LLI.toFixed(2);
}

// Function to update ROR
function updateROR() {
  var rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) || 0;
  document.getElementById("ROR").value = rateOfReturn.toFixed(2);
}

// Function to update n
function updateNumberOfYears() {
  var dateOfGrant = new Date(document.getElementById("dateOfGrant").value);
  var numberOfYears = parseFloat(document.getElementById("numberOfYears").value) || 0;
  var dateOfSale = new Date(document.getElementById("dateOfSale").value);
  var yearOfSale = dateOfSale.getFullYear();
  var n = dateOfGrant.getFullYear() + numberOfYears - yearOfSale;
  document.getElementById("labelN").value = n.toFixed(0);
}

// Function to calculate SI(a), SI(b), and NUV, and display details
function calculateStatesInterest() {
  var rentPerAnnum = parseFloat(document.getElementById("rentPerAnnum").value) || 0;
  var rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) || 0;
  var numberOfYears = parseFloat(document.getElementById("labelN").value) || 0;
  var LLI = parseFloat(document.getElementById("LLI").value) || 0;
  var i = rateOfReturn / 100;
  var n = numberOfYears;

  // SI(a) Calculation
  var powerValue = Math.pow((1 + i), -n);
  var SIa = ((1 - powerValue) / i) * rentPerAnnum;

  // Calculate intermediate value for SI(b)
  var intermediateSIb = 0.05 / i;

  // SI(b) Calculation using the formula provided
  var SIb = Math.pow((1 + i), -n) * intermediateSIb;

  // Calculate final NUV using the iterative method
  var totalSI = SIa + SIb;
  var finalNUV = (LLI + totalSI) / (1 - 0.1427);

  // Display the calculation details for both functions
  var details = `
    <p><strong>Calculation Details:</strong></p>
    <p><em>SI(a) Calculation:</em></p>
    <p>(1 + i)^(-n) = (1 + ${i.toFixed(3)})^(-${n}) ≈ ${powerValue.toFixed(3)}</p>
    <p>1 - (1 + i)^(-n) = 1 - ${powerValue.toFixed(3)} ≈ ${(1 - powerValue).toFixed(3)}</p>
    <p>(${(1 - powerValue).toFixed(3)}) / ${i.toFixed(3)} * ${rentPerAnnum} = ${SIa.toFixed(2)}</p>

    <p><em>SI(b) Calculation:</em></p>
    <p>Intermediate SI(b) = 0.05 / ${i.toFixed(3)} ≈ ${intermediateSIb.toFixed(3)}</p>
    <p>(1 + i)^(-n) * Intermediate SI(b) = ${powerValue.toFixed(3)} * ${intermediateSIb.toFixed(3)} = ${SIb.toFixed(2)}</p>
  `;

  // Update the calculation details
  document.getElementById("calculationDetails").innerHTML = details;

  // Display the final NUV result
  var nuvDetails = `<p><strong>Final New Unimproved Value (NUV):</strong> K ${finalNUV.toFixed(2)}</p>`;
  document.getElementById("finalNUVDetails").innerHTML = nuvDetails;
}
