'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
        }, _this.request = new _request2.default(), _this.userId = '', _this.data = {
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
        key: 'onLoad',
        value: function onLoad(_ref2) {
            var _this2 = this;

            var type = _ref2.type,
                id = _ref2.id;

            this.type = type;
            this.page.id = id;
            if (Number.parseInt(type) !== 1) {
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

                    _this2.page = data;
                    _this2.tagArr = _this2.page.tag_str.split(',');
                    _this2.$apply();
                });
            }
        }
    }]);

    return Comment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Comment , 'pages/comment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJ1c2VySWQiLCJkYXRhIiwidHlwZSIsInRhZ0FyciIsInRlbXBUYWciLCJwYWdlIiwibWV0aG9kcyIsImJpbmRUYWciLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwic3RpY2tUYWciLCJsZW5ndGgiLCJwdXNoIiwiZGVsVGFnIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ29udGVudCIsImNvbnRlbnQiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJjb21tZW50U3RhciIsInRhcmdldCIsImRhdGFzZXQiLCJ1bmRlZmluZWQiLCJOdW1iZXIiLCJwYXJzZUludCIsImludGVydmlld2VyX251bSIsImNvbmZvcm1fbnVtIiwiZW52X251bSIsInNhbGFyeV9udW0iLCJpZCIsIkdldCIsInRoZW4iLCJPYmplY3QiLCJrZXlzIiwia2V5IiwidGFnX3N0ciIsInNwbGl0IiwiJGFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsV0FGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxPLEdBQVUsdUIsUUFFVkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLGtCQUFNLEdBREg7QUFFSEMsb0JBQVEsRUFGTDtBQUdIQyxxQkFBUyxFQUhOO0FBSUhDLGtCQUFNO0FBQ0Ysc0JBQU0sRUFESjtBQUVGLG1DQUFtQixDQUZqQjtBQUdGLCtCQUFlLENBSGI7QUFJRiwyQkFBVyxDQUpUO0FBS0YsOEJBQWMs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T0MsUUFBUCxDQUFnQjNCLEtBQUtxQyxHQUFMLENBQWhCLENBQVo7QUFDSDtBQUNKO0FBTGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNZCwyQkFBS2pDLElBQUwsR0FBWUosSUFBWjtBQUNBLDJCQUFLRSxNQUFMLEdBQWMsT0FBS0UsSUFBTCxDQUFVa0MsT0FBVixDQUFrQkMsS0FBbEIsQ0FBd0IsR0FBeEIsQ0FBZDtBQUNBLDJCQUFLQyxNQUFMO0FBQ0gsaUJBWkQ7QUFhSDtBQUNKOzs7O0VBL0dnQyxlQUFLcEMsSTs7a0JBQXJCWixPIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a+55q2k5qyh6Z2i6K+V6L+b6KGM6K+E5Lu3JyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICB1c2VySWQgPSAnJ1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdHlwZTogJzEnLFxyXG4gICAgICAgIHRhZ0FycjogW10sXHJcbiAgICAgICAgdGVtcFRhZzogJycsXHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICAnaWQnOiAnJyxcclxuICAgICAgICAgICAgJ2ludGVydmlld2VyX251bSc6IDAsXHJcbiAgICAgICAgICAgICdjb25mb3JtX251bSc6IDAsXHJcbiAgICAgICAgICAgICdlbnZfbnVtJzogMCxcclxuICAgICAgICAgICAgJ3NhbGFyeV9udW0nOiAwLFxyXG4gICAgICAgICAgICAndGFnX3N0cic6ICcnLFxyXG4gICAgICAgICAgICAnY29udGVudCc6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZFRhZyAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBUYWcgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRlbXBUYWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGlja1RhZyAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhZ0Fyci5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcFRhZyA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50YWdBcnIucHVzaCh0aGlzLnRlbXBUYWcpXHJcbiAgICAgICAgICAgIHRoaXMudGVtcFRhZyA9ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxUYWcgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnQXJyLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDb250ZW50IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jb250ZW50ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1lbnRTdGFyIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pbnRlcnZpZXdlcl9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaW50ZXJ2aWV3ZXJfbnVtID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnRlcnZpZXdlcl9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5jb25mb3JtX251bSA9PSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5jb25mb3JtX251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuY29uZm9ybV9udW0gPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5lbnZfbnVtID09IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmVudl9udW0gPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuZW52X251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLnNhbGFyeV9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7dHlwZSwgaWR9KSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgICAgIHRoaXMucGFnZS5pZCA9IGlkXHJcbiAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmtGZWVkYmFjay9nZXRJbmZvJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnc2FsYXJ5X251bScgfHwga2V5ID09ICdpbnRlcnZpZXdlcl9udW0nIHx8IGtleSA9PSAnZW52X251bScgfHwga2V5ID09ICdjb25mb3JtX251bScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gTnVtYmVyLnBhcnNlSW50KGRhdGFba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ0FyciA9IHRoaXMucGFnZS50YWdfc3RyLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19