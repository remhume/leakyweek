LEAKYWEEK.days.monday = {
    enter: function(){
        this.map = LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection].maps.monday;
        this.x = 100;
        this.y = 100;
    },
    render: function(){
        this.app.layer.clear('#333')
            .translate(this.x, this.y);
        LEAKYWEEK.drawMap.call(this);
        this.app.layer.translate(-this.x, -this.y);
    },
    step: function(dt){
        if (this.app.keyboard.keys.up) this.y ++;
        if (this.app.keyboard.keys.down) this.y --;
        if (this.app.keyboard.keys.left) this.x ++;
        if (this.app.keyboard.keys.right) this.x --;
    },
    keydown: function(event){
        if(event.key === 'space'){
            LEAKYWEEK.conversation.scene = {
                text: [
                    'LUDUMDARELUDUMDARE LUDUMDARE LUDUMDARELUDUMDARELUDUMDARE LUDUMDARELUDUMDARE LUDUMDARE',
                    'hi, test'
                ],
                image: this.app.images.shadyguy,
                screenshot: this.app.layer.cache(),
                callback: function() {
                    this.app.setState(LEAKYWEEK.days.monday);
                }
            }
            this.app.setState(LEAKYWEEK.conversation);
        }
    }
}