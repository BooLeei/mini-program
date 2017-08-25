'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResumeExp = function (_wepy$page) {
    _inherits(ResumeExp, _wepy$page);

    function ResumeExp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResumeExp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResumeExp.__proto__ || Object.getPrototypeOf(ResumeExp)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '编辑工作经历',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.index = -1, _this.temp = '', _this.request = new _request2.default(), _this.components = {
            'toast': _toast2.default
        }, _this.data = {
            init: true,
            slide: false,
            page: {
                'id': '',
                'company_name': '',
                'content': '',
                'school_id': '',
                'school_logo': '',
                'school_name': '',
                'status': '1',
                'time_end': '',
                'time_start': '',
                'work_name': ''
            },
            result: [],
            all: [{
                'type': '1',
                'name': '大型连锁健身俱乐部',
                'list': []
            }, {
                'type': '2',
                'name': '小型连锁特色健身房',
                'list': []
            }, {
                'type': '3',
                'name': '新型健身工作室',
                'list': []
            }, {
                'type': '4',
                'name': '教练培训',
                'list': []
            }, {
                'type': '5',
                'name': '经管培训',
                'list': []
            }, {
                'type': '6',
                'name': '器械设备供应商',
                'list': []
            }, {
                'type': '7',
                'name': '媒体资讯',
                'list': []
            }, {
                'type': '8',
                'name': '会展/活动/赛事',
                'list': []
            }, {
                'type': '9',
                'name': '互联网',
                'list': []
            }, {
                'type': '0',
                'name': '其它',
                'list': []
            }]
        }, _this.watch = {
            slide: function slide(newVal, oldVal) {
                if (newVal) {
                    (0, _log.log)(1234);
                    this.page.content = '';
                } else {
                    (0, _log.log)(4321);
                    this.page.content = this.temp;
                }
            }
        }, _this.methods = {
            stopPropagation: function stopPropagation() {
                return false;
            },
            toggleSlide: function toggleSlide() {
                this.slide = !this.slide;
            },
            bindFocus: function bindFocus() {
                this.slide = true;
            },
            bindInput: function bindInput(e) {
                var _this2 = this;

                this.init = false;
                this.page.company_name = e.detail.value;
                this.request.Get({
                    type: '',
                    name: e.detail.value
                }, '/SchoolList/getList').then(function (_ref2) {
                    var data = _ref2.data;

                    (0, _log.log)(data);
                    _this2.result = data;
                    _this2.$apply();
                });
            },
            bindName: function bindName(e) {
                this.page.work_name = e.detail.value;
            },
            bindStart: function bindStart(e) {
                this.page.time_start = e.detail.value;
            },
            bindEnd: function bindEnd(e) {
                this.page.time_end = e.detail.value;
            },
            bindContent: function bindContent(e) {
                this.page.content = e.detail.value;
                this.temp = e.detail.value;
            },
            selectCompany: function selectCompany(e) {
                var item = {};
                if (e.target.dataset.from == '1') {
                    var type = Number.parseInt(e.target.dataset.type);
                    if (type !== 0) {
                        item = this.all[type - 1].list[e.target.dataset.index];
                    } else {
                        item = this.all[9].list[e.target.dataset.index];
                    }
                } else {
                    item = this.result[e.target.dataset.index];
                }
                (0, _log.log)(item);
                this.page.school_id = item.id;
                this.page.school_name = item.name;
                this.page.company_name = item.name;
                this.page.school_logo = item.logo_url;
                this.slide = false;
            },
            cancel: function cancel() {
                _wepy2.default.navigateBack();
            },
            sure: function sure() {
                var temp = {};
                Object.assign(temp, this.page);
                if (this.index != -1) {
                    this.$parent.global.workList[this.index] = temp;
                } else {
                    this.$parent.global.workList.unshift(temp);
                }
                this.$parent.global.workUpdate = true;
                _wepy2.default.navigateBack();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResumeExp, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this3 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this3.$parent.global.curVal = Number.parseInt(_this3.$parent.global.curVal) + 1;
                _this3.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(_ref3) {
            var _this4 = this;

            var index = _ref3.index,
                msg = _ref3.msg;

            if (msg) {
                this.index = Number.parseInt(index);
                this.page = JSON.parse(msg);
                this.temp = this.page.content;
            }
            this.request.Get({
                type: ''
            }, '/SchoolList/getList').then(function (_ref4) {
                var data = _ref4.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            _index = _step$value[0],
                            item = _step$value[1];

                        switch (item.type) {
                            case "1":
                                _this4.all[0].list.push(item);
                                break;
                            case "2":
                                _this4.all[1].list.push(item);
                                break;
                            case "3":
                                _this4.all[2].list.push(item);
                                break;
                            case "4":
                                _this4.all[3].list.push(item);
                                break;
                            case "5":
                                _this4.all[4].list.push(item);
                                break;
                            case "6":
                                _this4.all[5].list.push(item);
                                break;
                            case "7":
                                _this4.all[6].list.push(item);
                                break;
                            case "8":
                                _this4.all[7].list.push(item);
                                break;
                            case "9":
                                _this4.all[8].list.push(item);
                                break;
                            case "0":
                                _this4.all[9].list.push(item);
                                break;
                            default:
                                break;
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

                _this4.$apply();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.slide = false;
            this.init = true;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(this.page)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (key == 'status') {
                        this.page[key] = '1';
                    } else {
                        this.page[key] = '';
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
        }
    }]);

    return ResumeExp;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ResumeExp , 'pages/resume-exp'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1leHAuanMiXSwibmFtZXMiOlsiUmVzdW1lRXhwIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiaW5kZXgiLCJ0ZW1wIiwicmVxdWVzdCIsImNvbXBvbmVudHMiLCJkYXRhIiwiaW5pdCIsInNsaWRlIiwicGFnZSIsInJlc3VsdCIsImFsbCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwiY29udGVudCIsIm1ldGhvZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b2dnbGVTbGlkZSIsImJpbmRGb2N1cyIsImJpbmRJbnB1dCIsImUiLCJjb21wYW55X25hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsIkdldCIsInR5cGUiLCJuYW1lIiwidGhlbiIsIiRhcHBseSIsImJpbmROYW1lIiwid29ya19uYW1lIiwiYmluZFN0YXJ0IiwidGltZV9zdGFydCIsImJpbmRFbmQiLCJ0aW1lX2VuZCIsImJpbmRDb250ZW50Iiwic2VsZWN0Q29tcGFueSIsIml0ZW0iLCJ0YXJnZXQiLCJkYXRhc2V0IiwiZnJvbSIsIk51bWJlciIsInBhcnNlSW50IiwibGlzdCIsInNjaG9vbF9pZCIsImlkIiwic2Nob29sX25hbWUiLCJzY2hvb2xfbG9nbyIsImxvZ29fdXJsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwic3VyZSIsIk9iamVjdCIsImFzc2lnbiIsIiRwYXJlbnQiLCJnbG9iYWwiLCJ3b3JrTGlzdCIsInVuc2hpZnQiLCJ3b3JrVXBkYXRlIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsImN1clZhbCIsInRvYXN0IiwibXNnIiwiSlNPTiIsInBhcnNlIiwiZW50cmllcyIsInB1c2giLCJrZXlzIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7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LElBQVo7QUFGUTtBQUFBO0FBQUE7O0FBQUE7QUFHUixzQ0FBZ0I4QyxPQUFPZ0IsSUFBUCxDQUFZLEtBQUs1RCxJQUFqQixDQUFoQixtSUFBd0M7QUFBQSx3QkFBL0I2RCxHQUErQjs7QUFDcEMsd0JBQUlBLE9BQU8sUUFBWCxFQUFxQjtBQUNqQiw2QkFBSzdELElBQUwsQ0FBVTZELEdBQVYsSUFBaUIsR0FBakI7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUs3RCxJQUFMLENBQVU2RCxHQUFWLElBQWlCLEVBQWpCO0FBQ0g7QUFDSjtBQVRPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVWDs7OztFQXpPa0MsZUFBSzdELEk7O2tCQUF2QmIsUyIsImZpbGUiOiJyZXN1bWUtZXhwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdW1lRXhwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e8lui+keW3peS9nOe7j+WOhicsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGluZGV4ID0gLTFcclxuICAgIHRlbXAgPSAnJ1xyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaW5pdDogdHJ1ZSxcclxuICAgICAgICBzbGlkZTogZmFsc2UsXHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICAnaWQnOiAnJyxcclxuICAgICAgICAgICAgJ2NvbXBhbnlfbmFtZSc6ICcnLFxyXG4gICAgICAgICAgICAnY29udGVudCc6ICcnLFxyXG4gICAgICAgICAgICAnc2Nob29sX2lkJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfbG9nbyc6ICcnLFxyXG4gICAgICAgICAgICAnc2Nob29sX25hbWUnOiAnJyxcclxuICAgICAgICAgICAgJ3N0YXR1cyc6ICcxJyxcclxuICAgICAgICAgICAgJ3RpbWVfZW5kJzogJycsXHJcbiAgICAgICAgICAgICd0aW1lX3N0YXJ0JzogJycsXHJcbiAgICAgICAgICAgICd3b3JrX25hbWUnOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdWx0OiBbXSxcclxuICAgICAgICBhbGw6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnMScsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflpKflnovov57plIHlgaXouqvkv7HkuZDpg6gnLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICcyJyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+Wwj+Wei+i/numUgeeJueiJsuWBpei6q+aIvycsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzMnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5paw5Z6L5YGl6Lqr5bel5L2c5a6kJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnNCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfmlZnnu4Pln7norq0nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICc1JyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+e7j+euoeWfueiurScsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzYnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5Zmo5qKw6K6+5aSH5L6b5bqU5ZWGJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnNycsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflqpLkvZPotYTorq8nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICc4JyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S8muWxlS/mtLvliqgv6LWb5LqLJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnOScsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkupLogZTnvZEnLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICcwJyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+WFtuWugycsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2ggPSB7XHJcbiAgICAgICAgc2xpZGUgKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGxvZygxMjM0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmNvbnRlbnQgPSAnJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9nKDQzMjEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuY29udGVudCA9IHRoaXMudGVtcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlU2xpZGUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gIXRoaXMuc2xpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRGb2N1cyAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSW5wdXQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlfbmFtZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJycsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB9LCAnL1NjaG9vbExpc3QvZ2V0TGlzdCcpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTmFtZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya19uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTdGFydCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UudGltZV9zdGFydCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRW5kIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50aW1lX2VuZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ29udGVudCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29udGVudCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMudGVtcCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDb21wYW55IChlKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0ge31cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuZnJvbSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQudHlwZSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYWxsW3R5cGUgLSAxXS5saXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmFsbFs5XS5saXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5yZXN1bHRbZS50YXJnZXQuZGF0YXNldC5pbmRleF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2coaXRlbSlcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9pZCA9IGl0ZW0uaWRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9uYW1lID0gaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jb21wYW55X25hbWUgPSBpdGVtLm5hbWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9sb2dvID0gaXRlbS5sb2dvX3VybFxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHt9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGVtcCwgdGhpcy5wYWdlKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdFt0aGlzLmluZGV4XSA9IHRlbXBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya0xpc3QudW5zaGlmdCh0ZW1wKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSA9IHRydWVcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHtpbmRleCwgbXNnfSkge1xyXG4gICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gSlNPTi5wYXJzZShtc2cpXHJcbiAgICAgICAgICAgIHRoaXMudGVtcCA9IHRoaXMucGFnZS5jb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB0eXBlOiAnJ1xyXG4gICAgICAgIH0sICcvU2Nob29sTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2YgZGF0YS5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzBdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzFdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzJdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzNdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzRdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzVdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzZdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzddLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzhdLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsWzldLmxpc3QucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWVcclxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5wYWdlKSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdzdGF0dXMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Vba2V5XSA9ICcxJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==