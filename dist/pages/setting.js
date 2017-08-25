'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _socket = require('./../utils/socket.js');

var _storage = require('./../utils/storage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Setting = function (_wepy$page) {
    _inherits(Setting, _wepy$page);

    function Setting() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Setting);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Setting.__proto__ || Object.getPrototypeOf(Setting)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '我的设置',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            quit: function quit() {
                this.$parent.clearSocket();
                Promise.all([(0, _storage.Remove)('userId'), (0, _storage.Remove)('userImg'), (0, _socket.Close)()]).then(function () {
                    _wepy2.default.reLaunch({ url: 'jobs' });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Setting, [{
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
    }]);

    return Setting;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Setting , 'pages/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsiU2V0dGluZyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwicXVpdCIsIiRwYXJlbnQiLCJjbGVhclNvY2tldCIsIlByb21pc2UiLCJhbGwiLCJ0aGVuIiwicmVMYXVuY2giLCJ1cmwiLCJkYXRhIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsImdsb2JhbCIsImN1clZhbCIsIk51bWJlciIsInBhcnNlSW50IiwidG9hc3QiLCJjb250ZW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVEMsVSxHQUFhO0FBQ1Q7QUFEUyxTLFFBZWJDLE8sR0FBVTtBQUNOQyxnQkFETSxrQkFDRTtBQUNKLHFCQUFLQyxPQUFMLENBQWFDLFdBQWI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxDQUFDLHFCQUFPLFFBQVAsQ0FBRCxFQUFtQixxQkFBTyxTQUFQLENBQW5CLEVBQXNDLG9CQUF0QyxDQUFaLEVBQ0NDLElBREQsQ0FDTSxZQUFNO0FBQ1IsbUNBQUtDLFFBQUwsQ0FBYyxFQUFDQyxLQUFLLE1BQU4sRUFBZDtBQUNILGlCQUhEO0FBSUg7QUFQSyxTOzs7OztnQ0FYUTtBQUFBLGdCQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQ2QsaUJBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DRCxJQUFuQztBQUNIOzs7aUNBRVM7QUFBQTs7QUFDTiwyQkFBS0UsZUFBTCxDQUFxQixlQUFPO0FBQ3hCLHVCQUFLVCxPQUFMLENBQWFVLE1BQWIsQ0FBb0JDLE1BQXBCLEdBQTZCQyxPQUFPQyxRQUFQLENBQWdCLE9BQUtiLE9BQUwsQ0FBYVUsTUFBYixDQUFvQkMsTUFBcEMsSUFBOEMsQ0FBM0U7QUFDQSx1QkFBS0csS0FBTCxDQUFXLEVBQUNDLFNBQVMsT0FBVixFQUFYO0FBQ0gsYUFIRDtBQUlIOzs7O0VBckJnQyxlQUFLQyxJOztrQkFBckJ6QixPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCB7Q2xvc2V9IGZyb20gJy4uL3V0aWxzL3NvY2tldCdcclxuaW1wb3J0IHsgUmVtb3ZlLCBDbGVhciB9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuvue9ricsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHF1aXQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xlYXJTb2NrZXQoKVxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbUmVtb3ZlKCd1c2VySWQnKSwgUmVtb3ZlKCd1c2VySW1nJyksIENsb3NlKCldKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICdqb2JzJ30pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==