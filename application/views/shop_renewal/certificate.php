<?php
$barcode_number = generate_barcode_number(VALUE_FOURTYTWO, $shop_renewal_data['shop_renewal_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Labour';
//$header_array['district'] = 'Daman and Diu';
if ($ex_data['district'] == VALUE_THREE) {
    $header_array['district'] = 'Dadra and Nagar Haveli';
} else if ($ex_data['district'] == VALUE_ONE) {
    $header_array['district'] = 'Daman';
} else if ($ex_data['district'] == VALUE_TWO) {
    $header_array['district'] = 'Diu';
}
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
$this->load->view('certificate/header', $header_array);
?>
<style type="text/css">
    .f-w-b{
        font-weight: bold;
    }
    .color-nic-blue{
        color: #0E4D92;
    }
    .t-a-c{
        text-align: center;
        height: 40px;
    }
    .t-a-r{
        text-align: right;
    }
    .table{
        width: 100%;
    }
    .table-border{
        border-collapse: collapse;
    }
    .table-border tbody tr td{
        padding: 3px;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
    }
    .table-border thead tr th{
        border: 1px solid black;
    }
    .bt{
        border-top: 1px solid black;
    }
    .bb{
        border-bottom: 1px solid black;
    }
    .br{
        border-right: 1px solid black;
    }
</style>
<div style="font-size: 14px; text-align: center;font-weight: bold;">FORM-III</div>
<div style="text-align: center;font-weight: bold;">(Under Goa, Daman, and Diu Shops and Establishments Rule, 1975)</div>
<div style="text-align: center;font-weight: bold;">( See Rule 5 )</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Registration Certificate of Establishment</div>
<div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;font-weight: bold;">1. Registration Number &emsp; <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $ex_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">2. Name of Establishment  <div style="margin-left: 320px;margin-top: -15px;">-- <?php echo $ex_data['name_of_shop']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">3. Postel Address of Establishment  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $ex_data['door_no']; ?>,<?php echo $ex_data['street_name']; ?>,<?php echo $ex_data['location']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">4. Name of Employer  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $ex_data['employer_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 40px; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">5. Nature of Business  <div style="margin-left: 320px;margin-top: -15px;">--  <?php echo $ex_data['nature_of_business']; ?></div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;margin-top: 40px;margin-left:60px;font-weight: bold;">It is hereby certified that<div style="border-bottom:1px solid;margin-left: 185px;margin-top: -20px;width:350px;">&nbsp;<?php echo $ex_data['name_of_shop']; ?></div><div style="margin-left: 540px;margin-top: -20px;">has been</div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 7px;margin-left:10px;font-weight: bold;">Registered as<div style="border-bottom:1px solid;margin-left: 430px;margin-top: -20px;width:150px;">&nbsp;<?php echo convert_to_new_date_format($ex_data['fees_paid_challan_updated_date']); ?></div><div style="margin-left: 360px;margin-top: -20px;">this day</div><div style="border-bottom:1px solid;margin-left: 640px;margin-top: -20px;width:50px;">&nbsp;<?php echo date('y',strtotime($ex_data['fees_paid_challan_updated_date']));?></div><div style="margin-left: 580px;margin-top: -20px;">of 200</div><div style="border-bottom:1px solid;margin-left: 120px;margin-top: -15px;width:230px;">&nbsp;<?php echo $ex_data['category']; ?></div></div>
<!--<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 20px;margin-top: 60px;"><img src="<?php echo base_url(); ?>documents/sign_and_stamp/labour_stemp.png" height="100px" width="100px"></div>-->
<div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:60px;font-weight: bold;margin-right: 20px;">Signature of Inspector</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;font-weight: bold;margin-left: 20px;">Seal </div>
<div style="font-size: 20px; text-align: center;font-weight: bold;margin-bottom: 10px;font-style: italic;">RENEWALS</div>
<table class="table table-border" style="border-top: 1px solid black; border-bottom: 1px solid black;">
    <thead>
        <tr>
            <th class="t-a-c f-w-b" style="width: 30px;height: 50px;">Date of Renewal</th>
            <th class="t-a-c f-w-b" style="width: 30px;">From</th>
            <th class="t-a-c f-w-b" style="width: 30px;">To</th>
            <th class="t-a-c f-w-b" style="width: 250px;">Signature of Inspector with Seal</th>
        </tr>
    </thead>
    <tbody>
        <?php if (!empty($shop_data)) { ?>
            <tr>
                <td class="t-a-c"><?php echo convert_to_new_date_format($shop_data['s_commencement_of_business_date']); ?></td>
                <td class="t-a-c"><?php echo convert_to_new_date_format($shop_data['s_commencement_of_business_date']); ?></td>
                <td class="t-a-c"><?php echo convert_to_new_date_format($shop_data['s_certificate_expiry_date']); ?></td>
                <td class="t-a-r"></td>
            </tr>
        <?php } ?>

        <?php
        foreach ($shop_renewal_data as $value) {
            //print_r($value);
            ?>
            <tr>
                <td class="t-a-c"><?php echo convert_to_new_date_format($value['status_datetime']); ?></td>
                <td class="t-a-c"><?php echo convert_to_new_date_format($value['status_datetime']); ?></td>
                <td class="t-a-c"><?php echo convert_to_new_date_format($value['valid_upto']); ?></td>
                <td class="t-a-r"></td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>