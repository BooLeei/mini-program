'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _formatTime = require('./../utils/formatTime.js');

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_wepy$page) {
    _inherits(Progress, _wepy$page);

    function Progress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Progress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Progress.__proto__ || Object.getPrototypeOf(Progress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '求职进度'
        }, _this.userId = '', _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.listIndex = 0, _this.request = new _request2.default(), _this.data = {
            progress: [],
            interview: {},
            modalToggle: false
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            stopPropagation: function stopPropagation() {
                return false;
            },
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            },
            showInvitation: function showInvitation(index) {
                var _this2 = this;

                this.listIndex = Number.parseInt(index);
                this.request.Get({
                    sendResumeId: this.progress[this.listIndex].sendResumeId
                }, '/SendResumeInviteList/getInfo').then(function (_ref2) {
                    var data = _ref2.data;

                    data.time = (0, _formatTime.formatSecond)(Number.parseInt(data.time) * 1000, '.', ':');
                    _this2.interview = data;
                    _this2.modalToggle = true;
                    _this2.$apply();
                });
            },
            sureInvitation: function sureInvitation() {
                var _this3 = this;

                this.updateStatus(1).then(function (_ref3) {
                    var data = _ref3.data;

                    _this3.progress[_this3.listIndex].userStatus = 1;
                    _this3.modalToggle = false;
                    _this3.$apply();
                });
            },
            hideInvitation: function hideInvitation() {
                this.modalToggle = false;
            },
            commentInvitation: function commentInvitation(index) {
                var _this4 = this;

                this.listIndex = Number.parseInt(index);
                if (this.progress[this.listIndex].userStatus == 2) {
                    _wepy2.default.navigateTo({ url: 'comment?type=1' });
                } else {
                    this.updateStatus(2).then(function (_ref4) {
                        var data = _ref4.data;

                        _this4.progress[_this4.listIndex].userStatus = 2;
                        _this4.$apply();
                        _wepy2.default.navigateTo({ url: 'comment?type=1' });
                    }).catch(function (_ref5) {
                        var data = _ref5.data;

                        if (data.err == 1) {
                            _this4.toast({ content: '还未到面试时间，请面试后再评价' });
                        } else if (data.err == 2) {
                            _this4.toast({ content: '已超出时间期限' });
                        } else {
                            _this4.toast({ content: '系统繁忙，请稍后再试' });
                        }
                    });
                }
            },
            getComment: function getComment(id) {
                _wepy2.default.navigateTo({
                    url: 'comment?id=' + id + '&type=2'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Progress, [{
        key: 'getProgress',
        value: function getProgress() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/SendResume/getList');
        }
    }, {
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this5 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this5.$parent.global.curVal = Number.parseInt(_this5.$parent.global.curVal) + 1;
                _this5.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'updateStatus',
        value: function updateStatus(status) {
            return this.request.Post({
                sendResumeId: this.progress[this.listIndex].sendResumeId,
                userStatus: status
            }, '/SendResume/updateStatus');
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this6 = this;

            this.getProgress().then(function (_ref6) {
                var data = _ref6.data;

                _this6.progress = data;
                _wepy2.default.stopPullDownRefresh();
                _this6.$apply();
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this7 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.page.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getProgress(this.page.index).then(function (_ref7) {
                var data = _ref7.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this7.hasNot = true;
                }
                _this7.progress = [].concat(_toConsumableArray(_this7.progress), _toConsumableArray(data));
                _this7.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this8 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.getProgress().then(function (_ref8) {
                var data = _ref8.data;

                _this8.progress = data;
                _this8.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Progress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Progress , 'pages/progress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIlByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2VySWQiLCJwYWdlIiwiaW5kZXgiLCJidXN5IiwiaGFzTm90IiwibGlzdEluZGV4IiwicmVxdWVzdCIsImRhdGEiLCJwcm9ncmVzcyIsImludGVydmlldyIsIm1vZGFsVG9nZ2xlIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b0NvbXBhbnkiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzaG93SW52aXRhdGlvbiIsIk51bWJlciIsInBhcnNlSW50IiwiR2V0Iiwic2VuZFJlc3VtZUlkIiwidGhlbiIsInRpbWUiLCIkYXBwbHkiLCJzdXJlSW52aXRhdGlvbiIsInVwZGF0ZVN0YXR1cyIsInVzZXJTdGF0dXMiLCJoaWRlSW52aXRhdGlvbiIsImNvbW1lbnRJbnZpdGF0aW9uIiwiY2F0Y2giLCJlcnIiLCJ0b2FzdCIsImNvbnRlbnQiLCJnZXRDb21tZW50IiwicGFnZVNpemUiLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsInN0YXR1cyIsIlBvc3QiLCJnZXRQcm9ncmVzcyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJwYXJhbXMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBREo7QUFFSEMs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dGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCB7Zm9ybWF0U2Vjb25kfSBmcm9tICcuLi91dGlscy9mb3JtYXRUaW1lJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rGC6IGM6L+b5bqmJ1xyXG4gICAgfVxyXG5cclxuICAgIHVzZXJJZCA9ICcnXHJcblxyXG4gICAgcGFnZSA9IHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBoYXNOb3Q6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdEluZGV4ID0gMFxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICBnZXRQcm9ncmVzcyAocGFnZSA9IDEsIHBhZ2VTaXplID0gOCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSwgJy9TZW5kUmVzdW1lL2dldExpc3QnKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgcHJvZ3Jlc3M6IFtdLFxyXG4gICAgICAgIGludGVydmlldzoge30sXHJcbiAgICAgICAgbW9kYWxUb2dnbGU6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN0YXR1cyAoc3RhdHVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgc2VuZFJlc3VtZUlkOiB0aGlzLnByb2dyZXNzW3RoaXMubGlzdEluZGV4XS5zZW5kUmVzdW1lSWQsXHJcbiAgICAgICAgICAgIHVzZXJTdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgIH0sICcvU2VuZFJlc3VtZS91cGRhdGVTdGF0dXMnKVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NvbXBhbnkgKGlkKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBjb21wYW55P2lkPSR7aWR9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0ludml0YXRpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdEluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHNlbmRSZXN1bWVJZDogdGhpcy5wcm9ncmVzc1t0aGlzLmxpc3RJbmRleF0uc2VuZFJlc3VtZUlkXHJcbiAgICAgICAgICAgIH0sICcvU2VuZFJlc3VtZUludml0ZUxpc3QvZ2V0SW5mbycpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGRhdGEudGltZSA9IGZvcm1hdFNlY29uZChOdW1iZXIucGFyc2VJbnQoZGF0YS50aW1lKSAqIDEwMDAsICcuJywgJzonKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZpZXcgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsVG9nZ2xlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZUludml0YXRpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygxKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzW3RoaXMubGlzdEluZGV4XS51c2VyU3RhdHVzID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbFRvZ2dsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlSW52aXRhdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kYWxUb2dnbGUgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWVudEludml0YXRpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdEluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1t0aGlzLmxpc3RJbmRleF0udXNlclN0YXR1cyA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogYGNvbW1lbnQ/dHlwZT0xYH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygyKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnVzZXJTdGF0dXMgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgY29tbWVudD90eXBlPTFgfSlcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnIgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6L+Y5pyq5Yiw6Z2i6K+V5pe26Ze077yM6K+36Z2i6K+V5ZCO5YaN6K+E5Lu3J30pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmVyciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LotoXlh7rml7bpl7TmnJ/pmZAnfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn57O757uf57mB5b+Z77yM6K+356iN5ZCO5YaN6K+VJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q29tbWVudCAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbW1lbnQ/aWQ9JHtpZH0mdHlwZT0yYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmVzcygpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzTm90KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXgrK1xyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3Jlc3ModGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBbLi4udGhpcy5wcm9ncmVzcywgLi4uZGF0YV1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIHRoaXMudXNlcklkID0gcGFyYW1zLmlkXHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmVzcygpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19