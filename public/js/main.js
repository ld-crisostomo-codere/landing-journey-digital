window.onload = function () {

  $('#onload').hide();
  $('body').removeClass('hidden');
  $('header').removeClass('hidden2');
  AOS.init();
  
  btnslot.innerHTML = 'Registrate para jugar';

  setTimeout( function(){
    promModal.show();
  }, 500);
  
}

let promModal = new bootstrap.Modal(document.getElementById('exampleModal'));
let modalFormulario = new bootstrap.Modal(document.getElementById('modalFormulario'));
let btn_edad_si = document.getElementById('btn-edad-si');
let btn_edad_no = document.getElementById('btn-edad-no');

let btnslot = document.getElementById('btnslot');
let btn_registrarse = document.getElementById('btn-registrarse');
let premiocl = document.getElementById('premiocl');

let nombreHelp = document.getElementById('nombreHelp');
let apellidoHelp = document.getElementById('apellidoHelp');
let telefonolHelp = document.getElementById('telefonolHelp');
let emailHelp = document.getElementById('emailHelp');
let fechaNacimHelp = document.getElementById('fechaNacimHelp');
let txt_avisoPrivCheck = document.getElementById('txt-avisoPrivCheck');
let txt_avisoPrivCheck2 = document.getElementById('txt-avisoPrivCheck2');

let registrado = false;
let ganar = false;
let premio = true;
let slotActivado = false;

btn_edad_si.addEventListener("click", mayorEdad);
btn_edad_no.addEventListener("click", menorEdad);

btnslot.addEventListener("click", slot);
btn_registrarse.addEventListener("click", registrar);

function mayorEdad() {
  promModal.hide();
  modalFormulario.show();
}

function menorEdad() {
  promModal.hide();
  swal ( "Oops" ,  "Parece que eres menor de edad" ,  "error" );
}

function slot() {
  if(!registrado) {
    promModal.show();
  } else {
    activarslot(1)
    // Juego Slot
    if (ganar) {
      // Ya gano
    } else {
      // Vuelve a jugar
    }
  }
}

