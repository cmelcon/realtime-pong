function Player(x, y, isRemote) {
    this.x = x;
    this.y = y;
    this.speedx = 0;
    this.speedy = 0;
    this.isRemote = isRemote;
}

Player.prototype.update = function() {
    this.x += this.speedx;
    this.y += this.speedy;
    ioClient.emit('player_moved', {
        x: this.x,
        y: this.y,
        lastMoved: new Date().get
    });
};

Player.prototype.render = function(ctx) {
    if (this.isRemote) {
        ctx.save();
        ctx.strokeStyle = '#0000FF';
        ctx.strokeRect(this.x, this.y, 50, 150);
        ctx.restore();
    } else {
        ctx.strokeRect(this.x, this.y, 50, 150);
    }
};

Player.prototype.initControls = function(speed) {
    let self = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 37) self.speedx = -speed;
        if (e.keyCode === 39) self.speedx = speed;
        if (e.keyCode === 38) self.speedy = -speed;
        if (e.keyCode === 40) self.speedy = speed;
    }
    window.onkeyup = function(e) {
        if (e.keyCode === 37) self.speedx = 0;
        if (e.keyCode === 39) self.speedx = 0;
        if (e.keyCode === 38) self.speedy = 0;
        if (e.keyCode === 40) self.speedy = 0;
    }
};
