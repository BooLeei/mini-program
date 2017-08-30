'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _socket = require('./../utils/socket.js');

var _storage = require('./../utils/storage.js');

var _formatTime = require('./../utils/formatTime.js');

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_wepy$page) {
    _inherits(Chat, _wepy$page);

    function Chat() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Chat);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chat.__proto__ || Object.getPrototypeOf(Chat)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '聊天消息',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.userId = '', _this.type = 0, _this.data = {
            viewId: '',
            userImg: '',
            msg: {},
            cursorSpacing: 14,
            height: 0,
            sendMsg: '',
            chatList: [],
            keyboard: false,
            tapFocus: false,
            isIOS: false
        }, _this.components = {
            'toast': _toast2.default
        }, _this.pages = {
            index: 1,
            hasNot: false,
            busy: false
        }, _this.methods = {
            toCompany: function toCompany() {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + this.msg.chatUserId
                });
            },
            bindSendMsg: function bindSendMsg(e) {
                this.sendMsg = e.detail.value;
            },
            bindAnchor: function bindAnchor(e) {
                var _this2 = this;

                this.viewId = '';
                if (e.detail.deltaY > 0) {
                    this.keyboard = true;
                    setTimeout(function () {
                        _this2.keyboard = false;
                        _this2.$apply();
                    });
                }
            },
            scrollBottom: function scrollBottom() {
                this.viewId = 'anchor';
            },
            loadNote: function loadNote() {
                var _this3 = this;

                if (this.pages.hasNot) {
                    return false;
                }
                if (this.pages.busy) {
                    return false;
                }
                this.pages.busy = true;
                this.pages.index++;
                this.getChatList(this.pages.index++).then(function (_ref2) {
                    var data = _ref2.data;

                    _this3.chatList = [].concat(_toConsumableArray(data.reverse()), _toConsumableArray(_this3.chatList));
                    (0, _log.log)(_this3.chatList);
                    _this3.$apply();
                });
            },
            sendMsgBtn: function sendMsgBtn() {
                var _this4 = this;

                if (this.sendMsg == '') {
                    return false;
                }
                this.viewId = '';
                (0, _socket.Send)({
                    content: this.sendMsg,
                    userId: this.userId,
                    chatId: this.msg.chatUserId,
                    groupId: this.msg._id
                }).then(function (ret) {
                    _this4.$parent.global.curVal = Number.parseInt(_this4.$parent.global.curVal) + 1;
                    var temp = {
                        c_t: new Date().getTime(),
                        f: _this4.userId,
                        t: _this4.msg.chatUserId,
                        _id: _this4.msg._id,
                        c: _this4.sendMsg,
                        time: (0, _formatTime.formatTime)(new Date().getTime()),
                        nr: 0
                    };
                    _this4.chatList.push(temp);
                    _this4.sendMsg = '';
                    _this4.$apply();
                    setTimeout(function () {
                        _this4.viewId = 'anchor';
                        _this4.$apply();
                    });
                    if (_this4.type == 1) {
                        _this4.$parent.global.chatUpdate = true;
                        if (_this4.$parent.global.chat.some(function (items) {
                            return items._id == temp._id;
                        })) {
                            _this4.$parent.global.chat.forEach(function (item) {
                                if (item._id = temp._id) {
                                    Object.assign(item, temp);
                                }
                            });
                        } else {
                            _this4.$parent.global.chat.push(Object.assign({}, temp));
                        }
                    }
                }).catch(function (err) {});
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Chat, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'getChatList',
        value: function getChatList() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;

            return this.request.Get({
                groupId: this.msg._id,
                page: 1,
                pageSize: 15,
                userId: this.userId
            }, '/Chat/getListByGroupId');
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this5 = this;

            _wepy2.default.onSocketMessage(function (_ref3) {
                var data = _ref3.data;

                _this5.$parent.global.curVal = Number.parseInt(_this5.$parent.global.curVal) + 1;

                var _JSON$parse = JSON.parse(data),
                    ret = _JSON$parse.data;

                ret.nr = 1;
                ret._id = ret.f < ret.t ? ret.f + '' + ret.t : ret.f + '' + ret.t;
                ret.c_t = ret.c_t * 1000;
                ret.time = (0, _formatTime.formatTime)(ret.c_t);
                if (_this5.type == 1) {
                    _this5.$parent.global.chatUpdate = true;
                }
                if (ret.f == _this5.msg.chatUserId) {
                    _this5.viewId = '';
                    _this5.chatList.push(ret);
                    ret.nr = 0;
                    setTimeout(function () {
                        _this5.viewId = 'anchor';
                        _this5.$apply();
                    });
                    if (_this5.$parent.global.chat.some(function (items) {
                        return items._id == ret._id;
                    })) {
                        _this5.$parent.global.chat.forEach(function (item) {
                            if (item._id == ret._id) {
                                item.c_t = ret.c_t;
                                item.time = ret.time;
                                item.c = ret.c;
                            }
                        });
                    } else {
                        _this5.$parent.global.chat.push(ret);
                    }
                    _this5.$apply();
                } else {
                    if (_this5.$parent.global.chat.some(function (item) {
                        return item._id == ret._id;
                    })) {
                        _this5.$parent.global.chat.forEach(function (item) {
                            if (item._id == ret._id) {
                                item.c_t = ret.c_t;
                                item.time = ret.time;
                                item.c = ret.c;
                                item.nr = Number.parseInt(item.nr) + 1;
                            }
                        });
                    } else {
                        _this5.$parent.global.chat.push(ret);
                    }
                }
            });
        }
    }, {
        key: 'getSystemInfo',
        value: function getSystemInfo() {
            return new Promise(function (resolve, reject) {
                _wepy2.default.getSystemInfo({
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(err) {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(_ref4) {
            var _this6 = this;

            var type = _ref4.type,
                userId = _ref4.userId,
                msg = _ref4.msg;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            msg = JSON.parse(msg);
            this.userId = userId;
            this.type = type;
            Object.assign(this.msg, msg);
            _wepy2.default.setNavigationBarTitle({ title: msg.chatUserName });
            Promise.all([this.getSystemInfo(), (0, _storage.Get)('userImg'), this.getChatList()]).then(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 3),
                    res = _ref6[0],
                    img = _ref6[1],
                    data = _ref6[2].data;

                console.log(res);
                if (res.system.indexOf('iOS') !== -1) {
                    _this6.cursorSpacing = 14;
                    _this6.isIOS = true;
                } else {
                    _this6.cursorSpacing = 18;
                    _this6.isIOS = false;
                }
                _this6.height = res.windowHeight;
                _this6.userImg = img;
                _this6.chatList = data.reverse();
                _this6.viewId = 'anchor';
                _this6.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Chat;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chat , 'pages/chat'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiQ2hhdCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJ1c2VySWQiLCJ0eXBlIiwiZGF0YSIsInZpZXdJZCIsInVzZXJJbWciLCJtc2ciLCJjdXJzb3JTcGFjaW5nIiwiaGVpZ2h0Iiwic2VuZE1zZyIsImNoYXRMaXN0Iiwia2V5Ym9hcmQiLCJ0YXBGb2N1cyIsImlzSU9TIiwiY29tcG9uZW50cyIsInBhZ2VzIiwiaW5kZXgiLCJoYXNOb3QiLCJidXN5IiwibWV0aG9kcyIsInRvQ29tcGFueSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaGF0VXNlcklkIiwiYmluZFNlbmRNc2ciLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJiaW5kQW5jaG9yIiwiZGVsdGFZIiwic2V0VGltZW91dCIsIiRhcHBseSIsInNjcm9sbEJvdHRvbSIsImxvYWROb3RlIiwiZ2V0Q2hhdExpc3QiLCJ0aGVuIiwicmV2ZXJzZSIsInNlbmRNc2dCdG4iLCJjb250ZW50IiwiY2hhdElkIiwiZ3JvdXBJZCIsIl9pZCIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRlbXAiLCJjX3QiLCJEYXRlIiwiZ2V0VGltZSIsImYiLCJ0IiwiYyIsInRpbWUiLCJuciIsInB1c2giLCJjaGF0VXBkYXRlIiwiY2hhdCIsInNvbWUiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiT2JqZWN0IiwiYXNzaWduIiwiY2F0Y2giLCIkaW52b2tlIiwicGFnZSIsInBhZ2VTaXplIiwiR2V0Iiwib25Tb2NrZXRNZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwicmV0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJlcnIiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImNoYXRVc2VyTmFtZSIsImFsbCIsImltZyIsImNvbnNvbGUiLCJsb2ciLCJzeXN0ZW0iLCJpbmRleE9mIiwid2luZG93SGVpZ2h0IiwiaGlkZUxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixNQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLE8sR0FBVSx1QixRQUNWQyxNLEdBQVMsRSxRQUNUQyxJLEdBQU8sQyxRQUlQQyxJLEdBQU87QUFDSEMsb0JBQVEsRUFETDtBQUVIQyxxQkFBUyxFQUZOO0FBR0hDLGlCQUFLLEVBSEY7QUFJSEMsMkJBQWUsRUFKWjtBQUtIQyxvQkFBUSxDQUxMO0FBTUhDLHFCQUFTLEVBTk47QUFPSEMsc0JBQVUsRUFQUDtBQVFIQyxzQkFBVSxLQVJQO0FBU0hDLHNCQUFVLEtBVFA7QUFVSEMsbUJBQU87QUFWSixTLFFBYVBDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQUliQyxLLEdBQVE7QUFDSkMsbUJBQU8sQ0FESDtBQUVKQyxvQkFBUSxLQUZKO0FBR0pDLGtCQUFNO0FBSEYsUyxRQWVSQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ087QUFDVCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSyxnQkFBZ0IsS0FBS2hCLEdBQUwsQ0FBU2lCO0FBRGxCLGlCQUFoQjtBQUdILGFBTEs7QUFNTkMsdUJBTk0sdUJBTU9DLENBTlAsRUFNVTtBQUNaLHFCQUFLaEIsT0FBTCxHQUFlZ0IsRUFBRUMsTUFBRixDQUFTQyxLQUF4QjtBQUNILGFBUks7QUFTTkMsc0JBVE0sc0JBU01ILENBVE4sRUFTUztBQUFBOztBQUNY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Q0gsaUJBSEQsTUFHTztBQUNILDJCQUFLTixhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsMkJBQUtNLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFDRCx1QkFBS0wsTUFBTCxHQUFjdUUsSUFBSWMsWUFBbEI7QUFDQSx1QkFBS3hGLE9BQUwsR0FBZW1GLEdBQWY7QUFDQSx1QkFBSzlFLFFBQUwsR0FBZ0JQLEtBQUtpQyxPQUFMLEVBQWhCO0FBQ0EsdUJBQUtoQyxNQUFMLEdBQWMsUUFBZDtBQUNBLHVCQUFLMkIsTUFBTDtBQUNBLCtCQUFLK0QsV0FBTDtBQUNILGFBbkJEO0FBb0JIOzs7O0VBek42QixlQUFLM0IsSTs7a0JBQWxCekUsSSIsImZpbGUiOiJjaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgeyBTZW5kIH0gZnJvbSAnLi4vdXRpbHMvc29ja2V0J1xyXG5pbXBvcnQgeyBHZXQgfSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQge2Zvcm1hdFRpbWV9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBiuWkqea2iOaBrycsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICB1c2VySWQgPSAnJ1xyXG4gICAgdHlwZSA9IDBcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHZpZXdJZDogJycsXHJcbiAgICAgICAgdXNlckltZzogJycsXHJcbiAgICAgICAgbXNnOiB7fSxcclxuICAgICAgICBjdXJzb3JTcGFjaW5nOiAxNCxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgc2VuZE1zZzogJycsXHJcbiAgICAgICAgY2hhdExpc3Q6IFtdLFxyXG4gICAgICAgIGtleWJvYXJkOiBmYWxzZSxcclxuICAgICAgICB0YXBGb2N1czogZmFsc2UsXHJcbiAgICAgICAgaXNJT1M6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHBhZ2VzID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2UsXHJcbiAgICAgICAgYnVzeTogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGF0TGlzdCAocGFnZSA9IDEsIHBhZ2VTaXplID0gMTUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIGdyb3VwSWQ6IHRoaXMubXNnLl9pZCxcclxuICAgICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IDE1LFxyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkXHJcbiAgICAgICAgfSwgJy9DaGF0L2dldExpc3RCeUdyb3VwSWQnKVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9Db21wYW55ICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2NvbXBhbnk/aWQ9JyArIHRoaXMubXNnLmNoYXRVc2VySWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTZW5kTXNnIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE1zZyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQW5jaG9yIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0lkID0gJydcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmRlbHRhWSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY3JvbGxCb3R0b20gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdJZCA9ICdhbmNob3InXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkTm90ZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VzLmhhc05vdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZXMuYnVzeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlcy5idXN5ID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzLmluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5nZXRDaGF0TGlzdCh0aGlzLnBhZ2VzLmluZGV4KyspXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdExpc3QgPSBbLi4uZGF0YS5yZXZlcnNlKCksIC4uLnRoaXMuY2hhdExpc3RdXHJcbiAgICAgICAgICAgICAgICBsb2codGhpcy5jaGF0TGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbmRNc2dCdG4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kTXNnID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZpZXdJZCA9ICcnXHJcbiAgICAgICAgICAgIFNlbmQoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5zZW5kTXNnLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGNoYXRJZDogdGhpcy5tc2cuY2hhdFVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6IHRoaXMubXNnLl9pZFxyXG4gICAgICAgICAgICB9KS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjX3Q6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGY6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHQ6IHRoaXMubXNnLmNoYXRVc2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB0aGlzLm1zZy5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYzogdGhpcy5zZW5kTXNnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IGZvcm1hdFRpbWUobmV3IERhdGUoKS5nZXRUaW1lKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5yOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXRMaXN0LnB1c2godGVtcClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1zZyA9ICcnXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdJZCA9ICdhbmNob3InXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdFVwZGF0ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0LnNvbWUoKGl0ZW1zKSA9PiBpdGVtcy5faWQgPT0gdGVtcC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5faWQgPSB0ZW1wLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwgdGVtcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQucHVzaChPYmplY3QuYXNzaWduKHt9LCB0ZW1wKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UoKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIGxldCB7ZGF0YTogcmV0fSA9IEpTT04ucGFyc2UoZGF0YSlcclxuICAgICAgICAgICAgcmV0Lm5yID0gMVxyXG4gICAgICAgICAgICByZXQuX2lkID0gcmV0LmYgPCByZXQudCA/IHJldC5mICsgJycgKyByZXQudCA6IHJldC5mICsgJycgKyByZXQudFxyXG4gICAgICAgICAgICByZXQuY190ID0gcmV0LmNfdCAqIDEwMDBcclxuICAgICAgICAgICAgcmV0LnRpbWUgPSBmb3JtYXRUaW1lKHJldC5jX3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXQuZiA9PSB0aGlzLm1zZy5jaGF0VXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdJZCA9ICcnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXRMaXN0LnB1c2gocmV0KVxyXG4gICAgICAgICAgICAgICAgcmV0Lm5yID0gMFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3SWQgPSAnYW5jaG9yJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0LnNvbWUoKGl0ZW1zKSA9PiBpdGVtcy5faWQgPT0gcmV0Ll9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jX3QgPSByZXQuY190XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSByZXQudGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jID0gcmV0LmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdC5wdXNoKHJldClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuc29tZSgoaXRlbSkgPT4gaXRlbS5faWQgPT0gcmV0Ll9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jX3QgPSByZXQuY190XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSByZXQudGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jID0gcmV0LmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnIgPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5ucikgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQucHVzaChyZXQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbUluZm8gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe3R5cGUsIHVzZXJJZCwgbXNnfSkge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgbXNnID0gSlNPTi5wYXJzZShtc2cpXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWRcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1zZywgbXNnKVxyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHt0aXRsZTogbXNnLmNoYXRVc2VyTmFtZX0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLmdldFN5c3RlbUluZm8oKSxcclxuICAgICAgICAgICAgR2V0KCd1c2VySW1nJyksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hhdExpc3QoKVxyXG4gICAgICAgIF0pLnRoZW4oKFtyZXMsIGltZywge2RhdGF9XSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGlmIChyZXMuc3lzdGVtLmluZGV4T2YoJ2lPUycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JTcGFjaW5nID0gMTRcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJT1MgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvclNwYWNpbmcgPSAxOFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0lPUyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XHJcbiAgICAgICAgICAgIHRoaXMudXNlckltZyA9IGltZ1xyXG4gICAgICAgICAgICB0aGlzLmNoYXRMaXN0ID0gZGF0YS5yZXZlcnNlKClcclxuICAgICAgICAgICAgdGhpcy52aWV3SWQgPSAnYW5jaG9yJ1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19