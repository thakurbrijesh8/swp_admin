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
        <div style="font-size: 14px; text-align: center;font-weight:  bold;">FORM - I</div>
        <div style="text-align: center;">[SEE Rule 3(1)]</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application for Registration of Establishments Employing Migrant Workman</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name and location of the Establishment:</td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_name_of_establishment']; ?><br>
                    <?php echo $migrantworkers_data['mw_location_of_establishment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Postal address of the Establishment:</td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_postal_address_of_establishment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Full name and address of the Principal Employer (furnish with Father's/Husband's name in the case of individuals):</td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_principal_employer_name']; ?><br>
                    <?php echo $migrantworkers_data['mw_principal_employer_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name and address of the directors/particular partners (in case of companies and firms)<br>
                </td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_directors_or_partners_name']; ?><br>
                    <?php echo $migrantworkers_data['mw_directors_or_partners_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Full name and address of the Manager or person responsible for the supervision and control of the establishment:<br>
                </td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_manager_or_persons_name']; ?><br>
                    <?php echo $migrantworkers_data['mw_manager_or_persons_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Nature of work carried on in the establishment / Type of bussiness / Trade / Industry / Manufacture / Occupation:</td>
                <td class="third-column">
                    <?php echo $migrantworkers_data['mw_nature_of_work_of_establishment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7</td>
                <td class="second-column">Particular of contractors and migrant workman</td>
                <td class="third-column"></td>
                </td>
            </tr>
        </table>
        <table class="CompanyDetails" border="1">
            <tr>
                <td class="table-first-column"></td>
                <td class="table-second-column">Name and address of contractors </td>
                <td class="table-third-column">Nature of work for<br> which, migrant<br> workman are to be <br>recruited or are employed</td>
                <td class="table-forth-column">Maximum No. of<br> migrant workman to<br> be employed on<br> any day labour <br>through each contractor </td>
                <td class="table-second-column">Estimated date and<br> commencement of<br>work under each<br> contractor</td>
                <td class="table-second-column">Estimated date of<br> termination of<br>employment of migrant <br>workman under each contractor</td>
            </tr>
            <tr>
                <th class="first-column"></th>
                <th class="first-column">1</th>
                <th class="second-column">2</th>
                <th class="third-column">3</th>
                <th class="third-column">4</th>
                <th class="third-column">5</th>
            </tr>
            <?php
            $i = 1;
            foreach ($migrantworkers_under_all_contractor as $contractor_data) {
                ?>
                <tr>
                    <td class="table-first-column"><?php echo $i++; ?> </td>
                    <td class="table-second-column"><?php echo $contractor_data['mc_proprietor_name']; ?><br>
                        </td>
                    <td class="table-third-column"><?php echo $contractor_data['mc_nature_of_work']; ?></td>
                    <td class="table-forth-column"><?php echo $contractor_data['mc_maximum_no_of_workers']; ?></td>
                    <td class="table-first-column"><?php echo convert_to_new_date_format($contractor_data['mc_date_of_commencement']); ?></td>
                    <td class="table-first-column"><?php echo convert_to_new_date_format($contractor_data['mc_date_of_termination']); ?></td>
                </tr>
            <?php } ?>
        </table>
        <table class="CompanyDetails" border="1">
            <tr>
                <th style="width: 5.5%;text-align: center;" >8</th>
                <th style="width: 49.7%;text-align: left;">Particulars for reasury receipt enclosed:-</th>
                <th class="third-column"></th>
            </tr>
        </table>
        <br />
        <table style="margin-left: 20px;">

            <tr>
                <td class="declaration">I hereby declare that the particulars given above are true to the best of my knowledge and belief.</td>
            </tr>
        </table>
        <table style="margin-left: 490px;">
            <tr><td class="border-none"><img src="<?php echo PROJECT_PATH; ?>documents/migrantworkers/<?php echo $migrantworkers_data['mw_sign_of_principal_employer']; ?>" height="60px" width="90px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Principal Employer</td></tr>
            <tr><td class="border-none">&emsp;Seal and Stamp</td></tr>
        </table>
        <hr>
        <div style="text-align: center;font-weight: bold;word-spacing: 2px;">OFFICE OF THE REGISTERING OFFICER</div>
        <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">Time and Date of receipt of application with Treasury Receipt No. and Date</div>
        <div style="text-align: right;margin-top: 30px;font-weight: bold;word-spacing: 2px;">Signature of Registering Officer</div>
    </body>
</html>