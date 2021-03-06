function landgrabber_draw(_66) {
    var ctx, actx;

    var _67 = document.getElementById("m_canvas");
    ctx = _67.getContext("2d");
    canvasWidth = $("visible_map_image").clientWidth;
    canvasHeight = $("visible_map_image").clientHeight;
    $("m_canvas").height = $("visible_map_image").clientHeight;
    $("m_canvas").width = $("visible_map_image").clientWidth;
    var _68 = document.getElementById("a_canvas");
    actx = _68.getContext("2d");
    canvasWidth = $("visible_map_image").clientWidth;
    canvasHeight = $("visible_map_image").clientHeight;
    $("a_canvas").height = $("visible_map_image").clientHeight;
    $("a_canvas").width = $("visible_map_image").clientWidth;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    actx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var ndx = 0; ndx < _66.length; ndx++) {
        var _6a = _66[ndx];
        var _6b = _6a.startPoint;
        var _6c = _6a.endPoint;
        if (_6a.oneWay) {
            var _6d = extendLine(_6b, _6c, -20);
            var _6e = extendLine(_6c, _6b, -10);
            drawArrow(_6e, _6d, "rgb(255,0,0)", "rgb(255,255,255)");
        } else {
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(_6b.x, _6b.y);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineTo(_6c.x, _6c.y);
            ctx.closePath();
            ctx.stroke();
            ctx.lineCap = "butt";
            ctx.beginPath();
            ctx.moveTo(_6b.x, _6b.y);
            ctx.strokeStyle = "#1c9c04";
            ctx.lineWidth = 1;
            ctx.lineTo(_6c.x, _6c.y);
            ctx.closePath();
            ctx.stroke();
        }
    }

}

function landgrabber_clearCanvas() {
    var ctx, actx, canvasWidth, canvasHeight;
    var $ = window.wrappedJSObject.$;

    var _67 = document.getElementById("m_canvas");
    ctx = _67.getContext("2d");
    canvasWidth = $("visible_map_image").clientWidth;
    canvasHeight = $("visible_map_image").clientHeight;
    $("m_canvas").height = $("visible_map_image").clientHeight;
    $("m_canvas").width = $("visible_map_image").clientWidth;
    var _68 = document.getElementById("a_canvas");
    actx = _68.getContext("2d");
    canvasWidth = $("visible_map_image").clientWidth;
    canvasHeight = $("visible_map_image").clientHeight;
    $("a_canvas").height = $("visible_map_image").clientHeight;
    $("a_canvas").width = $("visible_map_image").clientWidth;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    actx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function landgrabber_drawBorders (borderMap) {
    function landgrabber_draw(_66) {
        var ctx, actx, canvasWidth, canvasHeight;
        var $ = window.wrappedJSObject.$;

        var _67 = document.getElementById("m_canvas");
        ctx = _67.getContext("2d");
        canvasWidth = $("visible_map_image").clientWidth;
        canvasHeight = $("visible_map_image").clientHeight;
        $("m_canvas").height = $("visible_map_image").clientHeight;
        $("m_canvas").width = $("visible_map_image").clientWidth;
        var _68 = document.getElementById("a_canvas");
        actx = _68.getContext("2d");
        canvasWidth = $("visible_map_image").clientWidth;
        canvasHeight = $("visible_map_image").clientHeight;
        $("a_canvas").height = $("visible_map_image").clientHeight;
        $("a_canvas").width = $("visible_map_image").clientWidth;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        actx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var ndx = 0; ndx < _66.length; ndx++) {
            var _6a = _66[ndx];
            var _6b = _6a.startPoint;
            var _6c = _6a.endPoint;
            if (_6a.oneWay) {
                var _6d = extendLine(_6b, _6c, -20);
                var _6e = extendLine(_6c, _6b, -10);
                window.wrappedJSObject.drawArrow(_6e, _6d, "rgb(255,0,0)", "rgb(255,255,255)");
            } else {
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(_6b.x, _6b.y);
                ctx.lineWidth = 3;
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineTo(_6c.x, _6c.y);
                ctx.closePath();
                ctx.stroke();
                ctx.lineCap = "butt";
                ctx.beginPath();
                ctx.moveTo(_6b.x, _6b.y);
                ctx.strokeStyle = "#1c9c04";
                ctx.lineWidth = 1;
                ctx.lineTo(_6c.x, _6c.y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    
    }

    const childMap = {};
    [...document.getElementById("terrmap").children].forEach(c => {
        childMap[c.getAttribute("terrid")] = {
            id: c.getAttribute("terrid"),
            cx: c.getAttribute("center_x"),
            cy: c.getAttribute("center_y")
        }
    })
    let res = []
    for (terrId in borderMap) {
        let s = childMap[terrId]
        borderMap[terrId].forEach(n => {
        let neighbor = childMap[n]
        res.push({
            startPoint: { x: s.cx, y: s.cy },
            oneWay: false,
            endPoint: { x: neighbor.cx, y: neighbor.cy} 
        })
        })
    }
    landgrabber_draw(res)
}

exportFunction(landgrabber_drawBorders, window, {defineAs:'landgrabber_drawBorders'});
exportFunction(landgrabber_clearCanvas, window, { defineAs: 'landgrabber_clearCanvas'});

function landgrabber_showAllBorders (e) {
    if (e.target.checked) {
        window.wrappedJSObject.AjaxProxy.getAllBorders(window.wrappedJSObject.landgrabber_drawBorders)
    } else {
        console.log('clear canvas')
        window.wrappedJSObject.landgrabber_clearCanvas()
    }
}

const tr = document.createElement('tr')
tr.innerHTML = `<tr>
<td style="width:200px" nowrap="nowrap">
  <input type="checkbox" name="show_all_borders" id="show_all_borders"><label for="show_all_borders">Show all borders</label>
</td>
</tr>`

document.getElementsByClassName('control_panel_table')[0].appendChild(tr) 
document.getElementById('show_all_borders').addEventListener('click', landgrabber_showAllBorders)
