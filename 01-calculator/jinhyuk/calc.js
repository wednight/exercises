var calc;

// 우선은 html 에 있던 스크립트를 옮기는 작업만 했습니다.
// 객체지향적으로 어떻게 해야할지 좀더 고민이 필요한거 같습니다..
(function() {
    var num = "";
    var calcWord = "";
    var numReg = new RegExp("[0-9]");
    var calcReg = new RegExp("[+-/*]");
    var etcReg = new RegExp("[=c]");

    calc = {
        buttons : [ "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*",
                "0", "=", "c", "/" ],
        createCalc : function($parent) {
            for ( var i in this.buttons) {
                var btn = $('<button>');
                btn.text(this.buttons[i]);
                btn.addClass('calc')
                $parent.append(btn);
            }
            this.initEvent();
        },
        getResult : function() {
            var ret = "";
            switch (calcWord) {
            case '+':
                ret = Number(num) + Number($('#inputNumber').val());
                break;
            case '-':
                ret = Number(num) - Number($('#inputNumber').val());
                break;
            case '*':
                ret = Number(num) * Number($('#inputNumber').val());
                break;
            case '/':
                ret = Number(num) / Number($('#inputNumber').val());
                break;
            default:
                initCalc(true);
            }
            $('#inputNumber').val(ret);
            this.initCalc();
        },
        initCalc : function(isValueClear) {
            num = [ "" ];
            calcWord = "";
            if (isValueClear) {
                $('#inputNumber').val("");
                $('input.viewSign').val("");
            }
        },
        buttonClickNonEval : function(value, eventType) {
            if (numReg.test(value)) {
                if (eventType == 'click') {
                    var text = $('#inputNumber').val() + value;
                    $('#inputNumber').val("").val(text).focus();
                }
            } else {
                $('input.viewSign').val(value);
                if (calcReg.test(value)) {
                    if (calcReg.test(calcWord)) {
                        calcWord = value;
                    } else {
                        num = $('#inputNumber').val();
                        $('#inputNumber').val("");
                        calcWord = value;
                    }
                } else if (value == 'c') {
                    this.initCalc(true);
                } else if (value == '=') {
                    this.getResult();
                }
            }
        },
        initEvent : function() {
            $ctl = this;
            $('body button').on('click', function(event) {
                $ctl.buttonClickNonEval($(this).text(), event.type);
            });

            $('#inputNumber').on(
                    'keydown',
                    function(event) {
                        // 뒤로가기 버튼 클릭시 동작
                        if (event.which == 8) {
                            return;
                        }

                        var inputWord = "";
                        if (numReg.test(String.fromCharCode(event.keyCode))) {
                            inputWord = String.fromCharCode(event.keyCode);
                        } else {
                            if (event.shiftKey && event.which == 187) {
                                inputWord = '+';
                            } else if (event.which == 189) {
                                inputWord = '-';
                            } else if (event.shiftKey && event.which == 56) {
                                inputWord = '*';
                            } else if (event.which == 191) {
                                inputWord = '/';
                            } else if ((!event.shiftKey && event.which == 187)
                                    || event.which == 13) {
                                inputWord = '=';
                            } else if (event.shiftKey && event.which == 67) {
                                inputWord = 'c';
                            } else {
                                // 1. event.stopPropagation(); -- 상위로 이벤트 전파를 막음
                                // 2. event.preventDefault(); -- 이벤트의 기본동작을 중단
                                // 3. event.stopImmediatePropagation(); -- 상위 뿐만
                                // 아니라 현재
                                // 레벨에 걸린 다른 이벤트 중단
                                // jquery 에서 return false 는 위 1,2 번 모두 동작을함,
                                // jquery 가
                                // 아닐경우 preventDefault 만 동작하게됨
                                return false;
                            }
                            // 기본이벤트(input 태그 텍스트 추가 focus 젤뒤로 이동 등) 중단
                            event.preventDefault();
                        }
                        $ctl.buttonClickNonEval(inputWord);
                    })
        }
    }

})();
