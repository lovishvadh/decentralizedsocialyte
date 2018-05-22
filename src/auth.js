import { getPassword } from "./utils/web3";
export default {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, res => {
      if (res.authenticated) {
        localStorage.token = res.token;
        localStorage.username = res.user;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    delete localStorage.username;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  onChange() {}
};

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    getPassword(email).then(res => {
      if (pass === res) {
        cb({
          authenticated: true,
          token: Math.random()
            .toString(36)
            .substring(7),
          user: email
        });
      } else {
        cb({ authenticated: false });
      }
    });
  }, 0);
}
