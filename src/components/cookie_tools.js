/* eslint-disable no-var */
const Cookies = {
  setCookie: function func(key, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000 * days));
    // eslint-disable-next-line quotes
    const str = key.concat('=').concat(value).concat('; expires=').concat(d.toGMTString())
      .concat('; path=/;');
    document.cookie = str;
  },
  getCookie: function func(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return undefined;
  },
  deleteCookie: function func(name) {
    this.setCookie(name, '', -1);
  },
};

export default Cookies;
