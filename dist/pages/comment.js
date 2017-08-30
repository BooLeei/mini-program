'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_wepy$page) {
    _inherits(Comment, _wepy$page);

    function Comment() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Comment);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '对此次面试进行评价',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.components = {
            'toast': _toast2.default
        }, _this.data = {
            type: '1',
            tagArr: [],
            tempTag: '',
            page: {
                'id': '',
                'interviewer_num': 0,
                'conform_num': 0,
                'env_num': 0,
                'salary_num': 0,
                'tag_str': '',
                'content': ''
            }
        }, _this.customer = {
            id: '',
            index: -1
        }, _this.methods = {
            bindTag: function bindTag(e) {
                this.tempTag = e.detail.value;
            },
            stickTag: function stickTag() {
                if (this.tagArr.length >= 3) {
                    return false;
                }
                if (this.tempTag == '') {
                    return false;
                }
                this.tagArr.push(this.tempTag);
                this.tempTag = '';
            },
            delTag: function delTag(index) {
                this.tagArr.splice(index, 1);
            },
            bindContent: function bindContent(e) {
                this.page.content = e.detail.value;
            },
            cancel: function cancel() {
                _wepy2.default.navigateBack();
            },
            del: function del() {
                var _this2 = this;

                _wepy2.default.showModal({
                    title: '提示',
                    content: '确定删除这条评论',
                    success: function success(res) {
                        if (res.confirm) {
                            _this2.request.Post({
                                id: _this2.customer.id
                            }, '/InviteWorkFeedback/del').then(function (res) {
                                _wepy2.default.navigateBack();
                            });
                        }
                    }
                });
            },
            sure: function sure() {
                if (this.page.interviewer_num === 0) {
                    this.toast({ content: '请为面试官评分' });
                    return false;
                }
                if (this.page.conform_num === 0) {
                    this.toast({ content: '请为工作相符评分' });
                    return false;
                }
                if (this.page.env_num === 0) {
                    this.toast({ content: '请为工作环境评分' });
                    return false;
                }
                if (this.page.salary_num === 0) {
                    this.toast({ content: '请为薪资相符评分' });
                    return false;
                }
                this.request.Post({
                    sendResumeId: this.customer.id,
                    tagStr: this.tagArr.join(','),
                    interviewerNum: this.page.interviewer_num,
                    conformNum: this.page.conform_num,
                    envNum: this.page.env_num,
                    salaryNum: this.page.salary_num,
                    content: this.page.content
                }, '/InviteWorkFeedback/add').then(function (res) {
                    _wepy2.default.navigateBack();
                }).catch(function (err) {
                    console.log(err);
                });
            },
            commentStar: function commentStar(e) {
                if (this.type != 1) {
                    return false;
                }
                if (e.target.dataset.index != undefined) {
                    switch (Number.parseInt(e.target.dataset.type)) {
                        case 1:
                            if (this.page.interviewer_num == Number.parseInt(e.target.dataset.index) + 1) {
                                this.page.interviewer_num = 0;
                            } else {
                                this.page.interviewer_num = Number.parseInt(e.target.dataset.index) + 1;
                            }
                            break;
                        case 2:
                            if (this.page.conform_num == Number.parseInt(e.target.dataset.index) + 1) {
                                this.page.conform_num = 0;
                            } else {
                                this.page.conform_num = Number.parseInt(e.target.dataset.index) + 1;
                            }
                            break;
                        case 3:
                            if (this.page.env_num == Number.parseInt(e.target.dataset.index) + 1) {
                                this.page.env_num = 0;
                            } else {
                                this.page.env_num = Number.parseInt(e.target.dataset.index) + 1;
                            }
                            break;
                        case 4:
                            if (this.page.salary_num == Number.parseInt(e.target.dataset.index) + 1) {
                                this.page.salary_num = 0;
                            } else {
                                this.page.salary_num = Number.parseInt(e.target.dataset.index) + 1;
                            }
                            break;
                        default:
                            return;
                    }
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Comment, [{
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
        value: function onLoad(_ref2) {
            var _this4 = this;

            var type = _ref2.type,
                id = _ref2.id,
                index = _ref2.index;

            this.type = type;
            this.customer.id = id;
            this.customer.index = Number.parseInt(index);
            if (Number.parseInt(type) !== 1) {
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                this.request.Get({
                    id: id
                }, '/InviteWorkFeedback/getInfo').then(function (_ref3) {
                    var data = _ref3.data;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            if (key == 'salary_num' || key == 'interviewer_num' || key == 'env_num' || key == 'conform_num') {
                                data[key] = Number.parseInt(data[key]);
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

                    _this4.page = data;
                    if (_this4.page.tag_str.length != 0) {
                        _this4.tagArr = _this4.page.tag_str.split(',');
                    }
                    _this4.$apply();
                    _wepy2.default.hideLoading();
                });
            }
        }
    }]);

    return Comment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Comment , 'pages/comment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJjb21wb25lbnRzIiwiZGF0YSIsInR5cGUiLCJ0YWdBcnIiLCJ0ZW1wVGFnIiwicGFnZSIsImN1c3RvbWVyIiwiaWQiLCJpbmRleCIsIm1ldGhvZHMiLCJiaW5kVGFnIiwiZSIsImRldGFpbCIsInZhbHVlIiwic3RpY2tUYWciLCJsZW5ndGgiLCJwdXNoIiwiZGVsVGFnIiwic3BsaWNlIiwiYmluZENvbnRlbnQiLCJjb250ZW50IiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwiZGVsIiwic2hvd01vZGFsIiwidGl0bGUiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIlBvc3QiLCJ0aGVuIiwic3VyZSIsImludGVydmlld2VyX251bSIsInRvYXN0IiwiY29uZm9ybV9udW0iLCJlbnZfbnVtIiwic2FsYXJ5X251bSIsInNlbmRSZXN1bWVJZCIsInRhZ1N0ciIsImpvaW4iLCJpbnRlcnZpZXdlck51bSIsImNvbmZvcm1OdW0iLCJlbnZOdW0iLCJzYWxhcnlOdW0iLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJjb21tZW50U3RhciIsInRhcmdldCIsImRhdGFzZXQiLCJ1bmRlZmluZWQiLCJOdW1iZXIiLCJwYXJzZUludCIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIiwic2hvd0xvYWRpbmciLCJtYXNrIiwiR2V0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInRhZ19zdHIiLCJzcGxpdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7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QVZBLElBQVU7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDZCw2Q0FBZ0I2RCxPQUFPQyxJQUFQLENBQVk5RCxJQUFaLENBQWhCLDhIQUFtQztBQUFBLGdDQUExQitELEdBQTBCOztBQUMvQixnQ0FBSUEsT0FBTyxZQUFQLElBQXVCQSxPQUFPLGlCQUE5QixJQUFtREEsT0FBTyxTQUExRCxJQUF1RUEsT0FBTyxhQUFsRixFQUFpRztBQUM3Ri9ELHFDQUFLK0QsR0FBTCxJQUFZWixPQUFPQyxRQUFQLENBQWdCcEQsS0FBSytELEdBQUwsQ0FBaEIsQ0FBWjtBQUNIO0FBQ0o7QUFMYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1kLDJCQUFLM0QsSUFBTCxHQUFZSixJQUFaO0FBQ0Esd0JBQUksT0FBS0ksSUFBTCxDQUFVNEQsT0FBVixDQUFrQmxELE1BQWxCLElBQTRCLENBQWhDLEVBQW1DO0FBQy9CLCtCQUFLWixNQUFMLEdBQWMsT0FBS0UsSUFBTCxDQUFVNEQsT0FBVixDQUFrQkMsS0FBbEIsQ0FBd0IsR0FBeEIsQ0FBZDtBQUNIO0FBQ0QsMkJBQUtDLE1BQUw7QUFDQSxtQ0FBS0MsV0FBTDtBQUNILGlCQWZEO0FBZ0JIO0FBQ0o7Ozs7RUFwTGdDLGVBQUsvRCxJOztrQkFBckJaLE8iLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a+55q2k5qyh6Z2i6K+V6L+b6KGM6K+E5Lu3JyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB0eXBlOiAnMScsXHJcbiAgICAgICAgdGFnQXJyOiBbXSxcclxuICAgICAgICB0ZW1wVGFnOiAnJyxcclxuICAgICAgICBwYWdlOiB7XHJcbiAgICAgICAgICAgICdpZCc6ICcnLFxyXG4gICAgICAgICAgICAnaW50ZXJ2aWV3ZXJfbnVtJzogMCxcclxuICAgICAgICAgICAgJ2NvbmZvcm1fbnVtJzogMCxcclxuICAgICAgICAgICAgJ2Vudl9udW0nOiAwLFxyXG4gICAgICAgICAgICAnc2FsYXJ5X251bSc6IDAsXHJcbiAgICAgICAgICAgICd0YWdfc3RyJzogJycsXHJcbiAgICAgICAgICAgICdjb250ZW50JzogJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3VzdG9tZXIgPSB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIGluZGV4OiAtMVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZFRhZyAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBUYWcgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RpY2tUYWcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWdBcnIubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBUYWcgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGFnQXJyLnB1c2godGhpcy50ZW1wVGFnKVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBUYWcgPSAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsVGFnIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0Fyci5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ29udGVudCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29udGVudCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a5Yig6Zmk6L+Z5p2h6K+E6K66JyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmN1c3RvbWVyLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvSW52aXRlV29ya0ZlZWRiYWNrL2RlbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaW50ZXJ2aWV3ZXJfbnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35Li66Z2i6K+V5a6Y6K+E5YiGJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmNvbmZvcm1fbnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35Li65bel5L2c55u456ym6K+E5YiGJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmVudl9udW0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7fkuLrlt6XkvZznjq/looPor4TliIYnfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+S4uuiWqui1hOebuOespuivhOWIhid9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3VtZUlkOiB0aGlzLmN1c3RvbWVyLmlkLFxyXG4gICAgICAgICAgICAgICAgdGFnU3RyOiB0aGlzLnRhZ0Fyci5qb2luKCcsJyksXHJcbiAgICAgICAgICAgICAgICBpbnRlcnZpZXdlck51bTogdGhpcy5wYWdlLmludGVydmlld2VyX251bSxcclxuICAgICAgICAgICAgICAgIGNvbmZvcm1OdW06IHRoaXMucGFnZS5jb25mb3JtX251bSxcclxuICAgICAgICAgICAgICAgIGVudk51bTogdGhpcy5wYWdlLmVudl9udW0sXHJcbiAgICAgICAgICAgICAgICBzYWxhcnlOdW06IHRoaXMucGFnZS5zYWxhcnlfbnVtLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wYWdlLmNvbnRlbnRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svYWRkJylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1lbnRTdGFyIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pbnRlcnZpZXdlcl9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaW50ZXJ2aWV3ZXJfbnVtID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnRlcnZpZXdlcl9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5jb25mb3JtX251bSA9PSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5jb25mb3JtX251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuY29uZm9ybV9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5lbnZfbnVtID09IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmVudl9udW0gPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuZW52X251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLnNhbGFyeV9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7dHlwZSwgaWQsIGluZGV4fSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICB0aGlzLmN1c3RvbWVyLmlkID0gaWRcclxuICAgICAgICB0aGlzLmN1c3RvbWVyLmluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgIT09IDEpIHtcclxuICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICBpZDogaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svZ2V0SW5mbycpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ3NhbGFyeV9udW0nIHx8IGtleSA9PSAnaW50ZXJ2aWV3ZXJfbnVtJyB8fCBrZXkgPT0gJ2Vudl9udW0nIHx8IGtleSA9PSAnY29uZm9ybV9udW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IE51bWJlci5wYXJzZUludChkYXRhW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS50YWdfc3RyLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdBcnIgPSB0aGlzLnBhZ2UudGFnX3N0ci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19