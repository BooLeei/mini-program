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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJoYXNMb2dpbiIsInNleCIsImhlYWRlckltYWdlRnVsbCIsInRlbCIsIm5pY2tuYW1lIiwidXNlcklkIiwicmVxdWVzdCIsIm1ldGhvZHMiLCJ0b0xvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsInNsaWRlIiwicHJvZ2VzcyIsInJlc3VtZSIsImNvbGxlY3QiLCJmb2xsb3ciLCJzZXR0aW5nIiwic2ltcGxlUmVzdW1lIiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsInRoZW4iLCJyZXMiLCJHZXQiLCJ0eXBlIiwiT2JqZWN0IiwiYXNzaWduIiwiJGFwcGx5IiwiY2F0Y2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsR0FGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxJLEdBQU87QUFDSEMsc0JBQVUsS0FEUDtBQUVIQyxpQkFBSyxHQUZGO0FBR0hDLDZCQUFpQixFQUhkO0FBSUhDLGlCQUFLLEVBSkY7QUFLSEMsc0JBQVU7QUFMUCxTLFFBUVBDLE0sR0FBUyxFLFFBQ1RDLE8sR0FBVSx1QixRQUVWQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0s7QUFDUCxvQkFBSSxLQUFLUixRQUFULEVBQW1CO0FBQ2YsMkJBQU8sS0FBUDtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS1MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBUEs7QUFRTkMsaUJBUk0sbUJBUUc7QUFDTCwrQkFBS0YsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBaEI7QUFDSCxhQVZLO0FBV05FLG1CQVhNLHFCQVdLO0FBQ1Asb0JBQUksS0FBS1osUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLHNCQUFvQixLQUFLTCxNQUExQixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBakJLO0FBa0JORyxrQkFsQk0sb0JBa0JJO0FBQ04sb0JBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLG9CQUFrQixLQUFLTCxNQUF4QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBeEJLO0FBeUJOSSxtQkF6Qk0scUJBeUJLO0FBQ1Asb0JBQUksS0FBS2QsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLHFCQUFtQixLQUFLTCxNQUF6QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBL0JLO0FBZ0NOSyxrQkFoQ00sb0JBZ0NJO0FBQ04sb0JBQUksS0FBS2YsUUFBVCxFQUFtQjtBQUNmLG1DQUFLUyxVQUFMLENBQWdCLEVBQUNDLG9CQUFrQixLQUFLTCxNQUF4QixFQUFoQjtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ksVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBdENLO0FBdUNOTSxtQkF2Q00scUJBdUNLO0FBQ1Asb0JBQUksS0FBS2hCLFFBQVQsRUFBbUI7QUFDZixtQ0FBS1MsVUFBTCxDQUFnQixFQUFDQyxxQkFBbUIsS0FBS0wsTUFBekIsRUFBaEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsbUNBQUtJLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxPQUFOLEVBQWhCO0FBQ0g7QUFDSixhQTdDSztBQThDTk8sd0JBOUNNLDBCQThDVTtBQUNaLCtCQUFLUixVQUFMLENBQWdCLEVBQUNDLEtBQUsscUJBQU4sRUFBaEI7QUFDSDtBQWhESyxTOzs7OztpQ0FtREE7QUFBQTs7QUFDTiwyQkFBS1EscUJBQUwsQ0FBMkI7QUFDdkJDLDRCQUFZLFNBRFc7QUFFdkJDLGlDQUFpQjtBQUZNLGFBQTNCO0FBSUEsOEJBQUksUUFBSixFQUFjQyxJQUFkLENBQW1CLGVBQU87QUFDdEIsdUJBQUtyQixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsdUJBQUtLLE1BQUwsR0FBY2lCLEdBQWQ7QUFDQSx1QkFBS2hCLE9BQUwsQ0FBYWlCLEdBQWIsQ0FBaUI7QUFDYmxCLDRCQUFRLE9BQUtBLE1BREE7QUFFYm1CLDBCQUFNO0FBRk8saUJBQWpCLEVBR0cscUJBSEgsRUFJQ0gsSUFKRCxDQUlNLGlCQUFZO0FBQUEsd0JBQVZ0QixJQUFVLFNBQVZBLElBQVU7O0FBQ2QwQiwyQkFBT0MsTUFBUCxTQUFvQjNCLElBQXBCO0FBQ0EsMkJBQUs0QixNQUFMO0FBQ0gsaUJBUEQ7QUFRQSx1QkFBS0EsTUFBTDtBQUNILGFBWkQsRUFZR0MsS0FaSCxDQVlTLGVBQU87QUFDWix1QkFBSzVCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSx1QkFBSzJCLE1BQUw7QUFDSCxhQWZEO0FBZ0JIOzs7O0VBM0Y2QixlQUFLRSxJOztrQkFBbEJwQyxJIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHtHZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIHNleDogJzAnLFxyXG4gICAgICAgIGhlYWRlckltYWdlRnVsbDogJycsXHJcbiAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICBuaWNrbmFtZTogJydcclxuICAgIH1cclxuXHJcbiAgICB1c2VySWQgPSAnJ1xyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvTG9naW4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdpbnRyb2R1Y3Rpb24nfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dlc3MgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBwcm9ncmVzcz9pZD0ke3RoaXMudXNlcklkfWB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bWUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGByZXN1bWU/aWQ9JHt0aGlzLnVzZXJJZH1gfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sbGVjdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogYGNvbGxlY3Q/aWQ9JHt0aGlzLnVzZXJJZH1gfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9sbG93ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgZm9sbG93P2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBzZXR0aW5nP2lkPSR7dGhpcy51c2VySWR9YH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpbXBsZVJlc3VtZSAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnc2ltcGxlUmVzdW1lP2lkPTI5NCd9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gcmVzXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdkZXRhaWwnXHJcbiAgICAgICAgICAgIH0sICcvVXNlclBlcnNvbi9nZXRJbmZvJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYXNMb2dpbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==