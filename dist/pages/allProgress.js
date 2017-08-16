'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _compProgress = require('./../components/comp-progress.js');

var _compProgress2 = _interopRequireDefault(_compProgress);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllProgress = function (_wepy$page) {
    _inherits(AllProgress, _wepy$page);

    function AllProgress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllProgress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllProgress.__proto__ || Object.getPrototypeOf(AllProgress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '全部历程',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            progress: null
        }, _this.request = new _request2.default(), _this.$props = { "progress": { "xmlns:v-bind": "", "v-bind:item.once": "item" } }, _this.$events = {}, _this.components = {
            'progress': _compProgress2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllProgress, [{
        key: 'onLoad',
        value: function onLoad(params) {
            var _this2 = this;

            this.request.Get({
                'userCompanyId': params.id
            }, '/CompanyProgress/getList').then(function (_ref2) {
                var data = _ref2.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        item.year = item.time.slice(0, 4);
                        item.month = item.time.slice(4, 6);
                        item.day = item.time.slice(6, 8);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                data[data.length - 1].last = true;
                _this2.progress = data;
                _this2.$apply();
            });
        }
    }]);

    return AllProgress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllProgress , 'pages/allProgress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIkFsbFByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInByb2dyZXNzIiwicmVxdWVzdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFyYW1zIiwiR2V0IiwiaWQiLCJ0aGVuIiwiaXRlbSIsInllYXIiLCJ0aW1lIiwic2xpY2UiLCJtb250aCIsImRheSIsImxlbmd0aCIsImxhc3QiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixNQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBTVRDLEksR0FBTztBQUNIQyxzQkFBVTtBQURQLFMsUUFJUEMsTyxHQUFVLHVCLFFBRVhDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsTUFBdEMsRUFBWixFLFFBQ1pDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOO0FBRE0sUzs7Ozs7K0JBSUZDLE0sRUFBUTtBQUFBOztBQUNaLGlCQUFLSixPQUFMLENBQWFLLEdBQWIsQ0FBaUI7QUFDYixpQ0FBaUJELE9BQU9FO0FBRFgsYUFBakIsRUFFRywwQkFGSCxFQUdDQyxJQUhELENBR00saUJBQVk7QUFBQSxvQkFBVlQsSUFBVSxTQUFWQSxJQUFVO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2QseUNBQWlCQSxJQUFqQiw4SEFBdUI7QUFBQSw0QkFBZFUsSUFBYzs7QUFDbkJBLDZCQUFLQyxJQUFMLEdBQVlELEtBQUtFLElBQUwsQ0FBVUMsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFaO0FBQ0FILDZCQUFLSSxLQUFMLEdBQWFKLEtBQUtFLElBQUwsQ0FBVUMsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFiO0FBQ0FILDZCQUFLSyxHQUFMLEdBQVdMLEtBQUtFLElBQUwsQ0FBVUMsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFYO0FBQ0g7QUFMYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1kYixxQkFBS0EsS0FBS2dCLE1BQUwsR0FBYyxDQUFuQixFQUFzQkMsSUFBdEIsR0FBNkIsSUFBN0I7QUFDQSx1QkFBS2hCLFFBQUwsR0FBZ0JELElBQWhCO0FBQ0EsdUJBQUtrQixNQUFMO0FBQ0gsYUFaRDtBQWFIOzs7O0VBakNvQyxlQUFLQyxJOztrQkFBekJ6QixXIiwiZmlsZSI6ImFsbFByb2dyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBQcm9ncmVzcyBmcm9tICcuLi9jb21wb25lbnRzL2NvbXAtcHJvZ3Jlc3MnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQcm9ncmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhajpg6jljobnqIsnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgcHJvZ3Jlc3M6IG51bGxcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgJHByb3BzID0ge1wicHJvZ3Jlc3NcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOml0ZW0ub25jZVwiOlwiaXRlbVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3Byb2dyZXNzJzogUHJvZ3Jlc3NcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZFxyXG4gICAgICAgIH0sICcvQ29tcGFueVByb2dyZXNzL2dldExpc3QnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnllYXIgPSBpdGVtLnRpbWUuc2xpY2UoMCwgNClcclxuICAgICAgICAgICAgICAgIGl0ZW0ubW9udGggPSBpdGVtLnRpbWUuc2xpY2UoNCwgNilcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGF5ID0gaXRlbS50aW1lLnNsaWNlKDYsIDgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YVtkYXRhLmxlbmd0aCAtIDFdLmxhc3QgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==