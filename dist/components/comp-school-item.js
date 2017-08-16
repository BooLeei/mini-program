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

var CompSchoolItem = function (_wepy$component) {
    _inherits(CompSchoolItem, _wepy$component);

    function CompSchoolItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CompSchoolItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CompSchoolItem.__proto__ || Object.getPrototypeOf(CompSchoolItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
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

    return CompSchoolItem;
}(_wepy2.default.component);

exports.default = CompSchoolItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXAtc2Nob29sLWl0ZW0uanMiXSwibmFtZXMiOlsiQ29tcFNjaG9vbEl0ZW0iLCJwcm9wcyIsIml0ZW0iLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsInNob3dCdG4iLCJCb29sZWFuIiwiaW5kZXgiLCJOdW1iZXIiLCJtZXRob2RzIiwiZW1pdEluZGV4IiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OzswTUFDakJDLEssR0FBUTtBQUNKQyxrQkFBTTtBQUNGQyxzQkFBTUMsTUFESjtBQUVGQyx5QkFBUztBQUZQLGFBREY7QUFLSkMscUJBQVM7QUFDTEgsc0JBQU1JLE9BREQ7QUFFTEYseUJBQVM7QUFGSixhQUxMO0FBU0pHLG1CQUFPO0FBQ0hMLHNCQUFNTSxNQURIO0FBRUhKLHlCQUFTO0FBRk47QUFUSCxTLFFBZVJLLE8sR0FBVTtBQUNOQyxxQkFETSx1QkFDTztBQUNULHFCQUFLQyxLQUFMLENBQVcsV0FBWCxFQUF3QixLQUFLSixLQUE3QjtBQUNIO0FBSEssUzs7OztFQWhCOEIsZUFBS0ssUzs7a0JBQTVCYixjIiwiZmlsZSI6ImNvbXAtc2Nob29sLWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBTY2hvb2xJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93QnRuOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBlbWl0SW5kZXggKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdlbWl0SW5kZXgnLCB0aGlzLmluZGV4KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=