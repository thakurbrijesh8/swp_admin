<html>
    <head>
        <title>Form-IV</title>
        <style type="text/css">
            body {
                font-family: arial;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
            }
            td.first-column{
                width: 4%;
                text-align: center;
            }
            td.second-column{
                width: 38%;
            }
            td.third-column{
                width: 58%;
            }
            td.table-full-column{
                width: 94%;
                text-align: left;
            }
            td.table-first-column{
                width: 5.45%;
                text-align: center;
            }
            td.table-second-column{
                width: 25%;
            }
            td.table-third-column{
                width: 25%;
            }
            td.table-forth-column{
                width: 20%;
            }
            td.table-fifth-column{
                width: 25%;
            }
            td.single-second-column{
                width: 94%;
            }
            table.CompanyDetails td{
                height: 50px;
                padding: 3px;
            }
            table.signature {
                margin-left: 70%;
                margin-top: 10%;
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
        <div style="font-size: 14px; text-align: center;">FORM-IV</div>
        <div style="text-align: center;">[See rule 21 (1)]</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application For Licence.</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name and address of the contractor (including his father's name)).</td>
                <td class="third-column">
                    <?php echo $aplicence_data['contractor_name']; ?><br>
                    <?php echo $aplicence_data['contractor_fathername']; ?><br>
                    <?php echo $aplicence_data['contractor_address']; ?>
                </td>
            </tr>
        </table>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">2.</td>
                <td class="table-full-column">Particulars of Establishment or Establishments where contract labour is to be employed:-  </td>
            </tr>
        </table>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">2.1</td>
                <td class="second-column">Name And Address Of The Establishment.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['establi_name']; ?><br>
                    <?php echo $aplicence_data['establi_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.2</td>
                <td class="second-column">No. And Date Of Certificate Of Registration Of Establishment Under The Act.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['no_of_certificate']; ?> 
                    <?php echo $aplicence_data['date_of_certificate']; ?> 
                </td>
            </tr>
            <tr>
                <td class="first-column">2.3</td>
                <td class="second-column">Name And Address Of The Principal Employer</td>
                <td class="third-column">
                    <?php echo $aplicence_data['employer_name']; ?><br>
                    <?php echo $aplicence_data['employer_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.4</td>
                <td class="second-column">Nature Of Process, Operation  Or Work For Which Establishment Is Engaged</td>
                <td class="third-column">
                    <?php echo $aplicence_data['nature_of_process_for_establi']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.5</td>
                <td class="second-column">Nature Of Process, Operation Or Work For Which Contract Labour To Be Employed In The Establishment.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['nature_of_process_for_labour']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.6</td>
                <td class="second-column">Duration Of The Proposed Contract Work (give Proposed Date Of Commencing And Ending).</td>
                <td class="third-column">
                    <?php echo $aplicence_data['duration_of_work']; ?> 
            </tr>
            <tr>
                <td class="first-column">2.7</td>
                <td class="second-column">Name And Address Of The Agent Or Manager Of Contractor At The Work Establishment.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['name_of_agent']; ?><br>
                    <?php echo $aplicence_data['address_of_agent']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.8</td>
                <td class="second-column">Maximum No. Of Employees Proposed To Be Employed As Contract Labour In The Establishment.
                </td>
                <td class="third-column">
                    <?php echo $aplicence_data['max_no_of_empl']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Whether the contractor has worked in any other establishment within the past five year.</br>(If so, details of the Principal Employer, establishments and nature of work).</td>
                <td class="third-column">
                    <?php echo $aplicence_data['detail_of_other_work']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">The estimated value of the contract work.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['estimeted_value']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">5.</td>
                <td class="second-column">Contractor Contact No./Email-Id.</td>
                <td class="third-column">
                    <?php echo $aplicence_data['contractor_contact']; ?><br>
                    <?php echo $aplicence_data['contractor_email']; ?>
                </td>
            </tr>
        </table><br />
        <table style="margin-left: 10px;">
            <tr>
                <td class="declaration-number">6.Declaration by the Contractor.</td>
            </tr>
            <tr>
                <td class="declaration">I hereby declare that the particulars given above are true to the best of my knowledge and belief.</td>
            </tr>
        </table>
        <table class="" style="margin-top: 30px;">
            <tr><td class="border-none">Place : <?php
                    if ($aplicence_data['district'] == VALUE_THREE) {
                        echo $district = 'Dadra and Nagar Haveli';
                    } else if ($aplicence_data['district'] == VALUE_ONE) {
                        echo $district = 'Daman';
                    } else if ($aplicence_data['district'] == VALUE_TWO) {
                        echo $district = 'Diu';
                    }
                    ?></td></tr>
            <tr><td class="border-none">Date :  <?php echo convert_to_new_date_format($aplicence_data['submitted_datetime']); ?></td></tr>
        </table>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo APLICENCE_DOC_PATH; ?><?php echo $aplicence_data['signature']; ?>" height="80px" width="80px"></div>
        <table class="signature">
            <tr><td class="border-none">Signature & Stamp of the Applicant.</td></tr>
            <tr><td class="border-none">(Contractor)</td></tr>
        </table>
    </body>
</html>