<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
            }
            td.first-column{
                width: 5.1%;
                text-align: center;
            }
            td.common-first-column{
                width: 3.9%;
                text-align: center;
            }
            td.second-column{
                width: 39%;
            }
            td.common-second-column{
                width: 25%;
            }
            td.common-third-column{
                width: 43%;
            }
            td.third-column{
                width: 43%;
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
                height: 60px;
                padding: 3px;
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
        <div style="font-size: 14px; text-align: center;">FORM I</div>
        <div style="text-align: center;">[See Rule 23 (1)]</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">APPLICATION FOR REGISTRATION OF ESTABLISHMENTS EMPLOYING BUILDING WORKERS</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name and location of the establishment where building or other construction work is to be carried on:</td>
                <td class="third-column">
                    <?php echo $bocw_data['name_location_of_est']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Postal address of the Establishment:</td>
                <td class="third-column">
                    <?php echo $bocw_data['postal_address_of_est']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Full name and permanent address of the Establishment,if any:</td>
                <td class="third-column">
                    <?php echo $bocw_data['name_address_of_est']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Full name and address of the Manager or persons responsible for the supervision and control of the Establishment:</td>
                <td class="third-column">
                    <?php echo $bocw_data['name_address_of_manager']; ?>
                </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Nature of building or other construction work carried is to be carried on in the Establishment:</td>
            <td class="third-column">
                <?php echo $bocw_data['nature_of_building']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">6</td>
            <td class="second-column">Maximum number of building workers to be employed on any day</td>
            <td class="third-column">
                <?php echo $bocw_data['max_num_building_workers']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">7</td>
            <td class="second-column">Estimated date of commencement of building or the other construction work</td>
            <td class="third-column">
                <?php echo convert_to_new_date_format($bocw_data['estimated_date_of_commencement']); ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">8</td>
            <td class="second-column">Estimated date of completion of building or the other construction work</td>
            <td class="third-column">
                <?php echo convert_to_new_date_format($bocw_data['estimated_date_of_completion']); ?>
            </td>
            </td>
        </tr>
        <!-- <tr>
            <td class="first-column" style="height: 30px;">9</td>
            <td class="second-column">Application should be submitted in triplicate in Form I</td>
            <td class="third-column">
                <a href ="<?php //echo BOCW_DOC_PATH ?><?php //echo $bocw_data['form_one']; ?>" target="_blank"> View Document </a>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">10</td>
            <td class="second-column">Attach a copy of work order</td>
            <td class="third-column">
                <a href ="<?php //echo BOCW_DOC_PATH ?><?php //echo $bocw_data['workorder_copy']; ?>" target="_blank"> View Document </a>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">11</td>
            <td class="second-column">Copy of Chalan</td>
            <td class="third-column">
                <a href ="<?php //echo BOCW_DOC_PATH ?><?php //echo $bocw_data['copy_of_challan']; ?>" target="_blank"> View Document </a>
            </td>
            </td>
        </tr> -->
    </table>
    <br />
    <table style="margin-left: 20px;">
        <tr>
            <td class="declaration" style="text-align: center;">Declaration by the employer<br/></td>
        </tr>
        <tr>
            <td class="declaration">(i) I hereby declare that the particulars given above are true to the best of my knowledge and belief.</td>
        </tr>
        <tr>
            <td class="declaration">(ii) I undertake to abide by the provisions of the Building and other Construction Workers (Regulation of Employment and Conditions of Service) Act, 1996 and the rules made thereunder.</td>
        </tr>
    </table>
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo BOCW_DOC_PATH; ?><?php echo $bocw_data['sign_of_principal_employee']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Principal Employer</td></tr>
        <tr><td class="border-none">&emsp;Seal and Stamp</td></tr>
    </table>
    <!-- <hr>
    <div style="text-align: center;font-weight: bold;word-spacing: 2px;">OFFICE OF THE REGISTERING OFFICER</div>
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">Time and Date of receipt of application with Treasury Receipt No. and Date</div>
    <div style="text-align: right;margin-top: 30px;font-weight: bold;word-spacing: 2px;">Signature of Registering Officer</div> -->
</body>
</html>