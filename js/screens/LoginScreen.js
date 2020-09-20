import {BaseComponent} from '../BaseComponent.js'
import {validateEmail} from '../utils.js'
import {MD5} from '../utils.js'

class LoginScreen extends BaseComponent {
    constructor(){
        super();

        this.state= {
            errors: {
                email: '',
                password: ''
            },

            data: {
                email: '',
                password: ''
            }
        }
    }
    render(){
        this._shadowRoot.innerHTML = /* html */ `
        <section class='login-screen'>
            <form class='form-login'>
                <input-wrapper class='email' label='Email' type='email' error='${this.state.errors.email}' value='${this.state.data.email}'></input-wrapper>
                <input-wrapper class='password' label='Password' type='password' error='${this.state.errors.password}' value='${this.state.data.password}'></input-wrapper>
                <button class='btn-login'>Login</button>
            </form>
        </section>
        `;

        this.$formLogin = this._shadowRoot.querySelector('.form-login');
        this.$formLogin.onsubmit = async (event) => { 
            event.preventDefault();
            // Lấy dữ liệu từ các input-wrapper
            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;

            // Kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true;

            if (email == '' || !validateEmail(email)) {
                this.state.errors.email = 'Input your email!';
            } else {
                this.state.errors.email = '';
                this.state.data.email = email;
            }

            if (password == '') {
                isPassed = false;
                this.state.errors.password = 'Input your password!';
            } else {
                this.state.errors.password = '';
                this.state.data.password = password;
            }

            // Lưu dữ liệu vào firebase
            if (isPassed) {
                let response = await firebase.firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', MD5(password))
                    .get();

                if (response.empty) {
                    alert('Your email or password is not correct!')
                } else {
                    alert('Sign in successfully!')
                }
            }

            this.setState(this.state);
        }
    }
}

window.customElements.define('login-screen', LoginScreen)