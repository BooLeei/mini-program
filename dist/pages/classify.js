'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Classify = function (_wepy$page) {
    _inherits(Classify, _wepy$page);

    function Classify() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Classify);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Classify.__proto__ || Object.getPrototypeOf(Classify)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '职位分类',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            loading: false,
            fadeIn: false,
            slide: false,
            firstLevel: [],
            secondLevel: [],
            secondIndex: 0,
            thirdLevel: []
        }, _this.methods = {
            slideBack: function slideBack() {
                this.slide = false;
                this.thirdLevel = [];
            },
            toDetail: function toDetail(index) {
                this.secondLevel = this.firstLevel[index].list;
                this.thirdLevel = this.secondLevel[0].skillList;
                this.secondIndex = 0;
                this.slide = true;
            },
            getCurrentTab: function getCurrentTab(index) {
                if (!this.secondLevel[index].skillList) {
                    this.thirdLevel = [];
                } else {
                    this.thirdLevel = this.secondLevel[index].skillList;
                }
                this.secondIndex = index;
            },
            select: function select(e) {
                if (e.target.dataset.content) {
                    _wepy2.default.redirectTo({
                        url: 'search?keyword=' + e.target.dataset.content
                    });
                }
            }
        }, _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default
        }, _this.request = new _request2.default(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Classify, [{
        key: 'onLoad',
        value: function onLoad(params, data) {
            var _this2 = this;

            var workList = _wepy2.default.getStorageSync('workList');
            if (workList) {
                workList = Promise.resolve({ data: workList });
            } else {
                this.loading = true;
                workList = this.request.Get({}, '/Work/getWorkList');
            }
            // workList = workList ? Promise.resolve(workList) : this.request.Get({}, '/Work/getWorkList')
            workList.then(function (_ref2) {
                var data = _ref2.data;

                _this2.firstLevel = data;
                _this2.loading = false;
                _this2.$apply();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.slide = false;
            this.secondIndex = 0;
        }
    }]);

    return Classify;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Classify , 'pages/classify'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzaWZ5LmpzIl0sIm5hbWVzIjpbIkNsYXNzaWZ5IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImxvYWRpbmciLCJmYWRlSW4iLCJzbGlkZSIsImZpcnN0TGV2ZWwiLCJzZWNvbmRMZXZlbCIsInNlY29uZEluZGV4IiwidGhpcmRMZXZlbCIsIm1ldGhvZHMiLCJzbGlkZUJhY2siLCJ0b0RldGFpbCIsImluZGV4IiwibGlzdCIsInNraWxsTGlzdCIsImdldEN1cnJlbnRUYWIiLCJzZWxlY3QiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImNvbnRlbnQiLCJyZWRpcmVjdFRvIiwidXJsIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyZXF1ZXN0IiwicGFyYW1zIiwid29ya0xpc3QiLCJnZXRTdG9yYWdlU3luYyIsIlByb21pc2UiLCJyZXNvbHZlIiwiR2V0IiwidGhlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFNVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMsb0JBQVEsS0FGTDtBQUdIQyxtQkFBTyxLQUhKO0FBSUhDLHdCQUFZLEVBSlQ7QUFLSEMseUJBQWEsRUFMVjtBQU1IQyx5QkFBYSxDQU5WO0FBT0hDLHdCQUFZO0FBUFQsUyxRQVVQQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ087QUFDVCxxQkFBS04sS0FBTCxHQUFhLEtBQWI7QUFDQSxxQkFBS0ksVUFBTCxHQUFrQixFQUFsQjtBQUNILGFBSks7QUFLTkcsb0JBTE0sb0JBS0lDLEtBTEosRUFLVztBQUNiLHFCQUFLTixXQUFMLEdBQW1CLEtBQUtELFVBQUwsQ0FBZ0JPLEtBQWhCLEVBQXVCQyxJQUExQztBQUNBLHFCQUFLTCxVQUFMLEdBQWtCLEtBQUtGLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JRLFNBQXRDO0FBQ0EscUJBQUtQLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxxQkFBS0gsS0FBTCxHQUFhLElBQWI7QUFDSCxhQVZLO0FBV05XLHlCQVhNLHlCQVdTSCxLQVhULEVBV2dCO0FBQ2xCLG9CQUFJLENBQUMsS0FBS04sV0FBTCxDQUFpQk0sS0FBakIsRUFBd0JFLFNBQTdCLEVBQXdDO0FBQ3BDLHlCQUFLTixVQUFMLEdBQWtCLEVBQWxCO0FBQ0gsaUJBRkQsTUFFTztBQUNILHlCQUFLQSxVQUFMLEdBQWtCLEtBQUtGLFdBQUwsQ0FBaUJNLEtBQWpCLEVBQXdCRSxTQUExQztBQUNIO0FBQ0QscUJBQUtQLFdBQUwsR0FBbUJLLEtBQW5CO0FBQ0gsYUFsQks7QUFtQk5JLGtCQW5CTSxrQkFtQkVDLENBbkJGLEVBbUJLO0FBQ1Asb0JBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsT0FBckIsRUFBOEI7QUFDMUIsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaURBQXVCTCxFQUFFQyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDO0FBRDVCLHFCQUFoQjtBQUdIO0FBQ0o7QUF6QkssUyxRQTRCWEcsTSxHQUFTLEVBQUMsV0FBVSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixTQUF0QyxFQUFYLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ047QUFETSxTLFFBSVZDLE8sR0FBVSx1Qjs7Ozs7K0JBRUZDLE0sRUFBUTFCLEksRUFBTTtBQUFBOztBQUNsQixnQkFBSTJCLFdBQVcsZUFBS0MsY0FBTCxDQUFvQixVQUFwQixDQUFmO0FBQ0EsZ0JBQUlELFFBQUosRUFBYztBQUNWQSwyQkFBV0UsUUFBUUMsT0FBUixDQUFnQixFQUFDOUIsTUFBTTJCLFFBQVAsRUFBaEIsQ0FBWDtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLMUIsT0FBTCxHQUFlLElBQWY7QUFDQTBCLDJCQUFXLEtBQUtGLE9BQUwsQ0FBYU0sR0FBYixDQUFpQixFQUFqQixFQUFxQixtQkFBckIsQ0FBWDtBQUNIO0FBQ0Q7QUFDQUoscUJBQVNLLElBQVQsQ0FBYyxpQkFBWTtBQUFBLG9CQUFWaEMsSUFBVSxTQUFWQSxJQUFVOztBQUN0Qix1QkFBS0ksVUFBTCxHQUFrQkosSUFBbEI7QUFDQSx1QkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSx1QkFBS2dDLE1BQUw7QUFDSCxhQUpEO0FBS0g7OzttQ0FFVztBQUNSLGlCQUFLOUIsS0FBTCxHQUFhLEtBQWI7QUFDQSxpQkFBS0csV0FBTCxHQUFtQixDQUFuQjtBQUNIOzs7O0VBeEVpQyxlQUFLNEIsSTs7a0JBQXRCeEMsUSIsImZpbGUiOiJjbGFzc2lmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgbG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzaWZ5IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBjOS9jeWIhuexuycsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBmYWRlSW46IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlOiBmYWxzZSxcclxuICAgICAgICBmaXJzdExldmVsOiBbXSxcclxuICAgICAgICBzZWNvbmRMZXZlbDogW10sXHJcbiAgICAgICAgc2Vjb25kSW5kZXg6IDAsXHJcbiAgICAgICAgdGhpcmRMZXZlbDogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNsaWRlQmFjayAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRoaXJkTGV2ZWwgPSBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9EZXRhaWwgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kTGV2ZWwgPSB0aGlzLmZpcnN0TGV2ZWxbaW5kZXhdLmxpc3RcclxuICAgICAgICAgICAgdGhpcy50aGlyZExldmVsID0gdGhpcy5zZWNvbmRMZXZlbFswXS5za2lsbExpc3RcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRJbmRleCA9IDBcclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEN1cnJlbnRUYWIgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWNvbmRMZXZlbFtpbmRleF0uc2tpbGxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoaXJkTGV2ZWwgPSBbXVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGlyZExldmVsID0gdGhpcy5zZWNvbmRMZXZlbFtpbmRleF0uc2tpbGxMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRJbmRleCA9IGluZGV4XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3QgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBzZWFyY2g/a2V5d29yZD0ke2UudGFyZ2V0LmRhdGFzZXQuY29udGVudH1gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IGxvYWRpbmdcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IHdvcmtMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKVxyXG4gICAgICAgIGlmICh3b3JrTGlzdCkge1xyXG4gICAgICAgICAgICB3b3JrTGlzdCA9IFByb21pc2UucmVzb2x2ZSh7ZGF0YTogd29ya0xpc3R9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgd29ya0xpc3QgPSB0aGlzLnJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB3b3JrTGlzdCA9IHdvcmtMaXN0ID8gUHJvbWlzZS5yZXNvbHZlKHdvcmtMaXN0KSA6IHRoaXMucmVxdWVzdC5HZXQoe30sICcvV29yay9nZXRXb3JrTGlzdCcpXHJcbiAgICAgICAgd29ya0xpc3QudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RMZXZlbCA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2Vjb25kSW5kZXggPSAwXHJcbiAgICB9XHJcbn1cclxuIl19