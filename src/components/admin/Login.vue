<template>
    <div class="container login-container">
        <Dialog/>
        <div class="row">
            <div class="col-md-6 login-form-1">
                <h3>{{$t('login.title')}}</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input id="username" type="text" class="form-control" placeholder="Twój login" value=""/>
                    </div>
                    <div class="form-group">
                        <input id="password" type="password" class="form-control" placeholder="Twoje hasło"
                               value=""/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Zaloguj się"/>
                    </div>
                    <div class="form-group">
                        <a href="#" class="ForgetPwd">{{$t('login.forgetPassword')}}</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

    import Dialog from "../common/Dialog";

    export default {
        name: 'login',
        components: {Dialog},
        data() {
            return {}
        },
        methods: {
            handleSubmit() {
                const login = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const authorization = `Basic ${btoa(`${login}:${password}`)}`;
                fetch("http://jakas.pl"/*Todo endpoint from backend*/, {
                    method: "GET",
                    headers: {
                        Authorization: authorization
                    }
                }).then(() => {
                    sessionStorage.setItem("Authorization", authorization);
                    window.location.href = '/admin/home';
                })
                    .catch(() => {
                        //TODO add error to warning message
                        this.$root.$emit('showDanger','Podano nie prawidłowe dane logowania')
                    });
            },
        }
    }
</script>
<style>
    .login-container {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .login-form-1 {
        padding: 5%;
        margin: auto;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .login-form-1 h3 {
        text-align: center;
        color: #333;
    }

    .login-container form {
        padding: 10%;
    }

    .btnSubmit {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        border: none;
        cursor: pointer;
    }

    .login-form-1 .btnSubmit {
        font-weight: 600;
        color: #fff;
        background-color: #9933ff;
    }

    .login-form-1 .ForgetPwd {
        color: #9933ff;
        font-weight: 600;
        text-decoration: none;
    }
</style>
