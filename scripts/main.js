$(document).ready(function () {
    const regForm = $('#regForm');
    const link = $('#label5');
    const authorizationInput = $('.authorization__input');
    const formFields = {
        name: $('#fullName'),
        username: $('#userName'),
        mail: $('#mail'),
        passwordOne: $('#passwordOne'),
        passwordTwo: $('#passwordTwo'),
        labelText: $('.label__text'),
        check: $('#checkbox-agree'),
    };
    const items = {
        title: $('#title'),
        text: $('.authorization__text'),
        submit: $('#submit'),
        popup: $('#popup'),
        btn: $('#btn__popup'),
        name: $('#label1'),
        mail: $('#label2'),
        password: $('#label3'),
        checkLabel: $('#label4'),
    };
    const onRegisterSubmit = (event) => {
        event.preventDefault();
        authorizationInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();
        if (!formFields.name.val()) {
            formFields.name.css('border-bottom', '2px solid red');
            $('.nameHasError').show();
            return
        }
        if (!formFields.name.val().match(/^[А-ЯЁ][а-яё]+\s*$/)) {
            formFields.name.css('border-bottom', '2px solid red');
            $('.nameRegError').show();
            return
        }
        if (!formFields.username.val()) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameHasError').show();
            return
        }
        if (!formFields.username.val().match(/^([а-яёА-ЯЁ0-9\-_]+$)|^([A-Za-z0-9\-_]+$)/)) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameRegError').show();
            return
        }
        if (!formFields.mail.val()) {
            formFields.mail.css('border-bottom', '2px solid red');
            $('.mailHasError').show();
            return
        }//Проверка через рег выражения работает, но я оставил проверку из атрибута тип email
        if (!formFields.mail.val().match(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-ЯЁа-яё]{1}[-0-9А-я\.]{1,}[0-9А-ЯЁа-яё]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)) {
            formFields.mail.css('border-bottom', '2px solid red');
            $('.mailRegError').show();
            return
        }
        if (!formFields.passwordOne.val()) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordHasError').show();
            return
        }
        if (!formFields.passwordOne.val().match(/((?=.*[0-9])(?=.*[!@#$%^&*\-_])(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z!\-_@#$%^&*]{8,}))|((?=.*[0-9])(?=.*[!@#$%^&*\-_])(?=.*[а-яё])(?=.*[А-ЯЁ])([0-9а-яёА-ЯЁ!\-_@#$%^&*]{8,}))/g)) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordRegError').show();
            return
        }
        if (!formFields.passwordTwo.val()) {
            formFields.passwordTwo.css('border-bottom', '2px solid red');
            $('.passwordRepeatHasError').show();
            return
        }
        if (formFields.passwordOne.val() !== formFields.passwordTwo.val()) {
            formFields.passwordTwo.css('border-bottom', '2px solid red');
            $('.passwordRepeatNotEqualError').show();
            return
        }
        if (!formFields.check.is(':checked')) {
            $('.checkError').show();
            return
        } else {
            items.popup.addClass('popup__active');

        }
        regForm.off().on('submit', onLoginSubmit);
        formFields.check.prop('checked', false);
        saveClientInLocalStorage();
    }
    const onLoginSubmit = (event) => {
        event.preventDefault();
        authorizationInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();
        if (!formFields.username.val()) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameHasError').show();
            return
        } else if (!formFields.passwordOne.val()) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordHasError').show();
            return
        } else if (formFields.passwordOne.val().length < 8) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordNotRightError').show();
            return
        }
        let clients = localStorage.getItem("clients");
        let clientsArray = JSON.parse(clients);
        let clientObject = clientsArray.find(item => item.name === formFields.username.val());
        if (!clientObject) {
            $('.fullNameAuthorizationError').show();
            return
        }
        if (clientObject.password !== formFields.passwordOne.val()) {
            $('.passwordNotRightError').show();
            return
        }
        regForm.off();
        creationCabinetClients(clientObject);
    }
    const saveClientInLocalStorage = () => {
        let client = {};
        client.name = formFields.username.val();
        client.password = formFields.passwordOne.val();
        client.fullName = formFields.name.val();
        let clients = localStorage.getItem("clients");
        let clientsArray
        if (clients) {
            clientsArray = JSON.parse(clients);
        } else {
            clientsArray = [];
        }
        clientsArray.push(client);
        localStorage.setItem('clients', JSON.stringify(clientsArray));
    }
    const creationCabinetClients = (event) => {
        items.title.text("Welcome, " + event.fullName);
        items.submit.text("Exit");
        items.text.remove();
        formFields.username.remove();
        formFields.passwordOne.remove();
        formFields.labelText.remove();
        items.checkLabel.remove();
        link.remove();
        regForm.on('submit', backFunc)
    }
    const authorizationWindowOpen = () => {
        authorizationInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();
        items.popup.removeClass('popup__active');
        items.title.text("Log in to the system");
        items.submit.text("Sign In");
        link.text("Registration");
        link.css('margin-left', '185px');
        regForm.off().on('submit', onLoginSubmit);
        items.checkLabel.remove();
        items.name.remove();
        items.mail.remove();
        items.password.remove();
        formFields.username.val('');
        formFields.passwordOne.val('');
        link.on('click',backFunc);
    }
    const backFunc = (event) => {
        event.preventDefault();
        location.reload();
    }
    regForm.on('submit', onRegisterSubmit);
    link.on('click',authorizationWindowOpen);
    items.btn.on('click',authorizationWindowOpen);
}, false);
