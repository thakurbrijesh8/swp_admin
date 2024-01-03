<?php
$barcode_number = generate_barcode_number(VALUE_FOURTYFIVE, $migrantworkers_renewal_data['migrantworkers_renewal_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<style type="text/css">
    table.CompanyDetails {
        width: 100%;
        word-spacing: 2px;
        margin-left: 50px;
    }
    td.first-column{
        width: 5.1%;
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
    }
    td.border-none{
        border: none;
    }
</style>
<div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;text-decoration: underline;">INTER STATE MIGRANT WORKERS RENEWAL CERTIFICATE</div>
<div class="row">
</div>
<br/>
<table class="CompanyDetails">
    <tr>
        <td class="second-column">License Registration No. :</td>
        <td class="third-column">
            <?php echo $migrantworkers_renewal_data['registration_number']; ?>
        </td>
    </tr>
    <tr>
        <td class="second-column">Name of the Establishment :</td>
        <td class="third-column">
            <?php echo $migrantworkers_renewal_data['name_of_establishment']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="second-column">Location of Establishment :</td>
        <td class="third-column">
            <?php echo $migrantworkers_renewal_data['location_of_establishment']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="second-column">Name of Principal Employer :</td>
        <td class="third-column">
            <?php echo $migrantworkers_renewal_data['principal_employer_name']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="second-column">Address of Principal Employer :</td>
        <td class="third-column">
            <?php echo $migrantworkers_renewal_data['principal_employer_address']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="second-column">The Registration is hereby renewed upto :</td>
        <td class="third-column">
            <span style="border-bottom: 1px solid black;"><?php echo convert_to_new_date_format($migrantworkers_renewal_data['valid_upto']); ?></span>
        </td>
    </tr>
</table>
<br />
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo MIGRANTWORKERS_DOC_PATH; ?><?php echo $migrantworkers_renewal_data['signature']; ?>" height="80px" width="80px"></div>-->
<div style="font-size: 14px; text-align: right;margin-top: 50px; margin-right: 20px;font-weight: bold;word-spacing: 5px;">Signature of Inspector</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>