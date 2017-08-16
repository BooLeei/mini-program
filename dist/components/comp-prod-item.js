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

var CompProdItem = function (_wepy$component) {
    _inherits(CompProdItem, _wepy$component);

    function CompProdItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CompProdItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CompProdItem.__proto__ || Object.getPrototypeOf(CompProdItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            item: {
                type: Object,
                default: {}
            },
            showBtn: {
                type: Boolean,
                default: false
            },
            index: {
                type: Number,
                default: 0
            }
        }, _this.methods = {
            emitIndex: function emitIndex() {
                this.$emit('emitIndex', this.index);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return CompProdItem;
}(_wepy2.default.component);

exports.default = CompProdItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXAtcHJvZC1pdGVtLmpzIl0sIm5hbWVzIjpbIkNvbXBQcm9kSXRlbSIsInByb3BzIiwiaXRlbSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0Iiwic2hvd0J0biIsIkJvb2xlYW4iLCJpbmRleCIsIk51bWJlciIsIm1ldGhvZHMiLCJlbWl0SW5kZXgiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsSyxHQUFRO0FBQ0pDLGtCQUFNO0FBQ0ZDLHNCQUFNQyxNQURKO0FBRUZDLHlCQUFTO0FBRlAsYUFERjtBQUtKQyxxQkFBUztBQUNMSCxzQkFBTUksT0FERDtBQUVMRix5QkFBUztBQUZKLGFBTEw7QUFTSkcsbUJBQU87QUFDSEwsc0JBQU1NLE1BREg7QUFFSEoseUJBQVM7QUFGTjtBQVRILFMsUUFlUkssTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNPO0FBQ1QscUJBQUtDLEtBQUwsQ0FBVyxXQUFYLEVBQXdCLEtBQUtKLEtBQTdCO0FBQ0g7QUFISyxTOzs7O0VBaEI0QixlQUFLSyxTOztrQkFBMUJiLFkiLCJmaWxlIjoiY29tcC1wcm9kLWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBQcm9kSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0J0bjoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZW1pdEluZGV4ICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZW1pdEluZGV4JywgdGhpcy5pbmRleClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19