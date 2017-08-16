'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

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
        }, _this.components = {
            'loading': _loading2.default
        }, _this.methods = {
            slide: function slide() {
                _wepy2.default.navigateTo({
                    url: 'introduction'
                });
            },
            resume: function resume() {
                // if (wepy.getStorageSync("userId")) {
                _wepy2.default.navigateTo({
                    url: 'resume?id=' + _wepy2.default.getStorageSync("userId")
                });
                // } else {
                //     return
                // }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'onLoad',
        value: function onLoad() {
            // this.$invoke('loading', 'show')
            _wepy2.default.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#40c4ff'
            });
            setTimeout(function () {
                // this.$invoke('loading', 'hide')
            }, 300);
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwic2xpZGUiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVzdW1lIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJmcm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixHQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQUliQyxPLEdBQVU7QUFDTkMsaUJBRE0sbUJBQ0c7QUFDTCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSztBQURPLGlCQUFoQjtBQUdILGFBTEs7QUFNTkMsa0JBTk0sb0JBTUk7QUFDTjtBQUNJLCtCQUFLRixVQUFMLENBQWdCO0FBQ1pDLHdDQUFrQixlQUFLRSxjQUFMLENBQW9CLFFBQXBCO0FBRE4saUJBQWhCO0FBR0o7QUFDQTtBQUNBO0FBQ0g7QUFkSyxTOzs7OztpQ0FpQkE7QUFDTjtBQUNBLDJCQUFLQyxxQkFBTCxDQUEyQjtBQUN2QkMsNEJBQVksU0FEVztBQUV2QkMsaUNBQWlCO0FBRk0sYUFBM0I7QUFJQUMsdUJBQVcsWUFBTTtBQUNiO0FBQ0gsYUFGRCxFQUVHLEdBRkg7QUFHSDs7OztFQXRDNkIsZUFBS0MsSTs7a0JBQWxCakIsSSIsImZpbGUiOiJtaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiRJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmdcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNsaWRlICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2ludHJvZHVjdGlvbidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VtZSAoKSB7XHJcbiAgICAgICAgICAgIC8vIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKFwidXNlcklkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYHJlc3VtZT9pZD0ke3dlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySWRcIil9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy4kaW52b2tlKCdsb2FkaW5nJywgJ3Nob3cnKVxyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuJGludm9rZSgnbG9hZGluZycsICdoaWRlJylcclxuICAgICAgICB9LCAzMDApXHJcbiAgICB9XHJcbn1cclxuIl19