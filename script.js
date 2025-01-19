const canvas = document.getElementById("cnv");
canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight * 0.92;

const ctx = canvas.getContext("2d");
let grosime = 5;

const selector_culoare = document.getElementById('culoareLinie');
let culoare_selectata = selector_culoare.value;

selector_culoare.addEventListener('input', function() {
    culoare_selectata = selector_culoare.value;
    exemplifica_grosime();
});

const cnvExemplificare = document.getElementById("cnvExemplificareGrosime")
const ctxExemplificare = cnvExemplificare.getContext("2d");

function exemplifica_grosime() //canvas pentru exemplificarea grosimii liniei
{
    ctxExemplificare.clearRect(0, 0, cnvExemplificare.width, cnvExemplificare.height);
    ctxExemplificare.lineWidth = grosime;
    ctxExemplificare.strokeStyle = culoare_selectata;
    ctxExemplificare.beginPath();
    ctxExemplificare.moveTo(10, cnvExemplificare.height / 2);
    ctxExemplificare.lineTo(cnvExemplificare.width - 10, cnvExemplificare.height / 2);
    ctxExemplificare.stroke();
}

exemplifica_grosime()

const selector_fundal = document.getElementById('culoareFundal');
let culoare_fundal = selector_fundal.value;
canvas.style.backgroundColor = culoare_fundal;


selector_fundal.addEventListener('input', function() {
    culoare_fundal = selector_fundal.value;
    canvas.style.backgroundColor = culoare_fundal;
});
const slider = document.getElementById("slider_grosime");
slider.addEventListener("input", function() {
    grosime = slider.value;
    exemplifica_grosime()
})

let forma_selectata = "linie";

const check_figura_umpluta = document.getElementById("cbUmpleCuloare");
let figura_umpluta = check_figura_umpluta.checked;

check_figura_umpluta.addEventListener("input", function() {
    figura_umpluta = check_figura_umpluta.checked;
});

const selector_culoare_interior = document.getElementById("culoareInterior");
let culoare_interior = selector_culoare_interior.value;

selector_culoare_interior.addEventListener("input", function() {
    culoare_interior = selector_culoare_interior.value;
});

let poz_start_X, poz_start_Y = null;
let poz_final_X, poz_final_Y = null;
let click_activ = false;

document.getElementById("linie").addEventListener("click", function() {
    forma_selectata = "linie";
});

document.getElementById("dreptunghi").addEventListener("click", function() {
    forma_selectata = "dreptunghi";
});

document.getElementById("cerc").addEventListener("click", function() {
    forma_selectata = "cerc";
});

document.getElementById("elipsa").addEventListener("click", function() {
    forma_selectata = "elipsa";
})

document.getElementById("hexagon").addEventListener("click", function() {
    forma_selectata = "hexagon";
})

document.getElementById("triunghi").addEventListener("click", function() {
    forma_selectata = "triunghi";
})



let figuri_desenate = [];
let id_figura = 0;
let preview = true;

