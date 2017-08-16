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

            (0, _log.log)(getCurrentPages()[getCurrentPages().length - 2]);
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

            (0, _log.log)(this.page);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS10YWcuanMiXSwibmFtZXMiOlsiUmVzdW1lVGFnIiwiZ3JhbmRJZCIsInBhcmVudElkIiwiaWQiLCJpbmRleCIsIm1zZyIsInBhZ2UiLCJKU09OIiwicGFyc2UiLCJOdW1iZXIiLCJwYXJzZUludCIsIndvcmtMaXN0IiwiZ2V0U3RvcmFnZVN5bmMiLCJlbnRyaWVzIiwiaXRlbSIsImxpc3QiLCJjaGlsZEluZGV4IiwiY2hpbGRJdGVtIiwidGFnTGlzdCIsInNraWxsTGlzdCIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJkYXRhIiwic2xpZGUiLCJleHBlcmllbmNlX3R5cGUiLCJleHBlcmllbmNlVHlwZU5hbWUiLCJoYXNfY2VydGlmaWNhdGUiLCJpc19hcHByb3ZlIiwibGV2ZWwiLCJsZXZlbE5hbWUiLCJuYW1lIiwic2tpbGxfaWQiLCJzdGF0dXMiLCJleHAiLCJjb21wdXRlZCIsImFwcHJvdmUiLCJjZXJ0aWZpY2F0ZSIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZXZlbnRzIiwibWV0aG9kcyIsInRhZ1NsaWRlIiwic2VsZWN0VGFnIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJ1bmRlZmluZWQiLCJiaW5kRXhwIiwiZGV0YWlsIiwidmFsdWUiLCJ0ZXh0IiwiYmluZExldmVsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwic3VyZSIsInRlbXAiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsIiwidW5zaGlmdCIsInRhZ1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0F1SmdDO0FBQUEs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O0FBQ0g7QUFqQ0ssSzs7a0JBbkhPOUQsUyIsImZpbGUiOiJyZXN1bWUtdGFnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBTbGlkZUJ0biBmcm9tICcuLi9jb21wb25lbnRzL3NsaWRlLWJ0bidcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VtZVRhZyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R6K6k6K+BL+aKgOiDvScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2xpZGU6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlX3R5cGU6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlVHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBoYXNfY2VydGlmaWNhdGU6ICcnLFxyXG4gICAgICAgICAgICBpc19hcHByb3ZlOiAnJyxcclxuICAgICAgICAgICAgbGV2ZWw6ICcnLFxyXG4gICAgICAgICAgICBsZXZlbE5hbWU6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc2tpbGxfaWQ6ICcnLFxyXG4gICAgICAgICAgICBzdGF0dXM6ICcxJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFnTGlzdDogW10sXHJcbiAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WInee6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+S4ree6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+mrmOe6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+i1hOa3sSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WvvOW4iOe6pydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXhwOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICcx5bm05Lul5LiLJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnMX4y5bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnM3415bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnNn445bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnOH4xMOW5tCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNixcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzEw5bm05Lul5LiKJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGFwcHJvdmUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2FwcHJvdmUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+aYrydcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2UuaXNfYXBwcm92ZSA9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5ZCmJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlcnRpZmljYXRlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+aYrydcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflkKYnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImFwcHJvdmVcIjp7XCJldmVudE5hbWVcIjpcImFwcHJvdmVcIn0sXCJjZXJ0aWZpY2F0ZVwiOntcImV2ZW50TmFtZVwiOlwiY2VydGlmaWNhdGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdhcHByb3ZlJzogU2xpZGVCdG4sXHJcbiAgICAgICAgJ2NlcnRpZmljYXRlJzogU2xpZGVCdG5cclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9IC0xXHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgICdhcHByb3ZlJzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFyZ3NbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmlzX2FwcHJvdmUgPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pc19hcHByb3ZlID0gJzAnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdjZXJ0aWZpY2F0ZSc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNfYXBwcm92ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzEnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRhZ1NsaWRlICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9ICF0aGlzLnNsaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RUYWcgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2tpbGxfaWQgPSB0aGlzLnRhZ0xpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF0uaWRcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gdGhpcy50YWdMaXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdLm5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlX3R5cGUgPSB0aGlzLmV4cFtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmV4cGVyaWVuY2VUeXBlTmFtZSA9IHRoaXMuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTGV2ZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmxldmVsID0gdGhpcy5sZXZlbFtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmxldmVsTmFtZSA9IHRoaXMubGV2ZWxbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHt9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGVtcCwgdGhpcy5wYWdlKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbG9nKHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdFt0aGlzLmluZGV4XSA9IHRlbXBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdC51bnNoaWZ0KHRlbXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7Z3JhbmRJZCwgcGFyZW50SWQsIGlkLCBpbmRleCA9IDAsIG1zZ30pIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IEpTT04ucGFyc2UobXNnKVxyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd29ya0xpc3QgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd3b3JrTGlzdCcpXHJcbiAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiB3b3JrTGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGdyYW5kSWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtjaGlsZEluZGV4LCBjaGlsZEl0ZW1dIG9mIGl0ZW0ubGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRJdGVtLmlkID09PSBwYXJlbnRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0xpc3QgPSBjaGlsZEl0ZW0uc2tpbGxMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvZyhnZXRDdXJyZW50UGFnZXMoKVtnZXRDdXJyZW50UGFnZXMoKS5sZW5ndGggLSAyXSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMucGFnZSkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnc3RhdHVzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVtrZXldID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2codGhpcy5wYWdlKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==