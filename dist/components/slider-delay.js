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

var SliderDelay = function (_wepy$component) {
    _inherits(SliderDelay, _wepy$component);

    function SliderDelay() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SliderDelay);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SliderDelay.__proto__ || Object.getPrototypeOf(SliderDelay)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            login: {
                type: Boolean,
                default: false
            }
        }, _this.data = {
            firstDuration: 500,
            secondDuration: 500,
            thirdDuration: 500,
            disabled: false,
            first: [],
            second: [],
            third: [],
            firstIndex: 0,
            secondIndex: 0,
            thirdIndex: 0
        }, _this.methods = {
            change: function change() {
                var _this2 = this;

                this.disabled = true;
                setTimeout(function () {
                    _this2.disabled = false;
                    _this2.$apply();
                }, 800);
                this.firstIndex--;
                setTimeout(function () {
                    _this2.secondIndex--;
                    _this2.$apply();
                }, 100);
                setTimeout(function () {
                    _this2.thirdIndex--;
                    _this2.$apply();
                }, 200);
            },
            stop: function stop() {
                return false;
            },
            firstchange: function firstchange(e) {
                var _this3 = this;

                if (e.detail.current === 0) {
                    this.firstDuration = 0;
                    setTimeout(function () {
                        _this3.firstIndex = _this3.first.length;
                        _this3.$apply();
                    }, 510);
                } else {
                    this.firstDuration = 500;
                }
            },
            secondchange: function secondchange(e) {
                var _this4 = this;

                if (e.detail.current === 0) {
                    this.secondDuration = 0;
                    setTimeout(function () {
                        _this4.secondIndex = _this4.second.length;
                        _this4.$apply();
                    }, 510);
                } else {
                    this.secondDuration = 500;
                }
            },
            thirdchange: function thirdchange(e) {
                var _this5 = this;

                if (e.detail.current === 0) {
                    this.thirdDuration = 0;
                    setTimeout(function () {
                        _this5.thirdIndex = _this5.third.length;
                        _this5.$apply();
                    }, 510);
                } else {
                    this.thirdDuration = 500;
                }
            },
            invokeData: function invokeData(_ref2) {
                var type = _ref2.type,
                    arr = _ref2.arr;

                if (type === 1) {
                    this.first = arr;
                    this.firstIndex = arr.length;
                } else if (type === 2) {
                    this.second = arr;
                    this.secondIndex = arr.length;
                } else if (type === 3) {
                    this.third = arr;
                    this.thirdIndex = arr.length;
                } else {
                    return;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SliderDelay;
}(_wepy2.default.component);

exports.default = SliderDelay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNsaWRlci1kZWxheS5qcyJdLCJuYW1lcyI6WyJTbGlkZXJEZWxheSIsInByb3BzIiwibG9naW4iLCJ0eXBlIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJkYXRhIiwiZmlyc3REdXJhdGlvbiIsInNlY29uZER1cmF0aW9uIiwidGhpcmREdXJhdGlvbiIsImRpc2FibGVkIiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsImZpcnN0SW5kZXgiLCJzZWNvbmRJbmRleCIsInRoaXJkSW5kZXgiLCJtZXRob2RzIiwiY2hhbmdlIiwic2V0VGltZW91dCIsIiRhcHBseSIsInN0b3AiLCJmaXJzdGNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwibGVuZ3RoIiwic2Vjb25kY2hhbmdlIiwidGhpcmRjaGFuZ2UiLCJpbnZva2VEYXRhIiwiYXJyIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxLLEdBQVE7QUFDSkMsbUJBQU87QUFDSEMsc0JBQU1DLE9BREg7QUFFSEMseUJBQVM7QUFGTjtBQURILFMsUUFPUkMsSSxHQUFPO0FBQ0hDLDJCQUFlLEdBRFo7QUFFSEMsNEJBQWdCLEdBRmI7QUFHSEMsMkJBQWUsR0FIWjtBQUlIQyxzQkFBVSxLQUpQO0FBS0hDLG1CQUFPLEVBTEo7QUFNSEMsb0JBQVEsRUFOTDtBQU9IQyxtQkFBTyxFQVBKO0FBUUhDLHdCQUFZLENBUlQ7QUFTSEMseUJBQWEsQ0FUVjtBQVVIQyx3QkFBWTtBQVZULFMsUUFhUEMsTyxHQUFVO0FBQ05DLGtCQURNLG9CQUNJO0FBQUE7O0FBQ04scUJBQUtSLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQVMsMkJBQVcsWUFBTTtBQUNiLDJCQUFLVCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsMkJBQUtVLE1BQUw7QUFDSCxpQkFIRCxFQUdHLEdBSEg7QUFJQSxxQkFBS04sVUFBTDtBQUNBSywyQkFBVyxZQUFNO0FBQ2IsMkJBQUtKLFdBQUw7QUFDQSwyQkFBS0ssTUFBTDtBQUNILGlCQUhELEVBR0csR0FISDtBQUlBRCwyQkFBVyxZQUFNO0FBQ2IsMkJBQUtILFVBQUw7QUFDQSwyQkFBS0ksTUFBTDtBQUNILGlCQUhELEVBR0csR0FISDtBQUlILGFBaEJLO0FBaUJOQyxnQkFqQk0sa0JBaUJFO0FBQ0osdUJBQU8sS0FBUDtBQUNILGFBbkJLO0FBb0JOQyx1QkFwQk0sdUJBb0JPQyxDQXBCUCxFQW9CVTtBQUFBOztBQUNaLG9CQUFJQSxFQUFFQyxNQUFGLENBQVNDLE9BQVQsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEIseUJBQUtsQixhQUFMLEdBQXFCLENBQXJCO0FBQ0FZLCtCQUFXLFlBQU07QUFDYiwrQkFBS0wsVUFBTCxHQUFrQixPQUFLSCxLQUFMLENBQVdlLE1BQTdCO0FBQ0EsK0JBQUtOLE1BQUw7QUFDSCxxQkFIRCxFQUdHLEdBSEg7QUFJSCxpQkFORCxNQU1PO0FBQ0gseUJBQUtiLGFBQUwsR0FBcUIsR0FBckI7QUFDSDtBQUNKLGFBOUJLO0FBK0JOb0Isd0JBL0JNLHdCQStCUUosQ0EvQlIsRUErQlc7QUFBQTs7QUFDYixvQkFBSUEsRUFBRUMsTUFBRixDQUFTQyxPQUFULEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLHlCQUFLakIsY0FBTCxHQUFzQixDQUF0QjtBQUNBVywrQkFBVyxZQUFNO0FBQ2IsK0JBQUtKLFdBQUwsR0FBbUIsT0FBS0gsTUFBTCxDQUFZYyxNQUEvQjtBQUNBLCtCQUFLTixNQUFMO0FBQ0gscUJBSEQsRUFHRyxHQUhIO0FBSUgsaUJBTkQsTUFNTztBQUNILHlCQUFLWixjQUFMLEdBQXNCLEdBQXRCO0FBQ0g7QUFDSixhQXpDSztBQTBDTm9CLHVCQTFDTSx1QkEwQ09MLENBMUNQLEVBMENVO0FBQUE7O0FBQ1osb0JBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsT0FBVCxLQUFxQixDQUF6QixFQUE0QjtBQUN4Qix5QkFBS2hCLGFBQUwsR0FBcUIsQ0FBckI7QUFDQVUsK0JBQVcsWUFBTTtBQUNiLCtCQUFLSCxVQUFMLEdBQWtCLE9BQUtILEtBQUwsQ0FBV2EsTUFBN0I7QUFDQSwrQkFBS04sTUFBTDtBQUNILHFCQUhELEVBR0csR0FISDtBQUlILGlCQU5ELE1BTU87QUFDSCx5QkFBS1gsYUFBTCxHQUFxQixHQUFyQjtBQUNIO0FBQ0osYUFwREs7QUFxRE5vQixzQkFyRE0sNkJBcURtQjtBQUFBLG9CQUFaMUIsSUFBWSxTQUFaQSxJQUFZO0FBQUEsb0JBQU4yQixHQUFNLFNBQU5BLEdBQU07O0FBQ3JCLG9CQUFJM0IsU0FBUyxDQUFiLEVBQWdCO0FBQ1oseUJBQUtRLEtBQUwsR0FBYW1CLEdBQWI7QUFDQSx5QkFBS2hCLFVBQUwsR0FBa0JnQixJQUFJSixNQUF0QjtBQUNILGlCQUhELE1BR08sSUFBSXZCLFNBQVMsQ0FBYixFQUFnQjtBQUNuQix5QkFBS1MsTUFBTCxHQUFja0IsR0FBZDtBQUNBLHlCQUFLZixXQUFMLEdBQW1CZSxJQUFJSixNQUF2QjtBQUNILGlCQUhNLE1BR0EsSUFBSXZCLFNBQVMsQ0FBYixFQUFnQjtBQUNuQix5QkFBS1UsS0FBTCxHQUFhaUIsR0FBYjtBQUNBLHlCQUFLZCxVQUFMLEdBQWtCYyxJQUFJSixNQUF0QjtBQUNILGlCQUhNLE1BR0E7QUFDSDtBQUNIO0FBQ0o7QUFsRUssUzs7OztFQXJCMkIsZUFBS0ssUzs7a0JBQXpCL0IsVyIsImZpbGUiOiJzbGlkZXItZGVsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlckRlbGF5IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgbG9naW46IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBmaXJzdER1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgc2Vjb25kRHVyYXRpb246IDUwMCxcclxuICAgICAgICB0aGlyZER1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgIGZpcnN0OiBbXSxcclxuICAgICAgICBzZWNvbmQ6IFtdLFxyXG4gICAgICAgIHRoaXJkOiBbXSxcclxuICAgICAgICBmaXJzdEluZGV4OiAwLFxyXG4gICAgICAgIHNlY29uZEluZGV4OiAwLFxyXG4gICAgICAgIHRoaXJkSW5kZXg6IDBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNoYW5nZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sIDgwMClcclxuICAgICAgICAgICAgdGhpcy5maXJzdEluZGV4LS1cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZEluZGV4LS1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhpcmRJbmRleC0tXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3AgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpcnN0Y2hhbmdlIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jdXJyZW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RHVyYXRpb24gPSAwXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0SW5kZXggPSB0aGlzLmZpcnN0Lmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0sIDUxMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REdXJhdGlvbiA9IDUwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWNvbmRjaGFuZ2UgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmN1cnJlbnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kRHVyYXRpb24gPSAwXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY29uZEluZGV4ID0gdGhpcy5zZWNvbmQubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSwgNTEwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmREdXJhdGlvbiA9IDUwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlyZGNoYW5nZSAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY3VycmVudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGlyZER1cmF0aW9uID0gMFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZEluZGV4ID0gdGhpcy50aGlyZC5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9LCA1MTApXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoaXJkRHVyYXRpb24gPSA1MDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW52b2tlRGF0YSAoe3R5cGUsIGFycn0pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBhcnJcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RJbmRleCA9IGFyci5sZW5ndGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZCA9IGFyclxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmRJbmRleCA9IGFyci5sZW5ndGhcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoaXJkID0gYXJyXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoaXJkSW5kZXggPSBhcnIubGVuZ3RoXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=