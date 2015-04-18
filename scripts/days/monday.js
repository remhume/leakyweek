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
    step: function(event){
        if (this.app.keyboard.keys.up) this.y ++;
        if (this.app.keyboard.keys.down) this.y --;
        if (this.app.keyboard.keys.left) this.x ++;
        if (this.app.keyboard.keys.right) this.x --;
        
    }
}