function registrar() {

  let namec = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let telefono = document.getElementById('telefono').value;
  let correo = document.getElementById('correo').value;
  let nacimiento = document.getElementById('nacimiento').value;
  let avisoPrivCheck = document.getElementById('avisoPrivCheck').checked;
  let error = 0;


  if (namec='' || namec.length<=3) {
    nombreHelp.innerHTML = 'Ingresa tu nombre.';
    error=error+1;
  } else {
    nombreHelp.innerHTML = '';
  }

  if (apellido='' || apellido.length<=3) {
    apellidoHelp.innerHTML = 'Ingresa tu apellido.';
    error=error+1;
  } else {
    apellidoHelp.innerHTML = '';
  }

  if (telefono='' || telefono.length<=9 || telefono.length>10) {
    telefonolHelp.innerHTML = 'Ingresa un teléfono válido.';
    error=error+1;
  } else {
    telefonolHelp.innerHTML = '';
  }

  re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if(!re.exec(correo)){
    emailHelp.innerHTML="Ingresa un correo válido"; 
    error=error+1;
  }
  else{
    emailHelp.innerHTML="";
  }

  if ( nacimiento>="2004-07-2") {
    fechaNacimHelp.innerHTML ="Eres menor de edad.";
    error=error+1;
  } else {
    fechaNacimHelp.innerHTML = '';
  }

  if (error === 0) {
    if(avisoPrivCheck == true) {
      document.getElementById("cargador").innerHTML='<center><img src="./assets/img/loading.gif" style="width:10%; padding-top:40px;"></center>';
			document.getElementById("formpremio").style.display="none";

      var data =  '<request><CDR_spcAlta_spcDigital><MessageId /><MessageType>Integration Object</MessageType><IntObjectName>CDR Alta Digital IO</IntObjectName><IntObjectFormat>Siebel Hierarchical</IntObjectFormat><ListOfCDR_spcAlta_spcDigital_spcIO><CDR_spcAlta_spcDigital><First_spcName>PRUEBA DIGITAL MKT 1 Postman</First_spcName><Last_spcName>PRUEBA DIGITAL MKT 1 Postman</Last_spcName><Maiden_spcName>PRUEBA DIGITAL MKT 1 Postman</Maiden_spcName><CDR_spcFecha_spcde_spcNacimiento>10/10/2015</CDR_spcFecha_spcde_spcNacimiento><Cellular_spcPhone_spc35>5554029177</Cellular_spcPhone_spc35><EMail_spcAddr>MKT_prueba1_postman@codere.com</EMail_spcAddr></CDR_spcAlta_spcDigital></ListOfCDR_spcAlta_spcDigital_spcIO></CDR_spcAlta_spcDigital></request>'

      console.log(data);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://dip20mex.cdrsbg.com/siebel/v1.0/workflow/CDR%20Alta%20Digital%20WF', true);
      xhr.setRequestHeader('Content-Type', 'application/xml');
      xhr.setRequestHeader('Authorization', 'Basic UkVTVFVTUjpVc2VyQDIxUmVzdA==');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

      xhr.onreadystatechange = function() {
        console.log(xhr); // get the data from xhr and log it
      }

      xhr.send(data);


      // fetch('https://dip20mex.cdrsbg.com/siebel/v1.0/workflow/CDR%20Alta%20Digital%20WF', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/xml',
      //     'Authorization': 'Basic UkVTVFVTUjpVc2VyQDIxUmVzdA==',
      //   },
      //   body: data,
      // })
      // .then(response => console.log(response))
      // .then(data => console.log(data));


      // $.ajax({
      //       url: 'https://dip20mex.cdrsbg.com/siebel/v1.0/workflow/CDR%20Alta%20Digital%20WF',
      //       data: data, 
      //       type: 'POST',
      //       headers: {
      //         "Content-Type": "application/xml",
      //         "Authorization": "Basic UkVTVFVTUjpVc2VyQDIxUmVzdA==",
      //         "Access-Control-Allow-Origin" : "*",
      //         "Access-Control-Allow-Methods": "*",
      //         "Access-Control-Allow-Headers": "*",
      //       },
      //       cache: false,
      //       error: function() { alert("No data found."); },
      //       success: function(xml) {
      //         alert("it works: ", xml);
      //         // alert($(xml).find("project")[0].attr("id"));
      //       }
      //   }); 
    


    } else {
      txt_avisoPrivCheck.setAttribute("style", "color: #af0000;");
      txt_avisoPrivCheck2.setAttribute("style", "color: #af0000;");
    }
  }



  btnslot.innerHTML = 'Jugar';
}

function activarslot(nsl){
  console.log('Entro');
  if(slotActivado) {
    pararslot(1);
  } else {
    if (nsl=="1") { 
            document.getElementById('slots').src="assets/img/slot/ftu-unscreen.gif";
            btnslot.innerHTML='Parar';
            registrado=true;
            slotActivado =true;
    }
  }
   const myTimeout = setTimeout(function(){
     pararslot(1)
   },4000);
}

function pararslot(psl){
  if (psl=="1") {
    //document.getElementById('slots').src="images/Slotg.gif";
    var nal = Math.floor(Math.random()*(1+4));
    if (nal=="1") {
      document.getElementById('slots').src="assets/img/slot/gane202.png";
      premiocl.value="XXXXXX";
      btnslot.innerHTML='Ubica tu sala';
      actpremio();
    }

    if (nal=="2") {
      document.getElementById('slots').src="assets/img/slot/pierde202.png";
      btnslot.innerHTML='Jugar de nuevo';
    }
    if (nal=="3") { 
      document.getElementById('slots').src="assets/img/slot/gane101.png";
      premiocl.value="XXXXXX";
      btnslot.innerHTML='Ubica tu sala';
      actpremio();	
    }
      if (nal=="4") {
      document.getElementById('slots').src="assets/img/slot/gane303.png";
      premiocl.value="XXXXXX";
      btnslot.innerHTML='Ubica tu sala';
      actpremio();	
    }
            
            
  }

  slotActivado = false;
}

function actpremio() {
  if(premio) {
    swal("¡Felicidades!", "Acude a tu sala más cercana con este código "+ premiocl.value, "success");
  } else {
    swal("Upps!", "Ocurrio un error al generar tu código", "error");

  }
}