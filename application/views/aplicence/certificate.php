<?php
$barcode_number = generate_barcode_number(VALUE_FOURTYTHREE, $aplicence_data['aplicence_id']);

$header_array = array();
$header_array['title'] = 'FORM - VI';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
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
        border-bottom: 1px solid black;
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
<div style="font-size: 14px; text-align: center;font-weight: bold;">FORM - VI</div>
<div style="text-align: center;font-weight: bold;">{See Rule 25(1)}</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">ADMINISTRATION OF <?php echo $aplicence_data['district'] == VALUE_THREE ? 'DADRA AND NAGAR HAVELI' : 'DAMAN AND DIU'; ?></div>
<div style="font-size: 14px; text-align: center; margin-top: 20px;font-weight: bold;">Office of the Registering Officer,<br><?php
    if ($aplicence_data['district'] == VALUE_THREE) {
        echo $district = 'DADRA AND NAGAR HAVELI';
    } else if ($aplicence_data['district'] == VALUE_ONE) {
        echo $district = 'DAMAN';
    } else if ($aplicence_data['district'] == VALUE_TWO) {
        echo $district = 'DIU';
    }
    ?></div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 20px;word-spacing: 5px;margin-top: 20px;font-weight: bold;">License No.<div style="margin-left: 95px;margin-top: -18px;"> <?php echo $aplicence_data['registration_number']; ?></div>
    <div style="font-size: 14px; text-align: left;margin-left: 310px; margin-top: -20px;word-spacing: 8px;font-weight: bold;">Dated <div style="margin-left: 45px;margin-top: -20px;">:- <?php echo convert_to_new_date_format($aplicence_data['date_of_certificate']); ?></div>
        <div style="font-size: 14px; text-align: left;margin-left: 240px; margin-top: -20px;word-spacing: 8px;font-weight: bold;">Fee Paid Rs. </div><div style="margin-left: 350px;margin-top: -20px;"> <?php echo $aplicence_data['fees'].'/-'; ?></div>
    </div>
</div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 5px;font-weight: bold;margin-top: 40px;">License is hereby granted to M/s. <div style="margin-left: 270px;margin-top: -18px;"> <?php echo $aplicence_data['contractor_name']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 10px;word-spacing: 5px;font-weight: bold;margin-top: 10px;">&nbsp;<div style="margin-left: 5px;margin-top: -18px;"> <?php echo $aplicence_data['contractor_address']; ?></div><div style="font-size: 14px; text-align: left;margin-left: 665px; margin-top: -20px;word-spacing: 5px;font-weight: bold;">Under </div></div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 20px;word-spacing: 5px;margin-top: 20px;font-weight: bold;">Section 12(2) of Contract Labour (Regulation and Abolition) Act, 1970, subject to the</div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 20px;word-spacing: 5px;margin-top: 20px;font-weight: bold;">conditions specified in Annexure.</div>
<div style="font-size: 14px; text-align: left;margin-left: 50px; margin-bottom: 10px;word-spacing: 5px;font-weight: bold;margin-top: 40px;">The License shall remain in force till <div style="margin-left: 300px;margin-top: -19px;"> <?php echo $aplicence_data['duration_of_work']; ?></div></div>
<div style="font-size: 14px; text-align: left;margin-left: 390px; margin-bottom: 10px;word-spacing: 5px;font-weight: bold;margin-top: 60px;">Signature and Seal of the Licensing Officer</div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 50px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">Dated<div style="margin-left: 50px;margin-top: -19px;">: <?php echo convert_to_new_date_format($aplicence_data['status_datetime']); ?></div></div>
<table class="table table-border" style="border-top: 1px solid black; border-bottom: 1px solid black;">
    <thead>
        <tr>
            <th class="t-a-c f-w-b" style="width: 50px;height: 50px;">Date of Renewal</th>
            <th class="t-a-c f-w-b" style="width: 50px;">Rnewal (rule 29) Fee<br> paid for renewal</th>
            <th class="t-a-c f-w-b" style="width: 50px;">Date of Expiry</th>
            <th class="t-a-c f-w-b" style="width: 80px;">Signature and<br> seal of the Licensing Officer</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
        <tr>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
            <td class="t-a-c">&nbsp;</td>
        </tr>
    </tbody>
</table>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;"> <?php echo $aplicence_data['establi_name']; ?></div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;"> <?php echo $aplicence_data['establi_address']; ?></div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 10px;word-spacing: 8px;margin-top: 20px;font-weight: bold;"> <?php echo $district; ?></div>
<div style="page-break-after: always;">&nbsp;</div>
<div style="font-size: 14px; text-align: center;font-weight: bold;">ANNEUXRE</div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 20px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">The Licence is subject to the following conditions:-</div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 20px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">1. The licence shall be non-transferrable. </div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">2. The number of workmen employed as contract labour In the establishment </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">shall not, on any day, exceed <?php echo $aplicence_data['max_no_of_empl']; ?> employees. </div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">3. Except as provided in the rules the fees paid for the grant, or as the case may </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">be, for renewal of the licence shall be non-refundable. </div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">4. The rates of wages payable to the workmen by the contractor shall not be less </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">than the rates prescribed for the Schedule of employment under the Minimum </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">Wages Act, 1948 where applicable, and where the rates have been fixed by </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">agreement, settlement of award, not less than the rate fixed. </div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">5. In cases where the workmen employed by the contractor perform the same </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">kind of work as the workmen directly employed by the principal employer of </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">the establishment, the hours of work and other condition of the service of the</div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">workmen of the contractor shall be at the same as applicable to the workmen</div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">directly employed by the principal employer of the establishment.  </div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">6. In other cases the hours of work and conditions of service of the workmen of</div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">the contractor shall be such as may be specified in this behalf by the Labour</div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">Commissioner.</div>
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">7. In every establishment where 20 or more women are ordinarily employed as </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">contract labour there shall be provided 2 rooms of reasonable dimensions for </div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">the use of their children under the age of six years. One of such rooms would </div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">be used as play room for the children and the other as bed room for the </div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">children. For this purpose the contractor shall supply adequate number of toys </div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">and games in the play room and sufficient number of cots and beedings in the </div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 2px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">sleeping room. The standard or construction and maintenance of the creches</div>    
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 20px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">may be such as may be specified in this behalf by the Labour Commissioner.</div>    
<div style="font-size: 14px; text-align: left;margin-left: 10px; margin-bottom: 2px;word-spacing: 8px;margin-top: 20px;font-weight: bold;">8. The licence shall notify any changes in the number of workmen </div>
<div style="font-size: 14px; text-align: left;margin-left: 34px; margin-bottom: 400px;word-spacing: 8px;margin-top: 0px;font-weight: bold;">conditions of work to the Licensing Officer. </div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>