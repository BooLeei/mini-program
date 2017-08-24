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
                    (0, _storage.Set)('userImg', data.headerImageFull);
                    (0, _storage.Set)('finishType', data.userInfoFinishType).then(function () {
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
                    (0, _storage.Set)('userImg', data.headerImageFull);
                    (0, _storage.Set)('finishType', data.userInfoFinishType).then(function () {
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
                    (0, _storage.Set)('userId', data.id);
                    (0, _storage.Set)('finishType', 1).then(function () {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwiaW52YWxpZCIsInR5cGUiLCJoZWlnaHQiLCJsb2dpbkNvZGUiLCJyZWdDb2RlIiwibG9naW5Db3VudCIsInJlZ0NvdW50IiwibG9naW4iLCJ0ZWwiLCJwYXNzd29yZCIsInBob25lIiwiY29kZSIsInJlZyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9nZ2xlVHlwZSIsIk51bWJlciIsInBhcnNlSW50IiwiY2hlY2tBY2NvdW50IiwiZSIsInRlc3QiLCJkZXRhaWwiLCJ2YWx1ZSIsIkdldCIsImFjY291bnQiLCJ1c2VyVHlwZSIsInRoZW4iLCJjaGVja0FjY291bnRSZXN1bHQiLCJ0b2FzdCIsImNvbnRlbnQiLCJnZXRBdXRoQ29kZSIsImNvdW50Iiwic2VsZiIsImdldENvZGUiLCJzZXRUaW1lb3V0IiwiaW5uZXIiLCIkYXBwbHkiLCJjYXRjaCIsImJpbmRMb2dpblRlbCIsImJpbmRMb2dpblBhc3N3b3JkIiwiYmluZFBob25lVGVsIiwiYmluZFBob25lQ29kZSIsImJpbmRSZWdUZWwiLCJiaW5kUmVnUGFzc3dvcmQiLCJiaW5kUmVnQ29kZSIsIm5vcm1hbExvZ2luIiwicGFzc3dkIiwiaGFzaCIsIm9wZW5JZCIsImFjY2Vzc1Rva2VuIiwiaWQiLCJoZWFkZXJJbWFnZUZ1bGwiLCJ1c2VySW5mb0ZpbmlzaFR5cGUiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVMYXVuY2giLCJjb2RlTG9naW4iLCJyZWxhdW5jaCIsInJlZ2VzaXRlciIsInBhc3N3ZFRlbCIsImNvbXBhbnlUeXBlIiwicmVkaXJlY3RUbyIsIiRpbnZva2UiLCJjb2RlTWV0aG9kIiwidXNlVHlwZSIsImdldFN5c3RlbUlu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QkFBUSxFQU5LO0FBT2JDLGlDQUFhO0FBUEEsaUJBQWpCLEVBUUcsZUFSSCxFQVNDdkIsSUFURCxDQVNNLGlCQUFZO0FBQUEsd0JBQVY1QixJQUFVLFNBQVZBLElBQVU7O0FBQ2Qsa0NBQUlBLElBQUo7QUFDQSxzQ0FBSSxRQUFKLEVBQWNBLEtBQUtvRCxFQUFuQjtBQUNBLHNDQUFJLFlBQUosRUFBa0IsQ0FBbEIsRUFDQ3hCLElBREQsQ0FDTSxZQUFNO0FBQ1IsdUNBQUttQyxVQUFMLENBQWdCO0FBQ1pQLGlDQUFLLHFCQUFxQnhELEtBQUtvRDtBQURuQix5QkFBaEI7QUFHSCxxQkFMRDtBQU1ILGlCQWxCRDtBQW1CSDtBQTNOSyxTOzs7OztnQ0F4Q1E7QUFBQSxnQkFBWHBELElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS2dFLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DaEUsSUFBbkM7QUFDSDs7O2dDQThCUVksSyxFQUFpQjtBQUFBLGdCQUFWVCxJQUFVLHVFQUFILENBQUc7O0FBQ3RCLG1CQUFPLEtBQUtKLE9BQUwsQ0FBYTBCLEdBQWIsQ0FBaUI7QUFDcEJ3Qyw0QkFBVyxHQURTO0FBRXBCdkQscUJBQUtFLEtBRmU7QUFHcEJzRCx5QkFBUy9EO0FBSFcsYUFBakIsRUFJSixlQUpJLENBQVA7QUFLSDs7O2lDQWdPUztBQUFBOztBQUNOLDJCQUFLZ0UsYUFBTCxDQUFtQjtBQUNmQyx5QkFBUyxzQkFBTztBQUNaLDJCQUFLaEUsTUFBTCxHQUFjaUUsSUFBSUMsWUFBbEI7QUFDQSwyQkFBS2hDLE1BQUw7QUFDSDtBQUpjLGFBQW5CO0FBTUg7Ozs7RUF0UjhCLGVBQUtpQyxJOztrQkFBbkI5RSxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgbWQ1IGZyb20gJ21kNS1lcydcclxuaW1wb3J0IHtTZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UuanMnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnmbvlvZUnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGludmFsaWQ6ICcnLFxyXG4gICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIGxvZ2luQ29kZTogZmFsc2UsXHJcbiAgICAgICAgcmVnQ29kZTogZmFsc2UsXHJcbiAgICAgICAgbG9naW5Db3VudDogJ+iOt+WPlicsXHJcbiAgICAgICAgcmVnQ291bnQ6ICfojrflj5YnLFxyXG4gICAgICAgIGxvZ2luOiB7XHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGhvbmU6IHtcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgY29kZTogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZzoge1xyXG4gICAgICAgICAgICB0ZWw6ICcnLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXHJcbiAgICAgICAgICAgIGNvZGU6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2RlIChwaG9uZSwgdHlwZSA9IDcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIGNvZGVNZXRob2Q6XCIyXCIsXHJcbiAgICAgICAgICAgIHRlbDogcGhvbmUsXHJcbiAgICAgICAgICAgIHVzZVR5cGU6IHR5cGVcclxuICAgICAgICB9LCAnL0NvZGUvZ2V0Q29kZScpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b2dnbGVUeXBlICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IE51bWJlci5wYXJzZUludCh0eXBlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tBY2NvdW50IChlKSB7XHJcbiAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KGUuZGV0YWlsLnZhbHVlKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudDogdGhpcy5yZWcudGVsLFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6ICcwLDEnXHJcbiAgICAgICAgICAgIH0sICcvVXNlci9jaGVja0FjY291bnQnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuY2hlY2tBY2NvdW50UmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivpeaJi+acuuWPt+W3suazqOWGjO+8jOivt+ebtOaOpeeZu+W9lSd9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0QXV0aENvZGUgKHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVnQ29kZSB8fCB0aGlzLmxvZ2luQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+S4jeimgemikee5geiOt+WPlumqjOivgeeggSd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gNjBcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KHRoaXMucGhvbmUudGVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CBJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvZGUodGhpcy5waG9uZS50ZWwsIDcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5Db2RlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5Db3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiBpbm5lciAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbkNvZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbkNvdW50ID0gJ+iOt+WPlidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LS1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbkNvdW50ID0gYOWJqeS9mSR7Y291bnR9U2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGlubmVyLCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge30pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnJlZy50ZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7fnoIEnfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29kZSh0aGlzLnJlZy50ZWwsIDEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnQ29kZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ0NvdW50ID0gYOWJqeS9mSR7Y291bnR9U2BcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGlubmVyICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZ0NvZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWdDb3VudCA9ICfojrflj5YnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudC0tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVnQ291bnQgPSBg5Ymp5L2ZJHtjb3VudH1TYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaW5uZXIsIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRMb2dpblRlbCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTG9naW5QYXNzd29yZCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnBhc3N3b3JkID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaG9uZVRlbCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmVDb2RlIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmUuY29kZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUmVnVGVsIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUmVnUGFzc3dvcmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWcucGFzc3dvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ0NvZGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWcuY29kZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBub3JtYWxMb2dpbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luLnRlbCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2ExJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeaJi+acuuWPtyd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9naW4ucGFzc3dvcmQgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdhMidcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXlr4bnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KHRoaXMubG9naW4udGVsKSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdhMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmraPnoa7moLzlvI/nmoTmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudDogdGhpcy5sb2dpbi50ZWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd2Q6IG1kNS5oYXNoKHRoaXMubG9naW4ucGFzc3dvcmQpLFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6JzAsMScsXHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogXCJcIlxyXG4gICAgICAgICAgICB9LCAnL1VzZXIvbG9naW4nKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIFNldCgndXNlcklkJywgZGF0YS5pZClcclxuICAgICAgICAgICAgICAgIFNldCgndXNlckltZycsIGRhdGEuaGVhZGVySW1hZ2VGdWxsKVxyXG4gICAgICAgICAgICAgICAgU2V0KCdmaW5pc2hUeXBlJywgZGF0YS51c2VySW5mb0ZpbmlzaFR5cGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlckluZm9GaW5pc2hUeXBlICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3NpbXBsZVJlc3VtZT9pZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnbWluZT91c2VySWQ9JyArIGRhdGEuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZUxvZ2luICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGhvbmUudGVsID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnBob25lLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu5qC85byP55qE5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5waG9uZS5jb2RlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl6aqM6K+B56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMucGhvbmUudGVsLFxyXG4gICAgICAgICAgICAgICAgY29kZTogdGhpcy5waG9uZS5jb2RlLFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6JzAsMScsXHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46ICcnXHJcbiAgICAgICAgICAgIH0sICcvVXNlci9sb2dpbicpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd1c2VySWQnLCBkYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd1c2VySW1nJywgZGF0YS5oZWFkZXJJbWFnZUZ1bGwpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ2ZpbmlzaFR5cGUnLCBkYXRhLnVzZXJJbmZvRmluaXNoVHlwZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2VySW5mb0ZpbmlzaFR5cGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnc2ltcGxlUmVzdW1lP2lkPScgKyBkYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZWxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdtaW5lP3VzZXJJZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWdlc2l0ZXIgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWcudGVsID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYzEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnJlZy50ZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2MxJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehruagvOW8j+eahOaJi+acuuWPtyd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVnLnBhc3N3b3JkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYzInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5a+G56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoISgvXig/IVswLTldKyQpKD8hW2EtekEtWl0rJClbMC05QS1aYS16XXs2LDE2fSQvLnRlc3QodGhpcy5yZWcucGFzc3N3b3JkKSkpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaW52YWxpZCA9ICdjMidcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaU2LTE25L2N5a2X5q+NK+aVsOWtl+e7hOWQiOeahOWvhueggSd9KVxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVnLmNvZGUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdjMydcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXpqozor4HnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgdGVsOiB0aGlzLnJlZy50ZWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd2RUZWw6IG1kNS5oYXNoKHRoaXMucmVnLnBhc3N3b3JkKSxcclxuICAgICAgICAgICAgICAgIGNvZGU6IHRoaXMucmVnLmNvZGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlUeXBlOiAwLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiAnJ1xyXG4gICAgICAgICAgICB9LCAnL1VzZXIvYWRkVXNlcicpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd1c2VySWQnLCBkYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgU2V0KCdmaW5pc2hUeXBlJywgMSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdzaW1wbGVSZXN1bWU/aWQ9JyArIGRhdGEuaWRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==