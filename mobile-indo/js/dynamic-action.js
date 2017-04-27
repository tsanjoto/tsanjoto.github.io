var message = {
    "email_verified": "Verifikasi berhasil, login untuk masuk app ini",
    "password_changed": "Reset password berhasil, login untuk masuk app ini"

};
{
    "emailid" : "MASUKIN EMAIL LO",
    "password" : "KATA SANDI",
    "forgotPassword": "Lupa Password",
    "registerAcc": "Account Baru",
    "alreadyAccount": "Masuk"
}
var indo = {
    "labels ": { "emailid ":  "MASUKIN EMAIL LO",   "password ":  "KATA SANDI"  },
    "placeholders ": { "emailid ":  "asdf@gmail.com ",   "password ":  "sandi " },
    "validationMessages ": [
                            {   "rule ":  "required ",   "message ":  "%s perlu dimasukan "  },
                            {   "rule ":  "valid_email ",   "message ":  "%s formatnya salah"  }
                            ],
    "errorMessages ": [
                       {   "code ": 966,   "message ":  "Salah password atau email ",   "description ":  "Anda salah masukin password atau email, coba lagi dengan email dan password yang benar"  },
                       {   "code ": 967,   "message ":  "Salah password",   "description ":  "Andsa salah masukin password"  },
                       {   "code ": 901,   "message ":  "Salah Kunci API",   "description ":  "Kunci LoginRadius API itu salah atau tidak ada kuasa, tolong pakai kunci LoginRadius yang benar atau cek kunci APInya di LoginRadius accountmu."  }
                       ]
}

function setCookie(cname, cvalue, exdays) {

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {


    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];
        while (c.charAt(0) == ' ') {

            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);
        }

    }

    return "";
}



var query = getQueryParams(document.location.search);

if(query.customRedirect=="true"){
	setCookie('siteName',query.sitename,2);
	setCookie('customRedirect',query.customRedirect,2);
}

if (getCookie('promptPasswordOnSocialLogin') != "") {

    query.promptPasswordOnSocialLogin = getCookie('promptPasswordOnSocialLogin');
} else {

    setCookie('promptPasswordOnSocialLogin', query.promptPasswordOnSocialLogin, '2');
}

raasoption = {};
raasoption.apikey = query.apikey;
raasoption.appName = query.sitename;
raasoption.emailVerificationUrl = window.location.origin + window.location.pathname;
raasoption.forgotPasswordUrl = window.location.origin + window.location.pathname;
raasoption.V2Recaptcha = true;
raasoption.askEmailAlwaysForUnverified = true;


if (query.promptPasswordOnSocialLogin == "true") {

    raasoption.promptPasswordOnSocialLogin = true;
} else {

    raasoption.promptPasswordOnSocialLogin = false;
}


var reCaptchaSiteKey = query.recaptchakey;
if (reCaptchaSiteKey != "") {

    raasoption.V2RecaptchaSiteKey = query.recaptchakey;
}




var action = "";
if (query.action) {
    action = query.action;
    if (action == "slworaas") {
        setCookie('slworaas', 'true', '2');
    } else {
        setCookie('slworaas', 'false', '2');
    }
}


if (query.action) {
    action = query.action;
    if (action == "native") {
        setCookie('sociallogin', 'true', '2');
    } else {
        setCookie('sociallogin', 'false', '2');
    }
}

if (query.action) {
    action = query.action;
    if (action == "login") {
        setCookie('login', 'true', '2');
    } else {
        setCookie('login', 'false', '2');
    }
}

if (query.action) {
    action = query.action;
    if (action == "registration") {
        setCookie('registration', 'true', '2');
    } else {
        setCookie('registration', 'false', '2');
    }
}

if (query.action) {
    action = query.action;
    if (action == "social") {
        setCookie('social', 'true', '2');

    } else {
        setCookie('social', 'false', '2');
    }
}

