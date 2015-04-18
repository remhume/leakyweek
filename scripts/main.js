var LEAKYWEEK = {};

PLAYGROUND.Transitions.enabled = true;
PLAYGROUND.Transitions.preferred = PLAYGROUND.Transitions.Split;
PLAYGROUND.Transitions.prototype.postrender = function(){
    if (this.progress >= 1) return;

    if(PLAYGROUND.Transitions.enabled){
        PLAYGROUND.Transitions.preferred(this, this.progress);
    }
}

playground({
    width: 900,
    height: 600,
    scale: 1,
    smoothing: false,
    create: function(){
        this.loadImage("title");
    },
    ready: function(){
        this.setState(LEAKYWEEK.title);
    }
});

LEAKYWEEK.title = {
    enter: function(){
        
    },
    render: function(){
        var title = this.app.images.title;
        this.app.layer.clear('#333')
            .drawImage(title, (this.app.width-title.width)/2, 0);
    }
};