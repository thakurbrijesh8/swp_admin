<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYONE, $establishment_data['establishment_id']);

$header_array = array();
$header_array['title'] = 'Certificate';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'A4';
$this->load->view('certificate/header', $header_array);
?>
<style type="text/css">

    table.CompanyCertificate{
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
    table.CompanyCertificate td{
        height: 50px;
        padding: 3px;
        border: 1px solid black;
        border-collapse: collapse;
    }
    table.CompanyCertificate th{
        height: -220px;
        padding: 3px;
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>
</head>
<body>
    <div style="font-size: 14px; text-align: center;">FORM-II</div>
    <div style="text-align: center;">[See rule 18 (1)]</div>
    <div style="text-align: center;">Certificate of Registration</div>
    <div style="text-align: center;">GOVERMENT OF GOA,DAMAN AND DIU</div>
    <div style="text-align: center;">Office of the Registering Officer,</div>
    <div style="text-align: center;">DAMAN.</div><br>

    <div style="padding-left:30px;font-size: 15px;margin-top: 20px;">&emsp;&emsp;&emsp;A Certificate of registration containing the following particulars is hereby 
        granted under sub-section (2) of Section 7 of the Contract Labour (Reulation and
        Abolition) Act, 1970 and the rules made there under to <b><?php echo $establishment_data['establishment_name']; ?></b>,<b> <?php echo $establishment_data['establishment_location']; ?> 
    </div><br>
    <table class="CompanyCertificate">
        <tr>
            <td class="first-column">Name and address of Contractors</td>
            <td class="second-column">Nature of work in which contract labour is employed or is to be employed</td>
            <td class="third-column">Maximum number of contract labour to be employed on any day through each contractor</td>
            <td class="forth-column">Establishment date of termination of employment of contract labour</td>
        </tr>
        <tr>
            <th class="first-column">1</th>
            <th class="first-column">2</th>
            <th class="second-column">3</th>
            <th class="third-column">4</th>
        </tr>
        <?php foreach ($establishment_under_all_contractor as $row) { ?>
            <tr>
                <td class="first-column"><?php echo $row['contractor_proprietor_name']; ?> <br> <?php echo $establishment_data['contractor_address']; ?></td>
                <td class="second-column"><?php echo $row['nature_of_work']; ?></td>
                <td class="third-column"><?php echo $row['contractor_labour'] . ' Nos.'; ?></td>
                <td class="forth-column"><?php echo convert_to_new_date_format($row['contractor_termination_date']); ?></td>
            </tr>
        <?php } ?>
    </table><br>
    <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 50px;">NO : 
        <?php echo $establishment_data['registration_number']; ?>
    </div>
    <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;">Place : Daman</div>
    <div style="font-size: 14px; text-align: left; margin-bottom: -95px;word-spacing: 10px;">Date : <?php echo convert_to_new_date_format($row['updated_time']); ?></div>
<!--    <div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 50px;">
        <img src="<?php echo DOC_PATH; ?>sign_and_stamp/labour_stemp.png" height="100px" width="100px">
    </div>-->
    <div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 10px;font-weight: bold;">Signature of Registering Officer with seal</div>
    <div style="font-size: 14px; text-align: center; margin-bottom: 5px;margin-right: -395px;font-weight: bold;">DAMAN AND DIU</div>
    <?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>