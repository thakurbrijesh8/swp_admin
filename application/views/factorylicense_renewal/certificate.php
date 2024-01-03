<?php
$barcode_number = generate_barcode_number(VALUE_FOURTYONE, $factorylicence_renewal_data['factorylicence_renewal_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Office of the Chief Inspector of Factories';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
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

<div style="font-size: 14px; text-align: center;">FORM-4</div>
<div style="text-align: center;">Prescribed under rule 7</div>
<div style="text-align: center;">LICENCE TO WORK A FACTORY</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;">Registration number &emsp; : <b><?php echo $factorylicence_renewal_data['registration_number']; ?></b></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;">Licence number &emsp; : <b><?php echo $factorylicence_renewal_data['registration_number']; ?></b></div>
<br/>
<div style="font-size: 14px; margin-bottom:  10px;line-height: 1.6;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Licence is hereby granted to <b><?php echo $factorylicence_renewal_data['name_of_factory']; ?></b> valid only for the premises described below for use as a factory employing not more than <b><?php echo $factorylicence_renewal_data['max_no_of_worker_year']; ?></b>  persons on any one day during the year and using motive power not exceeding  <b><?php echo $factorylicence_renewal_data['max_power_to_be_used']; ?></b> H.P. subject to the provisions of the factories Act, 1948 and the Rules made anuder.</div>
<br/></br/>
<div style="font-size: 14px; margin-bottom:  10px;line-height: 1.6;">This Licence shall remain in force till the <b><?php echo date('d/m/Y',strtotime($factorylicence_renewal_data['valid_upto'])); ?></b></div>
<br/>
<div style="text-align: center;">Description of the license premises</div>
<br/>
<div style="font-size: 14px; margin-bottom:  10px;line-height: 1.6;">This Licence premises on plan number dated are situated in <b><?php echo $factorylicence_renewal_data['factory_address']; ?></b> and consist of </div>
<br/>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Date :  <?php echo convert_to_new_date_format($factorylicence_renewal_data['updated_time']); ?></div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Place : Daman</div>
<br/>
<!--<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/factorylicense/<?php echo $factorylicence_renewal_data['mw_sign_of_principal_employer']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Chief Inspector of Factories,</td></tr>
</table>-->
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;"><img src="<?php echo base_url(); ?>documents/sign_and_stamp/labour_stemp.png" height="100px" width="100px"></div>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;">&emsp;</div>
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:20px;font-weight: bold;margin-right: 20px;">Chief Inspector of Factories</div>
<br/>

<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>