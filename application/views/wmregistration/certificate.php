<?php
$barcode_number = generate_barcode_number(VALUE_ONE, $wmregistration_data['wmregistration_id']);

$header_array = array();
$header_array['title'] = 'Form-1';
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
<div style="font-size: 14px; text-align: center;font-weight:  bold;">CERTIFICATE OF REGISTRATION</div>
<div style="font-size: 14px; text-align: center;word-spacing: 10px;">[Under Rule 27 of The Legal Metrology (Packaged Commodities)Rules, 2011]</div><br/>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 500px;">No.ACLM/DMN/P.C.R/2020/ &emsp;</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 500px;">Date : &emsp;<?php echo date("d/m/Y"); ?></div><br/>
<div style="font-size: 14px; margin-bottom:  10px;line-height: 1.6;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Certified that <b><?php echo $wmregistration_data['name_of_applicant']; ?> <?php echo $wmregistration_data['branches']; ?></b> of the Manufacturer/Packer/Importer has been registered in this office vide registration No.No.ACLM/DMN/P.C.R/2020/ as a Manufacturere/Packer/Impoter and its packaging units are as given below :</div>
<table class="CompanyDetails">
    <tr>
        <td class="first-column">Sr No. </td>
        <td class="second-column">Address of Establishment.</td>
        <td class="third-column">Commodities Packed.</td>
    </tr>
    <tr>
        <td class="first-column">1.</td>
        <td class="second-column"><?php echo $wmregistration_data['location_of_factory']; ?></td>
        <td class="third-column">
        </td>
    </tr>
</table>
<br />
<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/wmregistration/<?php echo $wmregistration_data['mw_sign_of_principal_employer']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Assistant Controller,</td></tr>
    <tr><td class="border-none">Legal Metrology(Weights & Measures)</td></tr>
    <tr><td class="border-none">Daman & Diu</td></tr>
</table>
<div style="font-size: 14px;font-weight: bold;word-spacing: 2px;margin-top: 20px;">Note:</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(1) The firm is requested to note that the Registration in this office does not necessarily constitute acceptance or recognition by the Government, of any of the facts stated in their application. Further the registration will not imply any commitment whether on the part of Government to provide foreign exchange or any other assistance. </div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(2) In case it is desired to suspend the activities, the registration certificate may be returned to this office for cancellation. </div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(3)  In case of any addition/deletion of your units please apply for revised Certificate. The units should be informed about the firm's registration number which may be required by the enforcement officials at the time of their inspection or at the time of net content checking of samples of their product. </div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>