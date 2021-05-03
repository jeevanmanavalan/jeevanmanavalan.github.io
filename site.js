// This calculator works by listening for button clicks,
// assigning button values to variables, and running JS
// math calculations to generate a result to display.

$(document).ready(function(){
  var numOne;
  var numTwo;
  var operator;
  var $display = $(".total");
  var dotAdded = false;
  var hiddenDisp;
  var singleOp = false;
  var negBool = false;

  // Clear variables and set display to '0'
  function reset() {
    numOne = null;
    numTwo = null;
    operator = null;
    $display.text("0");
	hiddenDisp = "0";
	dotAdded = false;
	negBool = false;
  }

  reset();

  // Set a 12-digit max on the display
  function testNumLength(number) {
      if (number.length > 10) {
        $display.text(parseFloat(number).toPrecision(7));
      }
	  if (number === 'NaN') {
        $display.text('Illegal Input');
      }
  };

  $(".numbers a").click(function() {
    var clickDigit = $(this).text();
    var currentVal = hiddenDisp;
    var newVal;
    if (currentVal === "0") {
		newVal = clickDigit;
		if (negBool){
			newVal = newVal *-1;
		}
    } else {
      newVal = currentVal + clickDigit;
    }
	
	if (!singleOp){
		$display.text(newVal);
	}
	else{
		$display.text('sqrt('+newVal+')');
	}
	hiddenDisp = newVal;
    testNumLength($display.text());
  });


  $(".operators a").click(function(){
    operator = $(this).text();
    numOne = parseFloat(hiddenDisp);
	hiddenDisp = "0";
	dotAdded = false;
	negBool = false;
    $display.text(numOne);
  });


  $("#sq").click(function(){
	  singleOp = true;
	  reset();
	  $display.text("sqrt()");
	  
  });
  
   $("#neg").click(function(){
	  negBool = true;
	  if (hiddenDisp != 0){
		  hiddenDisp = hiddenDisp *-1;
	      $display.text(hiddenDisp);
	  }
	  
  });
  
  $("#dot").click(function(){
	  if(!dotAdded){ 
	hiddenDisp = hiddenDisp+ '.';
	dotAdded = true;
	if(!singleOp){
		$display.text(hiddenDisp);
	}else{
		$display.text('sqrt('+hiddenDisp+')')
	}

    
	  
	  }
  });


  $("#equals").click(function(){
    var total;

    numTwo = parseFloat(hiddenDisp);

    if (operator === "+"){
      total = numOne + numTwo;
    }
    else if (operator === "-"){
      total = numOne - numTwo;
    }
	else if (operator === "*"){
      total = numOne * numTwo;
	}
    else if (operator === "/"){
      total = numOne % numTwo;
    }
	else if (operator === "%"){
      total = numOne % numTwo;
    }
	else if (operator === "^"){
      total = numOne ** numTwo;
    }
	else if (singleOp){
      total = Math.sqrt(hiddenDisp);
	  singleOp = false;
    }
	$display.text(total);
    testNumLength($display.text());
  });

  $("#clear").click(function(){
    reset();
  });
});