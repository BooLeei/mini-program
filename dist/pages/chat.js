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
            height: 0,
            sendMsg: '',
            chatList: [],
            keyboard: false,
            tapFocus: false
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

            this.$parent.restartSocket(this.userId);
            _wepy2.default.onSocketMessage(function (_ref3) {
                var data = _ref3.data;

                var _JSON$parse = JSON.parse(data),
                    ret = _JSON$parse.data;

                (0, _log.log)(ret);
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

            msg = JSON.parse(msg);
            (0, _log.log)(msg);
            this.userId = userId;
            this.type = type;
            Object.assign(this.msg, msg);
            _wepy2.default.setNavigationBarTitle({ title: msg.chatUserName });
            Promise.all([this.getSystemInfo(), (0, _storage.Get)('userImg'), this.getChatList()]).then(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 3),
                    height = _ref6[0].windowHeight,
                    img = _ref6[1],
                    data = _ref6[2].data;

                (0, _log.log)(data);
                _this6.height = height;
                _this6.userImg = img;
                _this6.chatList = data.reverse();
                _this6.viewId = 'anchor';
                _this6.$apply();
            });
        }
    }]);

    return Chat;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chat , 'pages/chat'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiQ2hhdCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInJlcXVlc3QiLCJ1c2VySWQiLCJ0eXBlIiwiZGF0YSIsInZpZXdJZCIsInVzZXJJbWciLCJtc2ciLCJoZWlnaHQiLCJzZW5kTXNnIiwiY2hhdExpc3QiLCJrZXlib2FyZCIsInRhcEZvY3VzIiwiY29tcG9uZW50cyIsInBhZ2VzIiwiaW5kZXgiLCJoYXNOb3QiLCJidXN5IiwibWV0aG9kcyIsInRvQ29tcGFueSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaGF0VXNlcklkIiwiYmluZFNlbmRNc2ciLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJiaW5kQW5jaG9yIiwiZGVsdGFZIiwic2V0VGltZW91dCIsIiRhcHBseSIsInNjcm9sbEJvdHRvbSIsImxvYWROb3RlIiwiZ2V0Q2hhdExpc3QiLCJ0aGVuIiwicmV2ZXJzZSIsInNlbmRNc2dCdG4iLCJjb250ZW50IiwiY2hhdElkIiwiZ3JvdXBJZCIsIl9pZCIsInRlbXAiLCJjX3QiLCJEYXRlIiwiZ2V0VGltZSIsImYiLCJ0IiwiYyIsInRpbWUiLCJuciIsInB1c2giLCIkcGFyZW50IiwiZ2xvYmFsIiwiY2hhdFVwZGF0ZSIsImNoYXQiLCJzb21lIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIk9iamVjdCIsImFzc2lnbiIsImNhdGNoIiwiJGludm9rZSIsInBhZ2UiLCJwYWdlU2l6ZSIsIkdldCIsInJlc3RhcnRTb2NrZXQiLCJvblNvY2tldE1lc3NhZ2UiLCJKU09OIiwicGFyc2UiLCJyZXQiLCJOdW1iZXIiLCJwYXJzZUludCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwiZXJyIiwic2V0TmF2aWdhdGlvbkJhclRp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ekJBLGtCQUFNNkQsS0FBS0MsS0FBTCxDQUFXOUQsR0FBWCxDQUFOO0FBQ0EsMEJBQUlBLEdBQUo7QUFDQSxpQkFBS0wsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsaUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBd0QsbUJBQU9DLE1BQVAsQ0FBYyxLQUFLckQsR0FBbkIsRUFBd0JBLEdBQXhCO0FBQ0EsMkJBQUswRSxxQkFBTCxDQUEyQixFQUFDQyxPQUFPM0UsSUFBSTRFLFlBQVosRUFBM0I7QUFDQVYsb0JBQVFXLEdBQVIsQ0FBWSxDQUNSLEtBQUtSLGFBQUwsRUFEUSxFQUVSLGtCQUFJLFNBQUosQ0FGUSxFQUdSLEtBQUszQyxXQUFMLEVBSFEsQ0FBWixFQUlHQyxJQUpILENBSVEsaUJBQTJDO0FBQUE7QUFBQSxvQkFBMUIxQixNQUEwQixZQUF4QzZFLFlBQXdDO0FBQUEsb0JBQWpCQyxHQUFpQjtBQUFBLG9CQUFYbEYsSUFBVyxZQUFYQSxJQUFXOztBQUMvQyw4QkFBSUEsSUFBSjtBQUNBLHVCQUFLSSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSx1QkFBS0YsT0FBTCxHQUFlZ0YsR0FBZjtBQUNBLHVCQUFLNUUsUUFBTCxHQUFnQk4sS0FBSytCLE9BQUwsRUFBaEI7QUFDQSx1QkFBSzlCLE1BQUwsR0FBYyxRQUFkO0FBQ0EsdUJBQUt5QixNQUFMO0FBQ0gsYUFYRDtBQVlIOzs7O0VBL002QixlQUFLaUMsSTs7a0JBQWxCcEUsSSIsImZpbGUiOiJjaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgeyBTZW5kIH0gZnJvbSAnLi4vdXRpbHMvc29ja2V0J1xyXG5pbXBvcnQgeyBHZXQgfSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQge2Zvcm1hdFRpbWV9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBiuWkqea2iOaBrycsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICB1c2VySWQgPSAnJ1xyXG4gICAgdHlwZSA9IDBcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHZpZXdJZDogJycsXHJcbiAgICAgICAgdXNlckltZzogJycsXHJcbiAgICAgICAgbXNnOiB7fSxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgc2VuZE1zZzogJycsXHJcbiAgICAgICAgY2hhdExpc3Q6IFtdLFxyXG4gICAgICAgIGtleWJvYXJkOiBmYWxzZSxcclxuICAgICAgICB0YXBGb2N1czogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZXMgPSB7XHJcbiAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgaGFzTm90OiBmYWxzZSxcclxuICAgICAgICBidXN5OiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXRMaXN0IChwYWdlID0gMSwgcGFnZVNpemUgPSAxNSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgZ3JvdXBJZDogdGhpcy5tc2cuX2lkLFxyXG4gICAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTUsXHJcbiAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWRcclxuICAgICAgICB9LCAnL0NoYXQvZ2V0TGlzdEJ5R3JvdXBJZCcpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b0NvbXBhbnkgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnY29tcGFueT9pZD0nICsgdGhpcy5tc2cuY2hhdFVzZXJJZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNlbmRNc2cgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTXNnID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRBbmNob3IgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3SWQgPSAnJ1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEJvdHRvbSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0lkID0gJ2FuY2hvcidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvYWROb3RlICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZXMuaGFzTm90KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlcy5idXN5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZXMuaW5kZXgrK1xyXG4gICAgICAgICAgICB0aGlzLmdldENoYXRMaXN0KHRoaXMucGFnZXMuaW5kZXgrKylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0TGlzdCA9IFsuLi5kYXRhLnJldmVyc2UoKSwgLi4udGhpcy5jaGF0TGlzdF1cclxuICAgICAgICAgICAgICAgIGxvZyh0aGlzLmNoYXRMaXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZE1zZ0J0biAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbmRNc2cgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlld0lkID0gJydcclxuICAgICAgICAgICAgU2VuZCh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnNlbmRNc2csXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgY2hhdElkOiB0aGlzLm1zZy5jaGF0VXNlcklkLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogdGhpcy5tc2cuX2lkXHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNfdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZjogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdDogdGhpcy5tc2cuY2hhdFVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBfaWQ6IHRoaXMubXNnLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICBjOiB0aGlzLnNlbmRNc2csXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLmdldFRpbWUoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgbnI6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdExpc3QucHVzaCh0ZW1wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTXNnID0gJydcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0lkID0gJ2FuY2hvcidcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuc29tZSgoaXRlbXMpID0+IGl0ZW1zLl9pZCA9PSB0ZW1wLl9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLl9pZCA9IHRlbXAuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB0ZW1wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdC5wdXNoKE9iamVjdC5hc3NpZ24oe30sIHRlbXApKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB0aGlzLiRwYXJlbnQucmVzdGFydFNvY2tldCh0aGlzLnVzZXJJZClcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZSgoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7ZGF0YTogcmV0fSA9IEpTT04ucGFyc2UoZGF0YSlcclxuICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgcmV0Lm5yID0gMVxyXG4gICAgICAgICAgICByZXQuX2lkID0gcmV0LmYgPCByZXQudCA/IHJldC5mICsgJycgKyByZXQudCA6IHJldC5mICsgJycgKyByZXQudFxyXG4gICAgICAgICAgICByZXQuY190ID0gcmV0LmNfdCAqIDEwMDBcclxuICAgICAgICAgICAgcmV0LnRpbWUgPSBmb3JtYXRUaW1lKHJldC5jX3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXQuZiA9PSB0aGlzLm1zZy5jaGF0VXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdJZCA9ICcnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXRMaXN0LnB1c2gocmV0KVxyXG4gICAgICAgICAgICAgICAgcmV0Lm5yID0gMFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3SWQgPSAnYW5jaG9yJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0LnNvbWUoKGl0ZW1zKSA9PiBpdGVtcy5faWQgPT0gcmV0Ll9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jX3QgPSByZXQuY190XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSByZXQudGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jID0gcmV0LmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdC5wdXNoKHJldClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuc29tZSgoaXRlbSkgPT4gaXRlbS5faWQgPT0gcmV0Ll9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jX3QgPSByZXQuY190XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSByZXQudGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jID0gcmV0LmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnIgPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5ucikgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQucHVzaChyZXQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbUluZm8gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoe3R5cGUsIHVzZXJJZCwgbXNnfSkge1xyXG4gICAgICAgIG1zZyA9IEpTT04ucGFyc2UobXNnKVxyXG4gICAgICAgIGxvZyhtc2cpXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWRcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1zZywgbXNnKVxyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHt0aXRsZTogbXNnLmNoYXRVc2VyTmFtZX0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLmdldFN5c3RlbUluZm8oKSxcclxuICAgICAgICAgICAgR2V0KCd1c2VySW1nJyksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hhdExpc3QoKVxyXG4gICAgICAgIF0pLnRoZW4oKFt7d2luZG93SGVpZ2h0OiBoZWlnaHR9LCBpbWcsIHtkYXRhfV0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XHJcbiAgICAgICAgICAgIHRoaXMudXNlckltZyA9IGltZ1xyXG4gICAgICAgICAgICB0aGlzLmNoYXRMaXN0ID0gZGF0YS5yZXZlcnNlKClcclxuICAgICAgICAgICAgdGhpcy52aWV3SWQgPSAnYW5jaG9yJ1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=