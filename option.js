
var option = {};
option.apikey = "94dd8825-669d-44f3-ae1a-5f0828016ae6";
option.appName = "http://lr-candidate-demo3.hub.loginradius.com/";
option.V2Recaptcha = true;
option.inFormvalidationMessage = true;
option.enableLoginOnEmailVerification = true;
/** You can directly bind it with the correct url, the string operation is just to dynamically bind them**/
var path = window.location.href;
option.emailVerificationUrl = path.replace(path.substr(path.lastIndexOf('/')), "/email-verification.html");
option.forgotPasswordUrl = path.replace(path.substr(path.lastIndexOf('/')), "/reset-password.html");
