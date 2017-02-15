// Source: https://medium.com/@codingfriend/how-to-setup-email-verification-in-feathersjs-72ce9882e744#.nfe2lnlci

const path = require('path');
const jade = require('jade');

const isProd = process.env.NODE_ENV === 'production';
const returnEmail = process.env.COMPLAINT_EMAIL;


module.exports = function (app) {

  /**
   * Build email verification link
   * @param type
   * @param hash
   * @returns {string} verification link (e.g.: http://<hostname>:<port>/login/<type>/<hash>)
   */
  function getLink(type, hash) {
    const port = (app.get('clientPort') === '80' || isProd) ? '' : ':' + app.get('clientPort');
    const host = (app.get('clientHost') === 'HOST') ? 'localhost' : app.get('clientHost');
    let protocol = (app.get('protocol') === 'PROTOCOL') ? 'http' : app.get('protocol');
    protocol += "://";

    return `${protocol}${host}${port}/login/${type}/${hash}`;
  }


  /**
   * Send an email
   * @param email
   * @returns {Promise.<T>|Promise}
   */
  function sendEmail(email) {
    return app.service('emails')
      .create(email)
      .then(function (result) {
        console.log('Sent email', result)
      }).catch(err => {
        console.log('Error sending email', err)
      })
  }

  return {
    notifier: function (type, user, notifierOptions) {
      console.log(`-- Preparing email for ${type}`);

      let hashLink;
      let email;
      const emailAccountTemplatesPath = path.join(app.get('src')||'.', 'email-templates', 'account');
      let templatePath;
      let compiledHTML;

      switch (type) {
        case 'sendVerifySignup': // inform that user's email is now confirmed
          hashLink = getLink('verify', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };
          return sendEmail(email);
          break;

        case 'resendVerifySignup': // send another email with link for verifying user's email address
          hashLink = getLink('verify', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };
          console.log('VerifyToken: '+user.verifyToken);
          console.log('USER: '+JSON.stringify(user));
          console.log('RECIPIENTS: '+ email.to);
          return sendEmail(email);
          break;

        case 'verifySignup': // inform that user's email is now confirmed
          hashLink = getLink('verify', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'confirm-email.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Account confirmed',
            html: compiledHTML
          };
          return sendEmail(email);
          break;


        case 'sendResetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken);
          templatePath = path.join(emailAccountTemplatesPath, 'reset-password.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Reset Password',
            html: compiledHTML
          };
          return sendEmail(email);
          break;

        case 'resetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken);
          templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Your password was reset',
            html: compiledHTML
          };
          return sendEmail(email);
          break;

        case 'passwordChange':
          templatePath = path.join(emailAccountTemplatesPath, 'password-change.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            returnEmail
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Your password was changed',
            html: compiledHTML
          };
          return sendEmail(email);
          break;

        case 'identityChange':
          hashLink = getLink('verifyChanges', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'identity-change.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail,
            changes: user.verifyChanges
          });
          email = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'Your account was changed. Please verify the changes',
            html: compiledHTML
          };
          return sendEmail(email);
          break;

        default:
          break
      }
    }
  }
};