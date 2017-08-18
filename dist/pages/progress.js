'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_wepy$page) {
    _inherits(Progress, _wepy$page);

    function Progress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Progress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Progress.__proto__ || Object.getPrototypeOf(Progress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '求职进度'
        }, _this.userId = '', _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.request = new _request2.default(), _this.data = {
            progress: []
        }, _this.methods = {
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            },
            test: function test() {
                _wepy2.default.navigateTo({
                    url: 'comment?type=2'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Progress, [{
        key: 'getProgress',
        value: function getProgress() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/SendResume/getList');
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this2 = this;

            this.getProgress().then(function (_ref2) {
                var data = _ref2.data;

                _this2.progress = data;
                _wepy2.default.stopPullDownRefresh();
                _this2.$apply();
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this3 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.page.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getProgress(this.page.index).then(function (_ref3) {
                var data = _ref3.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this3.hasNot = true;
                }
                _this3.progress = [].concat(_toConsumableArray(_this3.progress), _toConsumableArray(data));
                _this3.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this4 = this;

            this.userId = params.id;
            this.getProgress().then(function (_ref4) {
                var data = _ref4.data;

                (0, _log.log)(data);
                _this4.progress = data;
                _this4.$apply();
            });
        }
    }]);

    return Progress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Progress , 'pages/progress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIlByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2VySWQiLCJwYWdlIiwiaW5kZXgiLCJidXN5IiwiaGFzTm90IiwicmVxdWVzdCIsImRhdGEiLCJwcm9ncmVzcyIsIm1ldGhvZHMiLCJ0b0NvbXBhbnkiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0ZXN0IiwicGFnZVNpemUiLCJHZXQiLCJnZXRQcm9ncmVzcyIsInRoZW4iLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiJGFwcGx5IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQyxtQkFBTyxDQURKO0FBRUhDLGtCQUFNLEtBRkg7QUFHSEMsb0JBQVE7QUFITCxTLFFBTVBDLE8sR0FBVSx1QixRQVNWQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFEUCxTLFFBSVBDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDS0MsRUFETCxFQUNTO0FBQ1gsK0JBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMseUNBQW1CRjtBQURQLGlCQUFoQjtBQUdILGFBTEs7QUFNTkcsZ0JBTk0sa0JBTUU7QUFDSiwrQkFBS0YsVUFBTCxDQUFnQjtBQUNaQztBQURZLGlCQUFoQjtBQUdIO0FBVkssUzs7Ozs7c0NBWjJCO0FBQUEsZ0JBQXhCWCxJQUF3Qix1RUFBakIsQ0FBaUI7QUFBQSxnQkFBZGEsUUFBYyx1RUFBSCxDQUFHOztBQUNqQyxtQkFBTyxLQUFLVCxPQUFMLENBQWFVLEdBQWIsQ0FBaUI7QUFDcEJmLHdCQUFRLEtBQUtBLE1BRE87QUFFcEJDLHNCQUFNQSxJQUZjO0FBR3BCYSwwQkFBVUE7QUFIVSxhQUFqQixFQUlKLHFCQUpJLENBQVA7QUFLSDs7OzRDQW1Cb0I7QUFBQTs7QUFDakIsaUJBQUtFLFdBQUwsR0FDQ0MsSUFERCxDQUNNLGlCQUFZO0FBQUEsb0JBQVZYLElBQVUsU0FBVkEsSUFBVTs7QUFDZCx1QkFBS0MsUUFBTCxHQUFnQkQsSUFBaEI7QUFDQSwrQkFBS1ksbUJBQUw7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBTEQ7QUFNSDs7O3dDQUVnQjtBQUFBOztBQUNiLGdCQUFJLEtBQUtsQixJQUFMLENBQVVFLElBQWQsRUFBb0I7QUFDaEIsdUJBQU8sS0FBUDtBQUNIO0FBQ0QsZ0JBQUksS0FBS0YsSUFBTCxDQUFVRyxNQUFkLEVBQXNCO0FBQ2xCLHVCQUFPLEtBQVA7QUFDSDtBQUNELGlCQUFLSCxJQUFMLENBQVVDLEtBQVY7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLElBQWpCO0FBQ0EsaUJBQUthLFdBQUwsQ0FBaUIsS0FBS2YsSUFBTCxDQUFVQyxLQUEzQixFQUNDZSxJQURELENBQ00saUJBQVk7QUFBQSxvQkFBVlgsSUFBVSxTQUFWQSxJQUFVOztBQUNkLG9CQUFJYyxNQUFNQyxPQUFOLENBQWNmLElBQWQsS0FBdUJBLEtBQUtnQixNQUFMLEtBQWdCLENBQTNDLEVBQThDO0FBQzFDLDJCQUFLbEIsTUFBTCxHQUFjLElBQWQ7QUFDSDtBQUNELHVCQUFLRyxRQUFMLGdDQUFvQixPQUFLQSxRQUF6QixzQkFBc0NELElBQXRDO0FBQ0EsdUJBQUthLE1BQUw7QUFDSCxhQVBEO0FBUUg7OzsrQkFFT0ksTSxFQUFRO0FBQUE7O0FBQ1osaUJBQUt2QixNQUFMLEdBQWN1QixPQUFPYixFQUFyQjtBQUNBLGlCQUFLTSxXQUFMLEdBQ0NDLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWWCxJQUFVLFNBQVZBLElBQVU7O0FBQ2QsOEJBQUlBLElBQUo7QUFDQSx1QkFBS0MsUUFBTCxHQUFnQkQsSUFBaEI7QUFDQSx1QkFBS2EsTUFBTDtBQUNILGFBTEQ7QUFNSDs7OztFQTVFaUMsZUFBS2xCLEk7O2tCQUF0QkwsUSIsImZpbGUiOiJwcm9ncmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rGC6IGM6L+b5bqmJ1xyXG4gICAgfVxyXG5cclxuICAgIHVzZXJJZCA9ICcnXHJcblxyXG4gICAgcGFnZSA9IHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBoYXNOb3Q6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuICAgIGdldFByb2dyZXNzIChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL1NlbmRSZXN1bWUvZ2V0TGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwcm9ncmVzczogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvQ29tcGFueSAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbXBhbnk/aWQ9JHtpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXN0ICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbW1lbnQ/dHlwZT0yYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmVzcygpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzTm90KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXgrK1xyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3Jlc3ModGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBbLi4udGhpcy5wcm9ncmVzcywgLi4uZGF0YV1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3Jlc3MoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==