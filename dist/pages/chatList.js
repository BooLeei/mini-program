'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _socket = require('./../utils/socket.js');

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
            list: []
        }, _this.methods = {
            slideStart: function slideStart(item, e) {
                Object.assign(this.slide, e.changedTouches[0]);
            },
            slideMove: function slideMove(item, e) {
                var temp = e.changedTouches[0];
                if (temp.pageX - this.slide.pageX < -10 && Math.abs(temp.pageY - this.slide.pageY) < 8) {
                    this.slideId = item._id;
                }
                if (temp.pageX - this.slide.pageX > 10 && Math.abs(temp.pageY - this.slide.pageY) < 8) {
                    this.slideId = 0;
                }
            },
            toChat: function toChat(item) {
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
                        item.nr = 0;
                        _this2.$apply();
                    });
                }
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
        key: 'onShow',
        value: function onShow() {
            var _this5 = this;

            (0, _socket.Receive)().then(function (_ref2) {
                var data = _ref2.data;

                (0, _log.log)(data);

                var _JSON$parse = JSON.parse(data),
                    ret = _JSON$parse.data;

                ret._id = ret.f < ret.t ? ret.f + '' + ret.t : ret.f + '' + ret.t;
                ret.c_t = ret.c_t * 1000;
                ret.time = (0, _formatTime.formatTime)(ret.c_t);
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
                                items.nr = Number.parseInt(items.nr) + 1;
                                Object.assign(items, ret);
                                _this5.$apply();
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
                                items.nr = Number.parseInt(items.nr) + 1;
                                Object.assign(items, ret);
                                _this5.$apply();
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
                    ret.nr = 1;
                    ret.isTop = "0";
                    ret.chatUserId = ret.f;
                    _this5.request.Get({ userId: ret.f }, '/Chat/getUserInfoById').then(function (_ref3) {
                        var data = _ref3.data;

                        ret.chatUserName = data.nickname;
                        ret.chatUserHeaderImage = data.header_image;
                        _this5.list.unshift(ret);
                        _this5.$apply();
                    });
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this6 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _this6.login.userId = ret;
                _this6.login.has = true;
                (0, _storage.Get)('topChat').then(function (innerRet) {
                    _this6.top = innerRet;
                    if (_this6.top.length === 0) {
                        _this6.request.Get({
                            groupIds: "",
                            isTop: 0,
                            page: 0,
                            pageSize: 0,
                            userId: _this6.login.userId
                        }, '/Chat/getChatGroupList').then(function (_ref4) {
                            var data = _ref4.data;

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
                        }, '/Chat/getChatGroupList')]).then(function (_ref5) {
                            var _ref6 = _slicedToArray(_ref5, 2),
                                normal = _ref6[0].data,
                                top = _ref6[1].data;

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
            }).catch(function (err) {
                _this6.login.userId = '';
                _this6.login.has = true;
            });
        }
    }]);

    return ChatList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ChatList , 'pages/chatList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRMaXN0LmpzIl0sIm5hbWVzIjpbIkNoYXRMaXN0IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJyZXF1ZXN0IiwidG9wIiwibG9naW4iLCJoYXMiLCJ1c2VySWQiLCJzbGlkZSIsInBhZ2VYIiwicGFnZVkiLCJkYXRhIiwiaGFzTG9naW4iLCJzbGlkZUlkIiwidG9wTGlzdCIsImxpc3QiLCJtZXRob2RzIiwic2xpZGVTdGFydCIsIml0ZW0iLCJlIiwiT2JqZWN0IiwiYXNzaWduIiwiY2hhbmdlZFRvdWNoZXMiLCJzbGlkZU1vdmUiLCJ0ZW1wIiwiTWF0aCIsImFicyIsIl9pZCIsInRvQ2hhdCIsIk51bWJlciIsInBhcnNlSW50IiwibnIiLCJHZXQiLCJncm91cElkIiwidGhlbiIsIiRhcHBseSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwidXBUb3AiLCJ0eXBlIiwiaW5kZXgiLCJwdXNoIiwic3BsaWNlIiwidW5zaGlmdCIsInNvcnQiLCJzZXRUaW1lb3V0IiwiZW50cmllcyIsInZhbHVlIiwicmVtb3ZlSXRlbSIsImFyciIsImtleSIsImxlbmd0aCIsInBpdm90SW5kZXgiLCJmbG9vciIsInBpdm90IiwibGVmdCIsInJpZ2h0IiwicGFyc2UiLCJyZXQiLCJmIiwidCIsImNfdCIsInRpbWUiLCJzb21lIiwiaXRlbXMiLCJpc1RvcCIsImNoYXRVc2VySWQiLCJjaGF0VXNlck5hbWUiLCJuaWNrbmFtZSIsImNoYXRVc2VySGVhZGVySW1hZ2UiLCJoZWFkZXJfaW1hZ2UiLCJpbm5lclJldCIsImdyb3VwSWRzIiwicGFnZSIsInBhZ2VTaXplIiwiZm9yRWFjaCIsIlByb21pc2UiLCJhbGwiLCJqb2luIiwibm9ybWFsIiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFF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O0FBQ0gsNkJBRkQ7QUFHQSxtQ0FBS2hELElBQUwsR0FBWWtFLE1BQVo7QUFDQSxtQ0FBS25FLE9BQUwsR0FBZVYsR0FBZjtBQUNBLG1DQUFLK0IsTUFBTDtBQUNILHlCQXpCRDtBQTBCSDtBQUNKLGlCQTdDRDtBQThDSCxhQWpERCxFQWlERytDLEtBakRILENBaURTLGVBQU87QUFDWix1QkFBSzdFLEtBQUwsQ0FBV0UsTUFBWCxHQUFvQixFQUFwQjtBQUNBLHVCQUFLRixLQUFMLENBQVdDLEdBQVgsR0FBaUIsSUFBakI7QUFDSCxhQXBERDtBQXFESDs7OztFQXpPaUMsZUFBS3FFLEk7O2tCQUF0QjVFLFEiLCJmaWxlIjoiY2hhdExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgUmVjZWl2ZX0gZnJvbSAnLi4vdXRpbHMvc29ja2V0J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge2Zvcm1hdFRpbWV9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCB7R2V0LCBTZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0TGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfogYrlpKnmtojmga8nXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICB0b3AgPSBbXVxyXG5cclxuICAgIGxvZ2luID0ge1xyXG4gICAgICAgIGhhczogZmFsc2UsXHJcbiAgICAgICAgdXNlcklkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlID0ge1xyXG4gICAgICAgIHBhZ2VYOiAwLFxyXG4gICAgICAgIHBhZ2VZOiAwXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBoYXNMb2dpbjogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVJZDogMCxcclxuICAgICAgICB0b3BMaXN0OiBbXSxcclxuICAgICAgICBsaXN0OiBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNvcnQgKGFyciwga2V5ID0gJ2NfdCcpIHtcclxuICAgIOOAgOOAgGlmIChhcnIubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyclxyXG4gICAgICAgIH1cclxuICAgIOOAgOOAgGxldCBwaXZvdEluZGV4ID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMilcclxuICAgIOOAgOOAgGxldCBwaXZvdCA9IGFyci5zcGxpY2UocGl2b3RJbmRleCwgMSlbMF1cclxuICAgIOOAgOOAgGxldCBsZWZ0ID0gW11cclxuICAgIOOAgOOAgGxldCByaWdodCA9IFtdXHJcbiAgICDjgIDjgIBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGFyci5lbnRyaWVzKCkpe1xyXG4gICAg44CA44CA44CA44CAaWYgKGl0ZW1ba2V5XSA+IHBpdm90W2tleV0pIHtcclxuICAgIOOAgOOAgOOAgOOAgOOAgOOAgGxlZnQucHVzaChpdGVtKVxyXG4gICAg44CA44CA44CA44CAfSBlbHNlIHtcclxuICAgIOOAgOOAgOOAgOOAgOOAgOOAgHJpZ2h0LnB1c2goaXRlbSlcclxuICAgIOOAgOOAgOOAgOOAgH1cclxuICAgIOOAgOOAgH1cclxuICAgICAgICByZXR1cm4gWy4uLnRoaXMuc29ydChsZWZ0KSwgcGl2b3QsIC4uLnRoaXMuc29ydChyaWdodCldXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzbGlkZVN0YXJ0IChpdGVtLCBlKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zbGlkZSwgZS5jaGFuZ2VkVG91Y2hlc1swXSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlTW92ZSAoaXRlbSwgZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cclxuICAgICAgICAgICAgaWYgKHRlbXAucGFnZVggLSB0aGlzLnNsaWRlLnBhZ2VYIDwgLTEwICYmIE1hdGguYWJzKHRlbXAucGFnZVkgLSB0aGlzLnNsaWRlLnBhZ2VZKSA8IDgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJZCA9IGl0ZW0uX2lkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRlbXAucGFnZVggLSB0aGlzLnNsaWRlLnBhZ2VYID4gMTAgJiYgTWF0aC5hYnModGVtcC5wYWdlWSAtIHRoaXMuc2xpZGUucGFnZVkpIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NoYXQgKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnNsaWRlSWQpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGl0ZW0ubnIpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBpdGVtLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICB9LCAnL0NoYXQvY2hhbmdlUmVhZCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5uciA9IDBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBjaGF0P3R5cGU9MSZ1c2VySWQ9JHt0aGlzLmxvZ2luLnVzZXJJZH0mbXNnPSR7SlNPTi5zdHJpbmdpZnkoaXRlbSl9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBUb3AgKHR5cGUsIGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJZCA9IDBcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBbXVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcC5wdXNoKGl0ZW0uX2lkKVxyXG4gICAgICAgICAgICAgICAgU2V0KCd0b3BDaGF0JywgdGhpcy50b3ApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMubGlzdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdC51bnNoaWZ0KGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExpc3QgPSB0aGlzLnNvcnQodGhpcy50b3BMaXN0KVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIHZhbHVlXSBvZiB0aGlzLnRvcC5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gaXRlbS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3Auc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFNldCgndG9wQ2hhdCcsIHRoaXMudG9wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIHRlbXAgPSB0aGlzLnRvcExpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QudW5zaGlmdChpdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5zb3J0KHRoaXMubGlzdClcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVJdGVtICh0eXBlLCBpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGl0ZW0uX2lkLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZFxyXG4gICAgICAgICAgICB9LCAnL0NoYXQvZGVsR3JvdXAnKVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBudWxsXHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZUlkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMudG9wTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9wTGlzdCA9IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSB0aGlzLmxpc3RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0ZW1wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIFJlY2VpdmUoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgIGxldCB7ZGF0YTogcmV0fSA9IEpTT04ucGFyc2UoZGF0YSlcclxuICAgICAgICAgICAgcmV0Ll9pZCA9IHJldC5mIDwgcmV0LnQgPyByZXQuZiArICcnICsgcmV0LnQgOiByZXQuZiArICcnICsgcmV0LnRcclxuICAgICAgICAgICAgcmV0LmNfdCA9IHJldC5jX3QgKiAxMDAwXHJcbiAgICAgICAgICAgIHJldC50aW1lID0gZm9ybWF0VGltZShyZXQuY190KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0LnNvbWUoKGl0ZW0pID0+IGl0ZW0uX2lkID09IHJldC5faWQpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1zXSBvZiB0aGlzLmxpc3QuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLl9pZCA9PSByZXQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLm5yID0gTnVtYmVyLnBhcnNlSW50KGl0ZW1zLm5yKSArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtcywgcmV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9wTGlzdC5zb21lKChpdGVtKSA9PiBpdGVtLl9pZCA9PSByZXQuX2lkKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtc10gb2YgdGhpcy50b3BMaXN0LmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5faWQgPT0gcmV0Ll9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5uciA9IE51bWJlci5wYXJzZUludChpdGVtcy5ucikgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbXMsIHJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldC5uciA9IDFcclxuICAgICAgICAgICAgICAgIHJldC5pc1RvcCA9IFwiMFwiXHJcbiAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJJZCA9IHJldC5mXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHt1c2VySWQ6IHJldC5mfSwgJy9DaGF0L2dldFVzZXJJbmZvQnlJZCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LmNoYXRVc2VyTmFtZSA9IGRhdGEubmlja25hbWVcclxuICAgICAgICAgICAgICAgICAgICByZXQuY2hhdFVzZXJIZWFkZXJJbWFnZSA9IGRhdGEuaGVhZGVyX2ltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnVuc2hpZnQocmV0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udXNlcklkID0gcmV0XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICBHZXQoJ3RvcENoYXQnKS50aGVuKGlubmVyUmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9wID0gaW5uZXJSZXRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvcC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZHM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvQ2hhdC9nZXRDaGF0R3JvdXBMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aW1lID0gZm9ybWF0VGltZShpdGVtLmNfdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWRzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvQ2hhdC9nZXRDaGF0R3JvdXBMaXN0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZHM6IHRoaXMudG9wLmpvaW4oJywnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9wOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL0NoYXQvZ2V0Q2hhdEdyb3VwTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgXSkudGhlbigoW3tkYXRhOiBub3JtYWx9LCB7ZGF0YTogdG9wfV0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jX3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRpbWUgPSBmb3JtYXRUaW1lKGl0ZW0uY190KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BMaXN0ID0gdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4udXNlcklkID0gJydcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5oYXMgPSB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=