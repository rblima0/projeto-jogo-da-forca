var createSprite = function(selector) {

    let $element = $(selector);
    let frames = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5', 'frame6', 'frame7', 'frame8', 'frame9'];
    let next = 0;
    let last = frames.length - 1;

    $element.addClass(frames[next]);

    var moveFrame = function(from, to) {
        $element.removeClass(from).addClass(to);
    };

    var hasNext = function() {
        return next + 1 <= last;
    };

    var nextFrame = function() {
        if(hasNext()) {
            moveFrame(frames[next], frames[++next]);
        }
    };

    var reset = function() {
        $element.removeClass(frames[next]).addClass(frames[0]);
        next = 0;
    };

    var isFinished = function() {
        return !hasNext();
    };

    return {
        nextFrame, reset, isFinished
    };
};