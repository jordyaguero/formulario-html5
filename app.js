
(function () {
    let init = function () {
        let orderForm = document.forms.order,
            saveBtn = document.getElementById('saveOrder'),
            saveBtnClicked = false;
        
        let saveForm = function () {
            if (!('formAction' in document.createElement('input'))) { //Cuando los usuarios hacen clic en el botón Guardar, compruebe si su navegador admite el atributo formaction
                /*Si el navegador no admite formaction, configure manualmente el atributo de acción en
                 El formulario utilizando el método setAttribute*/
                let formAction = saveBtn.getAttribute('formaction');
                orderForm.setAttribute('action', formAction);
            }
            saveBtnClicked = true;
        };
        saveBtn.addEventListener('click', saveForm, false);
    };// fin de init

    window.addEventListener('load', init, false);
})();