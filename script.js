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
    }
    this.showAuthPage = function() {
        mainPage.style.display = 'none'
        signUp.style.display = 'none'
        logIn.style.display = 'block'
        buttonMainPage[0].addEventListener('click', self.showMainPage)
        sendLogIn.addEventListener('click', self.login)
    }
    this.registration = function() {
        const user = {email: adressRegistration.value, password: passwordRegistration.value, repeatPassword: passwordRegistrationRepeat.value}
 
        if (passwordRegistration.value !== passwordRegistrationRepeat.value) {   
                let wrongRepeatPassword = document.createElement('p')       // строка об ошибке повторного пароля
                wrongRepeatPassword.innerHTML = 'Ва второй пароль не совпал с первым'
                wrongRepeatPassword.style.color = 'red'
                wrongRepeatPassword.classList.add('wrong-repeat-password')
            if (!(signUp.contains(document.querySelector('.wrong-repeat-password')))) {
                sendRegistration.insertAdjacentElement('beforebegin', wrongRepeatPassword)
            } 
        } else {
            sendRegistration.previousElementSibling.remove()
            arrFormRegistration.push(user)

        }
        console.log(arrFormRegistration);
    }
    this.login = function() {
        const user = arrFormRegistration.find(currentUser => currentUser.email === adressLogIn.value)
        if (user.password = passwordLogIn.value) alert('you are log in')
    }

}

const site = new Site()
site.showMainPage()

