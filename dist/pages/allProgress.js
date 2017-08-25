'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _compProgress = require('./../components/comp-progress.js');

var _compProgress2 = _interopRequireDefault(_compProgress);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllProgress = function (_wepy$page) {
    _inherits(AllProgress, _wepy$page);

    function AllProgress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllProgress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllProgress.__proto__ || Object.getPrototypeOf(AllProgress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '全部历程',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            progress: null
        }, _this.request = new _request2.default(), _this.$props = { "progress": { "xmlns:v-bind": "", "v-bind:item.once": "item" } }, _this.$events = {}, _this.components = {
            'progress': _compProgress2.default,
            'toast': _toast2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllProgress, [{
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
        value: function onLoad(params) {
            var _this3 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.request.Get({
                'userCompanyId': params.id
            }, '/CompanyProgress/getList').then(function (_ref2) {
                var data = _ref2.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        item.year = item.time.slice(0, 4);
                        item.month = item.time.slice(4, 6);
                        item.day = item.time.slice(6, 8);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                data[data.length - 1].last = true;
                _this3.progress = data;
                _this3.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return AllProgress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllProgress , 'pages/allProgress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIkFsbFByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInByb2dyZXNzIiwicmVxdWVzdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwiY29udGVudCIsInBhcmFtcyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiR2V0IiwiaWQiLCJ0aGVuIiwiaXRlbSIsInllYXIiLCJ0aW1lIiwic2xpY2UiLCJtb250aCIsImRheSIsImxlbmd0aCIsImxhc3QiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsTUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU1UQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFEUCxTLFFBSVBDLE8sR0FBVSx1QixRQUVYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLE1BQXRDLEVBQVosRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTiw4Q0FETTtBQUVOO0FBRk0sUzs7Ozs7Z0NBS1E7QUFBQSxnQkFBWEwsSUFBVyx1RUFBSixFQUFJOztBQUNkLGlCQUFLTSxPQUFMLENBQWEsT0FBYixFQUFzQixXQUF0QixFQUFtQ04sSUFBbkM7QUFDSDs7O2lDQUVTO0FBQUE7O0FBQ04sMkJBQUtPLGVBQUwsQ0FBcUIsZUFBTztBQUN4Qix1QkFBS0MsT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxNQUFwQixHQUE2QkMsT0FBT0MsUUFBUCxDQUFnQixPQUFLSixPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLE1BQXBDLElBQThDLENBQTNFO0FBQ0EsdUJBQUtHLEtBQUwsQ0FBVyxFQUFDQyxTQUFTLE9BQVYsRUFBWDtBQUNILGFBSEQ7QUFJSDs7OytCQUVPQyxNLEVBQVE7QUFBQTs7QUFDWiwyQkFBS0MsV0FBTCxDQUFpQixFQUFDQyxPQUFPLFFBQVIsRUFBa0JDLE1BQU0sSUFBeEIsRUFBakI7QUFDQSxpQkFBS2hCLE9BQUwsQ0FBYWlCLEdBQWIsQ0FBaUI7QUFDYixpQ0FBaUJKLE9BQU9LO0FBRFgsYUFBakIsRUFFRywwQkFGSCxFQUdDQyxJQUhELENBR00saUJBQVk7QUFBQSxvQkFBVnJCLElBQVUsU0FBVkEsSUFBVTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNkLHlDQUFpQkEsSUFBakIsOEhBQXVCO0FBQUEsNEJBQWRzQixJQUFjOztBQUNuQkEsNkJBQUtDLElBQUwsR0FBWUQsS0FBS0UsSUFBTCxDQUFVQyxLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQVo7QUFDQUgsNkJBQUtJLEtBQUwsR0FBYUosS0FBS0UsSUFBTCxDQUFVQyxLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQWI7QUFDQUgsNkJBQUtLLEdBQUwsR0FBV0wsS0FBS0UsSUFBTCxDQUFVQyxLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQVg7QUFDSDtBQUxhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTWR6QixxQkFBS0EsS0FBSzRCLE1BQUwsR0FBYyxDQUFuQixFQUFzQkMsSUFBdEIsR0FBNkIsSUFBN0I7QUFDQSx1QkFBSzVCLFFBQUwsR0FBZ0JELElBQWhCO0FBQ0EsdUJBQUs4QixNQUFMO0FBQ0EsK0JBQUtDLFdBQUw7QUFDSCxhQWJEO0FBY0g7Ozs7RUEvQ29DLGVBQUtDLEk7O2tCQUF6QnRDLFciLCJmaWxlIjoiYWxsUHJvZ3Jlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFByb2dyZXNzIGZyb20gJy4uL2NvbXBvbmVudHMvY29tcC1wcm9ncmVzcydcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQcm9ncmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhajpg6jljobnqIsnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgcHJvZ3Jlc3M6IG51bGxcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgJHByb3BzID0ge1wicHJvZ3Jlc3NcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOml0ZW0ub25jZVwiOlwiaXRlbVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3Byb2dyZXNzJzogUHJvZ3Jlc3MsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogcGFyYW1zLmlkXHJcbiAgICAgICAgfSwgJy9Db21wYW55UHJvZ3Jlc3MvZ2V0TGlzdCcpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueWVhciA9IGl0ZW0udGltZS5zbGljZSgwLCA0KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5tb250aCA9IGl0ZW0udGltZS5zbGljZSg0LCA2KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXkgPSBpdGVtLnRpbWUuc2xpY2UoNiwgOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0ubGFzdCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==