
<?php
$path = '/demo/hotnix/views/customer/rfp/static';
$hashAppCss = '760598fb27ae00bae84d62e5f7627994';
$hashMan = '6582df293e5d7ea07ed4';
$hashVend = '78e4d2237b1261c3e986';
$hashApp = '6ff7c20d2fa33f9d169a';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href=<?php echo $path."/css/app.".$hashAppCss.".css"; ?> rel="stylesheet"></head>
    <link rel=stylesheet href=//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <style>
    * {
        font-family: sans-serif;
        font-size:12px;
    }

	#app td, #app th {
        font-size:12px !important;
	}
    #mainblock{
        padding : 0em 0em !important;
    } 
    #pageHead{
        display:none !important;
    }
    </style>
  <body>
    <div id="mainblock" class="k-content">
        <div id="app"></div>
    </div>
    <script type="text/javascript" src=<?php echo $path."/js/manifest.".$hashMan.".js";?>></script><script type="text/javascript" src= <?php echo $path."/js/vendor.".$hashVend.".js";?>></script><script type="text/javascript" src= <?php echo $path."/js/app.".$hashApp.".js";?>></script></body>
</html>
