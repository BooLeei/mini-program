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
        }, _this.index = -1, _this.temp = '', _this.request = new _request2.default(), _this.data = {
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
        key: 'onLoad',
        value: function onLoad(_ref3) {
            var _this3 = this;

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
                                _this3.all[0].list.push(item);
                                break;
                            case "2":
                                _this3.all[1].list.push(item);
                                break;
                            case "3":
                                _this3.all[2].list.push(item);
                                break;
                            case "4":
                                _this3.all[3].list.push(item);
                                break;
                            case "5":
                                _this3.all[4].list.push(item);
                                break;
                            case "6":
                                _this3.all[5].list.push(item);
                                break;
                            case "7":
                                _this3.all[6].list.push(item);
                                break;
                            case "8":
                                _this3.all[7].list.push(item);
                                break;
                            case "9":
                                _this3.all[8].list.push(item);
                                break;
                            case "0":
                                _this3.all[9].list.push(item);
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

                _this3.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1leHAuanMiXSwibmFtZXMiOlsiUmVzdW1lRXhwIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiaW5kZXgiLCJ0ZW1wIiwicmVxdWVzdCIsImRhdGEiLCJpbml0Iiwic2xpZGUiLCJwYWdlIiwicmVzdWx0IiwiYWxsIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJjb250ZW50IiwibWV0aG9kcyIsInRvZ2dsZVNsaWRlIiwiYmluZEZvY3VzIiwiYmluZElucHV0IiwiZSIsImNvbXBhbnlfbmFtZSIsImRldGFpbCIsInZhbHVlIiwiR2V0IiwidHlwZSIsIm5hbWUiLCJ0aGVuIiwiJGFwcGx5IiwiYmluZE5hbWUiLCJ3b3JrX25hbWUiLCJiaW5kU3RhcnQiLCJ0aW1lX3N0YXJ0IiwiYmluZEVuZCIsInRpbWVfZW5kIiwiYmluZENvbnRlbnQiLCJzZWxlY3RDb21wYW55IiwiaXRlbSIsInRhcmdldCIsImRhdGFzZXQiLCJmcm9tIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJsaXN0Iiwic2Nob29sX2lkIiwiaWQiLCJzY2hvb2xfbmFtZSIsInNjaG9vbF9sb2dvIiwibG9nb191cmwiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJzdXJlIiwiT2JqZWN0IiwiYXNzaWduIiwiJHBhcmVudCIsImdsb2JhbCIsIndvcmtMaXN0IiwidW5zaGlmdCIsIndvcmtVcGRhdGUiLCJtc2ciLCJKU09OIiwicGFyc2UiLCJlbnRyaWVzIiwicHVzaCIsImtleXMiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLFFBRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtB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LHVDQUFLMUIsR0FBTCxDQUFTLENBQVQsRUFBWWdDLElBQVosQ0FBaUJvQixJQUFqQixDQUFzQjFCLElBQXRCO0FBQ0E7QUFDSixpQ0FBSyxHQUFMO0FBQ0ksdUNBQUsxQixHQUFMLENBQVMsQ0FBVCxFQUFZZ0MsSUFBWixDQUFpQm9CLElBQWpCLENBQXNCMUIsSUFBdEI7QUFDQTtBQUNKLGlDQUFLLEdBQUw7QUFDSSx1Q0FBSzFCLEdBQUwsQ0FBUyxDQUFULEVBQVlnQyxJQUFaLENBQWlCb0IsSUFBakIsQ0FBc0IxQixJQUF0QjtBQUNBO0FBQ0o7QUFDSTtBQWhDSjtBQWtDSDtBQXBDYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXFDZCx1QkFBS1QsTUFBTDtBQUNILGFBekNEO0FBMENIOzs7bUNBRVc7QUFDUixpQkFBS3BCLEtBQUwsR0FBYSxLQUFiO0FBQ0EsaUJBQUtELElBQUwsR0FBWSxJQUFaO0FBRlE7QUFBQTtBQUFBOztBQUFBO0FBR1Isc0NBQWdCNkMsT0FBT1ksSUFBUCxDQUFZLEtBQUt2RCxJQUFqQixDQUFoQixtSUFBd0M7QUFBQSx3QkFBL0J3RCxHQUErQjs7QUFDcEMsd0JBQUlBLE9BQU8sUUFBWCxFQUFxQjtBQUNqQiw2QkFBS3hELElBQUwsQ0FBVXdELEdBQVYsSUFBaUIsR0FBakI7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUt4RCxJQUFMLENBQVV3RCxHQUFWLElBQWlCLEVBQWpCO0FBQ0g7QUFDSjtBQVRPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVWDs7OztFQXZOa0MsZUFBS3hELEk7O2tCQUF2QlosUyIsImZpbGUiOiJyZXN1bWUtZXhwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVFeHAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5bel5L2c57uP5Y6GJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAtMVxyXG4gICAgdGVtcCA9ICcnXHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGluaXQ6IHRydWUsXHJcbiAgICAgICAgc2xpZGU6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgJ2lkJzogJycsXHJcbiAgICAgICAgICAgICdjb21wYW55X25hbWUnOiAnJyxcclxuICAgICAgICAgICAgJ2NvbnRlbnQnOiAnJyxcclxuICAgICAgICAgICAgJ3NjaG9vbF9pZCc6ICcnLFxyXG4gICAgICAgICAgICAnc2Nob29sX2xvZ28nOiAnJyxcclxuICAgICAgICAgICAgJ3NjaG9vbF9uYW1lJzogJycsXHJcbiAgICAgICAgICAgICdzdGF0dXMnOiAnMScsXHJcbiAgICAgICAgICAgICd0aW1lX2VuZCc6ICcnLFxyXG4gICAgICAgICAgICAndGltZV9zdGFydCc6ICcnLFxyXG4gICAgICAgICAgICAnd29ya19uYW1lJzogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdDogW10sXHJcbiAgICAgICAgYWxsOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzEnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5aSn5Z6L6L+e6ZSB5YGl6Lqr5L+x5LmQ6YOoJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnMicsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflsI/lnovov57plIHnibnoibLlgaXouqvmiL8nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICczJyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+aWsOWei+WBpei6q+W3peS9nOWupCcsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5pWZ57uD5Z+56K6tJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnNScsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfnu4/nrqHln7norq0nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICc2JyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+WZqOaisOiuvuWkh+S+m+W6lOWVhicsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzcnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5aqS5L2T6LWE6K6vJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnOCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkvJrlsZUv5rS75YqoL+i1m+S6iycsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzknLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5LqS6IGU572RJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflhbblroMnLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICAgIHNsaWRlIChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2coMTIzNClcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5jb250ZW50ID0gJydcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvZyg0MzIxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmNvbnRlbnQgPSB0aGlzLnRlbXBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b2dnbGVTbGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSAhdGhpcy5zbGlkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEZvY3VzICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRJbnB1dCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueV9uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH0sICcvU2Nob29sTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmROYW1lIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrX25hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFN0YXJ0IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50aW1lX3N0YXJ0ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFbmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRpbWVfZW5kID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDb250ZW50IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jb250ZW50ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy50ZW1wID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdENvbXBhbnkgKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7fVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5mcm9tID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50eXBlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hbGxbdHlwZSAtIDFdLmxpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYWxsWzldLmxpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLnJlc3VsdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvZyhpdGVtKVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sX2lkID0gaXRlbS5pZFxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sX25hbWUgPSBpdGVtLm5hbWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlfbmFtZSA9IGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sX2xvZ28gPSBpdGVtLmxvZ29fdXJsXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FuY2VsICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZSAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0ge31cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0ZW1wLCB0aGlzLnBhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0W3RoaXMuaW5kZXhdID0gdGVtcFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdC51bnNoaWZ0KHRlbXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrVXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe2luZGV4LCBtc2d9KSB7XHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBKU09OLnBhcnNlKG1zZylcclxuICAgICAgICAgICAgdGhpcy50ZW1wID0gdGhpcy5wYWdlLmNvbnRlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICcnXHJcbiAgICAgICAgfSwgJy9TY2hvb2xMaXN0L2dldExpc3QnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiBkYXRhLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbMF0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbMV0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbMl0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbM10ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbNF0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbNV0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI3XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbNl0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI4XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbN10ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbOF0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbOV0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZVxyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnBhZ2UpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ3N0YXR1cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJzEnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Vba2V5XSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19