'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _sliderDelay = require('./../components/slider-delay.js');

var _sliderDelay2 = _interopRequireDefault(_sliderDelay);

var _compListItem = require('./../components/comp-list-item.js');

var _compListItem2 = _interopRequireDefault(_compListItem);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Companys = function (_wepy$page) {
    _inherits(Companys, _wepy$page);

    function Companys() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Companys);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Companys.__proto__ || Object.getPrototypeOf(Companys)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '招聘公司'
        }, _this.data = {
            loading: false,
            companys: [],
            hasLogin: true,
            slideDown: false,
            fixed: false,
            companyType: 0,
            companyTypeName: '全国公司',
            hasNot: true,
            minHeight: 0
        }, _this.request = new _request2.default(), _this.page = {
            busy: false,
            index: 1,
            scrollTop: 0
        }, _this.swiper = {
            first: [],
            second: [],
            third: []
        }, _this.computed = {
            companyTypeName: function companyTypeName() {
                switch (this.companyType) {
                    case 0:
                        return '全部公司';
                    case 1:
                        return '俱乐部';
                    case 2:
                        return '工作室';
                    case 3:
                        return '瑜伽馆';
                    case 4:
                        return '培训学院';
                    case 5:
                        return '器械设备';
                    case 6:
                        return '媒体资讯';
                    case 7:
                        return '会展/活动/赛事';
                    case 8:
                        return '互联网';
                    case 9:
                        return '其他';
                    default:
                        return '';
                }
            }
        }, _this.watch = {
            companyType: function companyType(newVal, oldVal) {
                var _this2 = this;

                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                this.page.index = 1;
                this.getCompanyList().then(function (_ref2) {
                    var data = _ref2.data;

                    if (data.length < 8) {
                        _this2.hasNot = true;
                    } else {
                        _this2.hasNot = false;
                    }
                    _this2.companys = data;
                    _this2.$apply();
                    _wepy2.default.pageScrollTo({
                        scrollTop: 283
                    });
                    _wepy2.default.hideLoading();
                });
            }
        }, _this.methods = {
            slideToBottom: function slideToBottom() {
                var _this3 = this;

                if (!this.fixed) {
                    _wepy2.default.pageScrollTo({
                        scrollTop: this.page.scrollTop
                    });
                    this.fixed = true;
                }
                setTimeout(function () {
                    _this3.slideDown = !_this3.slideDown;
                    _this3.$apply();
                });
            },
            slideToTop: function slideToTop(e) {
                if (e.target.dataset.type) {
                    this.companyType = Number.parseInt(e.target.dataset.type);
                }
                this.slideDown = !this.slideDown;
            },
            stop: function stop(e) {
                return false;
            },
            toAllRecomend: function toAllRecomend() {
                _wepy2.default.navigateTo({ url: './allRecomend' });
            }
        }, _this.$props = { "comp-item": { "xmlns:v-bind": { "for": "companys", "item": "item", "index": "index", "key": "key", "value": "item" }, "v-bind:listItem.once": { "for": "companys", "item": "item", "index": "index", "key": "key", "value": "item" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" }, "slider": { "xmlns:v-bind": "", "v-bind:login.sync": "hasLogin" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default,
            'slider': _sliderDelay2.default,
            'comp-item': _compListItem2.default,
            'toast': _toast2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Companys, [{
        key: 'getCompanyList',
        value: function getCompanyList() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                'cityId': this.$parent.global.choose.region_id,
                'page': page,
                'pageSize': pageSize,
                'companyType': this.companyType
            }, '/User/getUserCompanyList');
        }
    }, {
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: '健身求职',
                path: '/pages/companys',
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this4 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this4.$parent.global.curVal = Number.parseInt(_this4.$parent.global.curVal) + 1;
                _this4.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this5 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            Promise.all([this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList'), this.getCompanyList()]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    data = _ref4[0].data,
                    list = _ref4[1].data;

                if (list.length < 8) {
                    _this5.hasNot = true;
                } else {
                    _this5.hasNot = false;
                }
                _this5.companys = list;
                _this5.swiper.first = [];
                _this5.swiper.second = [];
                _this5.swiper.third = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            index = _step$value[0],
                            item = _step$value[1];

                        if (index % 3 === 0) {
                            _this5.swiper.first.push(item);
                        } else if (index % 3 === 1) {
                            _this5.swiper.second.push(item);
                        } else if (index % 3 === 2) {
                            _this5.swiper.third.push(item);
                        } else {
                            continue;
                        }
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

                _this5.$invoke('slider', 'invokeData', { type: 1, arr: _this5.swiper.first });
                _this5.$invoke('slider', 'invokeData', { type: 2, arr: _this5.swiper.second });
                _this5.$invoke('slider', 'invokeData', { type: 3, arr: _this5.swiper.third });
                _this5.$apply();
                _wepy2.default.hideLoading();
                _wepy2.default.stopPullDownRefresh();
            });
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(e) {
            if (e.scrollTop >= this.page.scrollTop) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.companyType = 0;
            this.slideDown = false;
            this.fixed = false;
            this.hasNot = false;
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this6 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getCompanyList(this.page.index).then(function (_ref5) {
                var data = _ref5.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this6.hasNot = true;
                }
                _this6.companys = [].concat(_toConsumableArray(_this6.companys), _toConsumableArray(data));
                _this6.page.busy = false;
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this7 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                        _this7.minHeight = res.windowHeight;
                        _this7.page.scrollTop = rect.top;
                        _this7.$apply();
                    }).exec();
                }
            });
            Promise.all([this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList'), this.getCompanyList()]).then(function (_ref6) {
                var _ref7 = _slicedToArray(_ref6, 2),
                    data = _ref7[0].data,
                    list = _ref7[1].data;

                if (list.length < 8) {
                    _this7.hasNot = true;
                } else {
                    _this7.hasNot = false;
                }
                _this7.companys = list;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2),
                            index = _step2$value[0],
                            item = _step2$value[1];

                        if (index % 3 === 0) {
                            _this7.swiper.first.push(item);
                        } else if (index % 3 === 1) {
                            _this7.swiper.second.push(item);
                        } else if (index % 3 === 2) {
                            _this7.swiper.third.push(item);
                        } else {
                            continue;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this7.$invoke('slider', 'invokeData', { type: 1, arr: _this7.swiper.first });
                _this7.$invoke('slider', 'invokeData', { type: 2, arr: _this7.swiper.second });
                _this7.$invoke('slider', 'invokeData', { type: 3, arr: _this7.swiper.third });
                // this.loading = false
                _wepy2.default.hideLoading();
                _this7.$apply();
            });
        }
    }]);

    return Companys;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Companys , 'pages/companys'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnlzLmpzIl0sIm5hbWVzIjpbIkNvbXBhbnlzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibG9hZGluZyIsImNvbXBhbnlzIiwiaGFzTG9naW4iLCJzbGlkZURvd24iLCJmaXhlZCIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwiaGFzTm90IiwibWluSGVpZ2h0IiwicmVxdWVzdCIsInBhZ2UiLCJidXN5IiwiaW5kZXgiLCJzY3JvbGxUb3AiLCJzd2lwZXIiLCJmaXJzdCIsInNlY29uZCIsInRoaXJkIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiZ2V0Q29tcGFueUxpc3QiLCJ0aGVuIiwibGVuZ3RoIiwiJGFwcGx5IiwicGFnZVNjcm9sbFRvIiwiaGlkZUxvYWRpbmciLCJtZXRob2RzIiwic2xpZGVUb0JvdHRvbSIsInNldFRpbWVvdXQiLCJzbGlkZVRvVG9wIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJ0eXBlIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJzdG9wIiwidG9BbGxSZWNvbWVuZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhZ2VTaXplIiwiR2V0IiwiJHBhcmVudCIsImdsb2JhbCIsImNob29zZSIsInJlZ2lvbl9pZCIsIiRpbnZva2UiLCJwYXRoIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJvblNvY2tldE1lc3NhZ2UiLCJjdXJWYWwiLCJ0b2FzdCIsImNvbnRlbnQiLCJQcm9taXNlIiwiYWxsIiwiZ2V0U3RvcmFnZVN5bmMiLCJsaXN0IiwiZW50cmllcyIsIml0ZW0iLCJwdXNoIiwiYXJyIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsIkFycmF5IiwiaXNBcnJheSIsImdldFN5c3RlbUluZm8iLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJyZXMiLCJ3aW5kb3dIZWlnaHQiLCJyZWN0IiwidG9wIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyxzQkFBVSxJQUhQO0FBSUhDLHVCQUFXLEtBSlI7QUFLSEMsbUJBQU8sS0FMSjtBQU1IQyx5QkFBYSxDQU5WO0FBT0hDLDZCQUFpQixNQVBkO0FBUUhDLG9CQUFRLElBUkw7QUFTSEMsdUJBQVc7QUFUUixTLFFBWVBDLE8sR0FBVSx1QixRQVdWQyxJLEdBQU87QUFDSEMsa0JBQU0sS0FESDtBQUVIQyxtQkFBTyxDQUZKO0FBR0hDLHVCQUFXO0FBSFIsUyxRQU1QQyxNLEdBQVM7QUFDTEMsbUJBQU8sRUFERjtBQUVMQyxvQkFBUSxFQUZIO0FBR0xDLG1CQUFPO0FBSEYsUyxRQU1UQyxRLEdBQVc7QUFDUFosMkJBRE8sNkJBQ1k7QUFDZix3QkFBUSxLQUFLRCxXQUFiO0FBQ0EseUJBQUssQ0FBTDtBQUNJLCtCQUFPLE1BQVA7QUFDSix5QkFBSyxDQUFMO0FBQ0ksK0JBQU8sS0FBUDtBQUNKLHlCQUFLLENBQUw7QUFDSSwrQkFBTyxLQUFQO0FBQ0oseUJBQUssQ0FBTDtBQUNJLCtCQUFPLEtBQVA7QUFDSix5QkFBSyxDQUFMO0FBQ0ksK0JBQU8sTUFBUDtBQUNKLHlCQUFLLENBQUw7QUFDSSwrQkFBTyxNQUFQO0FBQ0oseUJBQUssQ0FBTDtBQUNJLCtCQUFPLE1BQVA7QUFDSix5QkFBSyxDQUFMO0FBQ0ksK0JBQU8sVUFBUDtBQUNKLHlCQUFLLENBQUw7QUFDSSwrQkFBTyxLQUFQO0FBQ0oseUJBQUssQ0FBTDtBQUNJLCtCQUFPLElBQVA7QUFDSjtBQUNJLCtCQUFPLEVBQVA7QUF0Qko7QUF3Qkg7QUExQk0sUyxRQTZCWGMsSyxHQUFRO0FBQ0pkLHVCQURJLHVCQUNTZSxNQURULEVBQ2lCQyxNQURqQixFQUN5QjtBQUFBOztBQUN6QiwrQkFBS0MsV0FBTCxDQUFpQixFQUFDQyxPQUFPLFFBQVIsRUFBa0JDLE1BQU0sSUFBeEIsRUFBakI7QUFDQSxxQkFBS2QsSUFBTCxDQUFVRSxLQUFWLEdBQWtCLENBQWxCO0FBQ0EscUJBQUthLGNBQUwsR0FDQ0MsSUFERCxDQUNNLGlCQUFZO0FBQUEsd0JBQVYzQixJQUFVLFNBQVZBLElBQVU7O0FBQ2Qsd0JBQUlBLEtBQUs0QixNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakIsK0JBQUtwQixNQUFMLEdBQWMsSUFBZDtBQUNILHFCQUZELE1BRU87QUFDSCwrQkFBS0EsTUFBTCxHQUFjLEtBQWQ7QUFDSDtBQUNELDJCQUFLTixRQUFMLEdBQWdCRixJQUFoQjtBQUNBLDJCQUFLNkIsTUFBTDtBQUNBLG1DQUFLQyxZQUFMLENBQWtCO0FBQ2RoQixtQ0FBVztBQURHLHFCQUFsQjtBQUdBLG1DQUFLaUIsV0FBTDtBQUNILGlCQWJEO0FBY0g7QUFsQkcsUyxRQXFCUkMsTyxHQUFVO0FBQ05DLHlCQURNLDJCQUNXO0FBQUE7O0FBQ2Isb0JBQUksQ0FBQyxLQUFLNUIsS0FBVixFQUFpQjtBQUNiLG1DQUFLeUIsWUFBTCxDQUFrQjtBQUNkaEIsbUNBQVcsS0FBS0gsSUFBTCxDQUFVRztBQURQLHFCQUFsQjtBQUdBLHlCQUFLVCxLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0Q2QiwyQkFBVyxZQUFNO0FBQ2IsMkJBQUs5QixTQUFMLEdBQWlCLENBQUMsT0FBS0EsU0FBdkI7QUFDQSwyQkFBS3lCLE1BQUw7QUFDSCxpQkFIRDtBQUlILGFBWks7QUFhTk0sc0JBYk0sc0JBYU1DLENBYk4sRUFhUztBQUNYLG9CQUFJQSxFQUFFQyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLElBQXJCLEVBQTJCO0FBQ3ZCLHlCQUFLakMsV0FBTCxHQUFtQmtDLE9BQU9DLFFBQVAsQ0FBZ0JMLEVBQUVDLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsSUFBakMsQ0FBbkI7QUFDSDtBQUNELHFCQUFLbkMsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCO0FBQ0gsYUFsQks7QUFtQk5zQyxnQkFuQk0sZ0JBbUJBTixDQW5CQSxFQW1CRztBQUNMLHVCQUFPLEtBQVA7QUFDSCxhQXJCSztBQXNCTk8seUJBdEJNLDJCQXNCVztBQUNiLCtCQUFLQyxVQUFMLENBQWdCLEVBQUVDLEtBQUssZUFBUCxFQUFoQjtBQUNIO0FBeEJLLFMsUUEyQlhDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLE9BQU0sVUFBUCxFQUFrQixRQUFPLE1BQXpCLEVBQWdDLFNBQVEsT0FBeEMsRUFBZ0QsT0FBTSxLQUF0RCxFQUE0RCxTQUFRLE1BQXBFLEVBQWhCLEVBQTRGLHdCQUF1QixFQUFDLE9BQU0sVUFBUCxFQUFrQixRQUFPLE1BQXpCLEVBQWdDLFNBQVEsT0FBeEMsRUFBZ0QsT0FBTSxLQUF0RCxFQUE0RCxTQUFRLE1BQXBFLEVBQW5ILEVBQWIsRUFBNk0sV0FBVSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixTQUF0QyxFQUF2TixFQUF3USxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIscUJBQW9CLFVBQXZDLEVBQWpSLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ04sd0NBRE07QUFFTiwyQ0FGTTtBQUdOLCtDQUhNO0FBSU47QUFKTSxTOzs7Ozt5Q0FwRzhCO0FBQUEsZ0JBQXhCckMsSUFBd0IsdUVBQWpCLENBQWlCO0FBQUEsZ0JBQWRzQyxRQUFjLHVFQUFILENBQUc7O0FBQ3BDLG1CQUFPLEtBQUt2QyxPQUFMLENBQWF3QyxHQUFiLENBQWlCO0FBQ3BCLDBCQUFVLEtBQUtDLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEIsQ0FBMkJDLFNBRGpCO0FBRXBCLHdCQUFRM0MsSUFGWTtBQUdwQiw0QkFBWXNDLFFBSFE7QUFJcEIsK0JBQWUsS0FBSzNDO0FBSkEsYUFBakIsRUFLSiwwQkFMSSxDQUFQO0FBTUg7OztnQ0FvR2lCO0FBQUEsZ0JBQVhOLElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS3VELE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DdkQsSUFBbkM7QUFDSDs7OzRDQUVvQjtBQUNqQixtQkFBTztBQUNId0IsdUJBQU8sTUFESjtBQUVIZ0MsdUNBRkc7QUFHSEMseUJBQVMsc0JBQU87QUFDWixrQ0FBSUMsR0FBSjtBQUNILGlCQUxFO0FBTUhDLHNCQUFNLG1CQUFPO0FBQ1Qsa0NBQUlDLEdBQUo7QUFDSDtBQVJFLGFBQVA7QUFVSDs7O2lDQUVTO0FBQUE7O0FBQ04sMkJBQUtDLGVBQUwsQ0FBcUIsZUFBTztBQUN4Qix1QkFBS1YsT0FBTCxDQUFhQyxNQUFiLENBQW9CVSxNQUFwQixHQUE2QnRCLE9BQU9DLFFBQVAsQ0FBZ0IsT0FBS1UsT0FBTCxDQUFhQyxNQUFiLENBQW9CVSxNQUFwQyxJQUE4QyxDQUEzRTtBQUNBLHVCQUFLQyxLQUFMLENBQVcsRUFBQ0MsU0FBUyxPQUFWLEVBQVg7QUFDSCxhQUhEO0FBSUg7Ozs0Q0FFb0I7QUFBQTs7QUFDakIsMkJBQUt6QyxXQUFMLENBQWlCLEVBQUNDLE9BQU8sUUFBUixFQUFrQkMsTUFBTSxJQUF4QixFQUFqQjtBQUNBd0Msb0JBQVFDLEdBQVIsQ0FBWSxDQUNSLEtBQUt4RCxPQUFMLENBQWF3QyxHQUFiLENBQWlCLEVBQUMsUUFBUSxDQUFULEVBQVksVUFBVSxlQUFLaUIsY0FBTCxDQUFvQixRQUFwQixLQUFpQyxDQUF2RCxFQUFqQixFQUE0RSwyQkFBNUUsQ0FEUSxFQUVSLEtBQUt6QyxjQUFMLEVBRlEsQ0FBWixFQUdHQyxJQUhILENBR1EsaUJBQTRCO0FBQUE7QUFBQSxvQkFBekIzQixJQUF5QixZQUF6QkEsSUFBeUI7QUFBQSxvQkFBWG9FLElBQVcsWUFBakJwRSxJQUFpQjs7QUFDaEMsb0JBQUlvRSxLQUFLeEMsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ2pCLDJCQUFLcEIsTUFBTCxHQUFjLElBQWQ7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsMkJBQUtBLE1BQUwsR0FBYyxLQUFkO0FBQ0g7QUFDRCx1QkFBS04sUUFBTCxHQUFnQmtFLElBQWhCO0FBQ0EsdUJBQUtyRCxNQUFMLENBQVlDLEtBQVosR0FBb0IsRUFBcEI7QUFDQSx1QkFBS0QsTUFBTCxDQUFZRSxNQUFaLEdBQXFCLEVBQXJCO0FBQ0EsdUJBQUtGLE1BQUwsQ0FBWUcsS0FBWixHQUFvQixFQUFwQjtBQVRnQztBQUFBO0FBQUE7O0FBQUE7QUFVaEMseUNBQTBCbEIsS0FBS3FFLE9BQUwsRUFBMUIsOEhBQTBDO0FBQUE7QUFBQSw0QkFBaEN4RCxLQUFnQztBQUFBLDRCQUF6QnlELElBQXlCOztBQUN0Qyw0QkFBSXpELFFBQVEsQ0FBUixLQUFjLENBQWxCLEVBQXFCO0FBQ2pCLG1DQUFLRSxNQUFMLENBQVlDLEtBQVosQ0FBa0J1RCxJQUFsQixDQUF1QkQsSUFBdkI7QUFDSCx5QkFGRCxNQUVPLElBQUl6RCxRQUFRLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUN4QixtQ0FBS0UsTUFBTCxDQUFZRSxNQUFaLENBQW1Cc0QsSUFBbkIsQ0FBd0JELElBQXhCO0FBQ0gseUJBRk0sTUFFQSxJQUFJekQsUUFBUSxDQUFSLEtBQWMsQ0FBbEIsRUFBcUI7QUFDeEIsbUNBQUtFLE1BQUwsQ0FBWUcsS0FBWixDQUFrQnFELElBQWxCLENBQXVCRCxJQUF2QjtBQUNILHlCQUZNLE1BRUE7QUFDSDtBQUNIO0FBQ0o7QUFwQitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBcUJoQyx1QkFBS2YsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZQyxLQUEzQixFQUFyQztBQUNBLHVCQUFLdUMsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZRSxNQUEzQixFQUFyQztBQUNBLHVCQUFLc0MsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZRyxLQUEzQixFQUFyQztBQUNBLHVCQUFLVyxNQUFMO0FBQ0EsK0JBQUtFLFdBQUw7QUFDQSwrQkFBSzBDLG1CQUFMO0FBQ0gsYUE5QkQ7QUErQkg7OztxQ0FFYXJDLEMsRUFBRztBQUNiLGdCQUFJQSxFQUFFdEIsU0FBRixJQUFlLEtBQUtILElBQUwsQ0FBVUcsU0FBN0IsRUFBd0M7QUFDcEMscUJBQUtULEtBQUwsR0FBYSxJQUFiO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtBLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFDSjs7O2lDQUVTO0FBQ04saUJBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxpQkFBS0YsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGlCQUFLQyxLQUFMLEdBQWEsS0FBYjtBQUNBLGlCQUFLRyxNQUFMLEdBQWMsS0FBZDtBQUNIOzs7d0NBRWdCO0FBQUE7O0FBQ2IsZ0JBQUksS0FBS0csSUFBTCxDQUFVQyxJQUFkLEVBQW9CO0FBQUUsdUJBQU8sS0FBUDtBQUFjO0FBQ3BDLGdCQUFJLEtBQUtKLE1BQVQsRUFBaUI7QUFBRSx1QkFBTyxLQUFQO0FBQWM7QUFDakMsaUJBQUtHLElBQUwsQ0FBVUUsS0FBVjtBQUNBLGlCQUFLRixJQUFMLENBQVVDLElBQVYsR0FBaUIsSUFBakI7QUFDQSxpQkFBS2MsY0FBTCxDQUFvQixLQUFLZixJQUFMLENBQVVFLEtBQTlCLEVBQ0NjLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWM0IsSUFBVSxTQUFWQSxJQUFVOztBQUNkLG9CQUFJMEUsTUFBTUMsT0FBTixDQUFjM0UsSUFBZCxLQUF1QkEsS0FBSzRCLE1BQUwsS0FBZ0IsQ0FBM0MsRUFBOEM7QUFDMUMsMkJBQUtwQixNQUFMLEdBQWMsSUFBZDtBQUNIO0FBQ0QsdUJBQUtOLFFBQUwsZ0NBQW9CLE9BQUtBLFFBQXpCLHNCQUFzQ0YsSUFBdEM7QUFDQSx1QkFBS1csSUFBTCxDQUFVQyxJQUFWLEdBQWlCLEtBQWpCO0FBQ0gsYUFQRDtBQVFIOzs7aUNBRVM7QUFBQTs7QUFDTjtBQUNBLDJCQUFLVyxXQUFMLENBQWlCLEVBQUNDLE9BQU8sUUFBUixFQUFrQkMsTUFBTSxJQUF4QixFQUFqQjtBQUNBLDJCQUFLbUQsYUFBTCxDQUFtQjtBQUNmbkIseUJBQVMsc0JBQU87QUFDWm9CLHVCQUFHQyxtQkFBSCxHQUF5QkMsTUFBekIsQ0FBZ0MsUUFBaEMsRUFBMENDLGtCQUExQyxDQUE2RCxnQkFBUTtBQUNqRSwrQkFBS3ZFLFNBQUwsR0FBaUJ3RSxJQUFJQyxZQUFyQjtBQUNBLCtCQUFLdkUsSUFBTCxDQUFVRyxTQUFWLEdBQXNCcUUsS0FBS0MsR0FBM0I7QUFDQSwrQkFBS3ZELE1BQUw7QUFDSCxxQkFKRCxFQUlHd0QsSUFKSDtBQUtIO0FBUGMsYUFBbkI7QUFTQXBCLG9CQUFRQyxHQUFSLENBQVksQ0FDUixLQUFLeEQsT0FBTCxDQUFhd0MsR0FBYixDQUFpQixFQUFDLFFBQVEsQ0FBVCxFQUFZLFVBQVUsZUFBS2lCLGNBQUwsQ0FBb0IsUUFBcEIsS0FBaUMsQ0FBdkQsRUFBakIsRUFBNEUsMkJBQTVFLENBRFEsRUFFUixLQUFLekMsY0FBTCxFQUZRLENBQVosRUFHR0MsSUFISCxDQUdRLGlCQUE0QjtBQUFBO0FBQUEsb0JBQXpCM0IsSUFBeUIsWUFBekJBLElBQXlCO0FBQUEsb0JBQVhvRSxJQUFXLFlBQWpCcEUsSUFBaUI7O0FBQ2hDLG9CQUFJb0UsS0FBS3hDLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNqQiwyQkFBS3BCLE1BQUwsR0FBYyxJQUFkO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFLQSxNQUFMLEdBQWMsS0FBZDtBQUNIO0FBQ0QsdUJBQUtOLFFBQUwsR0FBZ0JrRSxJQUFoQjtBQU5nQztBQUFBO0FBQUE7O0FBQUE7QUFPaEMsMENBQTBCcEUsS0FBS3FFLE9BQUwsRUFBMUIsbUlBQTBDO0FBQUE7QUFBQSw0QkFBaEN4RCxLQUFnQztBQUFBLDRCQUF6QnlELElBQXlCOztBQUN0Qyw0QkFBSXpELFFBQVEsQ0FBUixLQUFjLENBQWxCLEVBQXFCO0FBQ2pCLG1DQUFLRSxNQUFMLENBQVlDLEtBQVosQ0FBa0J1RCxJQUFsQixDQUF1QkQsSUFBdkI7QUFDSCx5QkFGRCxNQUVPLElBQUl6RCxRQUFRLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUN4QixtQ0FBS0UsTUFBTCxDQUFZRSxNQUFaLENBQW1Cc0QsSUFBbkIsQ0FBd0JELElBQXhCO0FBQ0gseUJBRk0sTUFFQSxJQUFJekQsUUFBUSxDQUFSLEtBQWMsQ0FBbEIsRUFBcUI7QUFDeEIsbUNBQUtFLE1BQUwsQ0FBWUcsS0FBWixDQUFrQnFELElBQWxCLENBQXVCRCxJQUF2QjtBQUNILHlCQUZNLE1BRUE7QUFDSDtBQUNIO0FBQ0o7QUFqQitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0JoQyx1QkFBS2YsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZQyxLQUEzQixFQUFyQztBQUNBLHVCQUFLdUMsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZRSxNQUEzQixFQUFyQztBQUNBLHVCQUFLc0MsT0FBTCxDQUFhLFFBQWIsRUFBdUIsWUFBdkIsRUFBcUMsRUFBQ2hCLE1BQU0sQ0FBUCxFQUFVaUMsS0FBSyxPQUFLekQsTUFBTCxDQUFZRyxLQUEzQixFQUFyQztBQUNBO0FBQ0EsK0JBQUthLFdBQUw7QUFDQSx1QkFBS0YsTUFBTDtBQUNILGFBM0JEO0FBNEJIOzs7O0VBaFFpQyxlQUFLbEIsSTs7a0JBQXRCZixRIiwiZmlsZSI6ImNvbXBhbnlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IFNsaWRlckRlbGF5IGZyb20gJy4uL2NvbXBvbmVudHMvc2xpZGVyLWRlbGF5J1xyXG5pbXBvcnQgQ29tcGFueUl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLWxpc3QtaXRlbSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBhbnlzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aLm+iBmOWFrOWPuCdcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGNvbXBhbnlzOiBbXSxcclxuICAgICAgICBoYXNMb2dpbjogdHJ1ZSxcclxuICAgICAgICBzbGlkZURvd246IGZhbHNlLFxyXG4gICAgICAgIGZpeGVkOiBmYWxzZSxcclxuICAgICAgICBjb21wYW55VHlwZTogMCxcclxuICAgICAgICBjb21wYW55VHlwZU5hbWU6ICflhajlm73lhazlj7gnLFxyXG4gICAgICAgIGhhc05vdDogdHJ1ZSxcclxuICAgICAgICBtaW5IZWlnaHQ6IDBcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGdldENvbXBhbnlMaXN0IChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAnY2l0eUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UucmVnaW9uX2lkLFxyXG4gICAgICAgICAgICAncGFnZSc6IHBhZ2UsXHJcbiAgICAgICAgICAgICdwYWdlU2l6ZSc6IHBhZ2VTaXplLFxyXG4gICAgICAgICAgICAnY29tcGFueVR5cGUnOiB0aGlzLmNvbXBhbnlUeXBlXHJcbiAgICAgICAgfSwgJy9Vc2VyL2dldFVzZXJDb21wYW55TGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgcGFnZSA9IHtcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgIH1cclxuXHJcbiAgICBzd2lwZXIgPSB7XHJcbiAgICAgICAgZmlyc3Q6IFtdLFxyXG4gICAgICAgIHNlY29uZDogW10sXHJcbiAgICAgICAgdGhpcmQ6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgY29tcGFueVR5cGVOYW1lICgpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbXBhbnlUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5YWo6YOo5YWs5Y+4J1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+S/seS5kOmDqCdcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflt6XkvZzlrqQnXHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn55Gc5Ly96aaGJ1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WfueiureWtpumZoidcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflmajmorDorr7lpIcnXHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5aqS5L2T6LWE6K6vJ1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+S8muWxlS/mtLvliqgv6LWb5LqLJ1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+S6kuiBlOe9kSdcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflhbbku5YnXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3YXRjaCA9IHtcclxuICAgICAgICBjb21wYW55VHlwZSAobmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmluZGV4ID0gMVxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBhbnlMaXN0KClcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMjgzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2xpZGVUb0JvdHRvbSAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXhlZCkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGhpcy5wYWdlLnNjcm9sbFRvcFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZml4ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlRG93biA9ICF0aGlzLnNsaWRlRG93blxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVUb1RvcCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlUeXBlID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQudHlwZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlRG93biA9ICF0aGlzLnNsaWRlRG93blxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQWxsUmVjb21lbmQgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICcuL2FsbFJlY29tZW5kJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImNvbXAtaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwiY29tcGFueXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIixcInZhbHVlXCI6XCJpdGVtXCJ9LFwidi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcImNvbXBhbnlzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiaXRlbVwifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn0sXCJzbGlkZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvZ2luLnN5bmNcIjpcImhhc0xvZ2luXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IGxvYWRpbmcsXHJcbiAgICAgICAgJ3NsaWRlcic6IFNsaWRlckRlbGF5LFxyXG4gICAgICAgICdjb21wLWl0ZW0nOiBDb21wYW55SXRlbSxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5YGl6Lqr5rGC6IGMJyxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9jb21wYW55c2AsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndHlwZSc6IDAsICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwfSwgJy9Db21wYW55L2dldFJlY29tbWVuZExpc3QnKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wYW55TGlzdCgpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhfSwge2RhdGE6IGxpc3R9XSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLnN3aXBlci5maXJzdCA9IFtdXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyLnNlY29uZCA9IFtdXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyLnRoaXJkID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiBkYXRhLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVyLmZpcnN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZXIuc2Vjb25kLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZXIudGhpcmQucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2xpZGVyJywgJ2ludm9rZURhdGEnLCB7dHlwZTogMSwgYXJyOiB0aGlzLnN3aXBlci5maXJzdH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2xpZGVyJywgJ2ludm9rZURhdGEnLCB7dHlwZTogMiwgYXJyOiB0aGlzLnN3aXBlci5zZWNvbmR9KVxyXG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3NsaWRlcicsICdpbnZva2VEYXRhJywge3R5cGU6IDMsIGFycjogdGhpcy5zd2lwZXIudGhpcmR9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25QYWdlU2Nyb2xsIChlKSB7XHJcbiAgICAgICAgaWYgKGUuc2Nyb2xsVG9wID49IHRoaXMucGFnZS5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5maXhlZCA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpeGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IaWRlICgpIHtcclxuICAgICAgICB0aGlzLmNvbXBhbnlUeXBlID0gMFxyXG4gICAgICAgIHRoaXMuc2xpZGVEb3duID0gZmFsc2VcclxuICAgICAgICB0aGlzLmZpeGVkID0gZmFsc2VcclxuICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5idXN5KSB7IHJldHVybiBmYWxzZSB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzTm90KSB7IHJldHVybiBmYWxzZSB9XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4KytcclxuICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICB0aGlzLmdldENvbXBhbnlMaXN0KHRoaXMucGFnZS5pbmRleClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gWy4uLnRoaXMuY29tcGFueXMsIC4uLmRhdGFdXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKS5zZWxlY3QoJyNmaXhlZCcpLmJvdW5kaW5nQ2xpZW50UmVjdChyZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nyb2xsVG9wID0gcmVjdC50b3BcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KS5leGVjKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndHlwZSc6IDAsICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwfSwgJy9Db21wYW55L2dldFJlY29tbWVuZExpc3QnKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wYW55TGlzdCgpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhfSwge2RhdGE6IGxpc3R9XSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gbGlzdFxyXG4gICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGRhdGEuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggJSAzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZXIuZmlyc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlci5zZWNvbmQucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlci50aGlyZC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCdzbGlkZXInLCAnaW52b2tlRGF0YScsIHt0eXBlOiAxLCBhcnI6IHRoaXMuc3dpcGVyLmZpcnN0fSlcclxuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCdzbGlkZXInLCAnaW52b2tlRGF0YScsIHt0eXBlOiAyLCBhcnI6IHRoaXMuc3dpcGVyLnNlY29uZH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2xpZGVyJywgJ2ludm9rZURhdGEnLCB7dHlwZTogMywgYXJyOiB0aGlzLnN3aXBlci50aGlyZH0pXHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=