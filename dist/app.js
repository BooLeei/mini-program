'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./utils/request.js');

var _request2 = _interopRequireDefault(_request);

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
            pages: ['pages/jobs', 'pages/mine', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/chatList', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/followCompany', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu'],
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

            console.log(_constants.QQMAPKEY);
            _wepy2.default.getLocation({
                success: function success(ret) {
                    _wepy2.default.request({
                        url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + ret.latitude + ',' + ret.longitude + '&key=' + _constants.QQMAPKEY,
                        success: function success(ret) {
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

            if (!_wepy2.default.getStorageSync('hotCity')) {
                setTimeout(function () {
                    _this2.Request.Get({ provinceId: -1 }, '/Region/getCityList').then(function (ret) {
                        return _wepy2.default.setStorageSync('hotCity', ret.data);
                    });
                }, 3000);
            }

            if (!_wepy2.default.getStorageSync('workList')) {
                setTimeout(function () {
                    _this2.Request.Get({}, '/Work/getWorkList').then(function (ret) {
                        return _wepy2.default.setStorageSync('workList', ret.data);
                    });
                }, 3500);
            }
            if (!_wepy2.default.getStorageSync('region')) {
                setTimeout(function () {
                    _this2.Request.special({}, '/region/getAllList').then(function (ret) {
                        return _wepy2.default.setStorageSync('region', ret);
                    });
                }, 4000);
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXF1ZXN0IiwidXJsIiwicmV0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJHZXQiLCJjaXR5TmFtZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJzdWJzdHIiLCJsZW5ndGgiLCJ0aGVuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRUaW1lb3V0IiwicHJvdmluY2VJZCIsInNldFN0b3JhZ2VTeW5jIiwic3BlY2lhbCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUErRUksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQTVFZkEsTUE0RWUsR0E1RU47QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsWUFGRyxFQUdILGNBSEcsRUFJSCxnQkFKRyxFQUtILG1CQUxHLEVBTUgsZ0JBTkcsRUFPSCxrQkFQRyxFQVFILGdCQVJHLEVBU0gsY0FURyxFQVVILGlCQVZHLEVBV0gsZUFYRyxFQVlILG1CQVpHLEVBYUgsbUJBYkcsRUFjSCxvQkFkRyxFQWVILHFCQWZHLEVBZ0JILGtCQWhCRyxFQWlCSCxrQkFqQkcsRUFrQkgsa0JBbEJHLENBREY7QUFxQkxDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLE1BSHBCO0FBSUpDLHdDQUF3QixPQUpwQjtBQUtKQyxpQ0FBaUIsU0FMYjtBQU1KQyx1Q0FBdUI7QUFObkIsYUFyQkg7QUE2QkxDLG9CQUFRO0FBQ0pDLHVCQUFPLE1BREg7QUFFSkMsK0JBQWUsU0FGWDtBQUdKQyw2QkFBYSxPQUhUO0FBSUpMLGlDQUFpQixNQUpiO0FBS0pNLHNCQUFNLENBQ0Y7QUFDSUMsOEJBQVUsWUFEZDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDhCQUFVLHNCQUhkO0FBSUlDLHNDQUFrQjtBQUp0QixpQkFERSxFQU1DO0FBQ0NILDhCQUFVLGdCQURYO0FBRUNDLDBCQUFNLElBRlA7QUFHQ0MsOEJBQVUsMEJBSFg7QUFJQ0Msc0NBQWtCO0FBSm5CLGlCQU5ELEVBV0M7QUFDQ0gsOEJBQVUsZ0JBRFg7QUFFQ0MsMEJBQU0sSUFGUDtBQUdDQyw4QkFBVSxxQkFIWDtBQUlDQyxzQ0FBa0I7QUFKbkIsaUJBWEQsRUFnQkM7QUFDQ0gsOEJBQVUsWUFEWDtBQUVDQywwQkFBTSxHQUZQO0FBR0NDLDhCQUFVLHNCQUhYO0FBSUNDLHNDQUFrQjtBQUpuQixpQkFoQkQ7QUFMRjtBQTdCSCxTQTRFTTtBQUFBLGNBaEJmQyxNQWdCZSxHQWhCTjtBQUNMQyxzQkFBVSxJQURMO0FBRUxDLHNCQUFVO0FBQ04sdUJBQU8sS0FERDtBQUVOLDZCQUFhLEdBRlA7QUFHTiwrQkFBZTtBQUhULGFBRkw7QUFPTEMsb0JBQVE7QUFDSiw4QkFBYyxHQURWO0FBRUosNkJBQWEsR0FGVDtBQUdKLCtCQUFlO0FBSFg7QUFQSCxTQWdCTTtBQUFBLGNBRmZDLE9BRWUsR0FGTCx1QkFFSzs7QUFFWCxjQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZXO0FBR2Q7Ozs7bUNBRVU7QUFBQTs7QUFDUEMsb0JBQVFDLEdBQVI7QUFDQSwyQkFBS0MsV0FBTCxDQUFpQjtBQUNiQyx5QkFBUyxzQkFBTztBQUNaLG1DQUFLQyxPQUFMLENBQWE7QUFDVEMsbUZBQXlEQyxJQUFJQyxRQUE3RCxTQUF5RUQsSUFBSUUsU0FBN0UsZ0NBRFM7QUFFVEwsaUNBQVMsc0JBQU87QUFDWixtQ0FBS0wsT0FBTCxDQUFhVyxHQUFiLENBQWlCO0FBQ2JDLDBDQUFVSixJQUFJSyxJQUFKLENBQVNDLE1BQVQsQ0FBZ0JDLGlCQUFoQixDQUFrQ0MsSUFBbEMsQ0FBdUNDLE1BQXZDLENBQThDLENBQTlDLEVBQWlEVCxJQUFJSyxJQUFKLENBQVNDLE1BQVQsQ0FBZ0JDLGlCQUFoQixDQUFrQ0MsSUFBbEMsQ0FBdUNFLE1BQXZDLEdBQWdELENBQWpHO0FBREcsNkJBQWpCLEVBRUcsNkJBRkgsRUFHQ0MsSUFIRCxDQUdNLGVBQU87QUFDVEMsdUNBQU9DLE1BQVAsQ0FBYyxPQUFLekIsTUFBTCxDQUFZRSxRQUExQixFQUFvQ1UsSUFBSUssSUFBeEM7QUFDQTtBQUNBLHVDQUFLakIsTUFBTCxDQUFZRSxRQUFaLENBQXFCd0IsR0FBckIsR0FBMkIsSUFBM0I7QUFDSCw2QkFQRDtBQVFIO0FBWFEscUJBQWI7QUFhSDtBQWZZLGFBQWpCOztBQWtCQSxnQkFBSSxDQUFDLGVBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBTCxFQUFxQztBQUNqQ0MsMkJBQVcsWUFBTTtBQUNiLDJCQUFLeEIsT0FBTCxDQUFhVyxHQUFiLENBQWlCLEVBQUNjLFlBQVksQ0FBQyxDQUFkLEVBQWpCLEVBQW1DLHFCQUFuQyxFQUNDTixJQURELENBQ007QUFBQSwrQkFBTyxlQUFLTyxjQUFMLENBQW9CLFNBQXBCLEVBQStCbEIsSUFBSUssSUFBbkMsQ0FBUDtBQUFBLHFCQUROO0FBRUgsaUJBSEQsRUFHRyxJQUhIO0FBSUg7O0FBRUQsZ0JBQUksQ0FBQyxlQUFLVSxjQUFMLENBQW9CLFVBQXBCLENBQUwsRUFBc0M7QUFDbENDLDJCQUFXLFlBQU07QUFDYiwyQkFBS3hCLE9BQUwsQ0FBYVcsR0FBYixDQUFpQixFQUFqQixFQUFxQixtQkFBckIsRUFDQ1EsSUFERCxDQUNNO0FBQUEsK0JBQU8sZUFBS08sY0FBTCxDQUFvQixVQUFwQixFQUFnQ2xCLElBQUlLLElBQXBDLENBQVA7QUFBQSxxQkFETjtBQUVILGlCQUhELEVBR0csSUFISDtBQUlIO0FBQ0QsZ0JBQUksQ0FBQyxlQUFLVSxjQUFMLENBQW9CLFFBQXBCLENBQUwsRUFBb0M7QUFDaENDLDJCQUFXLFlBQU07QUFDYiwyQkFBS3hCLE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUIsRUFBckIsRUFBeUIsb0JBQXpCLEVBQ0NSLElBREQsQ0FDTTtBQUFBLCtCQUFPLGVBQUtPLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEJsQixHQUE5QixDQUFQO0FBQUEscUJBRE47QUFFSCxpQkFIRCxFQUdHLElBSEg7QUFJSDtBQUNKOzs7b0NBRVdvQixFLEVBQUk7QUFDWixnQkFBTUMsT0FBTyxJQUFiO0FBQ0EsZ0JBQUksS0FBS2pDLE1BQUwsQ0FBWUMsUUFBaEIsRUFBMEI7QUFDdEIsdUJBQU8sS0FBS0QsTUFBTCxDQUFZQyxRQUFuQjtBQUNIO0FBQ0QsMkJBQUtpQyxXQUFMLENBQWlCO0FBQ2J6Qix1QkFEYSxtQkFDSjBCLEdBREksRUFDQztBQUNWRix5QkFBS2pDLE1BQUwsQ0FBWUMsUUFBWixHQUF1QmtDLElBQUlsQyxRQUEzQjtBQUNBK0IsMEJBQU1BLEdBQUdHLElBQUlsQyxRQUFQLENBQU47QUFDSDtBQUpZLGFBQWpCO0FBTUg7Ozs7RUF0SXdCLGVBQUttQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7IFFRTUFQS0VZIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvam9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9taW5lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21wYW55cycsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxSZWNvbWVuZCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9jaGF0TGlzdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy90b2dnbGVDaXR5JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NsYXNzaWZ5JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlYXJjaCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9qb2JEZXRhaWwnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueScsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxQcm9ncmVzcycsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxTaG9wSm9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9pbnRyb2R1Y3Rpb24nLFxyXG4gICAgICAgICAgICAncGFnZXMvZm9sbG93Q29tcGFueScsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtdGFnJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1leHAnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLWVkdSdcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflgaXouqvmsYLogYwnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjJmMmY1JyxcclxuICAgICAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJCYXI6IHtcclxuICAgICAgICAgICAgY29sb3I6ICcjYWFhJyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICBib3JkZXJTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2pvYnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfogYzkvY0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2pvYnMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NvbXBhbnlzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5YWs5Y+4JyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5raI5oGvJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvbXNnLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aIkScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvbWluZS10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbCA9IHtcclxuICAgICAgICB1c2VySW5mbzogbnVsbCxcclxuICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAnaGFzJzogZmFsc2UsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaG9vc2U6IHtcclxuICAgICAgICAgICAgJ3NlbGVjdFByb3YnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB9XHJcblxyXG4gICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coUVFNQVBLRVkpXHJcbiAgICAgICAgd2VweS5nZXRMb2NhdGlvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpcy5tYXAucXEuY29tL3dzL2dlb2NvZGVyL3YxLz9sb2NhdGlvbj0ke3JldC5sYXRpdHVkZX0sJHtyZXQubG9uZ2l0dWRlfSZrZXk9JHtRUU1BUEtFWX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5hbWU6IHJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5LnN1YnN0cigwLCByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1JlZ2lvbi9nZXRDaXR5SWRCeUNpdHlOYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwubG9jYXRpb24sIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbC5jaG9vc2UsIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwubG9jYXRpb24uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknKSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JykpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzNTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LnNwZWNpYWwoe30sICcvcmVnaW9uL2dldEFsbExpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicsIHJldCkpXHJcbiAgICAgICAgICAgIH0sIDQwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICBpZiAodGhpcy5nbG9iYWwudXNlckluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsLnVzZXJJbmZvXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==