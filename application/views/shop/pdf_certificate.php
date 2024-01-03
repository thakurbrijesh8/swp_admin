<html>
    <?php $base_url = base_url(); ?>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: arial;
                font-size: 12px;
            }
            table.CompanyCertificate, td {
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
            td.table-first-column{
                width: 8.45%;
                text-align: center;
            }
            td.table-second-column{
                width: 25%;
            }
            td.table-third-column{
                width: 25%;
            }
            td.table-forth-column{
                width: 10%;
            }
            td.table-fifth-column{
                width: 25%;
            }
            td.single-second-column{
                width: 94%;
            }
            table.CompanyCertificate td{
                height: 50px;
                padding: 3px;
            }
            table.CompanyCertificate th{
                height: -220px;
                padding: 3px;
                border: 1px solid black;
                border-collapse: collapse;
            }
            td.declaration-number{
                border: none;
                width: 5%;
                vertical-align: text-top;
            }
            td.declaration{
                border: none;
                width: 100%;
            }
            td.border-none{
                border: none;
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

        <div style="padding-left:30px;font-size: 15px;margin-top: 20px;">&emsp;&emsp;&emsp;A Certificate of Registration containing the following particulars is hereby 
            granted under sub-section (2) of Section 7 of the Contract Labour (Reulation and
            Abolition) Act, 1970 and the rules made there under to <b><?php echo $establishment_data['establishment_name']; ?></b>,<b> <?php echo $establishment_data['establishment_location']; ?> 
        </div><br>
        <table class="CompanyCertificate">
            <tr>
                <td class="first-column">Name and Address of Contractors</td>
                <td class="second-column">Nature of work in which contract labour is employed or is to be employed</td>
                <td class="third-column">Maximum Number of contract labour to be employed on any day through each contractor</td>
                <td class="forth-column">Establishment date of termination of Employment of Contract Labour</td>
            </tr>
            <tr>
                <th class="first-column">1</th>
                <th class="first-column">2</th>
                <th class="second-column">3</th>
                <th class="third-column">4</th>
            </tr>
            <?php foreach ($establishment_under_all_contractor as $row) { ?>
                <tr>
                    <td class="first-column"><?php echo $row['contractor_proprietor_name']; ?> <br> <?php echo $row['contractor_address']; ?></td>
                    <td class="second-column"><?php echo $row['contractor_nature_of_working']; ?></td>
                    <td class="third-column"><?php echo $row['contractor_labour'] . ' Nos.'; ?></td>
                    <td class="forth-column"><?php echo convert_to_new_date_format($row['contractor_termination_date']); ?></td>
                </tr>
            <?php } ?>
        </table><br>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 50px;">NO : 
            <?php
            if ($establishment_data['is_labour_dept'] == APP_APPROVED) {
                echo $establishment_data['establishment_registration_no'];
            }
            ?>
        </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;">Place : Daman</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: -95px;word-spacing: 10px;">Date : </div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"> <?php if ($establishment_data['is_labour_dept'] == APP_APPROVED) { ?>
                <img src="<?php echo base_url(); ?>documents/labour_dept_stemp/labour_stemp.PNG" height="100px" width="100px">
            <?php } ?></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;">Signature of Principal Employer</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;">Name and address of Establishment</div>
    </body>
</html>