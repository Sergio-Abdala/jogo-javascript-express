var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var srcXtemp = srcYtemp = 0;
var porcentMouseX = porcentMouseY = null;

window.addEventListener("keydown", keydownHandler, false);
window.addEventListener("keyup", keyupHandler, false);
//
function keydownHandler(e){	
	switch(e.keyCode){
		case RIGHT:
			sprites[encontrar('player')].movRight = true;
			sprites[encontrar('player')].movLeft = false;
			//sprites[encontrar('player')].movUp = false;
			//sprites[encontrar('player')].movDown = false;
		break;
		case LEFT:
			sprites[encontrar('player')].movRight = false;
			sprites[encontrar('player')].movLeft = true;
			//sprites[encontrar('player')].movUp = false;
			//sprites[encontrar('player')].movDown = false;
		break;
		case UP:
			//sprites[1].movRight = false;
			//sprites[1].movLeft = false;
			sprites[encontrar('player')].movUp = true;
			sprites[encontrar('player')].movDown = false;
		break;
		case DOWN:
			//sprites[1].movRight = false;
			//sprites[1].movLeft = false;
			sprites[encontrar('player')].movUp = false;
			sprites[encontrar('player')].movDown = true;
		break;
	}
}
function keyupHandler(e){
	//console.log(e.keyCode);
	switch(e.keyCode){
		case RIGHT:
			sprites[encontrar('player')].frame = 1;
			sprites[encontrar('player')].movRight = false;
		break;
		case LEFT:
			sprites[encontrar('player')].frame = 1;
			sprites[encontrar('player')].movLeft = false;
		break;
		case UP:
			sprites[encontrar('player')].frame = 1;
			sprites[encontrar('player')].movUp = false;
		break;
		case DOWN:
			sprites[encontrar('player')].frame = 1;
			sprites[encontrar('player')].movDown = false;
		break;
		case 32: //barra de espaço
			
		break;
		case 33://pag up
			sprites[encontrar('player')].esc+= 0.2;
		break;
		case 34://pag down
			if (sprites[encontrar('player')].esc > 1) {
				sprites[encontrar('player')].esc-= 0.2;
			}			
		break;
		case 48: // 0 numero...			
			help();
			window.open("help.html")
		break;
		case 49: // 1 numero...			
			sprites[encontrar('player')].grCol = 0;
			sprites[encontrar('player')].grLin = 0;
		break;
		case 50: // 2 numero...			
			sprites[encontrar('player')].grCol = 1;
			sprites[encontrar('player')].grLin = 0;
		break;
		case 51: // 3 numero...
			sprites[encontrar('player')].grCol = 2;
			sprites[encontrar('player')].grLin = 0;
		break;
		case 52: // 4 numero...
			sprites[encontrar('player')].grCol = 3;
			sprites[encontrar('player')].grLin = 0;
		break;
		case 53: // 5 numero...
			sprites[encontrar('player')].grCol = 0;
			sprites[encontrar('player')].grLin = 1;
		break;
		case 54: // 6 numero...
			sprites[encontrar('player')].grCol = 1;
			sprites[encontrar('player')].grLin = 1;
		break;
		case 55: // 7 numero...
			sprites[encontrar('player')].grCol = 2;
			sprites[encontrar('player')].grLin = 1;
		break;
		case 56: // 8 numero...
			sprites[encontrar('player')].grCol = 3;
			sprites[encontrar('player')].grLin = 1;
		break;
		case 57: // 9 numero...
			console.log('numero 9 <==> teclado...' );
		break;
		case 72: // h letra...
			console.log('letra h <==> teclado...' );
			for (let i = sprites.length - 1; i >= 0; i--) {
				if (sprites[i].status == 'oculto' && sprites[i].flag == 'txt') {
					sprites[i].status = 'help';
				}else if (sprites[i].status == 'help' && sprites[i].flag == 'txt') {
					sprites[i].status = 'oculto';
				}
			}
		break;
		case 77: // m letra...
			console.log('letra m <==> teclado...');	
			alternarMapa();
		break;
		case 80: // p letra...
			console.log('letra p <==> teclado...');	
			if (pause) {
				pause = false;
			}else{
				pause = true;
			}
		break;
	}
}

cnv.addEventListener('click', event =>   //mouse
{
    let rect = cnv.getBoundingClientRect();
    //rect é a tela do canvas
    let x = event.clientX;// - rect.left;// - cnv.clientLeft;
    let y = event.clientY;// - rect.top;// - cnv.clientTop;

    //console.log(x +' , '+ y +' tamanho da tela? ' + rect.width +' , '+ rect.height);
     porcentMouseX = x / rect.width;
     porcentMouseY = y / rect.height;          

});

function help(){
	console.log('HELP...........!?');
}
