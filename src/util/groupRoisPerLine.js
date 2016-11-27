// we will sort the rois per line
// we need to regroup per line

module.exports=function groupRoisPerLine(rois, options={}) {
    var {
        allowedShift
    } = options;

    if (! allowedShift) { // we take the average height / 5
        var allowedShift=0;
        rois.forEach(a=>allowedShift+=a.height);
        allowedShift=Math.round(allowedShift/rois.length);
    }
    
    rois.sort(function(a,b) {
        return a.minX - b.minX
    });
    var lines=[];
    for (var roi of rois) {
        var x=roi.minX;
        var y=roi.minY;
        // is there a close line ?
        var currentLine=undefined;
        for (var line of lines) {
            if (Math.abs(line.y-y)<=allowedShift) {
                currentLine=line;
                break;
            }
        }
        if (! currentLine) {
            currentLine={rois:[]};
            lines.push(currentLine);
        }
        currentLine.y=y;
        currentLine.x=x;
        currentLine.rois.push(roi);
    }
    lines.sort( (a,b) => a.y - b.y);
    return lines;
}
