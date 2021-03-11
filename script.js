const buttonSignUp = document.querySelector('.button-sign-up') // кнопки перехода
const buttonLogIn = document.querySelector('.button-log-in')
const buttonMainPage = document.querySelectorAll('.button-main-page')

const logIn = document.querySelector('.log-in')     // разделы сайта
const signUp = document.querySelector('.sign-up')
const mainPage = document.querySelector('.main-page')

const adressRegistration = document.querySelector('.adress-registration')   // поля ввода данных
const passwordRegistration = document.querySelector('.password-registration')
const passwordRegistrationRepeat = document.querySelector('.password-registration-repeat')
const adressLogIn = document.querySelector('.adress-log-in')
const passwordLogIn = document.querySelector('.password-log-in')

const sendRegistration = document.querySelector('.send-registration')   // кнопки отправки данных
const sendLogIn = document.querySelector('.send-log-in')

let wrongInput = document.createElement('p')       // строка об ошибке при неправильном вводе данных
wrongInput.style.color = 'red'
wrongInput.classList.add('wrong-input-value')

let arrFormRegistration = []
const Site = function() {
    const self = this
    this.showMainPage = function() {
        mainPage.style.display = 'block'
        signUp.style.display = 'none'
        logIn.style.display = 'none'
        buttonLogIn.addEventListener('click', self.showAuthPage)
        buttonSignUp.addEventListener('click', self.showRegistrationPage)
    }
    this.showRegistrationPage = function() {
        mainPage.style.display = 'none'
        signUp.style.display = 'block'
        logIn.style.display = 'none'
        buttonMainPage[1].addEventListener('click', self.showMainPage)
        sendRegistration.addEventListener('click', self.registration)
        adressRegistration.value = 'tesa@gmail.com'
        passwordRegistration.value = '123456'
        passwordRegistrationRepeat.value = '123456'
        adressRegistration.addEventListener('keydown', (event) => {   // добавляет задачу по нажатию на Enter
            if (event.key === 'Enter') self.registration()
        })
        passwordRegistration.addEventListener('keydown', (event) => {   // добавляет задачу по нажатию на Enter
            if (event.key === 'Enter') self.registration()
        })
        passwordRegistrationRepeat.addEventListener('keydown', (event) => {   // добавляет задачу по нажатию на Enter
            if (event.key === 'Enter') self.registration()
        })
        document.querySelector('.link-to-log-in').addEventListener('click', self.showAuthPage) // переход на страницу входа по ссылке
    }
    this.showAuthPage = function() {
        mainPage.style.display = 'none'
        signUp.style.display = 'none'
        logIn.style.display = 'block'
        buttonMainPage[0].addEventListener('click', self.showMainPage)
        sendLogIn.addEventListener('click', self.login)
        adressLogIn.addEventListener('keydown', (event) => {          // добавляет задачу по нажатию на Enter
            if (event.key === 'Enter') self.login()
        })
        passwordLogIn.addEventListener('keydown', (event) => {          // добавляет задачу по нажатию на Enter
            if (event.key === 'Enter') self.login()
        })
        document.querySelector('.link-to-sign-up').addEventListener('click', self.showRegistrationPage) // переход на страницу регистрации по ссылке
    }
    this.registration = function() {
        const user = {email: adressRegistration.value, password: passwordRegistration.value, repeatPassword: passwordRegistrationRepeat.value}

        if (passwordRegistration.value !== passwordRegistrationRepeat.value) {  // проверка на правильность ввода пароля
            wrongInput.innerHTML = 'Второй пароль не совпал с первым' 
            if (!(signUp.contains(document.querySelector('.wrong-input-value')))) {
                sendRegistration.insertAdjacentElement('beforebegin', wrongInput)
            } 
        } else {
            if ((adressRegistration.value === '') || (passwordRegistration.value === '') || (passwordRegistrationRepeat.value === '')) {      // проверка на заполнение всех форм
                wrongInput.innerHTML = 'Заполните все поля формы' 
                if (!(signUp.contains(document.querySelector('.wrong-input-value')))) {
                    sendRegistration.insertAdjacentElement('beforebegin', wrongInput)
                } 
            } else {
                if (passwordRegistration.value.split('').length < 6) {   // проверка на длину пароля
                    wrongInput.innerHTML = 'Пароль должен состоять не менее чем из 6 символов' 
                    if (!(signUp.contains(document.querySelector('.wrong-input-value')))) {
                        sendRegistration.insertAdjacentElement('beforebegin', wrongInput)
                    }
                } else {
                    if (!(/^[a-zA-Z][a-zA-Z0-9]+\@[\w\.\-]+\.\w{2,11}/g.test(adressRegistration.value))) { // проверка на правильность ввода email'a
                        wrongInput.innerHTML = 'Вы неправильно ввели адрес электронной почты' 
                        if (!(signUp.contains(document.querySelector('.wrong-input-value')))) {
                            sendRegistration.insertAdjacentElement('beforebegin', wrongInput)
                        } 
                    } else {
                        if (signUp.contains(document.querySelector('.wrong-input-value'))) { // удаляет предупреждающую надпись
                            sendRegistration.previousElementSibling.remove()
                        }
                        arrFormRegistration.push(user)
                    }
                }
            }
        }
        console.log(arrFormRegistration);
    }
    this.login = function() {
        if (adressLogIn.value === '') {      // проверка на заполнение всех форм
            wrongInput.innerHTML = 'Заполните все поля формы' 
            if (!(logIn.contains(document.querySelector('.wrong-input-value')))) {
                sendLogIn.insertAdjacentElement('beforebegin', wrongInput)
            } 
        } else {
            const user = arrFormRegistration.find(currentUser => currentUser.email === adressLogIn.value) // создает объект с искомыми параметрами 
            if (user === undefined) {       // проверка на наличие в массиве искомого email'a
                wrongInput.innerHTML = 'Вы ввели неправильный адрес электронной почты'
                if (!(logIn.contains(document.querySelector('.wrong-input-value')))) {
                    sendLogIn.insertAdjacentElement('beforebegin', wrongInput)
                } 
            } else {
                if (user.password !== passwordLogIn.value) {
                    wrongInput.innerHTML = 'Вы ввели неправильный пароль'
                    if (!(logIn.contains(document.querySelector('.wrong-input-value')))) {
                        sendLogIn.insertAdjacentElement('beforebegin', wrongInput)
                    } 
                } else {            // проверка на правильность воода массива
                    if (logIn.contains(document.querySelector('.wrong-input-value'))) { // удаляет предупреждающую надпись
                        sendLogIn.previousElementSibling.remove()
                    }
                    console.log(user);
                    alert('ПОЗДРАВЛЯЮ. Вы авторизировались!')
                }
            } 
        }
    }
}

const site = new Site()
site.showMainPage()

