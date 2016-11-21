
var Random = {
    integer:  function(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    real: function(min, max) {
                        return Math.random() * (max - min) + min;
    },
    boolean: function() {
                    var randombinary = this.integer(0,1);
                    return randombinary == 1;
    },
    date: function() {
                var datetime = this.integer(1900, 2100) 
                    + "-"
                    + this.integer(1, 12)
                    + "-"
                    + this.integer(1, 30)
                    + "T"
                    + this.integer(0, 23)
                    + ":"
                    + this.integer(0, 59)
                    + ":"
                    + this.integer(0, 59);
                    return datetime;
    }
};

module.exports = Random;