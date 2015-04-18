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
        LEAKYWEEK.loadScenario("scenarios/test.json");
        LEAKYWEEK.loadScenario("scenarios/example.json");

        for(var k in LEAKYWEEK.SCENARIOS) {
            this.loadImage(LEAKYWEEK.SCENARIOS[k].thumbnail);
        }
    },
    ready: function(){
        this.setState(LEAKYWEEK.title);
    }
});

LEAKYWEEK.SCENARIOS = {};

LEAKYWEEK.loadScenario = function(path) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                var s = JSON.parse(xhr.responseText);
                LEAKYWEEK.SCENARIOS[s.id] = s;
            }
        }
    };
    xhr.open('GET', path, false);
    xhr.send();
}

LEAKYWEEK.days = {};

LEAKYWEEK.title = {
    enter: function(){
        this.selection = "";
    },
    render: function(){
        var title = this.app.images.title;
        this.app.layer.clear('#333')
            .drawImage(title, (this.app.width-title.width)/2, 0)
            .textAlign('left')
            .fillStyle("#ff00ff")
            .fillRect((this.app.width-200)/2, this.app.height-110, 200, 70);

        for(var i in LEAKYWEEK.SCENARIOS) {
            var index = Object.keys(LEAKYWEEK.SCENARIOS).indexOf(i);
            if(this.selection===i) this.app.layer.fillStyle("#666").fillRect((this.app.width-300)/2-10, 275+index*90, 400, 70);
            var s = LEAKYWEEK.SCENARIOS[i];
            this.app.layer
                  .drawImage(this.app.images[s.thumbnail], (this.app.width-300)/2, 285+index*90)
                  .fillStyle("#f0f0f0")
                  .font("15pt Monospace")
                  .textAlign("left")
                  .fillText(s.title, (this.app.width-150)/2+60, 300+index*90)
                  .font("12pt sans")
                  .fillText(s.description, (this.app.width-150)/2+60, 330+index*90);
        }
    },
    mousedown: function(data) {
        if(data.button === 'left') {
            for(var i in LEAKYWEEK.SCENARIOS) {
                var index = Object.keys(LEAKYWEEK.SCENARIOS).indexOf(i);
                if((data.x >= (this.app.width-300)/2-10) && (data.x <= (this.app.width-300)/2+390) && (data.y >= 275+index*90) && (data.y <= 275+index*90+70)) { this.selection = i; console.log("ping"); }
            }
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
            this.app.layer.stars(j*ts, i*ts, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                .drawAtlasFrame(this.app.atlases.floor, tile.frame, 0, 0)
                .restore();
            
        }
    }
    
    for(var i = 0; i < map.objects[i].length; i++){
        for(var j = 0; j < map.objects[i].length; j++){
            tile = map.objects[i][j];
            this.app.layer.stars(j*ts, i*ts, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                .drawAtlasFrame(this.app.atlases.objects, tile.frame, 0, 0)
                .restore();
            
        }
        for(var k = 0; k < map.entities.length; k++){
            entity = map.entities[k];
            if(entity.y/ts >= i && entity.y/ts < i+1) {
                this.app.layer.stars(entity.x, entity.y, 0.5, 0.5, (entity.rotation||0) * Math.PI/2, 1)
                    .drawAtlasFrame(this.app.atlases.entities, entity.frame, 0, 0)
                    .restore();
            }
        }
    }
};
