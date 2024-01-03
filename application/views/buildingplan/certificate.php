<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYSIX, $buildingplan_data['buildingplan_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  Legal, Legal
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

<!--<div style="font-size: 14px; text-align: center;">FORM 1</div>-->
<div style="font-size: 14px;text-align: center;font-weight: bold;">Prescribed Under Rule 3</div>
<div style="font-size: 14px;text-align: center;font-weight: bold;">Certificate of Factory Building Plan Approval</div>

<br/>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">1. Registration Number  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $buildingplan_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">2. Name Of Factory  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $buildingplan_data['factory_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;font-weight: bold;margin-top: 20px;">3. Valid Up To  <div style="margin-left: 300px;margin-top: -15px;">--  <?php echo convert_to_new_date_format($buildingplan_data['valid_upto']); ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">4. Factory Building  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $buildingplan_data['factory_building']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">5. Factory Street No./Sector.  <div style="margin-left: 300px;margin-top: -15px;">-- <?php echo $buildingplan_data['factory_streetno']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;font-weight: bold;margin-top: 20px;">6. City  <div style="margin-left: 300px;margin-top: -15px;">--  <?php echo $buildingplan_data['factory_city']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;font-weight: bold;margin-top: 20px;">7. Pincode <div style="margin-left: 300px;margin-top: -15px;">--  <?php echo $buildingplan_data['factory_pincode']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 8px;font-weight: bold;margin-top: 20px;">8. District  <div style="margin-left: 300px;margin-top: -15px;">--  <?php echo $buildingplan_data['factory_district']; ?></div></div>
<!--<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/factorylicense/<?php echo $buildingplan_data['sign_of_applicant_for_bp']; ?>" height="60px" width="90px"></td></tr>
</table>-->
<!--<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Signature of Inspector</td></tr>
</table>-->
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;"><img src="<?php echo base_url(); ?>documents/sign_and_stamp/labour_stemp.png" height="100px" width="100px"></div>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;">&emsp;</div>
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:20px;font-weight: bold;margin-right: 20px;">Signature of Inspector</div>
<br/>

<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>