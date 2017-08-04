(function() {

    let els = document.getElementsByTagName('input'),
        i = 0, ln = els.length, j = 0,
        monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
    for(;i<ln;i++) {
        let el = els[i], val = el.value, required = el.hasAttribute('required'),
            monthVal, yearVal, monthInt;
        if(el.getAttribute('type') && el.getAttribute('type').toLowerCase() === 'month') {
            monthVal = val.substring(5, 7);
            monthInt = parseInt(monthVal, 10);
            yearVal = val.substring(0, 4);
            let hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', el.getAttribute('name'));
            hiddenInput.value = el.getAttribute('value') || yearVal.toString()+'-01';
            el.parentNode.replaceChild(hiddenInput, el);
            
            let monthInput = document.createElement('select'),
                monthOption;
            j = 0;
            for(;j<12;j++) {
                monthOption = document.createElement('option');
                monthOption.value = j;
                if((j+1) === monthInt) {
                    monthOption.setAttribute('selected', 'selected');
                }                
                let monthOptionText = document.createTextNode(monthNames[j]);
                monthOption.appendChild(monthOptionText);
                monthInput.appendChild(monthOption);
            }
            if(required) monthInput.setAttribute('required', 'required');
            monthInput.setAttribute('data-hiddenfield', hiddenInput.getAttribute('name'));
            monthInput.className = 'month-picker-month';            
            
            let spacer = document.createTextNode(' ');
            
            let yearInput = document.createElement('input');
            yearInput.setAttribute('type', 'number');
            yearInput.setAttribute('placeholder', 'YYYY');
            yearInput.value = yearVal;
            yearInput.setAttribute('maxlength', '4');
            yearInput.setAttribute('pattern', '[0-9]{4}');
            yearInput.setAttribute('min', new Date().getFullYear());
            yearInput.setAttribute('max', new Date().getFullYear()+10);
            if(required) yearInput.setAttribute('required', 'required');
            yearInput.setAttribute('data-hiddenfield', hiddenInput.getAttribute('name'));
            yearInput.className = 'month-picker-year';
            
            if(hiddenInput.parentNode.nodeName.toLowerCase() === 'label') {
                hiddenInput.parentNode.insertBefore(monthInput, hiddenInput);
                hiddenInput.parentNode.parentNode.appendChild(spacer);
                hiddenInput.parentNode.parentNode.appendChild(yearInput);
            } else {
                hiddenInput.parentNode.appendChild(monthInput);
                hiddenInput.parentNode.appendChild(spacerInput);
                hiddenInput.parentNode.appendChild(yearInput);
            }
            
            let updateHiddenInput = function() {
                let lpad = function(s) {
                    let str = s;
                    while(str.length < 2) {
                        str = '0'+str;
                    }
                    return str;
                };
                
                if(yearInput.value.length === 4) {
                    hiddenInput.value = yearInput.value+'-'+lpad(parseInt(monthInput.value, 10)+1);
                }
            };
            
            monthInput.addEventListener('change', updateHiddenInput, false);
            yearInput.addEventListener('input', updateHiddenInput, false);
        }
    }
})();