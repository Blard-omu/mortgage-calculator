const form = document.getElementById("form");
const clearAll = document.getElementById("clear");
const mortgageAmt = document.getElementById("mortgage-amt");
const mortgageTerm = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const repaymentRadio = document.getElementById("repayment");
const interestOnlyRadio = document.getElementById("interest-only");
const calculateBtn = document.getElementById("calculate");
const rightInner = document.querySelector(".right-inner");
const rightResult = document.querySelector(".right-result-container");
const monthlyRepayResult = document.querySelector(".result-total h1");
const totalRepayResult = document.querySelector(".repay-result h3");
const formGroups = document.querySelectorAll(".form-inner");
const allErrors = document.querySelectorAll("#error");
const formRadio = document.querySelectorAll(".form-radio");
const radio = document.querySelectorAll("input[type='radio']");
// console.log(radio);

// showError
function showError(elem, msg) {
  const formGroup = elem.closest(".form-group");
  const small = formGroup.querySelector("#error");
  const formInner = formGroup.querySelector(".form-inner");
  small.innerHTML = msg;
  if (formInner) {
    formInner.classList.add("error");
  }
  small.style.visibility = "visible";
}
// showError(mortgageTerm, "This field is required");

function clearErrorMsg() {
  allErrors.forEach((small) => (small.style.visibility = "hidden"));
}

// resetForm
function resetForm() {
  form.reset(); // clear form fields
  rightResult.style.display = "none";
  rightInner.style.display = "block";
  formGroups.forEach((error) => error.classList.remove("error"));
  allErrors.forEach((small) => (small.style.visibility = "hidden"));
  formRadio.forEach((radio) => radio.classList.remove("checked"));

}
clearAll.addEventListener("click", resetForm);

// handleSubmit
function handleSubmit(e) {
  e.preventDefault();
  // Reset all error messages
  formGroups.forEach((error) => error.classList.remove("error"));

  let isValid = true;
  // Validate form fields
  if (!mortgageAmt.value || isNaN(mortgageAmt.value)) {
    showError(mortgageAmt, "This field is required");
    isValid = false;
  }
  if (!mortgageTerm.value || isNaN(mortgageTerm.value)) {
    showError(mortgageTerm, "This field is required");
    isValid = false;
  }
  if (!interestRate.value || isNaN(interestRate.value)) {
    showError(interestRate, "This field is required");
    isValid = false;
  }

    let isChecked = false;
    for(input of radio){
      if(input.checked){
          isChecked = true;
      }
    }
    if(!isChecked){
      for(input of radio){
          showError(repaymentRadio, "This field is required");
          isValid = false;
      }
    }

  //   main calculation logic
  if (isValid) {
    clearErrorMsg()
    const principal = parseFloat(mortgageAmt.value);
    const termYears = parseFloat(mortgageTerm.value);
    const annualRate = parseFloat(interestRate.value) / 100;
    const monthlyRate = annualRate / 12;

    let monthlyRepayment;
    let totalRepayment;

    if (repaymentRadio.checked) {
      const numberOfPayments = termYears * 12;
      monthlyRepayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      totalRepayment = monthlyRepayment * numberOfPayments;
    } else if (interestOnlyRadio.checked) {
      monthlyRepayment = principal * monthlyRate;
      totalRepayment = principal + monthlyRepayment * 12 * termYears;
    }

    monthlyRepayResult.innerText = `$${monthlyRepayment.toFixed(2)}`;
    totalRepayResult.innerText = `$${totalRepayment.toFixed(2)}`;

    rightInner.style.display = "none";
    rightResult.style.display = "block";
  }
}

for (let input of radio) {
  input.addEventListener("change", () => {
    let elem1 = repaymentRadio.closest(".form-radio");
    let elem2 = interestOnlyRadio.closest(".form-radio");

    if (input.checked) {
      if (input.id === "repayment") {
        elem2.classList.remove("checked");
        elem1.classList.add("checked");
      } else if (input.id === "interest-only") {
        elem1.classList.remove("checked");
        elem2.classList.add("checked");
      }
    }
  });
}

calculateBtn.addEventListener("click", handleSubmit);
