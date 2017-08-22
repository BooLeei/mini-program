'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _socket = require('./../utils/socket.js');

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_wepy$page) {
    _inherits(Chat, _wepy$page);

    function Chat() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Chat);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chat.__proto__ || Object.getPrototypeOf(Chat)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '聊天消息'
        }, _this.request = new _request2.default(), _this.userId = '', _this.data = {
            msg: {},
            cursor: 0,
            sendMsg: '',
            chatList: []
        }, _this.methods = {
            bindSendMsg: function bindSendMsg(e) {
                this.sendMsg = e.detail.value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Chat, [{
        key: 'getChatList',
        value: function getChatList() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

            return this.request.Get({
                groupId: this.msg._id,
                page: 1,
                pageSize: 15,
                userId: this.userId
            }, '/Chat/getListByGroupId');
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            (0, _socket.Receive)().then(function (_ref2) {
                var data = _ref2.data;

                (0, _log.log)(data);

                var _JSON$parse = JSON.parse(data),
                    ret = _JSON$parse.data;
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(_ref3) {
            var type = _ref3.type,
                userId = _ref3.userId,
                msg = _ref3.msg;

            msg = JSON.parse(msg);
            this.userId = userId;
            Object.assign(this.msg, msg);
            (0, _log.log)(type);
            (0, _log.log)(msg);
            _wepy2.default.setNavigationBarTitle({ title: msg.chatUserName });
            this.getChatList().then(function (_ref4) {
                var data = _ref4.data;

                (0, _log.log)(data);
            });
        }
    }]);

    return Chat;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chat , 'pages/chat'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiQ2hhdCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwicmVxdWVzdCIsInVzZXJJZCIsImRhdGEiLCJtc2ciLCJjdXJzb3IiLCJzZW5kTXNnIiwiY2hhdExpc3QiLCJtZXRob2RzIiwiYmluZFNlbmRNc2ciLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJwYWdlIiwicGFnZVNpemUiLCJHZXQiLCJncm91cElkIiwiX2lkIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInJldCIsInR5cGUiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsImNoYXRVc2VyTmFtZSIsImdldENoYXRMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFDVkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0hDLGlCQUFLLEVBREY7QUFFSEMsb0JBQVEsQ0FGTDtBQUdIQyxxQkFBUyxFQUhOO0FBSUhDLHNCQUFVO0FBSlAsUyxRQWdCUEMsTyxHQUFVO0FBQ05DLHVCQURNLHVCQUNPQyxDQURQLEVBQ1U7QUFDWixxQkFBS0osT0FBTCxHQUFlSSxFQUFFQyxNQUFGLENBQVNDLEtBQXhCO0FBQ0g7QUFISyxTOzs7OztzQ0FUNEI7QUFBQSxnQkFBekJDLElBQXlCLHVFQUFsQixDQUFrQjtBQUFBLGdCQUFmQyxRQUFlLHVFQUFKLEVBQUk7O0FBQ2xDLG1CQUFPLEtBQUtiLE9BQUwsQ0FBYWMsR0FBYixDQUFpQjtBQUNwQkMseUJBQVMsS0FBS1osR0FBTCxDQUFTYSxHQURFO0FBRXBCSixzQkFBTSxDQUZjO0FBR3BCQywwQkFBVSxFQUhVO0FBSXBCWix3QkFBUSxLQUFLQTtBQUpPLGFBQWpCLEVBS0osd0JBTEksQ0FBUDtBQU1IOzs7aUNBUVM7QUFDTixtQ0FBVWdCLElBQVYsQ0FBZSxpQkFBWTtBQUFBLG9CQUFWZixJQUFVLFNBQVZBLElBQVU7O0FBQ3ZCLDhCQUFJQSxJQUFKOztBQUR1QixrQ0FFTGdCLEtBQUtDLEtBQUwsQ0FBV2pCLElBQVgsQ0FGSztBQUFBLG9CQUVaa0IsR0FGWSxlQUVsQmxCLElBRmtCO0FBRzFCLGFBSEQ7QUFJSDs7O3NDQUU0QjtBQUFBLGdCQUFwQm1CLElBQW9CLFNBQXBCQSxJQUFvQjtBQUFBLGdCQUFkcEIsTUFBYyxTQUFkQSxNQUFjO0FBQUEsZ0JBQU5FLEdBQU0sU0FBTkEsR0FBTTs7QUFDekJBLGtCQUFNZSxLQUFLQyxLQUFMLENBQVdoQixHQUFYLENBQU47QUFDQSxpQkFBS0YsTUFBTCxHQUFjQSxNQUFkO0FBQ0FxQixtQkFBT0MsTUFBUCxDQUFjLEtBQUtwQixHQUFuQixFQUF3QkEsR0FBeEI7QUFDQSwwQkFBSWtCLElBQUo7QUFDQSwwQkFBSWxCLEdBQUo7QUFDQSwyQkFBS3FCLHFCQUFMLENBQTJCLEVBQUNDLE9BQU90QixJQUFJdUIsWUFBWixFQUEzQjtBQUNBLGlCQUFLQyxXQUFMLEdBQW1CVixJQUFuQixDQUF3QixpQkFBWTtBQUFBLG9CQUFWZixJQUFVLFNBQVZBLElBQVU7O0FBQ2hDLDhCQUFJQSxJQUFKO0FBQ0gsYUFGRDtBQUdIOzs7O0VBL0M2QixlQUFLVSxJOztrQkFBbEJoQixJIiwiZmlsZSI6ImNoYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHtSZWNlaXZlLCBTZW5kfSBmcm9tICcuLi91dGlscy9zb2NrZXQnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBiuWkqea2iOaBrydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG4gICAgdXNlcklkID0gJydcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbXNnOiB7fSxcclxuICAgICAgICBjdXJzb3I6IDAsXHJcbiAgICAgICAgc2VuZE1zZzogJycsXHJcbiAgICAgICAgY2hhdExpc3Q6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhdExpc3QgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDEyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICBncm91cElkOiB0aGlzLm1zZy5faWQsXHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiAxNSxcclxuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZFxyXG4gICAgICAgIH0sICcvQ2hhdC9nZXRMaXN0QnlHcm91cElkJylcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRTZW5kTXNnIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE1zZyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgUmVjZWl2ZSgpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgbGV0IHtkYXRhOiByZXR9ID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICh7dHlwZSwgdXNlcklkLCBtc2d9KSB7XHJcbiAgICAgICAgbXNnID0gSlNPTi5wYXJzZShtc2cpXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWRcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubXNnLCBtc2cpXHJcbiAgICAgICAgbG9nKHR5cGUpXHJcbiAgICAgICAgbG9nKG1zZylcclxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7dGl0bGU6IG1zZy5jaGF0VXNlck5hbWV9KVxyXG4gICAgICAgIHRoaXMuZ2V0Q2hhdExpc3QoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=