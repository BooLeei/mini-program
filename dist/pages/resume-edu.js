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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1lZHUuanMiXSwibmFtZXMiOlsiUmVzdW1lRWR1IiwiaW5kZXgiLCJtc2ciLCJOdW1iZXIiLCJwYXJzZUludCIsInBhZ2UiLCJKU09OIiwicGFyc2UiLCJyZXF1ZXN0IiwiR2V0IiwidHlwZSIsInRoZW4iLCJkYXRhIiwiZW50cmllcyIsIml0ZW0iLCJhbGwiLCJsaXN0IiwicHVzaCIsIiRhcHBseSIsInNsaWRlIiwiaW5pdCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJyZXN1bHQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwiZ3JhZHVhdGUiLCJpc19ncmFkdWF0ZSIsImNlcnRpZmljYXRlIiwiaGFzX2NlcnRpZmljYXRlIiwiZXZlbnRzIiwibWV0aG9kcyIsInRvZ2dsZVNsaWRlIiwiYmluZEZvY3VzIiwiYmluZElucHV0IiwiZSIsIm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmROYW1lIiwid29ya19uYW1lIiwiYmluZFN0YXJ0IiwidGltZV9zdGFydCIsImJpbmRFbmQiLCJ0aW1lX2VuZCIsInNlbGVjdENvbXBhbnkiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiZnJvbSIsInNjaG9vbF9pZCIsImlkIiwic2Nob29sX25hbWUiLCJzY2hvb2xfbG9nbyIsImxvZ29fdXJsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwic3VyZSIsInRlbXAiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsIiwic2Nob29sTGlzdCIsInVuc2hpZnQiLCJzY2hvb2xVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FvSks7QUFBQTs7QUFBQSxnQkFBYkMsS0FBYSxTQUFiQSxLQUFhO0FBQUEsZ0JBQU5DLEdBQU0sU0FBTkEsR0FBTTs7QUFDbEIsZ0JBQUlBLEdBQUosRUFBUztBQUNMLHFCQUFLRCxLQUFMLEdB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LEs7O2tCQXRGTzFELFMiLCJmaWxlIjoicmVzdW1lLWVkdS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgU2xpZGVCdG4gZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZS1idG4nXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVFZHUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaW5pdDogdHJ1ZSxcclxuICAgICAgICBzbGlkZTogZmFsc2UsXHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICBcImlkXCI6ICcnLFxyXG4gICAgICAgICAgICAnbmFtZSc6ICcnLFxyXG4gICAgICAgICAgICAnc2Nob29sX2lkJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfbmFtZSc6ICcnLFxyXG4gICAgICAgICAgICAnc2Nob29sX2xvZ28nOiAnJyxcclxuICAgICAgICAgICAgJ3dvcmtfbmFtZSc6ICcnLFxyXG4gICAgICAgICAgICAndGltZV9zdGFydCc6ICcnLFxyXG4gICAgICAgICAgICAndGltZV9lbmQnOiAnJyxcclxuICAgICAgICAgICAgJ2dyYWR1YXRlX3VybCc6ICcnLFxyXG4gICAgICAgICAgICAnZ3JhZHVhdGVVcmxEZXRhaWwnOiAnJyxcclxuICAgICAgICAgICAgJ2lzX2dyYWR1YXRlJzogJycsXHJcbiAgICAgICAgICAgICdoYXNfY2VydGlmaWNhdGUnOiAnJyxcclxuICAgICAgICAgICAgJ3N0YXR1cyc6ICcxJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICc0JyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+aVmeiCsuWfueiurScsXHJcbiAgICAgICAgICAgICAgICAnbGlzdCc6IFtdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzUnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn57uP566h5Z+56K6tJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcmVzdWx0OiBbXVxyXG4gICAgfVxyXG5cclxuICAgIGluZGV4ID0gLTFcclxuXHJcbiAgICRwcm9wcyA9IHtcImdyYWR1YXRlXCI6e1wiZXZlbnROYW1lXCI6XCJncmFkdWF0ZVwifSxcImNlcnRpZmljYXRlXCI6e1wiZXZlbnROYW1lXCI6XCJjZXJ0aWZpY2F0ZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2dyYWR1YXRlJzogU2xpZGVCdG4sXHJcbiAgICAgICAgJ2NlcnRpZmljYXRlJzogU2xpZGVCdG5cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGdyYWR1YXRlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pc19ncmFkdWF0ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5pivJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZS5pc19ncmFkdWF0ZSA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5ZCmJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlcnRpZmljYXRlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+aYrydcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflkKYnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAgJ2dyYWR1YXRlJzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFyZ3NbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmlzX2dyYWR1YXRlID0gJzEnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaXNfZ3JhZHVhdGUgPSAnMidcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2NlcnRpZmljYXRlJzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pc19ncmFkdWF0ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzEnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvZ2dsZVNsaWRlICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9ICF0aGlzLnNsaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRm9jdXMgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZElucHV0IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnNCw1JyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH0sICcvU2Nob29sTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTmFtZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya19uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTdGFydCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UudGltZV9zdGFydCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRW5kIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50aW1lX2VuZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDb21wYW55IChlKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0ge31cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuZnJvbSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQudHlwZSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYWxsWzBdLmxpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYWxsWzFdLmxpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLnJlc3VsdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xfaWQgPSBpdGVtLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xfbmFtZSA9IGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UubmFtZSA9IGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sX2xvZ28gPSBpdGVtLmxvZ29fdXJsXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FuY2VsICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZSAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0ge31cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0ZW1wLCB0aGlzLnBhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbExpc3RbdGhpcy5pbmRleF0gPSB0ZW1wXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbExpc3QudW5zaGlmdCh0ZW1wKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sVXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe2luZGV4LCBtc2d9KSB7XHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBKU09OLnBhcnNlKG1zZylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICc0LDUnXHJcbiAgICAgICAgfSwgJy9TY2hvb2xMaXN0L2dldExpc3QnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiBkYXRhLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbMF0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxbMV0ubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZVxyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnBhZ2UpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ3N0YXR1cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJzEnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Vba2V5XSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19