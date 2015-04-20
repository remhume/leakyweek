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
        this.loadAtlas("floor", "player", "objects");

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

LEAKYWEEK.day = {};

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
                    PLAYGROUND.Transitions.enabled = false;
                    this.app.setState(LEAKYWEEK.day);
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
                PLAYGROUND.Transitions.enabled = false;
                this.app.setState(LEAKYWEEK.day);
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
                    this.scene.callback.call(this.scene.parent);
                }
            } else{
                this.shown = 1;
            }
        }
    }
};

LEAKYWEEK.map = {
    enter: function() {
        this.collisionTextures = [0,10,11,12];
        this.collisionObjects = [1];
        var that = this;
        this.map = this.scene;
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
        this.mapedit = false;
        this.konami = {
            code: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
            next: 0
        }
        this.selectedFrame = 3;
        this.selectedObject = 0;
    },
    step: function(dt) {
        if(this.konami.next === this.konami.code.length){
            this.konami.next = 0;
            this.mapedit = !this.mapedit;
        }
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
                if(that.collisionTextures.indexOf(collision.tile.f) === -1 ||
                   (collision.tile.o && that.collisionObjects.indexOf(collision.tile.o)===-1)){
                    if(collision.tile.collisionEvent)
                        collision.tile.collisionEvent.call(that.map.parent);
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
                        .drawAtlasFrame(this.app.atlases.floor, tile.f, 0, 0);
                    
                    if(tile.o){
                        this.app.layer.drawAtlasFrame(this.app.atlases.objects, tile.o, 0, 0);
                    }
                    
                    if(this.mapedit&&tile.selected){
                        var a = this.collisionTextures.indexOf(tile.f)!== -1||(tile.o && this.collisionObjects.indexOf(tile.o)!==-1)?0:255;
                        this.app.layer
                            .fillStyle('rgba('+a+','+a+',255,0.2)')
                            .fillRect(0,0,ts,ts);
                    }
                    this.app.layer.restore();
                }
            
            }
        }
        for(var k = 0; k < map.entities.length; k++){
            entity = map.entities[k];
            this.app.layer.stars(entity.x+ox, entity.y+oy, 0.5, 0.5, (entity.rotation||0) * Math.PI/2, 1)
                .drawAtlasFrame(this.app.atlases[entity.atlas], entity.current, 0, 0)
                .restore();
        }
        if(this.mapedit){
            var text = ['mapedit mode',
                        'i,j,k,l: make map bigger to the top, left, down, right',
                        'shift+i,j,k,l: make map smaller to the top, left, down, right',
                        'shift + lclick: select/unselect tile',
                        'lclick: change selected tiles to previous texture',
                        'rclick: change selected tiles to next texture',
                        'wheelclick: rotate the texture of selected tiles',
                        'o: scroll through objects on selected tiles',
                        'period: unselect all textures',
                        'konamicode: leave mapedit mode'];
            this.app.layer
                .fillStyle('#f0f0f0')
                .font("12px Monospace")
                .textAlign("left");
            for(var i = 0; i < text.length; i++){
                this.app.layer
                    .fillText(text[i], 0, 40+15*i)
            }
        }
    },
    mousedown: function(event) {
        if(this.mapedit){
        var map = this.map;
        var ts = map.tileSize;
        var ox = this.offset.x;
        var oy = this.offset.y;
        var tile, itile;
        for(var i = 0; i < map.floor.length; i++){
            for(var j = 0; j < map.floor[i].length; j++){
                tile = map.floor[i][j];
                if((event.x >= j*ts+ox-ts/2) && (event.x <= j*ts+ox+ts/2) && (event.y >= i*ts+oy-ts/2) && (event.y <= i*ts+oy+ts/2)) {
                    if(this.app.keyboard.keys.shift){
                        tile.selected = !tile.selected;
                        if(tile.selected) {
                            this.selectedFrame = tile.f;
                            this.selectedObject = tile.o||0;
                        }
                    } else{
                        var before = this.selectedFrame;
                        for(var k = 0; k < map.floor.length; k++){
                            for(var l = 0; l < map.floor[k].length; l++){
                                itile = map.floor[k][l];
                                if(itile.selected){
                                    if(event.button === 'left' && itile.f < this.app.atlases.floor.frames.length-1){
                                        itile.f = this.selectedFrame = before +1;
                                    } else if(event.button === 'right' && itile.f > 0){
                                        itile.f = this.selectedFrame = before -1;
                                    } else if(event.button === 'middle'){
                                        itile.rotation = itile.rotation === 3? 0 : itile.rotation+1 || 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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
            case "period":
                if(this.mapedit){
                    for(var i = 0; i < this.map.floor.length; i++){
                        for(var j = 0; j < this.map.floor[i].length; j++){
                            this.map.floor[i][j].selected = false;
                        }
                    }
                }
                break;
            case "i":
                if(this.mapedit){
                    if(!this.app.keyboard.keys.shift){
                        var newrow = [[]]
                        for(var i = 0; i < this.map.floor[0].length; i++){
                            newrow[0].push({f:this.selectedFrame});
                        }
                        this.map.floor = newrow.concat(this.map.floor); 
                    } else{
                        this.map.floor.shift();
                    }
                }
                break;
            case "k":
                if(this.mapedit){
                    if(!this.app.keyboard.keys.shift){
                        var newrow = [[]]
                        for(var i = 0; i < this.map.floor[0].length; i++){
                            newrow[0].push({f:this.selectedFrame});
                        }
                        this.map.floor = this.map.floor.concat(newrow); 
                    } else{
                        this.map.floor.pop();
                    }
                }
                break;
            case "j":
                if(this.mapedit){
                    for(var i = 0; i < this.map.floor.length; i++){
                        if(!this.app.keyboard.keys.shift){
                            this.map.floor[i] = [{f: this.selectedFrame}].concat(this.map.floor[i]);
                        } else{
                            this.map.floor[i].shift();
                        }
                    }
                }
                break;
            case "l":
                if(this.mapedit){
                    for(var i = 0; i < this.map.floor.length; i++){
                        if(!this.app.keyboard.keys.shift){
                            this.map.floor[i] = this.map.floor[i].concat([{f: this.selectedFrame}]);
                        } else{
                            this.map.floor[i].pop();
                        }
                    }
                }
                break;
            case "o":
                var map = this.map,
                    tile;
                if(this.mapedit){
                    this.selectedObject++;
                    if(this.selectedObject === this.app.atlases.objects.frames.length) this.selectedObject = 0;
                    for(var i = 0; i < map.floor.length; i++){
                        for(var j = 0; j < map.floor[i].length; j++){
                            tile = map.floor[i][j];
                            if(tile.selected){
                                tile.o = this.selectedObject;
                                
                            }
                        }
                    }
                }
        }
        switch(event.key){
            case "up":
            case "down":
            case "left":
            case "right":
                this.map.entities[this.map.me].speed = 1
        }
        if(event.key === this.konami.code[this.konami.next]){
            this.konami.next++;
        } else{
            this.konami.next = 0;
        }
    },
    keyup: function(event){
        var me = this.map.entities[this.map.me];
        if(event.key === 'up' && me.direction===0) me.speed = 0;
        if(event.key === 'right' && me.direction===1) me.speed = 0;
        if(event.key === 'down' && me.direction===2) me.speed = 0;
        if(event.key === 'left' && me.direction===3) me.speed = 0;
    },
    export: function(){
        if(this.mapedit){
            for(var i = 0; i < this.map.floor.length; i++){
                for(var j = 0; j < this.map.floor[i].length; j++){
                    this.map.floor[i][j].selected = undefined;
                    if(this.map.floor[i][j].rotation === 0) this.map.floor[i][j].rotation = undefined;
                    if(this.map.floor[i][j].o === 0) this.map.floor[i][j].o = undefined;
                }
            }
        }
        console.log(JSON.stringify(LEAKYWEEK.map.map.floor));
    }
};

LEAKYWEEK.dayintro = {
    enter: function(){
        this.scene;
        this.bgVis = 0;
        this.titleVis = 0;
        this.textVis = 0;
        this.app.tween(this)
            .to({bgVis : 1}, 3);
        this.app.tween(this)
            .wait(2)
            .to({titleVis: 1}, 3);
        this.app.tween(this)
            .wait(4)
            .to({textVis: 1}, 3);
    },
    render: function(){
        if(this.scene.screenshot)this.app.layer.drawImage(this.scene.screenshot, 0, 0);
        this.app.layer
            .clear('rgba(0,0,0,'+this.bgVis+')')
            .fillStyle('rgba(220,220,220,'+this.titleVis+')')
            .font('40px Monospace')
            .textAlign('center')
            .fillText(this.scene.title, this.app.width/2, 100)
            .fillStyle('rgba(220,220,220,'+this.textVis+')')
            .font('20px Monospace')
            .textAlign('center')
            .wrappedText(this.scene.text, this.app.width/2, 300, 600, 40)
            
    },
    keydown: function(event){
        if(event.key === 'space' || event.key === 'enter'){
            this.scene.callback.call(this.scene.parent);
        }
    }
}