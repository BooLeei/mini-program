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
    var _this3 = this;

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
        'certificate': _slideBtn2.default,
        'toast': _toast2.default
    };
    this.index = -1;
    this.events = {
        'approve': function approve() {
            if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                _this3.page.is_approve = '1';
            } else {
                _this3.page.is_approve = '0';
                _this3.page.has_certificate = '0';
            }
        },
        'certificate': function certificate() {
            if (_this3.page.is_approve == '1') {
                if ((arguments.length <= 0 ? undefined : arguments[0]) == 1) {
                    _this3.page.has_certificate = '1';
                } else {
                    _this3.page.has_certificate = '0';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS10YWcuanMiXSwibmFtZXMiOlsiUmVzdW1lVGFnIiwiZGF0YSIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0b2FzdCIsImNvbnRlbnQiLCJncmFuZElkIiwicGFyZW50SWQiLCJpZCIsImluZGV4IiwibXNnIiwicGFnZSIsIkpTT04iLCJwYXJzZSIsIndvcmtMaXN0IiwiZ2V0U3RvcmFnZVN5bmMiLCJlbnRyaWVzIiwiaXRlbSIsImxpc3QiLCJjaGlsZEluZGV4IiwiY2hpbGRJdGVtIiwidGFnTGlzdCIsInNraWxsTGlzdCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJzbGlkZSIsImV4cGVyaWVuY2VfdHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsImhhc19jZXJ0aWZpY2F0ZSIsImlzX2FwcHJvdmUiLCJsZXZlbCIsImxldmVsTmFtZSIsIm5hbWUiLCJza2lsbF9pZCIsInN0YXR1cyIsImV4cCIsImNvbXB1dGVkIiwiYXBwcm92ZSIsImNlcnRpZmljYXRlIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJldmVudHMiLCJtZXRob2RzIiwidGFnU2xpZGUiLCJzZWxlY3RUYWciLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInVuZGVmaW5lZCIsImJpbmRFeHAiLCJkZXRhaWwiLCJ2YWx1ZSIsInRleHQiLCJiaW5kTGV2ZWwiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJzdXJlIiwidGVtcCIsImFzc2lnbiIsInVuc2hpZnQiLCJ0YWdVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVx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S0FBS1YsT0FBTCxDQUFhQyxNQUFiLENBQW9CcUIsT0FBeEI7QUFDQSxxQkFBS3RCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQnFCLE9BQXBCLENBQTRCLEtBQUtaLEtBQWpDLElBQTBDdUQsSUFBMUM7QUFDSCxhQUhELE1BR087QUFDSCxxQkFBS2pFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQnFCLE9BQXBCLENBQTRCNkMsT0FBNUIsQ0FBb0NGLElBQXBDO0FBQ0g7QUFDRCxpQkFBS2pFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQm1FLFNBQXBCLEdBQWdDLElBQWhDO0FBQ0EsMkJBQUtMLFlBQUw7QUFDSDtBQWpDSyxLOztrQkEvSE9uRSxTIiwiZmlsZSI6InJlc3VtZS10YWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBTbGlkZUJ0biBmcm9tICcuLi9jb21wb25lbnRzL3NsaWRlLWJ0bidcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VtZVRhZyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R6K6k6K+BL+aKgOiDvScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2xpZGU6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlX3R5cGU6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlVHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBoYXNfY2VydGlmaWNhdGU6ICcnLFxyXG4gICAgICAgICAgICBpc19hcHByb3ZlOiAnJyxcclxuICAgICAgICAgICAgbGV2ZWw6ICcnLFxyXG4gICAgICAgICAgICBsZXZlbE5hbWU6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc2tpbGxfaWQ6ICcnLFxyXG4gICAgICAgICAgICBzdGF0dXM6ICcxJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFnTGlzdDogW10sXHJcbiAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WInee6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+S4ree6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+mrmOe6pydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+i1hOa3sSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WvvOW4iOe6pydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXhwOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAndGV4dCc6ICcx5bm05Lul5LiLJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnMX4y5bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnM3415bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnNn445bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgJ3RleHQnOiAnOH4xMOW5tCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogNixcclxuICAgICAgICAgICAgICAgICd0ZXh0JzogJzEw5bm05Lul5LiKJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGFwcHJvdmUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzX2FwcHJvdmUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+aYrydcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2UuaXNfYXBwcm92ZSA9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5ZCmJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlcnRpZmljYXRlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+aYrydcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflkKYnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImFwcHJvdmVcIjp7XCJldmVudE5hbWVcIjpcImFwcHJvdmVcIn0sXCJjZXJ0aWZpY2F0ZVwiOntcImV2ZW50TmFtZVwiOlwiY2VydGlmaWNhdGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdhcHByb3ZlJzogU2xpZGVCdG4sXHJcbiAgICAgICAgJ2NlcnRpZmljYXRlJzogU2xpZGVCdG4sXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9IC0xXHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgICdhcHByb3ZlJzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFyZ3NbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmlzX2FwcHJvdmUgPSAnMSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pc19hcHByb3ZlID0gJzAnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdjZXJ0aWZpY2F0ZSc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNfYXBwcm92ZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzX2NlcnRpZmljYXRlID0gJzEnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNfY2VydGlmaWNhdGUgPSAnMCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRhZ1NsaWRlICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9ICF0aGlzLnNsaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RUYWcgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2tpbGxfaWQgPSB0aGlzLnRhZ0xpc3RbZS50YXJnZXQuZGF0YXNldC5pbmRleF0uaWRcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gdGhpcy50YWdMaXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdLm5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlX3R5cGUgPSB0aGlzLmV4cFtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmV4cGVyaWVuY2VUeXBlTmFtZSA9IHRoaXMuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTGV2ZWwgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmxldmVsID0gdGhpcy5sZXZlbFtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmxldmVsTmFtZSA9IHRoaXMubGV2ZWxbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHt9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGVtcCwgdGhpcy5wYWdlKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbG9nKHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdFt0aGlzLmluZGV4XSA9IHRlbXBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdC51bnNoaWZ0KHRlbXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7Z3JhbmRJZCwgcGFyZW50SWQsIGlkLCBpbmRleCA9IDAsIG1zZ30pIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IEpTT04ucGFyc2UobXNnKVxyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd29ya0xpc3QgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd3b3JrTGlzdCcpXHJcbiAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiB3b3JrTGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGdyYW5kSWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtjaGlsZEluZGV4LCBjaGlsZEl0ZW1dIG9mIGl0ZW0ubGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRJdGVtLmlkID09PSBwYXJlbnRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0xpc3QgPSBjaGlsZEl0ZW0uc2tpbGxMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gLTFcclxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5wYWdlKSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdzdGF0dXMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Vba2V5XSA9ICcxJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlW2tleV0gPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==