var vtype = query.vtype;
var redirect = query.redirect;
var lrtoken;
if (query.denied_access)

{

    show_login()

}



if (action == 'emailnotverfied' && redirect == "true") {
    document.getElementsByTagName('BODY')[0].innerHTML = '<div class="verifyMsg">Please verify your email.</div>';
    // The page is redirecting, no action should be taken

} else if (redirect == "true") {

    document.getElementsByTagName('BODY')[0].innerHTML = '<div class="connectingMsg">Connecting ...</div>';
} else {

    var or = document.querySelector("#action-container");
    or.style.display = "block";
    if (vtype != null) {

        // vtype could be "emailverification" or "reset"
        if (vtype == "reset") {

            vtype = "resetpassword";
        }

        show_action_interface(vtype);
    } else if (action == "social") {

        // Only show the Social Login Interface
        or.style.display = "none";
        show_social_login_interface();
    } else if (action == "slworaas") {
        // Only show the Social Login Interface
        or.style.display = "none";
        show_social_login_interface();
        var delay = 500;
        setTimeout(function() {

            var popUfp = document.getElementById("registerLink");
            popUfp.style.display = "none";
        }, delay);

    } else if (action == "native") {
        show_action_interface('sociallogin');
    } else {

        or.style.borderTop = "0px solid #ccc";
        or.className = "action-container-hidden";
        if (action == "registration" || action == "login") {

            or.style.borderTop = "1px solid #ccc";
            or.className = "action-container";
            show_social_login_interface();
        }

        if (lr_get_token()) {
            // When the a user is logged in, check missing fields
            lrtoken = lr_get_token();
            show_action_interface('sociallogin');
        }



        show_action_interface(action);
    }

}



function getQueryParams(qs) {

    qs = qs.split('+').join(' ');
    var params = {},
        tokens, re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {

        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }



    return params;
}



function show_social_login_interface() {
    raasoption.templatename = "loginradiuscustom_tmpl_IOS";
    raasoption.hashTemplate = true;
    LoginRadiusRaaS.CustomInterface(".interfacecontainerdiv", raasoption);
}



