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
            pages: ['pages/jobs', 'pages/login', 'pages/mine', 'pages/chatList', 'pages/chat', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment', 'pages/simpleResume', 'pages/setting', 'pages/interest'],
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
            }
        };
        _this.Request = new _request2.default();

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
                console.log('open');
                (0, _socket.Init)(id);
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this3 = this;

            (0, _storage.Get)('userId').then(function (id) {
                _this3.restartSocket(id);
                (0, _socket.OnClose)().then(function () {
                    console.log('restart');
                    _this3.restartSocket(id);
                });
            });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImdldExvY2F0aW9uIiwic3VjY2VzcyIsInJlcXVlc3QiLCJ1cmwiLCJyZXQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJHZXQiLCJjaXR5TmFtZSIsInN1YnN0ciIsImxlbmd0aCIsInRoZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJoYXMiLCJjYXRjaCIsInNldFRpbWVvdXQiLCJwcm92aW5jZUlkIiwic2V0U3RvcmFnZVN5bmMiLCJzcGVjaWFsIiwiaWQiLCJjb25zb2xlIiwibG9nIiwicmVzdGFydFNvY2tldCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUF1Rkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQXBGZkEsTUFvRmUsR0FwRk47QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsYUFGRyxFQUdILFlBSEcsRUFJSCxnQkFKRyxFQUtILFlBTEcsRUFNSCxjQU5HLEVBT0gsZ0JBUEcsRUFRSCxtQkFSRyxFQVNI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QyxHQUFSLENBQVksU0FBWjtBQUNBLDJCQUFLQyxhQUFMLENBQW1CSCxFQUFuQjtBQUNILGlCQUhEO0FBSUgsYUFORDtBQU9IOzs7b0NBRVdJLEUsRUFBSTtBQUNaLGdCQUFNQyxPQUFPLElBQWI7QUFDQSxnQkFBSSxLQUFLbkMsTUFBTCxDQUFZQyxRQUFoQixFQUEwQjtBQUN0Qix1QkFBTyxLQUFLRCxNQUFMLENBQVlDLFFBQW5CO0FBQ0g7QUFDRCwyQkFBS21DLFdBQUwsQ0FBaUI7QUFDYjdCLHVCQURhLG1CQUNKOEIsR0FESSxFQUNDO0FBQ1ZGLHlCQUFLbkMsTUFBTCxDQUFZQyxRQUFaLEdBQXVCb0MsSUFBSXBDLFFBQTNCO0FBQ0FpQywwQkFBTUEsR0FBR0csSUFBSXBDLFFBQVAsQ0FBTjtBQUNIO0FBSlksYUFBakI7QUFNSDs7OztFQW5Ld0IsZUFBS3FDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHtHZXQsIFNldH0gZnJvbSAnLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQge0NyZWF0ZSwgT25PcGVuLCBJbml0LCBPbkNsb3NlLCBDbG9zZSwgU2VuZH0gZnJvbSAnLi91dGlscy9zb2NrZXQnXHJcbmltcG9ydCB7IFFRTUFQS0VZIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvam9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9sb2dpbicsXHJcbiAgICAgICAgICAgICdwYWdlcy9taW5lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXQnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbXBhbnlzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFJlY29tZW5kJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3RvZ2dsZUNpdHknLFxyXG4gICAgICAgICAgICAncGFnZXMvY2xhc3NpZnknLFxyXG4gICAgICAgICAgICAncGFnZXMvc2VhcmNoJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2pvYkRldGFpbCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21wYW55JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFByb2dyZXNzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFNob3BKb2JzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvZHVjdGlvbicsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtdGFnJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1leHAnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLWVkdScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb2xsZWN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZvbGxvdycsXHJcbiAgICAgICAgICAgICdwYWdlcy9wcm9ncmVzcycsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21tZW50JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NpbXBsZVJlc3VtZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9zZXR0aW5nJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ludGVyZXN0J1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WBpei6q+axguiBjCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMmYyZjUnLFxyXG4gICAgICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgICBjb2xvcjogJyNhYWEnLFxyXG4gICAgICAgICAgICBzZWxlY3RlZENvbG9yOiAnIzQwYzRmZicsXHJcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvam9icycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+iBjOS9jScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL2pvYnMtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY29tcGFueXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflhazlj7gnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9jb21wYW55cy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9jb21wYW55cy10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2hhdExpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmtojmga8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9tc2ctdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvbXNnLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9taW5lJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5oiRJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvbWluZS10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2xvYmFsID0ge1xyXG4gICAgICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICAgICdoYXMnOiBmYWxzZSxcclxuICAgICAgICAgICAgJ3JlZ2lvbl9pZCc6ICcwJyxcclxuICAgICAgICAgICAgJ3JlZ2lvbl9uYW1lJzogJ+WFqOWbvSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNob29zZToge1xyXG4gICAgICAgICAgICAnc2VsZWN0UHJvdic6ICcwJyxcclxuICAgICAgICAgICAgJ3JlZ2lvbl9pZCc6ICcwJyxcclxuICAgICAgICAgICAgJ3JlZ2lvbl9uYW1lJzogJ+WFqOWbvSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIH1cclxuXHJcbiAgICBvbkxhdW5jaCgpIHtcclxuICAgICAgICB3ZXB5LmdldExvY2F0aW9uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGlzLm1hcC5xcS5jb20vd3MvZ2VvY29kZXIvdjEvP2xvY2F0aW9uPSR7cmV0LmxhdGl0dWRlfSwke3JldC5sb25naXR1ZGV9JmtleT0ke1FRTUFQS0VZfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5TmFtZTogcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkuc3Vic3RyKDAsIHJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvUmVnaW9uL2dldENpdHlJZEJ5Q2l0eU5hbWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbC5sb2NhdGlvbiwgcmV0LmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmNob29zZSwgcmV0LmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbC5sb2NhdGlvbi5oYXMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd0b3BDaGF0JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBTZXQoJ3RvcENoYXQnLCBbXSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIEdldCgnaG90Q2l0eScpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtwcm92aW5jZUlkOiAtMX0sICcvUmVnaW9uL2dldENpdHlMaXN0JylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdob3RDaXR5JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd3b3JrTGlzdCcpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzNTAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCdyZWdpb24nKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LnNwZWNpYWwoe30sICcvcmVnaW9uL2dldEFsbExpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicsIHJldCkpXHJcbiAgICAgICAgICAgIH0sIDQwMDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXN0YXJ0U29ja2V0IChpZCkge1xyXG4gICAgICAgIENyZWF0ZSgpXHJcbiAgICAgICAgT25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcGVuJylcclxuICAgICAgICAgICAgSW5pdChpZClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKGlkID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgICAgICBPbkNsb3NlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdGFydCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRTb2NrZXQoaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbC51c2VySW5mb1xyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbC51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=