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
        this.loadImage("title", "shadyguy");
        this.loadAtlas("floor", "player");

        //for(var k in LEAKYWEEK.SCENARIOS) {
        //    this.loadAtlas(LEAKYWEEK.SCENARIOS[k].thumbnail);
        //}
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
    step: function(){
        this.current = (this.app.lifetime % 2/2 * 4) | 0 + 4*2;
    },
    render: function(){
        var title = this.app.images.title;
        this.app.layer.clear('#333')
            .drawImage(title, (this.app.width-title.width)/2, 0)
            .textAlign('left')
            .strokeStyle("#ff00ff")
            .strokeRect(this.app.width/2-70, this.app.height-110, 200, 70)
            .fillStyle('#fff')
            .font("15pt Monospace")
            .textAlign('center')
            .fillText('start', this.app.width/2+30, this.app.height-70);
        
        if(this.hover){
            this.app.layer
                .fillStyle('rgba(255,255,255,0.1)')
                .fillRect(this.app.width/2-70, this.app.height-110, 200, 70);
        }

        this.app.layer.fillStyle("#666").fillRect((this.app.width-300)/2-10, this.selectionY, 400, 70);
        for(var i in LEAKYWEEK.SCENARIOS) {            
            var s = LEAKYWEEK.SCENARIOS[i];
            this.app.layer
                  .stars((this.app.width-300)/2, 278+s.id*90, 0, 0, 0, 2)
                  .drawAtlasFrame(this.app.atlases[s.thumbnail], this.current, 0, 0)
                  .restore()
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
                } else if((data.x >= this.app.width/2-70) && (data.x <= this.app.width/2-70+200) && (data.y >= this.app.height-110) && (data.y <= this.app.height-110+70)) {
                    this.app.setState(LEAKYWEEK.SCENARIOS[this.selection]);
                }
            }
        }
    },
    mousemove: function(data) {
        if((data.x >= this.app.width/2-70) && (data.x <= this.app.width/2-70+200) && (data.y >= this.app.height-110) && (data.y <= this.app.height-110+70)) {
            this.hover = true;
        } else{
            this.hover = false;
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

LEAKYWEEK.conversation = {
    enter: function() {
        this.image = this.app.images[this.scene.image];
        this.text = this.scene.text;
        this.timing = this.scene.timing || 3;
        this.current = 0;
        this.shown = 0;
    },
    step: function(dt) {
        this.shown += dt/this.timing;
        if(this.shown > 1) this.shown = 1;
        this.currentText = this.text[this.current].slice(0, (this.shown*this.text[this.current].length) | 0);
    },
    render: function() {
        this.app.layer.clear('#333');
        if(this.scene.screenshot) this.app.layer.drawImage(this.scene.screenshot, 0, 0);
        this.app.layer.drawImage(this.image, 900-this.image.width, 600-this.image.height)
            .fillStyle('rgba(0, 0, 0, 0.2)')
            .fillRect(0, 400, 900, 200)
            .fillStyle("#f0f0f0")
            .font("20pt Monospace")
            .textAlign("left")
            .wrappedText(this.currentText||' ', 100, 440, 600, 40);
    },
    keydown: function(event) {
        if(event.key === 'space' || event.key === 'enter'){
            if(this.shown === 1){
                this.shown = 0;
                this.current++;
                if(this.text.length === this.current){
                    this.scene.callback.call(this);
                }
            } else{
                this.shown = 1;
            }
        }
    }
};

LEAKYWEEK.map = {
    enter: function() {
        this.collisionTextures = [8,9,10];
        var that = this;
        this.map.entities.forEach(function(entity){
            entity.speed = 0;
            entity.direction = 0;
            entity.x = entity.startX * that.map.tileSize;
            entity.y = entity.startY * that.map.tileSize;
        });
        this.offset = {
            x: 300 - this.map.entities[this.map.me].x,
            y: 450 - this.map.entities[this.map.me].y
        }
    },
    step: function(dt) {
        for(var i = 0; i < this.map.entities.length; i++){
            var entity = this.map.entities[i];
            entity.x += Math.sin(entity.direction/2*Math.PI)*entity.speed*entity.maxSpeed*dt;
            entity.y += -1 * Math.cos(entity.direction/2*Math.PI)*entity.speed*entity.maxSpeed*dt;
            entity.current = entity.speed > 0 ? ((this.app.lifetime % 0.5 / 0.5) * (this.app.atlases[entity.atlas].frames.length/4) | 0) + entity.direction * 4 : 0 + entity.direction * 4;
            
            var that = this;
            var ts = this.map.tileSize,
                ex1 = entity.x,
                ex2 = entity.x+ts,
                ey1 = entity.y,
                ey2 = entity.y+ts;
            var collisions = [];
            this.map.floor.forEach(function(row, y){
                row.forEach(function(tile, x){
                    var tx1 = x*ts,
                        tx2 = x*ts+ts,
                        ty1 = y*ts,
                        ty2 = y*ts+ts;
                    if (ty1 < ey2 && ty2 > ey1)
                        if(tx1 < ex2 && tx2 > ex1)
                            collisions.push({tile: tile, x: x, y: y});
                });
            });
            collisions.forEach(function(collision){
                if(that.collisionTextures.indexOf(collision.tile.f) === -1){
                    if(collision.tile.collisionEvent)
                        collision.tile.collisionEvent.call(that);
                    return;
                }
                
                //kinda assuming there are no directions in between (oh god please)
                switch(entity.direction|0){
                    case 0:
                        entity.y = collision.y*ts+ts;
                        break;
                    case 1:
                        entity.x = collision.x*ts-ts;
                        break;
                    case 2:
                        entity.y = collision.y*ts-ts;
                        break;
                    case 3:
                        entity.x = collision.x*ts+ts
                        break;
                }
            });
        }
        this.offset = {
            x: 450 - this.map.entities[this.map.me].x,
            y: 300 - this.map.entities[this.map.me].y
        }
    },
    render: function() {
        var map = this.map;
        var ts = map.tileSize;
        var ox = this.offset.x;
        var oy = this.offset.y;
        var tile, entity;
        this.app.layer.clear('#333');
        if(this.map.background) this.app.layer.drawImage(this.map.background, 0, 0);
        for(var i = 0; i < map.floor.length; i++){
            for(var j = 0; j < map.floor[i].length; j++){
                tile = map.floor[i][j];
                if(tile.f||tile.f===0){
                    this.app.layer.stars(j*ts+ox, i*ts+oy, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                        .drawAtlasFrame(this.app.atlases.floor, tile.f, 0, 0)
                        .restore();
                }
            
            }
        }
        
        for(var i = 0; i < map.objects.length; i++){
            for(var j = 0; j < map.objects[i].length; j++){
                tile = map.objects[i][j];
                if(tile.f||tile.f===0){
                    this.app.layer.stars(j*ts+ox, i*ts+oy, 0.5, 0.5, (tile.rotation||0) * Math.PI / 2, 1) 
                        .drawAtlasFrame(this.app.atlases.objects, tile.f, 0, 0)
                        .restore();
                }
            }
        }
        for(var k = 0; k < map.entities.length; k++){
            entity = map.entities[k];
            this.app.layer.stars(entity.x+ox, entity.y+oy, 0.5, 0.5, (entity.rotation||0) * Math.PI/2, 1)
                .drawAtlasFrame(this.app.atlases[entity.atlas], entity.current, 0, 0)
                .restore();
        }
    },
    keydown: function(event){
        switch(event.key){
            case "up":
                this.map.entities[this.map.me].direction = 0;
                break;
            case "right":
                this.map.entities[this.map.me].direction = 1;
                break;
            case "down":
                this.map.entities[this.map.me].direction = 2;
                break;
            case "left":
                this.map.entities[this.map.me].direction = 3;
                break;
        }
        switch(event.key){
            case "up":
            case "down":
            case "left":
            case "right":
                this.map.entities[this.map.me].speed = 1
        }
    },
    keyup: function(event){
        var me = this.map.entities[this.map.me];
        if(event.key === 'up' && me.direction===0) me.speed = 0;
        if(event.key === 'right' && me.direction===1) me.speed = 0;
        if(event.key === 'down' && me.direction===2) me.speed = 0;
        if(event.key === 'left' && me.direction===3) me.speed = 0;
    }
};