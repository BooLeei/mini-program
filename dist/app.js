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
            pages: ['pages/jobs', 'pages/mine', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/chatList', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/followCompany', 'pages/resume-tag', 'pages/resume-exp'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXF1ZXN0IiwidXJsIiwicmV0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJHZXQiLCJjaXR5TmFtZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJzdWJzdHIiLCJsZW5ndGgiLCJ0aGVuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRUaW1lb3V0IiwicHJvdmluY2VJZCIsInNldFN0b3JhZ2VTeW5jIiwic3BlY2lhbCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUE4RUksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQTNFZkEsTUEyRWUsR0EzRU47QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsWUFGRyxFQUdILGNBSEcsRUFJSCxnQkFKRyxFQUtILG1CQUxHLEVBTUgsZ0JBTkcsRUFPSCxrQkFQRyxFQVFILGdCQVJHLEVBU0gsY0FURyxFQVVILGlCQVZHLEVBV0gs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TTtBQUNiLDJCQUFLeEIsT0FBTCxDQUFhVyxHQUFiLENBQWlCLEVBQWpCLEVBQXFCLG1CQUFyQixFQUNDUSxJQURELENBQ007QUFBQSwrQkFBTyxlQUFLTyxjQUFMLENBQW9CLFVBQXBCLEVBQWdDbEIsSUFBSUssSUFBcEMsQ0FBUDtBQUFBLHFCQUROO0FBRUgsaUJBSEQsRUFHRyxJQUhIO0FBSUg7QUFDRCxnQkFBSSxDQUFDLGVBQUtVLGNBQUwsQ0FBb0IsUUFBcEIsQ0FBTCxFQUFvQztBQUNoQ0MsMkJBQVcsWUFBTTtBQUNiLDJCQUFLeEIsT0FBTCxDQUFhMkIsT0FBYixDQUFxQixFQUFyQixFQUF5QixvQkFBekIsRUFDQ1IsSUFERCxDQUNNO0FBQUEsK0JBQU8sZUFBS08sY0FBTCxDQUFvQixRQUFwQixFQUE4QmxCLEdBQTlCLENBQVA7QUFBQSxxQkFETjtBQUVILGlCQUhELEVBR0csSUFISDtBQUlIO0FBQ0o7OztvQ0FFV29CLEUsRUFBSTtBQUNaLGdCQUFNQyxPQUFPLElBQWI7QUFDQSxnQkFBSSxLQUFLakMsTUFBTCxDQUFZQyxRQUFoQixFQUEwQjtBQUN0Qix1QkFBTyxLQUFLRCxNQUFMLENBQVlDLFFBQW5CO0FBQ0g7QUFDRCwyQkFBS2lDLFdBQUwsQ0FBaUI7QUFDYnpCLHVCQURhLG1CQUNKMEIsR0FESSxFQUNDO0FBQ1ZGLHlCQUFLakMsTUFBTCxDQUFZQyxRQUFaLEdBQXVCa0MsSUFBSWxDLFFBQTNCO0FBQ0ErQiwwQkFBTUEsR0FBR0csSUFBSWxDLFFBQVAsQ0FBTjtBQUNIO0FBSlksYUFBakI7QUFNSDs7OztFQXJJd0IsZUFBS21DLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi91dGlscy9yZXF1ZXN0J1xuaW1wb3J0IHsgUVFNQVBLRVkgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBwYWdlczogW1xuICAgICAgICAgICAgJ3BhZ2VzL2pvYnMnLFxuICAgICAgICAgICAgJ3BhZ2VzL21pbmUnLFxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZScsXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueXMnLFxuICAgICAgICAgICAgJ3BhZ2VzL2FsbFJlY29tZW5kJyxcbiAgICAgICAgICAgICdwYWdlcy9jaGF0TGlzdCcsXG4gICAgICAgICAgICAncGFnZXMvdG9nZ2xlQ2l0eScsXG4gICAgICAgICAgICAncGFnZXMvY2xhc3NpZnknLFxuICAgICAgICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAgICAgICAncGFnZXMvam9iRGV0YWlsJyxcbiAgICAgICAgICAgICdwYWdlcy9jb21wYW55JyxcbiAgICAgICAgICAgICdwYWdlcy9hbGxQcm9ncmVzcycsXG4gICAgICAgICAgICAncGFnZXMvYWxsU2hvcEpvYnMnLFxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICAncGFnZXMvZm9sbG93Q29tcGFueScsXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLXRhZycsXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLWV4cCdcbiAgICAgICAgXSxcbiAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WBpei6q+axguiBjCcsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YyZjJmNScsXG4gICAgICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgdGFiQmFyOiB7XG4gICAgICAgICAgICBjb2xvcjogJyNhYWEnLFxuICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0MGM0ZmYnLFxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdibGFjaycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvam9icycsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfogYzkvY0nLFxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWItaGwucG5nJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jb21wYW55cycsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflhazlj7gnLFxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi1obC5wbmcnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NoYXRMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+a2iOaBrycsXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9tc2ctdGFiLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWItaGwucG5nJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9taW5lJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aIkScsXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi1obC5wbmcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFsID0ge1xuICAgICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICdoYXMnOiBmYWxzZSxcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xuICAgICAgICB9LFxuICAgICAgICBjaG9vc2U6IHtcbiAgICAgICAgICAgICdzZWxlY3RQcm92JzogJzAnLFxuICAgICAgICAgICAgJ3JlZ2lvbl9pZCc6ICcwJyxcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB9XG5cbiAgICBvbkxhdW5jaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coUVFNQVBLRVkpXG4gICAgICAgIHdlcHkuZ2V0TG9jYXRpb24oe1xuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaXMubWFwLnFxLmNvbS93cy9nZW9jb2Rlci92MS8/bG9jYXRpb249JHtyZXQubGF0aXR1ZGV9LCR7cmV0LmxvbmdpdHVkZX0ma2V5PSR7UVFNQVBLRVl9YCxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlOYW1lOiByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5zdWJzdHIoMCwgcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvUmVnaW9uL2dldENpdHlJZEJ5Q2l0eU5hbWUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmxvY2F0aW9uLCByZXQuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmNob29zZSwgcmV0LmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwubG9jYXRpb24uaGFzID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF3ZXB5LmdldFN0b3JhZ2VTeW5jKCdob3RDaXR5JykpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdob3RDaXR5JywgcmV0LmRhdGEpKVxuICAgICAgICAgICAgfSwgMzAwMClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LkdldCh7fSwgJy9Xb3JrL2dldFdvcmtMaXN0JylcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygnd29ya0xpc3QnLCByZXQuZGF0YSkpXG4gICAgICAgICAgICB9LCAzNTAwKVxuICAgICAgICB9XG4gICAgICAgIGlmICghd2VweS5nZXRTdG9yYWdlU3luYygncmVnaW9uJykpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5zcGVjaWFsKHt9LCAnL3JlZ2lvbi9nZXRBbGxMaXN0JylcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygncmVnaW9uJywgcmV0KSlcbiAgICAgICAgICAgIH0sIDQwMDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRVc2VySW5mbyhjYikge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgICBpZiAodGhpcy5nbG9iYWwudXNlckluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbC51c2VySW5mb1xuICAgICAgICB9XG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5nbG9iYWwudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19