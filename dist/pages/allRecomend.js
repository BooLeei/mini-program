'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllRecomend = function (_wepy$page) {
    _inherits(AllRecomend, _wepy$page);

    function AllRecomend() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllRecomend);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllRecomend.__proto__ || Object.getPrototypeOf(AllRecomend)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '推荐公司',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default
        }, _this.data = {
            loading: false,
            hasLogin: false,
            recomend: []
        }, _this.request = new _request2.default(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllRecomend, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.loading = true;
            this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList').then(function (_ref2) {
                var data = _ref2.data;

                _this2.recomend = data;
                _this2.loading = false;
                _this2.$apply();
            });
        }
    }]);

    return AllRecomend;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllRecomend , 'pages/allRecomend'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFJlY29tZW5kLmpzIl0sIm5hbWVzIjpbIkFsbFJlY29tZW5kIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkYXRhIiwibG9hZGluZyIsImhhc0xvZ2luIiwicmVjb21lbmQiLCJyZXF1ZXN0IiwiR2V0IiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsTUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9WQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFNBQXRDLEVBQVgsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTjtBQURNLFMsUUFJVkMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMsc0JBQVUsS0FGUDtBQUdIQyxzQkFBVTtBQUhQLFMsUUFNUEMsTyxHQUFVLHVCOzs7OztpQ0FFRDtBQUFBOztBQUNMLGlCQUFLSCxPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLRyxPQUFMLENBQWFDLEdBQWIsQ0FBaUIsRUFBQyxRQUFRLENBQVQsRUFBWSxVQUFVLGVBQUtDLGNBQUwsQ0FBb0IsUUFBcEIsS0FBaUMsQ0FBdkQsRUFBakIsRUFBNEUsMkJBQTVFLEVBQ0tDLElBREwsQ0FDVSxpQkFBWTtBQUFBLG9CQUFWUCxJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtHLFFBQUwsR0FBZ0JILElBQWhCO0FBQ0EsdUJBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQUtPLE1BQUw7QUFDSCxhQUxMO0FBTUg7Ozs7RUE5Qm9DLGVBQUtDLEk7O2tCQUF6QmxCLFciLCJmaWxlIjoiYWxsUmVjb21lbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFJlY29tZW5kIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aOqOiNkOWFrOWPuCcsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IGxvYWRpbmdcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGhhc0xvZ2luOiBmYWxzZSxcclxuICAgICAgICByZWNvbWVuZDogW11cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7J3R5cGUnOiAwLCAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMH0sICcvQ29tcGFueS9nZXRSZWNvbW1lbmRMaXN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbWVuZCA9IGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cbiJdfQ==