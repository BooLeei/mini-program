'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleModalPopup = function (_wepy$component) {
    _inherits(SimpleModalPopup, _wepy$component);

    function SimpleModalPopup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleModalPopup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleModalPopup.__proto__ || Object.getPrototypeOf(SimpleModalPopup)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            }
        }, _this.methods = {
            hide: function hide() {
                this.show = !this.show;
            },
            stopPropagation: function stopPropagation() {
                return false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SimpleModalPopup;
}(_wepy2.default.component);

exports.default = SimpleModalPopup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC1wb3B1cC5qcyJdLCJuYW1lcyI6WyJTaW1wbGVNb2RhbFBvcHVwIiwicHJvcHMiLCJzaG93IiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidHdvV2F5IiwibWV0aG9kcyIsImhpZGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7Ozs7Ozs7Ozs7OE1BQ2pCQyxLLEdBQVE7QUFDSkMsa0JBQU07QUFDRkMsc0JBQU1DLE9BREo7QUFFRkMseUJBQVMsS0FGUDtBQUdGQyx3QkFBUTtBQUhOO0FBREYsUyxRQVFSQyxPLEdBQVU7QUFDTkMsZ0JBRE0sa0JBQ0U7QUFDSixxQkFBS04sSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDSCxhQUhLO0FBSU5PLDJCQUpNLDZCQUlhO0FBQ2YsdUJBQU8sS0FBUDtBQUNIO0FBTkssUzs7OztFQVRnQyxlQUFLQyxTOztrQkFBOUJWLGdCIiwiZmlsZSI6InNpbXBsZS1tb2RhbC1wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlTW9kYWxQb3B1cCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIHNob3c6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGhpZGUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wUHJvcGFnYXRpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19