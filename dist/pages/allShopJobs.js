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
        }, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "3" }, "v-bind:listItem.once": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "3" }, "type": { "for": "list", "item": "item", "index": "index", "key": "{{index}}", "value": "3" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'job-item': _jobListItem2.default,
            'loading': _loading2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllShopJobs, [{
        key: 'onLoad',
        value: function onLoad(_ref2) {
            var _this2 = this;

            var id = _ref2.id,
                shopId = _ref2.shopId,
                type = _ref2.type;

            this.loading = true;
            this.type = Number.parseInt(type);
            this.request.Get({
                'userCompanyId': id,
                'shopId': shopId
            }, '/ShopList/getInviteListByShopId').then(function (_ref3) {
                var data = _ref3.data;

                _this2.list = data;
                _this2.loading = false;
                _this2.$apply();
            });
        }
    }]);

    return AllShopJobs;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllShopJobs , 'pages/allShopJobs'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFNob3BKb2JzLmpzIl0sIm5hbWVzIjpbIkFsbFNob3BKb2JzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwicmVxdWVzdCIsImRhdGEiLCJsb2FkaW5nIiwibGlzdCIsInR5cGUiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImlkIiwic2hvcElkIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJHZXQiLCJ0aGVuIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixVQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLE8sR0FBVSx1QixRQUVWQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxrQkFBTSxFQUZIO0FBR0hDLGtCQUFNO0FBSEgsUyxRQU1SQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBQyxPQUFNLE1BQVAsRUFBYyxRQUFPLE1BQXJCLEVBQTRCLFNBQVEsT0FBcEMsRUFBNEMsT0FBTSxXQUFsRCxFQUE4RCxTQUFRLEdBQXRFLEVBQWhCLEVBQTJGLHdCQUF1QixFQUFDLE9BQU0sTUFBUCxFQUFjLFFBQU8sTUFBckIsRUFBNEIsU0FBUSxPQUFwQyxFQUE0QyxPQUFNLFdBQWxELEVBQThELFNBQVEsR0FBdEUsRUFBbEgsRUFBNkwsUUFBTyxFQUFDLE9BQU0sTUFBUCxFQUFjLFFBQU8sTUFBckIsRUFBNEIsU0FBUSxPQUFwQyxFQUE0QyxPQUFNLFdBQWxELEVBQThELFNBQVEsR0FBdEUsRUFBcE0sRUFBWixFQUE0UixXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFNBQXRDLEVBQXRTLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ04sNkNBRE07QUFFTjtBQUZNLFM7Ozs7O3NDQUtrQjtBQUFBOztBQUFBLGdCQUFuQkMsRUFBbUIsU0FBbkJBLEVBQW1CO0FBQUEsZ0JBQWZDLE1BQWUsU0FBZkEsTUFBZTtBQUFBLGdCQUFQTCxJQUFPLFNBQVBBLElBQU87O0FBQ3hCLGlCQUFLRixPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLRSxJQUFMLEdBQVlNLE9BQU9DLFFBQVAsQ0FBZ0JQLElBQWhCLENBQVo7QUFDQSxpQkFBS0osT0FBTCxDQUFhWSxHQUFiLENBQWlCO0FBQ2IsaUNBQWlCSixFQURKO0FBRWIsMEJBQVVDO0FBRkcsYUFBakIsRUFHRyxpQ0FISCxFQUlDSSxJQUpELENBSU0saUJBQVk7QUFBQSxvQkFBVlosSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLRSxJQUFMLEdBQVlGLElBQVo7QUFDQSx1QkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSx1QkFBS1ksTUFBTDtBQUNILGFBUkQ7QUFTSDs7OztFQW5Db0MsZUFBS0MsSTs7a0JBQXpCckIsVyIsImZpbGUiOiJhbGxTaG9wSm9icy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFNob3BKb2JzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivpeW6l+mTuuS4i+WFqOmDqOiBjOS9jScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgICB0eXBlOiAwXHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJqb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjNcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjNcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiM1wifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW0sXHJcbiAgICAgICAgJ2xvYWRpbmcnOiBMb2FkaW5nXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7aWQsIHNob3BJZCwgdHlwZX0pIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy50eXBlID0gTnVtYmVyLnBhcnNlSW50KHR5cGUpXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogaWQsXHJcbiAgICAgICAgICAgICdzaG9wSWQnOiBzaG9wSWRcclxuICAgICAgICB9LCAnL1Nob3BMaXN0L2dldEludml0ZUxpc3RCeVNob3BJZCcpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==