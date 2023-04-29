//GLOBAIS
	var socket = io('http://localhost:3000')//https://3000-fb005aa7-c2b8-4f4b-b1dc-44404c0579ce.ws-us02.gitpod.io/
	var debug = false;
	var pause = false;
	var contLoop = 0;
	var contImg = 0;
	var sprites = world = new Array();//dava aqui o bug dessa merda... descrever melhor a bosta que deu aqui...
	var ceu = new Array();
	var contCeu = 0;
	var player = null;
	var mapa = new Array();
	var fase01 = new Array();
	var bordel = new Array();
	var telaX = 1000;
	var telaY = 450;
	var metaWidth = telaX;//tamanho da tela de jogo width
	var metaHeight = telaY;//tamanho da tela de jogo
	var mileniunFalconLeft = jediLeft = null;
	var mileniunFalconRight = jediRight = null;
	var lider = lider01 = null;
	var variacao = 0;
	var iaX = iaY = iaLar = null;
	var objSpr = gpMorena = gpLoira = null;
	var posXrua = posYrua = srcXtela = srcYtela = null;
//************************************************************
function start(){//carregou a pagina web...
	console.log('start iniciado...');
	//tamanho da camera
		cnv.width = metaWidth;
		cnv.height = metaHeight;
	//carregar sprites sheets do game  LOADING...........
	//world ****************************************************************************************
		//background / mapa
			world.push('mapa[0]');//string avisando que objeto deveria estar aqui....
			ceu.push('mapa');
			mapa.push(new Sprite('img/city.png', 1, 1, 'background'));
			mapa[0].status = 'game';
			mapa[0].id = 'world';
			mapa[0].img.onload = function(){
				//esta medida so pode ser setada depois da imagem carregada............
				mapa[0].lar = (mapa[0].img.width / mapa[0].col) * mapa[0].esc;
				mapa[0].alt = (mapa[0].img.height / mapa[0].lin) * mapa[0].esc;
				world[0] = mapa[0];//mapa[0] primeiro sprite do game e primeira fase também...
				contImg++;
				ceu[0] = mapa[0];
				contCeu++;
			}
		//player
		world.push('player');
		ceu.push('player');
			player = new Player('img/players.png', 12, 8, 'player');
			player.id = 'player';
			player.status = 'grupo';
			player.esc = 1;
			player.posX = 560;//2650;
			player.posY = 300;//300;
			player.nFrames = 3;
			player.txFrequencia = 10;
			player.img.onload = function(){
				//esta medida so pode ser setada depois da imagem carregada............
				player.lar = (player.img.width / player.col) * player.esc;
				player.alt = (player.img.height / player.lin) * player.esc;
				world[1] = player;
				contImg++;
				ceu[1] = player;
				contCeu++;
			}
		// Personagems precisão estar posicionados antes da cidade / predios na pilha de arrays
			//prost's
				//npc gp-indo-trampa spriteSheet de grupo...
				let prostMorena = new Npc('img/players1.png', 12, 8, 'npc');
					//prostMorena.status = 'moveLeft';
					prostMorena.id = 'gp-indo-trampa';
					prostMorena.etc = 'gpMorena';
					prostMorena.speed = .5;
					prostMorena.worldX = 672;
					prostMorena.worldY = 320;
					prostMorena.metaHorizontal = 685;
					prostMorena.metaVertical = 375;
					prostMorena.grCol = 2;
					prostMorena.grLin = 1;
					prostMorena.nFrames = 3;
					prostMorena.direcao = 0;
					prostMorena.esc = 1;
					prostMorena.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
						prostMorena.lar = (prostMorena.img.width / prostMorena.col) * prostMorena.esc;
						prostMorena.alt = (prostMorena.img.height / prostMorena.lin) * prostMorena.esc;
						prostMorena.metaHorizontal += prostMorena.lar/2 + 3;//-18?? metade lar
						prostMorena.metaVertical += prostMorena.alt/2 + 3;//-27?? metade alt
						world.push(prostMorena);
						//console.log('prostMorena ==> '+sprites.indexOf(prostMorena));
						contImg++;
					}
				gpMorena = new Npc('img/player1.png', 3, 4, 'npc');
					gpMorena.exibir = false;
					gpMorena.id = 'gp-trampando';
					gpMorena.esc = .75;
					gpMorena.speed = .5;
					gpMorena.worldX = 665;//this.worldX;
					gpMorena.worldY = 515;//this.worldY;
					gpMorena.nFrames = 3;
					gpMorena.txFrequencia = 25;
					gpMorena.direcao = 0;
					//gpMorena.status = 'moveDown';
					gpMorena.metaHorizontal = 689;
					gpMorena.metaVertical = 570;
					gpMorena.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
							gpMorena.lar = (gpMorena.img.width / gpMorena.col) * gpMorena.esc;
							gpMorena.alt = gpMorena.img.height / gpMorena.lin * gpMorena.esc;
							gpMorena.metaHorizontal += prostMorena.lar/2 + 3;//-18?? metade lar
							gpMorena.metaVertical += prostMorena.alt/2 + 3;//-27?? metade alt
						//contImg++;//ñ conta por que ñ vai para o array de sprites
					}
				//
				let prostLoira = new Npc('img/players1.png', 12, 8, 'npc');
					//prostLoira.status = 'moveDown';
					prostLoira.id = 'gp-indo-trampa';
					prostLoira.etc = 'gpLoira';
					prostLoira.speed = .5;
					prostLoira.worldX = 289;
					prostLoira.worldY = 362;
					prostLoira.metaHorizontal = 319;
					prostLoira.metaVertical = 390;
					prostLoira.grCol = 1;
					prostLoira.grLin = 1;
					prostLoira.nFrames = 3;
					prostLoira.direcao = 0;
					prostLoira.esc = 1;
					prostLoira.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
						prostLoira.lar = (prostLoira.img.width / prostLoira.col) * prostLoira.esc;
						prostLoira.alt = (prostLoira.img.height / prostLoira.lin) * prostLoira.esc;
						world.push(prostLoira);
						//console.log('prostloira ==> '+sprites.indexOf(prostLoira));
						contImg++;
					}
				gpLoira = new Npc('img/player.png', 3, 4, 'npc');
					gpLoira.exibir = false;
					gpLoira.id = 'gp-trampando';
					gpLoira.esc = .5;
					gpLoira.speed = .5;
					gpLoira.worldX = 665;//this.worldX;
					gpLoira.worldY = 515;//this.worldY;
					gpLoira.nFrames = 3;
					gpLoira.txFrequencia = 25;
					gpLoira.direcao = 0;
					//gpLoira.status = 'moveDown';
					gpLoira.metaHorizontal = 689;
					gpLoira.metaVertical = 570;

					gpLoira.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
							gpLoira.lar = (gpLoira.img.width / gpLoira.col) * gpLoira.esc;
							gpLoira.alt = gpLoira.img.height / gpLoira.lin * gpLoira.esc;
						//contImg++;//ñ conta por que ñ vai para o array de sprites
					}
				//
				//npc gp-esquina
				let prostEsquina = new Npc('img/gpEsquina.png', 4, 4, 'npc');
					prostEsquina.status = 'fixo';
					prostEsquina.id = 'gp-esquina';
					prostEsquina.etc = 'gp';
					prostEsquina.speed = 5;
					prostEsquina.worldX = 610;
					prostEsquina.worldY = 560;
					//prostEsquina.grCol = 2;
					//prostEsquina.grLin = 1;
					prostEsquina.nFrames = 4;
					prostEsquina.txFrequencia = 20;
					prostEsquina.direcao = 3;//sortear direção entre 0 & 3
					prostEsquina.esc = .85;
					prostEsquina.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
						prostEsquina.lar = (prostEsquina.img.width / prostEsquina.col) * prostEsquina.esc;
						prostEsquina.alt = (prostEsquina.img.height / prostEsquina.lin) * prostEsquina.esc;
						world.push(prostEsquina);
						//console.log('prostEsquina ==> '+world.indexOf(prostEsquina));
						contImg++;
					}
				/*/npc gp-esquina2
				let prostEsquina2 = new Npc('img/prostEsquina01.png', 6, 1, 'npc');
					prostEsquina2.status = 'fixo';
					prostEsquina2.id = 'gp-esquina2';
					prostEsquina2.etc = 'gp';
					prostEsquina2.speed = 5;
					prostEsquina2.worldX = 900;
					prostEsquina2.worldY = 550;
					//prostEsquina2.grCol = 2;
					//prostEsquina2.grLin = 1;
					prostEsquina2.nFrames = 6;
					prostEsquina2.txFrequencia = 20;
					prostEsquina2.direcao = 0;//sortear direção entre 0 & 3
					prostEsquina2.esc = .45;
					prostEsquina2.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
						prostEsquina2.lar = (prostEsquina2.img.width / prostEsquina2.col) * prostEsquina2.esc;
						prostEsquina2.alt = (prostEsquina2.img.height / prostEsquina2.lin) * prostEsquina2.esc;
						world.push(prostEsquina2);
						//console.log('prostEsquina2 ==> '+world.indexOf(prostEsquina2));
						contImg++;
					}
				/*/
				let gpSobeDesce = new Npc('img/gp01.png', 3, 4, 'npc');
					gpSobeDesce.exibir = false;
					gpSobeDesce.id = 'gp-trampando';
					gpSobeDesce.etc = 'esta aqui';
					gpSobeDesce.speed = .5;
					gpSobeDesce.worldX = 610;
					gpSobeDesce.worldY = 520;
					gpSobeDesce.metaHorizontal = 615;
					gpSobeDesce.metaVertical = 570;
					gpSobeDesce.nFrames = 3;
					gpSobeDesce.txFrequencia = 20;
					gpSobeDesce.direcao = 0;
					gpSobeDesce.esc = .6;
					gpSobeDesce.img.onload = function(){
						//esta medida so pode ser setada depois da imagem carregada............
						gpSobeDesce.lar = (gpSobeDesce.img.width / gpSobeDesce.col) * gpSobeDesce.esc;
						gpSobeDesce.alt = (gpSobeDesce.img.height / gpSobeDesce.lin) * gpSobeDesce.esc;
						world.push(gpSobeDesce);
						//console.log('gpSobeDesce ==> '+world.indexOf(gpSobeDesce));
						contImg++;
					}
				//
			//
		
		//cidade
			predio01(256, 223, 70);
			predio02(384, 273, 70, 'fase01');
			predio03(640, 191, 70);
			predio04(1279, 159, 70);
			predio05(2431, 189, 80);
			muro05(2368, 127);
			predio02(642, 464, 70, 'bordel');
			//
			arvore(93, 37);
			arvore(-3, 293);
			arvore(221, 5);
			arvore(317, 69);
			arvore(477,69);
			tronco(242, 110);
			tronco(627, 110);
			pedra(69, 162);
			pedra(198, 66);
			moita(129, 259);
			moitinha(173, 334);
			baril(866, 512);
			baril(802, 512);
			baril(802, 540);
			//espectreman
			let espectreman = new Sprite('img/spectreman.png', 1, 1, 'npc');
			espectreman.esc = .5;
			espectreman.fr = 0;
			espectreman.worldX = 430;
			espectreman.worldY = 120;
			espectreman.nFrames = 1;
			espectreman.exibir = true;
			espectreman.id = 'espectreman';
			espectreman.acima = true;
			espectreman.img.onload = function(){
					//console.log('img '+ indce +' src = '+ world[indce].img.src);
					//ajusta largura e altura do quadro conforme medidas / n quadros
					//esta medida so pode ser setada depois da imagem carregada............
						espectreman.lar = (espectreman.img.width / espectreman.col) * espectreman.esc;
						espectreman.alt = (espectreman.img.height / espectreman.lin) * espectreman.esc;
						//mileniunFalconRight.worldX = mileniunFalconRight.lar * -1;
					world.push(espectreman);
					contImg++;
			}
		//ceu
			passaros();
			nuvem();
			//
			mileniunFalconRight = new Sprite('img/mileniunFalconRight.png', 1, 1, 'npc');
				mileniunFalconRight.status = 'moveRight';
				mileniunFalconRight.esc = .5;
				mileniunFalconRight.fr = 0;
				mileniunFalconRight.txFrequencia = 1;
				mileniunFalconRight.speed = Math.floor((Math.random() * 15) + 1);
				mileniunFalconRight.worldX = 0;
				mileniunFalconRight.worldY = Math.floor((Math.random() * 3000) + 1);
				mileniunFalconRight.nFrames = 1;
				mileniunFalconRight.exibir = true;
				mileniunFalconRight.id = 'ovni';
				mileniunFalconRight.txt = 'naveMae';
				mileniunFalconRight.acima = true;
				mileniunFalconRight.etc = 'starWars';
				mileniunFalconRight.img.onload = function(){
					//console.log('img '+ indce +' src = '+ world[indce].img.src);
					//ajusta largura e altura do quadro conforme medidas / n quadros
					//esta medida so pode ser setada depois da imagem carregada............
						mileniunFalconRight.lar = (mileniunFalconRight.img.width / mileniunFalconRight.col) * mileniunFalconRight.esc;
						mileniunFalconRight.alt = (mileniunFalconRight.img.height / mileniunFalconRight.lin) * mileniunFalconRight.esc;
						//mileniunFalconRight.worldX = mileniunFalconRight.lar * -1;
					ceu.push(mileniunFalconRight);
					contCeu++;
				}
				mileniunFalconLeft = new Sprite('img/mileniunFalcon.png', 1, 1, 'npc');
					mileniunFalconLeft.status = 'moveLeft';
					mileniunFalconLeft.esc = .5;
					mileniunFalconLeft.fr = 0;
					mileniunFalconLeft.txFrequencia = 1;
					mileniunFalconLeft.speed = Math.floor((Math.random() * 5) + 1) + 40;
					mileniunFalconLeft.worldX = 0;
					mileniunFalconLeft.worldY = Math.floor((Math.random() * 3000) + 1);
					mileniunFalconLeft.nFrames = 1;
					mileniunFalconLeft.exibir = true;
					mileniunFalconLeft.id = 'ovni';
					mileniunFalconLeft.txt = 'naveMae';
					mileniunFalconLeft.acima = true;
					mileniunFalconLeft.etc = 'starWars';
					mileniunFalconLeft.img.onload = function(){
						//console.log('img '+ indce +' src = '+ world[indce].img.src);
						//ajusta largura e altura do quadro conforme medidas / n quadros
						//esta medida so pode ser setada depois da imagem carregada............
							mileniunFalconLeft.lar = (mileniunFalconLeft.img.width / mileniunFalconLeft.col) * mileniunFalconLeft.esc;
							mileniunFalconLeft.alt = (mileniunFalconLeft.img.height / mileniunFalconLeft.lin) * mileniunFalconLeft.esc;
							//mileniunFalconLeft.worldX = mileniunFalconLeft.lar * -1;
						//world.push(mileniunFalconLeft);
						//contImg++;
					}
				//*************************************************************
			jediRight = new Sprite('img/jediRight.png', 1, 1, 'npc');
				jediRight.status = 'moveRightDown';
				jediRight.esc = .5;
				jediRight.fr = 0;
				jediRight.txFrequencia = 1;
				jediRight.speed = Math.floor((Math.random() * 15) + 1);
				jediRight.worldX = 0;
				jediRight.worldY = Math.floor((Math.random() * 3000) + 1);
				jediRight.nFrames = 1;
				jediRight.exibir = true;
				jediRight.id = 'ovni';
				jediRight.txt = 'jedi';
				jediRight.acima = true;
				jediRight.etc = 'starWars';
				jediRight.img.onload = function(){
					//console.log('img '+ indce +' src = '+ world[indce].img.src);
					//ajusta largura e altura do quadro conforme medidas / n quadros
					//esta medida so pode ser setada depois da imagem carregada............
						jediRight.lar = (jediRight.img.width / jediRight.col) * jediRight.esc;
						jediRight.alt = (jediRight.img.height / jediRight.lin) * jediRight.esc;
						//jediRight.worldX = jediRight.lar * -1;
					ceu.push(jediRight);
					contCeu++;
				}
				jediLeft = new Sprite('img/jediLeft.png', 1, 1, 'npc');
				jediLeft.status = 'moveLeftDown';
				jediLeft.esc = .5;
				jediLeft.fr = 0;
				jediLeft.txFrequencia = 1;
				jediLeft.speed = Math.floor((Math.random() * 5) + 1) + 40;
				jediLeft.worldX = 0;
				jediLeft.worldY = Math.floor((Math.random() * 3000) + 1);
				jediLeft.nFrames = 1;
				jediLeft.exibir = true;
				jediLeft.id = 'ovni';
				jediLeft.txt = 'jedi';
				jediLeft.acima = true;
				jediLeft.etc = 'starWars';
				jediLeft.img.onload = function(){
					//console.log('img '+ indce +' src = '+ world[indce].img.src);
					//ajusta largura e altura do quadro conforme medidas / n quadros
					//esta medida so pode ser setada depois da imagem carregada............
						jediLeft.lar = (jediLeft.img.width / jediLeft.col) * jediLeft.esc;
						jediLeft.alt = (jediLeft.img.height / jediLeft.lin) * jediLeft.esc;
						//jediLeft.worldX = jediLeft.lar * -1;
					//world.push(jediLeft);
					//contImg++;
				}
			//npc ovni spriteSheet linha
			let objOvni = new Sprite('img/ovni.png', 3, 1, 'npc');
				objOvni.status = 'moveRight';
				objOvni.esc = 1;
				objOvni.speed = Math.floor((Math.random() * 30) + 1);
				objOvni.worldX = 0;
				objOvni.worldY = Math.floor((Math.random() * 3000) + 1);
				objOvni.nFrames = 3;
				objOvni.exibir = true;
				objOvni.id = 'ovni';
				objOvni.txt = 'naveMae';
				objOvni.acima = true;
				objOvni.img.onload = function(){
					//console.log('img '+ indce +' src = '+ world[indce].img.src);
					//ajusta largura e altura do quadro conforme medidas / n quadros
					//esta medida so pode ser setada depois da imagem carregada............
						objOvni.lar = (objOvni.img.width / objOvni.col) * objOvni.esc;
						objOvni.alt = (objOvni.img.height / objOvni.lin) * objOvni.esc;
						//objOvni.worldX = objOvni.lar * -1;
					ceu.push(objOvni);
					contCeu++;
				}
		//botões na tela
			let btn = new Sprite('img/worldIcone.png', 1, 1, 'txt');
			btn.status = 'fixo';
			btn.id = 'btn';	
			btn.etc = 'up-right';
			btn.posY = 0;
			btn.exibir = true;
			btn.esc = .1;
			btn.img.onload = function(){
				//esta medida so pode ser setada depois da imagem carregada............
				btn.lar = (btn.img.width / btn.col) * btn.esc;
				btn.alt = (btn.img.height / btn.lin) * btn.esc;
				btn.posX = metaWidth - btn.lar;
				world.push(btn);
				contImg++;
				//ceu.push(btn);
				//contCeu++;
			}
			let btn2 = new Sprite('img/btnMapa2.png', 1, 1, 'txt');
			btn2.status = 'fixo';
			btn2.id = 'btn';	
			btn2.etc = 'up-right';
			btn2.posY = 0;
			btn2.exibir = true;
			btn2.esc = .1;
			btn2.img.onload = function(){
				//esta medida so pode ser setada depois da imagem carregada............
				btn2.lar = (btn2.img.width / btn2.col) * btn2.esc;
				btn2.alt = (btn2.img.height / btn2.lin) * btn2.esc;
				btn2.posX = metaWidth - btn2.lar;
				//world.push(btn2);
				//contImg++;
				ceu.push(btn2);
				contCeu++;
			}
		//
		//textos.....
			//new Texto(hello world,     esquerda meio etc, cima meio baixo, flag, status ou funcionalidade)
			
			let texto1 = new Texto('00', 'baixo', 'esquerda', 'gpsPlayer');
			let texto2 = new Texto('00', 'cima', 'esquerda', 'gpsMouse');
			world.push(texto1);contImg++;
			world.push(texto2);contImg++;
			//aqui que da o erro na contagem das imagens ñ entendo o porque????????????????
			ceu.push(texto1);contCeu++;
			ceu.push(texto2);contCeu++;

	//*************************************************************************************
	//fase01******************************************************************************
		//
		fase01.push(new Sprite('img/background2.jpg', 1, 1, 'background'));
		fase01[0].status = 'game';
		fase01[0].id = 'fase01';
		fase01[0].img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			fase01[0].lar = (fase01[0].img.width / fase01[0].col) * fase01[0].esc;
			fase01[0].alt = (fase01[0].img.height / fase01[0].lin) * fase01[0].esc;				
		}
		fase01.push(player);
		//porta fase01
		let ptr = new Sprite('img/background2.jpg', 1, 1, 'npc')			
		ptr.fr = 0;
		ptr.status = 'fixo';
		ptr.srcX = 460;//258;
		ptr.srcY = 425;//323;
		ptr.lar = 50;//250;
		ptr.alt = 1;
		ptr.worldX = 460;//150;//objSpr.srcX;
		ptr.worldY = ptr.srcY;//150;//objSpr.srcY;
		ptr.acima = false;
		ptr.id = 'porta';
		ptr.txt = 'world';
		fase01.push(ptr);
		fase01.push(texto1);
	//bordel*************************************************************************************
		bordel.push(new Sprite('img/bordel.png', 1, 1, 'background'));
		bordel[0].status = 'game';
		bordel[0].id = 'bordel';
		bordel[0].img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			bordel[0].lar = (bordel[0].img.width / bordel[0].col);// * bordel[0].esc;
			bordel[0].alt = (bordel[0].img.height / bordel[0].lin);// * bordel[0].esc;
		}		
		bordel.push(player);
		ptr = new Sprite('img/bordel.png', 1, 1, 'npc')			
		ptr.fr = 0;
		ptr.status = 'fixo';
		ptr.srcX = 90;//258;
		ptr.srcY = 620;//323;
		ptr.lar = 100;//250;
		ptr.alt = 1;
		ptr.worldX = ptr.srcX;//150;//objSpr.srcX;
		ptr.worldY = ptr.srcY;//150;//objSpr.srcY;
		ptr.acima = false;
		ptr.id = 'porta';
		ptr.txt = 'world';
		bordel.push(ptr);		
		bordel.push(texto1);
	//*****************************************************************************************

	loading();
}
function loading(){
	if (world.length == contImg) {
		console.log('loading...');

		organizarSprites();
		
		loop();				
	}else{
		console.log('carregando');
		setTimeout(function(){ loading(); }, 500);
	}
}
function organizarSprites () {
	//organizar array / pilha de sprites...
	let troca = false;
	do{//txt
		troca = false;			
		for (let i = sprites.length - 2; i >= 0; i--){
			//teste logico para piso / chão.......
			if (sprites[i].id !== 'world' && sprites[i].id !== 'piso' && sprites[i+1].flag == 'piso') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;										
			}
			//txt
			if (sprites[i].flag == 'txt' && sprites[i+1].flag !== 'txt') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;										
			}
			//ovni
			if (sprites[i].id == 'ovni' && sprites[i+1].id !== 'ovni' && sprites[i+1].flag !== 'txt') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;					
			}
			//nuvem
			if (sprites[i].flag == 'nuvem' && sprites[i+1].flag !== 'nuvem' && sprites[i+1].id !== 'ovni' && sprites[i+1].flag !== 'txt') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;					
			}
			if (sprites[i].id == 'predio' && sprites[i+1].id !== 'predio' && sprites[i+1].flag !== 'nuvem' && sprites[i+1].id !== 'ovni' && sprites[i+1].flag !== 'txt') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;					
			}
			if (sprites[i].id == 'baril' && sprites[i+1].id !== 'baril' && sprites[i+1].id !== 'predio' && sprites[i+1].flag !== 'nuvem' && sprites[i+1].id !== 'ovni' && sprites[i+1].flag !== 'txt') {
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;					
			}
			//player online
			if(sprites[i+1].flag == 'player-online' && sprites[i].flag !== 'player-online' && sprites[i].flag !== 'player'){
				troca = sprites[i];
				sprites[i] = sprites[i+1];
				sprites[i+1] = troca;
				troca = true;					
			}
			/*/
				if (sprites[i]. == '' && sprites[i+1]. !== '' ) {
					troca = sprites[i];
					sprites[i] = sprites[i+1];
					sprites[i+1] = troca;
					troca = true;					
				}
			/*/
		}
	}while(troca);
}
function nuvem(){
	//nuvem 	move-se com posX e posY pois so aparece na tela grande
	 let velocidade = Math.floor((Math.random() * 10)+1);// tem a ver com velocidade da nuvem
	for (let i = 0; i < Math.floor((Math.random() * 30) + 1); i++) {
		let nuvem = new Sprite('img/cloud.png', 1, 1, 'nuvem');
		nuvem.status = 'oculto';
		nuvem.esc = 1;
		nuvem.speed = 2;
		nuvem.posX = Math.floor((Math.random() * 2200));
		nuvem.posY = Math.floor((Math.random() * 3100));
		nuvem.nFrames = 1;
		nuvem.fr = 0;//quando é somente um frame a frequencia deve ser zero
		nuvem.exibir = false;
		nuvem.txFrequencia = velocidade;
		nuvem.img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
				nuvem.lar = (nuvem.img.width / nuvem.col) * nuvem.esc;
				nuvem.alt = nuvem.img.height / nuvem.lin * nuvem.esc;
			ceu.push(nuvem);
			contCeu++;
		}		
	}
}
function passaros(){
	let srcImg = 'img/passaros02	.png';
	let piu = new Sprite(srcImg, 3, 4, 'npc');
		piu.id = 'ovni';
		piu.status = 'moveRight';
		piu.etc = 'lider';
		piu.speed = 1;
		piu.worldX = 1500;
		piu.worldY = 1500;
		piu.direcao = 2;
		piu.esc = 1;
		piu.nFrames = 3;
		//piu.grCol = 2;
		//piu.grLin = 0;
		piu.txFrequencia = 15;
		//piu.frame = Math.floor((Math.random() * 3)+0);
		piu.exibir = true;
		piu.acima = true;
		piu.img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			piu.lar = (piu.img.width / piu.col) * piu.esc;
			piu.alt = (piu.img.height / piu.lin) * piu.esc;
			ceu.push(piu);
			//console.log('passaro 01 ==> '+world.indexOf(piu));
			contCeu++;
		}
	for (let i = 15; i > 0; i--) {
		let piUp = new Sprite(srcImg, 3, 4, 'npc');
			piUp.id = 'ovni';
			//piUp.status = 'moveRight';
			piUp.etc = 'segueLider';
			piUp.txt = i;
			piUp.speed = 1;
			piUp.worldX = piu.worldX - 65 *i;
			piUp.worldY = piu.worldY + 25 *i;
			piUp.direcao = 2;
			piUp.esc = 1;
			piUp.nFrames = 3;
			piUp.txFrequencia = 5 +  Math.floor((Math.random() * 15) + 1);
			//piUp.frame = Math.floor((Math.random() * 3)+0);
			piUp.exibir = true;
			piUp.acima = true;
			piUp.img.onload = function(){
				//esta medida so pode ser setada depois da imagem carregada............
				piUp.lar = (piUp.img.width / piUp.col) * piUp.esc;
				piUp.alt = (piUp.img.height / piUp.lin) * piUp.esc;
				ceu.push(piUp);
				//console.log('passaro 01 ==> '+world.indexOf(piUp));
				contCeu++;
			}
		let piuDown = new Sprite(srcImg, 3, 4, 'npc');
		piuDown.id = 'ovni';
		//piuDown.status = 'moveRight';
		piuDown.etc = 'segueLider';
		piuDown.txt = i * -1;
		piuDown.speed = 1;
		piuDown.worldX = piu.worldX - 65 * i;
		piuDown.worldY = piu.worldY - 25 * i;
		piuDown.direcao = 2;
		piuDown.esc = 1;
		piuDown.nFrames = 3;
		piuDown.txFrequencia = 5 +  Math.floor((Math.random() * 15) + 1);
		//piuDown.frame = Math.floor((Math.random() * 3)+0);
		piuDown.exibir = true;
		piuDown.acima = true;
		piuDown.img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			piuDown.lar = (piuDown.img.width / piuDown.col) * piuDown.esc;
			piuDown.alt = (piuDown.img.height / piuDown.lin) * piuDown.esc;
			ceu.push(piuDown);
			//console.log('passaro 01 ==> '+world.indexOf(piuDown));
			contCeu++;
		}	
	}
}
//carrega sprite e array com todas as imagens..........................................................
function loadSprites(src, col, lin, flag, status){	
	if (flag == 'txt') {
		sprites.push(new Texto('00', lin, col, status));
	}else{
		sprites.push(new Sprite(src, col, lin, flag));
		let indce = sprites.length - 1;
		//console.log('col ==>'+ sprites[indce].col +' lar ==>'+ sprites[indce].lar);
		sprites[indce].status = status;
		sprites[indce].img.onload = function(){
			//console.log('img '+ indce +' src = '+ sprites[indce].img.src);
			//ajusta largura e altura do quadro conforme medidas / n quadros
			//esta medida so pode ser setada depois da imagem carregada............
				sprites[indce].lar = (sprites[indce].img.width / sprites[indce].col) * sprites[indce].esc;
				sprites[indce].alt = (sprites[indce].img.height / sprites[indce].lin) * sprites[indce].esc;
				

			contImg++;
		}		
	}
}
function arvore(x, y){
	//arvore
		world.push(new Sprite('img/forest1.png', 1, 1, 'npc'));//copa da arvore e tronco da são de imagens diferentes por isto ñ é posivel proporcionar suas posições
			world[world.length-1].txt = 'nocaoProfundidade';
			world[world.length-1].fr = 0;
			world[world.length - 1].status = 'fixo';
			world[world.length-1].srcX = 109;//109
			world[world.length-1].srcY = 15;//15
			world[world.length-1].lar = 100;
			world[world.length-1].alt = 67;
			world[world.length-1].worldX = x;
			world[world.length-1].worldY = y;
			world[world.length-1].acima = true;
			world[world.length-1].deslocaY = 50;
			world[world.length-1].id = 'copa da árvore'
			contImg++;
		world.push(new Sprite('img/city.png', 1, 1,'npc'));//tronco arvore 0.0 alterna
			world[world.length-1].txt = 'nocaoProfundidade';
			world[world.length-1].fr = 0;
			world[world.length - 1].status = 'fixo';
			world[world.length-1].srcX = 32 + world[world.length-2].worldX;
			world[world.length-1].srcY = 50 + world[world.length-2].worldY;
			world[world.length-1].lar = 31;
			world[world.length-1].alt = 17;
			world[world.length-1].worldX = world[world.length-1].srcX;
			world[world.length-1].worldY = world[world.length-1].srcY;
			world[world.length-1].acima = true;
			contImg++;
		world.push(new Sprite('img/city.png', 1, 1,'npc'));//tronco arvore 0.1 bloqueia
			world[world.length-1].txt = 'nocaoProfundidade';
			world[world.length-1].fr = 0;
			world[world.length - 1].status = 'fixo';
			world[world.length-1].srcX = world[world.length-2].srcX;
			world[world.length-1].srcY = 10 + world[world.length-2].srcY;
			world[world.length-1].lar = 33;
			world[world.length-1].alt = 5;
			world[world.length-1].worldX = world[world.length-1].srcX;
			world[world.length-1].worldY = world[world.length-1].srcY;
			world[world.length-1].acima = false;
			world[world.length-1].id = 'tronco arvore'
			contImg++;
	//
}
function tronco(x, y){
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//tronco arvore 0.0 alterna
		world[world.length-1].txt = 'nocaoProfundidade';
		world[world.length-1].fr = 0;
		world[world.length - 1].status = 'fixo';
		world[world.length-1].srcX = x;//242;
		world[world.length-1].srcY = y;//110;
		world[world.length-1].lar = 28;
		world[world.length-1].alt = 35;
		world[world.length-1].worldX = world[world.length-1].srcX;
		world[world.length-1].worldY = world[world.length-1].srcY;
		world[world.length-1].acima = true;//???????????????????????????????????
		contImg++;
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//tronco arvore 0.1 bloqueia
		world[world.length-1].txt = 'nocaoProfundidade';
		world[world.length-1].fr = 0;
		world[world.length - 1].status = 'fixo';
		world[world.length-1].srcX = world[world.length-2].srcX;
		world[world.length-1].srcY = 10 + world[world.length-2].srcY;
		world[world.length-1].lar = 33;
		world[world.length-1].alt = 5;
		world[world.length-1].worldX = world[world.length-1].srcX;
		world[world.length-1].worldY = world[world.length-1].srcY;
		world[world.length-1].acima = false;
		world[world.length-1].id = 'tronco';
		contImg++;
}
function baril(x, y){
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//pedra 0.0 alterna
	world[world.length-1].txt = 'nocaoProfundidade';
	world[world.length-1].fr = 0;
	world[world.length - 1].status = 'fixo';
	world[world.length-1].srcX = x;
	world[world.length-1].srcY = y;
	world[world.length-1].lar = 28;
	world[world.length-1].alt = 33;
	world[world.length-1].worldX = world[world.length-1].srcX;
	world[world.length-1].worldY = world[world.length-1].srcY;
	world[world.length-1].acima = true;//???????????????????????????????????
	world[world.length-1].id = 'baril';
	contImg++;
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//pedra 0.1 bloqueia
	world[world.length-1].txt = 'nocaoProfundidade';
	world[world.length-1].fr = 0;
	world[world.length - 1].status = 'fixo';
	world[world.length-1].srcX = world[world.length-2].srcX;
	world[world.length-1].srcY = 15 + world[world.length-2].srcY;
	world[world.length-1].lar = 23;
	world[world.length-1].alt = 1;
	world[world.length-1].worldX = world[world.length-1].srcX;
	world[world.length-1].worldY = world[world.length-1].srcY;
	world[world.length-1].acima = false;
	world[world.length-1].id = 'baril';
	contImg++;
}
function pedra(x, y){
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//pedra 0.0 alterna
		world[world.length-1].txt = 'nocaoProfundidade';
		world[world.length-1].fr = 0;
		world[world.length - 1].status = 'fixo';
		world[world.length-1].srcX = x;//69;
		world[world.length-1].srcY = y;//162;
		world[world.length-1].lar = 25;
		world[world.length-1].alt = 26;
		world[world.length-1].worldX = world[world.length-1].srcX;
		world[world.length-1].worldY = world[world.length-1].srcY;
		world[world.length-1].acima = true;//???????????????????????????????????
		contImg++;
	world.push(new Sprite('img/city.png', 1, 1,'npc'));//pedra 0.1 bloqueia
		world[world.length-1].txt = 'nocaoProfundidade';
		world[world.length-1].fr = 0;
		world[world.length - 1].status = 'fixo';
		world[world.length-1].srcX = world[world.length-2].srcX;
		world[world.length-1].srcY = 10 + world[world.length-2].srcY;
		world[world.length-1].lar = 23;
		world[world.length-1].alt = 5;
		world[world.length-1].worldX = world[world.length-1].srcX;
		world[world.length-1].worldY = world[world.length-1].srcY;
		world[world.length-1].acima = false;
		world[world.length-1].id = 'pedra';
		contImg++;
}
function moita(x, y){
	world.push(new Sprite('img/forest1.png', 1, 1, 'npc'));//moita de imagen diferente por isto ñ é diferente suas posições de src e world
			world[world.length-1].txt = 'nocaoProfundidade';
			world[world.length-1].fr = 0;
			world[world.length - 1].status = 'fixo';
			world[world.length-1].srcX = 49;//109
			world[world.length-1].srcY = 140;//15
			world[world.length-1].lar = 63;
			world[world.length-1].alt = 60;
			world[world.length-1].worldX = x;
			world[world.length-1].worldY = y;
			world[world.length-1].acima = true;
			world[world.length-1].deslocaY = 50;
			world[world.length-1].id = 'moita';
			contImg++;	
}
function moitinha(x, y){
	world.push(new Sprite('img/moitinha.png', 1, 1, 'npc'));//moitinha de imagen diferente por isto ñ é diferente suas posições de src e world
			world[world.length-1].txt = 'nocaoProfundidade';
			world[world.length-1].fr = 0;
			world[world.length - 1].status = 'fixo';
			world[world.length-1].srcX = 0;
			world[world.length-1].srcY = 0;
			world[world.length-1].lar = 43;
			world[world.length-1].alt = 40;
			world[world.length-1].worldX = x;
			world[world.length-1].worldY = y;
			world[world.length-1].acima = true;
			world[world.length-1].deslocaY = 50;
			world[world.length-1].id = 'moitinha';
			contImg++;	
}
function predio01(x, y, tamanhoPorta){
	//predio azul 01...
		let memoIndex = memoIndexx = null;
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = x;//256;
				objSpr.srcY = y;//223;
				objSpr.lar = 128;
				objSpr.alt = 130;
				objSpr.worldX = objSpr.srcX;
				objSpr.worldY = objSpr.srcY;
				objSpr.acima = true;
				objSpr.id = 'predio';
				//este conjunto tem de estar em ordem
				world.push(objSpr);//predio azul parte de cima 2 andar parede intangivel
				memoIndex = world.indexOf(objSpr);
				contImg++;	
			objSpr = new Sprite('img/city.png', 1, 1, 'npc');			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;
				objSpr.srcY = world[memoIndex].srcY + 100;
				objSpr.lar = 25;
				objSpr.alt = 35;
				objSpr.worldX = world[memoIndex].worldX;
				objSpr.worldY = world[memoIndex].worldY + 100;
				objSpr.acima = false;
				objSpr.id = 'predio';
				objSpr.txt = 'teste de parede bloqueando'
				//
				memoIndexx = memoIndex;
				world.push(objSpr);//parede solida esquerda
				memoIndex = world.indexOf(objSpr);
				//console.log('parede solida esquerda: '+ objSpr.worldX +' , '+ objSpr.worldY +' , '+ memoIndex);
				contImg++;
			objSpr = new Sprite('img/city.png', 1, 1, 'npc')			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;//258;
				objSpr.srcY = world[memoIndex].srcY;//323;
				objSpr.lar = world[memoIndexx].lar;//250;
				objSpr.alt = 1;
				objSpr.worldX = world[memoIndex].worldX;//150;//objSpr.srcX;
				objSpr.worldY = world[memoIndex].worldY;//150;//objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'porta';
				objSpr.txt = 'fase01';
				//
				memoIndexx = memoIndex;
				world.push(objSpr);//limite acima da porta
				memoIndex = world.indexOf(objSpr);
				contImg++;
			objSpr = new Sprite('img/city.png', 1, 1, 'npc')			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;//258;
				objSpr.srcY = world[memoIndex].srcY-3;//323;
				objSpr.lar = 128;//250;
				objSpr.alt = 3;
				objSpr.worldX = world[memoIndex].worldX;//150;//objSpr.srcX;
				objSpr.worldY = world[memoIndex].worldY-3;//150;//objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'predio';
				objSpr.txt = null;
				//
				//memoIndexx = memoIndex;
				world.push(objSpr);//limite acima da porta
				//memoIndex = world.indexOf(objSpr);
				contImg++;
			objSpr = new Sprite('img/city.png', 1, 1, 'npc')			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX + tamanhoPorta;
				objSpr.srcY = world[memoIndex].srcY;
				objSpr.lar = world[memoIndex].lar - tamanhoPorta;
				objSpr.alt = 35;
				objSpr.worldX = world[memoIndex].worldX + tamanhoPorta;//objSpr.srcX;
				objSpr.worldY = world[memoIndex].worldY;//objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'predio';
				//
				memoIndexx = memoIndex;
				world.push(objSpr);//parede solida direita
				memoIndex = world.indexOf(objSpr);
				contImg++;
			/*/predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de world ou estar desenhada no bacground / mapa
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede intangivel
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndexx].srcX;//256;
				objSpr.srcY = world[memoIndexx].srcY + world[memoIndexx].alt;
				objSpr.lar = world[memoIndexx].lar;
				objSpr.alt = 60;
				objSpr.worldX = world[memoIndexx].worldX;//objSpr.srcX;
				objSpr.worldY = world[memoIndexx].worldY + world[memoIndexx].alt;//objSpr.srcY;
				objSpr.acima = true;
				objSpr.id = 'predio';
				contImg++;*/
}
function predio02(x, y, tamanhoPorta, portaLeva){
	//predio amarelo 02...
		let memoIndex = memoIndexx = null;
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');		
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = x;//384;
				objSpr.srcY = y;//273;
				objSpr.lar = 128;
				objSpr.alt = 80;
				objSpr.worldX = objSpr.srcX;
				objSpr.worldY = objSpr.srcY;
				objSpr.acima = true;
				objSpr.id = 'predio';
				world.push(objSpr);//predio parte de cima 2 andar parede intangivel
				memoIndex = world.indexOf(objSpr);
				contImg++;	
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');			
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;
				objSpr.srcY = world[memoIndex].srcY + world[memoIndex].alt;
				objSpr.lar = 25;//define inicio da porta
				objSpr.alt = 6;
				objSpr.worldX = world[memoIndex].worldX;
				objSpr.worldY = world[memoIndex].worldY + world[memoIndex].alt;
				objSpr.acima = false;
				objSpr.id = 'predio';
				world.push(objSpr);
				memoIndexx = memoIndex;
				memoIndex = world.indexOf(objSpr);
				contImg++;
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');//limite acima da porta
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;//258;
				objSpr.srcY = world[memoIndex].srcY - world[memoIndexx].alt/2 + 7;//323;
				objSpr.lar = 128;
				objSpr.alt = 3;
				objSpr.worldX = world[memoIndex].worldX;//150;//objSpr.srcX;
				objSpr.worldY = world[memoIndex].worldY - world[memoIndexx].alt/2 + 7;//150;//objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'predio';
				objSpr.txt = portaLeva;
				world.push(objSpr);
				//memoIndexx = memoIndex;
				//memoIndex = world.indexOf(objSpr);
				contImg++;	
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');//limite acima da porta
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				objSpr.srcX = world[memoIndex].srcX;//258;
				objSpr.srcY = world[memoIndex].srcY - world[memoIndexx].alt/2 + 10;//323;
				objSpr.lar = world[memoIndexx].lar;//250;
				objSpr.alt = 1;
				objSpr.worldX = world[memoIndex].worldX;//150;//objSpr.srcX;
				objSpr.worldY = world[memoIndex].worldY - world[memoIndexx].alt/2 + 10;//150;//objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'porta';
				objSpr.txt = portaLeva;
				world.push(objSpr);
				memoIndexx = memoIndex;
				memoIndex = world.indexOf(objSpr);
				contImg++;
		objSpr = new Sprite('img/city.png', 1, 1, 'npc');//limite amarelo
				objSpr.fr = 0;
				objSpr.status = 'fixo';
				//console.log('===> '+world[memoIndex].srcX);
				objSpr.srcX = world[memoIndex].srcX + tamanhoPorta;
				objSpr.srcY = world[memoIndex].srcY;
				objSpr.lar = 50;
				objSpr.alt = 30;
				objSpr.worldX = objSpr.srcX;
				objSpr.worldY = objSpr.srcY;
				objSpr.acima = false;
				objSpr.id = 'predio';
				world.push(objSpr);
				memoIndexx = memoIndex;
				memoIndex = world.indexOf(objSpr);
				contImg++;
}
function predio03(x, y, tamanhoPorta){
	//predio azul 03...
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//predio azul parte de cima 2 andar parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = x;//primeira parte do teto
				world[world.length-1].srcY = y;
				world[world.length-1].lar = 97;
				world[world.length-1].alt = 165;
				world[world.length-1].worldX = world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//predio azul parte de cima 2 andar parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX + world[world.length-2].lar;//segunda parte do teto
				world[world.length-1].srcY = world[world.length-2].srcY + 65;
				world[world.length-1].lar = 63;
				world[world.length-1].alt = world[world.length-2].alt - 65;
				world[world.length-1].worldX = world[world.length-2].worldX + world[world.length-2].lar;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY + 65;//world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX;
				world[world.length-1].srcY = world[world.length-3].srcY + 100 + 33;
				world[world.length-1].lar = 25;
				world[world.length-1].alt = 66 - 33;
				world[world.length-1].worldX = world[world.length-3].worldX;
				world[world.length-1].worldY = world[world.length-3].worldY + 100 + 33;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
			//tamanhoPorta = 70;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//limite acima da porta
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;//258;
				world[world.length-1].srcY = world[world.length-2].srcY;//323;
				world[world.length-1].lar = world[world.length-3].lar;//250;
				world[world.length-1].alt = 1;
				world[world.length-1].worldX = world[world.length-2].worldX;//150;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY;//150;//world[world.length-1].srcY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'porta';
				world[world.length-1].txt = 'fase01';
				contImg++;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida direita
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX + tamanhoPorta;
				world[world.length-1].srcY = world[world.length-2].srcY;
				world[world.length-1].lar = world[world.length-2].lar *1.45;
				world[world.length-1].alt = 66 - 33;
				world[world.length-1].worldX = world[world.length-2].worldX + tamanhoPorta;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY;//world[world.length-1].srcY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
			//predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de world ou estar desenhada no bacground / mapa
			/*world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX;//256;
				world[world.length-1].srcY = world[world.length-3].srcY + world[world.length-2].alt;
				world[world.length-1].lar = world[world.length-2].lar * 1.75;
				world[world.length-1].alt = 28;
				world[world.length-1].worldX = world[world.length-3].worldX;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt -1;//world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;*/
		//////////////////////////////////////////////////////////
}
function predio04(x, y, tamanhoPorta){
	//predio azul 04...
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = x;//1279;
				world[world.length-1].srcY = y;//159;
				world[world.length-1].lar = 257;
				world[world.length-1].alt = 159;
				world[world.length-1].worldX = world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;	
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt - 50;
				world[world.length-1].lar = 100;//define inicio da porta
				world[world.length-1].alt = 55;
				world[world.length-1].worldX = world[world.length-2].worldX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt - 50;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'parede solida';
				contImg++;
			tamanhoPorta = 80;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//limite acima da porta
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;//258;
				world[world.length-1].srcY = world[world.length-2].srcY;//323;
				world[world.length-1].lar = world[world.length-3].lar;//250;
				world[world.length-1].alt = 1;
				world[world.length-1].worldX = world[world.length-2].worldX;//150;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY;//150;//world[world.length-1].srcY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'porta';
				world[world.length-1].txt = 'fase01';
				contImg++;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida direita
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX + tamanhoPorta*2;
				world[world.length-1].srcY = world[world.length-2].srcY;
				world[world.length-1].lar = world[world.length-2].lar/3 + 10;
				world[world.length-1].alt = world[world.length-3].alt;
				world[world.length-1].worldX = world[world.length-2].worldX + tamanhoPorta*2;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY;//world[world.length-1].srcY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
			//predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de world ou estar desenhada no bacground / mapa
			/*world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-4].srcX;//256;
				world[world.length-1].srcY = world[world.length-4].srcY + world[world.length-4].alt/2 + 2;
				world[world.length-1].lar = world[world.length-3].lar;
				world[world.length-1].alt = world[world.length-2].alt;
				world[world.length-1].worldX = world[world.length-4].worldX;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-4].worldY + world[world.length-4].alt/2 +2;//world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;*/
		//////////////////////////////////////////////////////////////////////
}
function predio05(x, y, tamanhoPorta){
	//predio azul 05...
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = x;//2431;
				world[world.length-1].srcY = y;//189;
				world[world.length-1].lar = 447;
				world[world.length-1].alt = 160;
				world[world.length-1].worldX = world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;	
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida full largY;
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt - 60;
				world[world.length-1].lar = world[world.length-2].lar;//largura da parte de cima
				world[world.length-1].alt = 60;
				world[world.length-1].worldX = world[world.length-2].worldX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt - 60;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//telhado 2
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX + 128;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt;
				world[world.length-1].lar = 193;//define inicio da porta
				world[world.length-1].alt = 40;
				world[world.length-1].worldX = world[world.length-2].worldX + 128;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX + 128;
				world[world.length-1].srcY = world[world.length-3].srcY + world[world.length-3].alt;
				world[world.length-1].lar = 55;//define inicio da porta
				world[world.length-1].alt = 40;
				world[world.length-1].worldX = world[world.length-3].worldX + 128;
				world[world.length-1].worldY = world[world.length-3].worldY + world[world.length-3].alt;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			//tamanhoPorta = 80;
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//limite acima da porta
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;//258;
				world[world.length-1].srcY = world[world.length-2].srcY - world[world.length-3].alt/2;//323;
				world[world.length-1].lar = world[world.length-3].lar;//250;
				world[world.length-1].alt = 1;
				world[world.length-1].worldX = world[world.length-2].worldX;//150;//world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-2].worldY;//150;//world[world.length-1].srcY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'porta';
				world[world.length-1].txt = 'fase01';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida a direita
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX + world[world.length-3].lar + tamanhoPorta;
				world[world.length-1].srcY = world[world.length-3].srcY;
				world[world.length-1].lar = 50;
				world[world.length-1].alt = world[world.length-3].alt;
				world[world.length-1].worldX = world[world.length-3].worldX + world[world.length-3].lar + tamanhoPorta;
				world[world.length-1].worldY = world[world.length-3].worldY;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);	
		//////////////////////////////////////////////////////////
}
function muro05(x, y){
	//muro do predio acima...
			//console.log('muro');
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//muro parte de cima intangivel
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = x;//2368;
				world[world.length-1].srcY = y;//127;
				world[world.length-1].lar = 576;
				world[world.length-1].alt = 35;
				world[world.length-1].worldX = world[world.length-1].srcX;
				world[world.length-1].worldY = world[world.length-1].srcY;
				world[world.length-1].acima = true;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida full largura de cima do muro
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt;
				world[world.length-1].lar = world[world.length-2].lar;//largura da parte de cima
				world[world.length-1].alt = 1;
				world[world.length-1].worldX = world[world.length-2].worldX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida full largura esquerda
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt;
				world[world.length-1].lar = 32;
				world[world.length-1].alt = 318;
				world[world.length-1].worldX = world[world.length-2].worldX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//parede solida full largura direita
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX + world[world.length-3].lar - world[world.length-2].lar;
				world[world.length-1].srcY = world[world.length-3].srcY + world[world.length-3].alt;
				world[world.length-1].lar = 32;
				world[world.length-1].alt = 318;
				world[world.length-1].worldX = world[world.length-3].worldX + world[world.length-3].lar - world[world.length-2].lar;
				world[world.length-1].worldY = world[world.length-3].worldY + world[world.length-3].alt;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//muro solido horizontal esquerda entrada
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-3].srcX + world[world.length-3].lar;
				world[world.length-1].srcY = world[world.length-3].srcY + world[world.length-3].alt - 34;
				world[world.length-1].lar = 192;
				world[world.length-1].alt = 35;
				world[world.length-1].worldX = world[world.length-3].worldX + world[world.length-3].lar;
				world[world.length-1].worldY = world[world.length-3].worldY + world[world.length-3].alt - 34;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//muro solido horizontal direita entrada
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX + world[world.length-2].lar + 130;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt - 34;
				world[world.length-1].lar = 192;
				world[world.length-1].alt = 35;
				world[world.length-1].worldX = world[world.length-2].worldX + world[world.length-2].lar + 132;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt - 34;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//muro solido vertical direita entrada
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX;
				world[world.length-1].srcY = world[world.length-2].srcY + world[world.length-2].alt;
				world[world.length-1].lar = 33;
				world[world.length-1].alt = 35;
				world[world.length-1].worldX = world[world.length-2].worldX;
				world[world.length-1].worldY = world[world.length-2].worldY + world[world.length-2].alt;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
			world.push(new Sprite('img/city.png', 1, 1, 'npc'));//muro solido vertical esquerda entrada
				world[world.length-1].fr = 0;
				world[world.length - 1].status = 'fixo';
				world[world.length-1].srcX = world[world.length-2].srcX - 165;
				world[world.length-1].srcY = world[world.length-2].srcY;
				world[world.length-1].lar = 35;
				world[world.length-1].alt = 35;
				world[world.length-1].worldX = world[world.length-2].worldX - 167;
				world[world.length-1].worldY = world[world.length-2].worldY - 1;
				world[world.length-1].acima = false;
				world[world.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ world[world.length-1].worldX + ' , worldY: '+ world[world.length-1].worldY);
		////////////////////////////////////////////////////
}
function player(){//substituir por achar
	//descobre qual obj do array é o player
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == 'player') {
			return i;
		}
	}
}
function encontrar(flag){//substituir por achar
	//descobre qual obj do array é o player
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
}
function achar(flag, status){
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag && (sprites[i].status == status || sprites[i].status == '' || sprites[i].status == null || sprites[i].status == 'game' || sprites[i].status == 'mapa' || sprites[i].status == 'grupo') ) {
			return i;//
		}
	}
}
function loop(){
	if (sprites[achar('player')].fase == 'world' && sprites !== world) {
		sprites = world;
		sprites[achar('background')].srcX = srcXtela;
		sprites[achar('background')].srcY = srcYtela;
		sprites[achar('player')].posX = posXrua;
		sprites[achar('player')].posY = posYrua + sprites[achar('player')].alt;
		sprites[achar('background')].taxaAumenX = 64;
		sprites[achar('background')].taxaAumenY = 64;
		sprites[achar('background')].taxaDimX = 64;
		sprites[achar('background')].taxaDimY = 64;
		metaWidth = telaX;
		metaHeight = telaY;
		//
	}
	if (sprites[achar('player')].fase == 'ceu' && sprites !== ceu) {
		sprites = ceu;
	}
	if (sprites[achar('player')].fase == 'fase01' && sprites !== fase01) {
		srcXtela = sprites[achar('background')].srcX;
		srcYtela = sprites[achar('background')].srcY;
		posXrua = sprites[achar('player')].posX;
		posYrua = sprites[achar('player')].posY;
		sprites = fase01;
		sprites[achar('background')].srcY = 100;
		sprites[achar('background')].taxaDimX = 64;
		metaWidth = sprites[achar('background')].img.width;
		sprites[achar('background')].taxaDimY = 64;
		metaHeight = sprites[achar('background')].img.height - 100;
		sprites[achar('player')].posX = 465;
		sprites[achar('player')].posY = 280;
	}
	if (sprites[achar('player')].fase == 'bordel' && sprites !== bordel) {
		srcXtela = sprites[achar('background')].srcX;
		srcYtela = sprites[achar('background')].srcY;
		posXrua = sprites[achar('player')].posX;
		posYrua = sprites[achar('player')].posY;
		sprites = bordel;
		sprites[achar('background')].srcY = sprites[achar('background')].img.height - cnv.height;
		sprites[achar('background')].taxaDimX = 64;
		metaWidth = sprites[achar('background')].img.width;
		//cnv.height = sprites[achar('background')].img.height;
		sprites[achar('player')].posX = 140;
		sprites[achar('player')].posY = cnv.height - sprites[achar('player')].alt*2;
		
	}
	// limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites
		
		if(sprites[i].flag == 'player'){
			socket.emit('player', sprites[i])
		}
		//////////////////////////
		if (!pause) {/////////////
			sprites[i].exe();///
		}/////////////////////////
		sprites[i].desenha();/////


					
	}
	contLoop++;
	requestAnimationFrame(loop, "canvas");
}
function alternarMapa(){//quando aciona tecla muda status do background
	if (sprites[encontrar('background')].status == 'mapa') {//muda para tela de jogo
		sprites[achar('player')].fase = 'world';
				metaWidth = telaX;
				metaHeight = telaY;				
				sprites[encontrar('background')].taxaDimX = 64;
				sprites[encontrar('background')].taxaDimY = 64;				

				sprites[encontrar('background')].status = '';
	}else{//mostra todo mapa saindo da tela de jogo...
		sprites[achar('player')].fase = 'ceu';
		
		metaWidth = sprites[encontrar('background')].img.width;//tamanho da tela exibida
		metaHeight = sprites[encontrar('background')].img.height;
		//ajusta player durante mudança do mapa aumenta / diminui tela
		sprites[achar('player')].posX = sprites[achar('player')].posX + sprites[encontrar('background')].srcX;
		sprites[achar('player')].posY = sprites[achar('player')].posY + sprites[encontrar('background')].srcY;
		//
		sprites[encontrar('background')].taxaCresX = 64;
		sprites[encontrar('background')].taxaCresY = 64;
		sprites[encontrar('background')].taxaAumenX = 64;
		sprites[encontrar('background')].taxaAumenY = 64;				
		sprites[encontrar('background')].status = 'mapa';
	}
}
//carregado janela inicia jogo...............................
window.onload = function(){
	start();
}

