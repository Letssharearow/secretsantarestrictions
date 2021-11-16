const names = document.getElementById("nameInput");
var namesOutput = document.getElementById("nameOutput");
var restrictionInput = document.getElementById("restrictionInput");
const restrictionOutput = document.getElementById("restrictionOutput");
const errorMessage = document.getElementById("error");
const calculateButton = document.getElementById("calculate");

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
  return arrayInteger;
}

var checkInput = (inputString) => {
  const regex = new RegExp('^([0-9][0-9]*,[0-9][0-9]*)([0-9]*,[0-9]*)*$');  
  return regex.test(inputString);
}

var setErrorMessage = (message) => {
  errorMessage.textContent = message;
}

calculateButton.onclick = () => {
  let namesKeys = Array.from( namesMap.keys() );
  const length = namesKeys.length;

  let currentPair = [];
  moveOver(namesKeys, currentPair, getRandom(0, namesKeys.length - 1));
  let completeOrder = [];
  

  while (completeOrder.length != length) {
    moveOver(namesKeys, currentPair, getRandom(0, namesKeys.length - 1));
    if(!checkPairAgainstRestriction(currentPair)){
      moveOver(currentPair, namesKeys, 1);
      while (completeOrder.length > 0) {
        moveOver(completeOrder, namesKeys, 0);        
      }
      console.log(restrictionArray, currentPair);
      continue;      
    }
    moveOver(currentPair, completeOrder, 0);
    console.log(completeOrder, completeOrder.length, length);
  }


}

var moveOver = (fromArray, ToArray, index) => {
  ToArray.push(fromArray[index]);
  fromArray.splice(fromArray.indexOf(fromArray[index]),1);
}

var getRandom = (fromIncl, toIncl) => {
  let random = 0;
  random = parseInt((Math.random() * (toIncl - fromIncl + 1) ) + fromIncl);
            
  return random;
}

var checkPairAgainstRestriction = (pair) => {
  
  for (let currentRestriction = 0; currentRestriction < restrictionIntegerArray.length; currentRestriction++) {
    for (let second = 1; second < restrictionIntegerArray[currentRestriction].length; second++) {
      let first = second - 1;  
      if(first == pair[0] && second == pair[1]){
        return false;
      }
    }    
  }
  return true;
}
