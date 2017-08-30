'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _formatTime = require('./../utils/formatTime.js');

var _storage = require('./../utils/storage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllComment = function (_wepy$page) {
    _inherits(AllComment, _wepy$page);

    function AllComment() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllComment);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllComment.__proto__ || Object.getPrototypeOf(AllComment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '全部评价',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.customer = {
            userId: '',
            workId: '',
            hasLogin: false
        }, _this.data = {
            page: []
        }, _this.methods = {
            commentLike: function commentLike(index, id) {
                var _this2 = this;

                if (this.customer.hasLogin) {
                    this.request.Post({
                        userId: this.customer.userId,
                        inviteWorkFeedbackId: id,
                        status: this.page[index].hasLike == 1 ? '0' : '1'
                    }, '/InviteWorkFeedback/like').then(function () {
                        if (_this2.page[index].hasLike == 1) {
                            _this2.page[index].hasLike = 0;
                            _this2.page[index].commentSlide = _this2.page[index].commentSlide - 1;
                        } else {
                            _this2.page[index].hasLike = 1;
                            _this2.page[index].commentSlide = _this2.page[index].commentSlide + 1;
                        }
                        _this2.$apply();
                    });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllComment, [{
        key: 'onLoad',
        value: function onLoad(params) {
            var _this3 = this;

            console.log(params);
            this.customer.workId = params.workId;
            this.customer.userId = params.userId || 0;
            (0, _storage.Get)('userId').then(function (res) {
                _this3.customer.userId = res;
                _this3.customer.hasLogin = true;
            }).catch(function () {
                _this3.customer.hasLogin = false;
            });
            this.request.Get({
                inviteWorkId: this.customer.workId,
                userId: this.customer.userId
            }, '/inviteWorkFeedback/getListByInviteWorkId').then(function (_ref2) {
                var data = _ref2.data;

                console.log(data);
                data.forEach(function (item) {
                    if (item.tag_str.length != 0) {
                        item.tagArr = item.tag_str.split(',');
                    } else {
                        item.tagArr = [];
                    }
                    item.interviewer_num = Number.parseInt(item.interviewer_num);
                    item.env_num = Number.parseInt(item.env_num);
                    item.conform_num = Number.parseInt(item.conform_num);
                    item.salary_num = Number.parseInt(item.salary_num);
                    item.like_num = Number.parseInt(item.like_num);
                    item.create_time = (0, _formatTime.formatTime)(Number.parseInt(item.create_time) * 1000, 2);
                    item.commentSlide = 1;
                });
                _this3.page = data;
                _this3.$apply();
            }).catch(function (err) {
                console.log(err);
            });
        }
    }]);

    return AllComment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllComment , 'pages/allComment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbENvbW1lbnQuanMiXSwibmFtZXMiOlsiQWxsQ29tbWVudCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJjdXN0b21lciIsInVzZXJJZCIsIndvcmtJZCIsImhhc0xvZ2luIiwiZGF0YSIsInBhZ2UiLCJtZXRob2RzIiwiY29tbWVudExpa2UiLCJpbmRleCIsImlkIiwiUG9zdCIsImludml0ZVdvcmtGZWVkYmFja0lkIiwic3RhdHVzIiwiaGFzTGlrZSIsInRoZW4iLCJjb21tZW50U2xpZGUiLCIkYXBwbHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGFyYW1zIiwiY29uc29sZSIsImxvZyIsInJlcyIsImNhdGNoIiwiR2V0IiwiaW52aXRlV29ya0lkIiwiZm9yRWFjaCIsIml0ZW0iLCJ0YWdfc3RyIiwibGVuZ3RoIiwidGFnQXJyIiwic3BsaXQiLCJpbnRlcnZpZXdlcl9udW0iLCJOdW1iZXIiLCJwYXJzZUludCIsImVudl9udW0iLCJjb25mb3JtX251bSIsInNhbGFyeV9udW0iLCJsaWtlX251bSIsImNyZWF0ZV90aW1lIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsTUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxPLEdBQVUsdUIsUUFFVkMsUSxHQUFXO0FBQ1BDLG9CQUFRLEVBREQ7QUFFUEMsb0JBQVEsRUFGRDtBQUdQQyxzQkFBVTtBQUhILFMsUUFNWEMsSSxHQUFPO0FBQ0hDLGtCQUFNO0FBREgsUyxRQUlQQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ09DLEtBRFAs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LEdBQWdCTCxPQUFPQyxRQUFQLENBQWdCUCxLQUFLVyxRQUFyQixDQUFoQjtBQUNBWCx5QkFBS1ksV0FBTCxHQUFtQiw0QkFBV04sT0FBT0MsUUFBUCxDQUFnQlAsS0FBS1ksV0FBckIsSUFBb0MsSUFBL0MsRUFBcUQsQ0FBckQsQ0FBbkI7QUFDQVoseUJBQUtaLFlBQUwsR0FBb0IsQ0FBcEI7QUFDSCxpQkFiRDtBQWNBLHVCQUFLVixJQUFMLEdBQVlELElBQVo7QUFDQSx1QkFBS1ksTUFBTDtBQUNILGFBdEJELEVBdUJDTyxLQXZCRCxDQXVCTyxlQUFPO0FBQ1ZILHdCQUFRQyxHQUFSLENBQVltQixHQUFaO0FBQ0gsYUF6QkQ7QUEwQkg7Ozs7RUFoRm1DLGVBQUtuQyxJOztrQkFBeEJaLFUiLCJmaWxlIjoiYWxsQ29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2Zvcm1hdFRpbWV9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCB7R2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsQ29tbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhajpg6jor4Tku7cnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGN1c3RvbWVyID0ge1xyXG4gICAgICAgIHVzZXJJZDogJycsXHJcbiAgICAgICAgd29ya0lkOiAnJyxcclxuICAgICAgICBoYXNMb2dpbjogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHBhZ2U6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjb21tZW50TGlrZSAoaW5kZXgsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbWVyLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmN1c3RvbWVyLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrRmVlZGJhY2tJZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnBhZ2VbaW5kZXhdLmhhc0xpa2UgPT0gMSA/ICcwJyA6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svbGlrZScpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZVtpbmRleF0uaGFzTGlrZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVtpbmRleF0uaGFzTGlrZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlW2luZGV4XS5jb21tZW50U2xpZGUgPSB0aGlzLnBhZ2VbaW5kZXhdLmNvbW1lbnRTbGlkZSAtIDFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VbaW5kZXhdLmhhc0xpa2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVtpbmRleF0uY29tbWVudFNsaWRlID0gdGhpcy5wYWdlW2luZGV4XS5jb21tZW50U2xpZGUgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpXHJcbiAgICAgICAgdGhpcy5jdXN0b21lci53b3JrSWQgPSBwYXJhbXMud29ya0lkXHJcbiAgICAgICAgdGhpcy5jdXN0b21lci51c2VySWQgPSBwYXJhbXMudXNlcklkIHx8IDBcclxuICAgICAgICBHZXQoJ3VzZXJJZCcpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lci51c2VySWQgPSByZXNcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lci5oYXNMb2dpbiA9IHRydWVcclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIuaGFzTG9naW4gPSBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIGludml0ZVdvcmtJZDogdGhpcy5jdXN0b21lci53b3JrSWQsXHJcbiAgICAgICAgICAgIHVzZXJJZDogdGhpcy5jdXN0b21lci51c2VySWRcclxuICAgICAgICB9LCAnL2ludml0ZVdvcmtGZWVkYmFjay9nZXRMaXN0QnlJbnZpdGVXb3JrSWQnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50YWdfc3RyLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50YWdBcnIgPSBpdGVtLnRhZ19zdHIuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnRhZ0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLmludGVydmlld2VyX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmludGVydmlld2VyX251bSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uZW52X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmVudl9udW0pXHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbmZvcm1fbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uY29uZm9ybV9udW0pXHJcbiAgICAgICAgICAgICAgICBpdGVtLnNhbGFyeV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5zYWxhcnlfbnVtKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5saWtlX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmxpa2VfbnVtKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5jcmVhdGVfdGltZSA9IGZvcm1hdFRpbWUoTnVtYmVyLnBhcnNlSW50KGl0ZW0uY3JlYXRlX3RpbWUpICogMTAwMCwgMilcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29tbWVudFNsaWRlID0gMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=