socket.on('id', id => {
	console.log('id: '+ id);
})
socket.on('player', obj => {
	obj.flag = 'player-online';
	//obj.id = socket.id;
	//console.log(obj);
	let achou = false;
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites
		//atualiza player online no array de sprites...
		if(sprites[i].id == obj.id){
			//console.log('jogador online: '+ obj.gpsX +' , '+obj.gpsY);			
			achou = true;
			if(sprites[achar('player')].fase == obj.fase){
				sprites[i].acima = true;
				sprites[i].alt = obj.alt;
				sprites[i].col = obj.col;
				sprites[i].direcao = obj.direcao;
				sprites[i].esc = obj.esc;
				sprites[i].exibir = obj.exibir;
				//sprites[i].flag = obj.flag;
				sprites[i].fr = obj.fr;
				sprites[i].frame = obj.frame;
				sprites[i].gpsX = obj.gpsX;
				sprites[i].gpsY = obj.gpsY;
				sprites[i].grAlt = obj.grAlt;
				sprites[i].grCol = obj.grCol;
				sprites[i].grLar = obj.grLar;
				sprites[i].grLin = obj.grLin;
				//sprites[i].id = obj.id;
				sprites[i].lar = obj.lar;
				sprites[i].lin = obj.lin;
				//sprites[i].metaHorizontal = obj.metaHorizontal;
				//sprites[i].metaVertical = obj.metaVertical;
				//sprites[i].movDown = obj.movDown;
				//sprites[i].movLeft = obj.movLeft;
				//sprites[i].movRight = obj.movRight;
				//sprites[i].movUp = obj.movUp;
				sprites[i].nFrames = obj.nFrames;
				//sprites[i].posX = obj.gpsX;
				//sprites[i].posY = obj.gpsY;
				sprites[i].speed = obj.speed;
				sprites[i].srcX = obj.srcX;
				sprites[i].srcY = obj.srcY;
				sprites[i].status = obj.status;
				sprites[i].txFrequencia = obj.txFrequencia;
				sprites[i].txt = obj.txt;
				sprites[i].worldX = obj.worldX;
				sprites[i].worldY = obj.worldY;	
			}else{				
				//remover do array de sprites
				sprites.splice(i, 1);//splice(posição, n itens a serem removidos)
			}
		}
	}
	//insere player online no array	
	if(!achou && sprites[achar('player')].fase == obj.fase){
		//alert('adicionado jogador online: '+ obj.id +' ...');
		let playerOnline = new Npc('img/players.png', 12, 8, 'player');
		playerOnline.alt = obj.alt;
		playerOnline.col = obj.col;
		playerOnline.direcao = obj.direcao;
		playerOnline.esc = obj.esc;
		playerOnline.exibir = obj.exibir;
		playerOnline.flag = obj.flag;
		playerOnline.fr = obj;
		playerOnline.frame = obj.frame;
		playerOnline.gpsX = obj.gpsX;
		playerOnline.gpsY = obj.gpsY;
		playerOnline.grAlt = obj.grAlt;
		playerOnline.grCol = obj.grCol;
		playerOnline.grLar = obj.grLar;
		playerOnline.grLin = obj.grLin;
		playerOnline.id = obj.id;
		playerOnline.lar = obj.lar;
		playerOnline.lin = obj.lin;
		playerOnline.metaHorizontal = obj.metaHorizontal;
		playerOnline.metaVertical = obj.metaVertical;
		playerOnline.movDown = obj.movDown;
		playerOnline.movLeft = obj.movLeft;
		playerOnline.movRight = obj.movRight;
		playerOnline.movUp = obj.movUp;
		playerOnline.nFrames = obj.nFrames;
		playerOnline.posX = obj.posX;
		playerOnline.posY = obj.posY;
		playerOnline.speed = obj.speed;
		playerOnline.srcX = obj.srcX;
		playerOnline.srcY = obj.srcY;
		playerOnline.status = obj.status;
		playerOnline.txFrequencia = obj.txFrequencia;
		playerOnline.txt = obj.txt;
		playerOnline.worldX = obj.worldX;
		playerOnline.worldY = obj.worldY;
		playerOnline.fase = obj.fase;
		sprites.push(playerOnline);
		contImg++;
		organizarSprites();
	}
})
socket.on('desconectar', excArray =>{	
	console.log('desconectar: '+excArray);
	for (let i = 0 ; i < sprites.length; i++) {
		if(sprites[i].id == excArray){
			//alert('desconectar: '+excArray);
			sprites.splice(i, 1);
		}
	}	
})