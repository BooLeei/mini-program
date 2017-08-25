'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
                                _this3.all[0].list.push(item);
                                break;
                            case "5":
                                _this3.all[1].list.push(item);
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

    return ResumeEdu;
}(_wepy2.default.page), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

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
        'certificate': _slideBtn2.default,
        'toast': _toast2.default
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
                _this4.page.is_graduate = '1';
            } else {
                _this4.page.is_graduate = '2';
                _this4.page.has_certificate = '2';
            }
        },
        'certificate': function certificate() {
            if (_this4.page.is_graduate == '1') {
                if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                    _this4.page.has_certificate = '1';
                } else {
                    _this4.page.has_certificate = '2';
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
            var _this5 = this;

            this.init = false;
            this.page.name = e.detail.value;
            this.request.Get({
                type: '4,5',
                name: e.detail.value
            }, '/SchoolList/getList').then(function (_ref4) {
                var data = _ref4.data;

                _this5.result = data;
                _this5.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1lZHUuanMiXSwibmFtZXMiOlsiUmVzdW1lRWR1IiwiZGF0YSIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0b2FzdCIsImNvbnRlbnQiLCJpbmRleCIsIm1zZyIsInBhZ2UiLCJKU09OIiwicGFyc2UiLCJyZXF1ZXN0IiwiR2V0IiwidHlwZSIsInRoZW4iLCJlbnRyaWVzIiwiaXRlbSIsImFsbCIsImxpc3QiLCJwdXNoIiwiJGFwcGx5Iiwic2xpZGUiLCJpbml0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlc3VsdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJncmFkdWF0ZSIsImlzX2dyYWR1YXRlIiwiY2VydGlmaWNhdGUiLCJoYXNfY2VydGlmaWNhdGUiLCJldmVudHMiLCJtZXRob2RzIiwidG9nZ2xlU2xpZGUiLCJiaW5kRm9jdXMiLCJiaW5kSW5wdXQiLCJlIiwibmFtZSIsImRldGFpbCIsInZhbHVlIiwiYmluZE5hbWUiLCJ3b3JrX25hbWUiLCJiaW5kU3RhcnQiLCJ0aW1lX3N0YXJ0IiwiYmluZEVuZCIsInRpbWVfZW5kIiwic2VsZWN0Q29tcGFueSIsInRhcmdldCIsImRhdGFzZXQiLCJmcm9tIiwic2Nob29sX2lkIiwiaWQiLCJzY2hvb2xfbmFtZSIsInNjaG9vbF9sb2dvIiwibG9nb191cmwiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJzdXJlIiwidGVtcCIsImFzc2lnbiIsInNjaG9vbExpc3QiLCJ1bnNoaWZ0Iiwic2Nob29sVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNB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QixJQUE3QjtBQUNBLGlCQUFLdEMsSUFBTCxDQUFVc0MsSUFBVixHQUFpQjlCLEtBQUs4QixJQUF0QjtBQUNBLGlCQUFLdEMsSUFBTCxDQUFVc0QsV0FBVixHQUF3QjlDLEtBQUsrQyxRQUE3QjtBQUNBLGlCQUFLMUMsS0FBTCxHQUFhLEtBQWI7QUFDSCxTQTdDSztBQThDTjJDLGNBOUNNLG9CQThDSTtBQUNOLDJCQUFLQyxZQUFMO0FBQ0gsU0FoREs7QUFpRE5DLFlBakRNLGtCQWlERTtBQUNKLGdCQUFJQyxPQUFPLEVBQVg7QUFDQTVDLG1CQUFPNkMsTUFBUCxDQUFjRCxJQUFkLEVBQW9CLEtBQUszRCxJQUF6QjtBQUNBLGdCQUFJLEtBQUtGLEtBQUwsSUFBYyxDQUFDLENBQW5CLEVBQXNCO0FBQ2xCLHFCQUFLUCxPQUFMLENBQWFDLE1BQWIsQ0FBb0JxRSxVQUFwQixDQUErQixLQUFLL0QsS0FBcEMsSUFBNkM2RCxJQUE3QztBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLcEUsT0FBTCxDQUFhQyxNQUFiLENBQW9CcUUsVUFBcEIsQ0FBK0JDLE9BQS9CLENBQXVDSCxJQUF2QztBQUNIO0FBQ0QsaUJBQUtwRSxPQUFMLENBQWFDLE1BQWIsQ0FBb0J1RSxZQUFwQixHQUFtQyxJQUFuQztBQUNBLDJCQUFLTixZQUFMO0FBQ0g7QUEzREssSzs7a0JBeEdPdEUsUyIsImZpbGUiOiJyZXN1bWUtZWR1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgU2xpZGVCdG4gZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZS1idG4nXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVFZHUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5a2m5Lmg57uP5Y6GJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpbml0OiB0cnVlLFxyXG4gICAgICAgIHNsaWRlOiBmYWxzZSxcclxuICAgICAgICBwYWdlOiB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogJycsXHJcbiAgICAgICAgICAgICduYW1lJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfaWQnOiAnJyxcclxuICAgICAgICAgICAgJ3NjaG9vbF9uYW1lJzogJycsXHJcbiAgICAgICAgICAgICdzY2hvb2xfbG9nbyc6ICcnLFxyXG4gICAgICAgICAgICAnd29ya19uYW1lJzogJycsXHJcbiAgICAgICAgICAgICd0aW1lX3N0YXJ0JzogJycsXHJcbiAgICAgICAgICAgICd0aW1lX2VuZCc6ICcnLFxyXG4gICAgICAgICAgICAnZ3JhZHVhdGVfdXJsJzogJycsXHJcbiAgICAgICAgICAgICdncmFkdWF0ZVVybERldGFpbCc6ICcnLFxyXG4gICAgICAgICAgICAnaXNfZ3JhZHVhdGUnOiAnJyxcclxuICAgICAgICAgICAgJ2hhc19jZXJ0aWZpY2F0ZSc6ICcnLFxyXG4gICAgICAgICAgICAnc3RhdHVzJzogJzEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJzQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5pWZ6IKy5Z+56K6tJyxcclxuICAgICAgICAgICAgICAgICdsaXN0JzogW11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnNScsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfnu4/nrqHln7norq0nLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QnOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICByZXN1bHQ6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAtMVxyXG5cclxuICAgJHByb3BzID0ge1wiZ3JhZHVhdGVcIjp7XCJldmVudE5hbWVcIjpcImdyYWR1YXRlXCJ9LFwiY2VydGlmaWNhdGVcIjp7XCJldmVudE5hbWVcIjpcImNlcnRpZmljYXRlXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnZ3JhZHVhdGUnOiBTbGlkZUJ0bixcclxuICAgICAgICAnY2VydGlmaWNhdGUnOiBTbGlkZUJ0bixcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgZ3JhZHVhdGUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfmmK8nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflkKYnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VydGlmaWNhdGUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5pivJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WQpidcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAnZ3JhZHVhdGUnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXJnc1swXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaXNfZ3JhZHVhdGUgPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pc19ncmFkdWF0ZSA9ICcyJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcyJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnY2VydGlmaWNhdGUnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2dyYWR1YXRlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMSdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcyJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlU2xpZGUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gIXRoaXMuc2xpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRGb2N1cyAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSW5wdXQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICc0LDUnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfSwgJy9TY2hvb2xMaXN0L2dldExpc3QnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmROYW1lIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrX25hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFN0YXJ0IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50aW1lX3N0YXJ0ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFbmQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRpbWVfZW5kID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdENvbXBhbnkgKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7fVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5mcm9tID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50eXBlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hbGxbMF0ubGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hbGxbMV0ubGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMucmVzdWx0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9pZCA9IGl0ZW0uaWRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbF9uYW1lID0gaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xfbG9nbyA9IGl0ZW0ubG9nb191cmxcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB7fVxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRlbXAsIHRoaXMucGFnZSlcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdFt0aGlzLmluZGV4XSA9IHRlbXBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdC51bnNoaWZ0KHRlbXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7aW5kZXgsIG1zZ30pIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IEpTT04ucGFyc2UobXNnKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgdHlwZTogJzQsNSdcclxuICAgICAgICB9LCAnL1NjaG9vbExpc3QvZ2V0TGlzdCcpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGRhdGEuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFswXS5saXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFsxXS5saXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMucGFnZSkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnc3RhdHVzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=