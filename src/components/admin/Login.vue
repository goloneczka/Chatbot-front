<template>
    <div class="container login-container">
        <div class="row">
            <div class="col-md-6 login-form-1">
                <h3>{{$t('login.title')}}</h3>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Twój login" value=""/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Twoje hasło" value=""/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Zaloguj się" />
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

    export default {
        name: 'login',
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
