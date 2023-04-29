function Npc(imgSrc, col, lin, flag){
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
		this.taxaCresX = this.taxaCresY = this.taxaAumenX = this.taxaDimX = this.taxaAumenY = this.taxaDimY = 0;
		this.acima = false;
		this.exibir = true;
		this.deslocaY = 0;
		this.deslocaX = 0;
		this.id = null;
		this.etc = null;
		this.irX = null;
		this.irY = null;
		this.metaHorizontal = null;
		this.metaVertical = null;
		this.gpsX = null;
		this.gpsY = null;
	//metodos
	this.desenha = function(){
		if (this.exibir) {
			//Obs: para ajustar escala foi preciso dividir .lar && .alt pela escala nas dimensões de .lar & .alt na captura do sprite
			//P.s: a medida de escala tem de ser setada fixa no momento do load do sprite para mudar esta medida durante o jogo necessida excuir objeto do array sprites e inseri-lo novamente com a nova escala EX: sprites[achar('player')] = new Personagem()//com a nova escala;
			ctx.drawImage(this.img, this.srcX + this.grLar + this.lar/this.esc * this.frame, this.srcY + this.grAlt + this.alt/this.esc * this.direcao, this.lar/this.esc, this.alt/this.esc, this.posX, this.posY, this.lar, this.alt);// + this.lar * (this.esc + this.esc/2)
		}		
	}	
	this.exe = function(){
		if(this.flag !== 'player-online'){
			this.gpsX = parseInt(this.meiox()) + parseInt(sprites[encontrar('background')].srcX);
			this.gpsY = parseInt(this.meioy() + sprites[encontrar('background')].srcY);
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
					this.worldY += ajusteFinoY > this.speed ? this.speed : ajusteFinoY;					
					//this.posY += ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
				}
				if (!this.movDown && this.movUp) {
					this.direcao = 3;
					this.worldY -= ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
					//this.posY -= ajusteFinoY > this.speed ? this.speed : ajusteFinoY;
				}
				if (this.movLeft && !this.movRight) {
					this.direcao = 1;
					this.worldX -= ajusteFinoX > this.speed ? this.speed : ajusteFinoX; //this.speed;					
					//this.posX -= ajusteFinoX > this.speed ? this.speed : ajusteFinoX; //this.speed;
				}
				if (!this.movLeft && this.movRight) {
					this.direcao = 2;
					this.worldX += ajusteFinoX > this.speed ? this.speed : ajusteFinoX;//this.speed;
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
			if (this.id == 'gp-indo-trampa') {
				//morena
				this.irDePara(689, 395, 900, 375);
				this.irDePara(900, 375, 910, 580);
				this.irDePara(910, 580, 689, 580);
				this.irDePara(689, 580, 689, 480);
				this.ia(689, 480, 'mudarSprite');
				//loira
				this.irDePara(319, 390, 530, 390);
				this.irDePara(530, 390, 530, 480);
				this.irDePara(530, 480, 630, 480);
				this.irDePara(630, 480, 630, 580);
				this.irDePara(630, 580, 689, 580);

			}
			if (this.id == 'gp-trampando') {
				//vai&vem
				this.irDePara(689, 570, 910, 580);
				this.irDePara(910, 580, 689, 570);
				//sobe&desce
				this.irDePara(615,570, 615, 450);
				this.irDePara(615, 450, 615,570);
			}
			if (this.id == 'gp-esquina') {
				if (contLoop%2000 == 0) {//fica alternando linha do sprite a cada tantos
					this.direcao = Math.floor((Math.random() * 4) + 0);
				}				
			}
			
				let distanciaX = this.worldX - this.gpsX;
				let distanciaY = this.worldY - this.gpsY;
				if (distanciaX < 0) { distanciaX * -1; }
				if (distanciaY < 0) { distanciaY * -1; }			
			//bolar algo aqui para efeito de profundidade com base nas posY ou worldY dos personagens
			if (distanciaX < cnv.width && distanciaY < cnv.height) {
				////tem de esta dentro da tela pra executar estes codigo
				if (debug) {
					ctx.font = "10px bold Comic Sans MS";
					ctx.fillStyle =  'red';
					let texto = sprites.indexOf(this) + ': '+ this.gpsX +' , '+ this.gpsY;
					ctx.fillText(texto, this.posX - this.lar/2, this.posY);//texto	
				}
				//
				if (!this.acima) {//elemento esta no chão e ñ acima do player bloqueia ou empurra
					
					//excessões do bloqueio..........isto tem de ser melhor avaliado
					if (this.id == 'gp-indo-trampa' || this.id == 'gp-trampando' || this.id == 'gp-esquina') {


						if (this.id == 'gp-indo-trampa' && colide(this, sprites[achar('player')])) {
							//esta tocando o player
							console.log('vai lá daqui a pouco me pegar amor..?');						
						}
						if (this.id == 'gp-trampando' && colide(this, sprites[achar('player')])) {
							console.log('boquetinho R$ 10 paus, completinha R$ 50 mangos');
						}
					


					}else{//						
						bloqueando(sprites[achar('player')], this);
					}
					
				}
				if (this.txt == 'nocaoProfundidade') {//simular profundidade, copa das arvores e moitas...
					//posy em que player dispara evento que muda this.exibir.. simular profundidade
					if (sprites[achar('player')].gpsY - this.deslocaY < this.worldY && colide(this, sprites[achar('player')])) {
						this.exibir= true;
						console.log('tocando em '+ this.id);
						//console.log('exibir tá atraz de algo'+ this.gpsY +' , '+ this.worldX);
					}else{
						this.exibir = false;
					}
				}
				//fixo na tela
				if (this.status == 'fixo') {//somente anima
					this.posX = sprites[encontrar('background')].srcX * -1 + this.worldX;
					this.posY = sprites[encontrar('background')].srcY * -1 + this.worldY;
					if (contLoop%this.txFrequencia == 0) {// para animação
						this.frame += this.fr;
						if (this.frame >= this.col-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
			}
			//movimento dos npc moveUp, moveRightUp, moveRight, moveRightDown...
				//Obs: move refere-se ao mundo word medidas totais do background !== de posX,posY que refere-se a tela independente do tamanho
				// ATENÇÃO NISTO AQUI é um ajuste..........................
					this.grLar = this.lar * 3 * this.grCol;
					this.grAlt = this.alt * 4 * this.grLin;
					//console.log('=======> '+ this.col +' / ??: ');
				//.............................................
				this.posX = sprites[encontrar('background')].srcX * -1 + this.worldX;
				this.posY = sprites[encontrar('background')].srcY * -1 + this.worldY;
				if(this.flag == 'player-online'){
					this.posX = sprites[encontrar('background')].srcX * -1 + this.gpsX - this.lar/2;
					this.posY = sprites[encontrar('background')].srcY * -1 + this.gpsY - this.alt/2;
				}				
				if (this.status == 'moveUp') {
					this.worldY -= this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 3;//Obs: tem influencia direta nos npc que são apenas uma imagem fixa 
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;
						//this.worldX += this.speed;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveRightUp') {
					this.worldX += this.speed;
					this.worldY -= this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 2;	
					}
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveRight') {
					this.worldX += this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 2;
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}				
				}
				if (this.status == 'moveRightDown') {
					this.worldX += this.speed;
					this.worldY += this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 2;
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveDown') {
					this.worldY += this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 0;
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveLeftDown') {
					this.worldX -= this.speed;
					this.worldY += this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 1;
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveLeft') {
					this.worldX -= this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 1;
					}					
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'moveLeftUp') {
					this.worldX -= this.speed;
					this.worldY -= this.speed;
					if (this.lin == 4 || this.lin == 8) {
						this.direcao = 1;
					}
					if (contLoop%this.txFrequencia == 0) {
						this.frame += this.fr;						
						if (this.frame >= this.nFrames-1 || this.frame <= 0) {
							this.fr *= -1;
						}
					}
				}
				if (this.status == 'mudarSprite') {					
						if (this.etc == 'gpMorena') {
							//this.mudarSprite(this, novoSprite);
							//console.log('mudar para gp-trampando => '+ sprites.indexOf(this));
							let temp = sprites[sprites.indexOf(this)];
							sprites[sprites.indexOf(this)] = gpMorena;
							gpMorena = temp;
						}
						if (this.etc == 'gpLoira') {
							//console.log('mudar para gp-trampando => '+ sprites.indexOf(this));
							let temp = sprites[sprites.indexOf(this)];
							sprites[sprites.indexOf(this)] = gpLoira;
							gpLoira = temp;	
						}
				}
			//

	}
	this.ia = function(iaX, iaY, status){
		/*/botão IA decisão
				iaX = 669;
				iaY = 369;
				iaLar = 10; //substituido pela speed
		*/
				ctx.fillRect(this.speed + sprites[encontrar('background')].srcX * -1 + iaX, sprites[encontrar('background')].srcY * -1 + iaY,this.speed,this.speed);
				//this.posX = sprites[encontrar('background')].srcX * -1 + this.worldX;
				//this.posY = sprites[encontrar('background')].srcY * -1 + this.worldY;
				//let sts = 'moveRight';
				//672 > 669 = true;
				if (this.worldX >= iaX - this.lar/2 && this.worldX <= iaX + this.lar/2 && this.worldY >= iaY - this.alt/2 && this.worldY <= iaY + this.alt/2) {
					console.log('IA: '+ this.status);
					this.status = status;
				}
	}

	this.irDePara = function(iaX, iaY, hx, vy){		
		//console.log('irDePara =>'+ this.gpsX +' , '+ iaX +' : '+ iaY +' , '+ this.gpsY);
		//simprificar criando variavel local
			let posicaoX = this.lar/-2 + sprites[encontrar('background')].srcX * -1 + iaX;
			let posicaoY = this.alt/-2 + sprites[encontrar('background')].srcY * -1 + iaY;
				//
				if (debug) {
					ctx.fillRect(posicaoX, posicaoY,this.lar,this.alt);//quadro em branco
				
					ctx.font = "10px bold Comic Sans MS";
					ctx.fillStyle =  '#000';
					let texto = this.id + ': '+ iaX +' , '+ iaY +' => '+ hx + ' , '+ vy;
					ctx.fillText(texto, posicaoX, posicaoY);//texto					
				}
				//limite X a esquerda && limite X a direita && limite de Y acima && limite de Y abaixo
				if (this.gpsX >= iaX -this.lar/2 && this.gpsX <= iaX + this.lar/2 && this.gpsY <= iaY + this.alt/2 && this.gpsY >= iaY - this.alt/2) {
					this.metaHorizontal = hx;
					this.metaVertical = vy;
				}
	}
}
Npc.prototype.metax = function(){
	return (this.lar) / 2;
}
Npc.prototype.metay = function(){
	return (this.alt) / 2;
}
Npc.prototype.meiox = function(){
	return this.posX + this.metax();
}
Npc.prototype.meioy = function(){
	return this.posY + this.metay();
}