function show_action_interface(action) {

    if (action == "emaillogin") {
        action = "login";
    }

    if (action != "") {

        $SL.util.ready(function() {

           LoginRadiusRaaS.$hooks.setFormCustomLabel(indo);
                       
            LoginRadiusRaaS.init(raasoption, action, function(response) {

                // On Success
                console.log(response);
                //console.log(action);
                switch (action) {

                    case "registration":

                       var email = document.getElementById("loginradius-raas-registration-emailid").value;
                       if(query.customRedirect=="true"){
						   window.location = raasoption.appName +"://registration?success=true&email=" + email ;
					   }else{
							window.location.href = window.location.origin + window.location.pathname + "?status=true&email=" + email + "&action=" + action + "&redirect=true";
					   }
					   break;
                    case "login":
                        console.log(response);
                        var lrtoken = lr_get_token();
                        var lruserid = sessionStorage.getItem("lr-user-uid");
                        
						if(query.customRedirect=="true"){
						   window.location = raasoption.appName +"://login?lrtoken=" + lrtoken + "&lraccountid=" + lruserid;
						}else{
							var destination_url = window.location.origin + window.location.pathname + "?lrtoken=" + lrtoken + "&lraccountid=" + lruserid + "&action=" + action + "&redirect=true";
						   
							window.location.href = destination_url;
					   }
                        break;
                    case 'forgotpassword':

                        var email = document.getElementById("loginradius-raas-forgotpassword-emailid").value;
                        if(query.customRedirect=="true"){
						    window.location = raasoption.appName +"://forgotpassword?success=true&email=" + email ;
						}else{
							window.location.href = window.location.origin + window.location.pathname + "?status=true&email=" + email + "&action=" + action + "&redirect=true";
                        }
						break;
                    case 'emailverification':

                        var notice_div = document.getElementById('notice');
                        notice_div.innerHTML = message.email_verified;
                        notice_div.className = 'success';
                        var fetchDataMessage = document.querySelector("#fetchDataMessage");
                        fetchDataMessage.style.display = "none";
                        break;
                    case 'resetpassword':

                        var notice_div = document.getElementById('notice');
                        notice_div.innerHTML = message.password_changed;
                        notice_div.className = 'success';
                        break;
                    case 'sociallogin':
					case 'social':
                        //console.log(response);
                        if (response.isPosted) {
                            if (getCookie('sociallogin') == 'true') {
                                action = 'emailnotverfied';

                            } else if (getCookie('login') == 'true') {
                                action = 'emailnotverfied';
                            } else if (getCookie('registration') == 'true') {
                                action = 'emailnotverfied';
                            } else if (getCookie('social') == 'true') {
                                action = 'emailnotverfied';
                            } else if (getCookie('slworaas') == 'true') {
                                action = 'emailnotverfied';
                            }
                        }
                        var lrtoken = lr_get_token();
                        var lruserid = sessionStorage.getItem("lr-user-uid");
						
						if(getCookie("customRedirect")=="true"){
						   window.location = getCookie("siteName") +"://sociallogin?lrtoken=" + lrtoken + "&lraccountid=" + lruserid;
						}else{
							var url = window.location.origin + window.location.pathname + "?lrtoken=" + lrtoken + "&action=" + action + "&redirect=true" + "&lraccountid=" + lruserid;
							window.location.href = url;
						}
                        break;
                    default:
                        alert('action not defined');
                        break;
                }
            }, function(errors) {

                // On Errors
                if (action == 'emailverification') {

                    console.log('verification failed');
                    var notice_div = document.getElementById('notice');
                    notice_div.classList.add('warning');
                    notice_div.innerHTML = errors[0].description ? errors[0].description : errors[0].message;
                }

                show_error(errors);
            }, "action-container");

            if (query.lrtoken) {
                RaaSloginradiushtml5passToken(query.lrtoken);
            }

        });
    }

}

function lr_get_token() {

    if (hash.get('lr-token')) {

        lrtoken = hash.get('lr-token');
    } else {

        lrtoken = sessionStorage.getItem("LRTokenKey");
    }

    return lrtoken;
}

function show_error(errors) {

    console.log(errors);
    var error_ul = document.getElementById("error-ul");
    error_ul.innerHTML = "";
    for (var i = 0; i < errors.length; i++) {

        console.log(errors[i].message);
        var element = "<li>" + (errors[i].description ? errors[i].description : errors[i].message) + "</li>";
        error_ul.insertAdjacentHTML('beforeend', element);
    }

}

function show_registration() {

    window.location.href = window.location.origin + window.location.pathname + "?apikey=" + raasoption.apikey + "&sitename=" + raasoption.appName + "&action=registration&V2RecaptchaSiteKey=" + query.recaptchakey + "&promptPasswordOnSocialLogin=" + query.promptPasswordOnSocialLogin+"&customRedirect="+query.customRedirect; 
}

function forgot_password() {

    window.location.href = window.location.origin + window.location.pathname + "?apikey=" + raasoption.apikey + "&sitename=" + raasoption.appName + "&action=forgotpassword&V2RecaptchaSiteKey=" + query.recaptchakey + "&promptPasswordOnSocialLogin=" + query.promptPasswordOnSocialLogin+"&customRedirect="+query.customRedirect;
}

function show_login() {
	
    window.location.href = window.location.origin + window.location.pathname + "?apikey=" + raasoption.apikey + "&sitename=" + raasoption.appName + "&action=login&V2RecaptchaSiteKey=" + query.recaptchakey + "&promptPasswordOnSocialLogin=" + query.promptPasswordOnSocialLogin+"&customRedirect="+query.customRedirect;
}

