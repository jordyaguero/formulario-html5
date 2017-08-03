
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

        // calcular total x producto y orden total

        let qtyFields = orderForm.quantyty,
            totalFields = document.getElementsByClassName('item_total'),
            orderTotalFields = document.getElementById('order_total');

        let formatMoney = function (value) {
            /*Devuelve un número formateado para moneda, utilizando una coma
             como un carácter separador 1,000*/
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }; // fin de formatMoney

        // Calcula los totales de cada elemento y el total del pedido.
        let calculateTotals = function () {
            let i = 0,
                ln = qtyFields.length,
                itemQty = 0,
                itemPrice = 0.00,
                itemTotal = 0.00,
                itemTotalMoney = '$0.00',
                orderTotal = 0.00,
                orderTotalMoney = '$0.00';

                for (; i<ln; i++) {
                    if (!!qtyFields[i].valueAsNumber) { // comprueba la existencia de valueAsNumber, !! Se utiliza para convertir la propiedad valueAsNumber en un tipo booleano.
                        itemQty = qtyFields[i].valueAsNumber || 0;
                    }
                    else {
                        itemQty = parseFloat(qtyFields[i].value) || 0;
                    }

                    if (!!qtyFields[i].dataset) {
                        itemPrice = parseFloat(qtyFields[i].dataset.price);
                    }
                    else {
                        itemPrice = parseFloat(qtyFields[i].getAttribute('data-price')); // para navegadores antiguos
                    }

                    itemTotal = itemQty * itemPrice;
                    itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));
                    orderTotal += itemTotal;
                    orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));

                    // el elemento output se realiza con value
                    if (!!totalFields[i].value) {
                        totalFields[i].value = itemTotalMoney;
                        orderTotalFields.value = orderTotalMoney;
                    }
                    else {
                        totalFields[i].innerHTML = itemTotalMoney;
                        orderTotalFields.innerHTML = orderTotalMoney;
                    }
                }// fir del for

        }; // fin de calculateTotals

        calculateTotals();

        let qtyListeners = function () {
            let i = 0,
                ln = qtyFields.length;

            // Llama a la función qtyListeners para agregar escuchas de eventos a los campos.
            for ( ; i<ln; i++) {
                qtyFields[i].addEventListener('input', calculateTotals, false);
                qtyFields[i].addEventListener('keyup', calculateTotals, false);
            }

        };// fin de qtylisteners

        qtyListeners();

        /*
         Cuando se lee la propiedad valueAsNumber de un tipo de entrada numérica, la propiedad devuelve el número
          como un número de punto flotante. Si asigna un número de coma flotante a la propiedad valueAsNumber de un tipo
           de entrada numérica, la propiedad convertirá el número de coma flotante en un valor basado en cadena.
        * */

        // valueAsDate es para los campos de fecha y hora

    };// fin de init

    window.addEventListener('load', init, false);
})();