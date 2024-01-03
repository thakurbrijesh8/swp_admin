<?php
$barcode_number = generate_barcode_number(VALUE_SEVEN, $pfr_data['psfregistration_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Civil Registrar Cum Sub Registrar';
$header_array['district'] = $pfr_data['district'] == VALUE_THREE ? 'Dadra and Nagar Haveli' : 'Daman and Diu';
// Do not changes this page size only for this page
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<div style="text-align: center; margin-top: 100px;">
    <barcode disableborder="1" code="<?php echo 'https://daman.nic.in/everify?ev=' . $barcode_number; ?>" type="QR" size="5"/>
</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>