'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Jobs = function (_wepy$page) {
    _inherits(Jobs, _wepy$page);

    function Jobs() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Jobs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Jobs.__proto__ || Object.getPrototypeOf(Jobs)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark'
        }, _this.data = {
            loading: false,
            fixTab: false,
            autoplay: true,
            hasNot: false,
            tabIndex: 0,
            cityId: '0',
            cityName: '全国',
            bannerImg: [],
            tabList: ['最新职位', '最热职位'],
            newJobList: [],
            hotJobList: []
        }, _this.page = {
            scrollTop: 220,
            busy: false,
            newIndex: 1,
            hotIndex: 1
        }, _this.Request = new _request2.default(), _this.$props = { "new-job-item": { "xmlns:v-bind": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "v-bind:listItem.once": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "type": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" } }, "hot-job-item": { "v-bind:listItem.once": { "for": "hotJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "type": { "for": "hotJobList", "item": "item", "index": "index", "key": "key", "value": "1" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'new-job-item': _jobListItem2.default,
            'hot-job-item': _jobListItem2.default,
            'loading': _loading2.default
        }, _this.methods = {
            toggleTab: function toggleTab(index) {
                this.tabIndex = index;
                this.hasNot = false;
            },
            scrollToTop: function scrollToTop() {
                if (_wepy2.default.pageScrollTo) {
                    _wepy2.default.pageScrollTo({
                        scrollTop: 0
                    });
                } else {
                    _wepy2.default.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用回到顶部功能，请升级到最新微信版本后重试'
                    });
                }
            },
            toSearch: function toSearch() {
                _wepy2.default.navigateTo({
                    url: 'search'
                });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Jobs, [{
        key: 'getJobList',
        value: function getJobList() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

            return this.Request.Get({
                type: type,
                page: page,
                pageSize: size,
                cityId: this.cityId
            }, '/InviteWork/getRecommendList');
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.loading = true;
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this2.page.scrollTop = rect.top - 45;
            }).exec();
            // this.cityId = this.$parent.global.choose.region_id
            // this.cityName = this.$parent.global.choose.region_name
            var all = Promise.all([this.Request.Get({ type: '100' }, '/Banner/getListByType'), this.getJobList(0), this.getJobList(1)]);
            all.then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 3),
                    banner = _ref3[0],
                    newJob = _ref3[1],
                    hotJob = _ref3[2];

                _this2.bannerImg = banner.data[100];
                _this2.newJobList = newJob.data;
                _this2.hotJobList = hotJob.data;
                _this2.loading = false;
                _this2.$apply();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(event) {
            if (event.scrollTop >= this.page.scrollTop) {
                this.fixTab = true;
            } else {
                this.fixTab = false;
            }
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: '健身求职',
                path: '/pages/jobs',
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.hasNot = false;
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this3 = this;

            Promise.all([this.getJobList(0), this.getJobList(1)]).then(function (ret) {
                var _ret2 = _slicedToArray(ret, 2),
                    newJob = _ret2[0],
                    hotJob = _ret2[1];

                _this3.newJobList = newJob.data;
                _this3.hotJobList = hotJob.data;
                _this3.$apply();
                _wepy2.default.stopPullDownRefresh();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this4 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.tabIndex === 1) {
                if (this.hasNot) {
                    return false;
                }
                this.page.hotIndex++;
                this.page.busy = true;
                this.getJobList(1, this.page.hotIndex, 8).then(function (ret) {
                    if (Array.isArray(ret.data) && ret.data.length === 0) {
                        _this4.hasNot = true;
                    }
                    _this4.hotJobList = [].concat(_toConsumableArray(_this4.hotJobList), _toConsumableArray(ret.data));
                    _this4.page.busy = false;
                });
            } else {
                if (this.hasNot) {
                    return false;
                }
                this.page.newIndex++;
                this.page.busy = true;
                this.getJobList(0, this.page.newIndex, 8).then(function (ret) {
                    if (Array.isArray(ret.data) && ret.data.length === 0) {
                        _this4.hasNot = true;
                    }
                    _this4.newJobList = [].concat(_toConsumableArray(_this4.newJobList), _toConsumableArray(ret.data));
                    _this4.page.busy = false;
                });
            }
        }
    }]);

    return Jobs;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Jobs , 'pages/jobs'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYnMuanMiXSwibmFtZXMiOlsiSm9icyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJkYXRhIiwibG9hZGluZyIsImZpeFRhYiIsImF1dG9wbGF5IiwiaGFzTm90IiwidGFiSW5kZXgiLCJjaXR5SWQiLCJjaXR5TmFtZSIsImJhbm5lckltZyIsInRhYkxpc3QiLCJuZXdKb2JMaXN0IiwiaG90Sm9iTGlzdCIsInBhZ2UiLCJzY3JvbGxUb3AiLCJidXN5IiwibmV3SW5kZXgiLCJob3RJbmRleCIsIlJlcXVlc3QiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJ0b2dnbGVUYWIiLCJpbmRleCIsInNjcm9sbFRvVG9wIiwicGFnZVNjcm9sbFRvIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwidG9TZWFyY2giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZXZlbnRzIiwidHlwZSIsInNpemUiLCJHZXQiLCJwYWdlU2l6ZSIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJleGVjIiwiYWxsIiwiUHJvbWlzZSIsImdldEpvYkxpc3QiLCJ0aGVuIiwiYmFubmVyIiwibmV3Sm9iIiwiaG90Sm9iIiwiJGFwcGx5IiwiY2F0Y2giLCJlcnIiLCJldmVudCIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUI7QUFEaEIsUyxRQUlUQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxvQkFBUSxLQUZMO0FBR0hDLHNCQUFVLElBSFA7QUFJSEMsb0JBQVEsS0FKTDtBQUtIQyxzQkFBVSxDQUxQO0FBTUhDLG9CQUFRLEdBTkw7QUFPSEMsc0JBQVUsSUFQUDtBQVFIQyx1QkFBVyxFQVJSO0FBU0hDLHFCQUFTLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FUTjtBQVVIQyx3QkFBWSxFQVZUO0FBV0hDLHdCQUFZO0FBWFQsUyxRQWNQQyxJLEdBQU87QUFDSEMsdUJBQVcsR0FEUjtBQUVIQyxrQkFBTSxLQUZIO0FBR0hDLHNCQUFVLENBSFA7QUFJSEMsc0JBQVU7QUFKUCxTLFFBT1BDLE8sR0FBVSx1QixRQVdYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGdCQUFlLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFFBQU8sTUFBM0IsRUFBa0MsU0FBUSxPQUExQyxFQUFrRCxPQUFNLEtBQXhELEVBQThELFNBQVEsR0FBdEUsRUFBaEIsRUFBMkYsd0JBQXVCLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFFBQU8sTUFBM0IsRUFBa0MsU0FBUSxPQUExQyxFQUFrRCxPQUFNLEtBQXhELEVBQThELFNBQVEsR0FBdEUsRUFBbEgsRUFBNkwsUUFBTyxFQUFDLE9BQU0sWUFBUCxFQUFvQixRQUFPLE1BQTNCLEVBQWtDLFNBQVEsT0FBMUMsRUFBa0QsT0FBTSxLQUF4RCxFQUE4RCxTQUFRLEdBQXRFLEVBQXBNLEVBQWhCLEVBQWdTLGdCQUFlLEVBQUMsd0JBQXVCLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFFBQU8sTUFBM0IsRUFBa0MsU0FBUSxPQUExQyxFQUFrRCxPQUFNLEtBQXhELEVBQThELFNBQVEsR0FBdEUsRUFBeEIsRUFBbUcsUUFBTyxFQUFDLE9BQU0sWUFBUCxFQUFvQixRQUFPLE1BQTNCLEVBQWtDLFNBQVEsT0FBMUMsRUFBa0QsT0FBTSxLQUF4RCxFQUE4RCxTQUFRLEdBQXRFLEVBQTFHLEVBQS9TLEVBQXFlLFdBQVUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsU0FBdEMsRUFBL2UsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTixpREFETTtBQUVOLGlEQUZNO0FBR047QUFITSxTLFFBTVZDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDS0MsS0FETCxFQUNZO0FBQ2QscUJBQUtsQixRQUFMLEdBQWdCa0IsS0FBaEI7QUFDQSxxQkFBS25CLE1BQUwsR0FBYyxLQUFkO0FBQ0gsYUFKSztBQUtOb0IsdUJBTE0seUJBS1M7QUFDWCxvQkFBSSxlQUFLQyxZQUFULEVBQXVCO0FBQ25CLG1DQUFLQSxZQUFMLENBQWtCO0FBQ2RaLG1DQUFXO0FBREcscUJBQWxCO0FBR0gsaUJBSkQsTUFJTztBQUNILG1DQUFLYSxTQUFMLENBQWU7QUFDWEMsK0JBQU8sSUFESTtBQUVYQyxpQ0FBUztBQUZFLHFCQUFmO0FBSUg7QUFDSixhQWhCSztBQWlCTkMsb0JBakJNLHNCQWlCTTtBQUNSLCtCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHlCQUFLO0FBRE8saUJBQWhCO0FBR0g7QUFyQkssUyxRQXdCVkMsTSxHQUFTLEU7Ozs7O3FDQXpDaUM7QUFBQSxnQkFBOUJDLElBQThCLHVFQUF2QixDQUF1QjtBQUFBLGdCQUFwQnJCLElBQW9CLHVFQUFiLENBQWE7QUFBQSxnQkFBVnNCLElBQVUsdUVBQUgsQ0FBRzs7QUFDdEMsbUJBQU8sS0FBS2pCLE9BQUwsQ0FBYWtCLEdBQWIsQ0FBaUI7QUFDcEJGLHNCQUFNQSxJQURjO0FBRXBCckIsc0JBQU1BLElBRmM7QUFHcEJ3QiwwQkFBVUYsSUFIVTtBQUlwQjVCLHdCQUFRLEtBQUtBO0FBSk8sYUFBakIsRUFLSiw4QkFMSSxDQUFQO0FBTUg7OztpQ0FxQ1M7QUFBQTs7QUFDTixpQkFBS0wsT0FBTCxHQUFlLElBQWY7QUFDQW9DLGVBQUdDLG1CQUFILEdBQXlCQyxNQUF6QixDQUFnQyxRQUFoQyxFQUEwQ0Msa0JBQTFDLENBQTZELGdCQUFRO0FBQ2pFLHVCQUFLNUIsSUFBTCxDQUFVQyxTQUFWLEdBQXNCNEIsS0FBS0MsR0FBTCxHQUFXLEVBQWpDO0FBQ0gsYUFGRCxFQUVHQyxJQUZIO0FBR0E7QUFDQTtBQUNBLGdCQUFJQyxNQUFNQyxRQUFRRCxHQUFSLENBQVksQ0FDbEIsS0FBSzNCLE9BQUwsQ0FBYWtCLEdBQWIsQ0FBaUIsRUFBQ0YsTUFBTSxLQUFQLEVBQWpCLEVBQWdDLHVCQUFoQyxDQURrQixFQUVsQixLQUFLYSxVQUFMLENBQWdCLENBQWhCLENBRmtCLEVBR2xCLEtBQUtBLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FIa0IsQ0FBWixDQUFWO0FBS0FGLGdCQUFJRyxJQUFKLENBQVMsaUJBQThCO0FBQUE7QUFBQSxvQkFBNUJDLE1BQTRCO0FBQUEsb0JBQXBCQyxNQUFvQjtBQUFBLG9CQUFaQyxNQUFZOztBQUNuQyx1QkFBSzFDLFNBQUwsR0FBaUJ3QyxPQUFPaEQsSUFBUCxDQUFZLEdBQVosQ0FBakI7QUFDQSx1QkFBS1UsVUFBTCxHQUFrQnVDLE9BQU9qRCxJQUF6QjtBQUNBLHVCQUFLVyxVQUFMLEdBQWtCdUMsT0FBT2xELElBQXpCO0FBQ0EsdUJBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQUtrRCxNQUFMO0FBQ0gsYUFORCxFQU9DQyxLQVBELENBT08sZUFBTztBQUNWLDhCQUFJQyxHQUFKO0FBQ0gsYUFURDtBQVVIOzs7cUNBRWFDLEssRUFBTztBQUNqQixnQkFBSUEsTUFBTXpDLFNBQU4sSUFBbUIsS0FBS0QsSUFBTCxDQUFVQyxTQUFqQyxFQUE0QztBQUN4QyxxQkFBS1gsTUFBTCxHQUFjLElBQWQ7QUFDSCxhQUZELE1BRU87QUFDSCxxQkFBS0EsTUFBTCxHQUFjLEtBQWQ7QUFDSDtBQUNKOzs7NENBRW9CO0FBQ2pCLG1CQUFPO0FBQ0h5Qix1QkFBTyxNQURKO0FBRUg0QixtQ0FGRztBQUdIQyx5QkFBUyxzQkFBTztBQUNaLGtDQUFJQyxHQUFKO0FBQ0gsaUJBTEU7QUFNSEMsc0JBQU0sbUJBQU87QUFDVCxrQ0FBSUwsR0FBSjtBQUNIO0FBUkUsYUFBUDtBQVVIOzs7aUNBRVM7QUFDTixpQkFBS2pELE1BQUwsR0FBYyxLQUFkO0FBQ0g7Ozs0Q0FFb0I7QUFBQTs7QUFDakJ5QyxvQkFBUUQsR0FBUixDQUFZLENBQUMsS0FBS0UsVUFBTCxDQUFnQixDQUFoQixDQUFELEVBQXFCLEtBQUtBLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBckIsQ0FBWixFQUNDQyxJQURELENBQ00sZUFBTztBQUFBLDJDQUNjVSxHQURkO0FBQUEsb0JBQ0pSLE1BREk7QUFBQSxvQkFDSUMsTUFESjs7QUFFVCx1QkFBS3hDLFVBQUwsR0FBa0J1QyxPQUFPakQsSUFBekI7QUFDQSx1QkFBS1csVUFBTCxHQUFrQnVDLE9BQU9sRCxJQUF6QjtBQUNBLHVCQUFLbUQsTUFBTDtBQUNBLCtCQUFLUSxtQkFBTDtBQUNILGFBUEQsRUFRQ1AsS0FSRCxDQVFPLGVBQU87QUFDViw4QkFBSUMsR0FBSjtBQUNILGFBVkQ7QUFXSDs7O3dDQUVnQjtBQUFBOztBQUNiLGdCQUFJLEtBQUt6QyxJQUFMLENBQVVFLElBQWQsRUFBb0I7QUFBRSx1QkFBTyxLQUFQO0FBQWM7QUFDcEMsZ0JBQUksS0FBS1QsUUFBTCxLQUFrQixDQUF0QixFQUF5QjtBQUNyQixvQkFBSSxLQUFLRCxNQUFULEVBQWlCO0FBQUUsMkJBQU8sS0FBUDtBQUFjO0FBQ2pDLHFCQUFLUSxJQUFMLENBQVVJLFFBQVY7QUFDQSxxQkFBS0osSUFBTCxDQUFVRSxJQUFWLEdBQWlCLElBQWpCO0FBQ0EscUJBQUtnQyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLEtBQUtsQyxJQUFMLENBQVVJLFFBQTdCLEVBQXVDLENBQXZDLEVBQ0MrQixJQURELENBQ00sZUFBTztBQUNULHdCQUFJYSxNQUFNQyxPQUFOLENBQWNKLElBQUl6RCxJQUFsQixLQUEyQnlELElBQUl6RCxJQUFKLENBQVM4RCxNQUFULEtBQW9CLENBQW5ELEVBQXNEO0FBQ2xELCtCQUFLMUQsTUFBTCxHQUFjLElBQWQ7QUFDSDtBQUNELDJCQUFLTyxVQUFMLGdDQUFzQixPQUFLQSxVQUEzQixzQkFBMEM4QyxJQUFJekQsSUFBOUM7QUFDQSwyQkFBS1ksSUFBTCxDQUFVRSxJQUFWLEdBQWlCLEtBQWpCO0FBQ0gsaUJBUEQ7QUFRSCxhQVpELE1BWU87QUFDSCxvQkFBSSxLQUFLVixNQUFULEVBQWlCO0FBQUUsMkJBQU8sS0FBUDtBQUFjO0FBQ2pDLHFCQUFLUSxJQUFMLENBQVVHLFFBQVY7QUFDQSxxQkFBS0gsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLElBQWpCO0FBQ0EscUJBQUtnQyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLEtBQUtsQyxJQUFMLENBQVVHLFFBQTdCLEVBQXVDLENBQXZDLEVBQ0NnQyxJQURELENBQ00sZUFBTztBQUNULHdCQUFJYSxNQUFNQyxPQUFOLENBQWNKLElBQUl6RCxJQUFsQixLQUEyQnlELElBQUl6RCxJQUFKLENBQVM4RCxNQUFULEtBQW9CLENBQW5ELEVBQXNEO0FBQ2xELCtCQUFLMUQsTUFBTCxHQUFjLElBQWQ7QUFDSDtBQUNELDJCQUFLTSxVQUFMLGdDQUFzQixPQUFLQSxVQUEzQixzQkFBMEMrQyxJQUFJekQsSUFBOUM7QUFDQSwyQkFBS1ksSUFBTCxDQUFVRSxJQUFWLEdBQWlCLEtBQWpCO0FBQ0gsaUJBUEQ7QUFRSDtBQUNKOzs7O0VBbEs2QixlQUFLRixJOztrQkFBbEJmLEkiLCJmaWxlIjoiam9icy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9icyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBmaXhUYWI6IGZhbHNlLFxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2UsXHJcbiAgICAgICAgdGFiSW5kZXg6IDAsXHJcbiAgICAgICAgY2l0eUlkOiAnMCcsXHJcbiAgICAgICAgY2l0eU5hbWU6ICflhajlm70nLFxyXG4gICAgICAgIGJhbm5lckltZzogW10sXHJcbiAgICAgICAgdGFiTGlzdDogWyfmnIDmlrDogYzkvY0nLCAn5pyA54Ot6IGM5L2NJ10sXHJcbiAgICAgICAgbmV3Sm9iTGlzdDogW10sXHJcbiAgICAgICAgaG90Sm9iTGlzdDogW11cclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIHNjcm9sbFRvcDogMjIwLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIG5ld0luZGV4OiAxLFxyXG4gICAgICAgIGhvdEluZGV4OiAxXHJcbiAgICB9XHJcblxyXG4gICAgUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBnZXRKb2JMaXN0ICh0eXBlID0gMCwgcGFnZSA9IDEsIHNpemUgPSA1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogc2l6ZSxcclxuICAgICAgICAgICAgY2l0eUlkOiB0aGlzLmNpdHlJZFxyXG4gICAgICAgIH0sICcvSW52aXRlV29yay9nZXRSZWNvbW1lbmRMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcIm5ldy1qb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJuZXdKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJob3Qtam9iLWl0ZW1cIjp7XCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiaG90Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJob3RKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICduZXctam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdob3Qtam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlVGFiIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVG9Ub3AgKCkge1xyXG4gICAgICAgICAgICBpZiAod2VweS5wYWdlU2Nyb2xsVG8pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjlm57liLDpobbpg6jlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5UnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b1NlYXJjaCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdzZWFyY2gnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcjZml4ZWQnKS5ib3VuZGluZ0NsaWVudFJlY3QocmVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY3JvbGxUb3AgPSByZWN0LnRvcCAtIDQ1XHJcbiAgICAgICAgfSkuZXhlYygpXHJcbiAgICAgICAgLy8gdGhpcy5jaXR5SWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZS5yZWdpb25faWRcclxuICAgICAgICAvLyB0aGlzLmNpdHlOYW1lID0gdGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UucmVnaW9uX25hbWVcclxuICAgICAgICBsZXQgYWxsID0gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHt0eXBlOiAnMTAwJ30sICcvQmFubmVyL2dldExpc3RCeVR5cGUnKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDApLFxyXG4gICAgICAgICAgICB0aGlzLmdldEpvYkxpc3QoMSlcclxuICAgICAgICBdKVxyXG4gICAgICAgIGFsbC50aGVuKChbYmFubmVyLCBuZXdKb2IsIGhvdEpvYl0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJJbWcgPSBiYW5uZXIuZGF0YVsxMDBdXHJcbiAgICAgICAgICAgIHRoaXMubmV3Sm9iTGlzdCA9IG5ld0pvYi5kYXRhXHJcbiAgICAgICAgICAgIHRoaXMuaG90Sm9iTGlzdCA9IGhvdEpvYi5kYXRhXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25QYWdlU2Nyb2xsIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5zY3JvbGxUb3AgPj0gdGhpcy5wYWdlLnNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpeFRhYiA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpeFRhYiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WBpei6q+axguiBjCcsXHJcbiAgICAgICAgICAgIHBhdGg6IGAvcGFnZXMvam9ic2AsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkhpZGUgKCkge1xyXG4gICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0Sm9iTGlzdCgwKSwgdGhpcy5nZXRKb2JMaXN0KDEpXSlcclxuICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgW25ld0pvYiwgaG90Sm9iXSA9IHJldFxyXG4gICAgICAgICAgICB0aGlzLm5ld0pvYkxpc3QgPSBuZXdKb2IuZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmhvdEpvYkxpc3QgPSBob3RKb2IuZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuYnVzeSkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhYkluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05vdCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuaG90SW5kZXgrK1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDEsIHRoaXMucGFnZS5ob3RJbmRleCwgOClcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldC5kYXRhKSAmJiByZXQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaG90Sm9iTGlzdCA9IFsuLi50aGlzLmhvdEpvYkxpc3QsIC4uLnJldC5kYXRhXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05vdCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UubmV3SW5kZXgrK1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDAsIHRoaXMucGFnZS5uZXdJbmRleCwgOClcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldC5kYXRhKSAmJiByZXQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3Sm9iTGlzdCA9IFsuLi50aGlzLm5ld0pvYkxpc3QsIC4uLnJldC5kYXRhXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=