let poz_curent_X, poz_curent_Y = null;
canvas.addEventListener("mousemove", (e) => {
  if(click_activ === false) return;
  else
  {
    reincarcare_canvas();

    poz_curent_X = e.offsetX;
    poz_curent_Y = e.offsetY;

    if (forma_selectata === 'linie') {
        preview = true;
        deseneaza_linie(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
    else if(forma_selectata === 'dreptunghi'){
        preview = true;
        deseneaza_dreptunghi(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
    else if(forma_selectata === 'cerc') {
        preview = true;
        deseneaza_cerc(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
    else if(forma_selectata === 'elipsa') {
        preview = true;
        deseneaza_elipsa(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
    else if(forma_selectata === 'hexagon') {
        preview = true;
        deseneaza_hexagon(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
    else if(forma_selectata === 'triunghi') {
        preview = true;
        deseneaza_triunghi(poz_start_X, poz_start_Y, poz_curent_X, poz_curent_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
    }
}
})

canvas.addEventListener("mousedown", (e) => {
    poz_start_X = e.offsetX;
    poz_start_Y = e.offsetY;
    click_activ = true;
})

canvas.addEventListener("mouseup", (e) => {
    if (click_activ === false) return;
    else
    {
        click_activ = false;   
        poz_final_X = e.offsetX;
        poz_final_Y = e.offsetY;
        if (poz_start_X !== null && poz_start_Y !== null && poz_final_X !== null && poz_final_Y !== null){

        if (forma_selectata === 'linie') {
            preview = false;
            deseneaza_linie(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else if(forma_selectata === 'dreptunghi'){
            preview = false;

            deseneaza_dreptunghi(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else if(forma_selectata === 'cerc') {
            preview = false;
            deseneaza_cerc(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else if(forma_selectata === 'elipsa') {
            preview = false;
            deseneaza_elipsa(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else if(forma_selectata === 'hexagon')
        {
            preview = false;
            deseneaza_hexagon(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else if(forma_selectata === 'triunghi')
        {
            preview = false;
            deseneaza_triunghi(poz_start_X, poz_start_Y, poz_final_X, poz_final_Y, grosime, culoare_selectata, figura_umpluta, culoare_interior);
        }
        else
        {
            alert("Selectati o figura!");
        }
    }
    }
    actualizeaza_lista_figuri();
})

//Functii de desenare a mai multor figuri, in functie de parametri: coordonate inceput-final, culoare bordura, boolean de colorat interior, culoare interior
//daca preview este fals, figura este salvata in array de figuri cu id unic
function deseneaza_linie(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior)
{
    ctx.beginPath();
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (preview === false) 
    {
        id_figura += 1;
        figuri_desenate.push({figura:'linie', detalii:{x1,y1, x2, y2, grosime, culoare_selectata, id_figura, figura_umpluta, culoare_interior}});
    }
    x1 = null; x2 = null;
    y1 = null; y2 = null;
}

function deseneaza_dreptunghi(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior){
    const lungime = x2 - x1;
    const latime = y2 - y1;
    ctx.beginPath();    
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;
    ctx.rect(x1, y1, lungime, latime);
    
    if(figura_umpluta === true){
        ctx.fillStyle = culoare_interior;
        ctx.fill();
    }

    ctx.stroke();
    let element = {
        figura: 'dreptunghi',
        detalii: {
            x1, y1, x2, y2,
            grosime, culoare_selectata,
            id_figura,
            figura_umpluta, culoare_interior
        }
    } 
    if (preview === false) 
    {
        id_figura += 1;
        
        figuri_desenate.push(element);
        
    }
    x1 = null; x2 = null;
    y1 = null; y2 = null;  
}

function deseneaza_triunghi(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior){

    const lungime = Math.sqrt((x2 - x1) ** 2 + (y2-y1) ** 2);
    const unghi_initial = Math.atan2(y2 - y1, x2 - x1);

    const xA = x1 + lungime * Math.cos(unghi_initial);
    const yA = y1 + lungime * Math.sin(unghi_initial);
    
    const xB = x1 + lungime * Math.cos(unghi_initial + 2 * (Math.PI / 3));
    const yB = y1 + lungime * Math.sin(unghi_initial + 2 * (Math.PI / 3));
    
    const xC = x1 + lungime * Math.cos(unghi_initial - 2 * (Math.PI / 3));
    const yC = y1 + lungime * Math.sin(unghi_initial - 2 * (Math.PI / 3));

    ctx.beginPath();
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;
    ctx.moveTo(xA, yA);
    ctx.lineTo(xB, yB);
    ctx.lineTo(xC, yC);
    ctx.lineTo(xA, yA);

    if(figura_umpluta){
        ctx.fillStyle = culoare_interior;
        ctx.fill();
    }

    ctx.stroke();

    if (preview === false)
    {
        id_figura += 1;
        let element = {
            figura: 'triunghi',
            detalii: {
                x1, y1, x2, y2,
                grosime, culoare_selectata,
                id_figura,
                figura_umpluta, culoare_interior
            }
        } 
        figuri_desenate.push(element);
    }
    x1 = null; x2 = null;
    y1 = null; y2 = null;
}

function deseneaza_cerc(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior) {
    const raza = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    ctx.beginPath();
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;
    ctx.arc(x1, y1, raza, 0, Math.PI * 2);

    if(figura_umpluta){
        ctx.fillStyle = culoare_interior;
        ctx.fill();
    }

    ctx.stroke(); 
    if (preview === false) 
    {
        id_figura += 1;
        let element = {
            figura: 'cerc',
            detalii: {
                x1, y1, x2, y2,
                grosime, culoare_selectata,
                id_figura,
                figura_umpluta, culoare_interior
            }
        }
        figuri_desenate.push(element);
    }
        x1 = null; x2 = null;
    y1 = null; y2 = null;
}

function deseneaza_elipsa(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior) {
    const razaX = Math.abs(x2 - x1) / 2;
    const razaY = Math.abs(y2 - y1) / 2;

    const centruX = (x1 + x2) / 2;
    const centruY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;
    ctx.ellipse(centruX, centruY, razaX, razaY, 0, 0, Math.PI * 2);

    if(figura_umpluta){
        ctx.fillStyle = culoare_interior;
        ctx.fill();
    }

    ctx.stroke();
    if (preview === false) 
    {
        id_figura += 1;
        let element = {
            figura: "elipsa",
            detalii: {
                x1, y1, x2, y2,
                grosime, culoare_selectata,
                id_figura,
                figura_umpluta, culoare_interior
            }
        }
        figuri_desenate.push(element);
    }
    x1 = null; y1 = null;
    x2 = null; y2 = null; 
}

function deseneaza_hexagon(x1, y1, x2, y2, grosime, culoare_selectata, figura_umpluta, culoare_interior) {
    const centruX = (x1 + x2) / 2;
    const centruY = (y1 + y2) / 2;
    const raza = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 2;
    const unghi = Math.PI / 3;

    ctx.beginPath();
    ctx.lineWidth = grosime;
    ctx.strokeStyle = culoare_selectata;

    ctx.moveTo(centruX + raza * Math.cos(0), centruY + raza * Math.sin(0));
    for (let i = 1; i <= 6; i++) {
        ctx.lineTo(centruX + raza * Math.cos(i * unghi), centruY + raza * Math.sin(i * unghi));
    }
    ctx.closePath();

    if(figura_umpluta){
        ctx.fillStyle = culoare_interior;
        ctx.fill();
    }

    ctx.stroke();
    if (preview === false) 
    {
        id_figura += 1;
        let element = {
            figura: "hexagon",
            detalii: {
                x1, y1, x2, y2,
                grosime, culoare_selectata,
                id_figura,
                figura_umpluta, culoare_interior
            }
        }
        figuri_desenate.push(element);
    }
    x1 = null; x2 = null;
    y1 = null; y2 = null;
}

//Functie de reincarcare canvas: curata canvas, parcurge fiecare figura din array si reapeleaza functiile de desenare respective
function reincarcare_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    preview = true;
    figuri_desenate.forEach((element) => {
        const {figura, detalii} = element;
        const rein_poz_start_X = detalii.x1;
        const rein_poz_start_Y = detalii.y1;
        const rein_poz_final_X = detalii.x2;
        const rein_poz_final_Y = detalii.y2;
        const rein_grosime = detalii.grosime;
        const rein_culoare_selectata = detalii.culoare_selectata;
        const rein_figura_umpluta = detalii.figura_umpluta;
        const rein_culoare_interior = detalii.culoare_interior;


        if (figura === 'linie') {
            deseneaza_linie(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }
        else if(figura === 'dreptunghi'){ 
            deseneaza_dreptunghi(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }
        else if(figura === 'cerc') {
            deseneaza_cerc(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }
        else if(figura === 'elipsa') {
            deseneaza_elipsa(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }
        else if(figura === 'hexagon') {
            deseneaza_hexagon(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }
        else if(figura === 'triunghi') {
            deseneaza_triunghi(rein_poz_start_X, rein_poz_start_Y, rein_poz_final_X, rein_poz_final_Y, rein_grosime, rein_culoare_selectata, rein_figura_umpluta, rein_culoare_interior);
        }

    });
}


const btnSalvareRaster = document.getElementById("salvare_raster");
btnSalvareRaster.addEventListener("click", () => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = culoare_fundal;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const data = tempCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.download = "imagine_raster.png";
    link.click();
});

const btnSalvareVectorial = document.getElementById("salvare_vectorial");

btnSalvareVectorial.addEventListener("click", () => {
    const width = canvas.width;
    const height = canvas.height;
    let continutSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

    continutSVG += `<rect x="0" y="0" width="${width}" height="${height}" fill="${culoare_fundal}" />`;

    figuri_desenate.forEach(figura => {
        const detalii = figura.detalii;
        
        if(figura.figura === "linie") {
                continutSVG += `<line x1="${detalii.x1}" y1="${detalii.y1}" x2="${detalii.x2}" y2="${detalii.y2}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" />`;
        }

        if(figura.figura === "dreptunghi") {
                continutSVG += `<rect x="${detalii.x1}" y="${detalii.y1}" width="${detalii.x2 - detalii.x1}" height="${detalii.y2 - detalii.y1}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" fill="${detalii.figura_umpluta ? detalii.culoare_interior : 'none'}" />`;
        }

        if(figura.figura === "triunghi") {
                continutSVG += `<polygon points="${detalii.x1},${detalii.y1} ${detalii.x2},${detalii.y2} ${detalii.x1},${detalii.y2}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" fill="${detalii.figura_umpluta ? detalii.culoare_interior : 'none'}" />`;
        }

        if(figura.figura === "cerc") {
                const raza = Math.sqrt(Math.pow(detalii.x2 - detalii.x1, 2) + Math.pow(detalii.y2 - detalii.y1, 2));
                continutSVG += `<circle cx="${detalii.x1}" cy="${detalii.y1}" r="${raza}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" fill="${detalii.figura_umpluta ? detalii.culoare_interior : 'none'}" />`;
        }

        if(figura.figura === "elipsa") {
                const razaX = Math.abs(detalii.x2 - detalii.x1) / 2;
                const razaY = Math.abs(detalii.y2 - detalii.y1) / 2;
                const centruX = (detalii.x1 + detalii.x2) / 2;
                const centruY = (detalii.y1 + detalii.y2) / 2;
                continutSVG += `<ellipse cx="${centruX}" cy="${centruY}" rx="${razaX}" ry="${razaY}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" fill="${detalii.figura_umpluta ? detalii.culoare_interior : 'none'}" />`;
        }

        if(figura.figura === "hexagon") {   
                const centruHexagonX = (detalii.x1 + detalii.x2) / 2;
                const centruHexagonY = (detalii.y1 + detalii.y2) / 2;
                const razaHexagon = Math.sqrt((detalii.x2 - detalii.x1) ** 2 + (detalii.y2 - detalii.y1) ** 2) / 2;
                const unghi = Math.PI / 3;
                let hexagonPoints = '';
                for (let i = 0; i < 6; i++) {
                    const x = centruHexagonX + razaHexagon * Math.cos(i * unghi);
                    const y = centruHexagonY + razaHexagon * Math.sin(i * unghi);
                    hexagonPoints += `${x},${y} `;
                }
                continutSVG += `<polygon points="${hexagonPoints}" stroke="${detalii.culoare_selectata}" stroke-width="${detalii.grosime}" fill="${detalii.figura_umpluta ? detalii.culoare_interior : 'none'}" />`;
        }
    });

    continutSVG += "</svg>";


    const link = document.createElement("a");
    const blob = new Blob([continutSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "imagine_vectoriala.svg";
    link.click();
});





let indexFigura = null; //variabila care retine indexul figurii selectate din lista
//In div-ul care reprezinta lista de figuri, se vor adauga detaliile despre figuri folosind un div_figura.
const style = document.createElement('style');
style.innerHTML = `
.div_figura.selected {
    background-color: #d3d3d3;
    border: 2px solid #007bff;
}`;
document.head.appendChild(style);

//functie de actualizat lista de figuri din UI atunci cand se adauga o figura noua sau se sterge una veche
function actualizeaza_lista_figuri() {
    let div_lista_figuri = document.getElementsByClassName("lista_figuri")[0];
    div_lista_figuri.innerHTML = ''; //se sterg toate celelalte figuri descrise
    figuri_desenate.forEach((figura, index) => {  //se parcurge lista de figuri, pentru fiecare figura se creeaza un tag si se lipeste la lista_figuri
        const div_figura = document.createElement('div');
        div_figura.className = "div_figura";
        div_figura.innerHTML = 
        `<strong>Figura:</strong> ${figura.figura}<br>
        <strong>Detalii:</strong>
        Grosime:${figura.detalii.grosime}px<br>
        Culoare:${figura.detalii.culoare_selectata}`;
        div_lista_figuri.appendChild(div_figura);

        div_figura.addEventListener('click', () => {
            indexFigura = index;

            document.querySelectorAll('.div_figura').forEach(div => div.classList.remove('selected')); //se sterge marcajul pentru selectarea unei figuri din UI
            div_figura.classList.add('selected'); //se adauga marcajul ca o figura a fost selectata
            document.getElementById("modificare_figura_grosime").value = 
            figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.grosime; 
            document.getElementById("modificare_figura_culoare").value =
            figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.culoare_selectata;
            document.getElementById("modificare_figura_culoare_interior").value = 
            figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.culoare_interior;
            //se actualizeaza valorile selectorilor de modificare a grosimii si culorilor cu valorile curente a figurii selectate
        })
    });
}


//functii de actualizare a atributelor unei figuri, atribuite butoanelor si selectorilor aferenti
document.getElementById("figura_dimensiuni_scade").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.x2 = 
        figura_de_modificat.detalii.x1 + (figura_de_modificat.detalii.x2 - figura_de_modificat.detalii.x1) * 0.9;
        figura_de_modificat.detalii.y2 = 
        figura_de_modificat.detalii.y1 + (figura_de_modificat.detalii.y2 - figura_de_modificat.detalii.y1) * 0.9;
        reincarcare_canvas();
    }
})

document.getElementById("figura_dimensiuni_creste").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.x2 = 
            figura_de_modificat.detalii.x1 + (figura_de_modificat.detalii.x2 - figura_de_modificat.detalii.x1) * 1.1;
            figura_de_modificat.detalii.y2 = 
            figura_de_modificat.detalii.y1 + (figura_de_modificat.detalii.y2 - figura_de_modificat.detalii.y1) * 1.1;
            reincarcare_canvas();
    }
})

document.getElementById("figura_ox_scade").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura +1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.x1 -= 25;
        figura_de_modificat.detalii.x2 -= 25;
        reincarcare_canvas();
    }
})

document.getElementById("figura_ox_creste").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.x1 += 25;
        figura_de_modificat.detalii.x2 += 25;
        reincarcare_canvas();
    }
})

document.getElementById("figura_oy_scade").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura +1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.y1 -= 25;
        figura_de_modificat.detalii.y2 -= 25;
        reincarcare_canvas();
    }
})

document.getElementById("figura_oy_creste").addEventListener("click", function() {
    let figura_de_modificat = figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1);
    if(figura_de_modificat) {
        figura_de_modificat.detalii.y1 += 25;
        figura_de_modificat.detalii.y2 += 25;
        reincarcare_canvas();   
    }
})

const selector_schimbare_culoare = document.getElementById("modificare_figura_culoare");
selector_schimbare_culoare.addEventListener('input', function() {
    if (indexFigura !== null)
    {
        figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.culoare_selectata = selector_schimbare_culoare.value;
        reincarcare_canvas();
    }
})

const selector_schimbare_culoare_interior = document.getElementById("modificare_figura_culoare_interior");
selector_schimbare_culoare_interior.addEventListener('input', function() {
    if(indexFigura !== null)
    {
        figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.culoare_interior = selector_schimbare_culoare_interior.value;
        reincarcare_canvas();
    }
})

const selector_schimbare_grosime = document.getElementById("modificare_figura_grosime");
selector_schimbare_grosime.addEventListener('input', function() {
    if(indexFigura !== null)
    {
        figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.grosime = selector_schimbare_grosime.value;
        reincarcare_canvas();
    }
})

//functie de actualizare a indecsilor, apelata dupa stergerea unei figuri
function actualizeaza_indecsi()
{
    let pas = 0;
    for (figura of figuri_desenate)
    {
        figura.detalii.id_figura = pas + 1;
        pas += 1;
    }
    id_figura = figuri_desenate.length;
}

document.getElementById("figura_sterge").addEventListener("click", function() {
    if(indexFigura !== null)
    {
        const id_figura_de_sters = figuri_desenate.find(item => item.detalii.id_figura === indexFigura + 1).detalii.id_figura;
        figuri_desenate = figuri_desenate.filter(item => item.detalii.id_figura !== id_figura_de_sters);
        actualizeaza_indecsi();
        actualizeaza_lista_figuri();
        reincarcare_canvas();
    }
})
