function Player(imgSrc, col, lin, flag){
	//atributos.............................
		this.img = new Image();
		this.img.src = imgSrc;	
		this.srcX = 0;
		this.srcY = 0;
		this.lar = 0;
		this.alt = 0;
		this.posX = 0;
		this.posY = 0;
		this.col = col;
		this.lin = lin;
		this.frame = 0;
		this.direcao = 0;
		this.esc = 1;
		this.movRight = false;
		this.movLeft = false;
		this.movUp = false;
		this.movDown = false;
		this.speed = 3;
		this.fr = 1;
		this.flag = flag;
		this.txt = null;
		this.status = null;
		this.worldX = 150;
		this.worldY = 150;
		this.grLar = 0;
		this.grAlt = 0;
		this.grCol = 0;
		this.grLin = 0;
		this.nFrames = 1;
		this.txFrequencia = 10;
		this.exibir = true;
		this.id = null;
		this.metaHorizontal = null;
		this.metaVertical = null;
		this.gpsX = null;
		this.gpsY = null;
		this.fase = 'world';//default
	//metodos
	this.desenha = function(){
		if (this.exibir) {
			//Obs: para ajustar escala foi preciso dividir .lar && .alt pela escala nas dimensões de .lar & .alt na captura do sprite
			//P.s: a medida de escala tem de ser setada fixa no momento do load do sprite para mudar esta medida durante o jogo necessida excuir objeto do array sprites e inseri-lo novamente com a nova escala EX: sprites[achar('player')] = new Player()//com a nova escala;
			ctx.drawImage(this.img, this.srcX + this.grLar + this.lar/this.esc * this.frame, this.srcY + this.grAlt + this.alt/this.esc * this.direcao, this.lar/this.esc, this.alt/this.esc, this.posX, this.posY, this.lar, this.alt);// + this.lar * (this.esc + this.esc/2)
		}		
	}	
	this.exe = function(){		
		this.gpsX = parseInt(this.meiox()) + parseInt(sprites[encontrar('background')].srcX);
		this.gpsY = parseInt(this.meioy() + sprites[encontrar('background')].srcY);
		
        if (porcentMouseX !== null && porcentMouseY !== null) {
            let porcentPlayerX = this.meiox() / cnv.width;
            let porcentPlayerY = this.meioy() / cnv.height;
                let difX = porcentMouseX - porcentPlayerX;
                let difY = porcentMouseY - porcentPlayerY;
                if (sprites[achar('player')].fase !== 'ceu') {
                    this.metaHorizontal = (6 * -1) + parseInt(cnv.width * difX + this.posX + sprites[encontrar('background')].srcX) + this.lar/2;
                    this.metaVertical = (6 * -1) + parseInt(cnv.height * difY + this.posY + sprites[encontrar('background')].srcY) + this.alt/2;

                }
				//isto aqui da merda achar jeito de ligar com texto essa bagaça no momento de estancia
				if(achar('txt', 'gpsMouse')){
					sprites[achar('txt', 'gpsMouse')].txt = 'mouse   x,y: '+ this.metaHorizontal +' , '+ this.metaVertical;//porcentMouseX +','+ porcentMouseY;//
				}
                
                //area do botão mouse ñ deve preencher metas quando mouse click aqui...
                //btn superior direito
                if (porcentMouseX > .90 && porcentMouseY < .20) {
                    this.metaHorizontal = null;
                    this.metaVertical = null;
                    //aciona mapa
                    console.log('aciona mapa');
                    alternarMapa();//isto ñ deveria estar aqui???
                }
            //
            porcentMouseX = porcentMouseY = null;
        }				 
		
		//movimenta na tela canvas
			//movimento frame animação.... 
				if (this.status == 'grupo') {
					//console.log('grupo');
					this.grLar = this.lar * this.nFrames * this.grCol;
					this.grAlt = this.alt * 4 * this.grLin;
					//this.esc = 1.5;
				}
				else{
					this.grLar = this.grAlt = 0;
				}
				if (this.movRight || this.movLeft || this.movDown || this.movUp) {
					if (contLoop%this.txFrequencia == 0) {//aqui regula a velocidade do frame
						this.frame += this.fr;
						if (this.frame <= 0 || this.frame >= this.nFrames - 1) {//aqui numero de frames 3
							this.fr *= -1;
						}						
					}
				}
			//obs: A posição do player no mundo/world e o srcX e srcY do bacground/mapa somado a posX e posY do player.
				//p.s: ajuste fino da posição meta do mouse se diferença this.metaHorizontal <> this.gpsX < this.speed velocidade recebe a diferença entre pos e meta...
				let ajusteFinoX = ajusteFinoY = this.speed;
				if (this.metaHorizontal !== null || this.metaVertical !== null) {

					ajusteFinoX = this.metaHorizontal - this.gpsX;
					ajusteFinoY = this.metaVertical - this.gpsY;
				}
			//mov
				//ajusteFino ñ pose ser negativo
				ajusteFinoX < 0 ? ajusteFinoX *= -1 : ajusteFinoX *= 1;
				ajusteFinoY < 0 ? ajusteFinoY *= -1 : ajusteFinoY *= 1;

				if (this.movDown && !this.movUp) {
					this.direcao = 0;//linha do sprite / imagem	
					this.posY += ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
					//this.posY += ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
				}
				if (!this.movDown && this.movUp) {
					this.direcao = 3;
					this.posY -= ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
					//this.posY -= ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
				}
				if (this.movLeft && !this.movRight) {
					this.direcao = 1;
					this.posX -= ajusteFinoX > this.speed ? this.speed : ajusteFinoX; //this.speed;
					//this.posX -= ajusteFinoX > this.speed ? this.speed : ajusteFinoX; //this.speed;
				}
				if (!this.movLeft && this.movRight) {
					this.direcao = 2;
					this.posX += ajusteFinoX > this.speed ? this.speed : ajusteFinoX;//this.speed;
					//this.posX += ajusteFinoX > this.speed ? this.speed : ajusteFinoX;//this.speed;
				}				
			///player mouse , npc ia
			if (this.metaHorizontal != null || this.metaVertical != null) {				
				if (this.metaHorizontal > this.gpsX && this.metaHorizontal != null) {
					this.movRight = true;
					this.movLeft = false;
				}else if (this.metaHorizontal < this.gpsX && this.metaHorizontal != null) {
					this.movLeft = true;
					this.movRight = false;
				}else{
					this.movRight = this.movLeft = false;
					this.metaHorizontal = null;
				}
				///////////////////////////////////////////////
				if (this.metaVertical > this.gpsY && this.metaVertical != null) {
					this.movDown = true;
					this.movUp = false;
				}else if(this.metaVertical < this.gpsY && this.metaVertical != null){
					this.movUp = true;
					this.movDown = false
				}else{
					this.movDown = this.movUp = false;
					this.metaVertical = null;
				}
				//resetar condição de parada metaHorizontal&Vertical
				if (this.metaHorizontal - this.gpsX == 0) {
					this.metaHorizontal = null;
					this.movLeft = false;
					this.movRight = false;
				}
				if (this.metaVertical - this.gpsY == 0) {
					this.metaVertical = null;
					this.movUp = false;
					this.movDown = false;
				}
			}
		//
    }
}
Player.prototype.metax = function(){
	return (this.lar) / 2;
}
Player.prototype.metay = function(){
	return (this.alt) / 2;
}
Player.prototype.meiox = function(){
	return this.posX + this.metax();
}
Player.prototype.meioy = function(){
	return this.posY + this.metay();
}
