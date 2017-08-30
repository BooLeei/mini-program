'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllShopJobs = function (_wepy$page) {
    _inherits(AllShopJobs, _wepy$page);

    function AllShopJobs() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllShopJobs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllShopJobs.__proto__ || Object.getPrototypeOf(AllShopJobs)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '该店铺下全部职位',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.data = {
            loading: false,
            list: [],
            type: 0
        }, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "8" }, "v-bind:listItem.once": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "8" }, "type": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "8" } } }, _this.$events = {}, _this.components = {
            'job-item': _jobListItem2.default,
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllShopJobs, [{
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
        value: function onLoad(_ref2) {
            var _this3 = this;

            var id = _ref2.id,
                shopId = _ref2.shopId,
                type = _ref2.type;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.type = Number.parseInt(type);
            this.request.Get({
                'userCompanyId': id,
                'shopId': shopId
            }, '/ShopList/getInviteListByShopId').then(function (_ref3) {
                var data = _ref3.data;

                _this3.list = data;
                // this.loading = false
                _wepy2.default.hideLoading();
                _this3.$apply();
            });
        }
    }]);

    return AllShopJobs;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllShopJobs , 'pages/allShopJobs'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFNob3BKb2JzLmpzIl0sIm5hbWVzIjpbIkFsbFNob3BKb2JzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwibGlzdCIsInR5cGUiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0b2FzdCIsImNvbnRlbnQiLCJpZCIsInNob3BJZCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiR2V0IiwidGhlbiIsImhpZGVMb2FkaW5nIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLFVBRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVEMsTyxHQUFVLHVCLFFBRVZDLEksR0FBTztBQUNIQyxxQkFBUyxLQUROO0FBRUhDLGtCQUFNLEVBRkg7QUFHSEMsa0JBQU07QUFISCxTLFFBTVJDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFDLE9BQU0sTUFBUCxFQUFjLFFBQU8sTUFBckIsRUFBNEIsU0FBUSxPQUFwQyxFQUE0QyxPQUFNLFdBQWxELEVBQThELFNBQVEsR0FBdEUsRUFBaEIsRUFBMkYsd0JBQXVCLEVBQUMsT0FBTSxNQUFQLEVBQWMsUUFBTyxNQUFyQixFQUE0QixTQUFRLE9BQXBDLEVBQTRDLE9BQU0sV0FBbEQsRUFBOEQsU0FBUSxHQUF0RSxFQUFsSCxFQUE2TCxRQUFPLEVBQUMsT0FBTSxNQUFQLEVBQWMsUUFBTyxNQUFyQixFQUE0QixTQUFRLE9BQXBDLEVBQTRDLE9BQU0sV0FBbEQsRUFBOEQsU0FBUSxHQUF0RSxFQUFwTSxFQUFaLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ04sNkNBRE07QUFFTix3Q0FGTTtBQUdOO0FBSE0sUzs7Ozs7Z0NBTVE7QUFBQSxnQkFBWE4sSUFBVyx1RUFBSixFQUFJOztBQUNkLGlCQUFLTyxPQUFMLENBQWEsT0FBYixFQUFzQixXQUF0QixFQUFtQ1AsSUFBbkM7QUFDSDs7O2lDQUVTO0FBQUE7O0FBQ04sMkJBQUtRLGVBQUwsQ0FBcUIsZUFBTztBQUN4Qix1QkFBS0MsT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxNQUFwQixHQUE2QkMsT0FBT0MsUUFBUCxDQUFnQixPQUFLSixPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLE1BQXBDLElBQThDLENBQTNFO0FBQ0EsdUJBQUtHLEtBQUwsQ0FBVyxFQUFDQyxTQUFTLE9BQVYsRUFBWDtBQUNILGFBSEQ7QUFJSDs7O3NDQUUyQjtBQUFBOztBQUFBLGdCQUFuQkMsRUFBbUIsU0FBbkJBLEVBQW1CO0FBQUEsZ0JBQWZDLE1BQWUsU0FBZkEsTUFBZTtBQUFBLGdCQUFQZCxJQUFPLFNBQVBBLElBQU87O0FBQ3hCO0FBQ0EsMkJBQUtlLFdBQUwsQ0FBaUIsRUFBQ0MsT0FBTyxRQUFSLEVBQWtCQyxNQUFNLElBQXhCLEVBQWpCO0FBQ0EsaUJBQUtqQixJQUFMLEdBQVlTLE9BQU9DLFFBQVAsQ0FBZ0JWLElBQWhCLENBQVo7QUFDQSxpQkFBS0osT0FBTCxDQUFhc0IsR0FBYixDQUFpQjtBQUNiLGlDQUFpQkwsRUFESjtBQUViLDBCQUFVQztBQUZHLGFBQWpCLEVBR0csaUNBSEgsRUFJQ0ssSUFKRCxDQUlNLGlCQUFZO0FBQUEsb0JBQVZ0QixJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtFLElBQUwsR0FBWUYsSUFBWjtBQUNBO0FBQ0EsK0JBQUt1QixXQUFMO0FBQ0EsdUJBQUtDLE1BQUw7QUFDSCxhQVREO0FBVUg7Ozs7RUFqRG9DLGVBQUtDLEk7O2tCQUF6QmhDLFciLCJmaWxlIjoiYWxsU2hvcEpvYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsU2hvcEpvYnMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K+l5bqX6ZO65LiL5YWo6YOo6IGM5L2NJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICAgIHR5cGU6IDBcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImpvYi1pdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiOFwifSxcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiOFwifSxcInR5cGVcIjp7XCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCI4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2pvYi1pdGVtJzogSm9iSXRlbSxcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHtpZCwgc2hvcElkLCB0eXBlfSkge1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIHRoaXMudHlwZSA9IE51bWJlci5wYXJzZUludCh0eXBlKVxyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IGlkLFxyXG4gICAgICAgICAgICAnc2hvcElkJzogc2hvcElkXHJcbiAgICAgICAgfSwgJy9TaG9wTGlzdC9nZXRJbnZpdGVMaXN0QnlTaG9wSWQnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gZGF0YVxyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19