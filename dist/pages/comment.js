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
                this.tempTag = e.detail.value;
            },
            stickTag: function stickTag() {
                if (this.tagArr.length >= 3) {
                    return false;
                }
                if (this.tempTag == '') {
                    return false;
                }
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

            console.log(type);
            this.type = type;
            this.request.Get({
                id: 41
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
    }]);

    return Comment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Comment , 'pages/comment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJ1c2VySWQiLCJkYXRhIiwidHlwZSIsInRhZ0FyciIsInRlbXBUYWciLCJwYWdlIiwibWV0aG9kcyIsImJpbmRUYWciLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzdGlja1RhZyIsImxlbmd0aCIsImJpbmRDb250ZW50IiwiY29udGVudCIsImNhbmNlbCIsIm5hdmlnYXRlQmFjayIsImNvbW1lbnRTdGFyIiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwidW5kZWZpbmVkIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJpbnRlcnZpZXdlcl9udW0iLCJjb25mb3JtX251bSIsImVudl9udW0iLCJzYWxhcnlfbnVtIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiR2V0IiwidGhlbiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJ0YWdfc3RyIiwic3BsaXQiLCIkYXBwbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixXQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLE8sR0FBVSx1QixRQUVWQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDSEMsa0JBQU0sR0FESDtBQUVIQyxvQkFBUSxFQUZMO0FBR0hDLHFCQUFTLEVBSE47QUFJSEMsa0JBQU07QUFDRixzQkFBTSxFQURKO0FBRUYsbUNBQW1CLENBRmpCO0FBR0YsK0JBQWUsQ0FIYjtBQUlGLDJCQUFXLENBSlQ7QUFLRiw4QkFBYyxDQUxaO0FBTUYsMkJBQVcsRUFOVDtBQU9G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bmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WvueatpOasoemdouivlei/m+ihjOivhOS7tycsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHR5cGU6ICcxJyxcclxuICAgICAgICB0YWdBcnI6IFtdLFxyXG4gICAgICAgIHRlbXBUYWc6ICcnLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgJ2lkJzogJycsXHJcbiAgICAgICAgICAgICdpbnRlcnZpZXdlcl9udW0nOiAwLFxyXG4gICAgICAgICAgICAnY29uZm9ybV9udW0nOiAwLFxyXG4gICAgICAgICAgICAnZW52X251bSc6IDAsXHJcbiAgICAgICAgICAgICdzYWxhcnlfbnVtJzogMCxcclxuICAgICAgICAgICAgJ3RhZ19zdHInOiAnJyxcclxuICAgICAgICAgICAgJ2NvbnRlbnQnOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRUYWcgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wVGFnID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0aWNrVGFnICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFnQXJyLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wVGFnID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZENvbnRlbnQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FuY2VsICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWVudFN0YXIgKGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmludGVydmlld2VyX251bSA9PSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnRlcnZpZXdlcl9udW0gPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludGVydmlld2VyX251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmNvbmZvcm1fbnVtID09IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmNvbmZvcm1fbnVtID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5jb25mb3JtX251bSA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmVudl9udW0gPT0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuZW52X251bSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5lbnZfbnVtID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2Uuc2FsYXJ5X251bSA9PSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlfbnVtID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlfbnVtID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHt0eXBlLCBpZH0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0eXBlKVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgaWQ6IDQxXHJcbiAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svZ2V0SW5mbycpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ3NhbGFyeV9udW0nIHx8IGtleSA9PSAnaW50ZXJ2aWV3ZXJfbnVtJyB8fCBrZXkgPT0gJ2Vudl9udW0nIHx8IGtleSA9PSAnY29uZm9ybV9udW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gTnVtYmVyLnBhcnNlSW50KGRhdGFba2V5XSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudGFnQXJyID0gdGhpcy5wYWdlLnRhZ19zdHIuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=