'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _formatTime = require('./../utils/formatTime.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatItem = function (_wepy$component) {
    _inherits(ChatItem, _wepy$component);

    function ChatItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ChatItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatItem.__proto__ || Object.getPrototypeOf(ChatItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            listItem: {
                type: Object,
                default: {}
            },
            slideToggle: {
                type: Number,
                default: -1,
                twoWay: true
            },
            index: {
                type: Number,
                default: -1
            }
        }, _this.slide = {
            pageX: 0,
            pageY: 0

            // computed = {
            //     time () {
            //         return formatTime(this.listItem.c_t)
            //     }
            // }

        }, _this.methods = {
            slideStart: function slideStart(index, item, e) {
                Object.assign(this.slide, e.changedTouches[0]);
            },
            slideMove: function slideMove(index, item, e) {
                var temp = e.changedTouches[0];
                if (temp.pageX - this.slide.pageX < -10 && Math.abs(temp.pageY - this.slide.pageY) < 6) {
                    this.slideToggle = index;
                }
                if (temp.pageX - this.slide.pageX > 10 && Math.abs(temp.pageY - this.slide.pageY) < 6) {
                    this.slideToggle = -1;
                }
            },
            toChat: function toChat(index, item) {
                if (this.slideToggle != -1) {
                    this.slideToggle = -1;
                    return false;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ChatItem;
}(_wepy2.default.component);

exports.default = ChatItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQtaXRlbS5qcyJdLCJuYW1lcyI6WyJDaGF0SXRlbSIsInByb3BzIiwibGlzdEl0ZW0iLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsInNsaWRlVG9nZ2xlIiwiTnVtYmVyIiwidHdvV2F5IiwiaW5kZXgiLCJzbGlkZSIsInBhZ2VYIiwicGFnZVkiLCJtZXRob2RzIiwic2xpZGVTdGFydCIsIml0ZW0iLCJlIiwiYXNzaWduIiwiY2hhbmdlZFRvdWNoZXMiLCJzbGlkZU1vdmUiLCJ0ZW1wIiwiTWF0aCIsImFicyIsInRvQ2hhdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSyxHQUFRO0FBQ0pDLHNCQUFVO0FBQ05DLHNCQUFNQyxNQURBO0FBRU5DLHlCQUFTO0FBRkgsYUFETjtBQUtKQyx5QkFBYTtBQUNUSCxzQkFBTUksTUFERztBQUVURix5QkFBUyxDQUFDLENBRkQ7QUFHVEcsd0JBQVE7QUFIQyxhQUxUO0FBVUpDLG1CQUFPO0FBQ0hOLHNCQUFNSSxNQURIO0FBRUhGLHlCQUFTLENBQUM7QUFGUDtBQVZILFMsUUFnQlJLLEssR0FBUTtBQUNKQyxtQkFBTyxDQURIO0FBRUpDLG1CQUFPOztBQUdYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBVFEsUyxRQVdSQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ01MLEtBRE4sRUFDYU0sSUFEYixFQUNtQkMsQ0FEbkIsRUFDc0I7QUFDeEJaLHVCQUFPYSxNQUFQLENBQWMsS0FBS1AsS0FBbkIsRUFBMEJNLEVBQUVFLGNBQUYsQ0FBaUIsQ0FBakIsQ0FBMUI7QUFDSCxhQUhLO0FBSU5DLHFCQUpNLHFCQUlLVixLQUpMLEVBSVlNLElBSlosRUFJa0JDLENBSmxCLEVBSXFCO0FBQ3ZCLG9CQUFJSSxPQUFPSixFQUFFRSxjQUFGLENBQWlCLENBQWpCLENBQVg7QUFDQSxvQkFBSUUsS0FBS1QsS0FBTCxHQUFhLEtBQUtELEtBQUwsQ0FBV0MsS0FBeEIsR0FBZ0MsQ0FBQyxFQUFqQyxJQUF1Q1UsS0FBS0MsR0FBTCxDQUFTRixLQUFLUixLQUFMLEdBQWEsS0FBS0YsS0FBTCxDQUFXRSxLQUFqQyxJQUEwQyxDQUFyRixFQUF3RjtBQUNwRix5QkFBS04sV0FBTCxHQUFtQkcsS0FBbkI7QUFDSDtBQUNELG9CQUFJVyxLQUFLVCxLQUFMLEdBQWEsS0FBS0QsS0FBTCxDQUFXQyxLQUF4QixHQUFnQyxFQUFoQyxJQUFzQ1UsS0FBS0MsR0FBTCxDQUFTRixLQUFLUixLQUFMLEdBQWEsS0FBS0YsS0FBTCxDQUFXRSxLQUFqQyxJQUEwQyxDQUFwRixFQUF1RjtBQUNuRix5QkFBS04sV0FBTCxHQUFtQixDQUFDLENBQXBCO0FBQ0g7QUFDSixhQVpLO0FBYU5pQixrQkFiTSxrQkFhRWQsS0FiRixFQWFTTSxJQWJULEVBYWU7QUFDakIsb0JBQUksS0FBS1QsV0FBTCxJQUFvQixDQUFDLENBQXpCLEVBQTRCO0FBQ3hCLHlCQUFLQSxXQUFMLEdBQW1CLENBQUMsQ0FBcEI7QUFDQSwyQkFBTyxLQUFQO0FBQ0g7QUFFSjtBQW5CSyxTOzs7O0VBNUJ3QixlQUFLa0IsUzs7a0JBQXRCeEIsUSIsImZpbGUiOiJjaGF0LWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHtmb3JtYXRUaW1lfSBmcm9tICcuLi91dGlscy9mb3JtYXRUaW1lJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhdEl0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgICBsaXN0SXRlbToge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZVRvZ2dsZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogLTFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGUgPSB7XHJcbiAgICAgICAgcGFnZVg6IDAsXHJcbiAgICAgICAgcGFnZVk6IDBcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb21wdXRlZCA9IHtcclxuICAgIC8vICAgICB0aW1lICgpIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUodGhpcy5saXN0SXRlbS5jX3QpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2xpZGVTdGFydCAoaW5kZXgsIGl0ZW0sIGUpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNsaWRlLCBlLmNoYW5nZWRUb3VjaGVzWzBdKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVNb3ZlIChpbmRleCwgaXRlbSwgZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cclxuICAgICAgICAgICAgaWYgKHRlbXAucGFnZVggLSB0aGlzLnNsaWRlLnBhZ2VYIDwgLTEwICYmIE1hdGguYWJzKHRlbXAucGFnZVkgLSB0aGlzLnNsaWRlLnBhZ2VZKSA8IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUb2dnbGUgPSBpbmRleFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wLnBhZ2VYIC0gdGhpcy5zbGlkZS5wYWdlWCA+IDEwICYmIE1hdGguYWJzKHRlbXAucGFnZVkgLSB0aGlzLnNsaWRlLnBhZ2VZKSA8IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUb2dnbGUgPSAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NoYXQgKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlVG9nZ2xlICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVG9nZ2xlID0gLTFcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=