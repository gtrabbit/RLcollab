Game.Geometry = {
    getLine: function(startX, startY, endX, endY) {
        var points = [];
        var dx = Math.abs(endX - startX);
        var dy = Math.abs(endY - startY);
        var sx = (startX < endX) ? 1 : -1;
        var sy = (startY < endY) ? 1 : -1;
        var err = dx - dy;
        var e2;

        while (true) {
            points.push({x: startX, y: startY});
            if (startX == endX && startY == endY) {
                break;
            }
            e2 = err * 2;
            if (e2 > -dx) {
                err -= dy;
                startX += sx;
            }
            if (e2 < dx){
                err += dx;
                startY += sy;
            }
        }

        return points;
    }

    // getClosestTarget: function(map, point, radius){
    //     let leftX = point.x - radius;
    //     let topY = point.y - radius;
    //     let rightX = point.x + radius;
    //     let botY = point.y + radius;
    //     let x = point.x;
    //     let y = point.y;
    //     let z = point.z;
    //     let total = radius*radius;
    //     let count = 0;
    //     let target;
    //     while (!target || count < total){
    //         count++;
    //         target = map.getTile(x, y, z);
    //     }

//will come back to this some other day....
    // }
};