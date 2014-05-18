/**
 * Class Tank
 * @param heart
 * @param direction
 * @constructor
 */
function Tank(heart, direction) {
	this.heart = heart;
	this.direction = direction;
	this.status = true;// alive or die, true is alive, false is die.
	//根据中心和方向计算坦克所占的格子
	this.getDataArr = function() {
		var dataArr = [this.heart];
		if (this.direction == 37) { //left
			dataArr.push([this.heart[0]-1, this.heart[1]]);
			dataArr.push([this.heart[0], this.heart[1]-1]);
			dataArr.push([this.heart[0], this.heart[1]+1]);
			dataArr.push([this.heart[0]+1, this.heart[1]-1]);
			dataArr.push([this.heart[0]+1, this.heart[1]+1]);
		} else if (this.direction == 38) { //up
			dataArr.push([this.heart[0], this.heart[1]-1]);
			dataArr.push([this.heart[0]-1, this.heart[1]]);
			dataArr.push([this.heart[0]+1, this.heart[1]]);
			dataArr.push([this.heart[0]-1, this.heart[1]+1]);
			dataArr.push([this.heart[0]+1, this.heart[1]+1]);
		} else if (this.direction == 39) { //right
			dataArr.push([this.heart[0]+1, this.heart[1]]);
			dataArr.push([this.heart[0], this.heart[1]-1]);
			dataArr.push([this.heart[0], this.heart[1]+1]);
			dataArr.push([this.heart[0]-1, this.heart[1]-1]);
			dataArr.push([this.heart[0]-1, this.heart[1]+1]);
		} else if (this.direction == 40) { //down
			dataArr.push([this.heart[0], this.heart[1]+1]);
			dataArr.push([this.heart[0]-1, this.heart[1]]);
			dataArr.push([this.heart[0]+1, this.heart[1]]);
			dataArr.push([this.heart[0]-1, this.heart[1]-1]);
			dataArr.push([this.heart[0]+1, this.heart[1]-1]);
		}
		return dataArr;
	}
	this.checkValidation = function() {
		//edge
		if (this.heart[0] <= 1 || this.heart[0] >= gridColsNum || this.heart[1] <= 1 || this.heart[1] >= gridRowsNum) {
			return false;
		}
		//tank
		var tankDataArr = this.getDataArr();
		for (var i=0; i<tankDataArr.length; i++) {
			var coordinate = tankDataArr[i];
			if (jQuery("#tank-grid .row:nth-child("+coordinate[1]+") .col:nth-child("+coordinate[0]+")").hasClass("on")) {
				return false;
			}
		}
		return true;
	}
	this.draw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			jQuery("#tank-grid .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").addClass("on tank");
		}
	}
	this.removeDraw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			jQuery("#tank-grid  .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").removeClass("on").removeClass("tank");
		}
	}
	this.moveLeft = function() {
		var preHeart = this.heart;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 37;
		if (preDirection == 37) {
			this.heart = [preHeart[0]-1, preHeart[1]];
		}
		if (!this.checkValidation()) {
			this.heart = preHeart;
			this.direction = preDirection;
		}
		this.draw();
	}
	this.moveUp = function() {
		var preHeart = this.heart;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 38;
		if (preDirection == 38) {
			this.heart = [preHeart[0], preHeart[1]-1];
		}
		if (!this.checkValidation()) {
			this.heart = preHeart;
			this.direction = preDirection;
		}
		this.draw();
	}
	this.moveRight = function() {
		var preHeart = this.heart;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 39;
		if (preDirection == 39) {
			this.heart = [preHeart[0]+1, preHeart[1]];
		}
		if (!this.checkValidation()) {
			this.heart = preHeart;
			this.direction = preDirection;
		}
		this.draw();
	}
	this.moveDown = function() {
		var preHeart = this.heart;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 40;
		if (preDirection == 40) {
			this.heart = [preHeart[0], preHeart[1]+1];
		}
		if (!this.checkValidation()) {
			this.heart = preHeart;
			this.direction = preDirection;
		}
		this.draw();
	}
	this.fire = function() {
		var bulletCoordinate = null;
		switch (this.direction) {
			case 37:
				bulletCoordinate = [this.heart[0]-2,this.heart[1]];
				break;
			case 38:
				bulletCoordinate = [this.heart[0],this.heart[1]-2];
				break;
			case 39:
				bulletCoordinate = [this.heart[0]+2,this.heart[1]];
				break;
			case 40:
				bulletCoordinate = [this.heart[0],this.heart[1]+2];
				break;
			default :
				bulletCoordinate = [this.heart[0]-2,this.heart[1]];
		}
		var bullDom = jQuery("#tank-grid .row:nth-child("+bulletCoordinate[1]+") .col:nth-child("+bulletCoordinate[0]+")");
		if (bullDom.hasClass("on")) {
			if (bullDom.hasClass("tank")) {
				var tank = game.tankContainer.checkWhichTank(bulletCoordinate);
				tank.destroy();
			}
		} else {
			var bullet = new Bullet(bulletCoordinate, this.direction, bulletSpeed, this);
			bullet.init();
		}
	}
	this.destroy = function() {
		this.removeDraw();
		this.status = false;
	}
}





