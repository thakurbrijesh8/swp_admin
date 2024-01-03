<?php
$barcode_number = generate_barcode_number(VALUE_FIVE, $wc_data['wc_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Public Works Department';
$header_array['district'] = $wc_data['district'] == VALUE_THREE ? 'Dadra and Nagar Haveli' : 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
$this->load->view('certificate/header', $header_array);
$submitted_datetime = convert_to_new_date_format($wc_data['status_datetime']);
?>

<h2 style="text-align: center;font-weight:  bold; margin-top: 30px; text-decoration: underline;">WATER SUPPLY CONNECTION CERTIFICATE</h2>

<div style="margin-top: 50px; letter-spacing: 1px; padding-left: 30px; padding-right: 30px; line-height: 2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    This is to certify the water supply connection has been issued to the consumer
    Shri/Smt. <b style="text-decoration: underline;"><?php echo $wc_data['name_of_applicant']; ?></b>
    R/o. <b style="text-decoration: underline;">
        <?php
        echo $wc_data['house_no'] . ', ' . $wc_data['ward_no'] . ', ' . $wc_data['village'] . ', ' . $wc_data['panchayat_or_dmc'];
        ?>
    </b>
    for <b style="text-decoration: underline;"><?php echo $wc_data['wc_type']; ?></b>
    purpose on dated: <b style="text-decoration: underline;"><?php echo $submitted_datetime; ?></b>.
</div>
<div style="margin-top: 50px; letter-spacing: 1px; margin-left: 60%; text-align: center;">
    <img src="images/pwd_sub_division_sign.jpeg" /><br>
    Assistance Engineer,<br>
    Public Works Department,<br>
    Sub Division - I,<br>
    <?php echo $header_array['district']; ?>
</div>
<div style="letter-spacing: 1px; padding-left: 30px;">
    <b>Place : </b> <?php echo $header_array['district']; ?><br><br>
    <b>Date  : </b> <?php echo $submitted_datetime; ?>
</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>