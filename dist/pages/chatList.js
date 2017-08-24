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
            intre: {}
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
        key: 'onShow',
        value: function onShow() {
            var _this5 = this;

            (0, _storage.Get)('userId').then(function (id) {
                _this5.$parent.restartSocket(id);
                if (_this5.$parent.global.chatUpdate) {
                    _this5.$parent.global.chat.forEach(function (ret) {
                        if (_this5.list.some(function (item) {
                            return item._id == ret._id;
                        })) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = _this5.list.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
                        } else if (_this5.topList.some(function (item) {
                            return item._id == ret._id;
                        })) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = _this5.topList.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
                            _this5.request.Get({ userId: ret.f }, '/Chat/getUserInfoById').then(function (_ref2) {
                                var data = _ref2.data;

                                ret.chatUserName = data.nickname;
                                ret.chatUserHeaderImage = data.header_image;
                                _this5.list.unshift(ret);
                            });
                        }
                    });
                    _this5.list = _this5.sort(_this5.list);
                    _this5.topList = _this5.sort(_this5.topList);
                    _this5.$apply();
                }
                _wepy2.default.onSocketMessage(function (_ref3) {
                    var data = _ref3.data;

                    var _JSON$parse = JSON.parse(data),
                        ret = _JSON$parse.data;

                    (0, _log.log)(ret);
                    ret._id = ret.f < ret.t ? ret.f + '' + ret.t : ret.f + '' + ret.t;
                    ret.c_t = ret.c_t * 1000;
                    ret.time = (0, _formatTime.formatTime)(ret.c_t);
                    if (_this5.list.some(function (item) {
                        return item._id == ret._id;
                    })) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = _this5.list.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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

                        _this5.list = _this5.sort(_this5.list);
                    } else if (_this5.topList.some(function (item) {
                        return item._id == ret._id;
                    })) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = _this5.topList.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
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

                        _this5.topList = _this5.sort(_this5.topList);
                    } else {
                        ret.nr = 1;
                        ret.isTop = "0";
                        ret.chatUserId = ret.f;
                        _this5.request.Get({ userId: ret.f }, '/Chat/getUserInfoById').then(function (_ref4) {
                            var data = _ref4.data;

                            ret.chatUserName = data.nickname;
                            ret.chatUserHeaderImage = data.header_image;
                            _this5.list.unshift(ret);
                        });
                    }
                    _this5.$apply();
                });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this6 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _this6.login.userId = ret;
                _this6.login.has = true;
                _this6.request.Get({
                    userId: ret,
                    userType: 1
                }, '/Chat/getNoReadCollect').then(function (_ref5) {
                    var data = _ref5.data;

                    Object.assign(_this6.intre, data);
                    _this6.$apply();
                });
                (0, _storage.Get)('topChat').then(function (innerRet) {
                    _this6.top = innerRet;
                    if (_this6.top.length === 0) {
                        _this6.request.Get({
                            groupIds: "",
                            isTop: 0,
                            page: 0,
                            pageSize: 0,
                            userId: _this6.login.userId
                        }, '/Chat/getChatGroupList').then(function (_ref6) {
                            var data = _ref6.data;

                            data.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            _this6.list = data;
                            _this6.$apply();
                        });
                    } else {
                        Promise.all([_this6.request.Get({
                            groupIds: "",
                            isTop: 0,
                            page: 0,
                            pageSize: 0,
                            userId: _this6.login.userId
                        }, '/Chat/getChatGroupList'), _this6.request.Get({
                            groupIds: _this6.top.join(','),
                            isTop: 1,
                            page: 0,
                            pageSize: 0,
                            userId: _this6.login.userId
                        }, '/Chat/getChatGroupList')]).then(function (_ref7) {
                            var _ref8 = _slicedToArray(_ref7, 2),
                                normal = _ref8[0].data,
                                top = _ref8[1].data;

                            top.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            normal.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            _this6.list = normal;
                            _this6.topList = top;
                            _this6.$apply();
                        });
                    }
                });
                _this6.$apply();
            }).catch(function (err) {
                _this6.login.userId = '';
                _this6.login.has = false;
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this7 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _this7.login.userId = ret;
                _this7.login.has = true;
                _this7.request.Get({
                    userId: ret,
                    userType: 1
                }, '/Chat/getNoReadCollect').then(function (_ref9) {
                    var data = _ref9.data;

                    Object.assign(_this7.intre, data);
                    _this7.$apply();
                });
                _this7.$parent.restartSocket(_this7.login.userId);
                (0, _storage.Get)('topChat').then(function (innerRet) {
                    _this7.top = innerRet;
                    if (_this7.top.length === 0) {
                        _this7.request.Get({
                            groupIds: "",
                            isTop: 0,
                            page: 0,
                            pageSize: 0,
                            userId: _this7.login.userId
                        }, '/Chat/getChatGroupList').then(function (_ref10) {
                            var data = _ref10.data;

                            data.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            _this7.list = data;
                            _this7.$apply();
                            _wepy2.default.stopPullDownRefresh();
                        });
                    } else {
                        Promise.all([_this7.request.Get({
                            groupIds: "",
                            isTop: 0,
                            page: 0,
                            pageSize: 0,
                            userId: _this7.login.userId
                        }, '/Chat/getChatGroupList'), _this7.request.Get({
                            groupIds: _this7.top.join(','),
                            isTop: 1,
                            page: 0,
                            pageSize: 0,
                            userId: _this7.login.userId
                        }, '/Chat/getChatGroupList')]).then(function (_ref11) {
                            var _ref12 = _slicedToArray(_ref11, 2),
                                normal = _ref12[0].data,
                                top = _ref12[1].data;

                            top.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            normal.forEach(function (item) {
                                item.time = (0, _formatTime.formatTime)(item.c_t);
                            });
                            _this7.list = normal;
                            _this7.topList = top;
                            _this7.$apply();
                            _wepy2.default.stopPullDownRefresh();
                        });
                    }
                });
            }).catch(function (err) {
                _this7.login.userId = '';
                _this7.login.has = false;
                _wepy2.default.stopPullDownRefresh();
            });
        }
    }]);

    return ChatList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ChatList , 'pages/chatList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRMaXN0LmpzIl0sIm5hbWVzIjpbIkNoYXRMaXN0IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJyZXF1ZXN0IiwidG9wIiwibG9naW4iLCJoYXMiLCJ1c2VySWQiLCJzbGlkZSIsInBhZ2VYIiwicGFnZVkiLCJkYXRhIiwiaGFzTG9naW4iLCJzbGlkZUlkIiwidG9wTGlzdCIsImxpc3QiLCJyZXN0YXJ0IiwiaW50cmUiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInNob3dBbGVydCIsInRvYXN0IiwiY29udGVudCIsInRvSW50ZXJlc3QiLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2xpZGVTdGFydCIsInR5cGUiLCJpbmRleCIsIml0ZW0iLCJlIiwiT2JqZWN0IiwiYXNzaWduIiwiY2hhbmdlZFRvdWNoZXMiLCJzbGlkZU1vdmUiLCJ0ZW1wIiwiTWF0aCIsImFicyIsIl9pZCIsInRvQ29tcGFueSIsImlkIiwidG9DaGF0IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJuciIsIkdldCIsImdyb3VwSWQiLCJ0aGVuIiwiJGFwcGx5IiwiJHBhcmVudCIsImdsb2JhbCIsImNoYXRVcGRhdGUiLCJjaGF0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVwVG9wIiwicHVzaCIsInNwbGljZSIsInVuc2hpZnQiLCJzb3J0Iiwic2V0VGltZW91dCIsImVudHJpZXMiLCJ2YWx1ZSIsInJlbW92ZUl0ZW0iLCIkaW52b2tlIiwiYXJyIiwia2V5IiwibGVuZ3RoIiwicGl2b3RJbmRleCIsImZsb29yIiwicGl2b3QiLCJsZWZ0IiwicmlnaHQiLCJyZXN0YXJ0U29ja2V0IiwiZm9yRWFjaCIsInJldCIsInNvbWUiLCJpdGVtcyIsImlzVG9wIiwiY2hhdFVzZXJJZCIsImYiLCJjaGF0VXNlck5hbWUiLCJuaWNrbmFtZSIsImNoYXRVc2VySGVhZGVySW1hZ2UiLCJoZWFkZXJfaW1hZ2UiLCJvblNvY2tldE1lc3NhZ2UiLCJwYXJzZSIsInQiLCJjX3QiLCJ0aW1lIiwidXNlclR5cGUiLCJpbm5lclJldCIsImdyb3VwSWRzIiwicGFnZSIsInBhZ2VTaXplIiwiUHJvbWlzZSIsImFsbCIsImpvaW4iLCJub3JtYWwiLCJjYXRjaCIsInN0b3BQdWxsRG93blJlZnJlc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE8sR0FBVSx1QixRQU1WQyxHLEdBQU0sRSxRQUVOQyxLLEdBQVE7QUFDSkMsaUJBQUssS0FERDtBQUVKQyxvQkFBUTtBQUZKLFMsUUFLUkMsSyxHQUFRO0FBQ0pDLG1CQUFPLENBREg7QUFFSkMsbUJBQU87QUFGSCxTLFFBS1JDLEksR0FBTztBQUNIQyxzQkFBVSxLQURQO0FBRUhDLHFCQUFTLENBRk47QUFHSEMscUJBQVMsRUFITjtBQUlIQyxrQkFBTSxFQUpIO0FBS0hDLHFCQUFTLElBTE47QUFNSEMsbUJBQU87QUFOSixTLFFBU1BDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQXNCYkMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNNO0FBQ1IscUJBQUtDLEtBQUwsQ0FBVyxFQUFDQyxTQUFTLFVBQVYsRUFBWDtBQUNILGFBSEs7QUFJTkMsc0JBSk0sd0JBSVE7QUFDVixvQkFBSSxLQUFLbEIsS0FBTCxDQUFXQyxHQUFmLEVBQW9CO0FBQ2hCLG1DQUFLa0IsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSyxpQkFBaUIsS0FBS3BCLEtBQUwsQ0FBV0U7QUFEckIscUJBQWhCO0FBR0gsaUJBSkQsTUFJTztBQUNILG1DQUFLaUIsVUFBTCxDQUFnQixFQUFDQyxLQUFLLE9BQU4sRUFBaEI7QUFDSDtBQUNKLGFBWks7QUFhTkMsc0JBYk0sc0JBYU1DLElBYk4sRUFhWUMsS0FiWixFQWFtQkMsSUFibkIsRUFh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LEtBNURILENBNERTLGVBQU87QUFDWix1QkFBSzlGLEtBQUwsQ0FBV0UsTUFBWCxHQUFvQixFQUFwQjtBQUNBLHVCQUFLRixLQUFMLENBQVdDLEdBQVgsR0FBaUIsS0FBakI7QUFDQSwrQkFBSzhGLG1CQUFMO0FBQ0gsYUFoRUQ7QUFpRUg7Ozs7RUFoWWlDLGVBQUtQLEk7O2tCQUF0QjlGLFEiLCJmaWxlIjoiY2hhdExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7Zm9ybWF0VGltZX0gZnJvbSAnLi4vdXRpbHMvZm9ybWF0VGltZSdcclxuaW1wb3J0IHtHZXQsIFNldH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBiuWkqea2iOaBrydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgdG9wID0gW11cclxuXHJcbiAgICBsb2dpbiA9IHtcclxuICAgICAgICBoYXM6IGZhbHNlLFxyXG4gICAgICAgIHVzZXJJZDogJydcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZSA9IHtcclxuICAgICAgICBwYWdlWDogMCxcclxuICAgICAgICBwYWdlWTogMFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlSWQ6IDAsXHJcbiAgICAgICAgdG9wTGlzdDogW10sXHJcbiAgICAgICAgbGlzdDogW10sXHJcbiAgICAgICAgcmVzdGFydDogdHJ1ZSxcclxuICAgICAgICBpbnRyZToge31cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgc29ydCAoYXJyLCBrZXkgPSAnY190Jykge1xyXG4gICAg44CA44CAaWYgKGFyci5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyXHJcbiAgICAgICAgfVxyXG4gICAg44CA44CAbGV0IHBpdm90SW5kZXggPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKVxyXG4gICAg44CA44CAbGV0IHBpdm90ID0gYXJyLnNwbGljZShwaXZvdEluZGV4LCAxKVswXVxyXG4gICAg44CA44CAbGV0IGxlZnQgPSBbXVxyXG4gICAg44CA44CAbGV0IHJpZ2h0ID0gW11cclxuICAgIOOAgOOAgGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2YgYXJyLmVudHJpZXMoKSl7XHJcbiAgICDjgIDjgIDjgIDjgIBpZiAoaXRlbVtrZXldID4gcGl2b3Rba2V5XSkge1xyXG4gICAg44CA44CA44CA44CA44CA44CAbGVmdC5wdXNoKGl0ZW0pXHJcbiAgICDjgIDjgIDjgIDjgIB9IGVsc2Uge1xyXG4gICAg44CA44CA44CA44CA44CA44CAcmlnaHQucHVzaChpdGVtKVxyXG4gICAg44CA44CA44CA44CAfVxyXG4gICAg44CA44CAfVxyXG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zb3J0KGxlZnQpLCBwaXZvdCwgLi4udGhpcy5zb3J0KHJpZ2h0KV1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dBbGVydCgpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+WKn+iDveW8gOWPkeS4rS4uLid9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9JbnRlcmVzdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luLmhhcykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdpbnRlcmVzdD9pZD0nICsgdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlU3RhcnQgKHR5cGUsIGluZGV4LCBpdGVtLCBlKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zbGlkZSwgZS5jaGFuZ2VkVG91Y2hlc1swXSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlTW92ZSAodHlwZSwgaW5kZXgsIGl0ZW0sIGUpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBlLmNoYW5nZWRUb3VjaGVzWzBdXHJcbiAgICAgICAgICAgIGlmICh0ZW1wLnBhZ2VYIC0gdGhpcy5zbGlkZS5wYWdlWCA8IC0xMCAmJiBNYXRoLmFicyh0ZW1wLnBhZ2VZIC0gdGhpcy5zbGlkZS5wYWdlWSkgPCA4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSBpdGVtLl9pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wLnBhZ2VYIC0gdGhpcy5zbGlkZS5wYWdlWCA+IDEwICYmIE1hdGguYWJzKHRlbXAucGFnZVkgLSB0aGlzLnNsaWRlLnBhZ2VZKSA8IDgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJZCA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55IChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnY29tcGFueT9pZD0nICsgaWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ2hhdCAodHlwZSwgaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnNsaWRlSWQpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGl0ZW0ubnIpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBpdGVtLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICB9LCAnL0NoYXQvY2hhbmdlUmVhZCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3RbaW5kZXhdLm5yID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpbmRleF0ubnIgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0ID0gW11cclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNoYXQ/dHlwZT0xJnVzZXJJZD0ke3RoaXMubG9naW4udXNlcklkfSZtc2c9JHtKU09OLnN0cmluZ2lmeShpdGVtKX1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cFRvcCAodHlwZSwgaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IFtdXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wLnB1c2goaXRlbS5faWQpXHJcbiAgICAgICAgICAgICAgICBTZXQoJ3RvcENoYXQnLCB0aGlzLnRvcClcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy5saXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0LnVuc2hpZnQoaXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRoaXMuc29ydCh0aGlzLnRvcExpc3QpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0ZW1wXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgdmFsdWVdIG9mIHRoaXMudG9wLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBpdGVtLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgU2V0KCd0b3BDaGF0JywgdGhpcy50b3ApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMudG9wTGlzdFxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC51bnNoaWZ0KGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnNvcnQodGhpcy5saXN0KVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUl0ZW0gKHR5cGUsIGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogaXRlbS5faWQsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgIH0sICcvQ2hhdC9kZWxHcm91cCcpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG51bGxcclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy50b3BMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMubGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSGlkZSAoKSB7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC5jaGF0VXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNoYXQuZm9yRWFjaCgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdC5zb21lKChpdGVtKSA9PiBpdGVtLl9pZCA9PSByZXQuX2lkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1zXSBvZiB0aGlzLmxpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMuX2lkID09IHJldC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQubnIgPSBOdW1iZXIucGFyc2VJbnQoaXRlbXMubnIpICsgTnVtYmVyLnBhcnNlSW50KHJldC5ucilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1zLCByZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9wTGlzdC5zb21lKChpdGVtKSA9PiBpdGVtLl9pZCA9PSByZXQuX2lkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1zXSBvZiB0aGlzLnRvcExpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMuX2lkID09IHJldC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQubnIgPSBOdW1iZXIucGFyc2VJbnQoaXRlbXMubnIpICsgTnVtYmVyLnBhcnNlSW50KHJldC5ucilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1zLCByZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQuaXNUb3AgPSBcIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJJZCA9IHJldC5mXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe3VzZXJJZDogcmV0LmZ9LCAnL0NoYXQvZ2V0VXNlckluZm9CeUlkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmNoYXRVc2VyTmFtZSA9IGRhdGEubmlja25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5jaGF0VXNlckhlYWRlckltYWdlID0gZGF0YS5oZWFkZXJfaW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC51bnNoaWZ0KHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5zb3J0KHRoaXMubGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRoaXMuc29ydCh0aGlzLnRvcExpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UoKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHtkYXRhOiByZXR9ID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgICAgIHJldC5faWQgPSByZXQuZiA8IHJldC50ID8gcmV0LmYgKyAnJyArIHJldC50IDogcmV0LmYgKyAnJyArIHJldC50XHJcbiAgICAgICAgICAgICAgICByZXQuY190ID0gcmV0LmNfdCAqIDEwMDBcclxuICAgICAgICAgICAgICAgIHJldC50aW1lID0gZm9ybWF0VGltZShyZXQuY190KVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdC5zb21lKChpdGVtKSA9PiBpdGVtLl9pZCA9PSByZXQuX2lkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbXNdIG9mIHRoaXMubGlzdC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLl9pZCA9PSByZXQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5uciA9IE51bWJlci5wYXJzZUludChpdGVtcy5ucikgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1zLCByZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5zb3J0KHRoaXMubGlzdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50b3BMaXN0LnNvbWUoKGl0ZW0pID0+IGl0ZW0uX2lkID09IHJldC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtc10gb2YgdGhpcy50b3BMaXN0LmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMuX2lkID09IHJldC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLm5yID0gTnVtYmVyLnBhcnNlSW50KGl0ZW1zLm5yKSArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbXMsIHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3QgPSB0aGlzLnNvcnQodGhpcy50b3BMaXN0KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQubnIgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LmlzVG9wID0gXCIwXCJcclxuICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJJZCA9IHJldC5mXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7dXNlcklkOiByZXQuZn0sICcvQ2hhdC9nZXRVc2VySW5mb0J5SWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmNoYXRVc2VyTmFtZSA9IGRhdGEubmlja25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmNoYXRVc2VySGVhZGVySW1hZ2UgPSBkYXRhLmhlYWRlcl9pbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QudW5zaGlmdChyZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udXNlcklkID0gcmV0XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogcmV0LFxyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6IDFcclxuICAgICAgICAgICAgfSwgJy9DaGF0L2dldE5vUmVhZENvbGxlY3QnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuaW50cmUsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEdldCgndG9wQ2hhdCcpLnRoZW4oaW5uZXJSZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3AgPSBpbm5lclJldFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9wLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkczogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9DaGF0L2dldENoYXRHcm91cExpc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSBmb3JtYXRUaW1lKGl0ZW0uY190KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZHM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9DaGF0L2dldENoYXRHcm91cExpc3QnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkczogdGhpcy50b3Auam9pbignLCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3A6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvQ2hhdC9nZXRDaGF0R3JvdXBMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICBdKS50aGVuKChbe2RhdGE6IG5vcm1hbH0sIHtkYXRhOiB0b3B9XSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aW1lID0gZm9ybWF0VGltZShpdGVtLmNfdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jX3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IG5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3QgPSB0b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnVzZXJJZCA9ICcnXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnVzZXJJZCA9IHJldFxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHJldCxcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOiAxXHJcbiAgICAgICAgICAgIH0sICcvQ2hhdC9nZXROb1JlYWRDb2xsZWN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmludHJlLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucmVzdGFydFNvY2tldCh0aGlzLmxvZ2luLnVzZXJJZClcclxuICAgICAgICAgICAgR2V0KCd0b3BDaGF0JykudGhlbihpbm5lclJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IGlubmVyUmV0XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b3AubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWRzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Q2hhdEdyb3VwTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jX3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkczogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Q2hhdEdyb3VwTGlzdCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWRzOiB0aGlzLnRvcC5qb2luKCcsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RvcDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9DaGF0L2dldENoYXRHcm91cExpc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLnRoZW4oKFt7ZGF0YTogbm9ybWFsfSwge2RhdGE6IHRvcH1dKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSBmb3JtYXRUaW1lKGl0ZW0uY190KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWwuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aW1lID0gZm9ybWF0VGltZShpdGVtLmNfdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnVzZXJJZCA9ICcnXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==