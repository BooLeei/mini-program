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

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResumeTag = (_temp2 = _class = function (_wepy$page) {
    _inherits(ResumeTag, _wepy$page);

    function ResumeTag() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResumeTag);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResumeTag.__proto__ || Object.getPrototypeOf(ResumeTag)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResumeTag, [{
        key: 'onLoad',
        value: function onLoad(_ref2) {
            var grandId = _ref2.grandId,
                parentId = _ref2.parentId,
                id = _ref2.id,
                _ref2$index = _ref2.index,
                index = _ref2$index === undefined ? 0 : _ref2$index,
                msg = _ref2.msg;

            if (msg) {
                this.page = JSON.parse(msg);
                this.index = Number.parseInt(index);
            }
            var workList = _wepy2.default.getStorageSync('workList');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = workList.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        _index = _step$value[0],
                        item = _step$value[1];

                    if (item.id === grandId) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = item.list.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _step2$value = _slicedToArray(_step2.value, 2),
                                    childIndex = _step2$value[0],
                                    childItem = _step2$value[1];

                                if (childItem.id === parentId) {
                                    this.tagList = childItem.skillList;
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
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.index = -1;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.keys(this.page)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    if (key == 'status') {
                        this.page[key] = '1';
                    } else {
                        this.page[key] = '';
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return ResumeTag;
}(_wepy2.default.page), _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.config = {
        backgroundTextStyle: 'dark',
        navigationBarTitleText: '编辑认证/技能',
        enablePullDownRefresh: false,
        disableScroll: false
    };
    this.data = {
        slide: false,
        page: {
            id: '',
            experience_type: '',
            experienceTypeName: '',
            has_certificate: '',
            is_approve: '',
            level: '',
            levelName: '',
            name: '',
            skill_id: '',
            status: '1'
        },
        tagList: [],
        level: [{
            'value': 1,
            'text': '初级'
        }, {
            'value': 2,
            'text': '中级'
        }, {
            'value': 3,
            'text': '高级'
        }, {
            'value': 4,
            'text': '资深'
        }, {
            'value': 5,
            'text': '导师级'
        }],
        exp: [{
            'value': 1,
            'text': '1年以下'
        }, {
            'value': 2,
            'text': '1~2年'
        }, {
            'value': 3,
            'text': '3~5年'
        }, {
            'value': 4,
            'text': '6~8年'
        }, {
            'value': 5,
            'text': '8~10年'
        }, {
            'value': 6,
            'text': '10年以上'
        }]
    };
    this.computed = {
        approve: function approve() {
            if (this.page.is_approve == '1') {
                return '是';
            } else if (this.page.is_approve == '0') {
                return '否';
            } else {
                return '';
            }
        },
        certificate: function certificate() {
            if (this.page.has_certificate == '1') {
                return '是';
            } else if (this.page.has_certificate == '0') {
                return '否';
            } else {
                return '';
            }
        }
    };
    this.$props = { "approve": { "eventName": "approve" }, "certificate": { "eventName": "certificate" } };
    this.$events = {};
    this.components = {
        'approve': _slideBtn2.default,
        'certificate': _slideBtn2.default
    };
    this.index = -1;
    this.events = {
        'approve': function approve() {
            if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                _this2.page.is_approve = '1';
            } else {
                _this2.page.is_approve = '0';
                _this2.page.has_certificate = '0';
            }
        },
        'certificate': function certificate() {
            if (_this2.page.is_approve == '1') {
                if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                    _this2.page.has_certificate = '1';
                } else {
                    _this2.page.has_certificate = '0';
                }
            }
        }
    };
    this.methods = {
        tagSlide: function tagSlide() {
            this.slide = !this.slide;
        },
        selectTag: function selectTag(e) {
            if (e.target.dataset.index != undefined) {
                this.page.skill_id = this.tagList[e.target.dataset.index].id;
                this.page.name = this.tagList[e.target.dataset.index].name;
                this.slide = false;
            }
        },
        bindExp: function bindExp(e) {
            this.page.experience_type = this.exp[e.detail.value].value;
            this.page.experienceTypeName = this.exp[e.detail.value].text;
        },
        bindLevel: function bindLevel(e) {
            this.page.level = this.level[e.detail.value].value;
            this.page.levelName = this.level[e.detail.value].text;
        },
        cancel: function cancel() {
            _wepy2.default.navigateBack();
        },
        sure: function sure() {
            var temp = {};
            Object.assign(temp, this.page);
            if (this.index != -1) {
                (0, _log.log)(this.$parent.global.tagList);
                this.$parent.global.tagList[this.index] = temp;
            } else {
                this.$parent.global.tagList.unshift(temp);
            }
            this.$parent.global.tagUpdate = true;
            _wepy2.default.navigateBack();
        }
    };
}, _temp2);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ResumeTag , 'pages/resume-tag'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS10YWcuanMiXSwibmFtZXMiOlsiUmVzdW1lVGFnIiwiZ3JhbmRJZCIsInBhcmVudElkIiwiaWQiLCJpbmRleCIsIm1zZyIsInBhZ2UiLCJKU09OIiwicGFyc2UiLCJOdW1iZXIiLCJwYXJzZUludCIsIndvcmtMaXN0IiwiZ2V0U3RvcmFnZVN5bmMiLCJlbnRyaWVzIiwiaXRlbSIsImxpc3QiLCJjaGlsZEluZGV4IiwiY2hpbGRJdGVtIiwidGFnTGlzdCIsInNraWxsTGlzdCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJkYXRhIiwic2xpZGUiLCJleHBlcmllbmNlX3R5cGUiLCJleHBlcmllbmNlVHlwZU5hbWUiLCJoYXNfY2VydGlmaWNhdGUiLCJpc19hcHByb3ZlIiwibGV2ZWwiLCJsZXZlbE5hbWUiLCJuYW1lIiwic2tpbGxfaWQiLCJzdGF0dXMiLCJleHAiLCJjb21wdXRlZCIsImFwcHJvdmUiLCJjZXJ0aWZpY2F0ZSIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZXZlbnRzIiwibWV0aG9kcyIsInRhZ1NsaWRlIiwic2VsZWN0VGFnIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJ1bmRlZmluZWQiLCJiaW5kRXhwIiwiZGV0YWlsIiwidmFsdWUiLCJ0ZXh0IiwiYmluZExldmVsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwic3VyZSIsInRlbXAiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsIiwidW5zaGlmdCIsInRhZ1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0F1SmdDO0FBQUEsZ0JBQXhDQyxPQUF3QyxTQUF4Q0EsT0FBd0M7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eUJBLEtBQXJEO0FBQ0EsaUJBQUtsRCxJQUFMLENBQVV5QixrQkFBVixHQUErQixLQUFLUSxHQUFMLENBQVNXLEVBQUVLLE1BQUYsQ0FBU0MsS0FBbEIsRUFBeUJDLElBQXhEO0FBQ0gsU0FkSztBQWVOQyxpQkFmTSxxQkFlS1IsQ0FmTCxFQWVRO0FBQ1YsaUJBQUs1QyxJQUFMLENBQVU0QixLQUFWLEdBQWtCLEtBQUtBLEtBQUwsQ0FBV2dCLEVBQUVLLE1BQUYsQ0FBU0MsS0FBcEIsRUFBMkJBLEtBQTdDO0FBQ0EsaUJBQUtsRCxJQUFMLENBQVU2QixTQUFWLEdBQXNCLEtBQUtELEtBQUwsQ0FBV2dCLEVBQUVLLE1BQUYsQ0FBU0MsS0FBcEIsRUFBMkJDLElBQWpEO0FBQ0gsU0FsQks7QUFtQk5FLGNBbkJNLG9CQW1CSTtBQUNOLDJCQUFLQyxZQUFMO0FBQ0gsU0FyQks7QUFzQk5DLFlBdEJNLGtCQXNCRTtBQUNKLGdCQUFJQyxPQUFPLEVBQVg7QUFDQTFDLG1CQUFPMkMsTUFBUCxDQUFjRCxJQUFkLEVBQW9CLEtBQUt4RCxJQUF6QjtBQUNBLGdCQUFJLEtBQUtGLEtBQUwsSUFBYyxDQUFDLENBQW5CLEVBQXNCO0FBQ2xCLDhCQUFJLEtBQUs0RCxPQUFMLENBQWFDLE1BQWIsQ0FBb0IvQyxPQUF4QjtBQUNBLHFCQUFLOEMsT0FBTCxDQUFhQyxNQUFiLENBQW9CL0MsT0FBcEIsQ0FBNEIsS0FBS2QsS0FBakMsSUFBMEMwRCxJQUExQztBQUNILGFBSEQsTUFHTztBQUNILHFCQUFLRSxPQUFMLENBQWFDLE1BQWIsQ0FBb0IvQyxPQUFwQixDQUE0QmdELE9BQTVCLENBQW9DSixJQUFwQztBQUNIO0FBQ0QsaUJBQUtFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkUsU0FBcEIsR0FBZ0MsSUFBaEM7QUFDQSwyQkFBS1AsWUFBTDtBQUNIO0FBakNLLEs7O2tCQW5ITzVELFMiLCJmaWxlIjoicmVzdW1lLXRhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgU2xpZGVCdG4gZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZS1idG4nXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVUYWcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e8lui+keiupOivgS/mioDog70nLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHNsaWRlOiBmYWxzZSxcclxuICAgICAgICBwYWdlOiB7XHJcbiAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZV90eXBlOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgaGFzX2NlcnRpZmljYXRlOiAnJyxcclxuICAgICAgICAgICAgaXNfYXBwcm92ZTogJycsXHJcbiAgICAgICAgICAgIGxldmVsOiAnJyxcclxuICAgICAgICAgICAgbGV2ZWxOYW1lOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHNraWxsX2lkOiAnJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAnMSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhZ0xpc3Q6IFtdLFxyXG4gICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICfliJ3nuqcnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICfkuK3nuqcnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICfpq5jnuqcnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICfotYTmt7EnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICflr7zluIjnuqcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGV4cDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnMeW5tOS7peS4iydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzF+MuW5tCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzN+NeW5tCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzZ+OOW5tCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzh+MTDlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDYsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICcxMOW5tOS7peS4iidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBhcHByb3ZlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pc19hcHByb3ZlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfmmK8nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlLmlzX2FwcHJvdmUgPT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WQpidcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjZXJ0aWZpY2F0ZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfmmK8nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5ZCmJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJhcHByb3ZlXCI6e1wiZXZlbnROYW1lXCI6XCJhcHByb3ZlXCJ9LFwiY2VydGlmaWNhdGVcIjp7XCJldmVudE5hbWVcIjpcImNlcnRpZmljYXRlXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnYXBwcm92ZSc6IFNsaWRlQnRuLFxyXG4gICAgICAgICdjZXJ0aWZpY2F0ZSc6IFNsaWRlQnRuXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAtMVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAnYXBwcm92ZSc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pc19hcHByb3ZlID0gJzEnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaXNfYXBwcm92ZSA9ICcwJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnY2VydGlmaWNhdGUnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2FwcHJvdmUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJnc1swXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc19jZXJ0aWZpY2F0ZSA9ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzAnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0YWdTbGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSAhdGhpcy5zbGlkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0VGFnIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNraWxsX2lkID0gdGhpcy50YWdMaXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdLmlkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UubmFtZSA9IHRoaXMudGFnTGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XS5uYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEV4cCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZXhwZXJpZW5jZV90eXBlID0gdGhpcy5leHBbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZU5hbWUgPSB0aGlzLmV4cFtlLmRldGFpbC52YWx1ZV0udGV4dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZExldmVsIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5sZXZlbCA9IHRoaXMubGV2ZWxbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5sZXZlbE5hbWUgPSB0aGlzLmxldmVsW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB7fVxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRlbXAsIHRoaXMucGFnZSlcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ0xpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ0xpc3RbdGhpcy5pbmRleF0gPSB0ZW1wXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ0xpc3QudW5zaGlmdCh0ZW1wKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe2dyYW5kSWQsIHBhcmVudElkLCBpZCwgaW5kZXggPSAwLCBtc2d9KSB7XHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBKU09OLnBhcnNlKG1zZylcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdvcmtMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKVxyXG4gICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2Ygd29ya0xpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBncmFuZElkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBbY2hpbGRJbmRleCwgY2hpbGRJdGVtXSBvZiBpdGVtLmxpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkSXRlbS5pZCA9PT0gcGFyZW50SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdMaXN0ID0gY2hpbGRJdGVtLnNraWxsTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMucGFnZSkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnc3RhdHVzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=