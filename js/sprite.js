const createSprite = selector => {

    const $element = $(selector);
    const frames = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5', 'frame6', 'frame7', 'frame8', 'frame9'];
    let next = 0;
    const last = frames.length - 1;

    $element.addClass(frames[next]);

    const moveFrame = (from, to) => {
        $element.removeClass(from).addClass(to);
    };

    const hasNext = () => next + 1 <= last;

    const nextFrame = () => {
        if(hasNext()) {
            moveFrame(frames[next], frames[++next]);
        }
    };

    const reset = () => {
        $element.removeClass(frames[next]).addClass(frames[0]);
        next = 0;
    };

    const isFinished = () => !hasNext();

    return {
        nextFrame, reset, isFinished
    };
};