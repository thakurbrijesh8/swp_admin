<?php
$barcode_number = generate_barcode_number(VALUE_TWO, $repairer_data['repairer_id']);

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
<div style="font-size: 14px; text-align: center;font-weight:  bold;">SEHEDULE III</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">[See rule 11 (3)]</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Licencing Form</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">FORM LR 3</div>
<div style="font-size: 14px; text-align: center; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> ADMINISTRATION OF DAMAN & DIU</div>
<div style="font-size: 14px; text-align: center; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> OFFICE OF THE CONTROLLER OF LEGAL METROLOGY</div>
<div style="font-size: 14px; text-align: center; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> LICENSE TO REPAIR WEIGHTS, MEASURES, WEIGHING INSTRUMENTS OR MEASURING INSTRUMENTS</div>
<div style="font-size: 14px; text-align: left;word-spacing: 10px;">license No : <?php echo $repairer_data['admin_registration_number']; ?></div>
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;">Year : &emsp;<?php echo date("Y"); ?></div>

<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(1)&emsp;&emsp;The controller of legal metrology hereby grants to<b> <?php echo $repairer_data['name_of_repairer']; ?>&nbsp;&nbsp;<?php echo $repairer_data['complete_address']; ?></b> a license to repair the following :-<br/>(Include details of the types of weights,measures,weighing instruments or measuring instruments that are license to be reapaired by the party).</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(2)&emsp;&emsp;The license is valid for the party named above in respect of his workshop located at <?php echo $repairer_data['complete_address']; ?>.</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(3)&emsp;&emsp;The license is valid upto <?php echo date('d/m/Y',strtotime($repairer_data['valid_upto'])); ?> .</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(4)&emsp;&emsp;The repairer shall comply with the conditions noted below. If he fails to company with any one, his license is liable to be cancelled .</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(5)&emsp;&emsp;The party is licenced to repair weights, measures, weighting and measuring instruments in the areas mentioned below -</div>
<br />
<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/repairer/<?php echo  $repairer_data['mw_sign_of_principal_employer']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Signature</td></tr>
    <tr><td class="border-none">Controller of Legal Metrology</td></tr>
</table>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Date :  <?php echo date("d/m/Y"); ?></div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Place : Daman</div>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Note : In the case of firm,its name with the names of all persons having any intrest in the business should be given in paragraph.</div>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">CONDITIONS OF LICENCE </div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(1)&emsp;&emsp;The person in whose favour this licence is issued shall.</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(a)&emsp;&emsp;Comply with all the relevant provisions of the Act and Rules for the time being in force;</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(b)&emsp;&emsp;Not encourage or countenance any infringement of the provisions of the Act. or the Rules amended from time to time;</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(c)&emsp;&emsp;Exhibit this licence in some conspicuous part of the premises to which it relates; </div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(d)&emsp;&emsp;Comply with any general or special directions that may be given by the Controller of legal metrology;</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(e)&emsp;&emsp;Surrender the licence in the event of closure of business and/ or cancellation of Licence;</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(f)&emsp;&emsp;(i) Present the weights, measures, weighing or measuring instruments as the case may be duly repaired to the legal metrology officer for under taking verification and stamping as specified in rule 14(1), before delivery to the user.<br/>&emsp;&emsp;(ii) In the case of weights, measures weighing or measuring instruments, if they are serviced/repaired before the date on which the verification falls due and where, in the process and the verification stamp of the legal metrology officer is defaced, removed or broken, they shall be presented duly repaired to the legal metrology officer for re-verification and stamping before delivery to the user</div>
<br />
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(g)&emsp;&emsp;Submit the application for renewal of this licence as required under the rules within thirty days of expiry of the validity of the licence.</div>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(2)&emsp;&emsp;Every condition prescribed after the issue of this licence shall if notified in the Official Gazette, be binding on the persons to whom the licence has been granted. </div>
<br />
<br />
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>