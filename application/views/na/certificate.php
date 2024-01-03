<?php
$barcode_number = generate_barcode_number(VALUE_FOURTY, $na_data['na_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Collectorate';
$header_array['district'] = $na_data['district'] == VALUE_THREE ? 'Dadra and Nagar Haveli' : 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">SCHEDULE - 1</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;text-decoration: underline;">(See Rule 3)</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;text-decoration: underline;">CERTIFICATE OF NA APPLICATION</div>
<div style="font-size: 14px; margin-left: 540px; margin-top: 50px;font-weight: bold;">Date : <?php echo convert_to_new_date_format($na_data['updated_datetime']); ?></div>
<div class="row">
    <div class="form-group col-sm-6" style="font-weight: bold;margin-top: 50px;margin-left: 20px;">
        To,<br>
        Collector,<br>
        Dadra and Nagar Haveli & Daman and Diu.<br>
    </div>
</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 20px;">1. Registration Number <div style="margin-left:  300px;margin-top: -20px;">: <?php echo $na_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 20px;">2. Name of the Applicant <div style="margin-left:  300px;margin-top: -20px;">: <?php echo $na_data['name_of_applicant']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 20px;">3. Address <div style="margin-left:  300px;margin-top: -20px;">:  <?php echo $na_data['postel_address']; ?></div></div>
<br/>

<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo NA_DOC_PATH; ?><?php echo $na_data['signature']; ?>" height="80px" width="80px"></div>
<div style="font-size: 14px; text-align: right; margin-top: 20px; margin-left: 20px;font-weight: bold;">(Signature / Thumb impression of the applicant)</div>
<div style="font-size: 14px; text-align: left; margin-left: 20px; margin-bottom: 5px;margin-top: 40px;text-decoration: underline;font-weight: bold;">Check list of documents to be attached</div>
<div style="font-size: 14px; text-align: left; margin-top: 20px; margin-bottom: 5px;margin-left: 20px;">1. Form No. I & XIV of the land in question, in original + 9 Zerox copy.</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">2.  Site Plan of the land in question, in original + 9 Zerox copy.</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>