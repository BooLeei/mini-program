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
        }, _this.request = new _request2.default(), _this.userId = '', _this.components = {
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
        }, _this.methods = {
            bindTag: function bindTag(e) {
                console.log(e);
                this.tempTag = e.detail.value;
                console.log(this.tempTag);
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

            var type = _ref2.type,
                id = _ref2.id;

            this.type = type;
            this.page.id = id;
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

                    _this3.page = data;
                    _this3.tagArr = _this3.page.tag_str.split(',');
                    _this3.$apply();
                    _wepy2.default.hideLoading();
                });
            }
        }
    }]);

    return Comment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Comment , 'pages/comment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJ1c2VySWQiLCJjb21wb25lbnRzIiwiZGF0YSIsInR5cGUiLCJ0YWdBcnIiLCJ0ZW1wVGFnIiwicGFnZSIsIm1ldGhvZHMiLCJiaW5kVGFnIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsInN0aWNrVGFnIiwibGVuZ3RoIiwicHVzaCIsImRlbFRhZyIsImluZGV4Iiwic3BsaWNlIiwiYmluZENvbnRlbnQiLCJjb250ZW50IiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwiY29tbWVudFN0YXIiLCJ0YXJnZXQiLCJkYXRhc2V0IiwidW5kZWZpbmVkIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJpbnRlcnZpZXdlcl9udW0iLCJjb25mb3JtX251bSIsImVudl9udW0iLCJzYWxhcnlfbnVtIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJ0b2FzdCIsImlkIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJHZXQiLCJ0aGVuIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInRhZ19zdHIiLCJzcGxpdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixXQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLE8sR0FBVSx1QixRQUVWQyxNLEdBQVMsRSxRQUVUQyxVLEdBQWE7QUFDVDtBQURTLFMs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cm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a+55q2k5qyh6Z2i6K+V6L+b6KGM6K+E5Lu3JyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICB1c2VySWQgPSAnJ1xyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHR5cGU6ICcxJyxcclxuICAgICAgICB0YWdBcnI6IFtdLFxyXG4gICAgICAgIHRlbXBUYWc6ICcnLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgJ2lkJzogJycsXHJcbiAgICAgICAgICAgICdpbnRlcnZpZXdlcl9udW0nOiAwLFxyXG4gICAgICAgICAgICAnY29uZm9ybV9udW0nOiAwLFxyXG4gICAgICAgICAgICAnZW52X251bSc6IDAsXHJcbiAgICAgICAgICAgICdzYWxhcnlfbnVtJzogMCxcclxuICAgICAgICAgICAgJ3RhZ19zdHInOiAnJyxcclxuICAgICAgICAgICAgJ2NvbnRlbnQnOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRUYWcgKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICAgICAgdGhpcy50ZW1wVGFnID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50ZW1wVGFnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RpY2tUYWcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWdBcnIubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBUYWcgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGFnQXJyLnB1c2godGhpcy50ZW1wVGFnKVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBUYWcgPSAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsVGFnIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0Fyci5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ29udGVudCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29udGVudCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21tZW50U3RhciAoZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaW50ZXJ2aWV3ZXJfbnVtID09IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludGVydmlld2VyX251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaW50ZXJ2aWV3ZXJfbnVtID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuY29uZm9ybV9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuY29uZm9ybV9udW0gPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmNvbmZvcm1fbnVtID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuZW52X251bSA9PSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5lbnZfbnVtID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmVudl9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5zYWxhcnlfbnVtID09IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNhbGFyeV9udW0gPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNhbGFyeV9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe3R5cGUsIGlkfSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICB0aGlzLnBhZ2UuaWQgPSBpZFxyXG4gICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgIT09IDEpIHtcclxuICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICBpZDogaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svZ2V0SW5mbycpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ3NhbGFyeV9udW0nIHx8IGtleSA9PSAnaW50ZXJ2aWV3ZXJfbnVtJyB8fCBrZXkgPT0gJ2Vudl9udW0nIHx8IGtleSA9PSAnY29uZm9ybV9udW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IE51bWJlci5wYXJzZUludChkYXRhW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdBcnIgPSB0aGlzLnBhZ2UudGFnX3N0ci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19