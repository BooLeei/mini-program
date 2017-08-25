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
                var _this4 = this;

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

                    Promise.all([(0, _storage.Set)('userId', data.id), (0, _storage.Set)('userImg', data.headerImageFull), (0, _storage.Set)('finishType', data.userInfoFinishType)]).then(function () {
                        if (data.userInfoFinishType != 0) {
                            _wepy2.default.navigateTo({
                                url: 'simpleResume?id=' + data.id
                            });
                        } else {
                            _this4.$parent.keepSocket(data.id);
                            _wepy2.default.reLaunch({
                                url: 'mine?userId=' + data.id
                            });
                        }
                    });
                });
            },
            codeLogin: function codeLogin() {
                var _this5 = this;

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

                    Promise.all([(0, _storage.Set)('userId', data.id), (0, _storage.Set)('userImg', data.headerImageFull), (0, _storage.Set)('finishType', data.userInfoFinishType)]).then(function () {
                        if (data.userInfoFinishType != 0) {
                            _wepy2.default.navigateTo({
                                url: 'simpleResume?id=' + data.id
                            });
                        } else {
                            _this5.$parent.keepSocket(data.id);
                            _wepy2.default.reLaunch({
                                url: 'mine?userId=' + data.id
                            });
                        }
                    });
                });
            },
            regesiter: function regesiter() {
                var _this6 = this;

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

                    Promise.all([(0, _storage.Set)('userId', data.id), (0, _storage.Set)('finishType', 1)]).then(function () {
                        _this6.$parent.keepSocket(data.id);
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
            var _this7 = this;

            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    _this7.height = res.windowHeight;
                    _this7.$apply();
                }
            });
        }
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwiaW52YWxpZCIsInR5cGUiLCJoZWlnaHQiLCJsb2dpbkNvZGUiLCJyZWdDb2RlIiwibG9naW5Db3VudCIsInJlZ0NvdW50IiwibG9naW4iLCJ0ZWwiLCJwYXNzd29yZCIsInBob25lIiwiY29kZSIsInJlZyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9nZ2xlVHlwZSIsIk51bWJlciIsInBhcnNlSW50IiwiY2hlY2tBY2NvdW50IiwiZSIsInRlc3QiLCJkZXRhaWwiLCJ2YWx1ZSIsIkdldCIsImFjY291bnQiLCJ1c2VyVHlwZSIsInRoZW4iLCJjaGVja0FjY291bnRSZXN1bHQiLCJ0b2FzdCIsImNvbnRlbnQiLCJnZXRBdXRoQ29kZSIsImNvdW50Iiwic2VsZiIsImdldENvZGUiLCJzZXRUaW1lb3V0IiwiaW5uZXIiLCIkYXBwbHkiLCJjYXRjaCIsImJpbmRMb2dpblRlbCIsImJpbmRMb2dpblBhc3N3b3JkIiwiYmluZFBob25lVGVsIiwiYmluZFBob25lQ29kZSIsImJpbmRSZWdUZWwiLCJiaW5kUmVnUGFzc3dvcmQiLCJiaW5kUmVnQ29kZSIsIm5vcm1hbExvZ2luIiwicGFzc3dkIiwiaGFzaCIsIm9wZW5JZCIsImFjY2Vzc1Rva2VuIiwiUHJvbWlzZSIsImFsbCIsImlkIiwiaGVhZGVySW1hZ2VGdWxsIiwidXNlckluZm9GaW5pc2hUeXBlIiwibmF2aWdhdGVUbyIsInVybCIsIiRwYXJlbnQiLCJrZWVwU29ja2V0IiwicmVMYXVuY2giLCJjb2RlTG9naW4iLCJyZWdlc2l0ZXIiLCJwYXNzd2RUZWwiLCJjb21wYW55VHlwZSIsInJlZGlyZWN0VG8iLCIkaW52b2tlIiwiY29kZU1ldGhvZCIsInVzZVR5cGUiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsSUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxPLEdBQVUsdUIsUUFLVkMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMscUJBQVMsRUFGTjtBQUdIQyxrQkFBTSxDQUhIO0FBSUhDLG9CQUFRLENBSkw7QUFLSEMsdUJBQVcsS0FMUjtBQU1IQyxxQkFBUyxLQU5OO0FBT0hDLHdCQUFZLElBUFQ7QUFRSEMsc0JBQVUsSUFSUDtBQVNIQyxtQkFBTztBQUNIQyxxQkFBSyxFQURGO0FBRUhDLDBCQUFVO0FBRlAsYUFUSjtBQWFIQyxtQkFBTztBQUNIRixxQkFBSyxFQURGO0FBRUhHLHNCQUFNO0FBRkgsYUFiSjtBQWlCSEMsaUJBQUs7QUFDREoscUJBQUssRUFESjtBQUVEQywwQkFBVSxFQUZUO0FBR0RFLHNCQUFNO0FBSEw7QUFqQkYsUyxRQXdCUEUsVSxHQUFhO0FBQ1Q7QUFEUyxTLFFBWWJDLE8sR0FBVTtBQUNOQyxzQkFETSxzQkFDTWQsSUFETixFQUNZO0FBQ2QscUJBQUtBLElBQUwsR0FBWWUsT0FBT0MsUUFBUCxDQUFnQmhCLElBQWhCLENBQVo7QUFDSCxhQUhLO0FBSU5pQix3QkFKTSx3QkFJUUMsQ0FKUixFQUlXO0FBQUE7O0FBQ2Isb0JBQUksQ0FBRSx5QkFBeUJDLElBQXpCLENBQThCRCxFQUFFRSxNQUFGLENBQVNDLEtBQXZDLENBQU4sRUFBc0Q7QUFDbEQsMkJBQU8sS0FBUDtBQUNIO0FBQ0QscUJBQUt6QixPQUFMLENBQWEwQixHQUFiLENBQWlCO0FBQ2JDLDZC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c0JBQU87QUFDWiwyQkFBS25FLE1BQUwsR0FBY29FLElBQUlDLFlBQWxCO0FBQ0EsMkJBQUtuQyxNQUFMO0FBQ0g7QUFKYyxhQUFuQjtBQU1IOzs7O0VBelI4QixlQUFLb0MsSTs7a0JBQW5CakYsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IG1kNSBmcm9tICdtZDUtZXMnXHJcbmltcG9ydCB7U2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlLmpzJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55m75b2VJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBpbnZhbGlkOiAnJyxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICBsb2dpbkNvZGU6IGZhbHNlLFxyXG4gICAgICAgIHJlZ0NvZGU6IGZhbHNlLFxyXG4gICAgICAgIGxvZ2luQ291bnQ6ICfojrflj5YnLFxyXG4gICAgICAgIHJlZ0NvdW50OiAn6I635Y+WJyxcclxuICAgICAgICBsb2dpbjoge1xyXG4gICAgICAgICAgICB0ZWw6ICcnLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lOiB7XHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIGNvZGU6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWc6IHtcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICAgICAgICBjb2RlOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29kZSAocGhvbmUsIHR5cGUgPSA3KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICBjb2RlTWV0aG9kOlwiMlwiLFxyXG4gICAgICAgICAgICB0ZWw6IHBob25lLFxyXG4gICAgICAgICAgICB1c2VUeXBlOiB0eXBlXHJcbiAgICAgICAgfSwgJy9Db2RlL2dldENvZGUnKVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlVHlwZSAodHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBOdW1iZXIucGFyc2VJbnQodHlwZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrQWNjb3VudCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdChlLmRldGFpbC52YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMucmVnLnRlbCxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOiAnMCwxJ1xyXG4gICAgICAgICAgICB9LCAnL1VzZXIvY2hlY2tBY2NvdW50JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmNoZWNrQWNjb3VudFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor6XmiYvmnLrlj7flt7Lms6jlhozvvIzor7fnm7TmjqXnmbvlvZUnfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEF1dGhDb2RlICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZ0NvZGUgfHwgdGhpcy5sb2dpbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fkuI3opoHpopHnuYHojrflj5bpqozor4HnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDYwXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnBob25lLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggSd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2RlKHRoaXMucGhvbmUudGVsLCA3KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQ29kZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQ291bnQgPSBg5Ymp5L2ZJHtjb3VudH1TYFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gaW5uZXIgKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db2RlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db3VudCA9ICfojrflj5YnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudC0tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Db3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChpbm5lciwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHt9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvLnRlc3QodGhpcy5yZWcudGVsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CBJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvZGUodGhpcy5yZWcudGVsLCAxKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ0NvZGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdDb3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiBpbm5lciAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWdDb2RlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVnQ291bnQgPSAn6I635Y+WJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQtLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZ0NvdW50ID0gYOWJqeS9mSR7Y291bnR9U2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGlubmVyLCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTG9naW5UZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZExvZ2luUGFzc3dvcmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5wYXNzd29yZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmVUZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZS50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBob25lQ29kZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ1RlbCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ1Bhc3N3b3JkIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnBhc3N3b3JkID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRSZWdDb2RlIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9ybWFsTG9naW4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpbi50ZWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdhMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luLnBhc3N3b3JkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYTInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5a+G56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLmxvZ2luLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYTEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu5qC85byP55qE5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMubG9naW4udGVsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dkOiBtZDUuaGFzaCh0aGlzLmxvZ2luLnBhc3N3b3JkKSxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOicwLDEnLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IFwiXCJcclxuICAgICAgICAgICAgfSwgJy9Vc2VyL2xvZ2luJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgIFNldCgndXNlcklkJywgZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0KCd1c2VySW1nJywgZGF0YS5oZWFkZXJJbWFnZUZ1bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgIFNldCgnZmluaXNoVHlwZScsIGRhdGEudXNlckluZm9GaW5pc2hUeXBlKVxyXG4gICAgICAgICAgICAgICAgXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlckluZm9GaW5pc2hUeXBlICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3NpbXBsZVJlc3VtZT9pZD0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5rZWVwU29ja2V0KGRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnbWluZT91c2VySWQ9JyArIGRhdGEuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZUxvZ2luICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGhvbmUudGVsID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgvXjFbM3w0fDV8N3w4XVswLTldezl9JC8udGVzdCh0aGlzLnBob25lLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu5qC85byP55qE5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5waG9uZS5jb2RlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYjInXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl6aqM6K+B56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHRoaXMucGhvbmUudGVsLFxyXG4gICAgICAgICAgICAgICAgY29kZTogdGhpcy5waG9uZS5jb2RlLFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6JzAsMScsXHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46ICcnXHJcbiAgICAgICAgICAgIH0sICcvVXNlci9sb2dpbicpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICBTZXQoJ3VzZXJJZCcsIGRhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIFNldCgndXNlckltZycsIGRhdGEuaGVhZGVySW1hZ2VGdWxsKSxcclxuICAgICAgICAgICAgICAgICAgICBTZXQoJ2ZpbmlzaFR5cGUnLCBkYXRhLnVzZXJJbmZvRmluaXNoVHlwZSlcclxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJJbmZvRmluaXNoVHlwZSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdzaW1wbGVSZXN1bWU/aWQ9JyArIGRhdGEuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQua2VlcFNvY2tldChkYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ21pbmU/dXNlcklkPScgKyBkYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZ2VzaXRlciAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZy50ZWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdjMSdcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmiYvmnLrlj7cnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KHRoaXMucmVnLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYzEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5q2j56Gu5qC85byP55qE5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWcucGFzc3dvcmQgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZCA9ICdjMidcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXlr4bnoIEnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmICghKC9eKD8hWzAtOV0rJCkoPyFbYS16QS1aXSskKVswLTlBLVphLXpdezYsMTZ9JC8udGVzdCh0aGlzLnJlZy5wYXNzc3dvcmQpKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5pbnZhbGlkID0gJ2MyJ1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpTYtMTbkvY3lrZfmr40r5pWw5a2X57uE5ZCI55qE5a+G56CBJ30pXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWcuY29kZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2MzJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpemqjOivgeeggSd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB0ZWw6IHRoaXMucmVnLnRlbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3ZFRlbDogbWQ1Lmhhc2godGhpcy5yZWcucGFzc3dvcmQpLFxyXG4gICAgICAgICAgICAgICAgY29kZTogdGhpcy5yZWcuY29kZSxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29tcGFueVR5cGU6IDAsXHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46ICcnXHJcbiAgICAgICAgICAgIH0sICcvVXNlci9hZGRVc2VyJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgIFNldCgndXNlcklkJywgZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0KCdmaW5pc2hUeXBlJywgMSlcclxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5rZWVwU29ja2V0KGRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnc2ltcGxlUmVzdW1lP2lkPScgKyBkYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=