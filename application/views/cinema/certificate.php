<?php
$barcode_number = generate_barcode_number(VALUE_EIGHT, $cinema_data['cinema_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Collectorate';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;text-decoration: underline;">C5 APPLICATION FOR GRANT OF LICENSE UNDER RULE 11 OF D. & N.H & D.D CINEMA</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;text-decoration: underline;">( Regulation of Exhibition of Video ) Rules, 1985</div>
<div style="font-size: 14px; margin-left: 540px; margin-top: 50px;font-weight: bold;">Date : <?php echo convert_to_new_date_format($cinema_data['updated_datetime']); ?></div>
<div class="row">
    <div class="form-group col-sm-6" style="font-weight: bold;margin-top: 50px;margin-left: 20px;">
        To,<br>
        Collector,<br>
        Dadra and Nagar Haveli & Daman and Diu.<br>
    </div>
</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 20px;">1. Name of the Applicants <div style="margin-left:  300px;margin-top: -20px;">: <?php echo $cinema_data['name_of_applicant']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 20px;">2. Address <div style="margin-left:  300px;margin-top: -20px;">:  <?php echo $cinema_data['permanent_address']; ?></div></div>
<br/>

<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo CINEMA_DOC_PATH; ?><?php echo $cinema_data['signature']; ?>" height="80px" width="80px"></div>
<div style="font-size: 14px; text-align: right; margin-top: 20px; margin-left: 20px;font-weight: bold;">(Signature / Thumb impression of the applicant)</div>
<div style="font-size: 14px; text-align: left; margin-left: 20px; margin-bottom: 5px;margin-top: 40px;text-decoration: underline;font-weight: bold;">Check list of documents to be attached</div>
<div style="font-size: 14px; text-align: left; margin-top: 20px; margin-bottom: 5px;margin-left: 20px;">1. The Plan showing the proposed construction of Cinema</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">2. Approved site plan by Mamlatdar / A.T.P</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">3. Certificate of C.O.P. Regarding character of the license</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">4. Photo-state copy of license obtained for commercial use under Indian Telegraph Act, 1885</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">5. Documents showing the ownership or tenancy of the place </div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 20px;">6. The consent from the Electricity department for availability of power</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>