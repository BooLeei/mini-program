'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResumeExp = function (_wepy$page) {
    _inherits(ResumeExp, _wepy$page);

    function ResumeExp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResumeExp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResumeExp.__proto__ || Object.getPrototypeOf(ResumeExp)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '编辑工作经历',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.index = 0, _this.data = {
            slide: false,
            page: {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResumeExp, [{
        key: 'onLoad',
        value: function onLoad(_ref2) {
            var index = _ref2.index,
                msg = _ref2.msg;

            if (msg) {
                this.index = Number.parseInt(index);
                this.page = msg;
            }
        }
    }]);

    return ResumeExp;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ResumeExp , 'pages/resume-exp'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS1leHAuanMiXSwibmFtZXMiOlsiUmVzdW1lRXhwIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiaW5kZXgiLCJkYXRhIiwic2xpZGUiLCJwYWdlIiwibXNnIiwiTnVtYmVyIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsUUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxLLEdBQVEsQyxRQUVSQyxJLEdBQU87QUFDSEMsbUJBQU8sS0FESjtBQUVIQyxrQkFBTTtBQUZILFM7Ozs7O3NDQU9lO0FBQUEsZ0JBQWJILEtBQWEsU0FBYkEsS0FBYTtBQUFBLGdCQUFOSSxHQUFNLFNBQU5BLEdBQU07O0FBQ2xCLGdCQUFJQSxHQUFKLEVBQVM7QUFDTCxxQkFBS0osS0FBTCxHQUFhSyxPQUFPQyxRQUFQLENBQWdCTixLQUFoQixDQUFiO0FBQ0EscUJBQUtHLElBQUwsR0FBWUMsR0FBWjtBQUNIO0FBQ0o7Ozs7RUF0QmtDLGVBQUtELEk7O2tCQUF2QlQsUyIsImZpbGUiOiJyZXN1bWUtZXhwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWVFeHAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5bel5L2c57uP5Y6GJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAwXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBzbGlkZTogZmFsc2UsXHJcbiAgICAgICAgcGFnZToge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7aW5kZXgsIG1zZ30pIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IG1zZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=