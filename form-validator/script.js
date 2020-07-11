const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change',function(){
    if(checkbox.checked){
        password.type ="text"
        password2.type ="text"
    }else{
        password.type ="password"
        password2.type ="password"
    }
})

function showError(input,message){
    const formControl = input.parentElement;

    formControl.classList.add('error');
    // formControl.className ='form-control error';

    // Find an element in form Control.
    const small =  formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

// Check For Email Validation
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input,'Email is not valid');
    }
}

// Check Required Fields.
function checkRequired(inputArray){
    inputArray.forEach( (input) => {
        if(input.value.trim()===''){
           
            showError(input,`${getFieldName( input)} is required`);
        }else{
            showSuccess(input);
        }
    });
}

function checkLength(input,min,max){
    if(input.value.length <min ){
        showError(input,`${getFieldName(input)} must between ${min} to ${max} Characters`);
    }else if(input.value.length >max){
        showError(input,`${getFieldName(input) } must between ${min} to ${max} Characters`);
    }
}

function checkPasswordMatch(p1,p2){
    if(p1.value!==p2.value){
        showError(p2,'Passwords Should Match');
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    const inputs = [username,email,password,password2];
    checkRequired(inputs);
    checkLength(username,3,15);
    checkLength(password,6,15);
    checkEmail(email);
    checkPasswordMatch(password,password2);

    
})
