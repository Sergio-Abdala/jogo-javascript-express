function Sprite(imgSrc, col, lin, flag){
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
		this.gpsX = parseInt(this.meiox()) + parseInt(sprites[encontrar('background')].srcX);
		this.gpsY = parseInt(this.meioy() + sprites[encontrar('background')].srcY);
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
		if (this.flag == 'background') {//construindo efeito translação entre mapa e jogo
			//ajusta tamanho de tela********************************
				if (cnv.width < metaWidth) {//cresce a tela eixo X					//incrementar 50 ou 1
					if (metaWidth - cnv.width >= this.taxaAumenX) {
						cnv.width += this.taxaAumenX;
					}else{
						this.taxaAumenX /= 2;
					}					
				}				
				//...........................................................
				if (cnv.width > metaWidth) {//diminui a tela eixo X
					//console.log(this.taxaDimX);
					if (cnv.width - metaWidth >= this.taxaDimX) {
						cnv.width -= this.taxaDimX;
					}else{
						this.taxaDimX /= 2;
					}
					//determinar posição final de background.srcX
					//console.log(this.gpsX - metaWidth/2 < sprites[achar('background')].srcX);
					if (this.gpsX - metaWidth/2 < sprites[achar('background')].srcX) {
						//sprites[achar('background')].srcX+= this.taxaDimX;
					}
				}					
				//..............................................................
				if (cnv.height < metaHeight) {//aumenta tela eixo Y
					if (metaHeight - cnv.height >= this.taxaAumenY) {
						cnv.height+= this.taxaAumenY;
					}else{
						this.taxaAumenY /= 2;
					}
				}				
				//....................................................................
				if (cnv.height > metaHeight) {//diminui no eixo Y
					if (cnv.height - metaHeight >= this.taxaDimY) {
						cnv.height-= this.taxaDimY;
					}else{
						this.taxaDimY /= 2;
					}
					//determinar posição final de background.srcY
					if (this.gpsY - metaHeight/2 < sprites[achar('background')].srcY) {
						//sprites[achar('background')].srcY+= taxaDimY;
					}
				}
				//...............................................................
				if (this.status == 'mapa') {//meta maior que canvas cresce....
					if (this.srcX > 0) {
						if (this.srcX > this.taxaCresX) {
							this.srcX -= this.taxaCresX;
						}else{
							this.taxaCresX /= 2;
						}
					}					
					//
					if (this.srcY > 0) {
						if (this.srcY > this.taxaCresY) {
							this.srcY -= this.taxaCresY;
						}else{
							this.taxaCresY /= 2;
						}
					}					
				}else{//jogo canvas diminui meta menor
					//trabalhar na tela quando diminui
				}
			//limites movimenta camera seguindo player
			if (cnv.width == metaWidth && cnv.height == metaHeight) {
				let limLeft = cnv.width*0.4;
				let limRight = cnv.width * 0.6;
				let limUp = cnv.height*0.4;
				let limDown = cnv.height * 0.6;
				//acelerador
					let acelerador = 1;
					if (sprites[achar('player')].posX - metaWidth*.75 >  this.srcX || sprites[achar('player')].posY - metaHeight*.75 >  this.srcY) {
						if(sprites == world){
							acelerador = 5;
						}						
						//console.log('acelerar');
					}
				//
				if (limLeft > sprites[achar('player')].posX && this.srcX > 0) {
					//console.log('chegou ao limite esquerdo...');
					//acelerar conforme distancia
					this.srcX-= sprites[achar('player')].speed * acelerador;
					sprites[achar('player')].posX+= sprites[achar('player')].speed * acelerador;
				}
				if (limRight < sprites[achar('player')].posX + sprites[achar('player')].lar && this.srcX < this.lar - cnv.width) {
					//console.log('chegou ao limite direito...'+ this.srcX);
					this.srcX+= sprites[achar('player')].speed * acelerador;
					sprites[achar('player')].posX-= sprites[achar('player')].speed * acelerador;
				}
				//console.log('limDown: '+ limDown +' / '+ sprites[achar('player')].posY);
				if (limUp > sprites[achar('player')].posY && this.srcY > 0) {
					this.srcY -= sprites[achar('player')].speed * acelerador;
					sprites[achar('player')].posY+= sprites[achar('player')].speed * acelerador;
				}
				if (limDown < sprites[achar('player')].posY + sprites[achar('player')].alt && this.srcY < this.alt - cnv.height) {
					this.srcY += sprites[achar('player')].speed * acelerador;
					sprites[achar('player')].posY-= sprites[achar('player')].speed * acelerador;
				}
			}else{
				//em processo de aumento ou diminuição da tela
				//alternando entre modo mapa e jogo...
				if (cnv.width > metaWidth || cnv.height > metaHeight) {//canvas maior que a meta está diminuindo
					//console.log('diminuindo');
					
				}
			}
		}
		if (this.flag == 'nuvem') {//quando nuvem chega ao final da tela
			if (this.posX > sprites[achar('background')].img.width) {
				this.posX = this.lar * -1;
				this.posY = Math.floor((Math.random() * 3100) + 1);
			}else{
				this.posX += this.speed;
			}
			//exibir somente no mapa
			if (sprites[achar('background')].status == 'mapa') {
				this.exibir = true;
			}else{
				this.exibir = false;
			}
		}
		if (this.flag == 'npc') {// IA dos npc
			if (this.id == 'ovni') {//obs: .txt = 'naveMae' , só é exibido no mapa igual a nuvem??? sera que ainda é funcional pois isto foi mudado por arrays diferentes...
				//console.log('id = ovini '+ this.worldX);
				//toda vez que ovni toca extremidades do mapa sorteia nova rota
					if (this.worldX > sprites[achar('background')].lar || this.worldX + this.lar < 0 || this.worldY < 0) {						
						//console.log('saiu do mapa....'+ this.etc);
						if (this.worldX > sprites[achar('background')].lar) {
							if (this.status == 'moveRight') {
								this.status = 'moveLeft';
								//console.log('saiu a direita'+ this.worldX);							
								if (this.etc == 'starWars' && this.txt !== 'jedi') {
									//console.log('starWars index: '+ sprites.indexOf(this));
									mileniunFalconLeft.worldX = this.worldX;
									mileniunFalconLeft.worldY = this.worldY;
									sprites[sprites.indexOf(this)] = mileniunFalconLeft;
								}								
							}
							//remendo muito do porco
							if (this.etc == 'starWars' && this.txt == 'jedi' && this.status == 'moveRightDown') {
								jediLeft.worldX = this.worldX;
								jediLeft.worldY = this.worldY;
								//jedi.status = 'moveLeftDown';
								sprites[sprites.indexOf(this)] = jediLeft;
							}							
						}
						if(this.worldX < 0) {
							if (this.status == 'moveLeft') {
								this.status = 'moveRight';
								//
								if (this.etc == 'starWars' && this.txt !== 'jedi') {					
									mileniunFalconRight.worldX = this.worldX;
									mileniunFalconRight.worldY = this.worldY;
									sprites[sprites.indexOf(this)] = mileniunFalconRight;
								}							
							}
							//remendo jedi
							if (this.etc == 'starWars' && this.txt == 'jedi' && this.status == 'moveLeftDown'){
								jediRight.worldX = this.worldX;
								jediRight.worldY = this.worldY;
								//this.status = 'moveRightDown';
								sprites[sprites.indexOf(this)] = jediRight;
							}
							//??????????????????????????????????????????????????????????????????
							if (this.status == 'moveLeftDown'){
								if (this.etc == 'jedi-obi-wan') {//????????????????????????????????
									this.worldX = 3300;
								}
							}//??????????????????????????????????????????????????????????????????
							
						}
						//sorteia nova posição em y e speed = altura e velocidade....
						this.worldY = Math.floor((Math.random() * sprites[achar('background')].alt) + 1);
						this.speed = Math.floor((Math.random() * 5) + 1);//afeta velocidade speed...???
					}
				//passaros ajustar metaX,Y dos segueLider
				if (this.etc == 'lider') {
					lider = this;
					this.speed = 1;
					//liderY = this.worldY;
				}
				if (this.etc == 'segueLider' && lider != null) {
					this.status = null;
					this.speed = 1;
					//if (contLoop%200 == 0) {
					variacao = Math.floor((Math.random() * 150) + 0);// de 0 a 9
					if (Math.floor((Math.random() * 2) + 0)) { variacao *= -1; }
					//}
					
					if (lider.status == 'moveRight') {
						if (this.txt < 0) {
							this.metaHorizontal = lider.worldX + 65 *this.txt + variacao;
						}else{
							this.metaHorizontal = lider.worldX - 65 *this.txt + variacao;
						}
					}
					if (lider.status == 'moveLeft') {
						if (this.txt < 0) {
							this.metaHorizontal = lider.worldX - 65 *this.txt + variacao;
						}else{
							this.metaHorizontal = lider.worldX + 65 *this.txt + variacao;
						}
					}
					this.metaVertical = lider.worldY + 25 *this.txt + variacao;
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
					
					bloqueando(sprites[achar('player')], this);								
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
			//
		}
		//btn.....
		if (this.etc == 'up-right') {
			//console.log('botão up-right...');
			if (sprites[achar('background')].status == 'mapa') {
				//	
				this.esc = .3;
				this.lar = (this.img.width / this.col) * this.esc;
				this.alt = (this.img.height / this.lin) * this.esc;
				this.posX = cnv.width - this.lar;
			}else{//jogo...
				this.esc = .1;
				this.lar = (this.img.width / this.col) * this.esc;
				this.alt = (this.img.height / this.lin) * this.esc;
				this.posX = metaWidth - this.lar;
			}
		}
	}	
}
Sprite.prototype.metax = function(){
	return (this.lar) / 2;
}
Sprite.prototype.metay = function(){
	return (this.alt) / 2;
}
Sprite.prototype.meiox = function(){
	return this.posX + this.metax();
}
Sprite.prototype.meioy = function(){
	return this.posY + this.metay();
}
function bloqueando(p1, p2){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.posY += overlapy;
				//
				console.log('bateu cabeça: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('entrou '+ p2.txt);
					//aqui muda de fase....					
					sprites[achar('player')].fase = p2.txt;					
				}
			} else {
				p1.posY -= overlapy;
				//
				console.log('esta pisando: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('saiu '+ p2.txt);
					//aqui muda de fase....					
					sprites[achar('player')].fase = p2.txt;					
				}
			}
		} else { // colisão pelos lados esquerda ou direita
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if(catx > 0){ // colidiu na esquerda
				p1.posX += overlapx;
				//
				console.log('player bateu à esquerda: '+ p2.id);
			}else{
				p1.posX -= overlapx;
				//
				console.log('player bateu à direita: '+ p2.id);
			}
		}
	}
}
function empurando(p2, p1){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.worldY += overlapy; 
			} else {
				p1.worldY -= overlapy;
			}
		} else { // colisão pelos lados esquerda ou direita
			if(catx > 0){ // colideu na esquerda
				p1.worldX += overlapx;
			}else{
				p1.worldX -= overlapx;
			}
		}
	}
}
function colide(p1, p2){
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		return true;
	}else{
		return false;
	}
}
//
function Texto(txt, lin, col, status){
	this.txt = txt;
	this.linha = 200;
	this.coluna = 200;
	this.font = "20px bold Comic Sans MS";
	this.cor = '#fff';
	this.flag = 'txt';
	this.status = status;	
	this.desenha = function(){
		if (this.status !== 'oculto') {
			ctx.font = this.font;
			ctx.fillStyle = this.cor;
			//ctx.textAlign = "center";

			if (lin == 'cima') { this.linha = 30;}
			if (lin == 'meio') { this.linha = cnv.height/2;}
			if (lin == 'baixo') { this.linha = cnv.height-1;}
			if (col == 'direita') { this.coluna = cnv.width - 100;}
			if (col == 'meio') { this.coluna = cnv.width/2;}
			if (col == 'esquerda') { this.coluna = 0;}
			//console.log(this.coluna);		
			ctx.fillText(this.txt, this.coluna, this.linha);
		}
	}
	this.exe = function(){
		if (this.status == 'help') {
			this.txt = 'Help: M = mapa , 0 = help.html';
		}
		if (this.status == 'gpsPlayer') {
			//this.txt = 'cnvX: '+ sprites[achar('player')].meiox() +' .... cnvY: '+ sprites[achar('player')].meioy() + '    //////////    backX: '+sprites[encontrar('background')].srcX +' .... backY: '+sprites[encontrar('background')].srcY;
			
			this.txt = 'WORLD POSITION  horizontal X: '+ sprites[achar('player')].gpsX +' .... vertical Y: '+ sprites[achar('player')].gpsY;
		}		
	}
}