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
        this.loadAtlas("floor");

        for(var k in LEAKYWEEK.SCENARIOS) {
            this.loadImage(LEAKYWEEK.SCENARIOS[k].thumbnail);
        }
    },
    ready: function(){
        this.setState(LEAKYWEEK.title);
    }
});

LEAKYWEEK.SCENARIOS = {};

LEAKYWEEK.addScenario = function(s) {
    LEAKYWEEK.SCENARIOS[s.id] = s;
}

LEAKYWEEK.days = {};

LEAKYWEEK.title = {
    enter: function(){
        this.selection = 0;
        this.setSelectionY = function(){
            this.app.tween(this)
                .to({selectionY: 275 + LEAKYWEEK.SCENARIOS[this.selection].id * 90}, 0.25);
        };
        this.selectionY = 275 + LEAKYWEEK.SCENARIOS[this.selection].id * 90;
    },
    render: function(){
        var title = this.app.images.title;
        this.app.layer.clear('#333')
            .drawImage(title, (this.app.width-title.width)/2, 0)
            .textAlign('left')
            .fillStyle("#ff00ff")
            .fillRect((this.app.width-200)/2, this.app.height-110, 200, 70);

        this.app.layer.fillStyle("#666").fillRect((this.app.width-300)/2-10, this.selectionY, 400, 70);
        for(var i in LEAKYWEEK.SCENARIOS) {            
            var s = LEAKYWEEK.SCENARIOS[i];
            this.app.layer
                  .drawImage(this.app.images[s.thumbnail], (this.app.width-300)/2, 285+s.id*90)
                  .fillStyle("#f0f0f0")
                  .font("15pt Monospace")
                  .textAlign("left")
                  .fillText(s.title, (this.app.width-150)/2+60, 300+s.id*90)
                  .font("12pt sans")
                  .fillText(s.description, (this.app.width-150)/2+60, 330+s.id*90);
        }
    },
    mousedown: function(data) {
        if(data.button === 'left') {
            for(var i in LEAKYWEEK.SCENARIOS) {
                var index = LEAKYWEEK.SCENARIOS[i].id;
                if((data.x >= (this.app.width-300)/2-10) && (data.x <= (this.app.width-300)/2+390) && (data.y >= 275+index*90) && (data.y <= 275+index*90+70)) {
                    this.selection = index;
                    this.setSelectionY();
                    console.log("ping");
                }
            }
        }
    },
    keydown: function(data) {
        switch(data.key){
            case "down":
                this.selection = Math.min(this.selection+1, Object.keys(LEAKYWEEK.SCENARIOS).length-1);
                this.setSelectionY();
                break;
            case "up":
                this.selection = Math.max(this.selection-1, 0);
                this.setSelectionY();
                break;
            case "enter":
            case "space":
                this.app.setState(LEAKYWEEK.SCENARIOS[this.selection]);
        }
    }
};

LEAKYWEEK.drawMap = function(){
    var map = this.map;
    var ts = map.tileSize;
    var tile, entity;
    for(var i = 0; i < map.floor.length; i++){
        for(var j = 0; j < map.floor[i].length; j++){
            tile = map.floor[i][j];
            if(tile.f||tile.f===0){
                this.app.layer.stars(j*ts, i*ts, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                    .drawAtlasFrame(this.app.atlases.floor, tile.f, 0, 0)
                    .restore();
            }
            
        }
    }
    
    for(var i = 0; i < map.objects.length; i++){
        for(var j = 0; j < map.objects[i].length; j++){
            tile = map.objects[i][j];
            if(tile.f||tile.f===0){
                this.app.layer.stars(j*ts, i*ts, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                    .drawAtlasFrame(this.app.atlases.objects, tile.f, 0, 0)
                    .restore();
            }
        }
        for(var k = 0; k < map.entities.length; k++){
            entity = map.entities[k];
            if(entity.y/ts >= i && entity.y/ts < i+1) {
                this.app.layer.stars(entity.x, entity.y, 0.5, 0.5, (entity.rotation||0) * Math.PI/2, 1)
                    .drawAtlasFrame(this.app.atlases.entities, entity.f, 0, 0)
                    .restore();
            }
        }
    }
};
