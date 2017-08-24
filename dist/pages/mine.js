'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

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
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '我',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            hasLogin: false,
            sex: '0',
            headerImageFull: '',
            tel: '',
            nickname: ''
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
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            _wepy2.default.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#40c4ff'
            });
            (0, _storage.Get)('userId').then(function (res) {
                _this2.hasLogin = true;
                _this2.userId = res;
                _this2.request.Get({
                    userId: _this2.userId,
                    type: 'detail'
                }, '/UserPerson/getInfo').then(function (_ref2) {
                    var data = _ref2.data;

                    Object.assign(_this2, data);
                    (0, _storage.Set)('userImg', data.headerImageFull);
                    _this2.$apply();
                });
                _this2.$apply();
            }).catch(function (err) {
                _this2.hasLogin = false;
                _this2.$apply();
            });
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJoYXNMb2dpbiIsInNleCIsImhlYWRlckltYWdlRnVsbCIsInRlbCIsIm5pY2tuYW1lIiwidXNlcklkIiwicmVxdWVzdCIsIm1ldGhvZHMiLCJ0b0xvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsInNsaWRlIiwicHJvZ2VzcyIsInJlc3VtZSIsImNvbGxlY3QiLCJmb2xsb3ciLCJzZXR0aW5nIiwic2ltcGxlUmVzdW1lIiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsInRoZW4iLCJyZXMiLCJHZXQiLCJ0eXBlIiwiT2JqZWN0IiwiYXNzaWduIiwiJGFwcGx5IiwiY2F0Y2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsR0FGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxJLEdBQU87QUFDSEMsc0JBQVUsS0FEUDtBQUVIQyxpQkFBSyxHQUZGO0FBR0hDLDZCQUFpQixFQUhkO0FBSUhDLGlCQUFLLEVBSkY7QUFLSEMsc0JBQVU7QUFMUCxTLFFBUVBDLE0sR0FBUyxFLFFBQ1RDLE8sR0FBVSx1QixRQUVWQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0s7QUFDUCxvQkFBSSxLQUFLUixRQUFULEVBQW1CO0FBQ2YsMkJBQU8sS0FBUDtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS1MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBUEs7QUFRTkMsaUJBUk0sbUJBUUc7QUFDTCwrQkFBS0YsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBaEI7QUFDSCxhQVZLO0FBV05FLG1CQVhNLHFCQVdLO0FBQ1Asb0JBQUksS0FBS1osUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLHNCQUFvQixLQUFLTCxNQUExQixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBakJLO0FBa0JORyxrQkFsQk0sb0JBa0JJO0FBQ04sb0JBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLG9CQUFrQixLQUFLTCxNQUF4QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBeEJLO0FBeUJOSSxtQkF6Qk0scUJBeUJLO0FBQ1Asb0JBQUksS0FBS2QsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLHFCQUFtQixLQUFLTCxNQUF6QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBL0JLO0FBZ0NOSyxrQkFoQ00sb0JBZ0NJO0FBQ04sb0JBQUksS0FBS2YsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLG9CQUFrQixLQUFLTCxNQUF4QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBdENLO0FBdUNOTSxtQkF2Q00scUJBdUNLO0FBQ1Asb0JBQUksS0FBS2hCLFFBQVQsRUFBbUI7QUFDZixtQ0FBS1MsVUFBTCxDQUFnQixFQUFDQyxxQkFBbUIsS0FBS0wsTUFBekIsRUFBaEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsbUNBQUtJLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxPQUFOLEVBQWhCO0FBQ0g7QUFDSixhQTdDSztBQThDTk8sd0JBOUNNLDBCQThDVTtBQUNaLCtCQUFLUixVQUFMLENBQWdCLEVBQUNDLEtBQUsscUJBQU4sRUFBaEI7QUFDSDtBQWhESyxTOzs7OztpQ0FtREE7QUFBQTs7QUFDTiwyQkFBS1EscUJBQUwsQ0FBMkI7QUFDdkJDLDRCQUFZLFNBRFc7QUFFdkJDLGlDQUFpQjtBQUZNLGFBQTNCO0FBSUEsOEJBQUksUUFBSixFQUFjQyxJQUFkLENBQW1CLGVBQU87QUFDdEIsdUJBQUtyQixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsdUJBQUtLLE1BQUwsR0FBY2lCLEdBQWQ7QUFDQSx1QkFBS2hCLE9BQUwsQ0FBYWlCLEdBQWIsQ0FBaUI7QUFDYmxCLDRCQUFRLE9BQUtBLE1BREE7QUFFYm1CLDBCQUFNO0FBRk8saUJBQWpCLEVBR0cscUJBSEgsRUFJQ0gsSUFKRCxDQUlNLGlCQUFZO0FBQUEsd0JBQVZ0QixJQUFVLFNBQVZBLElBQVU7O0FBQ2QwQiwyQkFBT0MsTUFBUCxTQUFvQjNCLElBQXBCO0FBQ0Esc0NBQUksU0FBSixFQUFlQSxLQUFLRyxlQUFwQjtBQUNBLDJCQUFLeUIsTUFBTDtBQUNILGlCQVJEO0FBU0EsdUJBQUtBLE1BQUw7QUFDSCxhQWJELEVBYUdDLEtBYkgsQ0FhUyxlQUFPO0FBQ1osdUJBQUs1QixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsdUJBQUsyQixNQUFMO0FBQ0gsYUFoQkQ7QUFpQkg7Ozs7RUE1RjZCLGVBQUtFLEk7O2tCQUFsQnBDLEkiLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge0dldCwgU2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWluZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJEnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGhhc0xvZ2luOiBmYWxzZSxcclxuICAgICAgICBzZXg6ICcwJyxcclxuICAgICAgICBoZWFkZXJJbWFnZUZ1bGw6ICcnLFxyXG4gICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgbmlja25hbWU6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gJydcclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b0xvZ2luICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnaW50cm9kdWN0aW9uJ30pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9nZXNzICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgcHJvZ3Jlc3M/aWQ9JHt0aGlzLnVzZXJJZH1gfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdW1lICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgcmVzdW1lP2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbGxlY3QgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBjb2xsZWN0P2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGxvdyAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogYGZvbGxvdz9pZD0ke3RoaXMudXNlcklkfWB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgc2V0dGluZz9pZD0ke3RoaXMudXNlcklkfWB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaW1wbGVSZXN1bWUgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ3NpbXBsZVJlc3VtZT9pZD0yOTQnfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJDb2xvcih7XHJcbiAgICAgICAgICAgIGZyb250Q29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzQwYzRmZidcclxuICAgICAgICB9KVxyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHJlc1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGV0YWlsJ1xyXG4gICAgICAgICAgICB9LCAnL1VzZXJQZXJzb24vZ2V0SW5mbycpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSlcclxuICAgICAgICAgICAgICAgIFNldCgndXNlckltZycsIGRhdGEuaGVhZGVySW1hZ2VGdWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYXNMb2dpbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==