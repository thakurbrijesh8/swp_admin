<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYFOUR, $migrantworkers_data['mw_id']);

$header_array = array();
$header_array['title'] = 'Form-II';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
$this->load->view('certificate/header', $header_array);
?>
<!--<div style="font-size: 14px; text-align: center;font-weight: bold;">FORM-II</div>-->
<div style="text-align: center;font-weight: bold;">(Under Goa, Daman, and Diu Shops and Establishments Rule, 1975)</div>
<div style="text-align: center;font-weight: bold;">( See Rule 5 )</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Registration Certificate of Establishments Employing Migrant Workman</div>
<div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;font-weight: bold;">1. Registration Number &emsp; <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $migrantworkers_data['mw_registration_no']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">2. Name of Establishment  <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $migrantworkers_data['mw_name_of_establishment']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">3. Postel Address of Establishment  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $migrantworkers_data['mw_location_of_establishment']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">4. Name of Employer  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $migrantworkers_data['mw_principal_employer_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">5. Nature of Business  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $migrantworkers_data['mw_nature_of_work_of_establishment']; ?></div></div>
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;"><img src="<?php echo base_url(); ?>documents/sign_and_stamp/labour_stemp.png" height="100px" width="100px"></div>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:80px;font-weight: bold;margin-right: 20px;">Signature of Inspector</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;font-weight: bold;margin-left: 20px;">Seal </div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>