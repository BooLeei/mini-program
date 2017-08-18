'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _slideBtn = require('./../components/slide-btn.js');

var _slideBtn2 = _interopRequireDefault(_slideBtn);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResumeEdu = (_temp2 = _class = function (_wepy$page) {
    _inherits(ResumeEdu, _wepy$page);

    function ResumeEdu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResumeEdu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResumeEdu.__proto__ || Object.getPrototypeOf(ResumeEdu)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResumeEdu, [{
        key: 'onLoad',
        value: function onLoad(_ref2) {
            var _this2 = this;

            var index = _ref2.index,
                msg = _ref2.msg;

            if (msg) {
                this.index = Number.parseInt(index);
                this.page = JSON.parse(msg);
            }
            this.request.Get({
                type: '4,5'
            }, '/SchoolList/getList').then(function (_ref3) {
                var data = _ref3.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            _index = _step$value[0],
                            item = _step$value[1];

                        switch (item.type) {
                            case "4":
                                _this2.all[0].list.push(item);
                                break;
                            case "5":
                                _this2.all[1].list.push(item);
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

                _this2.$apply();
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

    return ResumeEdu;
}(_wepy2.default.page), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.config = {
        backgroundTextStyle: 'dark',
        navigationBarTitleText: '编辑学习经历',
        enablePullDownRefresh: false,
        disableScroll: false
    };
    this.data = {
        init: true,
        slide: false,
        page: {
            "id": '',
            'name': '',
            'school_id': '',
            'school_name': '',
            'school_logo': '',
            'work_name': '',
            'time_start': '',
            'time_end': '',
            'graduate_url': '',
            'graduateUrlDetail': '',
            'is_graduate': '',
            'has_certificate': '',
            'status': '1'
        },
        all: [{
            'type': '4',
            'name': '教育培训',
            'list': []
        }, {
            'type': '5',
            'name': '经管培训',
            'list': []
        }],
        result: []
    };
    this.index = -1;
    this.$props = { "graduate": { "eventName": "graduate" }, "certificate": { "eventName": "certificate" } };
    this.$events = {};
    this.components = {
        'graduate': _slideBtn2.default,
        'certificate': _slideBtn2.default
    };
    this.request = new _request2.default();
    this.computed = {
        graduate: function graduate() {
            if (this.page.is_graduate == '1') {
                return '是';
            } else if (this.page.is_graduate == '2') {
                return '否';
            } else {
                return '';
            }
        },
        certificate: function certificate() {
            if (this.page.has_certificate == '1') {
                return '是';
            } else if (this.page.has_certificate == '2') {
                return '否';
            } else {
                return '';
            }
        }
    };
    this.events = {
        'graduate': function graduate() {
            if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                _this3.page.is_graduate = '1';
            } else {
                _this3.page.is_graduate = '2';
                _this3.page.has_certificate = '2';
            }
        },
        'certificate': function certificate() {
            if (_this3.page.is_graduate == '1') {
                if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                    _this3.page.has_certificate = '1';
                } else {
                    _this3.page.has_certificate = '2';
                }
            }
        }
    };
    this.methods = {
        toggleSlide: function toggleSlide() {
            this.slide = !this.slide;
        },
        bindFocus: function bindFocus() {
            this.slide = true;
        },
        bindInput: function bindInput(e) {
            var _this4 = this;

            this.init = false;
            this.page.name = e.detail.value;
            this.request.Get({
                type: '4,5',
                name: e.detail.value
            }, '/SchoolList/getList').then(function (_ref4) {
                var data = _ref4.data;

                _this4.result = data;
                _this4.$apply();
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
        selectCompany: function selectCompany(e) {
            var item = {};
            if (e.target.dataset.from == '1') {
                var type = Number.parseInt(e.target.dataset.type);
                if (type === 4) {
                    item = this.all[0].list[e.target.dataset.index];
                } else {
                    item = this.all[1].list[e.target.dataset.index];
                }
            } else {
                item = this.result[e.target.dataset.index];
            }
            this.page.school_id = item.id;
            this.page.school_name = item.name;
            this.page.name = item.name;
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
                this.$parent.global.schoolList[this.index] = temp;
            } else {
                this.$parent.global.schoolList.unshift(temp);
            }
            this.$parent.global.schoolUpdate = true;
            _wepy2.default.navigateBack();
        }
    };
}, _temp2);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ResumeEdu , 'pages/resume-edu'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1lZHUuanMiXSwibmFtZXMiOlsiUmVzdW1lRWR1IiwiaW5kZXgiLCJtc2ciLCJOdW1iZXIiLCJwYXJzZUludCIsInBhZ2UiLCJKU09OIiwicGFyc2UiLCJyZXF1ZXN0IiwiR2V0IiwidHlwZSIsInRoZW4iLCJkYXRhIiwiZW50cmllcyIsIml0ZW0iLCJhbGwiLCJsaXN0IiwicHVzaCIsIiRhcHBseSIsInNsaWRlIiwiaW5pdCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJyZXN1bHQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwiZ3JhZHVhdGUiLCJpc19ncmFkdWF0ZSIsImNlcnRpZmljYXRlIiwiaGFzX2NlcnRpZmljYXRlIiwiZXZlbnRzIiwibWV0aG9kcyIsInRvZ2dsZVNsaWRlIiwiYmluZEZvY3VzIiwiYmluZElucHV0IiwiZSIsIm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmROYW1lIiwid29ya19uYW1lIiwiYmluZFN0YXJ0IiwidGltZV9zdGFydCIsImJpbmRFbmQiLCJ0aW1lX2VuZCIsInNlbGVjdENvbXBhbnkiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiZnJvbSIsInNjaG9vbF9pZCIsImlkIiwic2Nob29sX25hbWUiLCJzY2hvb2xfbG9nbyIsImxvZ29fdXJsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwic3VyZSIsInRlbXAiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsIiwic2Nob29sTGlzdCIsInVuc2hpZnQiLCJzY2hvb2xVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0EwSks7QUFBQTs7QUFB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RSxLQUFwQyxJQUE2Q2dFLElBQTdDO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsVUFBcEIsQ0FBK0JDLE9BQS9CLENBQXVDTCxJQUF2QztBQUNIO0FBQ0QsaUJBQUtFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkcsWUFBcEIsR0FBbUMsSUFBbkM7QUFDQSwyQkFBS1IsWUFBTDtBQUNIO0FBM0RLLEs7O2tCQTVGTy9ELFMiLCJmaWxlIjoicmVzdW1lLWVkdS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgU2xpZGVCdG4gZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZS1idG4nXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVFZHUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5a2m5Lmg57uP5Y6GJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpbml0OiB0cnVlLFxyXG4gICAgICAgIHNsaWRlOiBmYWxzZSxcclxuICAgICAgICBwYWdlOiB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogJycsXHJcbiAgICAgICAgICAgICduYW1lJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfaWQnOiAnJyxcclxuICAgICAgICAgICAgJ3NjaG9vbF9uYW1lJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfbG9nbyc6ICcnLFxyXG4gICAgICAgICAgICAnd29ya19uYW1lJzogJycsXHJcbiAgICAgICAgICAgICd0aW1lX3N0YXJ0JzogJycsXHJcbiAgICAgICAgICAgICd0aW1lX2VuZCc6ICcnLFxyXG4gICAgICAgICAgICAnZ3JhZHVhdGVfdXJsJzogJycsXHJcbiAgICAgICAgICAgICdncmFkdWF0ZVVybERldGFpbCc6ICcnLFxyXG4gICAgICAgICAgICAnaXNfZ3JhZHVhdGUnOiAnJyxcclxuICAgICAgICAgICAgJ2hhc19jZXJ0aWZpY2F0ZSc6ICcnLFxyXG4gICAgICAgICAgICAnc3RhdHVzJzogJzEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5pWZ6IKy5Z+56K6tJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnNScsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfnu4/nrqHln7norq0nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICByZXN1bHQ6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAtMVxyXG5cclxuICAgJHByb3BzID0ge1wiZ3JhZHVhdGVcIjp7XCJldmVudE5hbWVcIjpcImdyYWR1YXRlXCJ9LFwiY2VydGlmaWNhdGVcIjp7XCJldmVudE5hbWVcIjpcImNlcnRpZmljYXRlXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnZ3JhZHVhdGUnOiBTbGlkZUJ0bixcclxuICAgICAgICAnY2VydGlmaWNhdGUnOiBTbGlkZUJ0blxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgZ3JhZHVhdGUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfmmK8nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflkKYnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VydGlmaWNhdGUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5pivJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WQpidcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAnZ3JhZHVhdGUnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXJnc1swXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaXNfZ3JhZHVhdGUgPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pc19ncmFkdWF0ZSA9ICcyJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcyJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnY2VydGlmaWNhdGUnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMSdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcyJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlU2xpZGUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gIXRoaXMuc2xpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRGb2N1cyAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSW5wdXQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICc0LDUnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfSwgJy9TY2hvb2xMaXN0L2dldExpc3QnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmROYW1lIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrX25hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFN0YXJ0IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50aW1lX3N0YXJ0ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFbmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRpbWVfZW5kID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdENvbXBhbnkgKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7fVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5mcm9tID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50eXBlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hbGxbMF0ubGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hbGxbMV0ubGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMucmVzdWx0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9pZCA9IGl0ZW0uaWRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9uYW1lID0gaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xfbG9nbyA9IGl0ZW0ubG9nb191cmxcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB7fVxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRlbXAsIHRoaXMucGFnZSlcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdFt0aGlzLmluZGV4XSA9IHRlbXBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdC51bnNoaWZ0KHRlbXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7aW5kZXgsIG1zZ30pIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IEpTT04ucGFyc2UobXNnKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgdHlwZTogJzQsNSdcclxuICAgICAgICB9LCAnL1NjaG9vbExpc3QvZ2V0TGlzdCcpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGRhdGEuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFswXS5saXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFsxXS5saXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMucGFnZSkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnc3RhdHVzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=