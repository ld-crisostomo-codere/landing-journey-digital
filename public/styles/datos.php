<?php



if(isset($_POST['namec']))
{

    include("conexion.php");
    /*
    $ip_add = $_SERVER['REMOTE_ADDR'];
    $ipString = strval($ip_add);

     $qr="SELECT * FROM cliente WHERE ip='$ipString'";*/

     /*$qr="SELECT * FROM cliente WHERE Correo='$correo'";*/
     $qr="SELECT Nombre FROM cliente WHERE Correo='".mysqli_real_escape_string($enlace,$_POST['email'])."'";
    
     $res=mysqli_query($enlace,$qr);
    $nreg=mysqli_num_rows($res);
   

     if ($nreg>=1) { 
        echo '<div class="alert alert-danger" role="alert">¡Error! Ya has sido registrado.</div> <script>errorregistro()</script>';
        die();
     }
     else{
         $nombre   = mysqli_real_escape_string($enlace, $_POST['namec']);
         $telefono = mysqli_real_escape_string($enlace,$_POST['telc']);
         $correo   = mysqli_real_escape_string($enlace,$_POST['email']);
         $fecha    = mysqli_real_escape_string($enlace,$_POST['nacimiento']);
     /*    $ip       = $_SERVER['REMOTE_ADDR'];*/
        //$query="INSERT INTO cliente(Nombre,Telefono,Correo,Fecha_na,ip) VALUES('".mysqli_real_escape_string($enlace,$_POST['namec'])."','".mysqli_real_escape_string($enlace,$_POST['telc'])."','".mysqli_real_escape_string($enlace,$_POST['email'])."','".mysqli_real_escape_string($enlace,$_POST['nacimiento'])."','".mysqli_real_escape_string()."')";
       /* $query = "INSERT INTO cliente (Nombre, Telefono, Correo, Fecha_na, ip) VALUES ('$nombre', '$telefono', '$correo', '$fecha', '$ip')";*/
        $query = "INSERT INTO cliente (Nombre, Telefono, Correo, Fecha_na) VALUES ('$nombre', '$telefono', '$correo', '$fecha')";
        $res = mysqli_query($enlace,$query);

        if($res)
        {
           
        echo '<div class="alert alert-success" role="alert" id="cuadro">¡Tus datos se han guardado correctamente , ahora solo da clic a jugar y llévate el beneficio!</div> <a  onclick="ocultarpop()"  name="Jugar"  class="btn btn-outline-secondary nav-btn" style="margin-bottom:40px; margin-top:30px;"><span class="topGameCTA" >JUGAR </span></a><script>cambiarboton('.mysqli_insert_id($enlace).')</script>';   
        }
        else
        {
            var_dump($res);
            echo '<div class="alert alert-danger" role="alert">Lo sentimos, no se han registrado correctamente tus datos, intentelo más tarde </div>';
        }
     }
}
    

if(isset($_POST['idcliente']))
{

    $permitted_chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 
    function generate_string($input, $strength = 7) {
        $input_length = strlen($input);
        $random_string = '';
        for($i = 0; $i < $strength; $i++) {
            $random_character = $input[mt_rand(0, $input_length - 1)];
            $random_string .= $random_character;
        }
    
        return $random_string;
    }
    
    $codigo=generate_string($permitted_chars, 8);
    $ecc='H';
    $size='8';

    include('../qr/phpqrcode/qrlib.php'); 
        $codesDir = "codes/";   
        $codeFile = date('d-m-Y-h-i-s').'.png';
        QRcode::png($codigo, $codesDir.$codeFile, $ecc, $size); 
    $codeqr='<img class="img-thumbnail" src="https://barucckdevelop.com/web/YAK/php/'.$codesDir.$codeFile.'" />';

include("conexion.php");
    $qr="UPDATE cliente SET Codigo='".$codigo."', Premio='".mysqli_real_escape_string($enlace,$_POST['premiocl'])."' WHERE id_cliente='".mysqli_real_escape_string($enlace,$_POST['idcliente'])."' ";
    if(mysqli_query($enlace,$qr))
    {
      $queri="SELECT Nombre,Correo FROM cliente WHERE id_cliente='".mysqli_real_escape_string($enlace,$_POST['idcliente'])."'";
                                $res=mysqli_query($enlace,$queri);
                                $row=mysqli_fetch_array($res); 
         $emailA = $row['Correo']; 

                $asunto ="Reclama tu premio en la sala más cercana";
                $contenido = '

<!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="utf-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                                <title>Correo Confirmaión</title>
                                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet">
                                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
                                <style type="text/css">
                                    .cont{display: flex; justify-content: center; align-items: center;} body{font-family: \'Montserrat\', sans-serif; letter-spacing: 3px; padding: 0; margin: 0;} .links{text-align: center;} .linkcont{margin-bottom: 60px;} .icons{font-size: 30px;} .iconit{margin-right: 10px; color:#fff;} .sociales{place-content: center;} .bannersocial{width: 95%; background: #3d1051; height: 30px; color: #fff; padding: 20px;} .text-center{text-align: center;} .ital{font-style: italic; margin-top:60px;} .banner{background: #3d1051; width:100%; height:150px; display:flex; align-items:center; justify-content: center;} .logos{width: 100px} .bodcor{margin-top:50px; margin-bottom:50px;} .bannerh{width:100%}
                                </style>
                            </head>
                            <body>
                                <div class="cont">
                                <div style="width: 800px; text-align: center;">
                                    <img src="https://barucckdevelop.com/web/YAK/images/correo.jpg" class="bannerh">
                                    <h2 class="text-center ital">Felicidades '.$row['Nombre'].', reclama tu premio en la sala más cercana</h2>
                                    <h3 class="text-center">Recibe tu premio de '.mysqli_real_escape_string($enlace,$_POST['premiocl']).' entregando el siguiente codigo:</h3>
                                    <div class="bodcor">
                                     <h3>'.$codeqr.'</h3>
                                    </div>
                                    <img src="https://yak.fas.digital/images/fcorreo.jpg" class="bannerh">
                                </div>
                                
                                <div>
                            </body>
                            </html>';
                $cabeceras = "MIME-Version: 1.0\r\n";  
                $cabeceras .= "Content-type: text/html; charset=utf-8\r\n";
                $cabeceras .= "From: Yak <noreply@barucckdevelop.com>\r\n";
                if(true)
                {
                   echo ' <div class="alert alert-success" role="alert">¡Felicidades, Acude a tu sala más cercana con este código '.mysqli_real_escape_string($enlace,$_POST['premiocl']).'!<br>
        No olvides tu identificación oficial para obtener tu beneficio <br>Vigencia de 30 días </div>';
                }
                else
                {
                    echo '<script>alert("Ocurrio un error al Enviar email");</script>';
                }
    }
    else
    {
        echo' ';
    }
}


?>