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

var _log = require('./../utils/log.js');

var _md5Es = require('./../npm/md5-es/build/md5-es.min.js');

var _md5Es2 = _interopRequireDefault(_md5Es);

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
                // if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.login.passsword))) {
                //     this.invalid = 'a2'
                //     this.toast({content: '帐号密码错误'})
                //     return false
                // }
                this.request.Get({
                    account: this.login.tel,
                    passwd: _md5Es2.default.hash(this.login.password),
                    userType: '0,1',
                    openId: "",
                    accessToken: ""
                }, '/User/login').then(function (ret) {
                    (0, _log.log)(ret);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwiaW52YWxpZCIsInR5cGUiLCJoZWlnaHQiLCJsb2dpbkNvZGUiLCJyZWdDb2RlIiwibG9naW5Db3VudCIsInJlZ0NvdW50IiwibG9naW4iLCJ0ZWwiLCJwYXNzd29yZCIsInBob25lIiwiY29kZSIsInJlZyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9nZ2xlVHlwZSIsIk51bWJlciIsInBhcnNlSW50IiwiY2hlY2tBY2NvdW50IiwiZSIsInRlc3QiLCJkZXRhaWwiLCJ2YWx1ZSIsIkdldCIsImFjY291bnQiLCJ1c2VyVHlwZSIsInRoZW4iLCJjaGVja0FjY291bnRSZXN1bHQiLCJ0b2FzdCIsImNvbnRlbnQiLCJnZXRBdXRoQ29kZSIsImNvdW50Iiwic2VsZiIsImdldENvZGUiLCJzZXRUaW1lb3V0IiwiaW5uZXIiLCIkYXBwbHkiLCJjYXRjaCIsImJpbmRMb2dpblRlbCIsImJpbmRMb2dpblBhc3N3b3JkIiwiYmluZFBob25lVGVsIiwiYmluZFBob25lQ29kZSIsImJpbmRSZWdUZWwiLCJiaW5kUmVnUGFzc3dvcmQiLCJiaW5kUmVnQ29kZSIsIm5vcm1hbExvZ2luIiwicGFzc3dkIiwiaGFzaCIsIm9wZW5JZCIsImFjY2Vzc1Rva2VuIiwicmV0IiwiJGludm9rZSIsImNvZGVNZXRob2QiLCJ1c2VUeXBlIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0s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QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQUtoQyxPQUFMLENBQWEwQixHQUFiLENBQWlCO0FBQ2JDLDZCQUFTLEtBQUtqQixLQUFMLENBQVdDLEdBRFA7QUFFYnNDLDRCQUFRLGdCQUFJQyxJQUFKLENBQVMsS0FBS3hDLEtBQUwsQ0FBV0UsUUFBcEIsQ0FGSztBQUdiZ0IsOEJBQVMsS0FISTtBQUlidUIsNEJBQVEsRUFKSztBQUtiQyxpQ0FBYTtBQUxBLGlCQUFqQixFQU1HLGFBTkgsRUFPQ3ZCLElBUEQsQ0FPTSxlQUFPO0FBQ1Qsa0NBQUl3QixHQUFKO0FBQ0gsaUJBVEQ7QUFXSDtBQTVISyxTOzs7OztnQ0F4Q1E7QUFBQSxnQkFBWHBELElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS3FELE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DckQsSUFBbkM7QUFDSDs7O2dDQThCUVksSyxFQUFpQjtBQUFBLGdCQUFWVCxJQUFVLHVFQUFILENBQUc7O0FBQ3RCLG1CQUFPLEtBQUtKLE9BQUwsQ0FBYTBCLEdBQWIsQ0FBaUI7QUFDcEI2Qiw0QkFBVyxHQURTO0FBRXBCNUMscUJBQUtFLEtBRmU7QUFHcEIyQyx5QkFBU3BEO0FBSFcsYUFBakIsRUFJSixlQUpJLENBQVA7QUFLSDs7O2lDQWlJUztBQUFBOztBQUNOLDJCQUFLcUQsYUFBTCxDQUFtQjtBQUNmQyx5QkFBUyxzQkFBTztBQUNaLDJCQUFLckQsTUFBTCxHQUFjc0QsSUFBSUMsWUFBbEI7QUFDQSwyQkFBS3JCLE1BQUw7QUFDSDtBQUpjLGFBQW5CO0FBTUg7Ozs7RUF2TDhCLGVBQUtzQixJOztrQkFBbkJuRSxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5pbXBvcnQgbWQ1IGZyb20gJ21kNS1lcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgaW52YWxpZDogJycsXHJcbiAgICAgICAgdHlwZTogMSxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgbG9naW5Db2RlOiBmYWxzZSxcclxuICAgICAgICByZWdDb2RlOiBmYWxzZSxcclxuICAgICAgICBsb2dpbkNvdW50OiAn6I635Y+WJyxcclxuICAgICAgICByZWdDb3VudDogJ+iOt+WPlicsXHJcbiAgICAgICAgbG9naW46IHtcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZToge1xyXG4gICAgICAgICAgICB0ZWw6ICcnLFxyXG4gICAgICAgICAgICBjb2RlOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVnOiB7XHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgICAgICAgY29kZTogJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIGdldENvZGUgKHBob25lLCB0eXBlID0gNykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgY29kZU1ldGhvZDpcIjJcIixcclxuICAgICAgICAgICAgdGVsOiBwaG9uZSxcclxuICAgICAgICAgICAgdXNlVHlwZTogdHlwZVxyXG4gICAgICAgIH0sICcvQ29kZS9nZXRDb2RlJylcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvZ2dsZVR5cGUgKHR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gTnVtYmVyLnBhcnNlSW50KHR5cGUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0FjY291bnQgKGUpIHtcclxuICAgICAgICAgICAgaWYgKCEoL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvLnRlc3QoZS5kZXRhaWwudmFsdWUpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50OiB0aGlzLnJlZy50ZWwsXHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTogJzAsMSdcclxuICAgICAgICAgICAgfSwgJy9Vc2VyL2NoZWNrQWNjb3VudCcpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5jaGVja0FjY291bnRSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+l5omL5py65Y+35bey5rOo5YaM77yM6K+355u05o6l55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBdXRoQ29kZSAodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWdDb2RlIHx8IHRoaXMubG9naW5Db2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35LiN6KaB6aKR57mB6I635Y+W6aqM6K+B56CBJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSA2MFxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvLnRlc3QodGhpcy5waG9uZS50ZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7fnoIEnfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29kZSh0aGlzLnBob25lLnRlbCwgNylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkNvZGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkNvdW50ID0gYOWJqeS9mSR7Y291bnR9U2BcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGlubmVyICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2luQ29kZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2luQ291bnQgPSAn6I635Y+WJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQtLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2luQ291bnQgPSBg5Ymp5L2ZJHtjb3VudH1TYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaW5uZXIsIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7fSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghKC9eMVszfDR8NXw3fDhdWzAtOV17OX0kLy50ZXN0KHRoaXMucmVnLnRlbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+eggSd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2RlKHRoaXMucmVnLnRlbCwgMSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdDb2RlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnQ291bnQgPSBg5Ymp5L2ZJHtjb3VudH1TYFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gaW5uZXIgKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVnQ29kZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZ0NvdW50ID0gJ+iOt+WPlidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LS1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWdDb3VudCA9IGDliankvZkke2NvdW50fVNgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChpbm5lciwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZExvZ2luVGVsIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udGVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRMb2dpblBhc3N3b3JkIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4ucGFzc3dvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBob25lVGVsIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmUudGVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaG9uZUNvZGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZS5jb2RlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRSZWdUZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWcudGVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRSZWdQYXNzd29yZCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5wYXNzd29yZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUmVnQ29kZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5jb2RlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vcm1hbExvZ2luICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9naW4udGVsID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWQgPSAnYTEnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+36L6T5YWl5omL5py65Y+3J30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpbi5wYXNzd29yZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2EyJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeWvhueggSd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEoL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvLnRlc3QodGhpcy5sb2dpbi50ZWwpKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkID0gJ2ExJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+i+k+WFpeato+ehruagvOW8j+eahOaJi+acuuWPtyd9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCEoL14oPyFbMC05XSskKSg/IVthLXpBLVpdKyQpWzAtOUEtWmEtel17NiwxNn0kLy50ZXN0KHRoaXMubG9naW4ucGFzc3N3b3JkKSkpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaW52YWxpZCA9ICdhMidcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfluJDlj7flr4bnoIHplJnor68nfSlcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudDogdGhpcy5sb2dpbi50ZWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd2Q6IG1kNS5oYXNoKHRoaXMubG9naW4ucGFzc3dvcmQpLFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6JzAsMScsXHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogXCJcIlxyXG4gICAgICAgICAgICB9LCAnL1VzZXIvbG9naW4nKVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=