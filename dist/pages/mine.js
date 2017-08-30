'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _storage = require('./../utils/storage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mine = function (_wepy$page) {
    _inherits(Mine, _wepy$page);

    function Mine() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mine);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTextStyle: 'white',
            backgroundTextStyle: 'white',
            navigationBarBackgroundColor: '#40c4ff',
            navigationBarTitleText: '我',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            hasLogin: false,
            sex: '0',
            headerImageFull: '',
            tel: '',
            nickname: ''
        }, _this.components = {
            'toast': _toast2.default
        }, _this.userId = '', _this.request = new _request2.default(), _this.methods = {
            toLogin: function toLogin() {
                if (this.hasLogin) {
                    return false;
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            slide: function slide() {
                _wepy2.default.navigateTo({ url: 'introduction' });
            },
            progess: function progess() {
                if (this.hasLogin) {
                    _wepy2.default.navigateTo({ url: 'progress?id=' + this.userId });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            resume: function resume() {
                if (this.hasLogin) {
                    _wepy2.default.navigateTo({ url: 'resume?id=' + this.userId });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            collect: function collect() {
                if (this.hasLogin) {
                    _wepy2.default.navigateTo({ url: 'collect?id=' + this.userId });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            follow: function follow() {
                if (this.hasLogin) {
                    _wepy2.default.navigateTo({ url: 'follow?id=' + this.userId });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            setting: function setting() {
                if (this.hasLogin) {
                    _wepy2.default.navigateTo({ url: 'setting?id=' + this.userId });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            simpleResume: function simpleResume() {
                _wepy2.default.navigateTo({ url: 'simpleResume?id=294' });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this2.$parent.global.curVal = Number.parseInt(_this2.$parent.global.curVal) + 1;
                _this2.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            (0, _storage.Get)('userId').then(function (res) {
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                _this3.hasLogin = true;
                _this3.userId = res;
                _this3.request.Get({
                    userId: _this3.userId,
                    type: 'detail'
                }, '/UserPerson/getInfo').then(function (_ref2) {
                    var data = _ref2.data;

                    Object.assign(_this3, data);
                    (0, _storage.Set)('userImg', data.headerImageFull);
                    (0, _storage.Set)('userPhone', data.tel);
                    _this3.$apply();
                    _wepy2.default.hideLoading();
                });
                _this3.$apply();
            }).catch(function (err) {
                _this3.hasLogin = false;
                _this3.$apply();
            });
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImhhc0xvZ2luIiwic2V4IiwiaGVhZGVySW1hZ2VGdWxsIiwidGVsIiwibmlja25hbWUiLCJjb21wb25lbnRzIiwidXNlcklkIiwicmVxdWVzdCIsIm1ldGhvZHMiLCJ0b0xvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsInNsaWRlIiwicHJvZ2VzcyIsInJlc3VtZSIsImNvbGxlY3QiLCJmb2xsb3ciLCJzZXR0aW5nIiwic2ltcGxlUmVzdW1lIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwiY29udGVudCIsInRoZW4iLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcyIsIkdldCIsInR5cGUiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixPQURuQjtBQUVMQyxpQ0FBcUIsT0FGaEI7QUFHTEMsMENBQThCLFNBSHpCO0FBSUxDLG9DQUF3QixHQUpuQjtBQUtMQyxtQ0FBdUIsS0FMbEI7QUFNTEMsMkJBQWU7QUFOVixTLFFBU1RDLEksR0FBTztBQUNIQyxzQkFBVSxLQURQO0FBRUhDLGlCQUFLLEdBRkY7QUFHSEMsNkJBQWlCLEVBSGQ7QUFJSEMsaUJBQUssRUFK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QWlCO0FBQ2IzQiw0QkFBUSxPQUFLQSxNQURBO0FBRWI0QiwwQkFBTTtBQUZPLGlCQUFqQixFQUdHLHFCQUhILEVBSUNOLElBSkQsQ0FJTSxpQkFBWTtBQUFBLHdCQUFWN0IsSUFBVSxTQUFWQSxJQUFVOztBQUNkb0MsMkJBQU9DLE1BQVAsU0FBb0JyQyxJQUFwQjtBQUNBLHNDQUFJLFNBQUosRUFBZUEsS0FBS0csZUFBcEI7QUFDQSxzQ0FBSSxXQUFKLEVBQWlCSCxLQUFLSSxHQUF0QjtBQUNBLDJCQUFLa0MsTUFBTDtBQUNBLG1DQUFLQyxXQUFMO0FBQ0gsaUJBVkQ7QUFXQSx1QkFBS0QsTUFBTDtBQUNILGFBaEJELEVBZ0JHRSxLQWhCSCxDQWdCUyxlQUFPO0FBQ1osdUJBQUt2QyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsdUJBQUtxQyxNQUFMO0FBQ0gsYUFuQkQ7QUFvQkg7Ozs7RUExRzZCLGVBQUtHLEk7O2tCQUFsQmpELEkiLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IHtHZXQsIFNldH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZScsXHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ3doaXRlJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzQwYzRmZicsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIHNleDogJzAnLFxyXG4gICAgICAgIGhlYWRlckltYWdlRnVsbDogJycsXHJcbiAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICBuaWNrbmFtZTogJydcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG4gICAgdXNlcklkID0gJydcclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b0xvZ2luICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnaW50cm9kdWN0aW9uJ30pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9nZXNzICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgcHJvZ3Jlc3M/aWQ9JHt0aGlzLnVzZXJJZH1gfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdW1lICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgcmVzdW1lP2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbGxlY3QgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBjb2xsZWN0P2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGxvdyAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogYGZvbGxvdz9pZD0ke3RoaXMudXNlcklkfWB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgc2V0dGluZz9pZD0ke3RoaXMudXNlcklkfWB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaW1wbGVSZXN1bWUgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ3NpbXBsZVJlc3VtZT9pZD0yOTQnfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gcmVzXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdkZXRhaWwnXHJcbiAgICAgICAgICAgIH0sICcvVXNlclBlcnNvbi9nZXRJbmZvJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd1c2VySW1nJywgZGF0YS5oZWFkZXJJbWFnZUZ1bGwpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3VzZXJQaG9uZScsIGRhdGEudGVsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19