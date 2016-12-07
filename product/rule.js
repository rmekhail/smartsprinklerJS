module.exports = rule = function(time, duration, rainLevel, repeat) {
    if(time == null)
        time = new Date();
    this.time = time;
    this.duration = duration;
    this.rainlevel = rainLevel;
    this.repeat = repeat;
}