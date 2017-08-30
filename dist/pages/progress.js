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
                this.$parent.global.commentUpdate = false;
                this.$parent.global.commentIndex = -1;
                if (this.progress[this.listIndex].userStatus == 2) {
                    _wepy2.default.navigateTo({ url: 'comment?type=1&index=' + index + '&id=' + this.progress[this.listIndex].sendResumeId });
                } else {
                    this.updateStatus(2).then(function (_ref4) {
                        var data = _ref4.data;

                        _this4.progress[_this4.listIndex].userStatus = 2;
                        _this4.$apply();
                        _wepy2.default.navigateTo({ url: 'comment?type=1&index=' + index + '&id=' + _this4.progress[_this4.listIndex].sendResumeId });
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
        key: 'onShow',
        value: function onShow() {
            var _this8 = this;

            this.getProgress().then(function (_ref8) {
                var data = _ref8.data;

                _this8.progress = data;
                _this8.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this9 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.getProgress().then(function (_ref9) {
                var data = _ref9.data;

                _this9.progress = data;
                _this9.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Progress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Progress , 'pages/progress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIlByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2VySWQiLCJwYWdlIiwiaW5kZXgiLCJidXN5IiwiaGFzTm90IiwibGlzdEluZGV4IiwicmVxdWVzdCIsImRhdGEiLCJwcm9ncmVzcyIsImludGVydmlldyIsIm1vZGFsVG9nZ2xlIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b0NvbXBhbnkiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzaG93SW52aXRhdGlvbiIsIk51bWJlciIsInBhcnNlSW50IiwiR2V0Iiwic2VuZFJlc3VtZUlkIiwidGhlbiIsInRpbWUiLCIkYXBwbHkiLCJzdXJlSW52aXRhdGlvbiIsInVwZGF0ZVN0YXR1cyIsInVzZXJTdGF0dXMiLCJoaWRlSW52aXRhdGlvbiIsImNvbW1lbnRJbnZpdGF0aW9uIiwiJHBhcmVudCIsImdsb2JhbCIsImNvbW1lbnRVcGRhdGUiLCJjb21tZW50SW5kZXgiLCJjYXRjaCIsImVyciIsInRvYXN0IiwiY29udGVudCIsImdldENvbW1lbnQiLCJwYWdlU2l6ZSIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCJjdXJWYWwiLCJzdGF0dXMiLCJQb3N0IiwiZ2V0UHJvZ3Jlc3MiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyYW1zIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJoaWRlTG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE0sR0FBUyxFLFFBRVRD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OztBQUNkLHVCQUFLQyxRQUFMLEdBQWdCRCxJQUFoQjtBQUNBLHVCQUFLa0IsTUFBTDtBQUNILGFBSkQ7QUFLSDs7OytCQUVPMEIsTSxFQUFRO0FBQUE7O0FBQ1osMkJBQUtDLFdBQUwsQ0FBaUIsRUFBQ0MsT0FBTyxRQUFSLEVBQWtCQyxNQUFNLElBQXhCLEVBQWpCO0FBQ0EsaUJBQUt0RCxNQUFMLEdBQWNtRCxPQUFPcEMsRUFBckI7QUFDQSxpQkFBSytCLFdBQUwsR0FDQ3ZCLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWaEIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLQyxRQUFMLEdBQWdCRCxJQUFoQjtBQUNBLHVCQUFLa0IsTUFBTDtBQUNBLCtCQUFLOEIsV0FBTDtBQUNILGFBTEQ7QUFNSDs7OztFQWhLaUMsZUFBS3RELEk7O2tCQUF0QkwsUSIsImZpbGUiOiJwcm9ncmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IHtmb3JtYXRTZWNvbmR9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmsYLogYzov5vluqYnXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBsaXN0SW5kZXggPSAwXHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuICAgIGdldFByb2dyZXNzIChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL1NlbmRSZXN1bWUvZ2V0TGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwcm9ncmVzczogW10sXHJcbiAgICAgICAgaW50ZXJ2aWV3OiB7fSxcclxuICAgICAgICBtb2RhbFRvZ2dsZTogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3RhdHVzIChzdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICBzZW5kUmVzdW1lSWQ6IHRoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnNlbmRSZXN1bWVJZCxcclxuICAgICAgICAgICAgdXNlclN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgfSwgJy9TZW5kUmVzdW1lL3VwZGF0ZVN0YXR1cycpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzdG9wUHJvcGFnYXRpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ29tcGFueSAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbXBhbnk/aWQ9JHtpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93SW52aXRhdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0SW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3VtZUlkOiB0aGlzLnByb2dyZXNzW3RoaXMubGlzdEluZGV4XS5zZW5kUmVzdW1lSWRcclxuICAgICAgICAgICAgfSwgJy9TZW5kUmVzdW1lSW52aXRlTGlzdC9nZXRJbmZvJylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS50aW1lID0gZm9ybWF0U2Vjb25kKE51bWJlci5wYXJzZUludChkYXRhLnRpbWUpICogMTAwMCwgJy4nLCAnOicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmlldyA9IGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxUb2dnbGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlSW52aXRhdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKDEpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnVzZXJTdGF0dXMgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsVG9nZ2xlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVJbnZpdGF0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbFRvZ2dsZSA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21tZW50SW52aXRhdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0SW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY29tbWVudFVwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY29tbWVudEluZGV4ID0gLTFcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnVzZXJTdGF0dXMgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBjb21tZW50P3R5cGU9MSZpbmRleD0ke2luZGV4fSZpZD0ke3RoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnNlbmRSZXN1bWVJZH1gfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKDIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1t0aGlzLmxpc3RJbmRleF0udXNlclN0YXR1cyA9IDJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBjb21tZW50P3R5cGU9MSZpbmRleD0ke2luZGV4fSZpZD0ke3RoaXMucHJvZ3Jlc3NbdGhpcy5saXN0SW5kZXhdLnNlbmRSZXN1bWVJZH1gfSlcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnIgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6L+Y5pyq5Yiw6Z2i6K+V5pe26Ze077yM6K+36Z2i6K+V5ZCO5YaN6K+E5Lu3J30pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmVyciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LotoXlh7rml7bpl7TmnJ/pmZAnfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn57O757uf57mB5b+Z77yM6K+356iN5ZCO5YaN6K+VJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q29tbWVudCAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbW1lbnQ/aWQ9JHtpZH0mdHlwZT0yYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmVzcygpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzTm90KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXgrK1xyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3Jlc3ModGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBbLi4udGhpcy5wcm9ncmVzcywgLi4uZGF0YV1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB0aGlzLmdldFByb2dyZXNzKClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3Jlc3MoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==