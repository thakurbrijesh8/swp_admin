<?php
$barcode_number = generate_barcode_number(VALUE_FOURTYNINE, $rii_data['rii_id']);

$header_array = array();
$header_array['title'] = 'Form-II';
$header_array['department_name'] = 'Department of Legal Metrology (Weights & Measures)';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>

<style type="text/css">
    table.CompanyDetails {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        word-spacing: 2px;
    }
    td.first-column{
        width: 5.1%;
        border: 1px solid black;
        text-align: center;
        word-spacing: 5px;
    }
    td.second-column{
        width: 39%;
        word-spacing: 10px;
    }
    td.third-column{
        width: 43%;
    }
    table.CompanyDetails td{
        height: 60px;
        padding: 3px;
        border: 1px solid grey;
        border-collapse: collapse;
    }
    td.border-none{
        border: none;
    }
</style>


<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>