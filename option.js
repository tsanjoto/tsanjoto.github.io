
var option = {};
option.apikey = "aad1d378-8613-429b-b728-bb2550e453f3";
option.appName = "lr-thompson";
//"http://lr-thompson.hub.loginradius.com/";
option.V2Recaptcha = false;
option.inFormvalidationMessage = true;
option.enableLoginOnEmailVerification = true;
option.enableRememberMe = true;
option.updateSecurityQuestion = "true";
option.resetPasswordBySecurityQuestion = "true";
option.container = "resetPasswordBySecQ-container";
/** You can directly bind it with the correct url, the string operation is just to dynamically bind them**/
var path = window.location.href;
option.emailVerificationUrl = path.replace(path.substr(path.lastIndexOf('/')), "/email-verification.html");
option.forgotPasswordUrl = path.replace(path.substr(path.lastIndexOf('/')), "/reset-password.html");
