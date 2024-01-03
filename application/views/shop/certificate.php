<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYTHREE, $shop_data['s_id']);

$header_array = array();
$header_array['title'] = 'Form-III';
$header_array['department_name'] = 'Department of Labour';
if ($shop_data['district'] == VALUE_THREE) {
    $header_array['district'] = 'Dadra and Nagar Haveli';
} else if ($shop_data['district'] == VALUE_ONE) {
    $header_array['district'] = 'Daman';
} else if ($shop_data['district'] == VALUE_TWO) {
    $header_array['district'] = 'Diu';
}
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<div style="font-size: 14px; text-align: center;font-weight: bold;">FORM-III</div>
<div style="text-align: center;font-weight: bold;">(Under Goa, Daman, and Diu Shops and Establishments Rule, 1975)</div>
<div style="text-align: center;font-weight: bold;">( See Rule 5 )</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Registration Certificate of Establishment</div>
<div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;font-weight: bold;">1. Registration Number &emsp; <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $shop_data['s_registration_no']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">2. Name of Establishment  <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $shop_data['s_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">3. Postel Address of Establishment  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $shop_data['s_door_no']; ?>,<?php echo $shop_data['s_street_name']; ?>,<?php echo $shop_data['s_location']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">4. Name of Employer  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $shop_data['s_employer_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">5. Nature of Business  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $shop_data['s_nature_of_business']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;margin-top: 40px;margin-left:60px;font-weight: bold;">It is hereby certified that<div style="border-bottom:1px solid;margin-left: 185px;margin-top: -20px;width:350px;">&nbsp;<?php echo $shop_data['s_name']; ?></div><div style="margin-left: 540px;margin-top: -20px;">has been</div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 7px;margin-left:10px;font-weight: bold;">Registered as<div style="border-bottom:1px solid;margin-left: 430px;margin-top: -20px;width:150px;">&nbsp;<?php echo convert_to_new_date_format($shop_data['fees_paid_challan_updated_date']); ?></div><div style="margin-left: 360px;margin-top: -20px;">this day</div><div style="border-bottom:1px solid;margin-left: 640px;margin-top: -20px;width:50px;">&nbsp;<?php echo date('y', strtotime($shop_data['fees_paid_challan_updated_date'])); ?></div><div style="margin-left: 580px;margin-top: -20px;">of 200</div><div style="border-bottom:1px solid;margin-left: 120px;margin-top: -15px;width:230px;">&nbsp;<?php echo $shop_data['s_category']; ?></div></div>
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;"><img src="<?php echo base_url(); ?>documents/sign_and_stamp/labour_stemp.png" height="100px" width="100px"></div>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:60px;font-weight: bold;margin-right: 20px;">Signature of Inspector</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;font-weight: bold;margin-left: 20px;">Seal </div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>



