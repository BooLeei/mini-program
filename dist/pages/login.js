'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _md5Es = require('./../npm/md5-es/build/md5-es.min.js');

var _md5Es2 = _interopRequireDefault(_md5Es);

var _storage = require('./../utils/storage.js');

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
    _inherits(Login, _wepy$page);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '登录',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.data = {
            loading: false,
            invalid: '',
            type: 1,
            height: 0,
            loginCode: false,
            regCode: false,
            loginCount: '获取',
            regCount: '获取',
            login: {
                tel: '',
                password: ''
            },
            phone: {
                tel: '',
                code: ''
            },
            reg: {
                tel: '',
                password: '',
                code: ''
            }
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            toggleType: function toggleType(type) {
                this.type = Number.parseInt(type);
            },
            checkAccount: function checkAccount(e) {
                var _this2 = this;

                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(e.detail.value)) {
                    return false;
                }
                this.request.Get({
                    account: this.reg.tel,
                    userType: '0,1'
                }, '/User/checkAccount').then(function (_ref2) {
                    var data = _ref2.data;

                    if (!data.checkAccountResult) {
                        _this2.toast({ content: '该手机号已注册，请直接登录' });
                    }
                });
            },
            getAuthCode: function getAuthCode(type) {
                var _this3 = this;

                if (this.regCode || this.loginCode) {
                    this.toast({ content: '请不要频繁获取验证码' });
                    return false;
                }
                var count = 60;
                var self = this;
                if (Number.parseInt(type) === 2) {
                    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.tel)) {
                        this.toast({ content: '请输入正确的手机号码' });
                        return false;
                    }
                    this.getCode(this.phone.tel, 7).then(function (ret) {
                        _this3.loginCode = true;
                        _this3.loginCount = '\u5269\u4F59' + count + 'S';
                        setTimeout(function inner() {
                            if (count === 1) {
                                self.loginCode = false;
                                self.loginCount = '获取';
                                self.$apply();
                                return false;
                            }
                            count--;
                            self.loginCount = '\u5269\u4F59' + count + 'S';
                            self.$apply();
                            setTimeout(inner, 1000);
                        }, 1000);
                    }).catch(function (err) {});
                } else {
                    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.reg.tel)) {
                        this.toast({ content: '请输入正确的手机号码' });
                        return false;
                    }
                    this.getCode(this.reg.tel, 1).then(function (ret) {
                        _this3.regCode = true;
                        _this3.regCount = '\u5269\u4F59' + count + 'S';
                        setTimeout(function inner() {
                            if (count === 1) {
                                self.regCode = false;
                                self.regCount = '获取';
                                self.$apply();
                                return false;
                            }
                            count--;
                            self.regCount = '\u5269\u4F59' + count + 'S';
                            self.$apply();
                            setTimeout(inner, 1000);
                        }, 1000);
                    });
                }
            },
            bindLoginTel: function bindLoginTel(e) {
                this.login.tel = e.detail.value;
            },
            bindLoginPassword: function bindLoginPassword(e) {
                this.login.password = e.detail.value;
            },
            bindPhoneTel: function bindPhoneTel(e) {
                this.phone.tel = e.detail.value;
            },
            bindPhoneCode: function bindPhoneCode(e) {
                this.phone.code = e.detail.value;
            },
            bindRegTel: function bindRegTel(e) {
                this.reg.tel = e.detail.value;
            },
            bindRegPassword: function bindRegPassword(e) {
                this.reg.password = e.detail.value;
            },
            bindRegCode: function bindRegCode(e) {
                this.reg.code = e.detail.value;
            },
            normalLogin: function normalLogin() {
                if (this.login.tel == '') {
                    this.invalid = 'a1';
                    this.toast({ content: '请输入手机号' });
                    return false;
                }
                if (this.login.password == '') {
                    this.invalid = 'a2';
                    this.toast({ content: '请输入密码' });
                    return false;
                }
                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.login.tel)) {
                    this.invalid = 'a1';
                    this.toast({ content: '请输入正确格式的手机号' });
                    return false;
                }
                this.request.Get({
                    account: this.login.tel,
                    passwd: _md5Es2.default.hash(this.login.password),
                    userType: '0,1',
                    openId: "",
                    accessToken: ""
                }, '/User/login').then(function (_ref3) {
                    var data = _ref3.data;

                    (0, _log.log)(data);
                    (0, _storage.Set)('userId', data.id);
                    (0, _storage.Set)('userImg', data.headerImageFull).then(function () {
                        if (data.userInfoFinishType != 0) {
                            _wepy2.default.navigateTo({
                                url: 'simpleResume?id=' + data.id
                            });
                        } else {
                            _wepy2.default.reLaunch({
                                url: 'mine?userId=' + data.id
                            });
                        }
                    });
                });
            },
            codeLogin: function codeLogin() {
                if (this.phone.tel == '') {
                    this.invalid = 'b1';
                    this.toast({ content: '请输入手机号' });
                    return false;
                }
                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone.tel)) {
                    this.invalid = 'b1';
                    this.toast({ content: '请输入正确格式的手机号' });
                    return false;
                }
                if (this.phone.code == '') {
                    this.invalid = 'b2';
                    this.toast({ content: '请输入验证码' });
                    return false;
                }
                this.request.Get({
                    account: this.phone.tel,
                    code: this.phone.code,
                    userType: '0,1',
                    openId: '',
                    accessToken: ''
                }, '/User/login').then(function (_ref4) {
                    var data = _ref4.data;

                    (0, _log.log)(data);
                    (0, _storage.Set)('userId', data.id);
                    (0, _storage.Set)('userImg', data.headerImageFull).then(function () {
                        if (data.userInfoFinishType != 0) {
                            _wepy2.default.navigateTo({
                                url: 'simpleResume?id=' + data.id
                            });
                        } else {
                            _wepy2.default.relaunch({
                                url: 'mine?userId=' + data.id
                            });
                        }
                    });
                });
            },
            regesiter: function regesiter() {
                if (this.reg.tel == '') {
                    this.invalid = 'c1';
                    this.toast({ content: '请输入手机号' });
                    return false;
                }
                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.reg.tel)) {
                    this.invalid = 'c1';
                    this.toast({ content: '请输入正确格式的手机号' });
                    return false;
                }
                if (this.reg.password == '') {
                    this.invalid = 'c2';
                    this.toast({ content: '请输入密码' });
                    return false;
                }
                // if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.reg.passsword))) {
                //     this.invalid = 'c2'
                //     this.toast({content: '请输入6-16位字母+数字组合的密码'})
                //     return false
                // }
                if (this.reg.code == '') {
                    this.invalid = 'c3';
                    this.toast({ content: '请输入验证码' });
                    return false;
                }
                this.request.Get({
                    tel: this.reg.tel,
                    passwdTel: _md5Es2.default.hash(this.reg.password),
                    code: this.reg.code,
                    userType: 1,
                    companyType: 0,
                    openId: '',
                    accessToken: ''
                }, '/User/addUser').then(function (_ref5) {
                    var data = _ref5.data;

                    (0, _log.log)(data);
                    (0, _storage.Set)('userId', data.id).then(function () {
                        _wepy2.default.redirectTo({
                            url: 'simpleResume?id=' + data.id
                        });
                    });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'getCode',
        value: function getCode(phone) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

            return this.request.Get({
                codeMethod: "2",
                tel: phone,
                useType: type
            }, '/Code/getCode');
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this4 = this;

            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    _this4.height = res.windowHeight;
                    _this4.$apply();
                }
            });
        }
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwiaW52YWxpZCIsInR5cGUiLCJoZWlnaHQiLCJsb2dpbkNvZGUiLCJyZWdDb2RlIiwibG9naW5Db3VudCIsInJlZ0NvdW50IiwibG9naW4iLCJ0ZWwiLCJwYXNzd29yZCIsInBob25lIiwiY29kZSIsInJlZyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9nZ2xlVHlwZSIsIk51bWJlciIsInBhcnNlSW50IiwiY2hlY2tBY2NvdW50IiwiZSIsInRlc3QiLCJkZXRhaWwiLCJ2YWx1ZSIsIkdldCIsImFjY291bnQiLCJ1c2VyVHlwZSIsInRoZW4iLCJjaGVja0FjY291bnRSZXN1bHQiLCJ0b2FzdCIsImNvbnRlbnQiLCJnZXRBdXRoQ29kZSIsImNvdW50Iiwic2VsZiIsImdldENvZGUiLCJzZXRUaW1lb3V0IiwiaW5uZXIiLCIkYXBwbHkiLCJjYXRjaCIsImJpbmRMb2dpblRlbCIsImJpbmRMb2dpblBhc3N3b3JkIiwiYmluZFBob25lVGVsIiwiYmluZFBob25lQ29kZSIsImJpbmRSZWdUZWwiLCJiaW5kUmVnUGFzc3dvcmQiLCJiaW5kUmVnQ29kZSIsIm5vcm1hbExvZ2luIiwicGFzc3dkIiwiaGFzaCIsIm9wZW5JZCIsImFjY2Vzc1Rva2VuIiwiaWQiLCJoZWFkZXJJbWFnZUZ1bGwiLCJ1c2VySW5mb0ZpbmlzaFR5cGUiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVMYXVuY2giLCJjb2RlTG9naW4iLCJyZWxhdW5jaCIsInJlZ2VzaXRlciIsInBhc3N3ZFRlbCIsImNvbXBhbnlUeXBlIiwicmVkaXJlY3RUbyIsIiRpbnZva2UiLCJjb2RlTWV0aG9kIiwidXNlVHlwZSIsImdldFN5c3RlbUlu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VjVCLElBQVUsU0FBVkEsSUFBVTs7QUFDZCxrQ0FBSUEsSUFBSjtBQUNBLHNDQUFJLFFBQUosRUFBY0EsS0FBS29ELEVBQW5CLEVBQ0N4QixJQURELENBQ00sWUFBTTtBQUNSLHVDQUFLbUMsVUFBTCxDQUFnQjtBQUNaUCxpQ0FBSyxxQkFBcUJ4RCxLQUFLb0Q7QUFEbkIseUJBQWhCO0FBR0gscUJBTEQ7QUFNSCxpQkFqQkQ7QUFrQkg7QUF4TkssUzs7Ozs7Z0NBeENRO0FBQUEsZ0JBQVhwRCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2QsaUJBQUtnRSxPQUFMLENBQWEsT0FBYixFQUFzQixXQUF0QixFQUFtQ2hFLElBQW5DO0FBQ0g7OztnQ0E4QlFZLEssRUFBaUI7QUFBQSxnQkFBVlQsSUFBVSx1RUFBSCxDQUFHOztBQUN0QixtQkFBTyxLQUFLSixPQUFMLENBQWEwQixHQUFiLENBQWlCO0FBQ3BCd0MsNEJBQVcsR0FEUztBQUVwQnZELHFCQUFLRSxLQUZlO0FBR3BCc0QseUJBQVMvRDtBQUhXLGFBQWpCLEVBSUosZUFKSSxDQUFQO0FBS0g7OztpQ0E2TlM7QUFBQTs7QUFDTiwyQkFBS2dFLGFBQUwsQ0FBbUI7QUFDZkMseUJBQVMsc0JBQU87QUFDWiwyQkFBS2hFLE1BQUwsR0FBY2lFLElBQUlDLFlBQWxCO0FBQ0EsMkJBQUtoQyxNQUFMO0FBQ0g7QUFKYyxhQUFuQjtBQU1IOzs7O0VBblI4QixlQUFLaUMsSTs7a0JBQW5COUUsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IG1kNSBmcm9tICdtZDUtZXMnXHJcbmltcG9ydCB7U2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlLmpzJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55m75b2VJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBpbnZhbGlkOiAnJyxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICBsb2dpbkNvZGU6IGZhbHNlLFxyXG4gICAgICAgIHJlZ0NvZGU6IGZhbHNlLFxyXG4gICAgICAgIGxvZ2luQ291bnQ6ICfojrflj5YnLFxyXG4gICAgICAgIHJlZ0NvdW50OiAn6I635Y+WJyxcclxuICAgICAgICBsb2dpbjoge1xyXG4gICAgICAgICAgICB0ZWw6ICcnLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lOiB7XHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIGNvZGU6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWc6IHtcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICAgICAgICBjb2RlOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29kZSAocGhvbmUsIHR5cGUgPSA3KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICBjb2RlTWV0aG9kOlwiMlwiLFxyXG4gICAgICAgICAgICB0ZWw6IHBob25lLFxyXG4gICAgICAgICAgICB1c2VUeXBlOiB0eXBlXHJcbiAgICAgICAgfSwgJy9Db2RlL2dldENvZGUnKVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlVHlwZSAodHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBOdW1iZXIucGFyc2VJbnQodHlwZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWNjb3VudCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdChlLmRldGFpbC52YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMucmVnLnRlbCxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOiAnMCwxJ1xyXG4gICAgICAgICAgICB9LCAnL1VzZXIvY2hlY2tBY2NvdW50JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmNoZWNrQWNjb3VudFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor6XmiYvmnLrlj7flt7Lms6jlhozvvIzor7fnm7TmjqXnmbvlvZUnfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEF1dGhDb2RlICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZ0NvZGUgfHwgdGhpcy5sb2dpbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fkuI3opoHpopHnuYHojrflj5bpqozor4HnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDYwXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnBob25lLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggSd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2RlKHRoaXMucGhvbmUudGVsLCA3KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQ29kZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQ291bnQgPSBg5Ymp5L2ZJHtjb3VudH1TYFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gaW5uZXIgKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db2RlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db3VudCA9ICfojrflj5YnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudC0tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChpbm5lciwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHt9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvLnRlc3QodGhpcy5yZWcudGVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CBJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvZGUodGhpcy5yZWcudGVsLCAxKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ0NvZGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdDb3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiBpbm5lciAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWdDb2RlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVnQ291bnQgPSAn6I635Y+WJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQtLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZ0NvdW50ID0gYOWJqeS9mSR7Y291bnR9U2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGlubmVyLCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTG9naW5UZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZExvZ2luUGFzc3dvcmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5wYXNzd29yZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmVUZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZS50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBob25lQ29kZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ1RlbCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ1Bhc3N3b3JkIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnBhc3N3b3JkID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRSZWdDb2RlIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9ybWFsTG9naW4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpbi50ZWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdhMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luLnBhc3N3b3JkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYTInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5a+G56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLmxvZ2luLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYTEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu5qC85byP55qE5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMubG9naW4udGVsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dkOiBtZDUuaGFzaCh0aGlzLmxvZ2luLnBhc3N3b3JkKSxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOicwLDEnLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IFwiXCJcclxuICAgICAgICAgICAgfSwgJy9Vc2VyL2xvZ2luJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3VzZXJJZCcsIGRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3VzZXJJbWcnLCBkYXRhLmhlYWRlckltYWdlRnVsbClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2VySW5mb0ZpbmlzaFR5cGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnc2ltcGxlUmVzdW1lP2lkPScgKyBkYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdtaW5lP3VzZXJJZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlTG9naW4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5waG9uZS50ZWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdiMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KHRoaXMucGhvbmUudGVsKSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdiMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmraPnoa7moLzlvI/nmoTmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBob25lLmNvZGUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdiMidcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXpqozor4HnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudDogdGhpcy5waG9uZS50ZWwsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnBob25lLmNvZGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTonMCwxJyxcclxuICAgICAgICAgICAgICAgIG9wZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogJydcclxuICAgICAgICAgICAgfSwgJy9Vc2VyL2xvZ2luJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3VzZXJJZCcsIGRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3VzZXJJbWcnLCBkYXRhLmhlYWRlckltYWdlRnVsbClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2VySW5mb0ZpbmlzaFR5cGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnc2ltcGxlUmVzdW1lP2lkPScgKyBkYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZWxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdtaW5lP3VzZXJJZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWdlc2l0ZXIgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWcudGVsID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYzEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnJlZy50ZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2MxJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehruagvOW8j+eahOaJi+acuuWPtyd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVnLnBhc3N3b3JkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYzInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5a+G56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoISgvXig/IVswLTldKyQpKD8hW2EtekEtWl0rJClbMC05QS1aYS16XXs2LDE2fSQvLnRlc3QodGhpcy5yZWcucGFzc3N3b3JkKSkpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaW52YWxpZCA9ICdjMidcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaU2LTE25L2N5a2X5q+NK+aVsOWtl+e7hOWQiOeahOWvhueggSd9KVxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVnLmNvZGUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdjMydcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXpqozor4HnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgdGVsOiB0aGlzLnJlZy50ZWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd2RUZWw6IG1kNS5oYXNoKHRoaXMucmVnLnBhc3N3b3JkKSxcclxuICAgICAgICAgICAgICAgIGNvZGU6IHRoaXMucmVnLmNvZGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlUeXBlOiAwLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiAnJ1xyXG4gICAgICAgICAgICB9LCAnL1VzZXIvYWRkVXNlcicpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd1c2VySWQnLCBkYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3NpbXBsZVJlc3VtZT9pZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHRcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19