<?php
$barcode_number = generate_barcode_number(VALUE_TWENTYFOUR, $tourismevent_data['tourismevent_id']);

$header_array = array();
$header_array['title'] = 'Form-1';
$header_array['department_name'] = 'संग देश दादरा एवं नगर हवेली और दमण एवं दव<br>Department of Tourism / पर्यटन विभाग<br>Paryatan Bhavan / पयटन भवन,';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>
<style type="text/css">
    body{
        font-family: arial_unicode_ms;
    }
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
<div style="font-size: 14px; margin-left: 20px;">File No :- <div style="margin-left:  50px;margin-top: -22px;text-align: left;">&emsp;<?php echo $tourismevent_data['registration_number']; ?></div></div>
<div style="font-size: 14px; margin-left: 600px;margin-top: -20px;">Dated :- <div style="margin-left:  50px;margin-top: -20px;text-align: left;">&nbsp;<?php echo convert_to_new_date_format($tourismevent_data['submitted_datetime']); ?></div></div>
<div style="font-size: 14px; text-align: center; margin-top: 30px;font-weight: bold;">Sub: Request to Grant Performance License for Tourism Event.</div>
<div style="font-size: 14px; margin-left: 0px; margin-top: 50px;margin-left: 20px;">To,<br><?php echo $tourismevent_data['name_of_person']; ?></div>
<div style="font-size: 14px; margin-top: 30px;word-spacing: 5px;margin-left: 80px;word-spacing: 5px;">This is in reference to the proposal dated </div><div style="margin-left:  380px;margin-top: -18px;border-bottom: 1px solid black;width: 150px;text-align: center;"><?php echo convert_to_new_date_format($tourismevent_data['submitted_datetime']); ?>&nbsp;</div><div style="margin-left:  540px;margin-top: -22px;word-spacing: 5px;">for the event namely</div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 10px;margin-left: 20px;border-bottom: 1px solid black;width: 250px;text-align: center;"><?php echo $tourismevent_data['name_of_event']; ?>&nbsp;</div><div style="word-spacing: 5px;margin-left:  290px;margin-top: -22px;">submitted by you to the department. We would like to inform</div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 9px;margin-left: 20px;">you that the department has granted the permission to the proposed event. The permission is   </div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;margin-left: 20px;">subject to the strict adherence to following terms and conditions:</div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 8px;margin-left: 20px;"><?php echo $tourismevent_data['remarks']; ?> </div>

<!--<div style="font-size: 14px; text-align: right;margin-top: 40px; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo TOURISMEVENT_DOC_PATH; ?><?php echo $tourismevent_data['signature']; ?>" height="80px" width="80px"></div>-->
<div style="font-size: 14px; text-align: right; margin-top: 50px; margin-bottom: 0px;font-weight: bold;margin-right: 20px;word-spacing: 5px;">Director of Tourism<br>DNH & DD.</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 20px;word-spacing: 5px;">Copy to, </div>
<div style="font-size: 14px; text-align: left; margin-bottom: 0px;margin-top: 0px;margin-left: 40px;word-spacing: 5px;">1. The Secretary (Tourism), DNH & DD for information please. </div>
<div style="font-size: 14px; text-align: left; margin-bottom: 0px;margin-top: 0px;margin-left: 40px;word-spacing: 5px;">2.  Office Copy. </div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>