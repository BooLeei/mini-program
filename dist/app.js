'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _storage = require('./utils/storage.js');

var _socket = require('./utils/socket.js');

var _constants = require('./utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/jobs', 'pages/login', 'pages/mine', 'pages/chatList', 'pages/chat', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment', 'pages/simpleResume', 'pages/setting', 'pages/account-setting', 'pages/account-tel', 'pages/account-password', 'pages/allComment', 'pages/interest'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: '健身求职',
                navigationBarTextStyle: 'black',
                backgroundColor: '#f2f2f5',
                enablePullDownRefresh: true
            },
            tabBar: {
                color: '#aaa',
                selectedColor: '#40c4ff',
                borderStyle: 'black',
                backgroundColor: '#fff',
                list: [{
                    pagePath: 'pages/jobs',
                    text: '职位',
                    iconPath: './image/jobs-tab.png',
                    selectedIconPath: './image/jobs-tab-hl.png'
                }, {
                    pagePath: 'pages/companys',
                    text: '公司',
                    iconPath: './image/companys-tab.png',
                    selectedIconPath: './image/companys-tab-hl.png'
                }, {
                    pagePath: 'pages/chatList',
                    text: '消息',
                    iconPath: './image/msg-tab.png',
                    selectedIconPath: './image/msg-tab-hl.png'
                }, {
                    pagePath: 'pages/mine',
                    text: '我',
                    iconPath: './image/mine-tab.png',
                    selectedIconPath: './image/mine-tab-hl.png'
                }]
            }
        };
        _this.global = {
            userInfo: null,
            location: {
                'has': false,
                'region_id': '0',
                'region_name': '全国'
            },
            choose: {
                'selectProv': '0',
                'region_id': '0',
                'region_name': '全国'
            },
            initVal: 0,
            curVal: 0
        };
        _this.Request = new _request2.default();
        _this.intervalSocket = 0;

        _this.use('requestfix');
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            var _this2 = this;

            _wepy2.default.getLocation({
                success: function success(ret) {
                    _wepy2.default.request({
                        url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + ret.latitude + ',' + ret.longitude + '&key=' + _constants.QQMAPKEY,
                        success: function success(ret) {
                            if (!ret.data.result.address_component.city) {
                                return false;
                            }
                            _this2.Request.Get({
                                cityName: ret.data.result.address_component.city.substr(0, ret.data.result.address_component.city.length - 1)
                            }, '/Region/getCityIdByCityName').then(function (ret) {
                                Object.assign(_this2.global.location, ret.data);
                                // Object.assign(this.global.choose, ret.data)
                                _this2.global.location.has = true;
                            });
                        }
                    });
                }
            });
            (0, _storage.Get)('topChat').catch(function () {
                (0, _storage.Set)('topChat', []);
            });
            (0, _storage.Get)('hotCity').catch(function () {
                setTimeout(function () {
                    _this2.Request.Get({ provinceId: -1 }, '/Region/getCityList').then(function (ret) {
                        return _wepy2.default.setStorageSync('hotCity', ret.data);
                    });
                }, 3000);
            });
            (0, _storage.Get)('workList').catch(function () {
                setTimeout(function () {
                    _this2.Request.Get({}, '/Work/getWorkList').then(function (ret) {
                        return _wepy2.default.setStorageSync('workList', ret.data);
                    });
                }, 3500);
            });
            (0, _storage.Get)('region').catch(function () {
                setTimeout(function () {
                    _this2.Request.special({}, '/region/getAllList').then(function (ret) {
                        return _wepy2.default.setStorageSync('region', ret);
                    });
                }, 4000);
            });
        }
    }, {
        key: 'restartSocket',
        value: function restartSocket(id) {
            (0, _socket.Create)();
            (0, _socket.OnOpen)().then(function () {
                console.log('open success');
                (0, _socket.Init)(id);
            }).catch(function () {
                console.log('open fali');
            });
        }
    }, {
        key: 'keepSocket',
        value: function keepSocket(id) {
            var _this3 = this;

            this.restartSocket(id);
            this.intervalSocket = setInterval(function () {
                if (_this3.global.curVal != _this3.global.initVal) {
                    _this3.global.initVal = _this3.global.curVal;
                } else {
                    _this3.restartSocket(id);
                    _this3.global.initVal = _this3.global.curVal;
                }
            }, 50000);
        }
    }, {
        key: 'clearSocket',
        value: function clearSocket() {
            clearInterval(this.intervalSocket);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this4 = this;

            (0, _storage.Get)('userId').then(function (id) {
                _this4.keepSocket(id);
            }).catch(function () {});
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            var _this5 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _this5.clearSocket();
                _this5.global.initVal = 0;
                _this5.global.curVal = 0;
                (0, _socket.Close)().then(function () {
                    console.log('close success');
                }).catch(function () {
                    console.log('close fail');
                });
            }).catch(function () {});
        }
    }, {
        key: 'getUserInfo',
        value: function getUserInfo(cb) {
            var that = this;
            if (this.global.userInfo) {
                return this.global.userInfo;
            }
            _wepy2.default.getUserInfo({
                success: function success(res) {
                    that.global.userInfo = res.userInfo;
                    cb && cb(res.userInfo);
                }
            });
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiaW5pdFZhbCIsImN1clZhbCIsIlJlcXVlc3QiLCJpbnRlcnZhbFNvY2tldCIsInVzZSIsImdldExvY2F0aW9uIiwic3VjY2VzcyIsInJlcXVlc3QiLCJ1cmwiLCJyZXQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJHZXQiLCJjaXR5TmFtZSIsInN1YnN0ciIsImxlbmd0aCIsInRoZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJoYXMiLCJjYXRjaCIsInNldFRpbWVvdXQiLCJwcm92aW5jZUlkIiwic2V0U3RvcmFnZVN5bmMiLCJzcGVjaWFsIiwiaWQiLCJjb25zb2xlIiwibG9nIiwicmVzdGFydFNvY2tldCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImtlZXBTb2NrZXQiLCJjbGVhclNvY2tldCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUE2Rkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQTFGZkEsTUEwRmUsR0ExRk47QUFDTEMs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UCxLQUZILENBRVMsWUFBTTtBQUNYTSw0QkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDSCxpQkFKRDtBQUtILGFBVEQsRUFTR1AsS0FUSCxDQVNTLFlBQU0sQ0FBRSxDQVRqQjtBQVVIOzs7b0NBRVdhLEUsRUFBSTtBQUNaLGdCQUFNQyxPQUFPLElBQWI7QUFDQSxnQkFBSSxLQUFLMUMsTUFBTCxDQUFZQyxRQUFoQixFQUEwQjtBQUN0Qix1QkFBTyxLQUFLRCxNQUFMLENBQVlDLFFBQW5CO0FBQ0g7QUFDRCwyQkFBSzBDLFdBQUwsQ0FBaUI7QUFDYmpDLHVCQURhLG1CQUNKa0MsR0FESSxFQUNDO0FBQ1ZGLHlCQUFLMUMsTUFBTCxDQUFZQyxRQUFaLEdBQXVCMkMsSUFBSTNDLFFBQTNCO0FBQ0F3QywwQkFBTUEsR0FBR0csSUFBSTNDLFFBQVAsQ0FBTjtBQUNIO0FBSlksYUFBakI7QUFNSDs7OztFQXRNd0IsZUFBSzRDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHtHZXQsIFNldH0gZnJvbSAnLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQge0NyZWF0ZSwgT25PcGVuLCBJbml0LCBDbG9zZX0gZnJvbSAnLi91dGlscy9zb2NrZXQnXHJcbmltcG9ydCB7IFFRTUFQS0VZIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvam9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9sb2dpbicsXHJcbiAgICAgICAgICAgICdwYWdlcy9taW5lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXQnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbXBhbnlzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFJlY29tZW5kJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3RvZ2dsZUNpdHknLFxyXG4gICAgICAgICAgICAncGFnZXMvY2xhc3NpZnknLFxyXG4gICAgICAgICAgICAncGFnZXMvc2VhcmNoJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2pvYkRldGFpbCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21wYW55JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFByb2dyZXNzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFNob3BKb2JzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvZHVjdGlvbicsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtdGFnJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1leHAnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLWVkdScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb2xsZWN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZvbGxvdycsXHJcbiAgICAgICAgICAgICdwYWdlcy9wcm9ncmVzcycsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21tZW50JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NpbXBsZVJlc3VtZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9zZXR0aW5nJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnQtc2V0dGluZycsXHJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50LXRlbCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50LXBhc3N3b3JkJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbENvbW1lbnQnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW50ZXJlc3QnXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3aW5kb3c6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YGl6Lqr5rGC6IGMJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YyZjJmNScsXHJcbiAgICAgICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiQmFyOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAnI2FhYScsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9qb2JzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn6IGM5L2NJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jb21wYW55cycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WFrOWPuCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jaGF0TGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+a2iOaBrycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9tc2ctdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL21pbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmiJEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwgPSB7XHJcbiAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgJ2hhcyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hvb3NlOiB7XHJcbiAgICAgICAgICAgICdzZWxlY3RQcm92JzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdFZhbDogMCxcclxuICAgICAgICBjdXJWYWw6IDBcclxuICAgIH1cclxuXHJcbiAgICBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGF1bmNoKCkge1xyXG4gICAgICAgIHdlcHkuZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaXMubWFwLnFxLmNvbS93cy9nZW9jb2Rlci92MS8/bG9jYXRpb249JHtyZXQubGF0aXR1ZGV9LCR7cmV0LmxvbmdpdHVkZX0ma2V5PSR7UVFNQVBLRVl9YCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlOYW1lOiByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5zdWJzdHIoMCwgcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9SZWdpb24vZ2V0Q2l0eUlkQnlDaXR5TmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmxvY2F0aW9uLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwuY2hvb3NlLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsLmxvY2F0aW9uLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3RvcENoYXQnKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNldCgndG9wQ2hhdCcsIFtdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCdob3RDaXR5JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3dvcmtMaXN0JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe30sICcvV29yay9nZXRXb3JrTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygnd29ya0xpc3QnLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDM1MDApXHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3JlZ2lvbicpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygncmVnaW9uJywgcmV0KSlcclxuICAgICAgICAgICAgfSwgNDAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnRTb2NrZXQgKGlkKSB7XHJcbiAgICAgICAgQ3JlYXRlKClcclxuICAgICAgICBPbk9wZW4oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29wZW4gc3VjY2VzcycpXHJcbiAgICAgICAgICAgIEluaXQoaWQpXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbiBmYWxpJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGludGVydmFsU29ja2V0ID0gMFxyXG5cclxuICAgIGtlZXBTb2NrZXQgKGlkKSB7XHJcbiAgICAgICAgdGhpcy5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxTb2NrZXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbC5jdXJWYWwgIT0gdGhpcy5nbG9iYWwuaW5pdFZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IHRoaXMuZ2xvYmFsLmN1clZhbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IHRoaXMuZ2xvYmFsLmN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwMDApXHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTb2NrZXQgKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbFNvY2tldClcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2VlcFNvY2tldChpZClcclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7fSlcclxuICAgIH1cclxuXHJcbiAgICBvbkhpZGUgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU29ja2V0KClcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IDBcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWwuY3VyVmFsID0gMFxyXG4gICAgICAgICAgICBDbG9zZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nsb3NlIHN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UgZmFpbCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge30pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbC51c2VySW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWwudXNlckluZm9cclxuICAgICAgICB9XHJcbiAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nbG9iYWwudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19