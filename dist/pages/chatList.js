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

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _formatTime = require('./../utils/formatTime.js');

var _storage = require('./../utils/storage.js');

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatList = function (_wepy$page) {
    _inherits(ChatList, _wepy$page);

    function ChatList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ChatList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatList.__proto__ || Object.getPrototypeOf(ChatList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '聊天消息'
        }, _this.request = new _request2.default(), _this.top = [], _this.login = {
            has: false,
            userId: ''
        }, _this.slide = {
            pageX: 0,
            pageY: 0
        }, _this.data = {
            hasLogin: false,
            slideId: 0,
            topList: [],
            list: [],
            restart: true,
            intre: {
                noReadCount: 0,
                companyName: '',
                companyCount: 0
            }
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            showAlert: function showAlert() {
                this.toast({ content: '功能开发中...' });
            },
            toInterest: function toInterest() {
                if (this.login.has) {
                    _wepy2.default.navigateTo({
                        url: 'interest?id=' + this.login.userId
                    });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            slideStart: function slideStart(type, index, item, e) {
                Object.assign(this.slide, e.changedTouches[0]);
            },
            slideMove: function slideMove(type, index, item, e) {
                var temp = e.changedTouches[0];
                if (temp.pageX - this.slide.pageX < -10 && Math.abs(temp.pageY - this.slide.pageY) < 8) {
                    this.slideId = item._id;
                }
                if (temp.pageX - this.slide.pageX > 10 && Math.abs(temp.pageY - this.slide.pageY) < 8) {
                    this.slideId = 0;
                }
            },
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            },
            toChat: function toChat(type, index, item) {
                var _this2 = this;

                if (Number.parseInt(this.slideId) !== 0) {
                    this.slideId = 0;
                    return false;
                }
                if (Number.parseInt(item.nr) !== 0) {
                    this.request.Get({
                        groupId: item._id,
                        userId: this.login.userId
                    }, '/Chat/changeRead').then(function () {
                        if (Number.parseInt(type) === 1) {
                            _this2.topList[index].nr = 0;
                        } else {
                            _this2.list[index].nr = 0;
                        }
                        _this2.$apply();
                    });
                }
                this.$parent.global.chatUpdate = false;
                this.$parent.global.chat = [];
                _wepy2.default.navigateTo({
                    url: 'chat?type=1&userId=' + this.login.userId + '&msg=' + JSON.stringify(item)
                });
            },
            upTop: function upTop(type, index, item) {
                var _this3 = this;

                this.slideId = 0;
                var temp = [];
                if (Number.parseInt(type) === 0) {
                    this.top.push(item._id);
                    (0, _storage.Set)('topChat', this.top);
                    this.list.splice(index, 1);
                    temp = this.list;
                    this.list = [];
                    this.topList.unshift(item);
                    this.topList = this.sort(this.topList);
                    setTimeout(function () {
                        _this3.list = temp;
                        _this3.$apply();
                    });
                } else {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.top.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = _slicedToArray(_step.value, 2),
                                _index = _step$value[0],
                                value = _step$value[1];

                            if (value == item._id) {
                                this.top.splice(_index, 1);
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

                    (0, _storage.Set)('topChat', this.top);
                    this.topList.splice(index, 1);
                    temp = this.topList;
                    this.topList = [];
                    this.list.unshift(item);
                    this.list = this.sort(this.list);
                    setTimeout(function () {
                        _this3.topList = temp;
                        _this3.$apply();
                    });
                }
            },
            removeItem: function removeItem(type, index, item) {
                var _this4 = this;

                this.request.Get({
                    groupId: item._id,
                    userId: this.login.userId
                }, '/Chat/delGroup').then(function (ret) {
                    var temp = null;
                    if (Number.parseInt(type) === 1) {
                        _this4.slideId = 0;
                        _this4.topList.splice(index, 1);
                        temp = _this4.topList;
                        _this4.topList = [];
                        setTimeout(function () {
                            _this4.topList = temp;
                            _this4.$apply();
                        });
                    } else {
                        _this4.slideId = 0;
                        _this4.list.splice(index, 1);
                        temp = _this4.list;
                        _this4.list = [];
                        setTimeout(function () {
                            _this4.list = temp;
                            _this4.$apply();
                        });
                    }
                    _this4.$apply();
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ChatList, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'sort',
        value: function sort(arr) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'c_t';

            if (arr.length <= 1) {
                return arr;
            }
            var pivotIndex = Math.floor(arr.length / 2);
            var pivot = arr.splice(pivotIndex, 1)[0];
            var left = [];
            var right = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = arr.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        index = _step2$value[0],
                        item = _step2$value[1];

                    if (item[key] > pivot[key]) {
                        left.push(item);
                    } else {
                        right.push(item);
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

            return [].concat(_toConsumableArray(this.sort(left)), [pivot], _toConsumableArray(this.sort(right)));
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.$parent.global.chatUpdate = false;
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.$parent.global.chatUpdate = false;
        }
    }, {
        key: 'initChatMsg',
        value: function initChatMsg(ret) {
            var _this5 = this;

            (0, _storage.Get)('topChat').then(function (innerRet) {
                _this5.top = innerRet;
                if (_this5.top.length === 0) {
                    Promise.all([_this5.request.Get({
                        userId: ret,
                        userType: 1
                    }, '/Chat/getNoReadCollect'), _this5.request.Get({
                        groupIds: "",
                        isTop: 0,
                        page: 0,
                        pageSize: 0,
                        userId: _this5.login.userId
                    }, '/Chat/getChatGroupList')]).then(function (_ref2) {
                        var _ref3 = _slicedToArray(_ref2, 2),
                            data = _ref3[0].data,
                            list = _ref3[1].data;

                        list.forEach(function (item) {
                            item.time = (0, _formatTime.formatTime)(item.c_t);
                        });
                        _this5.list = list;
                        Object.assign(_this5.intre, data);
                        _this5.$apply();
                        _wepy2.default.hideLoading();
                        _wepy2.default.stopPullDownRefresh();
                    });
                } else {
                    Promise.all([_this5.request.Get({
                        userId: ret,
                        userType: 1
                    }, '/Chat/getNoReadCollect'), _this5.request.Get({
                        groupIds: "",
                        isTop: 0,
                        page: 0,
                        pageSize: 0,
                        userId: _this5.login.userId
                    }, '/Chat/getChatGroupList'), _this5.request.Get({
                        groupIds: _this5.top.join(','),
                        isTop: 1,
                        page: 0,
                        pageSize: 0,
                        userId: _this5.login.userId
                    }, '/Chat/getChatGroupList')]).then(function (_ref4) {
                        var _ref5 = _slicedToArray(_ref4, 3),
                            data = _ref5[0].data,
                            normal = _ref5[1].data,
                            top = _ref5[2].data;

                        top.forEach(function (item) {
                            item.time = (0, _formatTime.formatTime)(item.c_t);
                        });
                        normal.forEach(function (item) {
                            item.time = (0, _formatTime.formatTime)(item.c_t);
                        });
                        _this5.list = normal;
                        _this5.topList = top;
                        Object.assign(_this5.intre, data);
                        _this5.$apply();
                        _wepy2.default.hideLoading();
                        _wepy2.default.stopPullDownRefresh();
                    });
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this6 = this;

            (0, _storage.Get)('userId').then(function (id) {
                if (_this6.$parent.global.chatUpdate) {
                    _this6.$parent.global.chat.forEach(function (ret) {
                        if (_this6.list.some(function (item) {
                            return item._id == ret._id;
                        })) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = _this6.list.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _step3$value = _slicedToArray(_step3.value, 2),
                                        index = _step3$value[0],
                                        items = _step3$value[1];

                                    if (items._id == ret._id) {
                                        ret.nr = Number.parseInt(items.nr) + Number.parseInt(ret.nr);
                                        Object.assign(items, ret);
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
                        } else if (_this6.topList.some(function (item) {
                            return item._id == ret._id;
                        })) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = _this6.topList.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _step4$value = _slicedToArray(_step4.value, 2),
                                        index = _step4$value[0],
                                        items = _step4$value[1];

                                    if (items._id == ret._id) {
                                        ret.nr = Number.parseInt(items.nr) + Number.parseInt(ret.nr);
                                        Object.assign(items, ret);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        } else {
                            ret.isTop = "0";
                            ret.chatUserId = ret.f;
                            _this6.request.Get({ userId: ret.f }, '/Chat/getUserInfoById').then(function (_ref6) {
                                var data = _ref6.data;

                                ret.chatUserName = data.nickname;
                                ret.chatUserHeaderImage = data.header_image;
                                _this6.list.unshift(ret);
                            });
                        }
                    });
                    _this6.list = _this6.sort(_this6.list);
                    _this6.topList = _this6.sort(_this6.topList);
                    _this6.$apply();
                } else {
                    _this6.initChatMsg(id);
                }
                _wepy2.default.onSocketMessage(function (_ref7) {
                    var data = _ref7.data;

                    _this6.$parent.global.curVal = Number.parseInt(_this6.$parent.global.curVal) + 1;

                    var _JSON$parse = JSON.parse(data),
                        ret = _JSON$parse.data;

                    ret._id = ret.f < ret.t ? ret.f + '' + ret.t : ret.f + '' + ret.t;
                    ret.c_t = ret.c_t * 1000;
                    ret.time = (0, _formatTime.formatTime)(ret.c_t);
                    if (_this6.list.some(function (item) {
                        return item._id == ret._id;
                    })) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = _this6.list.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var _step5$value = _slicedToArray(_step5.value, 2),
                                    index = _step5$value[0],
                                    items = _step5$value[1];

                                if (items._id == ret._id) {
                                    items.nr = Number.parseInt(items.nr) + 1;
                                    Object.assign(items, ret);
                                }
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        _this6.list = _this6.sort(_this6.list);
                    } else if (_this6.topList.some(function (item) {
                        return item._id == ret._id;
                    })) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = _this6.topList.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var _step6$value = _slicedToArray(_step6.value, 2),
                                    index = _step6$value[0],
                                    items = _step6$value[1];

                                if (items._id == ret._id) {
                                    items.nr = Number.parseInt(items.nr) + 1;
                                    Object.assign(items, ret);
                                }
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }

                        _this6.topList = _this6.sort(_this6.topList);
                    } else {
                        ret.nr = 1;
                        ret.isTop = "0";
                        ret.chatUserId = ret.f;
                        _this6.request.Get({ userId: ret.f }, '/Chat/getUserInfoById').then(function (_ref8) {
                            var data = _ref8.data;

                            ret.chatUserName = data.nickname;
                            ret.chatUserHeaderImage = data.header_image;
                            _this6.list.unshift(ret);
                        });
                    }
                    _this6.$apply();
                });
            }).catch(function () {});
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this7 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                _this7.login.userId = ret;
                _this7.login.has = true;
                _this7.initChatMsg(ret);
            }).catch(function (err) {
                _this7.login.userId = '';
                _this7.login.has = false;
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this8 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                _this8.login.userId = ret;
                _this8.login.has = true;
                _this8.initChatMsg(ret);
            }).catch(function (err) {
                _this8.login.userId = '';
                _this8.login.has = false;
                _wepy2.default.stopPullDownRefresh();
            });
        }
    }]);

    return ChatList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ChatList , 'pages/chatList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRMaXN0LmpzIl0sIm5hbWVzIjpbIkNoYXRMaXN0IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJyZXF1ZXN0IiwidG9wIiwibG9naW4iLCJoYXMiLCJ1c2VySWQiLCJzbGlkZSIsInBhZ2VYIiwicGFnZVkiLCJkYXRhIiwiaGFzTG9naW4iLCJzbGlkZUlkIiwidG9wTGlzdCIsImxpc3QiLCJyZXN0YXJ0IiwiaW50cmUiLCJub1JlYWRDb3VudCIsImNvbXBhbnlOYW1lIiwiY29tcGFueUNvdW50IiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJzaG93QWxlcnQiLCJ0b2FzdCIsImNvbnRlbnQiLCJ0b0ludGVyZXN0IiwibmF2aWdhdGVUbyIsInVybCIsInNsaWRlU3RhcnQiLCJ0eXBlIiwiaW5kZXgiLCJpdGVtIiwiZSIsIk9iamVjdCIsImFzc2lnbiIsImNoYW5nZWRUb3VjaGVzIiwic2xpZGVNb3ZlIiwidGVtcCIsIk1hdGgiLCJhYnMiLCJfaWQiLCJ0b0NvbXBhbnkiLCJpZCIsInRvQ2hhdCIsIk51bWJlciIsInBhcnNlSW50IiwibnIiLCJHZXQiLCJncm91cElkIiwidGhlbiIsIiRhcHBseSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjaGF0VXBkYXRlIiwiY2hhdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cFRvcCIsInB1c2giLCJzcGxpY2UiLCJ1bnNoaWZ0Iiwic29ydCIsInNldFRpbWVvdXQiLCJlbnRyaWVzIiwidmFsdWUiLCJyZW1vdmVJdGVtIiwiJGludm9rZSIsImFyciIsImtleSIsImxlbmd0aCIsInBpdm90SW5kZXgiLCJmbG9vciIsInBpdm90IiwibGVmdCIsInJpZ2h0IiwicmV0IiwiaW5uZXJSZXQiLCJQcm9taXNlIiwiYWxsIiwidXNlclR5cGUiLCJncm91cElkcyIsImlzVG9wIiwicGFnZSIsInBhZ2VTaXplIiwiZm9yRWFjaCIsInRpbWUiLCJjX3QiLCJoaWRlTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJqb2luIiwibm9ybWFsIiwic29tZSIsIml0ZW1zIiwiY2hhdFVzZXJJZCIsImYiLCJjaGF0VXNlck5hbWUiLCJuaWNrbmFtZSIsImNoYXRVc2VySGVhZGVySW1hZ2UiLCJoZWFkZXJfaW1hZ2UiLCJpbml0Q2hhdE1zZyIsIm9uU29ja2V0TWVzc2FnZSIsImN1clZhbCIsInBhcnNlIiwidCIsImNhdGNoIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE8sR0FBVSx1QixRQU1WQyxHLEdBQU0sRSxRQUVOQyxLLEdBQVE7QUFDSkMsaUJBQUssS0FERDtBQUVKQyxvQkFBUTtBQUZKLFMsUUFLUkMsSyxHQUFRO0FBQ0pDLG1CQUFPLENBREg7QUFFSkMsbUJBQU87QUFGSCxTLFFBS1JDLEksR0FBTztBQUNIQyxzQkFBVSxLQURQO0FBRUhDLHFCQUFTLENBRk47QUFHSEMscUJBQVMsRUFITjtBQUlIQyxrQkFBTSxFQUpIO0FBS0hDLHFCQUFTLElBTE47QUFNSEMsbUJBQU87QUFDSEMsNkJBQWEsQ0FEVjtBQUVIQyw2QkFBYSxFQUZWO0FBR0hDLDhCQUFjO0FBSFg7QUFOSixTLFFBYVBDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQXNCYkMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNNO0FBQ1IscUJBQUtDLEtBQUwsQ0FBVyxFQUFDQyxTQUFTLFVBQVYsRUFBWDtBQUNILGFBSEs7QUFJTkMsc0JBSk0sd0JBSVE7QUFDVixvQkFBSSxLQUFLckIsS0FBTCxDQUFXQyxHQUFmLEVBQW9CO0FBQ2hCLG1DQUFLcUIsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSyxpQkFBaUIsS0FBS3ZCLEtBQUwsQ0FB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QSx1QkFBSzhGLFdBQUwsQ0FBaUJ4QixHQUFqQjtBQUNILGFBTEQsRUFLRzZCLEtBTEgsQ0FLUyxlQUFPO0FBQ1osdUJBQUtwRyxLQUFMLENBQVdFLE1BQVgsR0FBb0IsRUFBcEI7QUFDQSx1QkFBS0YsS0FBTCxDQUFXQyxHQUFYLEdBQWlCLEtBQWpCO0FBQ0EsK0JBQUttRixtQkFBTDtBQUNILGFBVEQ7QUFVSDs7OztFQTFWaUMsZUFBS04sSTs7a0JBQXRCcEYsUSIsImZpbGUiOiJjaGF0TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHtmb3JtYXRUaW1lfSBmcm9tICcuLi91dGlscy9mb3JtYXRUaW1lJ1xyXG5pbXBvcnQge0dldCwgU2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhdExpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6IGK5aSp5raI5oGvJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICB0b3AgPSBbXVxyXG5cclxuICAgIGxvZ2luID0ge1xyXG4gICAgICAgIGhhczogZmFsc2UsXHJcbiAgICAgICAgdXNlcklkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlID0ge1xyXG4gICAgICAgIHBhZ2VYOiAwLFxyXG4gICAgICAgIHBhZ2VZOiAwXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBoYXNMb2dpbjogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVJZDogMCxcclxuICAgICAgICB0b3BMaXN0OiBbXSxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgICByZXN0YXJ0OiB0cnVlLFxyXG4gICAgICAgIGludHJlOiB7XHJcbiAgICAgICAgICAgIG5vUmVhZENvdW50OiAwLFxyXG4gICAgICAgICAgICBjb21wYW55TmFtZTogJycsXHJcbiAgICAgICAgICAgIGNvbXBhbnlDb3VudDogMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgc29ydCAoYXJyLCBrZXkgPSAnY190Jykge1xyXG4gICAg44CA44CAaWYgKGFyci5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyXHJcbiAgICAgICAgfVxyXG4gICAg44CA44CAbGV0IHBpdm90SW5kZXggPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKVxyXG4gICAg44CA44CAbGV0IHBpdm90ID0gYXJyLnNwbGljZShwaXZvdEluZGV4LCAxKVswXVxyXG4gICAg44CA44CAbGV0IGxlZnQgPSBbXVxyXG4gICAg44CA44CAbGV0IHJpZ2h0ID0gW11cclxuICAgIOOAgOOAgGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2YgYXJyLmVudHJpZXMoKSl7XHJcbiAgICDjgIDjgIDjgIDjgIBpZiAoaXRlbVtrZXldID4gcGl2b3Rba2V5XSkge1xyXG4gICAg44CA44CA44CA44CA44CA44CAbGVmdC5wdXNoKGl0ZW0pXHJcbiAgICDjgIDjgIDjgIDjgIB9IGVsc2Uge1xyXG4gICAg44CA44CA44CA44CA44CA44CAcmlnaHQucHVzaChpdGVtKVxyXG4gICAg44CA44CA44CA44CAfVxyXG4gICAg44CA44CAfVxyXG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zb3J0KGxlZnQpLCBwaXZvdCwgLi4udGhpcy5zb3J0KHJpZ2h0KV1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dBbGVydCgpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+WKn+iDveW8gOWPkeS4rS4uLid9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9JbnRlcmVzdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luLmhhcykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdpbnRlcmVzdD9pZD0nICsgdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlU3RhcnQgKHR5cGUsIGluZGV4LCBpdGVtLCBlKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zbGlkZSwgZS5jaGFuZ2VkVG91Y2hlc1swXSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlTW92ZSAodHlwZSwgaW5kZXgsIGl0ZW0sIGUpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBlLmNoYW5nZWRUb3VjaGVzWzBdXHJcbiAgICAgICAgICAgIGlmICh0ZW1wLnBhZ2VYIC0gdGhpcy5zbGlkZS5wYWdlWCA8IC0xMCAmJiBNYXRoLmFicyh0ZW1wLnBhZ2VZIC0gdGhpcy5zbGlkZS5wYWdlWSkgPCA4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSBpdGVtLl9pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wLnBhZ2VYIC0gdGhpcy5zbGlkZS5wYWdlWCA+IDEwICYmIE1hdGguYWJzKHRlbXAucGFnZVkgLSB0aGlzLnNsaWRlLnBhZ2VZKSA8IDgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJZCA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55IChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnY29tcGFueT9pZD0nICsgaWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ2hhdCAodHlwZSwgaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnNsaWRlSWQpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGl0ZW0ubnIpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBpdGVtLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICB9LCAnL0NoYXQvY2hhbmdlUmVhZCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3RbaW5kZXhdLm5yID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpbmRleF0ubnIgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0ID0gW11cclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNoYXQ/dHlwZT0xJnVzZXJJZD0ke3RoaXMubG9naW4udXNlcklkfSZtc2c9JHtKU09OLnN0cmluZ2lmeShpdGVtKX1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cFRvcCAodHlwZSwgaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IFtdXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wLnB1c2goaXRlbS5faWQpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3RvcENoYXQnLCB0aGlzLnRvcClcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy5saXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0LnVuc2hpZnQoaXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRoaXMuc29ydCh0aGlzLnRvcExpc3QpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0ZW1wXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgdmFsdWVdIG9mIHRoaXMudG9wLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBpdGVtLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgU2V0KCd0b3BDaGF0JywgdGhpcy50b3ApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMudG9wTGlzdFxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC51bnNoaWZ0KGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnNvcnQodGhpcy5saXN0KVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUl0ZW0gKHR5cGUsIGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogaXRlbS5faWQsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgIH0sICcvQ2hhdC9kZWxHcm91cCcpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG51bGxcclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy50b3BMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMubGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSGlkZSAoKSB7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2hhdE1zZyAocmV0KSB7XHJcbiAgICAgICAgR2V0KCd0b3BDaGF0JykudGhlbihpbm5lclJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wID0gaW5uZXJSZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9wLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHJldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclR5cGU6IDFcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Tm9SZWFkQ29sbGVjdCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkczogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9DaGF0L2dldENoYXRHcm91cExpc3QnKVxyXG4gICAgICAgICAgICAgICAgXSkudGhlbigoW3tkYXRhfSwge2RhdGE6IGxpc3R9XSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSBmb3JtYXRUaW1lKGl0ZW0uY190KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5pbnRyZSwgZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogcmV0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyVHlwZTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvQ2hhdC9nZXROb1JlYWRDb2xsZWN0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWRzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Q2hhdEdyb3VwTGlzdCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkczogdGhpcy50b3Auam9pbignLCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvcDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Q2hhdEdyb3VwTGlzdCcpXHJcbiAgICAgICAgICAgICAgICBdKS50aGVuKChbe2RhdGF9LCB7ZGF0YTogbm9ybWFsfSwge2RhdGE6IHRvcH1dKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aW1lID0gZm9ybWF0VGltZShpdGVtLmNfdClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jX3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3QgPSB0b3BcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuaW50cmUsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXRVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hhdC5mb3JFYWNoKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0LnNvbWUoKGl0ZW0pID0+IGl0ZW0uX2lkID09IHJldC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbXNdIG9mIHRoaXMubGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5uciA9IE51bWJlci5wYXJzZUludChpdGVtcy5ucikgKyBOdW1iZXIucGFyc2VJbnQocmV0Lm5yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbXMsIHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50b3BMaXN0LnNvbWUoKGl0ZW0pID0+IGl0ZW0uX2lkID09IHJldC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbXNdIG9mIHRoaXMudG9wTGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5uciA9IE51bWJlci5wYXJzZUludChpdGVtcy5ucikgKyBOdW1iZXIucGFyc2VJbnQocmV0Lm5yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbXMsIHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5pc1RvcCA9IFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5jaGF0VXNlcklkID0gcmV0LmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7dXNlcklkOiByZXQuZn0sICcvQ2hhdC9nZXRVc2VySW5mb0J5SWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJOYW1lID0gZGF0YS5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmNoYXRVc2VySGVhZGVySW1hZ2UgPSBkYXRhLmhlYWRlcl9pbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnVuc2hpZnQocmV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnNvcnQodGhpcy5saXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdGhpcy5zb3J0KHRoaXMudG9wTGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdENoYXRNc2coaWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UoKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICAgICAgbGV0IHtkYXRhOiByZXR9ID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0Ll9pZCA9IHJldC5mIDwgcmV0LnQgPyByZXQuZiArICcnICsgcmV0LnQgOiByZXQuZiArICcnICsgcmV0LnRcclxuICAgICAgICAgICAgICAgIHJldC5jX3QgPSByZXQuY190ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgcmV0LnRpbWUgPSBmb3JtYXRUaW1lKHJldC5jX3QpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0LnNvbWUoKGl0ZW0pID0+IGl0ZW0uX2lkID09IHJldC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtc10gb2YgdGhpcy5saXN0LmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMuX2lkID09IHJldC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLm5yID0gTnVtYmVyLnBhcnNlSW50KGl0ZW1zLm5yKSArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbXMsIHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnNvcnQodGhpcy5saXN0KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvcExpc3Quc29tZSgoaXRlbSkgPT4gaXRlbS5faWQgPT0gcmV0Ll9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1zXSBvZiB0aGlzLnRvcExpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMubnIgPSBOdW1iZXIucGFyc2VJbnQoaXRlbXMubnIpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtcywgcmV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRoaXMuc29ydCh0aGlzLnRvcExpc3QpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5uciA9IDFcclxuICAgICAgICAgICAgICAgICAgICByZXQuaXNUb3AgPSBcIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHJldC5jaGF0VXNlcklkID0gcmV0LmZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHt1c2VySWQ6IHJldC5mfSwgJy9DaGF0L2dldFVzZXJJbmZvQnlJZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJOYW1lID0gZGF0YS5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJIZWFkZXJJbWFnZSA9IGRhdGEuaGVhZGVyX2ltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC51bnNoaWZ0KHJldClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHt9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udXNlcklkID0gcmV0XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmluaXRDaGF0TXNnKHJldClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnVzZXJJZCA9ICcnXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICBHZXQoJ3VzZXJJZCcpLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi51c2VySWQgPSByZXRcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5oYXMgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYXRNc2cocmV0KVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udXNlcklkID0gJydcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5oYXMgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19