      
      function getHistory()
      {
          return document.getElementById("history-value").innerText;
      }
      
      function printHistory(num)
      {
        document.getElementById("history-value").innerText=num;
      }
     
      function getOutput()
      {
          return  document.getElementById("output-value").innerText;
      }
      
      function printOutput(num)
      {
          if(num=="") // If the number is null than don't send it to Formateed number . else it will print 0
          {
            document.getElementById("output-value").innerText=num;
          }
          else{
            document.getElementById("output-value").innerText=getFormattedNumber(num);
          }
      }
     
      function getFormattedNumber(num) // To introduce comma between numbers
      {
          if(num=="-") // The backspace on negative number will show NaN otherwise
          {
            return "";
          }
          var n= Number(num);
          var value = n.toLocaleString("en");
          return value;
      }

      function reverseNumberFormat(num){ // To remove the comma from the number to do arithmetic operation
          return Number(num.replace(/,/g,''));
      }
      
      // Create a list of operators when the user clicks on any operator
      var operator = document.getElementsByClassName("operator");

      for(var i=0;i<operator.length;i++)
      {
          operator[i].addEventListener('click',function(){

            if(this.id=="clear") // Clearing both history and output
            {
                printHistory("");
                printOutput("");
            }
            else if ( this.id=="backspace") // Clearing each digit one by one of output only
            {
                var output = reverseNumberFormat(getOutput()).toString();

                if(output) // Checking if there is something in the ouput
                {
                    output = output.substr(0,output.length-1);
                    printOutput(output);
                }
            }
            else{

                var output = getOutput();
                var history = getHistory();

                if(output == "" && history!= "")// To remove the operator which has gone to history
                {
                    if(isNaN(history[history.length-1])) // Checking if last character in the history is not a number
                    {
                        history=history.substr(0,history.length-1);
                    }
                }

                if(output != "" || history !="") //Operators dont work if the output is empty 
                {
                    output = output==""?output:reverseNumberFormat(output);
                    history=history+output;

                    if(this.id=="=")
                    {
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    }

                    else
                    {
                        history = history+this.id;
                        printHistory(history);
                        printOutput("");

                    }
                }
            }

          });
      }

      // Create a list of numbers when the user click on any number

      var number = document.getElementsByClassName("number");

      for(i=0;i<number.length;i++)
      {
          number[i].addEventListener('click',function(){
            var output = reverseNumberFormat(getOutput());

            if(output!=NaN)// Checking if output is a number
            {
                output=output+this.id;
                printOutput(output);
            }
          });
      }



      
      
     