LoginRadiusRaaS.$hooks.socialLogin.onFormRender = function() {


    var popUp = document.querySelector("#registerLink");
    popUp.style.display = "none";
    var delay = 200;
    setTimeout(function() {

        var or = document.getElementsByClassName("lr-touch-frame")[0];
        var iDiv = document.createElement('div');
        iDiv.id = 'formRenderMessage';
        iDiv.className = 'formRenderMessage';
        //or.appendChild(iDiv);

        or.insertBefore(iDiv, or.firstChild);
        document.getElementById('formRenderMessage').innerHTML = 'Fill all field to complete the registration process';
        var fetchDataMessage = document.querySelector("#social-login-container");
        fetchDataMessage.style.display = "none";
    }, delay);
    //var checkDobId = document.getElementById('loginradius-raas-social-registration-birthdate');




    var intervalSocial = setInterval(function() {

        stopSocialInterval();
        try {

            new JsDatePick({
                useMode: 2,
                target: "loginradius-raas-social-registration-birthdate",
                dateFormat: "%m-%d-%Y",
                yearsRange: [1950, 2030],
                limitToToday: true,
            });
        } catch (err) {}



    }, 1000);

    function stopSocialInterval() {

        clearInterval(intervalSocial);
    }



};
var interval = setInterval(function() {



    stopInterval();
    try {



        new JsDatePick({
            useMode: 2,
            target: "loginradius-raas-registration-birthdate",
            dateFormat: "%m-%d-%Y",
            yearsRange: [1950, 2030],
            limitToToday: true,
        });
    } catch (err) {



    }




}, 2000);

function stopInterval() {

    clearInterval(interval);
}




var url = window.location.search;
url = url.replace("?", '');
if (action == 'registration') {

    var registerAcc = document.querySelector("#registerAcc");
    registerAcc.style.display = "none";
    var forgetPass = document.querySelector("#forgotPassword");
    forgetPass.style.display = "block";
    forgetPass.style.float = "right";
} else if (action == 'login') {

    var alreadyAccount = document.querySelector("#alreadyAccount");
	if(alreadyAccount!=null)
		alreadyAccount.style.display = "none";
    var forgetPass = document.querySelector("#forgotPassword");
    forgetPass.style.display = "block";
}



LoginRadiusRaaS.$hooks.setProcessHook(function() {

}, function() {

    var registerLink = document.querySelector("#registerLink");
    registerLink.style.display = "block";
    var divContent = document.getElementById("social-custom-container").innerHTML;
    if (divContent == "") {

        var registerLink = document.querySelector("#registerLink");
        registerLink.style.display = "none";
        var or = document.querySelector("#social-login-container");
        var iDiv = document.createElement('div');
        iDiv.id = 'fetchDataMessage';
        iDiv.className = 'fetchDataMessage';
        if (!document.getElementById("fetchDataMessage")) {

            or.insertBefore(iDiv, or.firstChild);
        }

        document.getElementById('fetchDataMessage').innerHTML = 'Connecting...';
        var divContent = document.getElementById("action-container").innerHTML;
        if (divContent != "") {

            setTimeout(function() {

                document.getElementById('fetchDataMessage').style.display = "none";
            }, 1);
        }

    }

});
if (vtype == 'emailverification')

{

    var actionContainer = document.querySelector("#action-container");
    actionContainer.style.display = "none";
}

if (action == 'social') {
    var registerAcc = document.querySelector("#registerAcc");
    registerAcc.style.float = "right";
}

if (action == 'forgotpassword' && redirect == "true") {

    // The page is redirecting, no action should be taken

    var forgetInterval = setInterval(function() {
        stopForgetInterval();
        try {

            var forgotPage = document.getElementsByClassName("connectingMsg")[0];
            forgotPage.style.display = "none";
        } catch (err) {

        }

    }, 1);

    function stopForgetInterval() {

        clearInterval(forgetInterval);
    }



    document.getElementsByTagName('BODY')[0].innerHTML = '<div class="forgetMsg">Please check your email address. </div>';
}
