<?php
$barcode_number = generate_barcode_number(VALUE_FIVE, $vc_data['vc_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Public Works Department';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>

<div style="text-align: center;font-weight:  bold;">Public Works Department</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Work Division-I, Sub Division-I</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;margin-bottom: 20px;">Contract for Water Supply</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 0px;margin-left: 22px;">Contract No. <div style="margin-left:90px;margin-top: -20px;width: 150px;border-bottom: 1px solid black;word-spacing: 1px;">&emsp;<?php echo $vc_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: -15px;margin-left: 470px;">Meter No. <div style="margin-left:90px;margin-top: -20px;width: 150px;border-bottom: 1px solid black;word-spacing: 1px;">&emsp;</div></div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-1 &emsp; - &emsp;The Public Works Department, Water Supply wing shall Supply water through a mets of</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 0px;margin-left: 125px;word-spacing: 1px;">___________________ to ________________ resident in House No. <div style="border-bottom: 1px solid black;width: 115px;margin-left: 395px;margin-top: -20px;word-spacing: 1px;">&emsp;<?php echo $vc_data['house_no']; ?> </div><div style="margin-left: 510px;margin-top: -20px;word-spacing: 1px;">situated at</div></div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 0px;margin-left: 125px;word-spacing: 1px;">___________________ who has paid an amount of Rs.<div style="border-bottom: 1px solid black;width: 120px;margin-left: 325px;margin-top: -20px;word-spacing: 1px;">&emsp;</div><div style="margin-left: 460px;margin-top: -20px;word-spacing: 1px;">as security deposit.</div></div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 6px;margin-left: 22px;"> Articale-2 &nbsp;- &nbsp;The Supply of water shall be for an indefinite period and commencing from</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 0px;margin-left: 130px;border-bottom: 1px solid black;width: 300px;word-spacing: 1px;">&emsp;</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-3 &emsp;- &emsp;The deposit guarantees all the debts of any nature, due to the water supply wing of P.W.D</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-4 &emsp;- &emsp;The Water rate is fixed according to the price in force, published in the official Gazette.</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-5 &emsp;- &emsp;The Water Supply shall be used exclusively for domestic/industrial/commercial purpose.</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-6 &emsp;- &emsp;The minimum consumption tax and meter rent per month will be <div style="border-bottom: 1px solid black;width: 120px;margin-left: 540px;margin-top: -20px;word-spacing: 1px;">&emsp;</div><div style="margin-left: 662px;margin-top: -20px;word-spacing: 1px;">and</div></div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 0px;margin-left: 125px;">Rs.<div style="border-bottom: 1px solid black;width: 170px;margin-left: 30px;margin-top: -20px;word-spacing: 1px;">&emsp; </div><div style="margin-left: 210px;margin-top: -20px;word-spacing: 1px;">respectively.</div></div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 30px;word-spacing: 1px;margin-left: 22px;"> Articale-7 &emsp;- &emsp;The consumers agrees with all the rules and regulations, in force of this wing.</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 60px;margin-left: 125px;word-spacing: 1px;">This contract is signed by both the intervenes.____________________________________</div>
<div style="font-size: 14px; margin-bottom:  7px;margin-top: 0px;margin-left: 125px;word-spacing: 1px;">Water Supply wing of P.W.D at Daman _____________________________________________</div>
<div style="font-size: 14px;text-align: center;margin-bottom:  7px;margin-top: 150px;margin-left: 505px;word-spacing: 1px;"><img src="<?php echo WC_DOC_PATH; ?><?php echo $vc_data['signature']; ?>" height="80px" width="80px"></div>
<div style="font-size: 14px;text-align: center;margin-bottom:  7px;margin-top: 0px;margin-left: 505px;word-spacing: 1px;border-top: 1px solid black;width: 160px;">Consumer</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>