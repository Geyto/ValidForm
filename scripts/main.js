document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('regForm');
    const link = $('#label5');
    const formFields = {
        name: $('#fullName'),
        username: $('#userName'),
        mail: $('#mail'),
        passwordOne: $('#passwordOne'),
        passwordTwo: $('#passwordTwo'),
        labelText: $('.label__text'),
        check: document.getElementById('checkbox-agree'),
    };
    const items = {
        title: document.getElementById('title'),
        text: $('.authorization__text'),
        submit: document.getElementById('submit'),
        popup: document.getElementById('popup'),
        btn: document.getElementById('btn__popup'),
        name: document.getElementById('label1'),
        mail: document.getElementById('label2'),
        password: document.getElementById('label3'),
        checkLable: $('#label4')
    };
    const autorInput = $('.authorization__input');

    const onRegisterSubmit = (event) => {
        autorInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();

        if (!formFields.name.val()) {
            formFields.name.css('border-bottom', '2px solid red');
            $('.nameHasError').show();
            event.preventDefault();
            return
        }
        if (!formFields.name.val().match(/^[А-ЯЁ][а-яё]+\s*$/)) {
            formFields.name.css('border-bottom', '2px solid red');
            $('.nameRegError').show();
            event.preventDefault();
            return
        }
        if (!formFields.username.val()) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameHasError').show();
            event.preventDefault();
            return
        }
        if (!formFields.username.val().match(/^([а-яёА-ЯЁ0-9\-_]+$)|^([A-Za-z0-9\-_]+$)/)) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameRegError').show();
            event.preventDefault();
            return
        }
        if (!formFields.mail.val()) {
            formFields.mail.css('border-bottom', '2px solid red');
            $('.mailHasError').show();
            event.preventDefault();
            return
        }//Проверка через рег выражения работает, но я оставил проверку из атрибута тип email
        if (!formFields.mail.val().match(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-ЯЁа-яё]{1}[-0-9А-я\.]{1,}[0-9А-ЯЁа-яё]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)) {
            formFields.mail.css('border-bottom', '2px solid red');
            $('.mailRegError').show();
            event.preventDefault();
            return
        }
        if (!formFields.passwordOne.val()) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordHasError').show();
            event.preventDefault();
            return
        }
        if (!formFields.passwordOne.val().match(/((?=.*[0-9])(?=.*[!@#$%^&*\-_])(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z!\-_@#$%^&*]{8,}))|((?=.*[0-9])(?=.*[!@#$%^&*\-_])(?=.*[а-яё])(?=.*[А-ЯЁ])([0-9а-яёА-ЯЁ!\-_@#$%^&*]{8,}))/g)) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordRegError').show();
            event.preventDefault();
            return
        }
        if (!formFields.passwordTwo.val()) {
            formFields.passwordTwo.css('border-bottom', '2px solid red');
            $('.passwordRepeatHasError').show();
            event.preventDefault();
            return
        }
        if (formFields.passwordOne.val() !== formFields.passwordTwo.val()) {
            formFields.passwordTwo.css('border-bottom', '2px solid red');
            $('.passwordRepeatNotEqualError').show();
            event.preventDefault();
            return
        }
        if (!formFields.check.checked) {
            $('.checkError').show();
            event.preventDefault();
            return
        } else {
            items.popup.classList.add('popup__active');
            event.preventDefault();
        }

        regForm.onsubmit = onLoginSubmit;

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
        console.log(localStorage);
    }

    formFields.name.onkeydown = (event) => {
        let string = parseInt(event.key);
        if (!isNaN(string)) {
            event.preventDefault();
        }
    }
    formFields.username.onkeydown = (event) => {
        if (event.key === "." || event.key === ",") {
            event.preventDefault();
        }
    }
    const onLoginSubmit = (event) => {
        autorInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();
        if (!formFields.username.val()) {
            formFields.username.css('border-bottom', '2px solid red');
            $('.fullNameHasError').show();
            event.preventDefault();
            return
        } else if (!formFields.passwordOne.val()) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordHasError').show();
            event.preventDefault();
            return
        } else if (formFields.passwordOne.val().length < 8) {
            formFields.passwordOne.css('border-bottom', '2px solid red');
            $('.passwordNotRightError').show();
            event.preventDefault();
            return
        } else if (!formFields.check.checked) {
            $('.checkError').show();
            event.preventDefault();
            return
        }
        let clients = localStorage.getItem("clients");
        let clientsArray = JSON.parse(clients);
        let clientObject = clientsArray.find(item => item.name === formFields.username.val());
        console.log(clientObject)
        if (!clientObject) {
            $('.fullNameAutorError').show();
            event.preventDefault();
            return
        }
        if (clientObject.password !== formFields.passwordOne.val()) {
            $('.passwordNotRightError').show();
            event.preventDefault();
            return
        }
        // реализация кабинета
        items.title.textContent = "Welcome, " + clientObject.fullName;
        items.submit.textContent = "Exit";
        items.text.remove();
        formFields.username.remove();
        formFields.passwordOne.remove();
        formFields.labelText.remove();
        items.checkLable.remove();
        link.remove();
        items.submit.addEventListener("click", backFunc);
        event.preventDefault();

    }

    regForm.onsubmit = onRegisterSubmit;
    let func = (event) => {
        autorInput.css('border-bottom', '2px solid #C6C6C4');
        $('.formError').hide();
        items.popup.classList.remove('popup__active');
        items.title.textContent = "Log in to the system";
        items.submit.textContent = "Sign In";
        link.text("Registration");
        link.css('margin-left', '185px');
        regForm.onsubmit = onLoginSubmit;
        items.name.remove();
        items.mail.remove();
        items.password.remove();
        formFields.username.val('');
        formFields.passwordOne.val('');
        link.click(backFunc);
    }
    link.click(func);
    let backFunc = () => {
        window.location.reload()
    }
    items.btn.onclick = func;

}, false);
