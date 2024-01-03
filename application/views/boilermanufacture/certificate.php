<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYEIGHT, $boiler_manufacture_data['boilermanufacture_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<style type="text/css">
    body {
        font-family: arial;
        font-size: 12px;
    }
    table.CompanyCertificate {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
    }
    td.first-column{
        width: 36%;
        text-align: center;
    }
    td.second-column{
        width: 20%;
        text-align: center;
    }
    td.third-column{
        width: 20%;
        text-align: center;
    }
    td.forth-column{
        width: 10%;
        text-align: center;
    }
    td.table-first-column{
        width: 8.45%;
        text-align: center;
    }
    td.table-second-column{
        width: 25%;
    }
    td.table-third-column{
        width: 25%;
    }
    td.table-forth-column{
        width: 10%;
    }
    td.table-fifth-column{
        width: 25%;
    }
    td.single-second-column{
        width: 94%;
    }
    table.CompanyCertificate td{
        height: 50px;
        padding: 3px;
    }
    table.CompanyCertificate th{
        height: -220px;
        padding: 3px;
        border: 1px solid black;
        border-collapse: collapse;
    }
    td.declaration-number{
        border: none;
        width: 5%;
        vertical-align: text-top;
    }
    td.declaration{
        border: none;
        width: 100%;
    }
    td.border-none{
        border: none;
    }


</style>

<div style="font-size: 16px; text-align: center;font-weight: bold;">Certificate of Boiler Registration Application - New</div>


<br/>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">1. Registration Number  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $boiler_manufacture_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">2. Name Of Firm  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $boiler_manufacture_data['name_of_firm']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;font-weight: bold;margin-top: 20px;">3. Valid Up To  <div style="margin-left: 300px;margin-top: -15px;">--  <?php echo convert_to_new_date_format($boiler_manufacture_data['valid_upto']); ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">4. Address of Workshop  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $boiler_manufacture_data['address_of_workshop']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">5. Types of Jobs.  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $boiler_manufacture_data['type_of_jobs']; ?></div></div>

<!--<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/factorylicense/<?php echo $boiler_manufacture_data['sign_of_applicant_for_bp']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Signature of Applicant</td></tr>
</table>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;">&emsp;</div>
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:20px;font-weight: bold;margin-right: 20px;">Chief Inspector of Factories</div>
<br/>

<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>