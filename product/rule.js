module.export.rule = function(time, duration, rainlevel, repeat) {}
{
    if(time == null)
        time = new Date();
    this.time = time;
    this.duration = duration;
    this.rainlevel = rainlevel;
    this.repeat = repeat;
}