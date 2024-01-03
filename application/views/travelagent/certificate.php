<?php
$barcode_number = generate_barcode_number(VALUE_NINETEEN, $travelagent_data['travelagent_id']);

$header_array = array();
$header_array['title'] = 'Form-V';
$header_array['department_name'] = 'Department of Tourism';
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
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Form - V</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">(See Rule IV)</div>
<div style="font-size: 14px; margin-left: 0px; margin-top: 50px;margin-left: 30px;">Registration No. : <div style="margin-left:  130px;margin-top: -18px;border-bottom: 1px solid black;width: 250px;text-align: center;"><?php echo $travelagent_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: center; margin-top: 30px;font-weight: bold;text-decoration: underline;">CERTIFICATE OF REGISTRATION OF TRAVEL AGENT</div>
<div style="font-size: 14px; margin-top: 40px;word-spacing: 6px;margin-left: 100px;">This is to certify that</div><div style="margin-left:  270px;margin-top: -18px;border-bottom: 1px solid black;width: 340px;text-align: center;">&nbsp;<?php echo $travelagent_data['name_of_travel_agency']; ?></div><div style="margin-left:  623px;margin-top: -18px;word-spacing: 5px;">has registered</div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 6px;margin-left: 25px;">under the Goa, Daman & Diu Registration of Tourist Trade Act 1982 to operate  the said travel </div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;margin-bottom: 50px;margin-left: 25px;">agency, detailed as under :-</div>
<table class="CompanyDetails">
    <tr>
        <td class="first-column">(a)</td>
        <td class="second-column">Name of the Travel Agency </td>
        <td class="third-column">
            <?php echo $travelagent_data['name_of_travel_agency']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(b)</td>
        <td class="second-column">Address of the Agency</td>
        <td class="third-column">
            <?php echo $travelagent_data['address_of_agency']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(c)</td>
        <td class="second-column">Area where the Travel agency is operating </td>
        <td class="third-column">
            <?php echo $travelagent_data['area_of_agency']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(d)</td>
        <td class="second-column">This certificate is valid up to </td>
        <td class="third-column">
            <?php echo convert_to_new_date_format($travelagent_data['valid_upto']); ?>
        </td>
    </tr>
</table>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 30px;margin-left: 20px;word-spacing: 5px;">"This license is subject to all statutory and legal compliances by the applicant. The owner shall be solely responsible for any violations respect to any laws."</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 20px;word-spacing: 5px;">Place <div style="margin-left:  60px;margin-top: -17px;">: Daman</div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 20px;word-spacing: 5px;">Dated <div style="margin-left:  60px;margin-top: -20px;">:  <?php echo convert_to_new_date_format($travelagent_data['updated_time']); ?></div></div>
<br/>

<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo TRAVELAGENT_DOC_PATH; ?><?php echo $travelagent_data['signature']; ?>" height="80px" width="80px"></div>-->
<div style="font-size: 14px; text-align: right; margin-top: 20px; font-weight: bold;margin-right: 20px;word-spacing: 5px;">Director of Tourism<br>DNH & DD.</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>