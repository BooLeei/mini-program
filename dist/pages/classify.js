'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.request = new _request2.default(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Classify, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this2.$parent.global.curVal = Number.parseInt(_this2.$parent.global.curVal) + 1;
                _this2.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params, data) {
            var _this3 = this;

            var workList = _wepy2.default.getStorageSync('workList');
            if (workList) {
                workList = Promise.resolve({ data: workList });
            } else {
                // this.loading = true
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                workList = this.request.Get({}, '/Work/getWorkList');
            }
            // workList = workList ? Promise.resolve(workList) : this.request.Get({}, '/Work/getWorkList')
            workList.then(function (_ref2) {
                var data = _ref2.data;

                _this3.firstLevel = data;
                // this.loading = false
                _wepy2.default.hideLoading();
                _this3.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzaWZ5LmpzIl0sIm5hbWVzIjpbIkNsYXNzaWZ5IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImxvYWRpbmciLCJmYWRlSW4iLCJzbGlkZSIsImZpcnN0TGV2ZWwiLCJzZWNvbmRMZXZlbCIsInNlY29uZEluZGV4IiwidGhpcmRMZXZlbCIsIm1ldGhvZHMiLCJzbGlkZUJhY2siLCJ0b0RldGFpbCIsImluZGV4IiwibGlzdCIsInNraWxsTGlzdCIsImdldEN1cnJlbnRUYWIiLCJzZWxlY3QiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImNvbnRlbnQiLCJyZWRpcmVjdFRvIiwidXJsIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyZXF1ZXN0IiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwicGFyYW1zIiwid29ya0xpc3QiLCJnZXRTdG9yYWdlU3luYyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJHZXQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFNVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMsb0JBQVEsS0FGTDtBQUdIQyxtQkFBTyxLQUhKO0FBSUhDLHdCQUFZLEVBSlQ7QUFL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ImZpbGUiOiJjbGFzc2lmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc2lmeSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfogYzkvY3liIbnsbsnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgZmFkZUluOiBmYWxzZSxcclxuICAgICAgICBzbGlkZTogZmFsc2UsXHJcbiAgICAgICAgZmlyc3RMZXZlbDogW10sXHJcbiAgICAgICAgc2Vjb25kTGV2ZWw6IFtdLFxyXG4gICAgICAgIHNlY29uZEluZGV4OiAwLFxyXG4gICAgICAgIHRoaXJkTGV2ZWw6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzbGlkZUJhY2sgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50aGlyZExldmVsID0gW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvRGV0YWlsIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlY29uZExldmVsID0gdGhpcy5maXJzdExldmVsW2luZGV4XS5saXN0XHJcbiAgICAgICAgICAgIHRoaXMudGhpcmRMZXZlbCA9IHRoaXMuc2Vjb25kTGV2ZWxbMF0uc2tpbGxMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kSW5kZXggPSAwXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGUgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRDdXJyZW50VGFiIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2Vjb25kTGV2ZWxbaW5kZXhdLnNraWxsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGlyZExldmVsID0gW11cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhpcmRMZXZlbCA9IHRoaXMuc2Vjb25kTGV2ZWxbaW5kZXhdLnNraWxsTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kSW5kZXggPSBpbmRleFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0IChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgc2VhcmNoP2tleXdvcmQ9JHtlLnRhcmdldC5kYXRhc2V0LmNvbnRlbnR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwibG9hZGluZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2xvYWRpbmcnOiBsb2FkaW5nLFxyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcywgZGF0YSkge1xyXG4gICAgICAgIGxldCB3b3JrTGlzdCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JylcclxuICAgICAgICBpZiAod29ya0xpc3QpIHtcclxuICAgICAgICAgICAgd29ya0xpc3QgPSBQcm9taXNlLnJlc29sdmUoe2RhdGE6IHdvcmtMaXN0fSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgICAgIHdvcmtMaXN0ID0gdGhpcy5yZXF1ZXN0LkdldCh7fSwgJy9Xb3JrL2dldFdvcmtMaXN0JylcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gd29ya0xpc3QgPSB3b3JrTGlzdCA/IFByb21pc2UucmVzb2x2ZSh3b3JrTGlzdCkgOiB0aGlzLnJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgIHdvcmtMaXN0LnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0TGV2ZWwgPSBkYXRhXHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWNvbmRJbmRleCA9IDBcclxuICAgIH1cclxufVxyXG4iXX0=