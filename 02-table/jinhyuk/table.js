var table = {
    init : function(header){
        var tr = $('<tr>');
        for(var i in header) {
            var th = $('<th>').append(header[i]);
            tr.append(th);
        }
        $('#tbl').append(tr);
    },
    addRows : function(rows) {
        for(var i in rows) {
            var tr = $('<tr>');
            for(var j in rows[i]) {
                var td = $('<td>').html(rows[i][j]);
                tr.append(td);
            }
            $('#tbl').append(tr);
        }
    }
}

$(function() {
    var header = ['이름','나이'];
    var rows = [['park',10],['kim',5]];
    table.init(header);
    table.addRows(rows);
    
    $('#tbl').on('click', 'th', function() {
        // TODO
        // 1. click column find
        // 2-1. asc/desc 정렬
        // 2-2. asc/dec 정렬 표시
        // 3. 정렬된 기준으로 재배치
    });
});

