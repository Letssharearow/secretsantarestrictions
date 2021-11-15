const names = document.getElementById("nameInput");
var namesOutput = document.getElementById("nameOutput");
var restrictionInput = document.getElementById("restrictionInput");
const restrictionOutput = document.getElementById("restrictionOutput");
const errorMessage = document.getElementById("error");

const namesMap = new Map();
let indexMap = 0;

let restrictionArray = [];
let indexArray = 0;

let restrictionIntegerArray = [];

restrictionInput.onchange = () => {

  if(!checkInput(restrictionInput.value)){
    setErrorMessage('WRONG INPUT: only use Numbers and commas. 0,1,5,2,7,3');
    return;
  }

  restrictionArray.push(restrictionInput.value);
  updateRestrictionsOutput();
  restrictionInput.value='';
  indexArray++;
}

names.onchange = () => {
    namesMap.set(indexMap, names.value);
    names.value='';
    updateNamesOutput();
    indexMap++;
}

var updateNamesOutput = () => {
  namesOutput.innerHTML += (indexMap > 0? "<br/>" : "") + indexMap + ": " + namesMap.get(indexMap);
}

var updateRestrictionsOutput = () => {
  restrictionOutput.innerHTML += (restrictionArray.length > 0? "<br/>" : "") + indexArray + ": " + restrictionArray[indexArray];
  restrictionIntegerArray.push(restrictionToArray(restrictionArray[indexArray]));
}

var restrictionToArray = (RestrictionAsString) => {
  let arrayString = RestrictionAsString.split(',');
  let arrayInteger = [];
  for (let index = 0; index < arrayString.length; index++) {
      arrayInteger[index] = parseInt(arrayString[index]);    
  }

  console.log(arrayInteger);
  return arrayInteger;
}

var checkInput = (inputString) => {
  const regex = new RegExp('^([0-9][0-9]*,[0-9][0-9]*)([0-9]*,[0-9]*)*$');  
  return regex.test(inputString);
}

var setErrorMessage = (message) => {
  errorMessage.textContent = message;
}

