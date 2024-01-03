<?php
$barcode_number = generate_barcode_number(VALUE_TWENTYSEVEN, $inspection_data['inspection_id']);

$header_array = array();
$header_array['title'] = 'ANNEXURE-12';
$header_array['department_name'] = 'Department of Town and Country Planning (Inspection at Plinth Level)';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
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

<div style="font-size: 14px; text-align: center;font-weight:  bold;">Annexure - 12</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">&emsp;</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Form for Approval of Work up to Plinth Level</div>
<div style="text-align: center;">[Development Control Rules - 2005 fir Daman District]</div>
<div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> To.</div></br></br>
<div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> Sir/Madam,</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;word-spacing: 4px;"></div>
</br></br>
<div style="font-size: 14px; text-align: left; margin-left: 100px; word-spacing: 4px;">With reference to your intimation no<?php echo $inspection_data['communication_number'] ?>  dated <?php echo $inspection_data['dated'] ?> regarding the completion of construction work up to plinth/columns up to plinth level for Building for <?php echo $inspection_data['plinth_column'] ?> purpose on/PlotNo.<?php echo $inspection_data['plot_no'] ?> of <?php echo $inspection_data['zone'] ?> zone situted at <?php echo $inspection_data['road'] ?> Road/Street  <?php echo $inspection_data['street'] ?> in <?php echo $inspection_data['industrial_area'] ?>. I  have to inform that further work may be proceeded with as per sanctioned plans/shall not be proceeded with as the construction up to plinth level is not as per sanctioned plans.</div>
</br></br>
<div style="font-size: 14px; text-align: center; margin-top: 10px;word-spacing: 4px;"></div>
</br>
<table class="" style="margin-left: 100px;">
    <tr><td class="border-none">Office No.</td></tr>
    <tr><td class="border-none">Office Stamp</td></tr>
    <tr><td>Date: </td><td>&emsp;</td><td class="border-none"><?php echo $inspection_data['application_date'] ?></td></tr>    
</table>
<br />
<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/inspection/<?php echo $inspection_data['sign_seal']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">Yours faithfully,</td></tr>
    <tr><td class="border-none">The Completant Authority</td></tr>
    <tr><td class="border-none">UT Administration of DNH And DD</td></tr>
    <tr><td class="border-none">Daman</td></tr>
</table>
<!--<div style="font-size: 14px;text-align: center;font-weight: bold;word-spacing: 2px;margin-top: 20px;">Note:</div>
 <div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(a)&emsp;&emsp;The firm is requested to note that the Registration in this office does not necessarily constitute acceptance or recognition by the Goverment,of any of the facts stated in their application. Further the registration will not imply any </div> -->
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>