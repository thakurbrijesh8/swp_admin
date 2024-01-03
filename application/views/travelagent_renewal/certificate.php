<?php
$barcode_number = generate_barcode_number(VALUE_TWENTYTHREE, $travelagent_renewal_data['travelagent_renewal_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Tourism';
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
<div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;text-decoration: underline;">TRAVEL AGENCY REGISTRATION RENEWAL CERTIFICATE</div>
<div style="font-size: 16px; text-align: center; margin-top: 20px;font-weight: bold;margin-bottom: 20px;text-decoration: underline;">E N D O R S E M E N T</div>
<div class="row">
</div>
<br/>
<table class="CompanyDetails">
    <tr>
        <td class="second-column">License Registration No. :</td>
        <td class="third-column">
            <?php echo $travelagent_renewal_data['registration_number']; ?>
        </td>
    </tr>
    <tr>
        <td class="second-column">Name of the Travel Agency :</td>
        <td class="third-column">
            <?php echo $travelagent_renewal_data['name_of_travel_agency']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="second-column">Name of the proprietor : </td>
        <td class="third-column">
            <?php
            $proprietorinfo = json_decode($travelagent_renewal_data['name_of_proprietor'], TRUE);
            $i = 1;
            foreach ($proprietorinfo as $value) {
                echo $i++ . '. ' . $value['name'] . '<br>';
            }
            ?>
        </td>
    </tr>
    <tr>
        <td class="second-column">The Registration is hereby renewed upto :</td>
        <td class="third-column">
            <span style="border-bottom: 1px solid black;"><?php echo convert_to_new_date_format($travelagent_renewal_data['valid_upto']); ?></span>
        </td>
    </tr>
    <tr>
        <td class="second-column">Reg. Fees of Rs. :</td>
        <td class="third-column">
            <span style="border-bottom: 1px solid black;"><?php echo $travelagent_renewal_data['fees']; ?></span>
        </td>
    </tr>
    <tr>
        <td class="second-column">Paid vide chalan No. :</td>
        <td class="third-column">
            <span style="border-bottom: 1px solid black;"><?php echo $travelagent_renewal_data['challan_number']; ?></span>
        </td>
    </tr>
</table>
<br />
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 0px;margin-left: 20px;word-spacing: 5px;">"This license is subject to all statutory and legal compliances by the applicant. The owner shall be solely responsible for any violations respect to any laws."</div>
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo TRAVELAGENT_DOC_PATH; ?><?php echo $travelagent_renewal_data['signature']; ?>" height="80px" width="80px"></div>-->
<div style="font-size: 14px; text-align: right; margin-right: 20px;margin-top: 100px;font-weight: bold;word-spacing: 5px;">Director of Tourism,<br>DNH & DD</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>